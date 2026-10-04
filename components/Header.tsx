"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Search as SearchIcon, Heart, ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import { UnitSelector } from "./UnitSelector";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { NavDropdown } from "./NavDropdown";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { paths, type AnyLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { countries, worldHighlights } from "@/config/countries";
import { allGuides, CATEGORY_LABELS } from "@/lib/data/guides";

// "compare", "maps" and "alerts" are sections that live on a city page
// (see app/weather/[country]/[city]/page.tsx), not on the homepage — the
// homepage has no #compare/#map/#alerts anchors of its own. Point these at
// a real flagship city page (Rome) so they land somewhere meaningful
// instead of silently resolving to "/" like every other nav item.
const FLAGSHIP_CITY_PATH = "/weather/italy/rome";

// Plain-link nav items. "weather" and "guides" are handled separately below
// as dropdowns (desktop) / expandable sections (mobile) — see NAV_DROPDOWNS.
// Built per language: the daily page, trip finder and flagship city link to
// the visitor's language version when one exists.
const navItems = (l: AnyLocale) =>
  [
    { key: "weatherToday", href: paths.today(l) },
    { key: "weatherTomorrow", href: paths.tomorrow(l), wideOnly: true },
    { key: "tripFinder", href: paths.tripFinder(l) },
    { key: "compare", wideOnly: true, href: l === "en" ? `${FLAGSHIP_CITY_PATH}#compare` : `${paths.city(l, "italy", "rome")}#compare` },
    { key: "news", wideOnly: true, href: "/news" },
    { key: "favorites", wideOnly: true, href: "/favorites" },
  ] as Array<{ key: string; href: string; wideOnly?: boolean }>;

// A handful of well-known destinations across different countries, for the
// "Weather" dropdown's quick-links column — worldHighlights() already picks
// one representative city per country in seed order.
const WEATHER_QUICK_LINKS = worldHighlights(6);
// Countries shown in the dropdown's "browse by country" column — capped so
// the panel doesn't need to scroll; the mobile menu and "/" homepage both
// still surface the full list.
const WEATHER_COUNTRIES = countries.slice(0, 10);

const GUIDE_CATEGORIES: Array<keyof typeof CATEGORY_LABELS> = ["comparison", "packing", "seasonal", "ai-tools"];

