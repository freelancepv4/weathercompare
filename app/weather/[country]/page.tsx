import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countries } from "@/config/countries";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityGrid } from "@/components/CityGrid";

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
  const title = `${country.name} Weather Forecast — All Cities`;
  const description = `Compare weather forecasts for ${country.cities.length} cities across ${country.name}, from multiple independent weather sources in one place.`;
  const url = `${siteConfig.url}/weather/${country.slug}`;
  const keywords = [
    `${country.name} weather`,
    `${country.name} weather forecast`,
    ...(COUNTRY_WEATHER_TERMS[country.isoCode] ?? []),
    ...country.cities.slice(0, 8).map((c) => `${c.name} weather`),
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export default function CountryPage({ params }: PageProps) {
  const country = countries.find((c) => c.slug === params.country);
  if (!country) notFound();

  const items = country.cities.map((city) => ({ country, city }));
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {country.name} Weather Forecast
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Compare forecasts from multiple independent weather sources for {country.cities.length} cities across {country.name}. Pick a
          city below for detailed hourly and 10-day forecasts, rain and wind breakdowns, and local travel information.
        </p>
      </div>

      <CityGrid title={`Cities in ${country.name}`} items={items} />
    </div>
  );
}
