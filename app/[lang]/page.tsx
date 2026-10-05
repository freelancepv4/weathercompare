import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Compass, BookOpen } from "lucide-react";
import { siteConfig } from "@/config/site";
import { countries, type CountrySeed, type CitySeed } from "@/config/countries";
import { climateHighsFor } from "@/lib/data/climate";
import { Hero } from "@/components/Hero";
import { CityGrid } from "@/components/CityGrid";
import { getCopy } from "@/lib/i18n/copy";
import { CONTENT_LOCALES, isContentLocale, paths, monthInfo, type ContentLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { LOCAL_REGION } from "@/lib/i18n/trending";
import { regionOf } from "@/lib/tripScore";
import { localizedMetadata } from "@/lib/i18n/pageMeta";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return CONTENT_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  if (!isContentLocale(params.lang)) return {};
  const copy = getCopy(params.lang);
  return localizedMetadata(params.lang, { kind: "home" }, copy.homeTitle, copy.homeDesc);
}

type Item = { country: CountrySeed; city: CitySeed };

export default async function LocalizedHome(props: PageProps) {
  const params = await props.params;
  if (!isContentLocale(params.lang)) notFound();
  const locale: ContentLocale = params.lang;
  const copy = getCopy(locale);
  const region = LOCAL_REGION[locale];
  const mi = monthInfo(locale);
  const month = new Date().getMonth();

  const nameFor = (country: CountrySeed, city: CitySeed) => ({
    city: cityName(city.slug, city.name, locale),
    country: countryName(country.slug, country.name, locale),
  });
  const hrefFor = (country: CountrySeed, city: CitySeed) => paths.city(locale, country.slug, city.slug);

  const homeCountry = countries.find((c) => c.slug === region.countries[0]);
  const local: Item[] = countries
    .filter((c) => region.countries.includes(c.slug))
    .flatMap((country) => country.cities.map((city) => ({ country, city })))
    .slice(0, 12);
  const europe: Item[] = countries
    .filter((c) => regionOf(c.slug) === "Europe" && !region.countries.includes(c.slug))
    .map((country) => ({ country, city: country.cities[0]! }))
    .slice(0, 12);
  const world: Item[] = countries
    .filter((c) => regionOf(c.slug) !== "Europe" && !region.countries.includes(c.slug))
    .map((country) => ({ country, city: country.cities[0]! }))
    .slice(0, 8);
  const climate = climateHighsFor([...local, ...europe, ...world]);
  const gridProps = { nameFor, hrefFor, climate, highsLabel: copy.highsRange, viewLabel: copy.viewForecast, monthShort: copy.monthShort };

  const heroLinks = [...local.slice(0, 5), ...europe.slice(0, 3)].map((x) => ({
    href: hrefFor(x.country, x.city),
    label: nameFor(x.country, x.city).city,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${siteConfig.url}${paths.home(locale)}`,
    inLanguage: locale,
    description: copy.homeDesc,
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero title={copy.homeH1} subtitle={copy.homeIntro} links={heroLinks} />

      <div className="container-page space-y-16 py-12 sm:py-16">
        <section className="grid gap-5 lg:grid-cols-3" aria-label={copy.cardToday.title}>
          <Link
            href={paths.today(locale)}
            className="group relative overflow-hidden rounded-xl3 bg-gradient-to-br from-brand-600 via-indigo-600 to-sky-500 p-7 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
          >
            <CalendarDays size={110} className="absolute -bottom-6 -right-6 text-white/15" aria-hidden="true" />
            <h2 className="text-2xl font-bold">{copy.cardToday.title}</h2>
            <p className="mt-2 max-w-sm text-sm text-white/85">{copy.cardToday.text}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700">
              {copy.cardToday.cta} <ArrowRight size={15} aria-hidden="true" />
            </span>
          </Link>
          <Link
            href={paths.tripFinder(locale)}
            className="group relative overflow-hidden rounded-xl3 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-7 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
          >
            <Compass size={110} className="absolute -bottom-6 -right-6 text-white/15" aria-hidden="true" />
            <h2 className="text-2xl font-bold">{copy.cardTrip.title}</h2>
            <p className="mt-2 max-w-sm text-sm text-white/85">{copy.cardTrip.text}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700">
              {copy.cardTrip.cta} <ArrowRight size={15} aria-hidden="true" />
            </span>
          </Link>
          <div className="rounded-xl3 border border-slate-200 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{copy.cardWhere.title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{copy.cardWhere.text}</p>
            <ul className="mt-4 grid grid-cols-4 gap-2">
              {copy.monthShort.map((short, i) => (
                <li key={short}>
                  <Link
                    href={paths.whereToGo(locale, i)}
                    title={copy.whereH1(i)}
                    className={`block rounded-xl px-1 py-2 text-center text-xs font-semibold transition-colors hover:bg-brand-600 hover:text-white ${
                      i === month ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-200"
                    }`}
                  >
                    {short}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="sr-only">{mi.monthNames.join(", ")}</p>
          </div>
        </section>

        {local.length > 0 && homeCountry && (
          <CityGrid title={copy.homeLocal(countryName(homeCountry.slug, homeCountry.name, locale))} items={local} {...gridProps} />
        )}


        <CityGrid title={copy.homeEurope} items={europe} {...gridProps} />
        <CityGrid title={copy.homeWorld} items={world} {...gridProps} />

        <nav aria-labelledby="countries-heading" className="rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
          <h2 id="countries-heading" className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            {copy.homeCountries}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link
                  href={paths.country(locale, c.slug)}
                  className="inline-block rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-slate-300"
                >
                  {countryName(c.slug, c.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <BookOpen size={16} aria-hidden="true" /> {copy.guidesNote}:
          <Link href="/guides" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
            {copy.guidesLink} →
          </Link>
        </p>
      </div>
    </>
  );
}
