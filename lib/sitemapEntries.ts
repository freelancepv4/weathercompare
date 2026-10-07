import { siteConfig } from "@/config/site";
import { countries } from "@/config/world";
import { allGuides } from "@/lib/data/guides";
import { citiesWithClimate, MONTHS } from "@/lib/data/climate";
import { countriesWithClimate } from "@/lib/content/countryClimate";
import { CONTENT_LOCALES, paths } from "@/lib/i18n/routing";

/**
 * Every URL for the sitemaps, grouped by language. Served as a sitemap
 * index at /sitemap.xml (app/sitemap.xml/route.ts) pointing to one file per
 * language at /sitemaps/{lang}.xml (app/sitemaps/[file]/route.ts).
 * Generated from config/countries.ts, so new cities appear automatically.
 */
export type SitemapGroup = "en" | (typeof CONTENT_LOCALES)[number];
export const SITEMAP_GROUPS: SitemapGroup[] = ["en", ...CONTENT_LOCALES];
/**
 * One sitemap file per language for the main pages (/sitemaps/es.xml) and
 * one for the month-by-month climate pages (/sitemaps/es-months.xml), so
 * each file stays well under Google's 50,000-URL limit (~26k at most) and
 * Search Console reports indexing for the two page types separately.
 */
export const SITEMAP_FILES: string[] = SITEMAP_GROUPS.flatMap((g) => [g, `${g}-months`]);

export interface Entry {
  url: string;
  lastModified?: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function urlsetXml(entries: Entry[]): string {
  const rows = entries.map((e) =>
    [
      "<url>",
      `<loc>${esc(e.url)}</loc>`,
      e.lastModified ? `<lastmod>${e.lastModified.toISOString()}</lastmod>` : "",
      e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : "",
      e.priority !== undefined ? `<priority>${e.priority}</priority>` : "",
      "</url>",
    ].join("")
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;
}

let memo: Record<string, Entry[]> | null = null;

export function sitemapGroups(): Record<string, Entry[]> {
  if (memo) return memo;
  memo = buildGroups();
  return memo;
}

function buildGroups(): Record<string, Entry[]> {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/data-sources",
    "/privacy",
    "/cookies",
    "/terms",
    "/news",
    "/guides",
    "/guides/best-time-to-visit",
    "/trip-finder",
    "/weather-today",
    "/weather-tomorrow",
    "/faq",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.5,
  }));

  const guidePages = allGuides().map((guide) => ({
    url: `${siteConfig.url}/guides/${guide.slug}`,
    lastModified: new Date(guide.updated),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Best-time pages exist for every city with climate data (core cities also have an editorial guide).
  const bestTimeToVisitPages = citiesWithClimate().map(({ country, city }) => ({
    url: `${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}`,
    changeFrequency: "monthly" as const,
    priority: city.core ? 0.7 : 0.6,
  }));

  // Country-level best-time hubs. Higher priority than the city guides below
  // them: these are the pages that answer "best time to visit {country}",
  // and they link down to every city, so they are the right entry point for
  // a crawler working through this section.
  const bestTimeCountryPages = countriesWithClimate(countries).map((country) => ({
    url: `${siteConfig.url}/guides/best-time-to-visit/${country.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const countryPages = [
    { url: `${siteConfig.url}/weather`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...countries.map((country) => ({
      url: `${siteConfig.url}/weather/${country.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
  ];

  const cityPages = countries.flatMap((country) =>
    country.cities.map((city) => ({
      url: `${siteConfig.url}/weather/${country.slug}/${city.slug}`,
      changeFrequency: "daily" as const,
      priority: city.core ? 0.8 : 0.7,
    }))
  );

  // Month-by-month climate pages and "where to go in {month}" roundups —
  // only for cities that have climate data (see scripts/fetch-climate.mjs).
  const climateCities = citiesWithClimate();
  const monthPages = climateCities.flatMap(({ country, city }) =>
    MONTHS.map((m) => ({
      url: `${siteConfig.url}/weather/${country.slug}/${city.slug}/${m.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))
  );
  const whereToGoPages =
    climateCities.length > 0
      ? MONTHS.map((m) => ({
          url: `${siteConfig.url}/where-to-go/${m.slug}`,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      : [];

  // Translated versions (/it, /de, /fr, /es, /pt, /nl, /pl) of every page
  // type that exists in all languages — one sitemap per language, so Search
  // Console reports indexing per language. Each page also declares its
  // hreflang alternates in <head>.
  const url = (path: string) => `${siteConfig.url}${path}`;
  const localized = (l: (typeof CONTENT_LOCALES)[number]): Entry[] => [
    { url: url(paths.home(l)), changeFrequency: "daily" as const, priority: 0.9 },
    { url: url(paths.today(l)), changeFrequency: "hourly" as const, priority: 0.8 },
    { url: url(paths.tomorrow(l)), changeFrequency: "hourly" as const, priority: 0.8 },
    { url: url(paths.tripFinder(l)), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: url(paths.countries(l)), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: url(paths.faq(l)), changeFrequency: "monthly" as const, priority: 0.6 },
    ...countries.map((c) => ({ url: url(paths.country(l, c.slug)), changeFrequency: "daily" as const, priority: 0.6 })),
    ...countries.flatMap((c) => c.cities.map((city) => ({ url: url(paths.city(l, c.slug, city.slug)), changeFrequency: "daily" as const, priority: city.core ? 0.8 : 0.7 }))),
    ...countriesWithClimate(countries).map((c) => ({ url: url(paths.bestTimeCountry(l, c.slug)), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...climateCities.map(({ country, city }) => ({ url: url(paths.bestTime(l, country.slug, city.slug)), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...(climateCities.length > 0
      ? MONTHS.map((_, i) => ({ url: url(paths.whereToGo(l, i)), changeFrequency: "monthly" as const, priority: 0.7 }))
      : []),
  ];
  const localizedMonths = (l: (typeof CONTENT_LOCALES)[number]): Entry[] =>
    climateCities.flatMap(({ country, city }) =>
      MONTHS.map((_, i) => ({ url: url(paths.month(l, country.slug, city.slug, i)), changeFrequency: "yearly" as const, priority: 0.6 }))
    );

  const groups: Record<string, Entry[]> = {
    en: [...staticPages, ...countryPages, ...cityPages, ...guidePages, ...bestTimeCountryPages, ...bestTimeToVisitPages, ...whereToGoPages],
    "en-months": monthPages,
  };
  for (const l of CONTENT_LOCALES) {
    groups[l] = localized(l);
    groups[`${l}-months`] = localizedMonths(l);
  }
  return groups;
}
