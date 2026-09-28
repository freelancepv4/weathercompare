"use client";

import dynamic from "next/dynamic";
import { LazyVisible } from "./LazyVisible";
import type { HourlyPoint } from "@/types/weather";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { formatHourLabel } from "@/lib/utils/format";

// Recharts is large; load it only when the chart scrolls into view.
const RainArea = dynamic(() => import("./charts/RainArea").then((m) => m.RainArea), { ssr: false });

export function RainSection({ hourly, timeZone }: { hourly: HourlyPoint[]; timeZone?: string }) {
  const t = useTranslations();
  const { locale } = useI18n();

  const data = hourly.slice(0, 24).map((h) => ({
    label: formatHourLabel(h.time, locale, timeZone),
    probability: h.precipitationProbability,
  }));

  const maxProb = Math.max(...data.map((d) => d.probability), 0);

  return (
    <section id="rain" aria-labelledby="rain-heading" className="min-w-0 scroll-mt-24 rounded-xl3 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 id="rain-heading" className="text-xl font-semibold text-slate-900 dark:text-white">
          {t("rain.title")}
        </h2>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
          {t("rain.probability")}: {maxProb}%
        </span>
      </div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">{t("rain.timeline")}</p>
      <div className="h-56 w-full" role="img" aria-label={t("rain.timeline")}>
        <LazyVisible className="h-full w-full">
          <RainArea data={data} probabilityLabel={t("rain.probability")} />
        </LazyVisible>
      </div>
    </section>
  );
}
