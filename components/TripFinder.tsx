"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CloudRain, MapPin, Share2, Check } from "lucide-react";
import { MONTHS, type CityClimate } from "@/lib/data/climate";
import { REGIONS, STYLES, scoreMonth, type WeatherStyle } from "@/lib/tripScore";
import { paths, monthInfo as routeMonths, type AnyLocale } from "@/lib/i18n/routing";
import type { TripUi } from "@/lib/i18n/copy/types";

export interface FinderCity {
  country: string;
  countrySlug: string;
  city: string;
  citySlug: string;
  region: string;
  climate: CityClimate;
}

const toF = (c: number) => Math.round((c * 9) / 5 + 32);

/** English UI strings — the default when no translated `ui` is passed. */
const EN_UI: TripUi = {
  step1: "1 · When are you travelling?",
  step2: "2 · What weather do you want?",
  step3: "3 · Region",
  anywhere: "Anywhere",
  avoidRain: "Avoid rainy places",
  share: "Share these results",
  copied: "Link copied",
  shareTitle: "Where to go for good weather",
  bestMatches: "Best matches for {month}",
  high: "High",
  low: "Low",
  rain: "Rain",
  score: "score",
  seeDetails: "see {month} details →",
  showTop: "Show top 9 only",
  showAll: "Show all {n} cities",
  scoreLabels: ["Excellent match", "Good match", "Fair match", "Poor match"],
  monthShort: MONTHS.map((m) => m.short),
  monthNames: MONTHS.map((m) => m.name),
  styles: Object.fromEntries(STYLES.map((s) => [s.id, { label: s.label, blurb: s.blurb }])) as TripUi["styles"],
  regions: Object.fromEntries(REGIONS.map((r) => [r, r])),
};

