"use client";

import type { CurrentConditions, DailyPoint, HourlyPoint } from "@/types/weather";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { usePreferences } from "@/lib/hooks/usePreferences";
import { formatWind, windDirectionLabel } from "@/lib/utils/units";
import { formatHourLabel, formatWeekday } from "@/lib/utils/format";

export function WindSection({
  current,
  hourly,
  daily,
  timeZone,
}: {
  current: CurrentConditions;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  timeZone?: string;
}) {
  const t = useTranslations();
  const { locale } = useI18n();
  const { windUnit } = usePreferences();

  return (
    <section id="wind" aria-labelledby="wind-heading" className="min-w-0 scroll-mt-24 rounded-xl3 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-6">
      <h2 id="wind-heading" className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">
        {t("wind.title")}
      </h2>

      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        {/* Compass visualization */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-slate-200 dark:border-white/10">
            {["N", "E", "S", "W"].map((dir, i) => (
              <span
                key={dir}
                className="absolute text-[10px] font-semibold text-slate-400"
                style={{
                  top: i === 0 ? 4 : i === 2 ? undefined : "50%",
                  bottom: i === 2 ? 4 : undefined,
                  left: i === 3 ? 4 : i === 1 ? undefined : "50%",
                  right: i === 1 ? 4 : undefined,
                  transform: i === 0 || i === 2 ? "translateX(-50%)" : "translateY(-50%)",
                }}
              >
                {dir}
              </span>
            ))}
            <div
              className="h-24 w-24 origin-center transition-transform duration-500"
              style={{ transform: `rotate(${current.windDirection}deg)` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-full w-full text-brand-600 dark:text-brand-400">
                <path d="M12 2 L16 12 L12 9.5 L8 12 Z" fill="currentColor" />
                <line x1="12" y1="9.5" x2="12" y2="20" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("wind.direction")}: <span className="font-semibold text-slate-800 dark:text-slate-200">{windDirectionLabel(current.windDirection)}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatBox label={t("wind.current")} value={formatWind(current.windSpeed, windUnit)} />
          <StatBox label={t("wind.gusts")} value={formatWind(current.windGust, windUnit)} />
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">{t("wind.hourly")}</p>
        <div className="scroll-rail flex gap-3 overflow-x-auto pb-1">
          {hourly.slice(0, 12).map((h) => (
            <div key={h.time} className="flex w-16 shrink-0 flex-col items-center gap-1 rounded-lg bg-slate-50 px-2 py-2.5 text-center dark:bg-white/5">
              <span className="text-[10px] text-slate-400">{formatHourLabel(h.time, locale, timeZone)}</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatWind(h.windSpeed, windUnit)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">{t("wind.daily")}</p>
        <div className="scroll-rail flex gap-3 overflow-x-auto pb-1">
          {daily.slice(0, 7).map((d) => (
            <div key={d.date} className="flex w-16 shrink-0 flex-col items-center gap-1 rounded-lg bg-slate-50 px-2 py-2.5 text-center dark:bg-white/5">
              <span className="text-[10px] text-slate-400">{formatWeekday(d.date, locale)}</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatWind(d.windSpeed, windUnit)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl2 bg-slate-50 px-4 py-3 dark:bg-white/5">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-0.5 text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
