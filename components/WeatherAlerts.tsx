"use client";

import { AlertTriangle, ShieldCheck } from "lucide-react";
import type { WeatherAlert } from "@/types/weather";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { formatTime } from "@/lib/utils/format";

const SEVERITY_STYLES: Record<WeatherAlert["severity"], string> = {
  minor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50",
  moderate: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-900/50",
  severe: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900/50",
  extreme: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800",
};

export function WeatherAlerts({ alerts }: { alerts: WeatherAlert[] }) {
  const t = useTranslations();
  const { locale } = useI18n();

  return (
    <section id="alerts" aria-labelledby="alerts-heading" className="scroll-mt-24">
      <h2 id="alerts-heading" className="mb-4 text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
        {t("alerts.title")}
      </h2>

      {alerts.length === 0 ? (
        <div className="flex items-center gap-3 rounded-xl2 border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300">
          <ShieldCheck size={20} aria-hidden="true" />
          <p className="text-sm font-medium">{t("alerts.none")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`rounded-xl2 border p-5 ${SEVERITY_STYLES[alert.severity]}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="font-semibold">{alert.title}</h3>
                  <p className="mt-1 text-sm opacity-90">{alert.description}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
                    <div>
                      <dt className="opacity-70">{t("alerts.severity")}</dt>
                      <dd className="font-semibold capitalize">{alert.severity}</dd>
                    </div>
                    <div>
                      <dt className="opacity-70">{t("alerts.area")}</dt>
                      <dd className="font-semibold">{alert.area}</dd>
                    </div>
                    <div>
                      <dt className="opacity-70">{t("alerts.starts")}</dt>
                      <dd className="font-semibold">{formatTime(alert.startsAt, undefined, locale)}</dd>
                    </div>
                    <div>
                      <dt className="opacity-70">{t("alerts.ends")}</dt>
                      <dd className="font-semibold">{formatTime(alert.endsAt, undefined, locale)}</dd>
                    </div>
                  </dl>
                  <p className="mt-2 text-[11px] opacity-70">
                    {t("alerts.officialSource")}: {alert.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
