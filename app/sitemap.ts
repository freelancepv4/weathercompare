import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { countries, allCityPaths } from "@/config/countries";
import { allGuides } from "@/lib/data/guides";
import { citiesWithClimate, MONTHS } from "@/lib/data/climate";

/**
 * Dynamic sitemap: homepage, static pages, country pages, and every seed
 * city page — generated from config/countries.ts rather than a manual
 * list, so it scales as cities are added without hand-editing this file.
 * Intentionally does NOT generate thousands of speculative location pages;
 * see the project brief's "SITEMAP" section.
 */
export default function sitemap(): MetadataRoute.Sitemap {
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

  return [
    ...staticPages,
    ...countryPages,
    ...cityPages,
    ...guidePages,
    ...bestTimeToVisitPages,
    ...whereToGoPages,
    ...monthPages,
  ];
}
