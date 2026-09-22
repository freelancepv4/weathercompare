import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { countries, allCityPaths } from "@/config/countries";

/**
 * Dynamic sitemap: homepage, static pages, country pages, and every seed
 * city page — generated from config/countries.ts rather than a manual
 * list, so it scales as cities are added without hand-editing this file.
 * Intentionally does NOT generate thousands of speculative location pages;
 * see the project brief's "SITEMAP" section.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/contact", "/data-sources", "/api-docs", "/privacy", "/cookies", "/terms", "/favorites"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: path === "" ? 1 : 0.5,
    })
  );

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

  return [...staticPages, ...countryPages, ...cityPages];
}
