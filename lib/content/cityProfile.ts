/**
 * A short, data-driven profile of a city for its forecast page ("About
 * {city} weather"): its climate type, its warmest, coolest and wettest
 * months, and how far the nearest other cities are. Different facts per city
 * and two phrasings per sentence (picked by a hash of the city), so 1,800
 * city pages don't share one paragraph with swapped names.
 */
import type { CityClimate } from "@/lib/data/months";
import { climateType, climateTypeLine } from "./climateType";
import { pick } from "./insights";
import { monthInfo, type AnyLocale } from "@/lib/i18n/routing";

const r = Math.round;
const argMax = (a: number[]) => a.reduce((b, v, i) => (v > a[b]! ? i : b), 0);
const argMin = (a: number[]) => a.reduce((b, v, i) => (v < a[b]! ? i : b), 0);

interface Args {
  city: string;
  seed: string;
  lat: number;
  climate: CityClimate | null;
  neighbours: Array<{ name: string; km: number }>;
}

type T = {
  climate: Array<(c: string, line: string) => string>;
  months: Array<(c: string, warm: string, hi: number, cool: string, lo: number, wet: string, mm: number) => string>;
  dry: (c: string) => string;
  near: Array<(c: string, list: string) => string>;
  join: (a: string[]) => string;
};

const list = (and: string) => (a: string[]) => (a.length <= 1 ? a.join("") : `${a.slice(0, -1).join(", ")} ${and} ${a[a.length - 1]}`);

