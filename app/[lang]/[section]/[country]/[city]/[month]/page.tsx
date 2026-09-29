import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CloudRain, Droplets, Sun, Thermometer, Luggage, CalendarDays, Compass } from "lucide-react";
import { siteConfig } from "@/config/site";
import { findCity, nearestCities } from "@/config/world";
import { citiesWithClimate, getCityClimate } from "@/lib/data/climate";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroPhoto } from "@/components/HeroPhoto";
import { ClimateChart } from "@/components/ClimateChart";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { InsightList } from "@/components/InsightList";
import { CiteBox } from "@/components/CiteBox";
import { monthFacts, pick } from "@/lib/content/insights";
import { renderInsights, insightsHeading } from "@/lib/i18n/insights";
import { getCopy, describeIdx, packingKeys, bestMonths, joinList, toF } from "@/lib/i18n/copy";
import { ROUTING, isContentLocale, paths, monthInfo, type ContentLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { bestTimeCopy, goodMonthFaq } from "@/lib/i18n/bestTime";
import { keywordsFor } from "@/lib/i18n/keywords";
import { localizedMetadata } from "@/lib/i18n/pageMeta";

// Built from long-term averages only. Rendered on first visit and then
// cached permanently (7 languages × every city × 12 months is too many
// pages to pre-build on every deploy).
export const revalidate = false;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ lang: string; section: string; country: string; city: string; month: string }>;
}

const r = Math.round;

function resolve(p: Awaited<PageProps["params"]>) {
  if (!isContentLocale(p.lang) || p.section !== ROUTING[p.lang].weather) return null;
  const found = findCity(p.country, p.city);
  const i = ROUTING[p.lang].monthSlugs.indexOf(p.month);
  if (!found || i < 0) return null;
  const climate = getCityClimate(found.country.slug, found.city.slug);
  if (!climate) return null;
  return { locale: p.lang as ContentLocale, ...found, climate, i };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const x = resolve(params);
  if (!x) return {};
  const copy = getCopy(x.locale);
  const c = cityName(x.city.slug, x.city.name, x.locale);
  return localizedMetadata(
    x.locale,
    { kind: "month", country: x.country.slug, city: x.city.slug, month: x.i },
    copy.monthTitle(c, x.i),
    copy.monthDesc(c, x.i, r(x.climate.tMax[x.i]!), r(x.climate.tMin[x.i]!), x.climate.precipMm[x.i]!),
    { keywords: keywordsFor(x.locale).month(c, monthInfo(x.locale).monthNames[x.i]!) }
  );
}

function extremes(values: number[]) {
  let max = 0;
  let min = 0;
  values.forEach((v, idx) => {
    if (v > values[max]!) max = idx;
    if (v < values[min]!) min = idx;
  });
  return { max, min };
}

