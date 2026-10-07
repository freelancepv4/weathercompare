/**
 * Country-level climate analysis for the "best time to visit {country}"
 * pages.
 *
 * Why this exists separately from lib/i18n/bestTime.ts: that module answers
 * "when should I go to Rome?" from one city's normals. A country is not one
 * climate. Averaging all 171 Spanish cities would produce a number that
 * describes nowhere — Tenerife and Burgos are not the same holiday. So this
 * module does two different things:
 *
 *  1. Headline figures come from a REPRESENTATIVE subset — the destinations
 *     travellers actually ask about (the `featured` flag, then population) —
 *     so "the best time to visit Spain" reflects Barcelona and Málaga rather
 *     than an unweighted mean of every town in the dataset.
 *  2. The spread is reported explicitly. For each month we measure how far
 *     apart the country's warmest and coolest cities are, and surface the
 *     month where that gap is widest. That single fact ("in January, Las
 *     Palmas averages 21°C while Burgos manages 8°C") is the honest answer
 *     to a country-level question, and it is different for every country —
 *     which is exactly what a page built from a template cannot fake.
 *
 * Everything here is derived from the 2011–2020 normals in lib/data; no
 * forecast data and no editorial input, so it is safe to render statically.
 */
import type { CitySeed, CountrySeed } from "@/config/world";
import { citiesByImportance } from "@/config/world";
import { getCityClimate } from "@/lib/data/climate";
import type { CityClimate } from "@/lib/data/months";
import { scoreMonth } from "@/lib/tripScore";

/** How many cities feed the country's headline averages. */
const REPRESENTATIVE_MAX = 8;
/** Below this many °C, the within-country spread is not worth a paragraph. */
const SPREAD_MIN_C = 4;

export type CountryVerdict = "ideal" | "good" | "hot" | "rainy" | "cold";

export interface CityWithClimate {
  city: CitySeed;
  climate: CityClimate;
}

export interface CountrySpread {
  /** Month where the country's cities differ most (0–11). */
  month: number;
  warm: { city: CitySeed; hi: number };
  cool: { city: CitySeed; hi: number };
  /** Rounded °C difference between those two. */
  gap: number;
}

export interface CountrySeason {
  /** Month indices, e.g. [11, 0, 1] for Dec–Feb. */
  months: number[];
  hi: number;
  lo: number;
  rain: number;
  verdict: CountryVerdict;
}

export interface CityBestMonths {
  city: CitySeed;
  best: number[];
  /** Average high across that city's best months. */
  hi: number;
  /** Average low across that city's best months. */
  lo: number;
}

export interface CountryClimateAnalysis {
  /** Cities behind the headline figures, most important first. */
  representative: CityWithClimate[];
  /** Every city in the country that has climate normals. */
  all: CityWithClimate[];
  /** Country-level monthly means, Jan..Dec, from `representative`. */
  tMax: number[];
  tMin: number[];
  precipMm: number[];
  cloud: number[];
  /** The three months that score best for warm/mild travel weather. */
  best: number[];
  /** Average high / low / rainfall across those best months. */
  bestHi: number;
  bestLo: number;
  bestRain: number;
  warmest: number;
  coolest: number;
  wettest: number;
  driest: number;
  sunniest: number;
  /** Months adjacent to the best ones — the quieter shoulder window. */
  shoulder: number[];
  /** Null when the country has too few cities, or they are all alike. */
  spread: CountrySpread | null;
  /** Dec–Feb, Mar–May, Jun–Aug, Sep–Nov on the country averages. */
  seasons: CountrySeason[];
  /** Per-city best months, for the comparison table. Most important first. */
  cityBest: CityBestMonths[];
}

const r0 = (n: number) => Math.round(n);
const mean = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;
const argmax = (xs: number[]) => xs.reduce((b, v, i) => (v > xs[b]! ? i : b), 0);
const argmin = (xs: number[]) => xs.reduce((b, v, i) => (v < xs[b]! ? i : b), 0);

/** Every city in a country that has climate normals, most important first. */
export function countryCitiesWithClimate(country: CountrySeed): CityWithClimate[] {
  const out: CityWithClimate[] = [];
  for (const city of citiesByImportance(country)) {
    const climate = getCityClimate(country.slug, city.slug);
    if (climate) out.push({ city, climate });
  }
  return out;
}

/**
 * The cities a traveller means when they say the country's name: curated
 * core cities and flagged holiday destinations first, then the largest
 * places. Falls back to the importance order when nothing is flagged.
 */
function representativeCities(all: CityWithClimate[]): CityWithClimate[] {
  const flagged = all.filter((x) => x.city.core || x.city.featured);
  const pool = flagged.length >= 3 ? flagged : all;
  return pool.slice(0, REPRESENTATIVE_MAX);
}

/** Monthly mean of one climate field across several cities. */
function monthlyMean(items: CityWithClimate[], field: keyof CityClimate): number[] {
  return Array.from({ length: 12 }, (_, m) => mean(items.map((x) => x.climate[field][m]!)));
}

