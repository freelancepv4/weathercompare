import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { findCity, coreCityPaths, countries, nearestCities } from "@/config/world";
import { locationFromSeed } from "@/lib/providers/geocoding";
import { getForecastBundles } from "@/lib/services/weatherService";
import { getCityGuide } from "@/lib/data/cityGuides";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { siteConfig, defaultOgImage } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroPhoto } from "@/components/HeroPhoto";
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
import { MonthLinks } from "@/components/ClimateChart";
import { getCityClimate, climateHighsFor } from "@/lib/data/climate";
import { InsightList } from "@/components/InsightList";
import { monthFacts } from "@/lib/content/insights";
import { renderInsights } from "@/lib/i18n/insights";
import { ShareBar } from "@/components/ShareBar";
import { seoTitle, seoDescription } from "@/lib/seo";
import { localCityName } from "@/lib/i18n/places";
import { ErrorState } from "@/components/ErrorState";
import { cityProfile } from "@/lib/content/cityProfile";
import { formatCoords } from "@/lib/utils/format";
import { hreflang } from "@/lib/i18n/pageMeta";

// This page stays fully static/ISR (no searchParams) so the pre-built
// cities in config/countries.ts keep their fast, SEO-friendly pages. Cities
// outside that seed list are handled by /weather/search instead — see
// components/SearchBar.tsx for how the two are chosen between.
// Kept in lockstep with each live provider's own fetch cache window — see
// the comment on siteConfig.weatherCacheSeconds for the rate-limit math.
export const revalidate = 43200; // 12h literal (must be static for Next.js); matches siteConfig.weatherCacheSeconds

interface PageProps {
  params: Promise<{ country: string; city: string }>;
}

export async function generateStaticParams() {
  // Core cities are pre-built; the 1,700+ world cities render on first visit (ISR).
  return coreCityPaths();
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
  AT: ["wetter", "wettervorhersage"],
  CH: ["wetter", "météo"],
  NL: ["weer", "weersverwachting"],
  PT: ["tempo", "previsão do tempo"],
  BR: ["tempo", "previsão do tempo"],
  MX: ["tiempo", "pronóstico del tiempo"],
  GR: ["καιρός", "πρόγνωση καιρού"],
  TR: ["hava durumu"],
  JP: ["天気", "天気予報"],
  KR: ["날씨", "일기예보"],
  TH: ["สภาพอากาศ"],
  IN: ["मौसम"],
  AE: ["الطقس", "توقعات الطقس"],
  EG: ["الطقس", "توقعات الطقس"],
  MA: ["الطقس"],
  PK: ["موسم", "موسم کی پیشن گوئی"],
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const found = findCity(params.country, params.city);
  if (!found) return {};
  const { country, city } = found;
  const native = localCityName(country.slug, city.slug, city.name);
  // Include the local name ("Florence (Firenze)") so the page also matches
  // searches in that form, and "14-day"/"tomorrow" phrasing people use.
  const longNative = `${city.name} (${native}) Weather — 14-Day Forecast`;
  const title = native
    ? longNative.length <= 60
      ? longNative
      : `${city.name} (${native}) Weather — 14-Day Forecast`
    : `${city.name} Weather Today & Tomorrow — 14-Day Forecast`;
  const description = `${city.name}${native ? ` (${native})` : ""} weather right now, tomorrow and the next 14 days — hourly temperature, rain probability and wind compared across three forecast sources. Updated every 12 hours.`;
  const url = `${siteConfig.url}/weather/${country.slug}/${city.slug}`;

  const nativeCityName = native ?? undefined;
  const nativeTerms = COUNTRY_WEATHER_TERMS[country.isoCode] ?? [];
  const keywords = [
    `${city.name} weather`,
    `${city.name} weather today`,
    `${city.name} weather tomorrow`,
    `${city.name} forecast`,
    `${city.name} 14 day forecast`,
    `weather in ${city.name}`,
    ...(nativeCityName ? [`${nativeCityName} weather`] : []),
    ...(nativeCityName ? [`${nativeCityName} meteo`] : []),
    ...nativeTerms.map((term) => `${term} ${nativeCityName ?? city.name}`),
    `${country.name} weather`,
  ];

  return {
    title: seoTitle(title),
    description: seoDescription(description),
    keywords,
    alternates: { canonical: url, ...hreflang({ kind: "city", country: country.slug, city: city.slug }) },
    openGraph: { type: "website", siteName: siteConfig.name, title, description, url, images: [defaultOgImage] },
    twitter: { card: "summary_large_image", title, description, images: [defaultOgImage] },
  };
}

