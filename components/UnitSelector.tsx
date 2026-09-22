"use client";

import { useState, useRef, useEffect } from "react";
import { Ruler } from "lucide-react";
import { usePreferences } from "@/lib/hooks/usePreferences";
import { useTranslations } from "@/lib/i18n/I18nProvider";

export function UnitSelector() {
  const t = useTranslations();
  const { temperatureUnit, setTemperatureUnit, windUnit, setWindUnit, precipitationUnit, setPrecipitationUnit } =
    usePreferences();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
        title={t("units.title")}
      >
        <Ruler size={17} aria-hidden="true" />
        <span>{temperatureUnit === "celsius" ? "°C" : "°F"}</span>
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-64 rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle">
          <UnitRow
            label={t("units.temperature")}
            options={[
              { value: "celsius", label: "°C" },
              { value: "fahrenheit", label: "°F" },
            ]}
            value={temperatureUnit}
            onChange={(v) => setTemperatureUnit(v as typeof temperatureUnit)}
          />
          <UnitRow
            label={t("units.windSpeed")}
            options={[
              { value: "kmh", label: "km/h" },
              { value: "mph", label: "mph" },
              { value: "ms", label: "m/s" },
            ]}
            value={windUnit}
            onChange={(v) => setWindUnit(v as typeof windUnit)}
          />
          <UnitRow
            label={t("units.precipitation")}
            options={[
              { value: "mm", label: "mm" },
              { value: "in", label: "in" },
            ]}
            value={precipitationUnit}
            onChange={(v) => setPrecipitationUnit(v as typeof precipitationUnit)}
            last
          />
        </div>
      )}
    </div>
  );
}

function UnitRow({
  label,
  options,
  value,
  onChange,
  last,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-3.5"}>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="grid grid-cols-3 gap-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
            className={`rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
              value === opt.value
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
