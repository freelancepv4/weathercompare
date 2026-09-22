"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { HourlyPoint } from "@/types/weather";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { formatHourLabel } from "@/lib/utils/format";

export function RainSection({ hourly }: { hourly: HourlyPoint[] }) {
  const t = useTranslations();
  const { locale } = useI18n();

  const data = hourly.slice(0, 24).map((h) => ({
    label: formatHourLabel(h.time, locale),
    probability: h.precipitationProbability,
  }));

  const maxProb = Math.max(...data.map((d) => d.probability), 0);

  return (
    <section id="rain" aria-labelledby="rain-heading" className="scroll-mt-24 rounded-xl3 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="rain-heading" className="text-xl font-semibold text-slate-900 dark:text-white">
          {t("rain.title")}
        </h2>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
          {t("rain.probability")}: {maxProb}%
        </span>
      </div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">{t("rain.timeline")}</p>
      <div className="h-56 w-full" role="img" aria-label={t("rain.timeline")}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="rainFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2478ff" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2478ff" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-white/10" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" />
            <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" unit="%" domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} formatter={(v: number) => [`${v}%`, t("rain.probability")]} />
            <Area type="monotone" dataKey="probability" stroke="#2478ff" strokeWidth={2.5} fill="url(#rainFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
