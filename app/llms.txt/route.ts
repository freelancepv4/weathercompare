import { siteConfig } from "@/config/site";
import { countries } from "@/config/countries";
import { allGuides } from "@/lib/data/guides";
import { MONTHS } from "@/lib/data/climate";

/**
 * /llms.txt — a plain-text map of the site for AI assistants and AI search
 * engines (the llmstxt.org convention). Generated from the same data as the
 * sitemap, so it stays current automatically.
 */
export const dynamic = "force-static";

export function GET() {
  const base = siteConfig.url;
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} compares weather forecasts from several independent providers for ${countries.reduce(
      (n, c) => n + c.cities.length,
      0
    )} cities worldwide, and publishes travel-weather guides: best time to visit, month-by-month climate averages (NASA POWER, 2011–2020), packing advice and a trip weather finder.`,
    "",
    "## Key pages",
    `- [Trip weather finder](${base}/trip-finder): rank cities by month and preferred weather`,
    `- [Travel guides](${base}/guides): comparisons, packing lists, seasonal picks, AI travel tools`,
    `- [Best time to visit](${base}/guides/best-time-to-visit): recommended season for every city`,
    `- [Data sources](${base}/data-sources): where forecasts and climate data come from`,
    "",
    "## Where to go by month",
    ...MONTHS.map((m) => `- [Where to go in ${m.name}](${base}/where-to-go/${m.slug})`),
    "",
    "## Guides",
    ...allGuides().map((g) => `- [${g.title}](${base}/guides/${g.slug}): ${g.description}`),
    "",
    "## Weather by country",
    ...countries.map(
      (c) =>
        `- [${c.name}](${base}/weather/${c.slug}): ${c.cities.map((city) => city.name).join(", ")}`
    ),
    "",
    "## URL patterns",
    `- Live multi-source forecast: ${base}/weather/{country}/{city}`,
    `- Climate for a month: ${base}/weather/{country}/{city}/{month} (month = january … december)`,
    `- Best time to visit: ${base}/guides/best-time-to-visit/{country}/{city}`,
    "",
    "## Notes",
    `- ${siteConfig.name} is not a meteorological authority; for official warnings consult national weather services.`,
    `- Full URL list: ${base}/sitemap.xml`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
