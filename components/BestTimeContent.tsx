import Link from "next/link";
import { CalendarDays, Thermometer, Snowflake, CloudRain, Sun, SunDim, CloudSun } from "lucide-react";
import type { CityClimate } from "@/lib/data/climate";
import { bestTimeCopy, type BestTimeFacts, type Verdict } from "@/lib/i18n/bestTime";
import { monthInfo, paths, type AnyLocale } from "@/lib/i18n/routing";
import { joinList } from "@/lib/i18n/copy";

const VERDICT_STYLE: Record<Verdict, string> = {
  ideal: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
  good: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30",
  hot: "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/30",
  rainy: "bg-slate-100 text-slate-700 ring-slate-300 dark:bg-white/10 dark:text-slate-200 dark:ring-white/20",
  cold: "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30",
};

/**
 * The data-driven body of a "best time to visit" page: the direct answer,
 * key facts, season-by-season verdicts and (optionally) the monthly table.
 * The FAQ is rendered by the page so it can also go into JSON-LD.
 */
export function BestTimeContent({
  locale,
  cityLabel,
  countrySlug,
  citySlug,
  climate,
  facts,
  showAnswer = true,
  showTable = true,
}: {
  locale: AnyLocale;
  cityLabel: string;
  countrySlug: string;
  citySlug: string;
  climate: CityClimate;
  facts: BestTimeFacts;
  showAnswer?: boolean;
  showTable?: boolean;
}) {
  const t = bestTimeCopy(locale);
  const mn = monthInfo(locale).monthNames;
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const bestList = joinList(locale, facts.best.map((m) => mn[m]!));
  const monthHref = (m: number) => paths.month(locale, countrySlug, citySlug, m);

  const factCards = [
    { icon: Thermometer, label: t.warmest, m: facts.warmest, value: `${Math.round(climate.tMax[facts.warmest]!)}°C`, tone: "text-orange-500" },
    { icon: Snowflake, label: t.coolest, m: facts.coolest, value: `${Math.round(climate.tMax[facts.coolest]!)}°C`, tone: "text-sky-500" },
    { icon: CloudRain, label: t.wettest, m: facts.wettest, value: `${Math.round(climate.precipMm[facts.wettest]!)} mm`, tone: "text-blue-600" },
    { icon: SunDim, label: t.driest, m: facts.driest, value: `${Math.round(climate.precipMm[facts.driest]!)} mm`, tone: "text-amber-500" },
    { icon: Sun, label: t.sunniest, m: facts.sunniest, value: `☁ ${Math.round(climate.cloud[facts.sunniest]!)}%`, tone: "text-yellow-500" },
  ];

  return (
    <div className="space-y-10">
      {showAnswer && (
        <div className="flex items-start gap-3 rounded-xl2 border border-emerald-200 bg-gradient-to-br from-emerald-50 to-sky-50 px-5 py-4 shadow-soft dark:border-emerald-500/20 dark:from-emerald-500/10 dark:to-sky-500/5">
          <CalendarDays size={20} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
          <p className="text-base leading-relaxed text-slate-800 dark:text-slate-100">
            {t.answer(cityLabel, bestList, facts.bestLo, facts.bestHi, facts.bestRain)}
          </p>
        </div>
      )}

      <section aria-labelledby="bt-facts">
        <h2 id="bt-facts" className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{t.factsH}</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {factCards.map((f) => (
            <li key={f.label}>
              <Link
                href={monthHref(f.m)}
                className="block h-full rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
              >
                <f.icon size={18} className={f.tone} aria-hidden="true" />
                <span className="mt-2 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{f.label}</span>
                <span className="mt-0.5 block text-base font-bold text-slate-900 dark:text-white">{cap(mn[f.m]!)}</span>
                <span className="block text-sm tabular-nums text-slate-600 dark:text-slate-300">{f.value}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="bt-periods">
        <h2 id="bt-periods" className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{t.periodsH(cityLabel)}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {facts.periods.map((p) => (
            <div key={p.months.join("-")} className="rounded-xl2 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {cap(mn[p.months[0]!]!)} – {mn[p.months[2]!]}
                </p>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${VERDICT_STYLE[p.verdict]}`}>{t.verdict[p.verdict]}</span>
              </div>
              <p className="mt-1 text-sm tabular-nums text-slate-600 dark:text-slate-300">
                {p.hi}° / {p.lo}°C · {p.rain} mm
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t.verdictText[p.verdict]}</p>
              <p className="mt-3 flex flex-wrap gap-1.5">
                {p.months.map((m) => (
                  <Link key={m} href={monthHref(m)} className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
                    {cap(mn[m]!)}
                  </Link>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      {showTable && (
        <section aria-labelledby="bt-table">
          <h2 id="bt-table" className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{t.tableH(cityLabel)}</h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{t.tableIntro(cityLabel)}</p>
          <div className="overflow-x-auto rounded-xl2 border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <table className="w-full text-sm">
              <caption className="sr-only">{t.tableH(cityLabel)}</caption>
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-3 py-2">{t.cols[0]}</th>
                  <th scope="col" className="px-3 py-2 text-right">{t.cols[1]}</th>
                  <th scope="col" className="px-3 py-2 text-right">{t.cols[2]}</th>
                  <th scope="col" className="px-3 py-2 text-right">{t.cols[3]}</th>
                  <th scope="col" className="hidden px-3 py-2 text-right sm:table-cell">{t.cols[4]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {mn.map((name, i) => (
                  <tr key={name} className={facts.best.includes(i) ? "bg-emerald-50/60 dark:bg-emerald-500/5" : undefined}>
                    <th scope="row" className="px-3 py-2 text-left font-medium">
                      <Link href={monthHref(i)} className="text-brand-700 hover:underline dark:text-brand-300">
                        {cap(name)}
                      </Link>
                    </th>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-800 dark:text-slate-200">{Math.round(climate.tMax[i]!)}°C</td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-500 dark:text-slate-400">{Math.round(climate.tMin[i]!)}°C</td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-500 dark:text-slate-400">{Math.round(climate.precipMm[i]!)} mm</td>
                    <td className="hidden px-3 py-2 text-right tabular-nums text-slate-500 dark:text-slate-400 sm:table-cell">{Math.round(climate.humidity[i]!)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Link
        href={paths.city(locale, countrySlug, citySlug)}
        className="flex items-center gap-2.5 rounded-xl2 border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
      >
        <CloudSun size={18} className="shrink-0 text-brand-500" aria-hidden="true" />
        {t.liveCta(cityLabel)}
      </Link>
    </div>
  );
}
