"use client";

import type { HourlyPoint } from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { usePreferences } from "@/lib/hooks/usePreferences";
import { formatTemperature, formatWind } from "@/lib/utils/units";
import { formatHourLabel } from "@/lib/utils/format";

export function HourlyForecast({ hourly }: { hourly: HourlyPoint[] }) {
  const t = useTranslations();
  const { locale } = useI18n();
  const { temperatureUnit, windUnit } = usePreferences();

  return (
    <section aria-labelledby="hourly-heading">
      <h2 id="hourly-heading" className="mb-4 text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
        {t("hourly.title")}
      </h2>
      <div className="scroll-rail -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
        {hourly.slice(0, 24).map((h) => (
          <div
            key={h.time}
            className="flex w-24 shrink-0 snap-start flex-col items-center gap-2 rounded-xl2 border border-slate-200 bg-white px-3 py-4 text-center shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle"
          >
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{formatHourLabel(h.time, locale)}</span>
            <WeatherIcon condition={h.condition} size={28} aria-hidden="true" />
            <span className="text-lg font-semibold text-slate-900 dark:text-white">{formatTemperature(h.temperature, temperatureUnit)}</span>
            <span className="text-[11px] text-sky-600 dark:text-sky-400">{h.precipitationProbability}%</span>
            <span className="text-[11px] text-slate-400">{formatWind(h.windSpeed, windUnit)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
