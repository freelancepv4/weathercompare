import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { findCity, allCityPaths, countries } from "@/config/countries";
import { locationFromSeed } from "@/lib/providers/geocoding";
import { getForecastBundles } from "@/lib/services/weatherService";
import { getCityGuide } from "@/lib/data/cityGuides";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { WeatherDashboard } from "@/components/WeatherDashboard";
import { ForecastComparison } from "@/components/ForecastComparison";
import { HourlyForecast } from "@/components/HourlyForecast";
import { DailyForecast } from "@/components/DailyForecast";
import { RainSection } from "@/components/RainSection";
import { WindSection } from "@/components/WindSection";
import { WeatherAlerts } from "@/components/WeatherAlerts";
import { WeatherMap } from "@/components/WeatherMap";
import { CityGuide } from "@/components/CityGuide";
import { CityFaq } from "@/components/CityFaq";
import { CityGrid } from "@/components/CityGrid";
import { AdSlot } from "@/components/AdSlot";
import { ErrorState } from "@/components/ErrorState";

// This page stays fully static/ISR (no searchParams) so the pre-built
// cities in config/countries.ts keep their fast, SEO-friendly pages. Cities
// outside that seed list are handled by /weather/search instead — see
// components/SearchBar.tsx for how the two are chosen between.
// Kept in lockstep with each live provider's own fetch cache window — see
// the comment on siteConfig.weatherCacheSeconds for the rate-limit math.
export const revalidate = siteConfig.weatherCacheSeconds;

interface PageProps {
  params: { country: string; city: string };
}

export async function generateStaticParams() {
  return allCityPaths();
}

