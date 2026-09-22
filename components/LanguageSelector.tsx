"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { siteConfig, localeNames, localeFlags, type Locale } from "@/config/site";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();
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
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
      >
        <Globe size={17} aria-hidden="true" />
        <span>{localeFlags[locale]}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-xl2 border border-slate-200 bg-white py-1 shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
        >
          {siteConfig.locales.map((code: Locale) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3.5 py-2 text-sm text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-white/5"
              >
                <span>
                  <span className="mr-2 font-semibold text-slate-400">{localeFlags[code]}</span>
                  {localeNames[code]}
                </span>
                {locale === code && <Check size={15} className="text-brand-600" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
