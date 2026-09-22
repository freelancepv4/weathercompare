"use client";

import { Heart } from "lucide-react";
import { useFavorites, type SavedLocation } from "@/lib/hooks/useFavorites";
import { useTranslations } from "@/lib/i18n/I18nProvider";

export function FavoriteButton({ location, className }: { location: SavedLocation; className?: string }) {
  const t = useTranslations();
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(location.id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(location)}
      aria-pressed={active}
      aria-label={active ? t("dashboard.removeFavorite") : t("dashboard.addFavorite")}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
        active
          ? "bg-rose-500/15 text-rose-500"
          : "bg-white/15 text-white hover:bg-white/25 dark:bg-white/10 dark:text-white"
      } ${className ?? ""}`}
    >
      <Heart size={18} fill={active ? "currentColor" : "none"} aria-hidden="true" />
    </button>
  );
}
