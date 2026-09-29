/**
 * Data-driven "insights" for a city in a given month.
 *
 * Why this exists: thousands of city × month pages built from one template
 * read as the same sentences with different numbers. Instead, each page
 * picks only the observations that are actually true and notable for THAT
 * city and month (its warmest month? a big day/night swing? much wetter than
 * usual? warmer than a neighbouring city?), and each observation is phrased
 * in one of several ways, chosen deterministically from the page (so a page
 * always renders the same text, but neighbouring pages differ).
 *
 * Facts are language-neutral; lib/i18n/insights/{lang}.ts turns them into
 * sentences.
 */
import type { CityClimate } from "@/lib/data/climate";
import { getCityClimate } from "@/lib/data/climate";
import type { CountrySeed, CitySeed } from "@/config/countries";
import type { Landmark } from "@/lib/data/cityGuides";
import { nearestCities } from "@/config/world";

export type Season = "winter" | "spring" | "summer" | "autumn";
export type Phase = "early" | "mid" | "late";

export type Fact =
  | { k: "rank"; pos: number }
  | { k: "season"; season: Season; phase: Phase; south: boolean }
  | { k: "tropical"; wet: boolean }
  | { k: "swing"; deg: number; big: boolean }
  | { k: "trend"; delta: number; next: number }
  | { k: "rain"; pct: number; wetter: boolean }
  | { k: "humid"; h: number; hi: number; muggy: boolean }
  | { k: "sun"; cloud: number; sunny: boolean }
  | { k: "sibling"; other: { slug: string; name: string }; diff: number; km?: number }
  | { k: "nights"; lo: number; frost: boolean }
  | { k: "beach"; hi: number }
  | { k: "landmark"; mode: "early" | "rainy" | "walk" | "cold"; names: string[] };

/** Small stable string hash (FNV-1a). */
export function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministically pick one of several phrasings. */
export function pick<T>(seed: string, options: T[]): T {
  return options[hash(seed) % options.length]!;
}

const r = Math.round;

function rankDesc(values: number[], i: number): number {
  return 1 + values.filter((v, j) => j !== i && v > values[i]!).length;
}

function seasonOf(m: number, south: boolean): { season: Season; phase: Phase } {
  const mm = south ? (m + 6) % 12 : m;
  // Dec-Feb winter, Mar-May spring, Jun-Aug summer, Sep-Nov autumn
  const seasons: Season[] = ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "autumn", "autumn", "autumn", "winter"];
  const phaseIdx = [1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0][mm]!;
  return { season: seasons[mm]!, phase: (["early", "mid", "late"] as Phase[])[phaseIdx]! };
}

export interface InsightInput {
  country: CountrySeed;
  city: CitySeed;
  climate: CityClimate;
  m: number;
  /** English-only extras (landmark tie-ins) — omit for translated pages. */
  landmarks?: Landmark[];
  /** Localized name for sibling cities. */
  nameOf?: (city: CitySeed) => string;
  max?: number;
}

