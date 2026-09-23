"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { siteConfig, type Locale } from "@/config/site";
import { dictionaries, type Dictionary } from "./dictionaries";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: Dictionary;
  t: (path: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "wc_locale";

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return (siteConfig.locales as readonly string[]).includes(value ?? "") ? (value as Locale) : null;
  } catch {
    return null;
  }
}

/**
 * Best-effort language guess for a visitor with no saved preference yet,
 * from the browser's own language setting (navigator.language — set by the
 * visitor's OS/browser, which correlates well with country without needing
 * any geo-IP lookup or server round trip). Returns null if it's unset or
 * not one of the site's supported languages, in which case the site
 * default is kept.
 */
function detectBrowserLocale(): Locale | null {
  if (typeof navigator === "undefined") return null;
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const short = candidate?.split("-")[0]?.toLowerCase();
    if (short && (siteConfig.locales as readonly string[]).includes(short)) {
      return short as Locale;
    }
  }
  return null;
}

function resolveByPath(dict: Dictionary, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

export function I18nProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale() ?? initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      // localStorage unavailable (private mode, etc.) — locale just won't persist.
    }
  }, []);

  // First-ever visit (no saved preference yet): switch to the visitor's
  // browser language once, client-side, after the default-locale HTML has
  // already hydrated — so there's no server/client mismatch, just one
  // instant swap before the visitor has had time to read anything. Any
  // explicit choice made after this (via the language switcher, which also
  // calls setLocale) is saved the same way and always takes precedence on
  // every later visit, since readStoredLocale() above already finds it.
  useEffect(() => {
    if (readStoredLocale()) return;
    const detected = detectBrowserLocale();
    if (detected && detected !== locale) setLocale(detected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dict = dictionaries[locale] ?? dictionaries.en;

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const value = resolveByPath(dict as unknown as Dictionary, path);
      let str = typeof value === "string" ? value : path;
      if (vars) {
        for (const [key, val] of Object.entries(vars)) {
          str = str.replace(`{${key}}`, String(val));
        }
      }
      return str;
    },
    [dict]
  );

  const value = useMemo(
    () => ({ locale, setLocale, dict: dict as unknown as Dictionary, t }),
    [locale, setLocale, dict, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useTranslations() {
  return useI18n().t;
}
