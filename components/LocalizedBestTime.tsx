import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { nearestCities } from "@/config/world";
import { cityProfile } from "@/lib/content/cityProfile";
import { siteConfig } from "@/config/site";
import type { CountrySeed, CitySeed } from "@/config/countries";
import { getCityClimate, climateHighsFor } from "@/lib/data/climate";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroPhoto } from "@/components/HeroPhoto";
import { CityFaq } from "@/components/CityFaq";
import { CityGrid } from "@/components/CityGrid";
import { ShareBar } from "@/components/ShareBar";
import { InsightList } from "@/components/InsightList";
import { BestTimeContent } from "@/components/BestTimeContent";
import { monthFacts } from "@/lib/content/insights";
import { renderInsights } from "@/lib/i18n/insights";
import { getCopy, joinList } from "@/lib/i18n/copy";
import { bestTimeCopy, analyseClimate, bestTimeFaq } from "@/lib/i18n/bestTime";
import { paths, monthInfo, type AnyLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { localizedMetadata } from "@/lib/i18n/pageMeta";
import { keywordsFor } from "@/lib/i18n/keywords";

export function bestTimeMetadata(locale: AnyLocale, country: CountrySeed, city: CitySeed): Metadata {
  const climate = getCityClimate(country.slug, city.slug);
  if (!climate) return {};
  const t = bestTimeCopy(locale);
  const c = cityName(city.slug, city.name, locale);
  const f = analyseClimate(climate);
  const best = joinList(locale, f.best.map((m) => monthInfo(locale).monthNames[m]!));
  return localizedMetadata(locale, { kind: "bestTime", country: country.slug, city: city.slug }, t.title(c), t.desc(c, best), { keywords: keywordsFor(locale).best(c) });
}

export async function LocalizedBestTime({ locale, country, city }: { locale: AnyLocale; country: CountrySeed; city: CitySeed }) {
  const climate = getCityClimate(country.slug, city.slug);
  if (!climate) notFound();
  const t = bestTimeCopy(locale);
  const copy = getCopy(locale);
  const cn = cityName(city.slug, city.name, locale);
  const kn = countryName(country.slug, country.name, locale);
  const facts = analyseClimate(climate);
  const faq = bestTimeFaq(locale, cn, climate, facts);
  const heroPhoto = await getLandscapePhoto(`${city.name} ${country.name} landmark`);
  const url = `${siteConfig.url}${paths.bestTime(locale, country.slug, city.slug)}`;
  const mn = monthInfo(locale).monthNames;
  const bestList = joinList(locale, facts.best.map((m) => mn[m]!));

  const nearby = nearestCities(city, 4, { sameCountry: country.slug }).map(({ country: co, city: ci }) => ({ country: co, city: ci }));
  const nameFor = (co: CountrySeed, ci: CitySeed) => ({ city: cityName(ci.slug, ci.name, locale), country: countryName(co.slug, co.name, locale) });

  // Data-driven notes for the best month, so each page has its own prose.
  const m0 = facts.best[0]!;
  const notes = renderInsights(
    locale,
    monthFacts({ country, city, climate, m: m0, nameOf: (c) => cityName(c.slug, c.name, locale), max: 3 }),
    cn,
    m0,
    `${country.slug}/${city.slug}/${m0}:best`
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: `${siteConfig.url}${paths.home(locale)}` },
        { "@type": "ListItem", position: 2, name: kn, item: `${siteConfig.url}${paths.country(locale, country.slug)}` },
        { "@type": "ListItem", position: 3, name: cn, item: `${siteConfig.url}${paths.city(locale, country.slug, city.slug)}` },
        { "@type": "ListItem", position: 4, name: t.eyebrow, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.h1(cn),
      description: t.answer(cn, bestList, facts.bestLo, facts.bestHi, facts.bestRain),
      inLanguage: locale,
      url,
      dateModified: "2026-09-27",
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroPhoto photo={heroPhoto} priority />
      <Breadcrumb
        items={[
          { label: copy.home, href: paths.home(locale) },
          { label: kn, href: paths.country(locale, country.slug) },
          { label: cn, href: paths.city(locale, country.slug, city.slug) },
          { label: t.eyebrow },
        ]}
      />

      <article className="mx-auto max-w-4xl">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
          <CalendarDays size={14} aria-hidden="true" /> {t.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{t.h1(cn)}</h1>
        <ShareBar className="mt-4" url={url} title={t.h1(cn)} pinDescription={t.desc(cn, bestList)} />
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {cityProfile(locale, { city: cn, seed: `${country.slug}/${city.slug}:bt`, lat: city.lat, climate, neighbours: [] }).join(" ")}
        </p>

        <div className="mt-6">
          <BestTimeContent locale={locale} cityLabel={cn} countrySlug={country.slug} citySlug={city.slug} climate={climate} facts={facts} />
        </div>

        {notes.length > 0 && (
          <div className="mt-10">
            <InsightList title={t.qWhy(cn, mn[m0]!)} items={notes} />
          </div>
        )}

        <div className="mt-10">
          <CityFaq title={t.faqH} items={faq} locale={locale} />
        </div>

        <p className="mt-6 text-xs text-slate-400">{t.source}</p>
      </article>

      {nearby.length > 0 && (
        <div className="mx-auto mt-12 max-w-4xl">
          <CityGrid
            title={t.moreH(kn)}
            items={nearby}
            hrefFor={(co, ci) => paths.bestTime(locale, co.slug, ci.slug)}
            nameFor={nameFor}
            climate={climateHighsFor(nearby)}
            highsLabel={copy.highsRange}
            viewLabel={t.eyebrow}
            monthShort={copy.monthShort}
          />
        </div>
      )}

      <p className="mt-10 text-center text-xs text-slate-400">
        <Link href={paths.country(locale, country.slug)} className="font-medium text-brand-600 hover:underline">
          {kn}
        </Link>
      </p>
    </div>
  );
}