export default async function LocalizedMonthPage(props: PageProps) {
  const params = await props.params;
  const x = resolve(params);
  if (!x) notFound();
  const { locale, country, city, climate, i } = x;
  const copy = getCopy(locale);
  const mi = monthInfo(locale);
  const cn = cityName(city.slug, city.name, locale);
  const kn = countryName(country.slug, country.name, locale);
  const photo = await getLandscapePhoto(`${city.name} ${country.name} landmark`);

  const hi = climate.tMax[i]!;
  const lo = climate.tMin[i]!;
  const mm = climate.precipMm[i]!;
  const d = describeIdx(climate, i);
  const prev = (i + 11) % 12;
  const next = (i + 1) % 12;
  const temps = extremes(climate.tMax);
  const rains = extremes(climate.precipMm);
  const best = bestMonths(climate);
  const bestText = joinList(locale, best.map((m) => mi.monthNames[m]!));

  const facts: string[] = [];
  if (temps.max === i) facts.push(copy.factWarmest(cn, i));
  if (temps.min === i) facts.push(copy.factCoolest(cn, i));
  if (rains.min === i) facts.push(copy.factDriest);
  if (rains.max === i) facts.push(copy.factWettest);

  const summaryArgs = {
    city: cn,
    m: i,
    temp: d.temp,
    rain: d.rain,
    sky: d.sky,
    hi: r(hi),
    lo: r(lo),
    hiF: toF(hi),
    loF: toF(lo),
    mm,
    dPrev: r(hi - climate.tMax[prev]!),
    dNext: r(hi - climate.tMax[next]!),
  };
  const summary = pick(`${country.slug}/${city.slug}/${i}:summary`, [copy.monthSummary, copy.monthSummaryAlt])(summaryArgs);
  const packing = packingKeys(climate, i).map((k) => copy.pack[k]);
  const insights = renderInsights(
    locale,
    monthFacts({ country, city, climate, m: i, nameOf: (c) => cityName(c.slug, c.name, locale) }),
    cn,
    i,
    `${country.slug}/${city.slug}/${i}`
  );
  const siblings = nearestCities(city, 14, { sameCountry: country.slug })
    .map(({ country: co, city: ci }) => ({ country: co, city: ci, climate: getCityClimate(co.slug, ci.slug) }))
    .filter((x): x is { country: typeof country; city: typeof city; climate: NonNullable<typeof x.climate> } => Boolean(x.climate))
    .slice(0, 6);

  const good = goodMonthFaq(locale, cn, climate, i);
  const faq = [
    { q: good.question, a: good.answer },
    { q: copy.faqWarmQ(cn, i), a: copy.faqWarmA(r(hi), toF(hi), r(lo), toF(lo)) },
    {
      q: copy.faqWetQ(cn, i),
      a: [copy.faqWetA(cn, i, mm, copy.rainLabels[d.rain]!), rains.max === i ? copy.factWettest : rains.min === i ? copy.factDriest : ""].join(" ").trim(),
    },
    { q: copy.faqBestQ(cn), a: copy.faqBestA(cn, bestText) },
  ];

  const url = `${siteConfig.url}${paths.month(locale, country.slug, city.slug, i)}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: `${siteConfig.url}${paths.home(locale)}` },
        { "@type": "ListItem", position: 2, name: kn, item: `${siteConfig.url}${paths.country(locale, country.slug)}` },
        { "@type": "ListItem", position: 3, name: cn, item: `${siteConfig.url}${paths.city(locale, country.slug, city.slug)}` },
        { "@type": "ListItem", position: 4, name: mi.monthNames[i], item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const stats = [
    { icon: Thermometer, label: copy.stat.high, value: `${r(hi)}°C`, sub: `${toF(hi)}°F`, tone: "from-orange-400 to-rose-500" },
    { icon: Thermometer, label: copy.stat.low, value: `${r(lo)}°C`, sub: `${toF(lo)}°F`, tone: "from-sky-400 to-brand-500" },
    { icon: CloudRain, label: copy.stat.rain, value: `${mm} mm`, sub: copy.rainLabels[d.rain]!, tone: "from-brand-500 to-indigo-600" },
    { icon: Droplets, label: copy.stat.humidity, value: `${climate.humidity[i]}%`, sub: copy.stat.relative, tone: "from-teal-400 to-cyan-600" },
    { icon: Sun, label: copy.stat.sky, value: `${climate.cloud[i]}%`, sub: `${copy.stat.cloud} · ${copy.skyLabels[d.sky]}`, tone: "from-amber-400 to-orange-500" },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: copy.home, href: paths.home(locale) },
          { label: kn, href: paths.country(locale, country.slug) },
          { label: cn, href: paths.city(locale, country.slug, city.slug) },
          { label: mi.monthNames[i]! },
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <HeroPhoto photo={photo} priority />

        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-300">
          <CalendarDays size={14} aria-hidden="true" /> {copy.monthKicker}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.monthH1(cn, i)}</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{summary}</p>
        <InsightList className="mt-5" title={insightsHeading(locale, i)} items={insights} />
        {facts.length > 0 && (
          <p className="mt-3 inline-flex flex-wrap gap-2">
            {facts.map((f) => (
              <span key={f} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-200">
                {f}
              </span>
            ))}
          </p>
        )}

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-xl2 bg-gradient-to-br ${s.tone} p-4 text-white shadow-soft`}>
              <s.icon size={18} className="opacity-80" aria-hidden="true" />
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-white/80">{s.label}</p>
              <p className="text-2xl font-bold leading-tight">{s.value}</p>
              <p className="text-[11px] text-white/80">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={paths.city(locale, country.slug, city.slug)}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
          >
            {copy.liveForecast(cn)} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href={paths.whereToGo(locale, i)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
          >
            <Compass size={16} aria-hidden="true" /> {copy.whereElse(i)}
          </Link>
          <Link
            href={paths.bestTime(locale, country.slug, city.slug)}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
          >
            <CalendarDays size={16} aria-hidden="true" /> {bestTimeCopy(locale).h1(cn)}
          </Link>
        </div>

        <ShareBar
          className="mt-5"
          url={url}
          title={copy.monthH1(cn, i)}
          pinImage={`${siteConfig.url}${paths.month("en", country.slug, city.slug, i)}/opengraph-image`}
          pinDescription={copy.monthDesc(cn, i, r(hi), r(lo), mm)}
        />

        <div className="mt-10">
          <ClimateChart climate={climate} countrySlug={country.slug} citySlug={city.slug} cityName={cn} activeMonth={i} locale={locale} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <Luggage size={18} className="text-brand-500" aria-hidden="true" /> {copy.packH(i)}
            </h2>
            <ul className="mt-3 space-y-2">
              {packing.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/guides/what-to-pack-for-a-european-city-break" hrefLang="en" className="mt-4 inline-block text-xs font-semibold text-brand-600 hover:underline dark:text-brand-300">
              {copy.packGuide}
            </Link>
          </section>

          <section className="rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{copy.goodTimeH(cn, i)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{copy.bestMonthsText(cn, bestText, best.includes(i), i)}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {best.map((m) => (
                <li key={m}>
                  <Link
                    href={paths.month(locale, country.slug, city.slug, m)}
                    className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-600 hover:text-white dark:bg-emerald-500/10 dark:text-emerald-300"
                  >
                    {copy.cityInMonth(cn, m)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-8">
          <AdSlot variant="inline" />
        </div>

        {siblings.length > 0 && (
          <section className="mt-10" aria-labelledby="siblings-heading">
            <h2 id="siblings-heading" className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
              {copy.otherCitiesH(kn, i)}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.city.slug}
                  href={paths.month(locale, s.country.slug, s.city.slug, i)}
                  className="group rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
                >
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 dark:text-white">{cityName(s.city.slug, s.city.name, locale)}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {r(s.climate.tMax[i]!)}° / {r(s.climate.tMin[i]!)}°C · {s.climate.precipMm[i]} mm
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CiteBox
          className="mt-10"
          url={url}
          title={copy.monthH1(cn, i)}
          source="NASA POWER / ERA5, 2011–2020"
          embedUrl={`${siteConfig.url}/embed/${country.slug}/${city.slug}`}
        />

        <section className="mt-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            {copy.quickAnswersH(cn, i)}
          </h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="rounded-xl2 border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-surface-dark-subtle">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900 dark:text-white">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className="mt-10 flex items-center justify-between gap-3 text-sm font-semibold" aria-label={copy.chartH(cn)}>
          <Link href={paths.month(locale, country.slug, city.slug, prev)} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-300">
            <ArrowLeft size={16} aria-hidden="true" /> {copy.cityInMonth(cn, prev)}
          </Link>
          <Link href={paths.month(locale, country.slug, city.slug, next)} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-300">
            {copy.cityInMonth(cn, next)} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>

        <p className="mt-8 text-[11px] leading-relaxed text-slate-400">
          {copy.monthFoot(cn)}{" "}
          <Link href={paths.city(locale, country.slug, city.slug)} className="underline hover:text-brand-600">
            {copy.monthFootLink}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
