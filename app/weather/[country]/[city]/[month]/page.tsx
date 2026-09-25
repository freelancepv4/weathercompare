import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CloudRain, Droplets, Sun, Thermometer, Luggage, CalendarDays, Compass } from "lucide-react";
import { findCity } from "@/config/countries";
import { getCityGuide } from "@/lib/data/cityGuides";
import {
  MONTHS,
  CLIMATE_SOURCE,
  citiesWithClimate,
  describeMonth,
  getCityClimate,
  monthIndex,
  type CityClimate,
} from "@/lib/data/climate";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { siteConfig, defaultOgImage } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroPhoto } from "@/components/HeroPhoto";
import { ClimateChart } from "@/components/ClimateChart";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";

// Built entirely from long-term averages (lib/data/climate.json), so fully static.
export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: { country: string; city: string; month: string };
}

export function generateStaticParams() {
  return citiesWithClimate().flatMap(({ country, city }) =>
    MONTHS.map((m) => ({ country: country.slug, city: city.slug, month: m.slug }))
  );
}

const toF = (c: number) => Math.round((c * 9) / 5 + 32);
const r = Math.round;

function load(params: PageProps["params"]) {
  const found = findCity(params.country, params.city);
  const i = monthIndex(params.month);
  if (!found || i < 0) return null;
  const climate = getCityClimate(found.country.slug, found.city.slug);
  if (!climate) return null;
  return { ...found, climate, i, month: MONTHS[i]! };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const d = load(params);
  if (!d) return {};
  const { city, climate, i, month } = d;
  // Keep the full <title> (with " — WeatherCompare" appended) within ~70 chars.
  const longTitle = `${city.name} Weather in ${month.name}: Temperatures & Rain`;
  const title = longTitle.length <= 53 ? longTitle : `${city.name} Weather in ${month.name}: Temps & Rain`;
  const description = `What's the weather like in ${city.name} in ${month.name}? Typical highs of ${r(climate.tMax[i]!)}°C (${toF(
    climate.tMax[i]!
  )}°F), lows of ${r(climate.tMin[i]!)}°C and about ${climate.precipMm[i]} mm of rain — plus what to pack.`;
  const url = `${siteConfig.url}/weather/${d.country.slug}/${city.slug}/${month.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // No images here on purpose — ./opengraph-image.tsx (a 2:3 Pinterest card) attaches automatically.
    openGraph: { title, description, url },
    twitter: { title, description, images: [defaultOgImage] },
  };
}

function packingList(c: CityClimate, i: number): string[] {
  const hi = c.tMax[i]!;
  const lo = c.tMin[i]!;
  const rain = c.precipMm[i]!;
  const items: string[] = [];
  if (hi >= 27) items.push("Light, breathable clothing (cotton or linen)", "A sun hat and high-SPF sunscreen", "A refillable water bottle");
  else if (hi >= 19) items.push("T-shirts plus a light layer for the evening", "Comfortable trainers or sandals for long walks");
  else if (hi >= 11) items.push("A warm sweater or fleece for layering", "A mid-weight jacket");
  else items.push("A proper insulated winter coat", "A hat, scarf and gloves");
  if (lo <= 0) items.push("Thermal base layers and warm, grippy boots for icy mornings");
  else if (hi - lo >= 11) items.push("An extra layer — evenings are noticeably cooler than afternoons");
  if (rain >= 70) items.push("A compact umbrella or packable rain jacket", "Water-resistant shoes");
  else if (rain >= 35) items.push("A small travel umbrella, just in case");
  if (c.cloud[i]! < 40 && hi >= 15) items.push("Sunglasses");
  if (c.humidity[i]! >= 75 && hi >= 25) items.push("Quick-dry fabrics — it feels stickier than the temperature suggests");
  return items;
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

export default async function CityMonthPage({ params }: PageProps) {
  const d = load(params);
  if (!d) notFound();
  const { country, city, climate, i, month } = d;
  const guide = getCityGuide(country.slug, city.slug);
  const photo = await getLandscapePhoto(`${city.name} ${country.name} landmark`);

  const hi = climate.tMax[i]!;
  const lo = climate.tMin[i]!;
  const rain = climate.precipMm[i]!;
  const feel = describeMonth(climate, i);
  const prev = MONTHS[(i + 11) % 12]!;
  const next = MONTHS[(i + 1) % 12]!;
  const prevHi = climate.tMax[(i + 11) % 12]!;
  const nextHi = climate.tMax[(i + 1) % 12]!;
  const temps = extremes(climate.tMax);
  const rains = extremes(climate.precipMm);

  const facts: string[] = [];
  if (temps.max === i) facts.push(`${month.name} is typically ${city.name}'s warmest month.`);
  if (temps.min === i) facts.push(`${month.name} is typically ${city.name}'s coolest month.`);
  if (rains.min === i) facts.push(`It's usually the driest month of the year.`);
  if (rains.max === i) facts.push(`It's usually the wettest month of the year.`);

  const compare = (a: number, b: number, other: string) => {
    const diff = r(a - b);
    if (Math.abs(diff) < 2) return `about the same as ${other}`;
    return `${Math.abs(diff)}°C ${diff > 0 ? "warmer" : "cooler"} than ${other}`;
  };

  const summary = `${month.name} in ${city.name} is typically ${feel.temp}, with average daytime highs around ${r(hi)}°C (${toF(
    hi
  )}°F) and night-time lows near ${r(lo)}°C (${toF(lo)}°F). The month usually brings about ${rain} mm of rain (${
    feel.rain
  }) and is ${feel.sky}. Daytime highs are ${compare(hi, prevHi, prev.name)} and ${compare(hi, nextHi, next.name)}.`;

  const packing = packingList(climate, i);

  // Same-month comparison with the other cities in this country.
  const siblings = citiesWithClimate()
    .filter((c) => c.country.slug === country.slug && c.city.slug !== city.slug)
    .slice(0, 6);

  const faq = [
    {
      q: `How warm is ${city.name} in ${month.name}?`,
      a: `Average highs are about ${r(hi)}°C (${toF(hi)}°F) and average lows about ${r(lo)}°C (${toF(lo)}°F), based on 10 years of daily data.`,
    },
    {
      q: `Does it rain a lot in ${city.name} in ${month.name}?`,
      a: `${city.name} typically gets around ${rain} mm of rain in ${month.name} — ${feel.rain}. ${
        rains.max === i ? "It's usually the wettest month of the year." : rains.min === i ? "It's usually the driest month of the year." : ""
      }`.trim(),
    },
    ...(guide ? [{ q: `When is the best time to visit ${city.name}?`, a: guide.bestTimeToVisit }] : []),
  ];

  const base = `${siteConfig.url}/weather/${country.slug}/${city.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: country.name, item: `${siteConfig.url}/weather/${country.slug}` },
        { "@type": "ListItem", position: 3, name: city.name, item: base },
        { "@type": "ListItem", position: 4, name: month.name, item: `${base}/${month.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const stats = [
    { icon: Thermometer, label: "Avg high", value: `${r(hi)}°C`, sub: `${toF(hi)}°F`, tone: "from-orange-400 to-rose-500" },
    { icon: Thermometer, label: "Avg low", value: `${r(lo)}°C`, sub: `${toF(lo)}°F`, tone: "from-sky-400 to-brand-500" },
    { icon: CloudRain, label: "Rainfall", value: `${rain} mm`, sub: feel.rain, tone: "from-brand-500 to-indigo-600" },
    { icon: Droplets, label: "Humidity", value: `${climate.humidity[i]}%`, sub: "relative", tone: "from-teal-400 to-cyan-600" },
    { icon: Sun, label: "Sky", value: `${climate.cloud[i]}%`, sub: `cloud · ${feel.sky}`, tone: "from-amber-400 to-orange-500" },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/weather/${country.slug}` },
          { label: city.name, href: `/weather/${country.slug}/${city.slug}` },
          { label: month.name },
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <HeroPhoto photo={photo} priority />

        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-300">
          <CalendarDays size={14} aria-hidden="true" /> Monthly climate guide
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {city.name} weather in {month.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{summary}</p>
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
            href={`/weather/${country.slug}/${city.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
          >
            Live {city.name} forecast <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href={`/where-to-go/${month.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
          >
            <Compass size={16} aria-hidden="true" /> Where else to go in {month.name}
          </Link>
        </div>

        <ShareBar
          className="mt-5"
          url={`${base}/${month.slug}`}
          title={`${city.name} weather in ${month.name}`}
          pinImage={`${base}/${month.slug}/opengraph-image`}
          pinDescription={`${city.name} in ${month.name}: average highs of ${r(hi)}°C, lows of ${r(lo)}°C and about ${rain} mm of rain. What to pack and whether it's a good time to visit.`}
        />

        <div className="mt-10">
          <ClimateChart climate={climate} countrySlug={country.slug} citySlug={city.slug} cityName={city.name} activeMonth={i} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <Luggage size={18} className="text-brand-500" aria-hidden="true" /> What to pack for {month.name}
            </h2>
            <ul className="mt-3 space-y-2">
              {packing.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/guides/what-to-pack-for-a-european-city-break" className="mt-4 inline-block text-xs font-semibold text-brand-600 hover:underline dark:text-brand-300">
              Full season-by-season packing guide →
            </Link>
          </section>

          <section className="rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Is {month.name} a good time to visit {city.name}?</h2>
            {guide ? (
              <>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Our {city.name} guide recommends: <strong>{guide.bestTimeToVisit}</strong>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{guide.localTip}</p>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Compare the months in the chart above to find your ideal window.</p>
            )}
            <Link
              href={`/guides/best-time-to-visit/${country.slug}/${city.slug}`}
              className="mt-4 inline-block text-xs font-semibold text-brand-600 hover:underline dark:text-brand-300"
            >
              Best time to visit {city.name} →
            </Link>
          </section>
        </div>

        <div className="mt-8">
          <AdSlot variant="inline" />
        </div>

        {siblings.length > 0 && (
          <section className="mt-10" aria-labelledby="siblings-heading">
            <h2 id="siblings-heading" className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
              Other {country.name} cities in {month.name}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.city.slug}
                  href={`/weather/${s.country.slug}/${s.city.slug}/${month.slug}`}
                  className="group rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
                >
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 dark:text-white">{s.city.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {r(s.climate.tMax[i]!)}° / {r(s.climate.tMin[i]!)}°C · {s.climate.precipMm[i]} mm
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            {city.name} in {month.name}: quick answers
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

        <nav className="mt-10 flex items-center justify-between gap-3 text-sm font-semibold" aria-label="Adjacent months">
          <Link href={`/weather/${country.slug}/${city.slug}/${prev.slug}`} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-300">
            <ArrowLeft size={16} aria-hidden="true" /> {city.name} in {prev.name}
          </Link>
          <Link href={`/weather/${country.slug}/${city.slug}/${next.slug}`} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-300">
            {city.name} in {next.name} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>

        <p className="mt-8 text-[11px] leading-relaxed text-slate-400">
          Figures are long-term averages for the area around {city.name} ({CLIMATE_SOURCE || "NASA POWER"}), not a forecast for a specific year. For
          upcoming days, see the{" "}
          <Link href={`/weather/${country.slug}/${city.slug}`} className="underline hover:text-brand-600">
            live multi-source forecast
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
