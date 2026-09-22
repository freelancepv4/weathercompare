"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/lib/i18n/I18nProvider";

/**
 * GDPR-oriented cookie consent banner.
 *
 * - No pre-ticked non-essential categories (no deceptive design).
 * - Analytics/advertising stay off until explicitly accepted.
 * - Choice is stored locally and re-readable by lib/analytics.ts before any
 *   analytics script loads.
 */

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  preferences: boolean;
}

const STORAGE_KEY = "wc_cookie_consent";

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("wc-consent-updated", { detail: state }));
  } catch {
    // ignore
  }
}

export function CookieConsent() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    advertising: false,
    preferences: true,
  });

  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  function acceptAll() {
    const state: ConsentState = { necessary: true, analytics: true, advertising: true, preferences: true };
    saveConsent(state);
    setVisible(false);
  }

  function rejectNonEssential() {
    const state: ConsentState = { necessary: true, analytics: false, advertising: false, preferences: false };
    saveConsent(state);
    setVisible(false);
  }

  function savePreferences() {
    saveConsent(draft);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("cookieConsent.title")}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white/95 backdrop-blur-xl shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle/95"
    >
      <div className="container-page py-5">
        {!manageOpen ? (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{t("cookieConsent.title")}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("cookieConsent.body")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setManageOpen(true)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
              >
                {t("cookieConsent.managePreferences")}
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
              >
                {t("cookieConsent.rejectNonEssential")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow-brand hover:bg-brand-700"
              >
                {t("cookieConsent.acceptAll")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{t("cookieConsent.managePreferences")}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ConsentToggle label={t("cookieConsent.necessary")} desc={t("cookieConsent.necessaryDesc")} checked disabled />
              <ConsentToggle
                label={t("cookieConsent.analytics")}
                desc={t("cookieConsent.analyticsDesc")}
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
              <ConsentToggle
                label={t("cookieConsent.advertising")}
                desc={t("cookieConsent.advertisingDesc")}
                checked={draft.advertising}
                onChange={(v) => setDraft((d) => ({ ...d, advertising: v }))}
              />
              <ConsentToggle
                label={t("cookieConsent.preferences")}
                desc={t("cookieConsent.preferencesDesc")}
                checked={draft.preferences}
                onChange={(v) => setDraft((d) => ({ ...d, preferences: v }))}
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setManageOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-white/15 dark:text-slate-200"
              >
                {t("nav.close")}
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                {t("cookieConsent.save")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConsentToggle({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className={`flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 dark:border-white/10 ${disabled ? "opacity-70" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
      />
      <span>
        <span className="block text-sm font-medium text-slate-800 dark:text-slate-100">{label}</span>
        <span className="block text-xs text-slate-500 dark:text-slate-400">{desc}</span>
      </span>
    </label>
  );
}
