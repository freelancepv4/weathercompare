"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Favorites + recent searches, backed by localStorage.
 *
 * Structured so a future "accounts" feature can swap this provider for one
 * backed by an API without changing any consuming component — they only
 * ever call toggleFavorite/isFavorite/addRecentSearch etc.
 */

export interface SavedLocation {
  id: string;
  name: string;
  country: string;
  countrySlug?: string;
  citySlug?: string;
}

interface FavoritesContextValue {
  favorites: SavedLocation[];
  toggleFavorite: (loc: SavedLocation) => void;
  isFavorite: (id: string) => boolean;
  recentSearches: SavedLocation[];
  addRecentSearch: (loc: SavedLocation) => void;
  clearRecentSearches: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const FAVORITES_KEY = "wc_favorites";
const RECENTS_KEY = "wc_recent_searches";

function readList(key: string): SavedLocation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: SavedLocation[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<SavedLocation[]>([]);
  const [recentSearches, setRecentSearches] = useState<SavedLocation[]>([]);

  useEffect(() => {
    setFavorites(readList(FAVORITES_KEY));
    setRecentSearches(readList(RECENTS_KEY));
  }, []);

  const toggleFavorite = useCallback((loc: SavedLocation) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === loc.id);
      const next = exists ? prev.filter((f) => f.id !== loc.id) : [loc, ...prev].slice(0, 30);
      writeList(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.some((f) => f.id === id), [favorites]);

  const addRecentSearch = useCallback((loc: SavedLocation) => {
    setRecentSearches((prev) => {
      const next = [loc, ...prev.filter((r) => r.id !== loc.id)].slice(0, 8);
      writeList(RECENTS_KEY, next);
      return next;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    writeList(RECENTS_KEY, []);
  }, []);

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite, recentSearches, addRecentSearch, clearRecentSearches }),
    [favorites, toggleFavorite, isFavorite, recentSearches, addRecentSearch, clearRecentSearches]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