// Native-language weather terms, by country, used only in the `keywords`
// meta field below — not shown in the (English) title/description, since
// this site's URLs and server-rendered metadata are always English-only
// today (see siteConfig.defaultLocale). These are the terms a visitor
// searching from that country would actually type — matching what they'd
// see once the page loads and its i18n layer switches to their language
// (see lib/i18n/I18nProvider.tsx), not unrelated terms added for ranking.
const COUNTRY_WEATHER_TERMS: Record<string, string[]> = {
  IT: ["meteo", "previsioni meteo", "previsioni del tempo"],
  DE: ["wetter", "wettervorhersage"],
  FR: ["météo", "prévisions météo"],
  ES: ["tiempo", "pronóstico del tiempo", "clima"],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = findCity(params.country, params.city);
  if (!found) return {};
  const { country, city } = found;
  const title = `${city.name} Weather Forecast — 10 Day Forecast & Things to Do`;
  const description = `Check the latest ${city.name} weather forecast, hourly conditions, temperature, rain probability and wind from multiple weather sources — plus top landmarks and the best time to visit.`;
  const url = `${siteConfig.url}/weather/${country.slug}/${city.slug}`;

  const nativeCityName = city.i18nName ? Object.values(city.i18nName).find((n) => n && n !== city.name) : undefined;
  const nativeTerms = COUNTRY_WEATHER_TERMS[country.isoCode] ?? [];
  const keywords = [
    `${city.name} weather`,
    `${city.name} forecast`,
    ...(nativeCityName ? [`${nativeCityName} meteo`] : []),
    ...nativeTerms.map((term) => `${term} ${nativeCityName ?? city.name}`),
    `${country.name} weather`,
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

export default async function CityPage({ params }: PageProps) {
  const found = findCity(params.country, params.city);
  if (!found) notFound();
  const { country, city } = found;

  const location = locationFromSeed(country.slug, city.slug);
  if (!location) notFound();

  const { bundles, errors } = await getForecastBundles(location);
  const primary = bundles[0];
  const guide = getCityGuide(country.slug, city.slug);

  const nearby = country.cities
    .filter((c) => c.slug !== city.slug)
    .slice(0, 4)
    .map((c) => ({ country, city: c }));

  const faqItems = primary
    ? [
        {
          question: `What is the weather in ${city.name} today?`,
          answer: `Right now ${city.name} shows ${primary.current.conditionLabel.toLowerCase()} conditions at around ${Math.round(
            primary.current.temperature
          )}°C, based on ${primary.provider.name}. Compare this with the other sources above for a fuller picture.`,
        },
        {
          question: `What is the temperature in ${city.name}?`,
          answer: `The current temperature in ${city.name} is approximately ${Math.round(primary.current.temperature)}°C, feeling like ${Math.round(
            primary.current.feelsLike
          )}°C. See the hourly forecast above for how it will change through the day.`,
        },
        {
          question: `Will it rain in ${city.name} today?`,
          answer: `The precipitation probability for ${city.name} is around ${primary.current.precipitationProbability}% according to ${primary.provider.name}. Check the Rain forecast section for the hour-by-hour breakdown.`,
        },
        {
          question: `What is the 10-day forecast for ${city.name}?`,
          answer: `Scroll up to the 10-day forecast section for daily highs, lows and rain probability for ${city.name}, or use the comparison chart to see how different sources see the coming days.`,
        },
      ]
    : [];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: country.name, item: `${siteConfig.url}/weather/${country.slug}` },
        { "@type": "ListItem", position: 3, name: city.name, item: `${siteConfig.url}/weather/${country.slug}/${city.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${city.name} Weather Forecast`,
      url: `${siteConfig.url}/weather/${country.slug}/${city.slug}`,
    },
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null,
    guide
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Landmarks in ${city.name}`,
          itemListElement: guide.landmarks.map((landmark, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "TouristAttraction",
              name: landmark.name,
              description: landmark.description,
              containedInPlace: { "@type": "City", name: city.name },
            },
          })),
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/weather/${country.slug}` },
          { label: city.name },
        ]}
      />

      {!primary ? (
        <ErrorState message="Weather data is temporarily unavailable for this location." />
      ) : (
        <div className="space-y-10">
          <WeatherDashboard
            location={location}
            current={primary.current}
            timezone={city.timezone}
            countrySlug={country.slug}
            citySlug={city.slug}
          />

          {errors.length > 0 && (
            <p className="rounded-lg bg-amber-50 px-4 py-2.5 text-xs text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
              {errors.length} of {bundles.length + errors.length} sources could not be reached and were left out of this comparison.
            </p>
          )}

          <ForecastComparison bundles={bundles} />

          <AdSlot variant="banner" />

          <HourlyForecast hourly={primary.hourly} />
          <DailyForecast daily={primary.daily} />

          <div className="grid gap-6 lg:grid-cols-2">
            <RainSection hourly={primary.hourly} />
            <WindSection current={primary.current} hourly={primary.hourly} daily={primary.daily} />
          </div>

          <WeatherAlerts alerts={primary.alerts} />
          <WeatherMap location={location} />

          {guide && <CityGuide cityName={city.name} guide={guide} />}

          <section aria-labelledby="about-heading" className="rounded-xl3 border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
            <h2 id="about-heading" className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
              About {city.name} weather
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {city.name}, in {city.region}, {country.name}, sits at approximately {city.lat.toFixed(2)}°N, {city.lon.toFixed(2)}°E. The
              forecasts above are aggregated from multiple independent weather data providers so you can see, at a glance, where they
              agree and where they diverge — useful context for planning travel, outdoor activities, or daily commutes in and around{" "}
              {city.name}.
            </p>
          </section>

          {faqItems.length > 0 && <CityFaq title="Frequently asked questions" items={faqItems} />}

          {nearby.length > 0 && <CityGrid title="Nearby cities" items={nearby} />}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-slate-400">
        Looking for another country?{" "}
        <Link href="/" className="font-medium text-brand-600 hover:underline">
          Browse all {countries.length}+ countries
        </Link>
      </p>
    </div>
  );
}
