"use client";

import Link from "next/link";
import { Layers, ShieldCheck, Gauge, Compass, ArrowRight, BookOpen } from "lucide-react";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { CityGrid, type ClimateHighs } from "./CityGrid";
import { AdSlot } from "./AdSlot";
import { popularCities, worldHighlights } from "@/config/countries";
import type { ReactNode } from "react";

const MONTHS = [
  ["january", "Jan"], ["february", "Feb"], ["march", "Mar"], ["april", "Apr"], ["may", "May"], ["june", "Jun"],
  ["july", "Jul"], ["august", "Aug"], ["september", "Sep"], ["october", "Oct"], ["november", "Nov"], ["december", "Dec"],
] as const;

interface HomeSectionsProps {
  /** Monthly highs for the showcased cities — built server-side in app/page.tsx. */
  climate?: ClimateHighs;
  /** Server-rendered guide cards (they need photos fetched on the server). */
  guides?: ReactNode;
}

export function HomeSections({ climate, guides }: HomeSectionsProps) {
  const t = useTranslations();
  const italy = popularCities(8);
  const world = worldHighlights(12);

  return (
    <div className="container-page space-y-16 py-16">
      <CityGrid title={t("home.italySection")} items={italy} climate={climate} subtitle="Mini charts show average daytime highs, January to December." />

      {/* Plan by month */}
      <section aria-labelledby="plan-heading" className="grid gap-5 lg:grid-cols-5">
        <Link
          href="/trip-finder"
          className="group relative overflow-hidden rounded-xl3 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-7 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg lg:col-span-2"
        >
          <Compass size={120} className="absolute -bottom-6 -right-6 text-white/15" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-widest text-white/80">New</p>
          <h2 id="plan-heading" className="mt-2 text-2xl font-bold">Trip weather finder</h2>
          <p className="mt-2 max-w-sm text-sm text-white/85">
            Pick a month and the weather you want — hot and sunny, mild, or cool — and see which of 1,800+ cities worldwide match best.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700">
            Find my destination <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
        <div className="rounded-xl3 border border-slate-200 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle lg:col-span-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Where to go, month by month</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">The best-weather destinations for every month of the year.</p>
          <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {MONTHS.map(([slug, short]) => (
              <li key={slug}>
                <Link
                  href={`/where-to-go/${slug}`}
                  className="block rounded-xl bg-slate-100 px-2 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-brand-600 hover:text-white dark:bg-white/5 dark:text-slate-200"
                >
                  {short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AdSlot variant="banner" />
      <CityGrid title={t("home.worldSection")} items={world} climate={climate} />

      {guides && (
        <section aria-labelledby="home-guides-heading">
          <div className="mb-5 flex items-end justify-between gap-3">
            <h2 id="home-guides-heading" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              <BookOpen size={20} className="text-brand-500" aria-hidden="true" /> Latest travel guides
            </h2>
            <Link href="/guides" className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-300">
              All guides →
            </Link>
          </div>
          {guides}
        </section>
      )}

      <section className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-blue-900 via-blue-700 to-sky-600 p-8 text-white sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-glow/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">{t("home.whyCompareTitle")}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">{t("home.whyCompareBody")}</p>
        </div>
        <div className="relative mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          <Feature icon={Layers} title="Multiple models" desc="Independent forecast providers, one dashboard." />
          <Feature icon={Gauge} title="Fast & responsive" desc="Optimized for Core Web Vitals on every device." />
          <Feature icon={ShieldCheck} title="Transparent sourcing" desc="Every figure is attributed to its source." />
        </div>
      </section>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: typeof Layers; title: string; desc: string }) {
  return (
    <div className="rounded-xl2 bg-white/10 p-5 text-left backdrop-blur">
      <Icon className="text-sky-glow" size={20} aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-white/75">{desc}</p>
    </div>
  );
}
