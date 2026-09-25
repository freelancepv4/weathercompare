/**
 * Localized page copy + the shared climate helpers every language uses
 * (same logic as the English pages, returning indices/keys instead of
 * English words so each language can phrase them itself).
 */
import type { CityClimate } from "@/lib/data/climate";
import { scoreMonth } from "@/lib/tripScore";
import { monthInfo, type AnyLocale } from "@/lib/i18n/routing";
import type { Copy, PackKey, TripUi } from "./types";
import { en } from "./en";
import { it } from "./it";
import { de } from "./de";
import { fr } from "./fr";
import { es } from "./es";
import { pt } from "./pt";
import { nl } from "./nl";
import { pl } from "./pl";

export type { Copy, PackKey, TripUi, Sky } from "./types";

const ALL: Record<AnyLocale, Copy> = { en, it, de, fr, es, pt, nl, pl };

export function getCopy(locale: AnyLocale): Copy {
  return ALL[locale] ?? en;
}

/** Plain-data strings for the client-side trip finder. */
export function tripUi(locale: AnyLocale): TripUi {
  const c = getCopy(locale);
  return { ...c.trip, monthShort: c.monthShort, monthNames: monthInfo(locale).monthNames };
}

/** Same thresholds as describeMonth() in lib/data/climate.ts. */
export function describeIdx(c: CityClimate, i: number) {
  const high = c.tMax[i]!;
  const rain = c.precipMm[i]!;
  const cloud = c.cloud[i]!;
  const temp = high >= 32 ? 0 : high >= 27 ? 1 : high >= 21 ? 2 : high >= 15 ? 3 : high >= 8 ? 4 : high >= 2 ? 5 : 6;
  const rainI = rain < 20 ? 0 : rain < 50 ? 1 : rain < 90 ? 2 : rain < 150 ? 3 : 4;
  const sky = cloud < 35 ? 0 : cloud < 55 ? 1 : 2;
  return { temp, rain: rainI, sky };
}

/** Same rules as packingList() on the English month page. */
export function packingKeys(c: CityClimate, i: number): PackKey[] {
  const hi = c.tMax[i]!;
  const lo = c.tMin[i]!;
  const rain = c.precipMm[i]!;
  const out: PackKey[] = [];
  if (hi >= 27) out.push("light", "sunhat", "water");
  else if (hi >= 19) out.push("tshirts", "shoes");
  else if (hi >= 11) out.push("sweater", "jacket");
  else out.push("coat", "winterAcc");
  if (lo <= 0) out.push("thermals");
  else if (hi - lo >= 11) out.push("extraLayer");
  if (rain >= 70) out.push("umbrella", "waterproofShoes");
  else if (rain >= 35) out.push("smallUmbrella");
  if (c.cloud[i]! < 40 && hi >= 15) out.push("sunglasses");
  if (c.humidity[i]! >= 75 && hi >= 25) out.push("quickDry");
  return out;
}

/** The three most pleasant months (best of warm-sightseeing / mild scores), in calendar order. */
export function bestMonths(c: CityClimate): number[] {
  return Array.from({ length: 12 }, (_, m) => ({ m, s: Math.max(scoreMonth(c, m, "warm"), scoreMonth(c, m, "mild")) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((x) => x.m)
    .sort((a, b) => a - b);
}

const AND: Record<AnyLocale, string> = { en: "and", it: "e", de: "und", fr: "et", es: "y", pt: "e", nl: "en", pl: "i" };

/** "May, June and September" in the given language. */
export function joinList(locale: AnyLocale, items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${AND[locale]} ${items[items.length - 1]}`;
}

export const toF = (c: number) => Math.round((c * 9) / 5 + 32);