export default async function CityPage(props: PageProps) {
  const params = await props.params;
  const found = findCity(params.country, params.city);
  if (!found) notFound();
  const { country, city } = found;

  const location = locationFromSeed(country.slug, city.slug);
  if (!location) notFound();

  const nativeName = localCityName(country.slug, city.slug, city.name);
  const profile = cityProfile("en", {
    city: city.name,
    seed: `${country.slug}/${city.slug}`,
    lat: city.lat,
    climate: getCityClimate(country.slug, city.slug),
    neighbours: nearestCities(city, 3).map((n) => ({ name: n.city.name, km: Math.round(n.km) })),
  });
  const { bundles, errors } = await getForecastBundles(location);
  const primary = bundles[0];
  const guide = getCityGuide(country.slug, city.slug);
  const heroPhoto = await getLandscapePhoto(`${city.name} ${country.name} landmark`);

  // The daily list uses whichever source forecasts furthest ahead (Open-Meteo: 16 days).
  const longestDaily = bundles.reduce((best, b) => (b.daily.length > best.length ? b.daily : best), primary?.daily ?? []);
  const tomorrow = primary?.daily[1];

  // Geographically closest cities with a page (internal links between neighbours).
  const nearby = nearestCities(city, 6).map(({ country: co, city: ci }) => ({ country: co, city: ci }));

  const faqItems = primary
    ? [
        {
          question: `What is the weather in ${city.name} today?`,
          answer: `Right now ${city.name} shows ${primary.current.conditionLabel.toLowerCase()} conditions at around ${Math.round(
            primary.current.temperature
          )}°C (feels like ${Math.round(primary.current.feelsLike)}°C), based on ${primary.provider.name}. The chance of rain today is about ${primary.current.precipitationProbability}%. Compare this with the other sources above for a fuller picture.`,
        },
        ...(tomorrow
          ? [
              {
                question: `What is the weather in ${city.name} tomorrow?`,
                answer: `Tomorrow in ${city.name}: expect a high of ${Math.round(tomorrow.tempMax)}°C and a low of ${Math.round(tomorrow.tempMin)}°C, with a ${tomorrow.precipitationProbability}% chance of rain. See the hourly breakdown above for more detail.`,
              },
            ]
          : []),
        {
          question: `Will it rain in ${city.name} today?`,
          answer: `The precipitation probability for ${city.name} is around ${primary.current.precipitationProbability}% according to ${primary.provider.name}. Check the Rain forecast section for the hour-by-hour breakdown and compare with other sources.`,
        },
        {
          question: `What is the 14-day forecast for ${city.name}?`,
          answer: `The 14-day forecast above shows daily highs, lows and rain probability for ${city.name} from multiple sources; compare them to see how confident the outlook is.`,
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

      <HeroPhoto photo={heroPhoto} priority />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/weather/${country.slug}` },
          { label: city.name },
        ]}
      />

      <p className="-mt-3 mb-4 max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {city.name}
        {nativeName ? ` (${nativeName})` : ""} weather for today, tomorrow and the next 14 days, compared across three independent forecast sources
        so you can see where they agree before you plan your day.
        {primary && tomorrow && (
          <> Right now it is {Math.round(primary.current.temperature)}°C and {primary.current.conditionLabel.toLowerCase()} in {city.name}.
          Tomorrow&apos;s forecast: highs of {Math.round(tomorrow.tempMax)}°C, lows of {Math.round(tomorrow.tempMin)}°C{tomorrow.precipitationProbability > 20 ? ` with a ${tomorrow.precipitationProbability}% chance of rain` : ""}.
          </>
        )}
      </p>
      <p className="mb-6 text-xs text-slate-400 dark:text-slate-500">
        Sources: Open-Meteo, OpenWeather, WeatherAPI · Updated every 12 hours
      </p>

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

          <ForecastComparison bundles={bundles} timeZone={city.timezone} />


          <HourlyForecast hourly={primary.hourly} timeZone={city.timezone} />
          <DailyForecast daily={longestDaily} />

          <div className="grid gap-6 lg:grid-cols-2">
            <RainSection hourly={primary.hourly} timeZone={city.timezone} />
            <WindSection current={primary.current} hourly={primary.hourly} daily={primary.daily} timeZone={city.timezone} />
          </div>

          <WeatherAlerts alerts={primary.alerts} timeZone={city.timezone} />
          <WeatherMap location={location} current={primary.current} />

          {guide && (
            <>
              <CityGuide cityName={city.name} guide={guide} />
              <p className="-mt-6 text-sm">
                <Link
                  href={`/guides/best-time-to-visit/${country.slug}/${city.slug}`}
                  className="font-medium text-brand-600 hover:underline"
                >
                  Read the full {city.name} best-time-to-visit guide →
                </Link>
              </p>
            </>
          )}

          {(() => {
            const climate = getCityClimate(country.slug, city.slug);
            if (!climate) return null;
            // "This time of year" notes for the current month — rebuilt with the page.
            const m = new Date().getMonth();
            const items = renderInsights(
              "en",
              monthFacts({ country, city, climate, m, landmarks: guide?.landmarks, max: 3 }),
              city.name,
              m,
              `${country.slug}/${city.slug}/${m}:live`
            );
            return (
              <>
                <InsightList title={`${city.name} this time of year`} items={items} />
                <MonthLinks countrySlug={country.slug} citySlug={city.slug} cityName={city.name} />
              </>
            );
          })()}

          <div className="rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Planning a trip to {city.name}? Save or share this forecast.</p>
            <ShareBar
              url={`${siteConfig.url}/weather/${country.slug}/${city.slug}`}
              title={`${city.name} weather forecast, compared`}
              pinImage={`${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}/opengraph-image`}
              pinDescription={`${city.name} weather compared across multiple forecast sources, plus the best time to visit ${city.name}.`}
            />
          </div>

          <section aria-labelledby="about-heading" className="rounded-xl3 border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
            <h2 id="about-heading" className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
              {city.name} weather overview: climate, seasons and what to expect
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {city.name}
              {city.region && city.region !== city.name ? `, in ${city.region}, ${country.name},` : `, ${country.name},`} sits at approximately{" "}
              {formatCoords(city.lat, city.lon)}
              {city.population >= 1000 ? ` and is home to about ${new Intl.NumberFormat("en-GB").format(Math.round(city.population / 1000) * 1000)} people` : ""}.
              This page compares forecasts from three independent weather providers — Open-Meteo, OpenWeather and WeatherAPI — so you can see at a glance where they agree and where they differ. The data refreshes every 12 hours via ISR.
            </p>
            {profile.length > 0 && (
              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{profile.join(" ")}</p>
            )}
          </section>

          {faqItems.length > 0 && <CityFaq title="Frequently asked questions" items={faqItems} />}

          {nearby.length > 0 && <CityGrid title="Nearby cities" items={nearby} climate={climateHighsFor(nearby)} />}
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
