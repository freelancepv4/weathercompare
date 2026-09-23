import type { CurrentConditions, DailyPoint, GeoLocation, HourlyPoint, WeatherAlert, WeatherProvider } from "@/types/weather";
import { mapWeatherApiCondition } from "./conditionMap";
import { CONDITION_LABELS } from "./mockData";
import { siteConfig } from "@/config/site";

/**
 * LIVE ADAPTER — WeatherAPI.com
 * =============================================================================
 * Uses the "forecast.json" endpoint, which returns current, hourly, daily
 * and alert data in one call. WeatherAPI.com's free tier (1,000,000
 * calls/month at time of writing) permits commercial use — verify current
 * terms at https://www.weatherapi.com/pricing.aspx before relying on this
 * in production.
 *
 * SETUP:
 *   1. Sign up at https://www.weatherapi.com/ and get an API key from your
 *      dashboard.
 *   2. Set THIRD_WEATHER_API_KEY in your environment (server-side only).
 *   3. Set DEMO_MODE=false.
 */

const API_BASE = "https://api.weatherapi.com/v1/forecast.json";

interface WeatherApiResponse {
  current: {
    last_updated_epoch: number;
    temp_c: number;
    feelslike_c: number;
    condition: { text: string };
    humidity: number;
    wind_kph: number;
    gust_kph: number;
    wind_degree: number;
    pressure_mb: number;
    vis_km: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        maxwind_kph: number;
        daily_chance_of_rain: number;
        condition: { text: string };
      };
      astro: { sunrise: string; sunset: string };
      hour: Array<{
        time_epoch: number;
        temp_c: number;
        chance_of_rain: number;
        wind_kph: number;
        condition: { text: string };
      }>;
    }>;
  };
  alerts?: {
    alert: Array<{
      headline: string;
      severity: string;
      areas: string;
      event: string;
      effective: string;
      expires: string;
      desc: string;
    }>;
  };
}

function requireApiKey(): string {
  const key = process.env.THIRD_WEATHER_API_KEY;
  if (!key) {
    throw new Error(
      "WeatherApiProvider: THIRD_WEATHER_API_KEY is not set. Set DEMO_MODE=true to use mock data, or configure the key to go live."
    );
  }
  return key;
}

async function fetchWeatherApi(location: GeoLocation): Promise<WeatherApiResponse> {
  const key = requireApiKey();
  const url = `${API_BASE}?key=${key}&q=${location.lat},${location.lon}&days=10&aqi=no&alerts=yes`;
  const res = await fetch(url, { next: { revalidate: siteConfig.weatherCacheSeconds } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`WeatherAPI.com request failed (${res.status}): ${body.slice(0, 200)}`);
  }
  return res.json();
}

/** Parses "12:30 AM"/"6:05 PM"-style astro times WeatherAPI returns, onto a given date. */
function astroTimeToIso(date: string, timeStr: string): string {
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return new Date(`${date}T00:00:00Z`).toISOString();
  let hour = parseInt(match[1] ?? "0", 10);
  const minute = parseInt(match[2] ?? "0", 10);
  const meridiem = (match[3] ?? "AM").toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return new Date(`${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00Z`).toISOString();
}

function mapSeverity(severity: string): WeatherAlert["severity"] {
  const s = severity.toLowerCase();
  if (s.includes("extreme")) return "extreme";
  if (s.includes("severe")) return "severe";
  if (s.includes("minor")) return "minor";
  return "moderate";
}

export const weatherApiMeta = {
  id: "weatherapi",
  name: "WeatherAPI.com",
  attributionLabel: "Weather data by WeatherAPI.com",
  attributionUrl: "https://www.weatherapi.com/",
};

export const weatherApiProvider: WeatherProvider = {
  meta: weatherApiMeta,

  async getCurrentWeather(location: GeoLocation): Promise<CurrentConditions> {
    const data = await fetchWeatherApi(location);
    const c = data.current;
    const today = data.forecast.forecastday[0];
    const condition = mapWeatherApiCondition(c.condition.text);
    return {
      temperature: Math.round(c.temp_c),
      feelsLike: Math.round(c.feelslike_c),
      condition,
      conditionLabel: CONDITION_LABELS[condition],
      humidity: c.humidity,
      windSpeed: Math.round(c.wind_kph),
      windGust: Math.round(c.gust_kph),
      windDirection: c.wind_degree,
      pressure: Math.round(c.pressure_mb),
      visibility: c.vis_km,
      uvIndex: Math.round(c.uv),
      precipitationProbability: today?.day.daily_chance_of_rain ?? 0,
      sunrise: today ? astroTimeToIso(today.date, today.astro.sunrise) : new Date().toISOString(),
      sunset: today ? astroTimeToIso(today.date, today.astro.sunset) : new Date().toISOString(),
      observedAt: new Date(c.last_updated_epoch * 1000).toISOString(),
    };
  },

  async getHourlyForecast(location: GeoLocation): Promise<HourlyPoint[]> {
    const data = await fetchWeatherApi(location);
    const hours = data.forecast.forecastday.flatMap((d) => d.hour);
    const nowEpoch = Date.now() / 1000;
    return hours
      .filter((h) => h.time_epoch >= nowEpoch - 3600)
      .slice(0, 24)
      .map((h) => ({
        time: new Date(h.time_epoch * 1000).toISOString(),
        temperature: Math.round(h.temp_c),
        precipitationProbability: h.chance_of_rain,
        windSpeed: Math.round(h.wind_kph),
        condition: mapWeatherApiCondition(h.condition.text),
      }));
  },

  async getDailyForecast(location: GeoLocation): Promise<DailyPoint[]> {
    const data = await fetchWeatherApi(location);
    return data.forecast.forecastday.map((d) => ({
      date: d.date,
      tempMax: Math.round(d.day.maxtemp_c),
      tempMin: Math.round(d.day.mintemp_c),
      precipitationProbability: d.day.daily_chance_of_rain,
      windSpeed: Math.round(d.day.maxwind_kph),
      condition: mapWeatherApiCondition(d.day.condition.text),
      sunrise: astroTimeToIso(d.date, d.astro.sunrise),
      sunset: astroTimeToIso(d.date, d.astro.sunset),
    }));
  },

  async getAlerts(location: GeoLocation): Promise<WeatherAlert[]> {
    const data = await fetchWeatherApi(location);
    return (data.alerts?.alert ?? []).map((a, i) => ({
      id: `weatherapi-${location.id}-${i}`,
      title: a.headline || a.event,
      description: a.desc,
      severity: mapSeverity(a.severity),
      area: a.areas || location.region,
      startsAt: new Date(a.effective).toISOString(),
      endsAt: new Date(a.expires).toISOString(),
      source: "WeatherAPI.com",
    }));
  },
};
