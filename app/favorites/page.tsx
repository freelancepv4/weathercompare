"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { EmptyState } from "@/components/EmptyState";

export default function FavoritesPage() {
  const t = useTranslations();
  const { favorites, toggleFavorite, recentSearches, clearRecentSearches } = useFavorites();

  return (
    <div className="container-page py-8 sm:py-10">
      <header className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-rose-500 via-fuchsia-600 to-indigo-700 px-6 py-8 text-white sm:px-10">
        <Heart size={120} className="pointer-events-none absolute -bottom-6 -right-4 text-white/10" aria-hidden="true" />
        <h1 className="relative text-3xl font-bold sm:text-4xl">{t("favorites.title")}</h1>
      </header>

      <div className="mt-6">
        {favorites.length === 0 ? (
          <EmptyState message={`${t("favorites.empty")} ${t("favorites.emptyHint")}`} />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between rounded-xl2 border border-slate-200 bg-white px-4 py-3.5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle"
              >
                <Link href={`/weather/${f.countrySlug}/${f.citySlug}`} className="flex items-center gap-2.5">
                  <Heart size={16} className="text-rose-500" fill="currentColor" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">{f.name}</span>
                    <span className="block text-xs text-slate-400">{f.country}</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleFavorite(f)}
                  aria-label={t("dashboard.removeFavorite")}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-500 dark:hover:bg-white/10"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {recentSearches.length > 0 && (
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t("search.recentSearches")}</h2>
            <button type="button" onClick={clearRecentSearches} className="text-sm font-medium text-slate-400 hover:text-rose-500">
              {t("search.clearHistory")}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((r) => (
              <Link
                key={r.id}
                href={`/weather/${r.countrySlug}/${r.citySlug}`}
                className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 hover:border-brand-400 hover:text-brand-700 dark:border-white/10 dark:text-slate-300"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
