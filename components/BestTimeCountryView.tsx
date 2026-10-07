import Link from "next/link";
import { CalendarDays, MapPin, Thermometer, CloudRain, Info } from "lucide-react";
import type { CountrySeed } from "@/config/world";
import { siteConfig } from "@/config/site";
import { analyseCountryClimate, type CountryVerdict } from "@/lib/content/countryClimate";
import { bestTimeCountryCopy } from "@/lib/i18n/bestTimeCountry";
import { getCopy, joinList } from "@/lib/i18n/copy";
import { paths, monthInfo, type AnyLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ShareBar } from "@/components/ShareBar";

/** How many cities to show before folding the rest into a <details>. */
const CITY_ROWS_VISIBLE = 12;

const VERDICT_TONE: Record<CountryVerdict, string> = {
  ideal: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20",
  good: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-500/10 dark:text-sky-200 dark:border-sky-500/20",
  hot: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-500/10 dark:text-orange-200 dark:border-orange-500/20",
  rainy: "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-200 dark:border-indigo-500/20",
  cold: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10",
};

export function BestTimeCountryView({ locale, country }: { locale: AnyLocale; country: CountrySeed }) {
  const analysis = analyseCountryClimate(country);
  if (!analysis) return null;

  const t = bestTimeCountryCopy(locale);
  const copy = getCopy(locale);
  const kn = countryName(country.slug, country.name, locale);
  const mn = monthInfo(locale).monthNames;
  // "in July" / "im Juli" / "a luglio" / "w lipcu" — the prepositional form.
  // Several languages inflect the month after a preposition, so sentences
  // that need one are given this rather than the bare name.
  const mIn = monthInfo(locale).inMonth;
  const name = (c: { slug: string; name: string }) => cityName(c.slug, c.name, locale);

  const bestList = joinList(locale, analysis.best.map((m) => mn[m]!));
  const shoulderList = joinList(locale, analysis.shoulder.map((m) => mn[m]!));
  const url = `${siteConfig.url}${paths.bestTimeCountry(locale, country.slug)}`;
  const answer = t.answer(bestList, analysis.bestHi, analysis.bestLo, analysis.bestRain);

  // "Is {month} a good time?" is asked most about the peak month ("is august
  // a good time to visit spain"), and the warmest month is stable across
  // rebuilds — unlike "the current month", which would freeze at build time
  // on a statically rendered page.
  const focusMonth = analysis.warmest;

  const faq: Array<{ question: string; answer: string }> = [
    { question: t.qBest(kn), answer: t.aBest(bestList, analysis.bestHi, analysis.bestLo, analysis.bestRain) },
    {
      question: t.qWarmest(kn),
      answer: t.aWarmest(mn[analysis.warmest]!, analysis.tMax[analysis.warmest]!, mn[analysis.coolest]!, analysis.tMax[analysis.coolest]!),
    },
    {
      question: t.qRain(kn),
      answer: t.aRain(mn[analysis.wettest]!, analysis.precipMm[analysis.wettest]!, mn[analysis.driest]!, analysis.precipMm[analysis.driest]!),
    },
    {
      question: t.qQuiet(kn),
      answer: analysis.shoulder.length > 0 ? t.aQuiet(shoulderList, bestList) : t.aQuietNone(bestList),
    },
    ...(analysis.spread
      ? [
          {
            question: t.qWhereWarm(kn, mIn[analysis.spread.month]!),
            answer: t.aWhereWarm(
              name(analysis.spread.warm.city),
              analysis.spread.warm.hi,
              name(analysis.spread.cool.city),
              analysis.spread.cool.hi,
              mIn[analysis.spread.month]!
            ),
          },
        ]
      : []),
    {
      question: t.qMonthGood(kn, mn[focusMonth]!),
      answer: t.aMonthGood(
        mn[focusMonth]!,
        analysis.tMax[focusMonth]!,
        analysis.tMin[focusMonth]!,
        analysis.precipMm[focusMonth]!,
        analysis.best.includes(focusMonth),
        bestList
      ),
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: `${siteConfig.url}${paths.home(locale)}` },
        { "@type": "ListItem", position: 2, name: kn, item: `${siteConfig.url}${paths.country(locale, country.slug)}` },
        { "@type": "ListItem", position: 3, name: t.breadcrumb, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.h1(kn),
      description: answer,
      inLanguage: locale,
      url,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ];

  const visibleCities = analysis.cityBest.slice(0, CITY_ROWS_VISIBLE);
  const hiddenCities = analysis.cityBest.slice(CITY_ROWS_VISIBLE);

  const cityRow = (row: (typeof analysis.cityBest)[number]) => (
    <tr key={row.city.slug} className="border-b border-slate-100 last:border-0 dark:border-white/5">
      <td className="py-2.5 pr-3">
        <Link href={paths.bestTime(locale, country.slug, row.city.slug)} className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          {name(row.city)}
        </Link>
      </td>
      <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300">{joinList(locale, row.best.map((m) => mn[m]!))}</td>
      <td className="py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
        {row.hi}° / {row.lo}°C
      </td>
    </tr>
  );

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: copy.home, href: paths.home(locale) },
          { label: kn, href: paths.country(locale, country.slug) },
          { label: t.breadcrumb },
        ]}
      />

      <article className="mx-auto max-w-4xl">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
          <CalendarDays size={14} aria-hidden="true" /> {t.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{t.h1(kn)}</h1>

        {/* The direct answer, first thing on the page: this is what a snippet
            or an AI summary lifts, and what the country-shaped queries ask. */}
        <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-200">{answer}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {t.basis(analysis.representative.length, joinList(locale, analysis.representative.map((x) => name(x.city))))}
        </p>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          {t.sources}{" "}
          <Link href="/data-sources" className="underline hover:text-brand-600">
            {t.sourcesLink}
          </Link>
          .
        </p>

        <ShareBar className="mt-5" url={url} title={t.h1(kn)} />

        {/* Regional spread — the section that is genuinely different for every
            country, and the honest answer to a country-wide question. */}
        <section className="mt-10" aria-labelledby="spread-heading">
          <h2 id="spread-heading" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <MapPin size={18} className="text-brand-500" aria-hidden="true" /> {t.spreadH}
          </h2>
          {analysis.spread ? (
            <>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {t.spreadLead(mIn[analysis.spread.month]!, analysis.spread.gap)}{" "}
                {t.spreadDetail(
                  name(analysis.spread.warm.city),
                  analysis.spread.warm.hi,
                  name(analysis.spread.cool.city),
                  analysis.spread.cool.hi
                )}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl2 border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                    <Thermometer size={13} aria-hidden="true" /> {mn[analysis.spread.month]}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-orange-900 dark:text-orange-100">{analysis.spread.warm.hi}°C</p>
                  <Link
                    href={paths.bestTime(locale, country.slug, analysis.spread.warm.city.slug)}
                    className="text-sm font-medium text-orange-800 hover:underline dark:text-orange-200"
                  >
                    {name(analysis.spread.warm.city)}
                  </Link>
                </div>
                <div className="rounded-xl2 border border-sky-200 bg-sky-50 p-4 dark:border-sky-500/20 dark:bg-sky-500/10">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                    <Thermometer size={13} aria-hidden="true" /> {mn[analysis.spread.month]}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-sky-900 dark:text-sky-100">{analysis.spread.cool.hi}°C</p>
                  <Link
                    href={paths.bestTime(locale, country.slug, analysis.spread.cool.city.slug)}
                    className="text-sm font-medium text-sky-800 hover:underline dark:text-sky-200"
                  >
                    {name(analysis.spread.cool.city)}
                  </Link>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t.spreadAdvice}</p>
            </>
          ) : (
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{t.noSpread}</p>
          )}
        </section>

        {/* Season by season */}
        <section className="mt-10" aria-labelledby="seasons-heading">
          <h2 id="seasons-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            {t.seasonsH}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {analysis.seasons.map((s) => (
              <div
                key={s.months.join("-")}
                className={`rounded-xl2 border p-4 ${VERDICT_TONE[s.verdict]}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-bold">{t.seasonRange(mn[s.months[0]!]!, mn[s.months[s.months.length - 1]!]!)}</p>
                  <span className="text-xs font-semibold uppercase tracking-wide">{t.verdict[s.verdict]}</span>
                </div>
                <p className="mt-1 text-sm tabular-nums opacity-90">
                  {s.hi}° / {s.lo}°C · {s.rain} mm
                </p>
                <p className="mt-2 text-sm leading-relaxed opacity-90">{t.verdictText[s.verdict]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Month table */}
        <section className="mt-10" aria-labelledby="months-heading">
          <h2 id="months-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            {t.tableH(kn)}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t.tableIntro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl3 border border-slate-200 dark:border-white/10">
            <table className="w-full min-w-[32rem] text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  {t.cols.map((c, i) => (
                    <th key={c} scope="col" className={`px-4 py-2.5 font-semibold ${i === 0 ? "" : "text-right"}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mn.map((label, m) => {
                  const isBest = analysis.best.includes(m);
                  return (
                    <tr
                      key={label}
                      className={`border-t border-slate-100 dark:border-white/5 ${isBest ? "bg-emerald-50/60 dark:bg-emerald-500/10" : ""}`}
                    >
                      <th scope="row" className="px-4 py-2.5 text-left font-medium text-slate-800 dark:text-slate-100">
                        <Link href={paths.whereToGo(locale, m)} className="hover:underline">
                          {label}
                        </Link>
                        {isBest && <span className="ml-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">★</span>}
                      </th>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-700 dark:text-slate-200">{analysis.tMax[m]}°C</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">{analysis.tMin[m]}°C</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">{analysis.precipMm[m]} mm</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400">{analysis.cloud[m]}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* City-by-city: the hub links that stop a single month page from
            having to answer a whole-country question on its own. */}
        <section className="mt-10" aria-labelledby="cities-heading">
          <h2 id="cities-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            {t.citiesH}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t.citiesIntro(analysis.cityBest.length)}</p>
          <div className="mt-4 overflow-x-auto rounded-xl3 border border-slate-200 p-4 dark:border-white/10">
            <table className="w-full min-w-[28rem] text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="pb-2 font-semibold">
                    {t.cityCols[0]}
                  </th>
                  <th scope="col" className="pb-2 font-semibold">
                    {t.cityCols[1]}
                  </th>
                  <th scope="col" className="pb-2 text-right font-semibold">
                    {t.cityCols[2]}
                  </th>
                </tr>
              </thead>
              <tbody>{visibleCities.map(cityRow)}</tbody>
            </table>
            {hiddenCities.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-semibold text-brand-600 hover:underline dark:text-brand-300">
                  {t.cityMore(analysis.cityBest.length)}
                </summary>
                <table className="mt-2 w-full min-w-[28rem] text-sm">
                  <tbody>{hiddenCities.map(cityRow)}</tbody>
                </table>
              </details>
            )}
          </div>
        </section>

        {/* FAQ — the literal question shapes these pages receive. */}
        <section className="mt-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            {t.faqH}
          </h2>
          <div className="mt-4 space-y-3">
            {faq.map((f) => (
              <details key={f.question} className="rounded-xl2 border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-surface-dark-subtle">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900 dark:text-white">{f.question}</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            {t.ctaH}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={paths.country(locale, country.slug)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
            >
              <CloudRain size={16} aria-hidden="true" /> {t.ctaForecast}
            </Link>
            <Link
              href={paths.whereToGo(locale, analysis.best[0]!)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
            >
              <CalendarDays size={16} aria-hidden="true" /> {t.ctaWhere}
            </Link>
          </div>
          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
            <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{t.sources}</span>
          </p>
        </section>
      </article>
    </div>
  );
}
