"use client";

import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { popularCities } from "@/config/countries";

export function Hero() {
  const t = useTranslations();
  const popular = popularCities(8);

  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-1/3 top-0 h-full w-2/3 animate-drift-slow bg-white/5 blur-3xl" />
        <div className="absolute -right-1/3 bottom-0 h-full w-2/3 animate-drift-slower bg-sky-glow/10 blur-3xl" />
      </div>

      <div className="container-page relative py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm">
            Italy · Germany · France · Spain · UK · Europe
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl animate-fade-up">
            {t("hero.headline")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg">{t("hero.subheadline")}</p>
        </div>

        <div className="mx-auto mt-9 max-w-xl">
          <SearchBar size="lg" />
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-white/50">
            {t("hero.popularLocations")}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {popular.map(({ country, city }) => (
              <Link
                key={city.slug}
                href={`/weather/${country.slug}/${city.slug}`}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
