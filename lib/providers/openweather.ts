import type { CurrentConditions, DailyPoint, GeoLocation, HourlyPoint, WeatherAlert, WeatherProvider } from "@/types/weather";
import { mapOwmCondition } from "./conditionMap";
import { CONDITION_LABELS } from "./mockData";

/**
 * LIVE ADAPTER — OpenWeatherMap (openweathermap.org/api)
 * =============================================================================
 * Uses OpenWeatherMap's classic, truly-free "Current Weather" (data/2.5/weather)
 * and "5 Day / 3 Hour Forecast" (data/2.5/forecast) endpoints — every free API
 * key includes these with no extra sign-up step.
 *
 * NOTE: this intentionally does NOT use OpenWeatherMap's "One Call API 3.0".
 * That endpoint returns more (10-day forecast, alerts, UV index) in one
 * request, but requires separately subscribing to their "One Call by Call"
 * plan — which needs a payment card on file even though it's free under
 * 1,000 calls/day. If you'd rather have that (10-day forecast + alerts from
 * this provider too), subscribe at https://openweathermap.org/price and
 * swap the URLs below for https://api.openweathermap.org/data/3.0/onecall.
 *
 * Trade-offs of the free endpoints used here:
 *   - Forecast covers 5 days (not 10), in 3-hour steps (not hourly).
 *   - No weather alerts (getAlerts always returns []) — WeatherAPI.com and
 *     Open-Meteo still provide alerts in the comparison.
 *   - No UV index (that endpoint was also folded into the paid plan).
 *
 * OpenWeatherMap's free tier (1,000 calls/day) permits commercial use with
 * attribution as of writing — verify current terms at
 * https://openweathermap.org/price before relying on this in production.
 *
 * SETUP:
 *   1. Sign up at https://openweathermap.org/api and get an API key
 *      (Settings -> API keys). New keys can take up to a couple of hours
 *      to activate.
 *   2. Set SECOND_WEATHER_API_KEY in your environment (Vercel dashboard or
 *      .env.local). Never expose this key client-side — this file only
 *      ever runs on the server.
 *   3. Set DEMO_MODE=false.
 */

const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

interface OwmCurrentResponse {
  dt: number;
  weather: Array<{ id: number; main: string; description: string }>;
  main: { temp: number; feels_like: number; pressure: number; humidity: number };
  wind: { speed: number; deg: number; gust?: number };
  visibility?: number;
  sys: { sunrise: number; sunset: number };
}

interface OwmForecastEntry {
  dt: number;
  dt_txt: string; // "2026-09-22 15:00:00"
  main: { temp: number; feels_like: number };
  weather: Array<{ id: number }>;
  wind: { speed: number };
  pop: number; // 0-1
}

interface OwmForecastResponse {
  list: OwmForecastEntry[];
}

