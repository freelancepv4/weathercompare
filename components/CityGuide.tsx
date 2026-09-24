import type { CityGuide as CityGuideData } from "@/lib/data/cityGuides";
import { MapPin, CalendarDays, Lightbulb, Bus, Info } from "lucide-react";

interface CityGuideProps {
  cityName: string;
  guide: CityGuideData;
}

/**
 * Editorial "what to see" section for a city weather page — landmarks,
 * best time to visit, and a local tip. Purely static content from
 * lib/data/cityGuides.ts, rendered alongside the live forecast data so
 * each city page carries genuinely unique, indexable text.
 */
export function CityGuide({ cityName, guide }: CityGuideProps) {
  return (
    <section
      aria-labelledby="guide-heading"
      className="rounded-xl3 border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8"
    >
      <h2 id="guide-heading" className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
        Visiting {cityName}
      </h2>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{guide.intro}</p>

      <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:bg-brand-500/10 dark:text-brand-200">
        <CalendarDays size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">Best time to visit: </span>
          {guide.bestTimeToVisit}
        </p>
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Landmarks &amp; highlights
      </h3>
      <ul className="grid gap-4 sm:grid-cols-3">
        {guide.landmarks.map((landmark) => (
          <li key={landmark.name} className="rounded-lg border border-slate-100 p-4 dark:border-white/10">
            <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
              <MapPin size={15} className="shrink-0 text-brand-500" aria-hidden="true" />
              {landmark.name}
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{landmark.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        <Lightbulb size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">Local tip: </span>
          {guide.localTip}
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-300">
        <Bus size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">Getting around: </span>
          {guide.gettingAround}
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
        <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">Good to know: </span>
          {guide.goodToKnow}
        </p>
      </div>
    </section>
  );
}