export function monthFacts({ country, city, climate: c, m, landmarks, nameOf, max = 4 }: InsightInput): Fact[] {
  const seed = `${country.slug}/${city.slug}/${m}`;
  const hi = c.tMax[m]!;
  const lo = c.tMin[m]!;
  const mm = c.precipMm[m]!;
  const avgRain = c.precipMm.reduce((a, b) => a + b, 0) / 12;
  const next = (m + 1) % 12;
  const tropical = Math.abs(city.lat) < 23.5;

  // Each candidate carries a relevance score; only the strongest few are shown.
  const cands: Array<{ f: Fact; score: number }> = [];

  const pos = rankDesc(c.tMax, m);
  // Warmest/coolest month is already shown as a highlighted chip on the page.
  if ((pos > 1 && pos <= 3) || (pos >= 10 && pos < 12)) cands.push({ f: { k: "rank", pos }, score: 6 });

  if (tropical) {
    const ratio = mm / Math.max(avgRain, 1);
    if (ratio >= 1.3 || ratio <= 0.6) cands.push({ f: { k: "tropical", wet: ratio >= 1.3 }, score: 7 });
  } else {
    const s = seasonOf(m, city.lat < 0);
    cands.push({ f: { k: "season", ...s, south: city.lat < 0 }, score: city.lat < 0 ? 8 : 5 });
  }

  const swing = r(hi - lo);
  if (swing >= 11 || swing <= 6) cands.push({ f: { k: "swing", deg: swing, big: swing >= 11 }, score: swing >= 13 || swing <= 5 ? 6 : 4 });

  const delta = r(c.tMax[next]! - hi);
  if (Math.abs(delta) >= 4) cands.push({ f: { k: "trend", delta, next }, score: Math.abs(delta) >= 6 ? 7 : 5 });

  const ratio = mm / Math.max(avgRain, 1);
  if (avgRain >= 15 && (ratio >= 1.35 || ratio <= 0.6)) {
    cands.push({ f: { k: "rain", pct: Math.abs(r((ratio - 1) * 100)), wetter: ratio > 1 }, score: ratio >= 1.8 || ratio <= 0.4 ? 7 : 5 });
  }

  const h = c.humidity[m]!;
  if (h >= 72 && hi >= 25) cands.push({ f: { k: "humid", h, hi: r(hi), muggy: true }, score: 6 });
  else if (h <= 48 && hi >= 22) cands.push({ f: { k: "humid", h, hi: r(hi), muggy: false }, score: 4 });

  const cloudPos = 1 + c.cloud.filter((v, j) => j !== m && v < c.cloud[m]!).length; // 1 = least cloudy
  if (cloudPos <= 2) cands.push({ f: { k: "sun", cloud: c.cloud[m]!, sunny: true }, score: 5 });
  else if (cloudPos >= 11) cands.push({ f: { k: "sun", cloud: c.cloud[m]!, sunny: false }, score: 5 });

  // Nights: frost, or "tropical nights" that never cool below ~22°C.
  if (lo <= 0) cands.push({ f: { k: "nights", lo: r(lo), frost: true }, score: lo <= -5 ? 7 : 6 });
  else if (lo >= 22) cands.push({ f: { k: "nights", lo: r(lo), frost: false }, score: 5 });

  // Beach / pool weather: hot, fairly dry and mostly sunny.
  if (hi >= 26 && mm < 50 && c.cloud[m]! < 45) cands.push({ f: { k: "beach", hi: r(hi) }, score: 4 });

  // Compare with a nearby city in the same country (the nearest one that is
  // noticeably different), falling back to any city in the country.
  const near = nearestCities(city, 10, { sameCountry: country.slug, maxKm: 600 })
    .map(({ city: o, km }) => ({ o, km, oc: getCityClimate(country.slug, o.slug) }))
    .filter((x) => x.oc)
    .map((x) => ({ o: x.o, km: Math.round(x.km / 10) * 10, diff: r(hi - x.oc!.tMax[m]!) }))
    .filter((x) => Math.abs(x.diff) >= 2);
  if (near.length > 0) {
    const chosen = near[0]!;
    cands.push({ f: { k: "sibling", other: { slug: chosen.o.slug, name: nameOf ? nameOf(chosen.o) : chosen.o.name }, diff: chosen.diff, km: chosen.km }, score: 5 });
  } else {
    const others = country.cities
      .filter((o) => o.slug !== city.slug)
      .slice(0, 40)
      .map((o) => ({ o, oc: getCityClimate(country.slug, o.slug) }))
      .filter((x) => x.oc)
      .map((x) => ({ o: x.o, diff: r(hi - x.oc!.tMax[m]!) }))
      .filter((x) => Math.abs(x.diff) >= 2);
    if (others.length > 0) {
      const chosen = pick(`${seed}:sib`, others);
      cands.push({ f: { k: "sibling", other: { slug: chosen.o.slug, name: nameOf ? nameOf(chosen.o) : chosen.o.name }, diff: chosen.diff }, score: 4 });
    }
  }

  if (landmarks && landmarks.length >= 2) {
    const a = pick(`${seed}:lm`, landmarks);
    const b = landmarks.find((l) => l.name !== a.name)!;
    const mode = hi >= 28 ? "early" : mm >= 80 ? "rainy" : hi < 9 ? "cold" : "walk";
    cands.push({ f: { k: "landmark", mode, names: mode === "walk" ? [a.name, b.name] : [a.name] }, score: 5 });
  }

  // Strongest first, ties broken by page-specific hash; then shuffle the
  // display order a little so pages don't all open with the same fact type.
  const chosen = cands
    .map((x) => ({ ...x, tie: hash(`${seed}:${x.f.k}`) }))
    .sort((a, b) => b.score - a.score || a.tie - b.tie)
    .slice(0, max)
    .sort((a, b) => a.tie - b.tie)
    .map((x) => x.f);
  return chosen;
}
