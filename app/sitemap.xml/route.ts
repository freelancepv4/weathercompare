import { siteConfig } from "@/config/site";
import { SITEMAP_FILES } from "@/lib/sitemapEntries";

/**
 * /sitemap.xml — a sitemap index with one child sitemap per language
 * (/sitemaps/en.xml, /sitemaps/it.xml, …). Same URL as before, so Search
 * Console, Bing, robots.txt and scripts/indexnow.mjs need no changes.
 */
export const dynamic = "force-static";

export function GET() {
  const now = new Date().toISOString();
  const items = SITEMAP_FILES.map(
    (g) => `<sitemap><loc>${siteConfig.url}/sitemaps/${g}.xml</loc><lastmod>${now}</lastmod></sitemap>`
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