export function Header() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const NAV_ITEMS = navItems(locale);
  const cityHref = (country: string, city: string) => paths.city(locale, country, city);
  const cn = (slug: string, name: string) => cityName(slug, name, locale);
  const kn = (slug: string, name: string) => countryName(slug, name, locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileWeatherOpen, setMobileWeatherOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);

  // Close the search panel after a result is picked (the route changes).
  useEffect(() => {
    setMobileSearchOpen(false);
  }, [pathname]);

  // /embed/* pages are meant to be pasted into OTHER sites as a small
  // widget (see app/embed/[country]/[city]/page.tsx) — the full site nav
  // has no place inside someone else's page.
  if (pathname?.startsWith("/embed")) return null;

  return (
    <header className="sticky top-0 z-50 glass-surface">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo href={paths.home(locale)} />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          <NavDropdown label={t("nav.weather")} panelClassName="w-[30rem]">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t("nav.popularCities")}
                </p>
                <ul className="space-y-0.5">
                  {WEATHER_QUICK_LINKS.map(({ country, city }) => (
                    <li key={`${country.slug}:${city.slug}`}>
                      <Link
                        href={cityHref(country.slug, city.slug)}
                        className="block rounded-lg px-2.5 py-1.5 text-sm text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-white/5"
                      >
                        {cn(city.slug, city.name)} <span className="text-slate-400">· {kn(country.slug, country.name)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t("nav.browseByCountry")}
                </p>
                <ul className="space-y-0.5">
                  {WEATHER_COUNTRIES.map((country) => (
                    <li key={country.slug}>
                      <Link
                        href={paths.country(locale, country.slug)}
                        className="block rounded-lg px-2.5 py-1.5 text-sm text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-white/5"
                      >
                        {kn(country.slug, country.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 border-t border-slate-100 pt-3 dark:border-white/10">
                <Link
                  href={paths.home(locale)}
                  className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline dark:text-brand-300"
                >
                  {t("nav.allDestinations")}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </NavDropdown>

          <NavDropdown label={t("nav.guides")} panelClassName="w-72">
            <Link
              href="/guides/best-time-to-visit"
              className="mb-2 block rounded-lg bg-brand-50 px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-200 dark:hover:bg-brand-500/20"
            >
              {t("nav.bestTimeToVisit")}
            </Link>
            <ul className="space-y-0.5">
              {GUIDE_CATEGORIES.flatMap((category) =>
                allGuides()
                  .filter((g) => g.category === category)
                  .map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={`/guides/${guide.slug}`}
                        className="block rounded-lg px-2.5 py-1.5 text-sm text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-white/5"
                      >
                        <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          {CATEGORY_LABELS[category]}
                        </span>
                        {guide.title}
                      </Link>
                    </li>
                  ))
              )}
            </ul>
            <div className="mt-3 border-t border-slate-100 pt-3 dark:border-white/10">
              <Link
                href="/guides"
                className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline dark:text-brand-300"
              >
                {t("nav.browseAllGuides")}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </NavDropdown>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              // Longer translated labels (e.g. Polish, German) would overflow the
              // bar at laptop widths — secondary items only show on wide screens.
              className={`${item.wideOnly ? "hidden 2xl:block " : ""}whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white`}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((o) => !o)}
            // Phones/tablets: a plain icon. Desktop: a wide "search" pill that
            // opens a full-width search panel under the header, so the input
            // is never squeezed between the nav links.
            className="flex items-center gap-2 rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 xl:mr-1 xl:w-52 xl:rounded-full xl:border xl:border-slate-200 xl:bg-white xl:px-4 xl:py-2 xl:text-sm xl:text-slate-500 xl:shadow-soft xl:hover:border-brand-300 xl:hover:bg-white dark:xl:border-white/10 dark:xl:bg-surface-dark-subtle 2xl:w-64"
            aria-label={t("hero.searchPlaceholder")}
            aria-expanded={mobileSearchOpen}
          >
            <SearchIcon size={18} aria-hidden="true" className="shrink-0 xl:text-brand-600 dark:xl:text-brand-300" />
            <span className="hidden truncate xl:inline">{t("hero.searchPlaceholder")}</span>
          </button>
          <Link
            href="/favorites"
            className="hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:block 2xl:hidden"
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
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 xl:hidden"
            aria-label={mobileOpen ? t("nav.close") : t("nav.menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div
          className="border-t border-slate-200 bg-white/95 px-5 py-3 dark:border-white/10 dark:bg-surface-dark/95 xl:py-5"
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileSearchOpen(false);
          }}
        >
          <div className="mx-auto max-w-2xl">
            <SearchBar size="lg" autoFocus />
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-surface-dark-subtle xl:hidden">
          <nav className="mb-4 flex flex-col gap-1" aria-label="Mobile primary">
            <div>
              <button
                type="button"
                onClick={() => setMobileWeatherOpen((o) => !o)}
                aria-expanded={mobileWeatherOpen}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
              >
                {t("nav.weather")}
                <ChevronDown size={17} className={`transition-transform ${mobileWeatherOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {mobileWeatherOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-slate-100 pl-3 dark:border-white/10">
                  {WEATHER_QUICK_LINKS.map(({ country, city }) => (
                    <Link
                      key={`${country.slug}:${city.slug}`}
                      href={cityHref(country.slug, city.slug)}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                    >
                      {cn(city.slug, city.name)} <span className="text-slate-400">· {kn(country.slug, country.name)}</span>
                    </Link>
                  ))}
                  <Link
                    href={paths.home(locale)}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2.5 py-2 text-sm font-medium text-brand-600 dark:text-brand-300"
                  >
                    {t("nav.allDestinations")}
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setMobileGuidesOpen((o) => !o)}
                aria-expanded={mobileGuidesOpen}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
              >
                {t("nav.guides")}
                <ChevronDown size={17} className={`transition-transform ${mobileGuidesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {mobileGuidesOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-slate-100 pl-3 dark:border-white/10">
                  <Link
                    href="/guides/best-time-to-visit"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                  >
                    {t("nav.bestTimeToVisit")}
                  </Link>
                  {allGuides().map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                    >
                      {guide.title}
                    </Link>
                  ))}
                  <Link
                    href="/guides"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2.5 py-2 text-sm font-medium text-brand-600 dark:text-brand-300"
                  >
                    {t("nav.browseAllGuides")}
                  </Link>
                </div>
              )}
            </div>

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
