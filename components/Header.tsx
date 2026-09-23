"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search as SearchIcon, Heart } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import { UnitSelector } from "./UnitSelector";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { useTranslations } from "@/lib/i18n/I18nProvider";

// "compare", "maps" and "alerts" are sections that live on a city page
// (see app/weather/[country]/[city]/page.tsx), not on the homepage — the
// homepage has no #compare/#map/#alerts anchors of its own. Point these at
// a real flagship city page (Rome) so they land somewhere meaningful
// instead of silently resolving to "/" like every other nav item.
const FLAGSHIP_CITY_PATH = "/weather/italy/rome";

const NAV_ITEMS = [
  { key: "weather", href: "/" },
  { key: "compare", href: `${FLAGSHIP_CITY_PATH}#compare` },
  { key: "maps", href: `${FLAGSHIP_CITY_PATH}#map` },
  { key: "alerts", href: `${FLAGSHIP_CITY_PATH}#alerts` },
  { key: "news", href: "/news" },
  { key: "favorites", href: "/favorites" },
] as const;

export function Header() {
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-surface">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 max-w-xs xl:block">
          <SearchBar size="md" />
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 xl:hidden"
            aria-label={t("hero.searchPlaceholder")}
          >
            <SearchIcon size={18} aria-hidden="true" />
          </button>
          <Link
            href="/favorites"
            className="hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:block xl:hidden"
            aria-label={t("nav.favorites")}
          >
            <Heart size={18} aria-hidden="true" />
          </Link>
          <div className="hidden sm:flex sm:items-center sm:gap-1">
            <LanguageSelector />
            <UnitSelector />
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? t("nav.close") : t("nav.menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-slate-200 px-5 py-3 dark:border-white/10 xl:hidden">
          <SearchBar size="md" autoFocus />
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-surface-dark-subtle lg:hidden">
          <nav className="mb-4 flex flex-col gap-1" aria-label="Mobile primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-white/10">
            <LanguageSelector />
            <UnitSelector />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
