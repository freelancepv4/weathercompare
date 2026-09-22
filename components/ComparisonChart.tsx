"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { ForecastBundle } from "@/types/weather";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { usePreferences } from "@/lib/hooks/usePreferences";
import { formatDayMonth, formatHourLabel } from "@/lib/utils/format";

const LINE_COLORS = ["#2478ff", "#22c55e", "#f59e0b"];

export function ComparisonChart({ bundles }: { bundles: ForecastBundle[] }) {
  const t = useTranslations();
  const { locale } = useI18n();
  const { temperatureUnit } = usePreferences();
  const [view, setView] = useState<"hourly" | "daily">("hourly");

  const toDisplay = (c: number) => (temperatureUnit === "fahrenheit" ? Math.round((c * 9) / 5 + 32) : Math.round(c));

  const data = useMemo(() => {
    if (bundles.length === 0) return [];
    const length = view === "hourly" ? bundles[0]?.hourly.length ?? 0 : bundles[0]?.daily.length ?? 0;
    return Array.from({ length }).map((_, i) => {
      const row: Record<string, string | number> = {
        label:
          view === "hourly"
            ? formatHourLabel(bundles[0]?.hourly[i]?.time ?? "", locale)
            : formatDayMonth(bundles[0]?.daily[i]?.date ?? "", locale),
      };
      bundles.forEach((b) => {
        const point = view === "hourly" ? b.hourly[i] : b.daily[i];
        if (!point) return;
        const temp = "temperature" in point ? point.temperature : (point.tempMax + point.tempMin) / 2;
        row[b.provider.name] = toDisplay(temp);
      });
      return row;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- toDisplay is derived purely from temperatureUnit, already a dependency
  }, [bundles, view, locale, temperatureUnit]);

  return (
    <div className="rounded-xl3 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-dark-subtle">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t("comparison.chartTitle")}</h3>
        <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-white/5" role="tablist">
          {(["hourly", "daily"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                view === v ? "bg-white text-brand-700 shadow-sm dark:bg-surface-dark dark:text-brand-300" : "text-slate-500"
              }`}
            >
              {t(v === "hourly" ? "comparison.viewHourly" : "comparison.viewDaily")}
            </button>
          ))}
        </div>
      </div>
      <div className="h-72 w-full" role="img" aria-label={t("comparison.chartTitle")}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-white/10" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" />
            <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" unit={temperatureUnit === "fahrenheit" ? "°F" : "°C"} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
              formatter={(value: number) => [`${value}°`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {bundles.map((b, i) => (
              <Line
                key={b.provider.id}
                type="monotone"
                dataKey={b.provider.name}
                stroke={LINE_COLORS[i % LINE_COLORS.length]}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
