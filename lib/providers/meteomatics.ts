import type { CurrentConditions, DailyPoint, GeoLocation, HourlyPoint, WeatherAlert, WeatherProvider } from "@/types/weather";
import { mapOpenMeteoCondition } from "./conditionMap";
import { CONDITION_LABELS } from "./mockData";
import { siteConfig } from "@/config/site";

/**
 * LIVE ADAPTER — Open-Meteo (open-meteo.com)
 * =============================================================================
 * This is "Provider C" in the comparison view. Open-Meteo needs no API key
 * at all for its standard endpoint, which makes it the easiest third source
 * to stand up.
 *
 * IMPORTANT LICENSING NOTE: Open-Meteo's keyless endpoint is offered free
 * for non-commercial use. Once this site carries ads or other monetization,
 * Open-Meteo's terms call for their paid "API key" commercial plan instead
 * — see https://open-meteo.com/en/pricing. Verify current terms yourself
 * before relying on this in production; this adapter works either way,
 * since a paid plan just adds an `&apikey=` parameter to the same URL
 * shape (see the commented-out line below).
 *
 * Open-Meteo has no alerts endpoint, so getAlerts() always returns an empty
 * list for this provider — that's expected, not a bug.
 *
 * SETUP: nothing required for the free/non-commercial tier. Set
 * DEMO_MODE=false and this provider activates automatically. For the paid
 * commercial tier, set WEATHER_API_KEY and uncomment the `apikey` line
 * below.
 */

const API_BASE = "https://api.open-meteo.com/v1/forecast";

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
    wind_direction_10m: number;
    weather_code: number;
    precipitation_probability?: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    weather_code: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max?: number[];
  };
}

async function fetchOpenMeteo(location: GeoLocation): Promise<OpenMeteoResponse> {
  const params = new URLSearchParams({
    latitude: String(location.lat),
    longitude: String(location.lon),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code",
    hourly: "temperature_2m,precipitation_probability,wind_speed_10m,weather_code",
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,weather_code,sunrise,sunset,uv_index_max",
    timezone: "auto",
    forecast_days: "10",
  });
  // For the paid commercial tier, uncomment and set WEATHER_API_KEY:
  // if (process.env.WEATHER_API_KEY) params.set("apikey", process.env.WEATHER_API_KEY);

  const res = await fetch(`${API_BASE}?${params.toString()}`, { next: { revalidate: siteConfig.weatherCacheSeconds } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Open-Meteo request failed (${res.status}): ${body.slice(0, 200)}`);
  }
  return res.json();
}

export const meteomaticsMeta = {
  id: "openmeteo",
  name: "Open-Meteo",
  attributionLabel: "Weather data by Open-Meteo.com",
  attributionUrl: "https://open-meteo.com/",
};

export const meteomaticsProvider: WeatherProvider = {
  meta: meteomaticsMeta,

  async getCurrentWeather(location: GeoLocation): Promise<CurrentConditions> {
    const data = await fetchOpenMeteo(location);
    const c = data.current;
    const condition = mapOpenMeteoCondition(c.weather_code);
    const nowIndex = data.hourly.time.findIndex((t) => t === c.time.slice(0, 13) + ":00" || t === c.time);
    const dailyToday = data.daily.time[0] ? 0 : -1;
    return {
      temperature: Math.round(c.temperature_2m),
      feelsLike: Math.round(c.apparent_temperature),
      condition,
      conditionLabel: CONDITION_LABELS[condition],
      humidity: c.relative_humidity_2m,
      windSpeed: Math.round(c.wind_speed_10m),
      windGust: Math.round(c.wind_gusts_10m),
      windDirection: c.wind_direction_10m,
      pressure: Math.round(c.surface_pressure),
      visibility: 10, // Open-Meteo's free endpoint doesn't return visibility; a reasonable default
      uvIndex: dailyToday >= 0 ? Math.round(data.daily.uv_index_max?.[dailyToday] ?? 0) : 0,
      precipitationProbability: nowIndex >= 0 ? data.hourly.precipitation_probability[nowIndex] ?? 0 : 0,
      sunrise: new Date(data.daily.sunrise[0] ?? c.time).toISOString(),
      sunset: new Date(data.daily.sunset[0] ?? c.time).toISOString(),
      observedAt: new Date(c.time).toISOString(),
    };
  },

  async getHourlyForecast(location: GeoLocation): Promise<HourlyPoint[]> {
    const data = await fetchOpenMeteo(location);
    const nowMs = Date.now();
    return data.hourly.time
      .map((time, i) => ({
        time: new Date(time).toISOString(),
        temperature: Math.round(data.hourly.temperature_2m[i] ?? 0),
        precipitationProbability: data.hourly.precipitation_probability[i] ?? 0,
        windSpeed: Math.round(data.hourly.wind_speed_10m[i] ?? 0),
        condition: mapOpenMeteoCondition(data.hourly.weather_code[i] ?? 0),
      }))
      .filter((h) => new Date(h.time).getTime() >= nowMs - 3600_000)
      .slice(0, 24);
  },

  async getDailyForecast(location: GeoLocation): Promise<DailyPoint[]> {
    const data = await fetchOpenMeteo(location);
    return data.daily.time.map((date, i) => ({
      date,
      tempMax: Math.round(data.daily.temperature_2m_max[i] ?? 0),
      tempMin: Math.round(data.daily.temperature_2m_min[i] ?? 0),
      precipitationProbability: data.daily.precipitation_probability_max[i] ?? 0,
      windSpeed: Math.round(data.daily.wind_speed_10m_max[i] ?? 0),
      condition: mapOpenMeteoCondition(data.daily.weather_code[i] ?? 0),
      sunrise: new Date(data.daily.sunrise[i] ?? date).toISOString(),
      sunset: new Date(data.daily.sunset[i] ?? date).toISOString(),
    }));
  },

  async getAlerts(_location: GeoLocation): Promise<WeatherAlert[]> {
    // Open-Meteo has no alerts endpoint. Return an empty list rather than
    // fabricating one — see the "Weather source transparency" requirement.
    return [];
  },
};
