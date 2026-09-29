import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass } from "lucide-react";
import { siteConfig } from "@/config/site";
import { tripFinderCitiesWithClimate } from "@/lib/data/climate";
import { worldRegionOf } from "@/config/world";
import { regionOf, COUNTRY_REGIONS } from "@/lib/tripScore";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ShareBar } from "@/components/ShareBar";
import { TripFinder, type FinderCity } from "@/components/TripFinder";
import { WeatherTodayView } from "@/components/today/WeatherTodayView";
import { getCopy, tripUi } from "@/lib/i18n/copy";
import { CONTENT_LOCALES, ROUTING, isContentLocale, paths, monthInfo, type ContentLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { localizedMetadata } from "@/lib/i18n/pageMeta";
import { getDailySnapshot } from "@/lib/services/dailyWeather";
import { CountriesIndex, COUNTRIES_COPY, countriesIndexStats } from "@/components/CountriesIndex";
import { FaqPage } from "@/components/FaqPage";
import { FAQ_COPY } from "@/lib/content/faq";

// The "weather today" page refreshes hourly; the trip finder is static data
// and simply gets re-rendered alongside it.
export const revalidate = 10800; // 3h literal (Next requires a static value); keep in step with DAILY_REVALIDATE
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ lang: string; section: string }>;
}

export function generateStaticParams() {
  return CONTENT_LOCALES.flatMap((lang) => [
    { lang, section: ROUTING[lang].tripFinder },
    { lang, section: ROUTING[lang].today },
    { lang, section: ROUTING[lang].weather },
    { lang, section: ROUTING[lang].faq },
  ]);
}

function resolve(params: Awaited<PageProps["params"]>): { locale: ContentLocale; kind: "tripFinder" | "today" | "countries" | "faq" } | null {
  if (!isContentLocale(params.lang)) return null;
  const r = ROUTING[params.lang];
  if (params.section === r.tripFinder) return { locale: params.lang, kind: "tripFinder" };
  if (params.section === r.today) return { locale: params.lang, kind: "today" };
  if (params.section === r.weather) return { locale: params.lang, kind: "countries" };
  if (params.section === r.faq) return { locale: params.lang, kind: "faq" };
  return null;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const x = resolve(params);
  if (!x) return {};
  const copy = getCopy(x.locale);
  if (x.kind === "faq") return localizedMetadata(x.locale, { kind: "faq" }, FAQ_COPY[x.locale].title, FAQ_COPY[x.locale].desc);
  if (x.kind === "countries") {
    const t = COUNTRIES_COPY[x.locale];
    const s = countriesIndexStats(x.locale);
    return localizedMetadata(x.locale, { kind: "countries" }, t.title, t.desc(s.countries, s.cities));
  }
  return x.kind === "today"
    ? localizedMetadata(x.locale, { kind: "today" }, copy.todayTitle, copy.todayDesc)
    : localizedMetadata(x.locale, { kind: "tripFinder" }, copy.tripTitle, copy.tripDesc);
}

export default async function SectionPage(props: PageProps) {
  const params = await props.params;
  const x = resolve(params);
  if (!x) notFound();
  const { locale } = x;

  if (x.kind === "countries") return <CountriesIndex locale={locale} />;
  if (x.kind === "faq") return <FaqPage locale={locale} />;

  if (x.kind === "today") {
    const snapshot = await getDailySnapshot();
    return <WeatherTodayView locale={locale} snapshot={snapshot} />;
  }

  const copy = getCopy(locale);
  const cities: FinderCity[] = tripFinderCitiesWithClimate().map(({ country, city, climate }) => ({
    country: countryName(country.slug, country.name, locale),
    countrySlug: country.slug,
    city: cityName(city.slug, city.name, locale),
    citySlug: city.slug,
    region: COUNTRY_REGIONS[country.slug] ?? worldRegionOf(country.slug) ?? regionOf(country.slug),
    climate,
  }));
  const url = `${siteConfig.url}${paths.tripFinder(locale)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.tripH1,
    url,
    inLanguage: locale,
    description: copy.tripDesc,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: copy.home, href: paths.home(locale) }, { label: copy.tripCrumb }]} />

      <header className="relative mb-8 overflow-hidden rounded-xl3 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 px-6 py-10 text-white sm:px-10">
        <Compass size={160} className="absolute -right-8 -top-8 text-white/10" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{copy.tripH1}</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">{copy.tripIntro(cities.length)}</p>
        </div>
      </header>
      <ShareBar className="-mt-3 mb-8" url={url} title={copy.tripTitle} />

      <TripFinder cities={cities} initialMonth={new Date().getMonth()} ui={tripUi(locale)} locale={locale} />

      <nav className="mt-12" aria-labelledby="months-heading">
        <h2 id="months-heading" className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          {copy.whereMonthsH}
        </h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {monthInfo(locale).monthNames.map((name, i) => (
            <li key={name}>
              <Link
                href={paths.whereToGo(locale, i)}
                className="block rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:text-slate-200"
              >
                {copy.whereH1(i)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
