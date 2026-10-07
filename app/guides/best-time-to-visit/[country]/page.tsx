import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findCountry, countries } from "@/config/world";
import { siteConfig } from "@/config/site";
import { BestTimeCountryView } from "@/components/BestTimeCountryView";
import { analyseCountryClimate, countriesWithClimate } from "@/lib/content/countryClimate";
import { bestTimeCountryCopy } from "@/lib/i18n/bestTimeCountry";
import { joinList } from "@/lib/i18n/copy";
import { monthInfo } from "@/lib/i18n/routing";
import { hreflang } from "@/lib/i18n/pageMeta";
import { seoTitle, seoDescription } from "@/lib/seo";

/**
 * /guides/best-time-to-visit/{country} — the country-level hub.
 *
 * Sits one level above the city guides that already live at
 * /guides/best-time-to-visit/{country}/{city}. Search Console showed
 * country-shaped queries ("beste reisezeit panama", "polen beste reisezeit",
 * "quando andare in lettonia") being answered by whichever single city page
 * happened to rank — Panama City Beach in Florida for Panama, Szczecin for
 * Poland — because nothing on the site answered at country level.
 *
 * Built from climate normals only, so it is fully static like the city
 * guides. A handful of the largest countries are pre-rendered; the rest
 * render on first request and are then cached.
 */
export const revalidate = false;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ country: string }>;
}

/**
 * Pre-build the countries with the most cities — the ones most likely to be
 * hit first. Everything else is generated on demand (dynamicParams), which
 * keeps the build from growing by 225 extra pages per language.
 */
export function generateStaticParams() {
  return countriesWithClimate(countries)
    .slice()
    .sort((a, b) => b.cities.length - a.cities.length)
    .slice(0, 40)
    .map((c) => ({ country: c.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { country: slug } = await props.params;
  const country = findCountry(slug);
  if (!country) return {};
  const analysis = analyseCountryClimate(country);
  if (!analysis) return {};
  const t = bestTimeCountryCopy("en");
  const best = joinList("en", analysis.best.map((m) => monthInfo("en").monthNames[m]!));
  const title = t.title(country.name);
  const description = t.desc(country.name, best, analysis.bestLo, analysis.bestHi);
  const url = `${siteConfig.url}/guides/best-time-to-visit/${country.slug}`;
  return {
    title: seoTitle(title),
    description: seoDescription(description),
    keywords: t.keywords(country.name),
    alternates: { canonical: url, ...hreflang({ kind: "bestTimeCountry", country: country.slug }) },
    openGraph: { type: "website", siteName: siteConfig.name, title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BestTimeToVisitCountryPage(props: PageProps) {
  const { country: slug } = await props.params;
  const country = findCountry(slug);
  if (!country) notFound();
  // No climate records for any city here — nothing honest to put on the page.
  if (!analyseCountryClimate(country)) notFound();
  return <BestTimeCountryView locale="en" country={country} />;
}
