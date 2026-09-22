import type { PrecipitationUnit, TemperatureUnit, WindUnit } from "@/lib/hooks/usePreferences";

export function formatTemperature(celsius: number, unit: TemperatureUnit): string {
  if (unit === "fahrenheit") return `${Math.round((celsius * 9) / 5 + 32)}°`;
  return `${Math.round(celsius)}°`;
}

export function formatWind(kmh: number, unit: WindUnit): string {
  if (unit === "mph") return `${Math.round(kmh * 0.621371)} mph`;
  if (unit === "ms") return `${Math.round((kmh * 1000) / 3600)} m/s`;
  return `${Math.round(kmh)} km/h`;
}

export function formatPrecipitation(mm: number, unit: PrecipitationUnit): string {
  if (unit === "in") return `${(mm * 0.0393701).toFixed(2)} in`;
  return `${mm.toFixed(1)} mm`;
}

export function windDirectionLabel(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8] ?? "N";
}
