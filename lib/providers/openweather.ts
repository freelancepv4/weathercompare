import type { CurrentConditions, DailyPoint, GeoLocation, HourlyPoint, WeatherAlert, WeatherProvider } from "@/types/weather";
import { mapOwmCondition } from "./conditionMap";
import { CONDITION_LABELS } from "./mockData";

/**
 * LIVE ADAPTER — OpenWeatherMap (openweathermap.org/api)
 * =============================================================================
 * Uses the free "One Call API 3.0" endpoint, which returns current, hourly,
 * daily and alert data in a single request. OpenWeatherMap's free tier
 * (1,000 calls/day) permits commercial use with attribution as of writing —
 * verify current terms at https://openweathermap.org/price before relying
 * on this in production.
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

const API_BASE = "https://api.openweathermap.org/data/3.0/onecall";

interface OwmResponse {
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    uvi: number;
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    weather: Array<{ id: number; main: string; description: string }>;
  };
  hourly: Array<{
    dt: number;
    temp: number;
    wind_speed: number;
    pop: number;
    weather: Array<{ id: number }>;
  }>;
  daily: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    temp: { max: number; min: number };
    wind_speed: number;
    pop: number;
    weather: Array<{ id: number }>;
  }>;
  alerts?: Array<{
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }>;
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

async function fetchOwm(location: GeoLocation): Promise<OwmResponse> {
  const key = requireApiKey();
  const url = `${API_BASE}?lat=${location.lat}&lon=${location.lon}&appid=${key}&units=metric&exclude=minutely`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenWeatherMap request failed (${res.status}): ${body.slice(0, 200)}`);
  }
  return res.json();
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
    const data = await fetchOwm(location);
    const c = data.current;
    const conditionId = c.weather[0]?.id ?? 800;
    const condition = mapOwmCondition(conditionId);
    return {
      temperature: Math.round(c.temp),
      feelsLike: Math.round(c.feels_like),
      condition,
      conditionLabel: CONDITION_LABELS[condition],
      humidity: c.humidity,
      windSpeed: Math.round(c.wind_speed * 3.6), // m/s -> km/h
      windGust: Math.round((c.wind_gust ?? c.wind_speed * 1.3) * 3.6),
      windDirection: c.wind_deg,
      pressure: c.pressure,
      visibility: Math.round((c.visibility / 1000) * 10) / 10, // m -> km
      uvIndex: Math.round(c.uvi),
      precipitationProbability: Math.round((data.hourly[0]?.pop ?? 0) * 100),
      sunrise: toIso(c.sunrise),
      sunset: toIso(c.sunset),
      observedAt: toIso(c.dt),
    };
  },

  async getHourlyForecast(location: GeoLocation): Promise<HourlyPoint[]> {
    const data = await fetchOwm(location);
    return data.hourly.slice(0, 24).map((h) => ({
      time: toIso(h.dt),
      temperature: Math.round(h.temp),
      precipitationProbability: Math.round(h.pop * 100),
      windSpeed: Math.round(h.wind_speed * 3.6),
      condition: mapOwmCondition(h.weather[0]?.id ?? 800),
    }));
  },

  async getDailyForecast(location: GeoLocation): Promise<DailyPoint[]> {
    const data = await fetchOwm(location);
    return data.daily.slice(0, 10).map((d) => ({
      date: toIso(d.dt).slice(0, 10),
      tempMax: Math.round(d.temp.max),
      tempMin: Math.round(d.temp.min),
      precipitationProbability: Math.round(d.pop * 100),
      windSpeed: Math.round(d.wind_speed * 3.6),
      condition: mapOwmCondition(d.weather[0]?.id ?? 800),
      sunrise: toIso(d.sunrise),
      sunset: toIso(d.sunset),
    }));
  },

  async getAlerts(location: GeoLocation): Promise<WeatherAlert[]> {
    const data = await fetchOwm(location);
    return (data.alerts ?? []).map((a, i) => ({
      id: `owm-${location.id}-${i}`,
      title: a.event,
      description: a.description,
      severity: a.tags?.some((t) => /extreme/i.test(t))
        ? "extreme"
        : a.tags?.some((t) => /severe/i.test(t))
        ? "severe"
        : "moderate",
      area: location.region,
      startsAt: toIso(a.start),
      endsAt: toIso(a.end),
      source: a.sender_name || "OpenWeatherMap",
    }));
  },
};
