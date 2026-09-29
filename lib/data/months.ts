/**
 * Month constants and the plain-English month description, split out of
 * climate.ts so client components (TripFinder, ClimateChart) can use them
 * without pulling the climate dataset into the browser bundle.
 */
export interface CityClimate {
  /** Average daily high, °C, Jan..Dec */
  tMax: number[];
  /** Average daily low, °C */
  tMin: number[];
  /** Average monthly precipitation, mm */
  precipMm: number[];
  /** Average relative humidity, % */
  humidity: number[];
  /** Average cloud cover, % */
  cloud: number[];
}

export const MONTHS = [
  { slug: "january", name: "January", short: "Jan" },
  { slug: "february", name: "February", short: "Feb" },
  { slug: "march", name: "March", short: "Mar" },
  { slug: "april", name: "April", short: "Apr" },
  { slug: "may", name: "May", short: "May" },
  { slug: "june", name: "June", short: "Jun" },
  { slug: "july", name: "July", short: "Jul" },
  { slug: "august", name: "August", short: "Aug" },
  { slug: "september", name: "September", short: "Sep" },
  { slug: "october", name: "October", short: "Oct" },
  { slug: "november", name: "November", short: "Nov" },
  { slug: "december", name: "December", short: "Dec" },
] as const;

export type MonthSlug = (typeof MONTHS)[number]["slug"];

export function monthIndex(slug: string): number {
  return MONTHS.findIndex((m) => m.slug === slug);
}

/** Days in each month, for turning monthly totals into rough daily figures. */
export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Short plain-English label for how a month typically feels. */
export function describeMonth(c: CityClimate, i: number): { temp: string; rain: string; sky: string } {
  const high = c.tMax[i]!;
  const rain = c.precipMm[i]!;
  const cloud = c.cloud[i]!;
  const temp =
    high >= 32 ? "very hot" : high >= 27 ? "hot" : high >= 21 ? "warm" : high >= 15 ? "mild" : high >= 8 ? "cool" : high >= 2 ? "cold" : "freezing";
  const rainLabel = rain < 20 ? "very dry" : rain < 50 ? "fairly dry" : rain < 90 ? "some rain" : rain < 150 ? "wet" : "very wet";
  const sky = cloud < 35 ? "mostly sunny" : cloud < 55 ? "a mix of sun and cloud" : "often cloudy";
  return { temp, rain: rainLabel, sky };
}
