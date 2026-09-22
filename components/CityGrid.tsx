import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { CountrySeed, CitySeed } from "@/config/countries";

export function CityGrid({ title, items }: { title: string; items: Array<{ country: CountrySeed; city: CitySeed }> }) {
  return (
    <section aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-heading`}>
      <h2 id={`${title.replace(/\s+/g, "-").toLowerCase()}-heading`} className="mb-5 text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map(({ country, city }) => (
          <Link
            key={`${country.slug}-${city.slug}`}
            href={`/weather/${country.slug}/${city.slug}`}
            className="group flex items-center justify-between rounded-xl2 border border-slate-200 bg-white px-4 py-3.5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
          >
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-brand-500" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">{city.name}</span>
                <span className="block text-xs text-slate-400">{country.name}</span>
              </span>
            </span>
            <ArrowRight size={15} className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
