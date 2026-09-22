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
