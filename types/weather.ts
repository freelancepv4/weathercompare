/**
 * Core domain types shared by every weather provider adapter and every UI
 * component. Keeping one canonical shape here is what lets the frontend stay
 * completely provider-agnostic (components never import a provider's raw
 * response shape).
 */

export type ConditionCode =
  | "clear"
  | "mostly-clear"
  | "partly-cloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "heavy-rain"
  | "thunderstorm"
  | "snow"
  | "sleet"
  | "windy";

export interface CurrentConditions {
  temperature: number; // Celsius
  feelsLike: number; // Celsius
  condition: ConditionCode;
  conditionLabel: string;
  humidity: number; // %
  windSpeed: number; // km/h
  windGust: number; // km/h
  windDirection: number; // degrees, 0 = N
  pressure: number; // hPa
  visibility: number; // km
  uvIndex: number; // 0-11+
  precipitationProbability: number; // %
  sunrise: string; // ISO 8601
  sunset: string; // ISO 8601
  observedAt: string; // ISO 8601
}

export interface HourlyPoint {
  time: string; // ISO 8601
  temperature: number;
  precipitationProbability: number;
  windSpeed: number;
  condition: ConditionCode;
}

export interface DailyPoint {
  date: string; // ISO date (yyyy-mm-dd)
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
  windSpeed: number;
  condition: ConditionCode;
  sunrise: string;
  sunset: string;
}

export type AlertSeverity = "minor" | "moderate" | "severe" | "extreme";

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  area: string;
  startsAt: string;
  endsAt: string;
  source: string;
}

export interface ProviderMeta {
  id: string;
  name: string;
  attributionLabel: string;
  attributionUrl: string;
}

export interface ForecastBundle {
  provider: ProviderMeta;
  current: CurrentConditions;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  alerts: WeatherAlert[];
  fetchedAt: string;
}

export interface GeoLocation {
  id: string;
  name: string;
  region: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
}

/**
 * Every weather data source implements this contract. Implementations live
 * in lib/providers/*. The rest of the app only ever talks to this interface,
 * never to a provider's raw API shape — that keeps provider-specific logic
 * out of components and API routes.
 */
export interface WeatherProvider {
  meta: ProviderMeta;
  getCurrentWeather(location: GeoLocation): Promise<CurrentConditions>;
  getHourlyForecast(location: GeoLocation): Promise<HourlyPoint[]>;
  getDailyForecast(location: GeoLocation): Promise<DailyPoint[]>;
  getAlerts(location: GeoLocation): Promise<WeatherAlert[]>;
}
