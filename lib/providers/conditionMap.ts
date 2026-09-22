import type { ConditionCode } from "@/types/weather";

/**
 * Maps each real provider's own weather-condition coding onto our shared
 * ConditionCode union (types/weather.ts), so components never need to know
 * which provider a forecast came from.
 */

/** OpenWeatherMap "weather[].id" — https://openweathermap.org/weather-conditions */
export function mapOwmCondition(id: number): ConditionCode {
  if (id >= 200 && id < 300) return "thunderstorm";
  if (id >= 300 && id < 400) return "drizzle";
  if (id >= 500 && id < 502) return "rain";
  if (id >= 502 && id < 600) return "heavy-rain";
  if (id >= 600 && id < 700) return id >= 611 && id <= 616 ? "sleet" : "snow";
  if (id >= 700 && id < 800) return "fog";
  if (id === 800) return "clear";
  if (id === 801) return "mostly-clear";
  if (id === 802) return "partly-cloudy";
  if (id === 803 || id === 804) return "cloudy";
  return "cloudy";
}

/** WeatherAPI.com "condition.text" — matched by keyword since the code table is large */
export function mapWeatherApiCondition(text: string): ConditionCode {
  const t = text.toLowerCase();
  if (t.includes("thunder")) return "thunderstorm";
  if (t.includes("blizzard") || t.includes("heavy snow")) return "snow";
  if (t.includes("snow") || t.includes("ice") || t.includes("blowing")) return "snow";
  if (t.includes("sleet")) return "sleet";
  if (t.includes("heavy rain") || t.includes("torrential")) return "heavy-rain";
  if (t.includes("rain") || t.includes("shower")) return "rain";
  if (t.includes("drizzle")) return "drizzle";
  if (t.includes("fog") || t.includes("mist")) return "fog";
  if (t.includes("overcast")) return "cloudy";
  if (t.includes("partly cloudy") || t.includes("partly")) return "partly-cloudy";
  if (t.includes("cloud")) return "cloudy";
  if (t.includes("sunny") || t.includes("clear")) return "clear";
  return "cloudy";
}

/** Open-Meteo "weathercode" (WMO code) — https://open-meteo.com/en/docs */
export function mapOpenMeteoCondition(code: number): ConditionCode {
  if (code === 0) return "clear";
  if (code === 1) return "mostly-clear";
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 65) return code === 65 ? "heavy-rain" : "rain";
  if (code === 66 || code === 67) return "sleet";
  if (code >= 71 && code <= 77) return "snow";
  if (code === 80 || code === 81) return "rain";
  if (code === 82) return "heavy-rain";
  if (code === 85 || code === 86) return "snow";
  if (code >= 95 && code <= 99) return "thunderstorm";
  return "cloudy";
}
