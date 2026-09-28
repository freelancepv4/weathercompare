"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LocateFixed, X } from "lucide-react";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { readConsent } from "@/components/CookieConsent";
import { countries } from "@/config/countries";
import { paths } from "@/lib/i18n/routing";
import type { GeoLocation } from "@/types/weather";

const STORAGE_KEY = "wc_locate_prompt";
/** Ask again at most once a week after "Not now". */
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

function snoozed(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { at, done } = JSON.parse(raw) as { at: number; done?: boolean };
    return Boolean(done) || Date.now() - at < SNOOZE_MS;
  } catch {
    return false;
  }
}

/** Nearest of our own cities within `maxKm`, so nearby visitors land on the full city page. */
function nearestSeedCity(lat: number, lon: number, maxKm = 30) {
  const rad = (d: number) => (d * Math.PI) / 180;
  let best: { country: string; city: string; km: number } | null = null;
  for (const co of countries) {
    for (const ci of co.cities) {
      const dLat = rad(ci.lat - lat);
      const dLon = rad(ci.lon - lon);
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat)) * Math.cos(rad(ci.lat)) * Math.sin(dLon / 2) ** 2;
      const km = 6371 * 2 * Math.asin(Math.sqrt(a));
      if (km <= maxKm && (!best || km < best.km)) best = { country: co.slug, city: ci.slug, km };
    }
  }
  return best;
}

function remember(done: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), done }));
  } catch {
    /* storage unavailable (private mode) — the prompt may show again, which is fine */
  }
}

/**
 * First-visit card offering to show the weather for the visitor's location.
 *
 * The browser's own permission prompt only opens when the visitor taps
 * "Show my weather": asking on page load is blocked or hidden by browsers
 * (and flagged by Lighthouse), and people accept far more often when they
 * know why. It waits until the cookie banner has been answered so two
 * popups never stack, never shows inside embeds, and remembers the answer.
 */
export function LocationPrompt() {
  const t = useTranslations();
  const { locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pathname?.startsWith("/embed") || pathname?.startsWith("/weather/search")) return;
    if (typeof navigator === "undefined" || !navigator.geolocation || snoozed()) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function maybeShow() {
      // Don't offer if the visitor has already blocked location for this site.
      try {
        const status = await navigator.permissions?.query({ name: "geolocation" as PermissionName });
        if (status?.state === "denied") return;
      } catch {
        /* Permissions API not available (older Safari) — just offer */
      }
      if (!cancelled) setVisible(true);
    }

    // Wait for the cookie banner to be answered, then show after a short pause.
    const poll = setInterval(() => {
      if (readConsent()) {
        clearInterval(poll);
        timer = setTimeout(maybeShow, 1500);
      }
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(poll);
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  if (!visible) return null;

  function dismiss() {
    remember(false);
    setVisible(false);
  }

  function open(loc: GeoLocation) {
    const seedCountry = countries.find((c) => c.isoCode === loc.countryCode);
    const seedCity = seedCountry?.cities.find((c) => `${seedCountry.slug}-${c.slug}` === loc.id);
    if (seedCountry && seedCity) {
      router.push(paths.city(locale, seedCountry.slug, seedCity.slug));
    } else {
      const qs = new URLSearchParams({
        lat: String(loc.lat),
        lon: String(loc.lon),
        name: loc.name,
        region: loc.region,
        country: loc.country,
        countryCode: loc.countryCode,
      });
      router.push(`/weather/search?${qs.toString()}`);
    }
  }

  function locate() {
    setBusy(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const near = nearestSeedCity(pos.coords.latitude, pos.coords.longitude);
        if (near) {
          remember(true);
          setVisible(false);
          setBusy(false);
          router.push(paths.city(locale, near.country, near.city));
          return;
        }
        try {
          const res = await fetch(`/api/geocode?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&locale=${locale}`);
          const data = (await res.json()) as GeoLocation[];
          if (!data[0]) throw new Error("no match");
          remember(true);
          setVisible(false);
          open(data[0]);
        } catch {
          setError(t("locate.denied"));
        } finally {
          setBusy(false);
        }
      },
      () => {
        setBusy(false);
        remember(true);
        setError(t("locate.denied"));
      },
      { timeout: 10000, maximumAge: 30 * 60 * 1000 }
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="locate-title"
      className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-sm rounded-xl3 border border-slate-200 bg-white p-4 shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle sm:inset-x-auto sm:left-4 sm:bottom-4"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("locate.later")}
        className="absolute right-2 top-2 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
      >
        <X size={16} aria-hidden="true" />
      </button>
      <div className="flex items-start gap-3 pr-6">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
          <LocateFixed size={18} aria-hidden="true" />
        </span>
        <div>
          <h2 id="locate-title" className="text-sm font-semibold text-slate-900 dark:text-white">
            {t("locate.title")}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{error ?? t("locate.text")}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={locate}
          disabled={busy}
          className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-70"
        >
          {busy ? t("locate.finding") : t("locate.allow")}
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
        >
          {t("locate.later")}
        </button>
      </div>
    </div>
  );
}