/** The three best travel-weather months, by the same scorer the city pages use. */
function bestMonthsOf(c: CityClimate): number[] {
  return Array.from({ length: 12 }, (_, m) => ({ m, s: Math.max(scoreMonth(c, m, "warm"), scoreMonth(c, m, "mild")) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((x) => x.m)
    .sort((a, b) => a - b);
}

/**
 * Months directly before and after the best window: similar weather, fewer
 * people.
 *
 * Adjacency alone is not enough. In Spain the months either side of the best
 * window are April, July, August and October — but July and August are the
 * busiest and hottest of the year, so calling them a quiet shoulder would be
 * actively wrong. Months that are too hot or too cold to enjoy are therefore
 * dropped, which leaves the genuine in-between months (April and October for
 * Spain, June and October for Japan).
 */
function shoulderOf(best: number[], tMax: number[]): number[] {
  const set = new Set(best);
  const out = new Set<number>();
  for (const m of best) {
    for (const adj of [(m + 11) % 12, (m + 1) % 12]) {
      if (set.has(adj)) continue;
      const hi = tMax[adj]!;
      if (hi >= 30 || hi < 12) continue;
      out.add(adj);
    }
  }
  return [...out].sort((a, b) => a - b);
}

/**
 * The month in which this country's cities are furthest apart, with the two
 * cities at either end. Returns null for one-city countries or for countries
 * that really are uniform — better to say nothing than to dress up a 2°C
 * difference as regional variety.
 */
function spreadOf(all: CityWithClimate[]): CountrySpread | null {
  if (all.length < 3) return null;
  let best: CountrySpread | null = null;
  for (let m = 0; m < 12; m++) {
    let warm = all[0]!;
    let cool = all[0]!;
    for (const x of all) {
      if (x.climate.tMax[m]! > warm.climate.tMax[m]!) warm = x;
      if (x.climate.tMax[m]! < cool.climate.tMax[m]!) cool = x;
    }
    const gap = warm.climate.tMax[m]! - cool.climate.tMax[m]!;
    if (!best || gap > best.gap) {
      best = {
        month: m,
        warm: { city: warm.city, hi: r0(warm.climate.tMax[m]!) },
        cool: { city: cool.city, hi: r0(cool.climate.tMax[m]!) },
        gap: r0(gap),
      };
    }
  }
  return best && best.gap >= SPREAD_MIN_C ? best : null;
}

function seasonsOf(tMax: number[], tMin: number[], precip: number[], best: number[]): CountrySeason[] {
  const groups = [
    [11, 0, 1],
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10],
  ];
  return groups.map((months) => {
    const hi = mean(months.map((m) => tMax[m]!));
    const lo = mean(months.map((m) => tMin[m]!));
    const rain = mean(months.map((m) => precip[m]!));
    const idealCount = months.filter((m) => best.includes(m)).length;
    const verdict: CountryVerdict =
      idealCount >= 2 ? "ideal" : hi >= 31 ? "hot" : rain >= 100 ? "rainy" : hi < 13 ? "cold" : "good";
    return { months, hi: r0(hi), lo: r0(lo), rain: r0(rain), verdict };
  });
}

/**
 * Full analysis for one country. Returns null when no city in the country
 * has climate normals, in which case the page should not be built at all.
 */
export function analyseCountryClimate(country: CountrySeed): CountryClimateAnalysis | null {
  const all = countryCitiesWithClimate(country);
  if (all.length === 0) return null;

  const representative = representativeCities(all);
  const tMax = monthlyMean(representative, "tMax");
  const tMin = monthlyMean(representative, "tMin");
  const precipMm = monthlyMean(representative, "precipMm");
  const cloud = monthlyMean(representative, "cloud");

  // Score the country as if it were one place built from the representative
  // means — the same scorer the city pages use, so "best months" means the
  // same thing everywhere on the site.
  const countryClimate: CityClimate = {
    tMax,
    tMin,
    precipMm,
    humidity: monthlyMean(representative, "humidity"),
    cloud,
  };
  const best = bestMonthsOf(countryClimate);

  const cityBest: CityBestMonths[] = all.map(({ city, climate }) => {
    const b = bestMonthsOf(climate);
    return {
      city,
      best: b,
      hi: r0(mean(b.map((m) => climate.tMax[m]!))),
      lo: r0(mean(b.map((m) => climate.tMin[m]!))),
    };
  });

  return {
    representative,
    all,
    tMax: tMax.map(r0),
    tMin: tMin.map(r0),
    precipMm: precipMm.map(r0),
    cloud: cloud.map(r0),
    best,
    bestHi: r0(mean(best.map((m) => tMax[m]!))),
    bestLo: r0(mean(best.map((m) => tMin[m]!))),
    bestRain: r0(mean(best.map((m) => precipMm[m]!))),
    warmest: argmax(tMax),
    coolest: argmin(tMax),
    wettest: argmax(precipMm),
    driest: argmin(precipMm),
    sunniest: argmin(cloud),
    shoulder: shoulderOf(best, tMax),
    spread: spreadOf(all),
    seasons: seasonsOf(tMax, tMin, precipMm, best),
    cityBest,
  };
}

/** Countries that have at least one city with climate normals. */
export function countriesWithClimate(countries: CountrySeed[]): CountrySeed[] {
  return countries.filter((c) => c.cities.some((city) => getCityClimate(c.slug, city.slug)));
}
