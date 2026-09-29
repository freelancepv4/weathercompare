import Link from "next/link";
import type { CountrySeed, CitySeed } from "@/config/countries";

const REGION_ALIASES: Record<string, string> = { "Community of Madrid": "Madrid", "Valencian Community": "Valencia" };
/** Spain's autonomous communities in Spanish (Spain is the site's main market). */
const ES_REGIONS: Record<string, string> = {
  Andalusia: "Andalucía", Aragon: "Aragón", Asturias: "Asturias", "Balearic Islands": "Islas Baleares", "Basque Country": "País Vasco",
  "Canary Islands": "Canarias", Cantabria: "Cantabria", "Castille and León": "Castilla y León", "Castille-La Mancha": "Castilla-La Mancha",
  Catalonia: "Cataluña", Extremadura: "Extremadura", Galicia: "Galicia", "La Rioja": "La Rioja", Madrid: "Comunidad de Madrid",
  Murcia: "Región de Murcia", Navarre: "Navarra", Valencia: "Comunidad Valenciana", Ceuta: "Ceuta", Melilla: "Melilla",
};

function regionLabel(countrySlug: string, region: string | undefined, locale: string): string {
  let r = (region ?? "").replace(/\s*\(.*\)\s*$/, "").trim();
  r = REGION_ALIASES[r] ?? r;
  if (countrySlug === "spain" && locale === "es") return ES_REGIONS[r] ?? r;
  return r;
}

/**
 * Every city of a country as a compact A–Z list grouped by region (state,
 * province, autonomous community…). Country pages show cards for the main
 * cities and this list for the rest, so all 1,800+ city pages stay one click
 * from their country page without a wall of cards.
 */
export function AllCitiesList({
  country,
  title,
  subtitle,
  hrefFor,
  nameFor = (c) => c.name,
  exclude = [],
  otherLabel = "Other",
  collator = "en",
}: {
  country: CountrySeed;
  title: string;
  subtitle?: string;
  hrefFor: (city: CitySeed) => string;
  nameFor?: (city: CitySeed) => string;
  /** Slugs already shown elsewhere on the page (e.g. as cards). */
  exclude?: string[];
  otherLabel?: string;
  collator?: string;
}) {
  const skip = new Set(exclude);
  const cities = country.cities.filter((c) => !skip.has(c.slug));
  if (cities.length === 0) return null;
  const cmp = new Intl.Collator(collator).compare;
  const groups = new Map<string, CitySeed[]>();
  for (const c of cities) {
    const key = regionLabel(country.slug, c.region, collator) || otherLabel;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(c);
  }
  const sorted = [...groups.entries()].sort((a, b) => cmp(a[0], b[0]));
  const grouped = sorted.length > 1 && cities.length > 12;

  return (
    <section className="mt-12" aria-labelledby={`all-cities-${country.slug}`}>
      <h2 id={`all-cities-${country.slug}`} className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      {grouped ? (
        <div className="mt-5 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {sorted.map(([region, list]) => (
            <div key={region} className="mb-5 break-inside-avoid">
              <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{region}</h3>
              <ul className="space-y-1">
                {list
                  .map((c) => ({ c, n: nameFor(c) }))
                  .sort((a, b) => cmp(a.n, b.n))
                  .map(({ c, n }) => (
                    <li key={c.slug}>
                      <Link href={hrefFor(c)} className="text-sm text-brand-700 hover:underline dark:text-brand-300">
                        {n}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {cities
            .map((c) => ({ c, n: nameFor(c) }))
            .sort((a, b) => cmp(a.n, b.n))
            .map(({ c, n }) => (
              <li key={c.slug}>
                <Link
                  href={hrefFor(c)}
                  className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
                >
                  {n}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
