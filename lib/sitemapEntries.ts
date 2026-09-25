import { siteConfig } from "@/config/site";
import { countries, allCityPaths } from "@/config/countries";
import { allGuides } from "@/lib/data/guides";
import { citiesWithClimate, MONTHS } from "@/lib/data/climate";
import { CONTENT_LOCALES, paths } from "@/lib/i18n/routing";

/**
 * Every URL for the sitemaps, grouped by language. Served as a sitemap
 * index at /sitemap.xml (app/sitemap.xml/route.ts) pointing to one file per
 * language at /sitemaps/{lang}.xml (app/sitemaps/[file]/route.ts).
 * Generated from config/countries.ts, so new cities appear automatically.
 */
export type SitemapGroup = "en" | (typeof CONTENT_LOCALES)[number];
export const SITEMAP_GROUPS: SitemapGroup[] = ["en", ...CONTENT_LOCALES];

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

export function sitemapGroups(): Record<SitemapGroup, Entry[]> {
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

  const bestTimeToVisitPages = allCityPaths().map(({ country, city }) => ({
    url: `${siteConfig.url}/guides/best-time-to-visit/${country}/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const countryPages = countries.map((country) => ({
    url: `${siteConfig.url}/weather/${country.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const cityPages = allCityPaths().map(({ country, city }) => ({
    url: `${siteConfig.url}/weather/${country}/${city}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

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
    { url: url(paths.tripFinder(l)), changeFrequency: "monthly" as const, priority: 0.5 },
    ...countries.map((c) => ({ url: url(paths.country(l, c.slug)), changeFrequency: "daily" as const, priority: 0.6 })),
    ...allCityPaths().map(({ country, city }) => ({ url: url(paths.city(l, country, city)), changeFrequency: "hourly" as const, priority: 0.8 })),
    ...(climateCities.length > 0
      ? MONTHS.map((_, i) => ({ url: url(paths.whereToGo(l, i)), changeFrequency: "monthly" as const, priority: 0.7 }))
      : []),
    ...climateCities.flatMap(({ country, city }) =>
      MONTHS.map((_, i) => ({ url: url(paths.month(l, country.slug, city.slug, i)), changeFrequency: "yearly" as const, priority: 0.6 }))
    ),
  ];

  const groups = {
    en: [...staticPages, ...countryPages, ...cityPages, ...guidePages, ...bestTimeToVisitPages, ...whereToGoPages, ...monthPages],
  } as Record<SitemapGroup, Entry[]>;
  for (const l of CONTENT_LOCALES) groups[l] = localized(l);
  return groups;
}