const T: Record<AnyLocale, T> = {
  en: {
    climate: [
      (c, l) => `${c} has ${l}.`,
      (c, l) => `Climate-wise, ${c} has ${l}.`,
      (c, l) => `${c} sits in ${l}.`,
      (c, l) => `${c} is classed as having ${l}.`,
    ],
    months: [
      (c, w, hi, co, lo, we, mm) => `The warmest month is ${w}, with highs around ${hi}°C; the coolest is ${co}, when nights average ${lo}°C. ${we} is usually the wettest month (about ${mm} mm).`,
      (c, w, hi, co, lo, we, mm) => `Expect the most heat in ${w} (about ${hi}°C by day) and the chilliest nights in ${co} (around ${lo}°C). Most rain falls in ${we}, roughly ${mm} mm.`,
      (c, w, hi, co, lo, we, mm) => `${w} tops the year at about ${hi}°C by day, while ${co} brings the coldest nights at roughly ${lo}°C. The wettest stretch is ${we}, with around ${mm} mm.`,
    ],
    dry: (c) => `Rain is scarce in ${c} all year round.`,
    near: [
      (c, l) => `The nearest places with their own forecast page are ${l}.`,
      (c, l) => `Close to ${c}, you can also check ${l}.`,
      (c, l) => `Nearby forecasts worth a look: ${l}.`,
      (c, l) => `Within easy reach of ${c}: ${l}.`,
    ],
    join: list("and"),
  },
  it: {
    climate: [
      (c, l) => `${c} ha ${l}.`,
      (c, l) => `Dal punto di vista del clima, ${c} ha ${l}.`,
      (c, l) => `${c} rientra in ${l}.`,
      (c, l) => `Il clima di ${c} è ${l}.`,
    ],
    months: [
      (c, w, hi, co, lo, we, mm) => `Il mese più caldo è ${w}, con massime intorno ai ${hi}°C; il più fresco è ${co}, con minime notturne di circa ${lo}°C. Il mese più piovoso è di solito ${we} (circa ${mm} mm).`,
      (c, w, hi, co, lo, we, mm) => `Il caldo maggiore arriva a ${w} (circa ${hi}°C di giorno), le notti più fredde a ${co} (circa ${lo}°C). La pioggia si concentra a ${we}, circa ${mm} mm.`,
      (c, w, hi, co, lo, we, mm) => `${w} chiude l'anno in testa con circa ${hi}°C di giorno, mentre ${co} porta le notti più fredde, intorno ai ${lo}°C. Il periodo più piovoso è ${we}, con circa ${mm} mm.`,
    ],
    dry: (c) => `A ${c} piove poco in tutti i mesi dell'anno.`,
    near: [
      (c, l) => `Le località vicine con previsioni proprie sono ${l}.`,
      (c, l) => `Vicino a ${c} puoi controllare anche ${l}.`,
      (c, l) => `Previsioni nei dintorni: ${l}.`,
      (c, l) => `A breve distanza da ${c}: ${l}.`,
    ],
    join: list("e"),
  },
  de: {
    climate: [
      (c, l) => `${c} hat ${l}.`,
      (c, l) => `Klimatisch gesehen hat ${c} ${l}.`,
      (c, l) => `${c} liegt in ${l}.`,
      (c, l) => `Das Klima in ${c} ist ${l}.`,
    ],
    months: [
      (c, w, hi, co, lo, we, mm) => `Wärmster Monat ist der ${w} mit Höchstwerten um ${hi}°C, kühlster der ${co} mit Nächten um ${lo}°C. Am meisten regnet es meist im ${we} (etwa ${mm} mm).`,
      (c, w, hi, co, lo, we, mm) => `Die größte Hitze bringt der ${w} (tagsüber etwa ${hi}°C), die kältesten Nächte der ${co} (rund ${lo}°C). Der meiste Regen fällt im ${we}, rund ${mm} mm.`,
      (c, w, hi, co, lo, we, mm) => `An der Spitze des Jahres steht der ${w} mit rund ${hi}°C am Tag, die kältesten Nächte bringt der ${co} mit etwa ${lo}°C. Am nassesten ist der ${we} mit rund ${mm} mm.`,
    ],
    dry: (c) => `In ${c} regnet es das ganze Jahr über wenig.`,
    near: [
      (c, l) => `Die nächstgelegenen Orte mit eigener Vorhersage: ${l}.`,
      (c, l) => `In der Nähe von ${c} lohnt auch ein Blick auf ${l}.`,
      (c, l) => `Vorhersagen aus der Umgebung: ${l}.`,
      (c, l) => `Nur einen Katzensprung von ${c} entfernt: ${l}.`,
    ],
    join: list("und"),
  },
  fr: {
    climate: [
      (c, l) => `${c} a ${l}.`,
      (c, l) => `Côté climat, ${c} connaît ${l}.`,
      (c, l) => `${c} relève de ${l}.`,
      (c, l) => `Le climat de ${c} est ${l}.`,
    ],
    months: [
      (c, w, hi, co, lo, we, mm) => `Le mois le plus chaud est ${w}, avec des maximales vers ${hi} °C ; le plus frais est ${co}, avec des nuits autour de ${lo} °C. Le mois le plus pluvieux est en général ${we} (environ ${mm} mm).`,
      (c, w, hi, co, lo, we, mm) => `La chaleur culmine en ${w} (environ ${hi} °C en journée) et les nuits les plus froides tombent en ${co} (autour de ${lo} °C). C'est en ${we} qu'il pleut le plus, environ ${mm} mm.`,
      (c, w, hi, co, lo, we, mm) => `${w} domine l'année avec près de ${hi} °C en journée, tandis que ${co} apporte les nuits les plus froides, autour de ${lo} °C. La période la plus arrosée est ${we}, avec environ ${mm} mm.`,
    ],
    dry: (c) => `Il pleut peu à ${c} tout au long de l'année.`,
    near: [
      (c, l) => `Les lieux les plus proches avec leur propre prévision : ${l}.`,
      (c, l) => `Près de ${c}, consultez aussi ${l}.`,
      (c, l) => `Prévisions aux alentours : ${l}.`,
      (c, l) => `À courte distance de ${c} : ${l}.`,
    ],
    join: list("et"),
  },
  es: {
    climate: [
      (c, l) => `${c} tiene ${l}.`,
      (c, l) => `En cuanto al clima, ${c} tiene ${l}.`,
      (c, l) => `${c} se enmarca en ${l}.`,
      (c, l) => `El clima de ${c} es ${l}.`,
    ],
    months: [
      (c, w, hi, co, lo, we, mm) => `El mes más cálido es ${w}, con máximas de unos ${hi}°C; el más fresco es ${co}, con mínimas nocturnas de unos ${lo}°C. El más lluvioso suele ser ${we} (unos ${mm} mm).`,
      (c, w, hi, co, lo, we, mm) => `El mayor calor llega en ${w} (unos ${hi}°C de día) y las noches más frías en ${co} (unos ${lo}°C). La lluvia se concentra en ${we}, con unos ${mm} mm.`,
      (c, w, hi, co, lo, we, mm) => `${w} encabeza el año con unos ${hi}°C de día, mientras que ${co} deja las noches más frías, en torno a ${lo}°C. La época más húmeda es ${we}, con unos ${mm} mm.`,
    ],
    dry: (c) => `En ${c} llueve poco durante todo el año.`,
    near: [
      (c, l) => `Las localidades más cercanas con previsión propia son ${l}.`,
      (c, l) => `Cerca de ${c} también puedes consultar ${l}.`,
      (c, l) => `Previsiones en los alrededores: ${l}.`,
      (c, l) => `A poca distancia de ${c}: ${l}.`,
    ],
    join: list("y"),
  },
  pt: {
    climate: [
      (c, l) => `${c} tem ${l}.`,
      (c, l) => `Em termos de clima, ${c} tem ${l}.`,
      (c, l) => `${c} insere-se em ${l}.`,
      (c, l) => `O clima de ${c} é ${l}.`,
    ],
    months: [
      (c, w, hi, co, lo, we, mm) => `O mês mais quente é ${w}, com máximas perto dos ${hi}°C; o mais fresco é ${co}, com noites à volta dos ${lo}°C. O mais chuvoso costuma ser ${we} (cerca de ${mm} mm).`,
      (c, w, hi, co, lo, we, mm) => `O calor atinge o pico em ${w} (cerca de ${hi}°C de dia) e as noites mais frias chegam em ${co} (perto de ${lo}°C). A chuva concentra-se em ${we}, cerca de ${mm} mm.`,
      (c, w, hi, co, lo, we, mm) => `${w} lidera o ano com cerca de ${hi}°C durante o dia, enquanto ${co} traz as noites mais frias, à volta dos ${lo}°C. A época mais húmida é ${we}, com cerca de ${mm} mm.`,
    ],
    dry: (c) => `Chove pouco em ${c} ao longo de todo o ano.`,
    near: [
      (c, l) => `Os locais mais próximos com previsão própria são ${l}.`,
      (c, l) => `Perto de ${c}, veja também ${l}.`,
      (c, l) => `Previsões nas redondezas: ${l}.`,
      (c, l) => `A curta distância de ${c}: ${l}.`,
    ],
    join: list("e"),
  },
  nl: {
    climate: [
      (c, l) => `${c} heeft ${l}.`,
      (c, l) => `Qua klimaat heeft ${c} ${l}.`,
      (c, l) => `${c} valt onder ${l}.`,
      (c, l) => `Het klimaat van ${c} is ${l}.`,
    ],
    months: [
      (c, w, hi, co, lo, we, mm) => `De warmste maand is ${w}, met maxima rond ${hi}°C; de koelste is ${co}, met nachten rond ${lo}°C. De natste maand is meestal ${we} (zo'n ${mm} mm).`,
      (c, w, hi, co, lo, we, mm) => `De meeste warmte valt in ${w} (overdag zo'n ${hi}°C), de koudste nachten in ${co} (rond ${lo}°C). De meeste regen valt in ${we}, ongeveer ${mm} mm.`,
      (c, w, hi, co, lo, we, mm) => `${w} voert het jaar aan met zo'n ${hi}°C overdag, terwijl ${co} de koudste nachten brengt, rond ${lo}°C. De natste periode is ${we}, met ongeveer ${mm} mm.`,
    ],
    dry: (c) => `In ${c} valt het hele jaar weinig regen.`,
    near: [
      (c, l) => `De dichtstbijzijnde plaatsen met een eigen verwachting: ${l}.`,
      (c, l) => `In de buurt van ${c} kun je ook ${l} bekijken.`,
      (c, l) => `Verwachtingen in de omgeving: ${l}.`,
      (c, l) => `Op korte afstand van ${c}: ${l}.`,
    ],
    join: list("en"),
  },
  pl: {
    climate: [
      (c, l) => `${c}: ${l}.`,
      (c, l) => `Klimat (${c}): ${l}.`,
      (c, l) => `${c} – ${l}.`,
      (c, l) => `Dla ${c} charakterystyczne jest ${l}.`,
    ],
    months: [
      (c, w, hi, co, lo, we, mm) => `Najcieplejszy miesiąc to ${w} (maksima około ${hi}°C), najchłodniejszy to ${co} (noce około ${lo}°C). Najwięcej deszczu przynosi zwykle ${we} (około ${mm} mm).`,
      (c, w, hi, co, lo, we, mm) => `Najgoręcej jest, gdy przychodzi ${w} (w dzień około ${hi}°C), najzimniejsze noce przynosi ${co} (około ${lo}°C). Najwięcej pada, gdy trwa ${we} – około ${mm} mm.`,
      (c, w, hi, co, lo, we, mm) => `Na czele roku stoi ${w} z temperaturą około ${hi}°C w dzień, a najzimniejsze noce przypadają na ${co} (około ${lo}°C). Najbardziej mokry okres to ${we} – około ${mm} mm.`,
    ],
    dry: (c) => `${c}: przez cały rok pada niewiele.`,
    near: [
      (c, l) => `Najbliższe miejscowości z własną prognozą: ${l}.`,
      (c, l) => `W pobliżu warto sprawdzić także: ${l}.`,
      (c, l) => `Prognozy w okolicy: ${l}.`,
      (c, l) => `Niedaleko ${c}: ${l}.`,
    ],
    join: list("i"),
  },
};

