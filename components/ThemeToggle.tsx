"use client";

import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { usePreferences, type ThemeMode } from "@/lib/hooks/usePreferences";
import { useTranslations } from "@/lib/i18n/I18nProvider";

const ICONS: Record<ThemeMode, typeof Sun> = { light: Sun, dark: Moon, system: Monitor };

export function ThemeToggle() {
  const t = useTranslations();
  const { theme, setTheme } = usePreferences();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[theme];

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
        className="flex items-center gap-1.5 rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
        title={t("theme.system")}
      >
        <Icon size={17} aria-hidden="true" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-40 mt-2 w-36 overflow-hidden rounded-xl2 border border-slate-200 bg-white py-1 shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
        >
          {(["light", "dark", "system"] as ThemeMode[]).map((mode) => {
            const ModeIcon = ICONS[mode];
            return (
              <li key={mode}>
                <button
                  type="button"
                  role="option"
                  aria-selected={theme === mode}
                  onClick={() => {
                    setTheme(mode);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3.5 py-2 text-sm text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  <ModeIcon size={15} aria-hidden="true" />
                  {t(`theme.${mode}`)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
