import type { Fact } from "@/lib/content/insights";
import { monthInfo, type AnyLocale } from "@/lib/i18n/routing";
import { getCopy } from "@/lib/i18n/copy";
import { en } from "./en";
import { it } from "./it";
import { de } from "./de";
import { fr } from "./fr";
import { es } from "./es";
import { pt } from "./pt";
import { nl } from "./nl";
import { pl } from "./pl";

export interface Ctx {
  /** Display name of the city in this language. */
  city: string;
  /** "in Rome" / "a Roma" / "w Rzymie"… */
  inC: string;
  /** Month name as used in running text ("October", "ottobre"). */
  M: string;
  /** "in October" / "a ottobre" / "w październiku". */
  IN: string;
  monthName: (i: number) => string;
  inMonth: (i: number) => string;
  seed: string;
}

const RENDER: Record<AnyLocale, (f: Fact, x: Ctx) => string> = { en, it, de, fr, es, pt, nl, pl };

export function renderInsights(locale: AnyLocale, facts: Fact[], city: string, m: number, seed: string): string[] {
  const mi = monthInfo(locale);
  const copy = getCopy(locale);
  const ctx: Ctx = {
    city,
    inC: copy.inCity(city),
    M: mi.monthNames[m]!,
    IN: mi.inMonth[m]!,
    monthName: (i) => mi.monthNames[i]!,
    inMonth: (i) => mi.inMonth[i]!,
    seed,
  };
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return facts.map((f) => cap(RENDER[locale](f, ctx)));
}

/** Heading for the insights box, e.g. "What stands out in October". */
export function insightsHeading(locale: AnyLocale, m: number): string {
  const mi = monthInfo(locale);
  const H: Record<AnyLocale, string> = {
    en: `What stands out ${mi.inMonth[m]}`,
    it: `Da sapere ${mi.inMonth[m]}`,
    de: `Das Besondere ${mi.inMonth[m]}`,
    fr: `À retenir ${mi.inMonth[m]}`,
    es: `Lo que destaca ${mi.inMonth[m]}`,
    pt: `Em destaque ${mi.inMonth[m]}`,
    nl: `Opvallend ${mi.inMonth[m]}`,
    pl: `Warto wiedzieć: ${mi.monthNames[m]}`,
  };
  return H[locale];
}
