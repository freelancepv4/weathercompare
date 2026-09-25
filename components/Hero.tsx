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

      <div className="container-page relative py-9 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] animate-fade-up">
            {t("hero.headline")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/75 sm:text-base">{t("hero.subheadline")}</p>
        </div>

        <div className="mx-auto mt-6 max-w-xl">
          <SearchBar size="lg" />
        </div>

        <div className="mx-auto mt-5 max-w-3xl">
          <p className="mb-2 hidden text-center text-xs font-semibold uppercase tracking-wide text-white/50 sm:block">
            {t("hero.popularLocations")}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {popular.map(({ country, city }, i) => (
              <Link
                key={city.slug}
                href={`/weather/${country.slug}/${city.slug}`}
                className={`${i >= 6 ? "hidden sm:inline-block " : ""}rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-sm font-medium text-white/85 backdrop-blur-sm transition-colors hover:bg-white/15`}
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
