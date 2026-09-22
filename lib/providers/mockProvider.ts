import type { GeoLocation, ProviderMeta, WeatherProvider } from "@/types/weather";
import {
  generateAlerts,
  generateCurrent,
  generateDaily,
  generateHourly,
  type MockProviderProfile,
} from "./mockData";

/**
 * Factory for a demo provider that satisfies the WeatherProvider contract
 * using deterministic mock data. Three instances of this (with slightly
 * different bias profiles) stand in for Provider A / B / C so the
 * "Forecast Comparison" UI has believable, slightly-disagreeing data to
 * render out of the box — exactly like real independent forecast models
 * would disagree by a degree or two.
 */
export function createMockProvider(meta: ProviderMeta, profile: MockProviderProfile): WeatherProvider {
  return {
    meta,
    async getCurrentWeather(location: GeoLocation) {
      return generateCurrent(location, profile);
    },
    async getHourlyForecast(location: GeoLocation) {
      return generateHourly(location, profile);
    },
    async getDailyForecast(location: GeoLocation) {
      return generateDaily(location, profile);
    },
    async getAlerts(location: GeoLocation) {
      return generateAlerts(location);
    },
  };
}
