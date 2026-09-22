"use client";

import { ExternalLink } from "lucide-react";
import type { ForecastBundle } from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { usePreferences } from "@/lib/hooks/usePreferences";
import { formatTemperature, formatWind } from "@/lib/utils/units";
import { summarizeComparison } from "@/lib/services/weatherService";
import { ComparisonChart } from "./ComparisonChart";

export function ForecastComparison({ bundles }: { bundles: ForecastBundle[] }) {
  const t = useTranslations();
  const { temperatureUnit, windUnit } = usePreferences();
  const summary = summarizeComparison(bundles);

  if (bundles.length === 0) return null;

  const agreementKey =
    summary?.agreementLabel === "high" ? "agreementHigh" : summary?.agreementLabel === "moderate" ? "agreementModerate" : "agreementLow";
  const agreementColor =
    summary?.agreementLabel === "high"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
      : summary?.agreementLabel === "moderate"
      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
      : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";

  return (
    <section id="compare" aria-labelledby="comparison-heading" className="scroll-mt-24">
      <div className="mb-5">
        <h2 id="comparison-heading" className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
          {t("comparison.title")}
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("comparison.subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {bundles.map((bundle) => (
          <div
            key={bundle.provider.id}
            className="rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft transition-shadow hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{bundle.provider.name}</span>
              <WeatherIcon condition={bundle.current.condition} size={26} aria-hidden="true" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              {formatTemperature(bundle.current.temperature, temperatureUnit)}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{bundle.current.conditionLabel}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="rounded-lg bg-slate-50 px-2.5 py-2 dark:bg-white/5">
                <dt className="text-slate-400">{t("dashboard.precipitation")}</dt>
                <dd className="font-semibold">{bundle.current.precipitationProbability}%</dd>
              </div>
              <div className="rounded-lg bg-slate-50 px-2.5 py-2 dark:bg-white/5">
                <dt className="text-slate-400">{t("dashboard.wind")}</dt>
                <dd className="font-semibold">{formatWind(bundle.current.windSpeed, windUnit)}</dd>
              </div>
            </dl>
            <a
              href={bundle.provider.attributionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-brand-600"
            >
              {t("comparison.source")}: {bundle.provider.name}
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>

      {summary && (
        <div className="mt-5 rounded-xl2 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-dark-subtle">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t("comparison.agreement")}</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${agreementColor}`}>{t(`comparison.${agreementKey}`)}</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <RangeStat label={t("comparison.temperatureRange")} value={`${formatTemperature(summary.tempMin, temperatureUnit)} – ${formatTemperature(summary.tempMax, temperatureUnit)}`} />
            <RangeStat label={t("comparison.rainRange")} value={`${summary.rainMin}% – ${summary.rainMax}%`} />
            <RangeStat label={t("comparison.windRange")} value={`${formatWind(summary.windMin, windUnit)} – ${formatWind(summary.windMax, windUnit)}`} />
          </div>
        </div>
      )}

      <div className="mt-6">
        <ComparisonChart bundles={bundles} />
      </div>
    </section>
  );
}

function RangeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl2 bg-slate-50 px-4 py-3 dark:bg-white/5">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-0.5 text-base font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
