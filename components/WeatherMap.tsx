"use client";

import { Thermometer, CloudRain, Wind, Cloud, Satellite, MapPinned } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "@/lib/i18n/I18nProvider";

const LAYERS = [
  { key: "temperature", icon: Thermometer },
  { key: "precipitation", icon: CloudRain },
  { key: "wind", icon: Wind },
  { key: "clouds", icon: Cloud },
  { key: "satellite", icon: Satellite },
] as const;

/**
 * Visually polished placeholder for the future interactive weather map.
 *
 * TO CONNECT A REAL MAP PROVIDER:
 *   - Set WEATHER_MAP_API_KEY in your environment.
 *   - Replace the placeholder <div> below with your map library of choice
 *     (e.g. MapLibre GL / Leaflet) and add tile layers from a provider such
 *     as RainViewer (precipitation radar), Windy API, or OpenWeatherMap Maps.
 *   - Keep the layer switcher UI below — just wire each button's onClick to
 *     toggle the corresponding tile layer instead of local state.
 *   - Respect each map provider's attribution requirements (see
 *     /data-sources) by rendering their required attribution control.
 */
export function WeatherMap() {
  const t = useTranslations();
  const [layer, setLayer] = useState<(typeof LAYERS)[number]["key"]>("temperature");

  return (
    <section id="map" aria-labelledby="map-heading" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="map-heading" className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
          {t("map.title")}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {LAYERS.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setLayer(l.key)}
              aria-pressed={layer === l.key}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                layer === l.key
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              }`}
            >
              <l.icon size={13} aria-hidden="true" />
              {t(`map.${l.key}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-xl3 border border-slate-200 bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 dark:border-white/10 sm:h-96">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute -left-1/4 top-0 h-full w-1/2 animate-drift-slow bg-white/10 blur-3xl" />
          <div className="absolute -right-1/4 bottom-0 h-full w-1/2 animate-drift-slower bg-sky-glow/20 blur-3xl" />
        </div>
        <div className="relative flex flex-col items-center gap-3 px-6 text-center text-white">
          <MapPinned size={32} aria-hidden="true" />
          <h3 className="text-lg font-semibold">{t("map.placeholderTitle")}</h3>
          <p className="max-w-md text-sm text-white/70">{t("map.placeholderBody")}</p>
        </div>
      </div>
    </section>
  );
}
