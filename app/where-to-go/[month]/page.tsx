import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { citiesWithClimate, MONTHS, monthIndex } from "@/lib/data/climate";
import { STYLES, scoreMonth } from "@/lib/tripScore";
import { siteConfig, defaultOgImage } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ShareBar } from "@/components/ShareBar";
import { seoTitle, seoDescription } from "@/lib/seo";
import { AdSlot } from "@/components/AdSlot";
import { hreflang } from "@/lib/i18n/pageMeta";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ month: string }>;
}

export function generateStaticParams() {
  return citiesWithClimate().length > 0 ? MONTHS.map((m) => ({ month: m.slug })) : [];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const i = monthIndex(params.month);
  if (i < 0) return {};
  const m = MONTHS[i]!;
  const title = `Where to Go in ${m.name}: Best Weather Destinations`;
  const description = `The best places to travel in ${m.name} for hot beach weather, warm sightseeing, mild city breaks or a cool escape — ranked with 10 years of climate data.`;
  const url = `${siteConfig.url}/where-to-go/${m.slug}`;
  return {
    title: seoTitle(title),
    description: seoDescription(description),
    alternates: { canonical: url, ...hreflang({ kind: "whereToGo", month: i }) },
    openGraph: { title, description, url, images: [defaultOgImage] },
    twitter: { title, description, images: [defaultOgImage] },
  };
}

const SECTIONS = ["beach", "warm", "mild", "cool"] as const;
const TONES: Record<(typeof SECTIONS)[number], string> = {
  beach: "from-orange-400 to-rose-500",
  warm: "from-amber-400 to-orange-500",
  mild: "from-sky-400 to-brand-500",
  cool: "from-indigo-400 to-slate-600",
};

export default async function WhereToGoPage(props: PageProps) {
  const params = await props.params;
  const i = monthIndex(params.month);
  if (i < 0) notFound();
  const month = MONTHS[i]!;
  const prev = MONTHS[(i + 11) % 12]!;
  const next = MONTHS[(i + 1) % 12]!;
  const all = citiesWithClimate();
  if (all.length === 0) notFound();

  const lists = SECTIONS.map((style) => ({
    style: STYLES.find((s) => s.id === style)!,
    tone: TONES[style],
    items: all
      .map((c) => ({ ...c, score: scoreMonth(c.climate, i, style) }))
      .filter((c) => c.score >= 50)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6),
  })).filter((l) => l.items.length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Where to go in ${month.name}`,
    itemListElement: lists.flatMap((l) => l.items.slice(0, 3)).map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${siteConfig.url}/weather/${c.country.slug}/${c.city.slug}/${month.slug}`,
      name: `${c.city.name}, ${c.country.name}`,
    })),
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Trip finder", href: "/trip-finder" },
          { label: `Where to go in ${month.name}` },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Where to go in {month.name}</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Looking for the right weather in {month.name}? These cities typically match best for each kind of trip, based on 10 years of
          daily temperature, rainfall and cloud data. Tap a city for its full {month.name} climate, packing tips and live forecast.
        </p>
        <Link
          href={`/trip-finder?month=${month.slug}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-emerald-700"
        >
          <Compass size={16} aria-hidden="true" /> Customise in the trip finder
        </Link>
        <ShareBar className="mt-5" url={`${siteConfig.url}/where-to-go/${month.slug}`} title={`Where to go in ${month.name}: best weather destinations`} />
      </header>

      <div className="mt-10 space-y-12">
        {lists.map((l) => (
          <section key={l.style.id} aria-labelledby={`${l.style.id}-heading`}>
            <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${l.tone} px-4 py-1.5 text-white`}>
              <span aria-hidden="true">{l.style.emoji}</span>
              <h2 id={`${l.style.id}-heading`} className="text-sm font-bold">
                {l.style.label} in {month.name}
              </h2>
            </div>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{l.style.blurb}.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {l.items.map((c, idx) => (
                <Link
                  key={`${c.country.slug}/${c.city.slug}`}
                  href={`/weather/${c.country.slug}/${c.city.slug}/${month.slug}`}
                  className="group flex items-center gap-4 rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${l.tone} text-sm font-bold text-white`}>
                    {idx + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900 group-hover:text-brand-700 dark:text-white">
                      {c.city.name}, {c.country.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {Math.round(c.climate.tMax[i]!)}° / {Math.round(c.climate.tMin[i]!)}°C · {c.climate.precipMm[i]} mm rain
                    </span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-slate-300 group-hover:text-brand-500" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <AdSlot variant="inline" />
      </div>

      <nav className="mt-10 flex items-center justify-between gap-3 text-sm font-semibold" aria-label="Other months">
        <Link href={`/where-to-go/${prev.slug}`} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-300">
          <ArrowLeft size={16} aria-hidden="true" /> Where to go in {prev.name}
        </Link>
        <Link href={`/where-to-go/${next.slug}`} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-300">
          Where to go in {next.name} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>
      <p className="mt-8 text-[11px] text-slate-400">
        Rankings use long-term monthly averages, not a forecast. Always check the live forecast before you travel.
      </p>
    </div>
  );
}
