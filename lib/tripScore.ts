/**
 * Scores how well a city's typical climate in a given month matches a
 * travel "weather style". Shared by the interactive trip finder and the
 * static /where-to-go/{month} pages so both always agree.
 *
 * Pure arithmetic on long-term averages (lib/data/climate.json) — no AI,
 * no API calls — so it's free to run for every visitor.
 */
import type { CityClimate } from "@/lib/data/climate";

export type WeatherStyle = "beach" | "warm" | "mild" | "cool" | "winter";

export const STYLES: Array<{ id: WeatherStyle; label: string; emoji: string; blurb: string; range: [number, number] }> = [
  { id: "beach", label: "Hot & sunny", emoji: "🏖️", blurb: "Beach weather — highs around 28–33°C, little rain", range: [28, 33] },
  { id: "warm", label: "Warm sightseeing", emoji: "☀️", blurb: "Pleasantly warm days, highs around 22–28°C", range: [22, 28] },
  { id: "mild", label: "Mild & comfortable", emoji: "🌤️", blurb: "Walking weather — highs around 16–22°C", range: [16, 22] },
  { id: "cool", label: "Cool escape", emoji: "🧥", blurb: "Escape the heat — highs around 8–16°C", range: [8, 16] },
  { id: "winter", label: "Wintry", emoji: "❄️", blurb: "Proper winter — highs around −5–5°C", range: [-5, 5] },
];

export const COUNTRY_REGIONS: Record<string, string> = {
  italy: "Europe", germany: "Europe", france: "Europe", spain: "Europe", uk: "Europe", netherlands: "Europe",
  portugal: "Europe", austria: "Europe", greece: "Europe", switzerland: "Europe", ireland: "Europe", turkey: "Europe", poland: "Europe", belgium: "Europe", malta: "Europe", cyprus: "Europe",
  japan: "Asia", thailand: "Asia", singapore: "Asia", india: "Asia", "south-korea": "Asia", pakistan: "Asia", indonesia: "Asia", maldives: "Asia", "sri-lanka": "Asia", vietnam: "Asia", "hong-kong": "Asia",
  uae: "Middle East & Africa", egypt: "Middle East & Africa", morocco: "Middle East & Africa", "south-africa": "Middle East & Africa", tunisia: "Middle East & Africa", "cape-verde": "Middle East & Africa", mauritius: "Middle East & Africa", tanzania: "Middle East & Africa", seychelles: "Middle East & Africa",
  usa: "Americas", canada: "Americas", mexico: "Americas", brazil: "Americas", "dominican-republic": "Americas", curacao: "Americas",
  australia: "Oceania",
};

export const REGIONS = ["Europe", "Asia", "Middle East & Africa", "Americas", "Oceania"] as const;

export function regionOf(countrySlug: string): string {
  return COUNTRY_REGIONS[countrySlug] ?? "Other";
}

/** 0–100; higher is a better match. */
export function scoreMonth(c: CityClimate, month: number, style: WeatherStyle, avoidRain = true): number {
  const [lo, hi] = STYLES.find((s) => s.id === style)!.range;
  const high = c.tMax[month]!;
  const rain = c.precipMm[month]!;
  const cloud = c.cloud[month]!;

  const tempOff = high < lo ? lo - high : high > hi ? high - hi : 0;
  let score = 100 - tempOff * 7;

  // Rain matters for every style except wintry (where snow/precip is part of it).
  if (style !== "winter") score -= Math.max(0, rain - 30) * (avoidRain ? 0.28 : 0.1);
  // Sun matters most for beach and warm-weather trips.
  if (style === "beach") score -= Math.max(0, cloud - 30) * 0.35;
  if (style === "warm") score -= Math.max(0, cloud - 45) * 0.2;
  // Very humid heat is less pleasant for sightseeing.
  if ((style === "warm" || style === "mild") && c.humidity[month]! > 78 && high > 24) score -= 8;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function scoreLabel(score: number): string {
  return score >= 85 ? "Excellent match" : score >= 70 ? "Good match" : score >= 50 ? "Fair match" : "Poor match";
}
