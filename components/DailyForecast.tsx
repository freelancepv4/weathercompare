"use client";

import type { DailyPoint } from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { usePreferences } from "@/lib/hooks/usePreferences";
import { formatTemperature } from "@/lib/utils/units";
import { formatDayMonth, formatWeekday } from "@/lib/utils/format";

export function DailyForecast({ daily }: { daily: DailyPoint[] }) {
  const t = useTranslations();
  const { locale } = useI18n();
  const { temperatureUnit } = usePreferences();

  return (
    <section aria-labelledby="daily-heading">
      <h2 id="daily-heading" className="mb-4 text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
        {t("daily.title")}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {daily.map((d, i) => (
          <div
            key={d.date}
            className="flex flex-col items-center gap-2 rounded-xl2 border border-slate-200 bg-white px-3 py-5 text-center shadow-soft transition-shadow hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {i === 0 ? t("daily.today") : formatWeekday(d.date, locale)}
            </span>
            <span className="text-[11px] text-slate-400">{formatDayMonth(d.date, locale)}</span>
            <WeatherIcon condition={d.condition} size={30} aria-hidden="true" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold text-slate-900 dark:text-white">{formatTemperature(d.tempMax, temperatureUnit)}</span>
              <span className="text-sm text-slate-400">{formatTemperature(d.tempMin, temperatureUnit)}</span>
            </div>
            <span className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
              {d.precipitationProbability}% {t("daily.rain")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
