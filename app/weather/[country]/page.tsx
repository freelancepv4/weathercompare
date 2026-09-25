import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countries } from "@/config/countries";
import { siteConfig, defaultOgImage } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityGrid } from "@/components/CityGrid";
import { PageHeader } from "@/components/PageHeader";
import { climateHighsFor, getCityClimate, MONTHS } from "@/lib/data/climate";
import { seoTitle, seoDescription } from "@/lib/seo";
import { Compass, CalendarDays, MapPin } from "lucide-react";

// Fixes a real broken link: the breadcrumb on every city page ("Home >
// Italy > Rome") and the sitemap both point to /weather/{country}, but no
// page previously existed at that route — a 404 sitting in a sitemap
// already submitted to Google/Bing. This page also earns its own place in
// search results for country-level queries ("Italy weather", "meteo
// Italia") rather than existing purely to patch the link.
export const revalidate = 86400; // country listings change rarely — daily is plenty

interface PageProps {
  params: { country: string };
}

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

const COUNTRY_WEATHER_TERMS: Record<string, string[]> = {
  IT: ["meteo Italia", "previsioni meteo Italia"],
  DE: ["Wetter Deutschland", "Wettervorhersage Deutschland"],
  FR: ["météo France", "prévisions météo France"],
  ES: ["tiempo España", "pronóstico del tiempo España"],
  AT: ["Wetter Österreich", "Wettervorhersage Österreich"],
  CH: ["Wetter Schweiz", "météo Suisse"],
  NL: ["weer Nederland", "weersverwachting Nederland"],
  PT: ["tempo Portugal", "previsão do tempo Portugal"],
  BR: ["tempo Brasil", "previsão do tempo Brasil"],
  MX: ["tiempo México", "pronóstico del tiempo México"],
  GR: ["καιρός Ελλάδα", "πρόγνωση καιρού"],
  TR: ["hava durumu Türkiye"],
  JP: ["天気 日本", "天気予報"],
  KR: ["날씨 한국", "일기예보"],
  TH: ["สภาพอากาศ ประเทศไทย"],
  IN: ["मौसम भारत"],
  AE: ["طقس الإمارات", "توقعات الطقس"],
  EG: ["طقس مصر", "توقعات الطقس"],
  MA: ["طقس المغرب"],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const country = countries.find((c) => c.slug === params.country);
  if (!country) return {};
  const title = `${country.name} Weather: Forecasts for Every City`;
  const description = `Compare weather forecasts for ${country.cities.length} cities across ${country.name}, from multiple independent weather sources in one place.`;
  const url = `${siteConfig.url}/weather/${country.slug}`;
  const keywords = [
    `${country.name} weather`,
    `${country.name} weather forecast`,
    ...(COUNTRY_WEATHER_TERMS[country.isoCode] ?? []),
    ...country.cities.slice(0, 8).map((c) => `${c.name} weather`),
  ];

  return {
    title: seoTitle(title),
    description: seoDescription(description),
    keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [defaultOgImage] },
    twitter: { title, description, images: [defaultOgImage] },
  };
}

// January, April, July, October — one month per season.
const SEASON_MONTHS = [0, 3, 6, 9];
function seasonColor(t: number) {
  if (t < 3) return "#bfdbfe";
  if (t < 10) return "#bae6fd";
  if (t < 16) return "#99f6e4";
  if (t < 21) return "#d9f99d";
  if (t < 26) return "#fde68a";
  if (t < 31) return "#fed7aa";
  return "#fecdd3";
}

export default function CountryPage({ params }: PageProps) {
  const country = countries.find((c) => c.slug === params.country);
  if (!country) notFound();

  const items = country.cities.map((city) => ({ country, city }));
  const climateRows = country.cities
    .map((city) => ({ city, c: getCityClimate(country.slug, city.slug) }))
    .filter((r): r is { city: (typeof country.cities)[number]; c: NonNullable<ReturnType<typeof getCityClimate>> } => r.c !== null);
  const url = `${siteConfig.url}/weather/${country.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: country.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${country.name} Weather Forecast — All Cities`,
      url,
      about: {
        "@type": "ItemList",
        itemListElement: country.cities.map((city, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: city.name,
          url: `${siteConfig.url}/weather/${country.slug}/${city.slug}`,
        })),
      },
    },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: country.name }]} />

      <PageHeader
        eyebrow="Weather by country"
        icon={MapPin}
        title={`${country.name} Weather Forecast`}
        tone="sky"
        description={
          <p>
            Compare forecasts from multiple independent weather sources for {country.cities.length} cities across {country.name}. Pick a
            city for hourly and 10-day forecasts, rain and wind, month-by-month climate and local travel tips.
          </p>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Link
            href="/trip-finder"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-soft hover:bg-brand-50"
          >
            <Compass size={15} aria-hidden="true" /> Trip weather finder
          </Link>
          <Link
            href="/guides/best-time-to-visit"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/25"
          >
            <CalendarDays size={15} aria-hidden="true" /> Best time to visit
          </Link>
        </div>
      </PageHeader>

      <CityGrid
        title={`Cities in ${country.name}`}
        subtitle="Mini charts show the average daytime high for each month."
        items={items}
        climate={climateHighsFor(items)}
      />

      {climateRows.length > 0 && (
        <section className="mt-12" aria-labelledby="climate-glance-heading">
          <h2 id="climate-glance-heading" className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {country.name} climate at a glance
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Average daytime highs by season. Tap a city for its month-by-month guide.</p>
          <div className="mt-5 overflow-x-auto rounded-xl3 border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-white/10">
                  <th scope="col" className="px-5 py-3 font-semibold">City</th>
                  {SEASON_MONTHS.map((m) => (
                    <th key={m} scope="col" className="px-3 py-3 font-semibold">
                      {MONTHS[m]!.name}
                    </th>
                  ))}
                  <th scope="col" className="px-3 py-3 font-semibold">Wettest month</th>
                </tr>
              </thead>
              <tbody>
                {climateRows.map(({ city, c }) => {
                  const wettest = c.precipMm.indexOf(Math.max(...c.precipMm));
                  return (
                    <tr key={city.slug} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                      <th scope="row" className="px-5 py-3 font-semibold">
                        <Link href={`/weather/${country.slug}/${city.slug}`} className="text-slate-900 hover:text-brand-700 dark:text-white">
                          {city.name}
                        </Link>
                      </th>
                      {SEASON_MONTHS.map((m) => (
                        <td key={m} className="px-3 py-3">
                          <Link
                            href={`/weather/${country.slug}/${city.slug}/${MONTHS[m]!.slug}`}
                            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold text-slate-900"
                            style={{ backgroundColor: seasonColor(c.tMax[m]!) }}
                          >
                            {Math.round(c.tMax[m]!)}°C
                          </Link>
                        </td>
                      ))}
                      <td className="px-3 py-3 text-xs text-slate-500">
                        {MONTHS[wettest]!.name} · {c.precipMm[wettest]} mm
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