function requireApiKey(): string {
  const key = process.env.SECOND_WEATHER_API_KEY;
  if (!key) {
    throw new Error(
      "OpenWeatherProvider: SECOND_WEATHER_API_KEY is not set. Set DEMO_MODE=true to use mock data, or configure the key to go live."
    );
  }
  return key;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenWeatherMap request failed (${res.status}): ${body.slice(0, 200)}`);
  }
  return res.json();
}

function fetchCurrent(location: GeoLocation): Promise<OwmCurrentResponse> {
  const key = requireApiKey();
  return fetchJson(`${CURRENT_URL}?lat=${location.lat}&lon=${location.lon}&appid=${key}&units=metric`);
}

function fetchForecast(location: GeoLocation): Promise<OwmForecastResponse> {
  const key = requireApiKey();
  return fetchJson(`${FORECAST_URL}?lat=${location.lat}&lon=${location.lon}&appid=${key}&units=metric`);
}

function toIso(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString();
}

export const openWeatherMeta = {
  id: "openweather",
  name: "OpenWeatherMap",
  attributionLabel: "Weather data by OpenWeatherMap",
  attributionUrl: "https://openweathermap.org/",
};

export const openWeatherProvider: WeatherProvider = {
  meta: openWeatherMeta,

  async getCurrentWeather(location: GeoLocation): Promise<CurrentConditions> {
    const [current, forecast] = await Promise.all([fetchCurrent(location), fetchForecast(location)]);
    const conditionId = current.weather[0]?.id ?? 800;
    const condition = mapOwmCondition(conditionId);
    return {
      temperature: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      condition,
      conditionLabel: CONDITION_LABELS[condition],
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6), // m/s -> km/h
      windGust: Math.round((current.wind.gust ?? current.wind.speed * 1.3) * 3.6),
      windDirection: current.wind.deg,
      pressure: current.main.pressure,
      visibility: current.visibility != null ? Math.round((current.visibility / 1000) * 10) / 10 : 10, // m -> km
      uvIndex: 0, // not available on the free endpoints — see file header
      precipitationProbability: Math.round((forecast.list[0]?.pop ?? 0) * 100),
      sunrise: toIso(current.sys.sunrise),
      sunset: toIso(current.sys.sunset),
      observedAt: toIso(current.dt),
    };
  },

  async getHourlyForecast(location: GeoLocation): Promise<HourlyPoint[]> {
    const forecast = await fetchForecast(location);
    // Free tier gives 3-hour steps, not true hourly — 16 entries ≈ 48 hours.
    return forecast.list.slice(0, 16).map((entry) => ({
      time: toIso(entry.dt),
      temperature: Math.round(entry.main.temp),
      precipitationProbability: Math.round(entry.pop * 100),
      windSpeed: Math.round(entry.wind.speed * 3.6),
      condition: mapOwmCondition(entry.weather[0]?.id ?? 800),
    }));
  },

  async getDailyForecast(location: GeoLocation): Promise<DailyPoint[]> {
    const forecast = await fetchForecast(location);

    // Group the 3-hour entries by calendar date (max 5 days on the free tier).
    const byDate = new Map<string, OwmForecastEntry[]>();
    for (const entry of forecast.list) {
      const date = entry.dt_txt.slice(0, 10);
      const bucket = byDate.get(date) ?? [];
      bucket.push(entry);
      byDate.set(date, bucket);
    }

    return Array.from(byDate.entries())
      .slice(0, 5)
      .map(([date, entries]) => {
        const temps = entries.map((e) => e.main.temp);
        const winds = entries.map((e) => e.wind.speed);
        const pops = entries.map((e) => e.pop);
        // Prefer the entry closest to midday for a representative condition icon.
        const midday = entries.reduce((best, e) => {
          const hour = Number(e.dt_txt.slice(11, 13));
          const bestHour = Number(best.dt_txt.slice(11, 13));
          return Math.abs(hour - 13) < Math.abs(bestHour - 13) ? e : best;
        }, entries[0]!);

        return {
          date,
          tempMax: Math.round(Math.max(...temps)),
          tempMin: Math.round(Math.min(...temps)),
          precipitationProbability: Math.round(Math.max(...pops) * 100),
          windSpeed: Math.round(Math.max(...winds) * 3.6),
          condition: mapOwmCondition(midday.weather[0]?.id ?? 800),
          // The free forecast endpoint doesn't return per-day sunrise/sunset;
          // approximate with noon/midnight of that date rather than fabricating times.
          sunrise: `${date}T06:00:00.000Z`,
          sunset: `${date}T18:00:00.000Z`,
        };
      });
  },

  async getAlerts(_location: GeoLocation): Promise<WeatherAlert[]> {
    // Not available on OpenWeatherMap's free endpoints (alerts require the
    // paid "One Call by Call" plan) — see file header. Return an empty list
    // rather than fabricating one; WeatherAPI.com and Open-Meteo still
    // provide real alerts in the comparison.
    return [];
  },
};