"use client";
import Link from "next/link";

import { Thermometer, CloudRain, Wind, Cloud, Satellite } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { usePreferences } from "@/lib/hooks/usePreferences";
import type { GeoLocation, CurrentConditions } from "@/types/weather";
import type { MapLayerKey } from "./WeatherMapLeaflet";

const LAYERS = [
  { key: "temperature", icon: Thermometer },
  { key: "precipitation", icon: CloudRain },
  { key: "wind", icon: Wind },
  { key: "clouds", icon: Cloud },
  { key: "satellite", icon: Satellite },
] as const;

// Leaflet touches `window` on import, so it must never run during SSR/static
// generation — dynamic-import it client-only, same as the rest of this app's
// static/ISR city pages, so nothing here breaks pre-rendering.
const LeafletMap = dynamic(() => import("./WeatherMapLeaflet").then((m) => m.WeatherMapLeaflet), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400 dark:bg-white/5">
      Loading map…
    </div>
  ),
});

const OWM_MAP_KEY = process.env.NEXT_PUBLIC_OWM_MAP_KEY;

export function WeatherMap({ location, current }: { location: GeoLocation; current?: CurrentConditions }) {
  const t = useTranslations();
  const { temperatureUnit } = usePreferences();
  const [layer, setLayer] = useState<MapLayerKey>("temperature");
  const overlayAvailable = Boolean(OWM_MAP_KEY);

  return (
    <section id="map" aria-labelledby="map-heading" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="map-heading" className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
          {t("map.title")}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {LAYERS.map((l) => {
            const disabled = l.key !== "satellite" && !overlayAvailable;
            return (
              <button
                key={l.key}
                type="button"
                onClick={() => setLayer(l.key)}
                disabled={disabled}
                aria-pressed={layer === l.key}
                title={disabled ? "Live overlay not configured for this deployment" : undefined}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  layer === l.key
                    ? "bg-brand-600 text-white"
                    : disabled
                      ? "cursor-not-allowed bg-slate-50 text-slate-300 dark:bg-white/5 dark:text-slate-600"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                }`}
              >
                <l.icon size={13} aria-hidden="true" />
                {t(`map.${l.key}`)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative h-80 overflow-hidden rounded-xl3 border border-slate-200 dark:border-white/10 sm:h-96">
        <LeafletMap location={location} layer={layer} mapKey={OWM_MAP_KEY} current={current} temperatureUnit={temperatureUnit} />
      </div>

      {!overlayAvailable && (
        <p className="mt-2 text-xs text-slate-400">
          Showing location only. Live temperature/precipitation/wind/cloud overlays require{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-white/10">NEXT_PUBLIC_OWM_MAP_KEY</code> — see{" "}
          <Link href="/data-sources" className="underline hover:text-slate-600 dark:hover:text-slate-300">
            Data Sources
          </Link>
          .
        </p>
      )}
    </section>
  );
}
