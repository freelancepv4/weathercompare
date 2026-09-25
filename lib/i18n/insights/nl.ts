import type { Fact } from "@/lib/content/insights";
import { pick } from "@/lib/content/insights";
import type { Ctx } from "./index";

export function nl(f: Fact, x: Ctx): string {
  const { city, M, seed } = x;
  const s = (o: string[]) => pick(`${seed}:${f.k}`, o);
  switch (f.k) {
    case "rank":
      if (f.pos === 1) return s([`${M} is de warmste maand van het jaar in ${city}.`, `Nergens in het jaar is ${city} warmer dan in ${M}.`, `Wie ${city} op zijn warmst wil beleven, gaat in ${M}.`]);
      if (f.pos === 12) return s([`${M} is de koudste maand van het jaar in ${city}.`, `Kouder dan in ${M} wordt het in ${city} niet.`]);
      if (f.pos <= 3) return s([`${M} hoort bij de drie warmste maanden in ${city}.`, `Maar ${f.pos - 1 === 1 ? "één maand is" : `${f.pos - 1} maanden zijn`} warmer in ${city} dan ${M}.`]);
      return s([`${M} hoort bij de drie koelste maanden in ${city}.`, `Maar ${12 - f.pos === 1 ? "één maand is" : `${12 - f.pos} maanden zijn`} kouder in ${city} dan ${M}.`]);
    case "season": {
      const n = { winter: "winter", spring: "lente", summer: "zomer", autumn: "herfst" }[f.season];
      const phr = f.phase === "mid" ? `midden in de ${n}` : f.phase === "early" ? `aan het begin van de ${n}` : `aan het eind van de ${n}`;
      const south = f.south ? " (op het zuidelijk halfrond zijn de seizoenen omgedraaid)" : "";
      return s([`In ${M} zit ${city} ${phr}${south}.`, `Voor ${city} valt ${M} ${phr}${south}.`]);
    }
    case "tropical":
      return f.wet
        ? s([`In ${M} is het regenseizoen in ${city}: korte, hevige buien komen vaak voor.`, `${M} valt in ${city} midden in het natte seizoen.`])
        : s([`In ${M} is het droge seizoen in ${city}, meestal een prettige reistijd.`, `Het is een van de droogste periodes van het jaar in ${city}.`]);
    case "swing":
      return f.big
        ? s([`Tussen dag en nacht zit zo'n ${f.deg}°C verschil – neem een extra laag mee voor de avond.`, `'s Avonds koelt het flink af, het verschil is ongeveer ${f.deg}°C.`])
        : s([`Dag en nacht liggen dicht bij elkaar, maar zo'n ${f.deg}°C uit elkaar.`, `Het temperatuurverschil tussen dag en nacht is klein, rond ${f.deg}°C.`]);
    case "trend":
      return f.delta > 0
        ? s([`Vanaf nu wordt het snel warmer: in ${x.monthName(f.next)} liggen de maxima zo'n ${f.delta}°C hoger.`, `De temperatuur stijgt – ${x.monthName(f.next)} is ongeveer ${f.delta}°C warmer.`])
        : s([`Vanaf nu koelt het snel af: ${x.monthName(f.next)} is zo'n ${-f.delta}°C koeler.`, `De temperatuur daalt – in ${x.monthName(f.next)} liggen de maxima ongeveer ${-f.delta}°C lager.`]);
    case "rain":
      return f.wetter
        ? s([`Het regent meer dan in een gemiddelde maand in ${city}: ongeveer ${f.pct}% meer.`, `De neerslag ligt zo'n ${f.pct}% boven het maandgemiddelde van ${city}.`])
        : s([`Het is een van de droogste maanden, met ongeveer ${f.pct}% minder regen dan gemiddeld.`, `Er valt duidelijk minder regen dan gewoonlijk in ${city} (zo'n ${f.pct}% minder).`]);
    case "humid":
      return f.muggy
        ? s([`Met een luchtvochtigheid van ongeveer ${f.h}% voelt ${f.hi}°C benauwder aan.`, `Het is vochtig (rond ${f.h}%), waardoor de warmte zwaarder aanvoelt.`])
        : s([`De lucht is vrij droog (zo'n ${f.h}% luchtvochtigheid), dus warme dagen zijn goed te doen.`, `Een lage luchtvochtigheid (rond ${f.h}%) houdt de warmte aangenaam.`]);
    case "sun":
      return f.sunny
        ? s([`Het is een van de zonnigste maanden, met ongeveer ${f.cloud}% bewolking.`, `De lucht is nu helderder dan bijna de rest van het jaar.`])
        : s([`Het is een van de grijste maanden, met bijna ${f.cloud}% bewolking.`, `Reken op meer bewolking dan in welk ander seizoen ook.`]);
    case "sibling":
      return f.diff > 0
        ? s([`In ${M} is het in ${city} meestal zo'n ${f.diff}°C warmer dan in ${f.other.name}.`, `Vergeleken met ${f.other.name} is ${city} deze maand ongeveer ${f.diff}°C warmer.`])
        : s([`In ${M} is het in ${city} meestal zo'n ${-f.diff}°C koeler dan in ${f.other.name}.`, `Vergeleken met ${f.other.name} is ${city} deze maand ongeveer ${-f.diff}°C koeler.`]);
    case "landmark":
      return "";
  }
}
