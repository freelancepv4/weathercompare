/**
 * Central site configuration.
 *
 * Everything brand/domain-specific lives here and is read from environment
 * variables, so the brand name and domain can be changed without touching
 * component code. See .env.example for how each value is sourced.
 */

export const siteConfig = {
  // Fixed brand name. (It used to come from NEXT_PUBLIC_SITE_NAME, but on
  // Cloudflare a stray runtime setting with a placeholder value replaced the
  // name in page titles, so the brand is no longer configurable by env.)
  name: "WeatherCompare",
  shortName: "WeatherCompa",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.weathercompare.example",
  description:
    "Compare 3 weather forecasts for any city in the world: today, tomorrow and 14 days. 1,800+ city guides with climate by month and the best time to visit.",
  demoMode: (process.env.DEMO_MODE ?? "true") !== "false",
  defaultLocale: "en" as const,
  locales: ["en", "it", "de", "fr", "es", "pt", "nl", "pl"] as const,
  themeColor: "#0b1f49",
  twitterHandle: "@weathercompare",
  /** Public contact details (footer, contact page, schema.org Organization). */
  contactEmail: "contact@weathercompare.eu",
  /** WhatsApp / phone in E.164 digits (no "+") for wa.me links, plus a display form. */
  whatsapp: "393881990342",
  phoneDisplay: "+39 388 199 0342",
  /**
   * Official social profiles. Leave a value empty until the account exists —
   * empty ones are hidden everywhere (footer icons, schema.org sameAs).
   */
  social: {
    pinterest: "https://www.pinterest.com/weathercompare/",
    instagram: "",
    facebook: "https://www.facebook.com/people/W-Ahmad/61584946485318/",
    linkedin: "",
    x: "",
  },

  /**
   * How long (in seconds) a live provider response is cached — both at the
   * fetch() level (lib/providers/*.ts) and as the ISR revalidate window for
   * city pages (app/weather/[country]/[city]/page.tsx). One value drives
   * both, so they can never drift out of sync.
   *
   * Why 14400 (4 hours) by default: OpenWeatherMap's free tier caps out at
   * 1,000 calls/day, and its adapter makes 2 real HTTP calls per city per
   * cache refresh (current + forecast; Next.js dedupes repeat calls within
   * one page render). Since the worldwide expansion, the seed list is ~68
   * cities:
   *   regens/day per city the budget allows = 1000 / (68 cities * 2 calls) ≈ 7.4
   *   → minimum safe interval ≈ 1440 min / 7.4 ≈ 196 min
   * 14400s (240 min) sits comfortably above that with a real safety margin,
   * even if every city gets a visit within every window (the worst case —
   * ISR only refetches when a stale page is actually requested, so real
   * usage will almost always use far less than the cap). WeatherAPI.com
   * (1,000,000 calls/month) and Open-Meteo's keyless endpoint have far more
   * headroom and are not the binding constraint.
   *
   * UPDATE (Sep 2026): with 99 seed cities the same maths gives
   *   1000 / (99 * 2) ≈ 5.05 regens/day → minimum ≈ 285 min,
   * so the default was 21600s (6 hours). With 124 cities and Vercel Hobby's
   * ISR write budget (each page regeneration is a write), it is now 43200s
   * (12 hours).
   *
   * If you add more seed cities, swap to a paid OpenWeatherMap tier, or
   * drop OpenWeatherMap from the comparison, adjust this accordingly.
   * Override without a code change via WEATHER_CACHE_SECONDS.
   */
  weatherCacheSeconds: Number(process.env.WEATHER_CACHE_SECONDS) || 43200,
} as const;

/**
 * The site-wide branded image from app/opengraph-image.tsx (generated at
 * build time via Next's file convention). That convention only
 * auto-attaches to a route when the route's own generateMetadata() does
 * NOT define its own `openGraph` object — any page that sets a custom
 * openGraph (every guide/weather page does, for its own title/description)
 * silently loses the image unless it's referenced explicitly. Spread this
 * into `openGraph.images` (and `twitter.images`) on every such page.
 */
export const defaultOgImage = {
  url: `${siteConfig.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Weather forecasts, compared in one place`,
};

export type Locale = (typeof siteConfig.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
  nl: "Nederlands",
  pl: "Polski",
};

export const localeFlags: Record<Locale, string> = {
  en: "EN",
  it: "IT",
  de: "DE",
  fr: "FR",
  es: "ES",
  pt: "PT",
  nl: "NL",
  pl: "PL",
};