export function TripFinder({
  cities,
  initialMonth,
  ui = EN_UI,
  locale = "en",
}: {
  cities: FinderCity[];
  initialMonth: number;
  ui?: TripUi;
  locale?: AnyLocale;
}) {
  const slugs = routeMonths(locale).monthSlugs;
  const scoreLabel = (s: number) => ui.scoreLabels[s >= 85 ? 0 : s >= 70 ? 1 : s >= 50 ? 2 : 3];
  const [month, setMonth] = useState(initialMonth);
  const [style, setStyle] = useState<WeatherStyle>("warm");
  const [region, setRegion] = useState<string>("All");
  const [avoidRain, setAvoidRain] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  // Restore choices from a shared link (?month=october&style=beach&region=Europe),
  // otherwise default to the visitor's current month.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const m = slugs.indexOf(q.get("month") ?? "");
    setMonth(m >= 0 ? m : new Date().getMonth());
    const s = q.get("style");
    if (s && STYLES.some((x) => x.id === s)) setStyle(s as WeatherStyle);
    const r = q.get("region");
    if (r && (REGIONS as readonly string[]).includes(r)) setRegion(r);
  }, []);

  const ranked = useMemo(
    () =>
      cities
        .filter((c) => region === "All" || c.region === region)
        .map((c) => ({ ...c, score: scoreMonth(c.climate, month, style, avoidRain) }))
        .sort((a, b) => b.score - a.score),
    [cities, month, style, region, avoidRain]
  );
  const shown = showAll ? ranked : ranked.slice(0, 9);

  async function share() {
    const url = `${window.location.origin}${paths.tripFinder(locale)}?month=${slugs[month]}&style=${style}${region !== "All" ? `&region=${encodeURIComponent(region)}` : ""}`;
    try {
      if (navigator.share) await navigator.share({ title: ui.shareTitle, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div>
      {/* Controls */}
      <div className="rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle sm:p-6">
        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">{ui.step1}</legend>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
            {MONTHS.map((m, i) => (
              <button
                key={m.slug}
                type="button"
                onClick={() => setMonth(i)}
                aria-pressed={month === i}
                className={`rounded-xl px-2 py-2 text-xs font-semibold transition-colors ${
                  month === i
                    ? "bg-brand-600 text-white shadow-soft"
                    : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700 dark:bg-white/5 dark:text-slate-300"
                }`}
              >
                {ui.monthShort[i]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">{ui.step2}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyle(s.id)}
                aria-pressed={style === s.id}
                className={`rounded-xl2 border p-3 text-left transition-all ${
                  style === s.id
                    ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200 dark:bg-brand-500/10 dark:ring-brand-500/30"
                    : "border-slate-200 hover:border-brand-300 dark:border-white/10"
                }`}
              >
                <span className="text-xl" aria-hidden="true">{s.emoji}</span>
                <span className="mt-1 block text-sm font-semibold text-slate-900 dark:text-white">{ui.styles[s.id].label}</span>
                <span className="block text-[11px] leading-snug text-slate-500 dark:text-slate-400">{ui.styles[s.id].blurb}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="region">
            {ui.step3}
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium dark:border-white/10 dark:bg-surface-dark dark:text-white"
          >
            <option value="All">{ui.anywhere}</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {ui.regions[r] ?? r}
              </option>
            ))}
          </select>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={avoidRain} onChange={(e) => setAvoidRain(e.target.checked)} className="h-4 w-4 rounded accent-brand-600" />
            {ui.avoidRain}
          </label>
          <button
            type="button"
            onClick={share}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-slate-300"
          >
            {copied ? <Check size={14} aria-hidden="true" /> : <Share2 size={14} aria-hidden="true" />}
            {copied ? ui.copied : ui.share}
          </button>
        </div>
      </div>

      {/* Results */}
      <h2 className="mt-10 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl" aria-live="polite">
        {ui.bestMatches.replace("{month}", ui.monthNames[month]!)}
        <span className="ml-2 text-sm font-medium text-slate-400">{ui.styles[style].label.toLowerCase()}</span>
      </h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, idx) => {
          const hi = c.climate.tMax[month]!;
          const lo = c.climate.tMin[month]!;
          const tone =
            c.score >= 85 ? "bg-emerald-500" : c.score >= 70 ? "bg-lime-500" : c.score >= 50 ? "bg-amber-500" : "bg-rose-500";
          return (
            <li key={`${c.countrySlug}/${c.citySlug}`}>
              <Link
                href={paths.month(locale, c.countrySlug, c.citySlug, month)}
                className="group block h-full rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400">#{idx + 1}</p>
                    <p className="text-lg font-bold text-slate-900 group-hover:text-brand-700 dark:text-white">{c.city}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} aria-hidden="true" /> {c.country}
                    </p>
                  </div>
                  <span className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full text-white ${tone}`}>
                    <span className="text-base font-bold leading-none">{c.score}</span>
                    <span className="text-[8px] font-semibold uppercase">{ui.score}</span>
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-orange-50 py-2 dark:bg-orange-500/10">
                    <p className="text-[10px] font-semibold uppercase text-orange-600">{ui.high}</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{Math.round(hi)}°C</p>
                    <p className="text-[10px] text-slate-400">{toF(hi)}°F</p>
                  </div>
                  <div className="rounded-xl bg-sky-50 py-2 dark:bg-sky-500/10">
                    <p className="text-[10px] font-semibold uppercase text-sky-600">{ui.low}</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{Math.round(lo)}°C</p>
                    <p className="text-[10px] text-slate-400">{toF(lo)}°F</p>
                  </div>
                  <div className="rounded-xl bg-brand-50 py-2 dark:bg-brand-500/10">
                    <p className="flex items-center justify-center gap-0.5 text-[10px] font-semibold uppercase text-brand-600">
                      <CloudRain size={10} aria-hidden="true" /> {ui.rain}
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{c.climate.precipMm[month]}</p>
                    <p className="text-[10px] text-slate-400">mm</p>
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">{scoreLabel(c.score)} · {ui.seeDetails.replace("{month}", ui.monthNames[month]!)}</p>
              </Link>
            </li>
          );
        })}
      </ol>
      {ranked.length > 9 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
          >
            {showAll ? ui.showTop : ui.showAll.replace("{n}", String(ranked.length))}
          </button>
        </div>
      )}
    </div>
  );
}
