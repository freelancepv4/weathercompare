/**
 * Central site configuration.
 *
 * Everything brand/domain-specific lives here and is read from environment
 * variables, so the brand name and domain can be changed without touching
 * component code. See .env.example for how each value is sourced.
 */

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "WeatherCompare",
  shortName: (process.env.NEXT_PUBLIC_SITE_NAME || "WeatherCompare").slice(0, 12),
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.weathercompare.example",
  description:
    "Compare weather forecasts from multiple trusted sources for cities across Italy and Europe, in one clean dashboard.",
  demoMode: (process.env.DEMO_MODE ?? "true") !== "false",
  defaultLocale: "en" as const,
  locales: ["en", "it", "de", "fr", "es"] as const,
  themeColor: "#0b1f49",
  twitterHandle: "@weathercompare",

  /**
   * How long (in seconds) a live provider response is cached — both at the
   * fetch() level (lib/providers/*.ts) and as the ISR revalidate window for
   * city pages (app/weather/[country]/[city]/page.tsx). One value drives
   * both, so they can never drift out of sync.
   *
   * Why 5400 (90 minutes) by default: OpenWeatherMap's free tier caps out at
   * 1,000 calls/day, and its adapter makes 2 real HTTP calls per city per
   * cache refresh (current + forecast; Next.js dedupes repeat calls within
   * one page render). With ~29 seed cities:
   *   regens/day per city the budget allows = 1000 / (29 cities * 2 calls) ≈ 17
   *   → minimum safe interval ≈ 1440 min / 17 ≈ 85 min
   * 5400s (90 min) sits just above that with a small safety margin, even if
   * every city gets a visit within every window (the worst case — ISR only
   * refetches when a stale page is actually requested, so real usage will
   * almost always use far less than the cap). WeatherAPI.com (1,000,000
   * calls/month) and Open-Meteo's keyless endpoint have far more headroom
   * and are not the binding constraint.
   *
   * If you add more seed cities, swap to a paid OpenWeatherMap tier, or
   * drop OpenWeatherMap from the comparison, you can safely lower this.
   * Override without a code change via WEATHER_CACHE_SECONDS.
   */
  weatherCacheSeconds: Number(process.env.WEATHER_CACHE_SECONDS) || 5400,
} as const;

export type Locale = (typeof siteConfig.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};

export const localeFlags: Record<Locale, string> = {
  en: "EN",
  it: "IT",
  de: "DE",
  fr: "FR",
  es: "ES",
};
