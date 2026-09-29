"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, LocateFixed, Loader2 } from "lucide-react";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { useFavorites } from "@/lib/hooks/useFavorites";
import type { GeoLocation } from "@/types/weather";
import { countries } from "@/config/countries";
import { paths } from "@/lib/i18n/routing";

interface SearchBarProps {
  size?: "lg" | "md";
  autoFocus?: boolean;
  /**
   * The desktop header's search slot (see Header.tsx) is only ~190px wide
   * in practice — too narrow to fit the input AND the "Use my location"
   * button with its text label without the two overlapping. `compact`
   * drops the label there (icon-only button, with a title/aria-label so
   * it's still identifiable) and tightens the input's own padding. The
   * hero and mobile-menu search bars have plenty of room and don't use it.
   */
  compact?: boolean;
}

/**
 * Location search input. Keyboard-friendly (arrow keys + enter), with an
 * autocomplete-ready structure backed by /api/geocode. Falls back to the
 * bundled city seed list instantly while that request is in flight.
 */
export function SearchBar({ size = "md", autoFocus = false, compact = false }: SearchBarProps) {
  const t = useTranslations();
  const { locale } = useI18n();
  const router = useRouter();
  const { addRecentSearch } = useFavorites();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}&locale=${locale}`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = (await res.json()) as GeoLocation[];
        setResults(data);
        setOpen(true);
        setActiveIndex(-1);
      } catch {
        // aborted or network error — ignore, keep previous results
      }
    }, 180);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, locale]);

  function slugify(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // strip accents (é -> e, etc.)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "location";
  }

  function goToLocation(loc: GeoLocation) {
    if (loc.page) {
      // One of our 1,800+ city pages (core or world list).
      addRecentSearch({ id: loc.id, name: loc.name, country: loc.country, countrySlug: loc.page.country, citySlug: loc.page.city });
      setOpen(false);
      setQuery("");
      router.push(paths.city(locale, loc.page.country, loc.page.city));
      return;
    }
    const seedCountry = countries.find((c) => c.isoCode === loc.countryCode);
    const countrySlug = seedCountry?.slug ?? slugify(loc.countryCode || loc.country);
    const isSeedCity = seedCountry?.cities.some((c) => `${seedCountry.slug}-${c.slug}` === loc.id);
    const citySlug = isSeedCity ? loc.id.split("-").slice(1).join("-") : slugify(loc.name);

    addRecentSearch({ id: loc.id, name: loc.name, country: loc.country, countrySlug, citySlug });
    setOpen(false);
    setQuery("");

    if (isSeedCity) {
      // Pre-built page — fast static route, no query params needed.
      router.push(`/weather/${countrySlug}/${citySlug}`);
    } else {
      // Not one of the pre-built cities: hand its coordinates to the
      // dedicated dynamic search-result page instead of a static route.
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex] ?? results[0];
      if (target) goToLocation(target);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function useMyLocation() {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError(t("hero.locationDenied"));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`/api/geocode?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&locale=${locale}`);
          const data = (await res.json()) as GeoLocation[];
          if (data[0]) goToLocation(data[0]);
          else setLocationError(t("hero.locationDenied"));
        } catch {
          setLocationError(t("hero.locationDenied"));
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setLocationError(t("hero.locationDenied"));
      },
      { timeout: 8000 }
    );
  }

  const inputSize =
    size === "lg" ? "py-4 pl-13 pr-4 text-base sm:text-lg" : `py-3 pl-11 text-sm ${compact ? "pr-1" : "pr-3"}`;

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`relative flex items-center rounded-2xl border border-slate-200 bg-white shadow-soft transition-shadow focus-within:shadow-soft-lg focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-sky-300/40 dark:border-white/10 dark:bg-surface-dark-subtle ${
          size === "lg" ? "shadow-soft-lg" : ""
        }`}
      >
        <Search
          className="pointer-events-none absolute left-4 text-slate-400"
          size={size === "lg" ? 22 : 18}
          aria-hidden="true"
        />
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-results-listbox"
          aria-autocomplete="list"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("hero.searchPlaceholder")}
          className={`search-input w-full rounded-2xl bg-transparent text-slate-900 placeholder:text-slate-400 outline-none dark:text-white ${inputSize}`}
          style={{ paddingLeft: size === "lg" ? "3.25rem" : "2.75rem" }}
        />
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          title={compact ? t("hero.useMyLocation") : undefined}
          aria-label={compact ? t("hero.useMyLocation") : undefined}
          className={`mr-2 flex shrink-0 items-center gap-1.5 rounded-xl text-xs font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-60 dark:text-brand-300 dark:hover:bg-white/5 sm:text-sm ${
            compact ? "p-2" : "px-3 py-2"
          }`}
        >
          {locating ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <LocateFixed size={16} aria-hidden="true" />}
          <span className={compact ? "hidden" : "hidden sm:inline"}>{t("hero.useMyLocation")}</span>
        </button>
      </div>

      {locationError && <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{locationError}</p>}

      {open && (
        <ul
          id="search-results-listbox"
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{t("search.noResults")}</li>
          ) : (
            results.map((loc, i) => (
              <li key={loc.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={activeIndex === i}
                  onClick={() => goToLocation(loc)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    activeIndex === i ? "bg-brand-50 dark:bg-white/5" : ""
                  }`}
                >
                  <MapPin size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
                  <span>
                    <span className="block font-medium text-slate-900 dark:text-white">{loc.name}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {loc.region}, {loc.country}
                    </span>
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
