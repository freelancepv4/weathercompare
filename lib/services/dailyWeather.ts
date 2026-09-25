/**
 * Today + tomorrow for every seed city, in ONE request.
 *
 * Powers the daily "Weather today" pages (/weather-today, /it/meteo-oggi …).
 * Open-Meteo accepts a comma-separated list of coordinates and answers with
 * one result per location, so the whole snapshot costs a single keyless API
 * call per cache window — nothing like the per-city calls of the forecast
 * pages, and it never touches the OpenWeather daily quota.
 *
 * If the call fails (or DEMO_MODE is on), it falls back to the long-term
 * climate normals for the current month, and says so (`live: false`), so the
 * page always renders something truthful.
 */
import { countries, type CountrySeed, type CitySeed } from "@/config/countries";
import { siteConfig } from "@/config/site";
import { getCityClimate, DAYS_IN_MONTH } from "@/lib/data/climate";
import type { Sky } from "@/lib/i18n/copy/types";

/** How often the daily pages (and this fetch) refresh, in seconds. */
export const DAILY_REVALIDATE = 3600;

export interface DayPoint {
  tMax: number;
  tMin: number;
  /** mm */
  precip: number;
  /** % */
  pop: number;
  /** km/h, max sustained */
  wind: number;
  /** km/h, max gust */
  gust: number;
  sky: Sky;
}

export interface CityDaily {
  country: CountrySeed;
  city: CitySeed;
  today: DayPoint;
  tomorrow: DayPoint;
}

export interface DailySnapshot {
  cities: CityDaily[];
  live: boolean;
  /** ISO timestamp of when this snapshot was built. */
  builtAt: string;
}

/** WMO weather code → coarse sky type. */
export function skyFromCode(code: number): Sky {
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partly";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 95) return "storm";
  return "partly";
}

export const SKY_EMOJI: Record<Sky, string> = {
  clear: "☀️",
  partly: "⛅",
  cloudy: "☁️",
  fog: "🌫️",
  drizzle: "🌦️",
  rain: "🌧️",
  snow: "❄️",
  storm: "⛈️",
};

interface OMDaily {
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: Array<number | null>;
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    weather_code: number[];
  };
}

function allSeeds() {
  return countries.flatMap((country) => country.cities.map((city) => ({ country, city })));
}

function point(d: NonNullable<OMDaily["daily"]>, i: number): DayPoint | null {
  const tMax = d.temperature_2m_max?.[i];
  const tMin = d.temperature_2m_min?.[i];
  if (typeof tMax !== "number" || typeof tMin !== "number") return null;
  return {
    tMax: Math.round(tMax),
    tMin: Math.round(tMin),
    precip: Math.round((d.precipitation_sum?.[i] ?? 0) * 10) / 10,
    pop: Math.round(d.precipitation_probability_max?.[i] ?? 0),
    wind: Math.round(d.wind_speed_10m_max?.[i] ?? 0),
    gust: Math.round(d.wind_gusts_10m_max?.[i] ?? 0),
    sky: skyFromCode(d.weather_code?.[i] ?? 2),
  };
}

async function fetchLive(): Promise<CityDaily[]> {
  const seeds = allSeeds();
  const params = new URLSearchParams({
    latitude: seeds.map((s) => s.city.lat.toFixed(3)).join(","),
    longitude: seeds.map((s) => s.city.lon.toFixed(3)).join(","),
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,weather_code",
    timezone: "auto",
    forecast_days: "2",
  });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
      next: { revalidate: DAILY_REVALIDATE },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
    const json = (await res.json()) as OMDaily | OMDaily[];
    const list = Array.isArray(json) ? json : [json];
    if (list.length !== seeds.length) throw new Error(`expected ${seeds.length} locations, got ${list.length}`);
    const out: CityDaily[] = [];
    list.forEach((loc, i) => {
      const d = loc.daily;
      if (!d) return;
      const today = point(d, 0);
      const tomorrow = point(d, 1);
      if (today && tomorrow) out.push({ ...seeds[i]!, today, tomorrow });
    });
    if (out.length < seeds.length / 2) throw new Error("too few locations parsed");
    return out;
  } finally {
    clearTimeout(timer);
  }
}

/** Typical values for this month from the climate normals — the honest fallback. */
function fromClimate(now: Date): CityDaily[] {
  const m = now.getUTCMonth();
  const out: CityDaily[] = [];
  for (const { country, city } of allSeeds()) {
    const c = getCityClimate(country.slug, city.slug);
    if (!c) continue;
    const daily = c.precipMm[m]! / DAYS_IN_MONTH[m]!;
    const cloud = c.cloud[m]!;
    const p: DayPoint = {
      tMax: Math.round(c.tMax[m]!),
      tMin: Math.round(c.tMin[m]!),
      precip: Math.round(daily * 10) / 10,
      pop: Math.min(90, Math.round(daily * 12)),
      wind: 0,
      gust: 0,
      sky: cloud < 35 ? "clear" : cloud < 60 ? "partly" : "cloudy",
    };
    out.push({ country, city, today: p, tomorrow: p });
  }
  return out;
}

export async function getDailySnapshot(): Promise<DailySnapshot> {
  const now = new Date();
  if (!siteConfig.demoMode) {
    try {
      return { cities: await fetchLive(), live: true, builtAt: now.toISOString() };
    } catch (err) {
      console.warn("[dailyWeather] live snapshot failed, using climate normals:", err instanceof Error ? err.message : err);
    }
  }
  return { cities: fromClimate(now), live: false, builtAt: now.toISOString() };
}
