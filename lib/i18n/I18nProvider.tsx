"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { siteConfig, type Locale } from "@/config/site";
import { localeFromPath } from "./routing";
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
  // Always start from initialLocale (the same value the server rendered),
  // never from localStorage here — a useState initializer runs during the
  // client's first hydration pass too, not just in the browser afterwards,
  // so reading a saved locale straight into it made the client's first
  // render disagree with the server-rendered HTML whenever a returning
  // visitor had a non-default locale saved. That's a real hydration
  // mismatch (React errors #418/#423/#425 in the console on every page),
  // which makes React throw away the server-rendered markup and re-render
  // the whole tree from scratch on load. The saved/detected locale is
  // applied after mount instead, in the effect below, which is safe.
  // Translated pages live under /it, /de, … — on those, the URL decides the
  // language (so the server-rendered HTML and the UI always match, and a
  // saved preference can never show German menus on an Italian page).
  const pathname = usePathname();
  const pathLocale = localeFromPath(pathname);
  const lockedByPath = pathLocale !== "en";
  const [chosen, setLocaleState] = useState<Locale>(lockedByPath ? (pathLocale as Locale) : initialLocale);
  const locale: Locale = lockedByPath ? (pathLocale as Locale) : chosen;

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      // localStorage unavailable (private mode, etc.) — locale just won't persist.
    }
  }, []);

  // After hydration: apply a previously-saved locale, or — for a first-ever
  // visit with nothing saved yet — the visitor's browser language. Runs
  // once, post-mount, so it can never disagree with the server-rendered
  // markup; it just swaps in before the visitor has had time to read
  // anything.
  useEffect(() => {
    if (lockedByPath) return;
    const stored = readStoredLocale();
    if (stored) {
      if (stored !== locale) setLocaleState(stored);
      return;
    }
    const detected = detectBrowserLocale();
    if (detected && detected !== locale) setLocale(detected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = locale;
    } catch {}
  }, [locale]);

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
