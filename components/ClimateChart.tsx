import Link from "next/link";
import { MONTHS, type CityClimate } from "@/lib/data/climate";

const toF = (c: number) => Math.round((c * 9) / 5 + 32);

interface ClimateChartProps {
  climate: CityClimate;
  countrySlug: string;
  citySlug: string;
  cityName: string;
  /** 0–11; highlighted column, or -1 for none. */
  activeMonth?: number;
}

/**
 * Twelve-month climate strip: a temperature range bar (low → high) and a
 * rainfall bar per month, each column linking to that month's page. Pure
 * HTML/CSS (no chart library) so it renders server-side, costs no JS, and
 * its links are crawlable. A plain data table follows for screen readers
 * and for search engines that like tabular answers.
 */
export function ClimateChart({ climate, countrySlug, citySlug, cityName, activeMonth = -1 }: ClimateChartProps) {
  const allTemps = [...climate.tMax, ...climate.tMin];
  const tLo = Math.floor(Math.min(...allTemps) / 5) * 5;
  const tHi = Math.ceil(Math.max(...allTemps) / 5) * 5;
  const span = Math.max(tHi - tLo, 10);
  const rainMax = Math.max(...climate.precipMm, 50);
  const pct = (t: number) => ((t - tLo) / span) * 100;

  return (
    <section aria-labelledby="climate-chart-heading" className="rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <h2 id="climate-chart-heading" className="text-lg font-bold text-slate-900 dark:text-white">
          {cityName} weather by month
        </h2>
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-sky-400 to-orange-400" aria-hidden="true" /> Low → high °C
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-brand-400" aria-hidden="true" /> Rain (mm)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-1 sm:gap-2" aria-hidden="true">
        {MONTHS.map((m, i) => {
          const active = i === activeMonth;
          return (
            <Link
              key={m.slug}
              href={`/weather/${countrySlug}/${citySlug}/${m.slug}`}
              tabIndex={-1}
              className={`group flex flex-col items-center rounded-xl px-0.5 pb-2 pt-2 transition-colors ${
                active ? "bg-brand-50 ring-2 ring-brand-400 dark:bg-brand-500/10" : "hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 sm:text-xs">{Math.round(climate.tMax[i]!)}°</span>
              <div className="relative my-1 h-28 w-2.5 rounded-full bg-slate-100 dark:bg-white/5 sm:h-36 sm:w-3.5">
                <div
                  className="absolute inset-x-0 rounded-full bg-gradient-to-t from-sky-400 to-orange-400"
                  style={{ bottom: `${pct(climate.tMin[i]!)}%`, height: `${Math.max(pct(climate.tMax[i]!) - pct(climate.tMin[i]!), 3)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 sm:text-xs">{Math.round(climate.tMin[i]!)}°</span>
              <div className="mt-2 flex h-10 w-full items-end justify-center sm:h-12">
                <div className="w-3 rounded-t bg-brand-400/80 sm:w-4" style={{ height: `${Math.max((climate.precipMm[i]! / rainMax) * 100, 4)}%` }} />
              </div>
              <span className="text-[9px] text-slate-400 sm:text-[10px]">{climate.precipMm[i]}</span>
              <span className={`mt-1 text-[10px] font-semibold sm:text-xs ${active ? "text-brand-700 dark:text-brand-200" : "text-slate-500 group-hover:text-brand-600"}`}>
                {m.short}
              </span>
            </Link>
          );
        })}
      </div>

      <details className="mt-5 text-sm">
        <summary className="cursor-pointer font-semibold text-brand-600 dark:text-brand-300">Show the monthly averages as a table</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-xs">
            <caption className="sr-only">Average monthly climate in {cityName}</caption>
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-white/10">
                <th scope="col" className="py-2 pr-3 font-semibold">Month</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Avg high</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Avg low</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Rain</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Humidity</th>
                <th scope="col" className="py-2 font-semibold">Cloud cover</th>
              </tr>
            </thead>
            <tbody>
              {MONTHS.map((m, i) => (
                <tr key={m.slug} className={`border-b border-slate-100 dark:border-white/5 ${i === activeMonth ? "bg-brand-50 font-semibold dark:bg-brand-500/10" : ""}`}>
                  <th scope="row" className="py-2 pr-3 font-medium">
                    <Link href={`/weather/${countrySlug}/${citySlug}/${m.slug}`} className="text-brand-600 hover:underline dark:text-brand-300">
                      {m.name}
                    </Link>
                  </th>
                  <td className="py-2 pr-3">{Math.round(climate.tMax[i]!)}°C / {toF(climate.tMax[i]!)}°F</td>
                  <td className="py-2 pr-3">{Math.round(climate.tMin[i]!)}°C / {toF(climate.tMin[i]!)}°F</td>
                  <td className="py-2 pr-3">{climate.precipMm[i]} mm</td>
                  <td className="py-2 pr-3">{climate.humidity[i]}%</td>
                  <td className="py-2">{climate.cloud[i]}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

/** Compact row of 12 month links — used on city forecast and best-time pages. */
export function MonthLinks({ countrySlug, citySlug, cityName }: { countrySlug: string; citySlug: string; cityName: string }) {
  return (
    <nav aria-label={`${cityName} weather by month`} className="rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
      <h2 className="text-base font-bold text-slate-900 dark:text-white">{cityName} weather by month</h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Typical temperatures, rain and what to pack for each month.</p>
      <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {MONTHS.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/weather/${countrySlug}/${citySlug}/${m.slug}`}
              className="block rounded-xl border border-slate-200 px-2 py-2 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
            >
              {m.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
