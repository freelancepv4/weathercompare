import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CountrySeed, CitySeed } from "@/config/countries";

/** 12 average monthly highs (°C), Jan..Dec — see lib/data/climate.ts. */
export type ClimateHighs = Record<string, number[]>;

interface CityGridProps {
  title: string;
  items: Array<{ country: CountrySeed; city: CitySeed }>;
  /** Where each card links — defaults to the live weather page. */
  hrefFor?: (country: CountrySeed, city: CitySeed) => string;
  /**
   * Optional monthly highs keyed "country/city". When given, each card shows
   * a mini 12-month temperature chart. Passed in (rather than imported here)
   * so client components using this grid don't bundle the climate dataset —
   * build it on the server with climateHighsFor() from lib/data/climate.ts.
   */
  climate?: ClimateHighs;
  /** Optional line under the title. */
  subtitle?: string;
  /** Localized display names (translated site versions). */
  nameFor?: (country: CountrySeed, city: CitySeed) => { city: string; country: string };
  /** Localized "Highs 3° – 30°C" label. */
  highsLabel?: (min: number, max: number) => string;
  /** Localized "View forecast →" label. */
  viewLabel?: string;
  /** Localized short month names (Jan..Dec), for initials and screen-reader text. */
  monthShort?: string[];
}

const MONTH_INITIALS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Cold→hot colour for a daily-high temperature. Hex (not Tailwind classes) so any value works. */
export function tempColor(t: number): string {
  if (t < 3) return "#60a5fa";
  if (t < 10) return "#38bdf8";
  if (t < 16) return "#2dd4bf";
  if (t < 21) return "#a3e635";
  if (t < 26) return "#fbbf24";
  if (t < 31) return "#fb923c";
  return "#f43f5e";
}

/** Per-country accent so a page of cards isn't one flat colour. */
const ACCENTS = [
  "from-brand-500 to-indigo-500",
  "from-sky-400 to-brand-500",
  "from-teal-400 to-emerald-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-fuchsia-500",
  "from-violet-500 to-indigo-500",
];
function accentFor(slug: string) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return ACCENTS[h % ACCENTS.length]!;
}

export function CityGrid({ title, items, hrefFor, climate, subtitle, nameFor, highsLabel, viewLabel, monthShort }: CityGridProps) {
  const short = monthShort ?? MONTH_SHORT;
  const initials = monthShort ? monthShort.map((m) => m.charAt(0)) : MONTH_INITIALS;
  const headingId = `${title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}-heading`;
  return (
    <section aria-labelledby={headingId}>
      <div className="mb-5">
        <h2 id={headingId} className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
        {items.map(({ country, city }) => {
          const highs = climate?.[`${country.slug}/${city.slug}`];
          const max = highs ? Math.max(...highs) : 0;
          const min = highs ? Math.min(...highs) : 0;
          const span = Math.max(max - min, 1);
          const names = nameFor ? nameFor(country, city) : { city: city.name, country: country.name };
          return (
            <Link
              key={`${country.slug}-${city.slug}`}
              href={hrefFor ? hrefFor(country, city) : `/weather/${country.slug}/${city.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
            >
              <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentFor(country.slug)}`} aria-hidden="true" />
              <div className="flex items-start justify-between gap-2">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-200 sm:text-base">
                    {names.city}
                  </span>
                  <span className="block truncate text-xs text-slate-400">{names.country}</span>
                </span>
                <ArrowRight
                  size={15}
                  className="mt-1 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500"
                  aria-hidden="true"
                />
              </div>

              {highs ? (
                <>
                  <div className="mt-3 flex h-10 items-end gap-[3px]" aria-hidden="true">
                    {highs.map((t, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{ height: `${25 + ((t - min) / span) * 75}%`, backgroundColor: tempColor(t) }}
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex gap-[3px] text-center text-[8px] font-medium text-slate-300" aria-hidden="true">
                    {initials.map((m, i) => (
                      <span key={i} className="flex-1">
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    {highsLabel ? (
                      highsLabel(Math.round(min), Math.round(max))
                    ) : (
                      <>
                        Highs {Math.round(min)}° – {Math.round(max)}°C
                        <span className="sr-only">
                          {" "}
                          (warmest in {short[highs.indexOf(max)]}, coolest in {short[highs.indexOf(min)]})
                        </span>
                      </>
                    )}
                  </p>
                </>
              ) : (
                <span className="mt-3 text-[11px] font-medium text-brand-600 dark:text-brand-300">{viewLabel ?? "View forecast →"}</span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
