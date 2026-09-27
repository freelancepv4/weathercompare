"use client";

import { Droplets, Wind as WindIcon, Gauge, Eye, Sun, CloudRain, Sunrise, Sunset } from "lucide-react";
import type { CurrentConditions, GeoLocation } from "@/types/weather";
import { WeatherIcon } from "./WeatherIcon";
import { FavoriteButton } from "./FavoriteButton";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { usePreferences } from "@/lib/hooks/usePreferences";
import { formatTemperature, formatWind } from "@/lib/utils/units";
import { formatTime } from "@/lib/utils/format";

interface WeatherDashboardProps {
  location: GeoLocation;
  current: CurrentConditions;
  timezone?: string;
  countrySlug?: string;
  citySlug?: string;
  /** Use "h2" when the page already has its own <h1> (translated city pages). */
  headingAs?: "h1" | "h2";
}

/** The card's colour follows the sky: bright blue for sun, grey for cloud,
 * slate-blue for rain, deep indigo at night. Every gradient keeps white text
 * above WCAG AA contrast. */
const SKY: Partial<Record<string, string>> = {
  clear: "from-sky-500 via-blue-600 to-blue-800",
  "mostly-clear": "from-sky-500 via-blue-600 to-blue-800",
  "partly-cloudy": "from-sky-600 via-blue-700 to-indigo-800",
  cloudy: "from-slate-500 via-slate-600 to-slate-800",
  fog: "from-slate-500 via-slate-600 to-slate-800",
  drizzle: "from-slate-600 via-blue-800 to-slate-900",
  rain: "from-slate-600 via-blue-800 to-slate-900",
  "heavy-rain": "from-slate-700 via-blue-900 to-slate-950",
  sleet: "from-slate-600 via-sky-800 to-slate-900",
  snow: "from-slate-500 via-sky-700 to-slate-800",
  thunderstorm: "from-slate-700 via-indigo-900 to-slate-950",
  windy: "from-cyan-600 via-sky-700 to-blue-900",
};
const NIGHT = "from-indigo-950 via-blue-950 to-slate-900";

function skyGradient(c: CurrentConditions): string {
  const now = Date.parse(c.observedAt);
  const rise = Date.parse(c.sunrise);
  const set = Date.parse(c.sunset);
  const isNight = [now, rise, set].every(Number.isFinite) && (now < rise || now > set);
  const clearish = c.condition === "clear" || c.condition === "mostly-clear" || c.condition === "partly-cloudy";
  if (isNight && clearish) return NIGHT;
  return SKY[c.condition] ?? "from-sky-500 via-blue-600 to-blue-800";
}

export function WeatherDashboard({ location, current, timezone, countrySlug, citySlug, headingAs = "h1" }: WeatherDashboardProps) {
  const Heading = headingAs;
  const t = useTranslations();
  const { locale } = useI18n();
  const { temperatureUnit, windUnit } = usePreferences();

  const metrics = [
    { icon: Droplets, label: t("dashboard.humidity"), value: `${current.humidity}%` },
    { icon: WindIcon, label: t("dashboard.wind"), value: formatWind(current.windSpeed, windUnit) },
    { icon: Gauge, label: t("dashboard.pressure"), value: `${current.pressure} hPa` },
    { icon: Eye, label: t("dashboard.visibility"), value: `${current.visibility} km` },
    { icon: Sun, label: t("dashboard.uvIndex"), value: `${current.uvIndex}` },
    { icon: CloudRain, label: t("dashboard.precipitation"), value: `${current.precipitationProbability}%` },
    { icon: Sunrise, label: t("dashboard.sunrise"), value: formatTime(current.sunrise, timezone, locale) },
    { icon: Sunset, label: t("dashboard.sunset"), value: formatTime(current.sunset, timezone, locale) },
  ];

  return (
    <section aria-labelledby="current-weather-heading" className={`overflow-hidden rounded-xl3 bg-gradient-to-br ${skyGradient(current)} text-white shadow-soft-lg`}>
      <div className="relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-mesh-light opacity-60" aria-hidden="true" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Heading id="current-weather-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {location.name}
                <span className="ml-2 text-lg font-normal text-white/70">{location.country}</span>
              </Heading>
              {countrySlug && citySlug && (
                <FavoriteButton
                  location={{ id: location.id, name: location.name, country: location.country, countrySlug, citySlug }}
                />
              )}
            </div>
            <p className="mt-1 text-sm text-white/60">
              {t("dashboard.updated")} {formatTime(current.observedAt, timezone, locale)}
            </p>

            <div className="mt-6 flex items-end gap-4">
              <span className="text-6xl font-bold leading-none tracking-tight sm:text-7xl">
                {formatTemperature(current.temperature, temperatureUnit)}
              </span>
              <div className="pb-2">
                <p className="text-lg font-medium">{current.conditionLabel}</p>
                <p className="text-sm text-white/70">
                  {t("dashboard.feelsLike")} {formatTemperature(current.feelsLike, temperatureUnit)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-full bg-white/10 p-6 backdrop-blur-sm sm:p-8">
            <WeatherIcon condition={current.condition} colored={false} className="text-white" size={72} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1.5 bg-white/[0.06] px-4 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white/60">
              <m.icon size={14} aria-hidden="true" />
              {m.label}
            </div>
            <span className="text-lg font-semibold">{m.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
