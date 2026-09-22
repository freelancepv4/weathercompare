"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Client-side, localStorage-backed user preferences: units and theme.
 * Deliberately framework-light (no external state library) since the
 * surface area is small; swap the storage layer for an API-backed one
 * later without touching consuming components (same hook signatures).
 */

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "mph" | "ms";
export type PrecipitationUnit = "mm" | "in";
export type ThemeMode = "light" | "dark" | "system";

interface Preferences {
  temperatureUnit: TemperatureUnit;
  windUnit: WindUnit;
  precipitationUnit: PrecipitationUnit;
  theme: ThemeMode;
}

const DEFAULTS: Preferences = {
  temperatureUnit: "celsius",
  windUnit: "kmh",
  precipitationUnit: "mm",
  theme: "system",
};

const STORAGE_KEY = "wc_preferences";

interface PreferencesContextValue extends Preferences {
  setTemperatureUnit: (u: TemperatureUnit) => void;
  setWindUnit: (u: WindUnit) => void;
  setPrecipitationUnit: (u: PrecipitationUnit) => void;
  setTheme: (t: ThemeMode) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function loadStored(): Preferences {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function applyThemeClass(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", Boolean(dark));
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULTS);

  useEffect(() => {
    const stored = loadStored();
    setPrefs(stored);
    applyThemeClass(stored.theme);
  }, []);

  const persist = useCallback((next: Preferences) => {
    setPrefs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    applyThemeClass(next.theme);
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      ...prefs,
      setTemperatureUnit: (u) => persist({ ...prefs, temperatureUnit: u }),
      setWindUnit: (u) => persist({ ...prefs, windUnit: u }),
      setPrecipitationUnit: (u) => persist({ ...prefs, precipitationUnit: u }),
      setTheme: (t) => persist({ ...prefs, theme: t }),
    }),
    [prefs, persist]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