export function cityProfile(locale: AnyLocale, a: Args): string[] {
  const t = T[locale] ?? T.en;
  const out: string[] = [];
  const s = <F>(k: string, opts: F[]) => pick(`${a.seed}:${k}`, opts);
  const nf = new Intl.NumberFormat(locale === "en" ? "en-GB" : locale);
  if (a.climate) {
    const c = a.climate;
    const type = climateType(c, a.lat);
    out.push(s("clim", t.climate)(a.city, climateTypeLine(locale, type)));
    const mn = monthInfo(locale).monthNames;
    const w = argMax(c.tMax);
    const co = argMin(c.tMin);
    const we = argMax(c.precipMm);
    const total = c.precipMm.reduce((x, y) => x + y, 0);
    const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
    let months = s("months", t.months)(a.city, mn[w]!, r(c.tMax[w]!), mn[co]!, r(c.tMin[co]!), mn[we]!, c.precipMm[we]!);
    if (total < 150) months = months.replace(/[^.]*\.\s*$/, "").trim() + " " + t.dry(a.city);
    out.push(cap(months));
  }
  if (a.neighbours.length > 0) {
    const l = t.join(a.neighbours.map((n) => `${n.name} (${nf.format(n.km)} km)`));
    out.push(s("near", t.near)(a.city, l));
  }
  return out;
}
