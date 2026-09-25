import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
import { findCity, countries, type CountrySeed, type CitySeed } from "@/config/countries";
import { locationFromSeed } from "@/lib/providers/geocoding";
import { getForecastBundles } from "@/lib/services/weatherService";
import { getCityGuide } from "@/lib/data/cityGuides";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { getCityClimate, climateHighsFor } from "@/lib/data/climate";
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
import { CityFaq } from "@/components/CityFaq";
import { CityGrid } from "@/components/CityGrid";
import { MonthLinks } from "@/components/ClimateChart";
import { AdSlot } from "@/components/AdSlot";
import { InsightList } from "@/components/InsightList";
import { monthFacts } from "@/lib/content/insights";
import { renderInsights, insightsHeading } from "@/lib/i18n/insights";
import { ShareBar } from "@/components/ShareBar";
import { ErrorState } from "@/components/ErrorState";
import { getCopy, bestMonths, joinList } from "@/lib/i18n/copy";
import { ROUTING, isContentLocale, paths, monthInfo, type ContentLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { localizedMetadata } from "@/lib/i18n/pageMeta";

// Same cache window as the English city pages (and the providers' own fetch
// cache) — see siteConfig.weatherCacheSeconds for the rate-limit maths.
// Rendered on first visit, then cached (not pre-built), which keeps deploys
// fast with 7 languages × every city.
export const revalidate = 43200; // 12h — keep in step with siteConfig.weatherCacheSeconds (ISR write budget)
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

interface PageProps {
  params: { lang: string; section: string; country: string; city: string };
}

function resolve(p: PageProps["params"]) {
  if (!isContentLocale(p.lang) || p.section !== ROUTING[p.lang].weather) return null;
  const found = findCity(p.country, p.city);
  return found ? { locale: p.lang as ContentLocale, ...found } : null;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const x = resolve(params);
  if (!x) return {};
  const copy = getCopy(x.locale);
  const c = cityName(x.city.slug, x.city.name, x.locale);
  return localizedMetadata(x.locale, { kind: "city", country: x.country.slug, city: x.city.slug }, copy.cityTitle(c), copy.cityDesc(c));
}

export default async function LocalizedCityPage({ params }: PageProps) {
  const x = resolve(params);
  if (!x) notFound();
  const { locale, country, city } = x;
  const copy = getCopy(locale);
  const cn = cityName(city.slug, city.name, locale);
  const kn = countryName(country.slug, country.name, locale);

  const location = locationFromSeed(country.slug, city.slug);
  if (!location) notFound();
  const { bundles, errors } = await getForecastBundles(location);
  const primary = bundles[0];
  const heroPhoto = await getLandscapePhoto(`${city.name} ${country.name} landmark`);
  const climate = getCityClimate(country.slug, city.slug);
  const guide = getCityGuide(country.slug, city.slug);
  const mi = monthInfo(locale);
  const best = climate ? joinList(locale, bestMonths(climate).map((m) => mi.monthNames[m]!)) : null;

  const nearby = country.cities
    .filter((c) => c.slug !== city.slug)
    .slice(0, 4)
    .map((c) => ({ country, city: c }));
  const nameFor = (co: CountrySeed, ci: CitySeed) => ({ city: cityName(ci.slug, ci.name, locale), country: countryName(co.slug, co.name, locale) });

  // The daily list uses whichever source forecasts furthest ahead (Open-Meteo: 16 days).
  const longestDaily = bundles.reduce((best, b) => (b.daily.length > best.length ? b.daily : best), primary?.daily ?? []);
  const tomorrow = primary?.daily[1];
  const faqItems = primary
    ? [
        { question: copy.faqTempQ(cn), answer: copy.faqTempA(cn, Math.round(primary.current.temperature), Math.round(primary.current.feelsLike), primary.provider.name) },
        { question: copy.faqRainQ(cn), answer: copy.faqRainA(cn, primary.current.precipitationProbability, primary.provider.name) },
        ...(tomorrow
          ? [{ question: copy.faqTomorrowQ(cn), answer: copy.faqTomorrowA(cn, Math.round(tomorrow.tempMax), Math.round(tomorrow.tempMin), tomorrow.precipitationProbability) }]
          : []),
        { question: copy.faqTenQ(cn), answer: copy.faqTenA(cn) },
        ...(best ? [{ question: copy.faqBestQ(cn), answer: copy.faqBestA(cn, best) }] : []),
      ]
    : [];

  const url = `${siteConfig.url}${paths.city(locale, country.slug, city.slug)}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: `${siteConfig.url}${paths.home(locale)}` },
        { "@type": "ListItem", position: 2, name: kn, item: `${siteConfig.url}${paths.country(locale, country.slug)}` },
        { "@type": "ListItem", position: 3, name: cn, item: url },
      ],
    },
    { "@context": "https://schema.org", "@type": "WebPage", name: copy.cityH1(cn), url, inLanguage: locale },
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
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
          { label: copy.home, href: paths.home(locale) },
          { label: kn, href: paths.country(locale, country.slug) },
          { label: cn },
        ]}
      />

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{copy.cityH1(cn)}</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{copy.cityIntro(cn, kn)}</p>
      </header>

      {!primary ? (
        <ErrorState message={copy.unavailable} />
      ) : (
        <div className="space-y-10">
          <WeatherDashboard
            location={{ ...location, name: cn, country: kn }}
            current={primary.current}
            timezone={city.timezone}
            countrySlug={country.slug}
            citySlug={city.slug}
            headingAs="h2"
          />

          {errors.length > 0 && (
            <p className="rounded-lg bg-amber-50 px-4 py-2.5 text-xs text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
              {copy.sourcesDown(errors.length, bundles.length + errors.length)}
            </p>
          )}

          <ForecastComparison bundles={bundles} />
          <AdSlot variant="banner" />
          <HourlyForecast hourly={primary.hourly} />
          <DailyForecast daily={longestDaily} />

          <div className="grid gap-6 lg:grid-cols-2">
            <RainSection hourly={primary.hourly} />
            <WindSection current={primary.current} hourly={primary.hourly} daily={primary.daily} />
          </div>

          <WeatherAlerts alerts={primary.alerts} />
          <WeatherMap location={location} current={primary.current} />

          {climate && (
            <>
              <InsightList
                title={insightsHeading(locale, new Date().getMonth())}
                items={renderInsights(
                  locale,
                  monthFacts({ country, city, climate, m: new Date().getMonth(), nameOf: (c) => cityName(c.slug, c.name, locale), max: 3 }),
                  cn,
                  new Date().getMonth(),
                  `${country.slug}/${city.slug}/${new Date().getMonth()}:live`
                )}
              />
              <MonthLinks countrySlug={country.slug} citySlug={city.slug} cityName={cn} locale={locale} />
              {best && (
                <p className="-mt-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <CalendarDays size={16} className="text-emerald-500" aria-hidden="true" /> {copy.faqBestA(cn, best)}
                </p>
              )}
            </>
          )}

          {guide && (
            <p className="text-sm">
              <Link href={`/guides/best-time-to-visit/${country.slug}/${city.slug}`} className="font-medium text-brand-600 hover:underline" hrefLang="en">
                {copy.englishGuide(cn)}
              </Link>
            </p>
          )}

          <div className="rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">{copy.shareCity(cn)}</p>
            <ShareBar url={url} title={copy.shareCityTitle(cn)} pinDescription={copy.cityDesc(cn)} />
          </div>

          <section aria-labelledby="about-heading" className="rounded-xl3 border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
            <h2 id="about-heading" className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
              {copy.aboutH(cn)}
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {copy.aboutText(cn, kn, city.lat.toFixed(2), city.lon.toFixed(2))}
            </p>
          </section>

          {faqItems.length > 0 && <CityFaq title={copy.faqH} items={faqItems} />}

          {nearby.length > 0 && (
            <CityGrid
              title={copy.nearby}
              items={nearby}
              hrefFor={(co, ci) => paths.city(locale, co.slug, ci.slug)}
              nameFor={nameFor}
              climate={climateHighsFor(nearby)}
              highsLabel={copy.highsRange}
              viewLabel={copy.viewForecast}
              monthShort={copy.monthShort}
            />
          )}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-slate-400">
        <Link href={paths.home(locale)} className="font-medium text-brand-600 hover:underline">
          {copy.moreCountries(countries.length)}
        </Link>
      </p>
    </div>
  );
}
