import type { Fact } from "@/lib/content/insights";
import { pick } from "@/lib/content/insights";
import type { Ctx } from "./index";

/** "qu'août" / "que mars" */
const que = (m: string) => (/^[aeiouéè]/i.test(m) ? `qu'${m}` : `que ${m}`);
/** "à Lyon" / "au Caire" */
const a = (c: string) => (c.startsWith("Le ") ? `au ${c.slice(3)}` : `à ${c}`);

export function fr(f: Fact, x: Ctx): string {
  const { city, inC, M, seed } = x;
  const s = (o: string[]) => pick(`${seed}:${f.k}`, o);
  switch (f.k) {
    case "rank":
      if (f.pos === 1) return s([`${M} est le mois le plus chaud de l'année ${inC}.`, `Aucun mois n'est plus chaud ${que(M)} ${inC}.`, `Pour profiter de ${city} au plus chaud, c'est en ${M} qu'il faut venir.`]);
      if (f.pos === 12) return s([`${M} est le mois le plus froid de l'année ${inC}.`, `C'est en ${M} que ${city} connaît ses températures les plus basses.`]);
      if (f.pos <= 3) return s([`${M} fait partie des trois mois les plus chauds ${inC}.`, `${f.pos - 1 === 1 ? "Seul un mois est plus chaud" : `Seuls ${f.pos - 1} mois sont plus chauds`} ${que(M)} ${inC}.`]);
      return s([`${M} fait partie des trois mois les plus frais ${inC}.`, `${12 - f.pos === 1 ? "Seul un mois est plus froid" : `Seuls ${12 - f.pos} mois sont plus froids`} ${que(M)} ${inC}.`]);
    case "season": {
      const noun = { winter: "l'hiver", spring: "le printemps", summer: "l'été", autumn: "l'automne" }[f.season];
      const deN = { winter: "de l'hiver", spring: "du printemps", summer: "de l'été", autumn: "de l'automne" }[f.season];
      const phr = f.phase === "mid" ? `en plein ${noun.replace(/^l'|^le /, "")}` : f.phase === "early" ? `au début ${deN}` : `à la fin ${deN}`;
      const south = f.south ? " (dans l'hémisphère sud, les saisons sont inversées)" : "";
      return s([`En ${M}, ${city} est ${phr}${south}.`, `${inC.charAt(0).toUpperCase() + inC.slice(1)}, ${M} tombe ${phr}${south}.`]);
    }
    case "tropical":
      return f.wet
        ? s([`En ${M}, c'est la saison des pluies ${inC} : les averses courtes mais violentes sont fréquentes.`, `${M} tombe en pleine saison humide ${inC}.`])
        : s([`En ${M}, c'est la saison sèche ${inC}, en général une bonne période pour partir.`, `C'est l'une des périodes les plus sèches de l'année ${inC}.`]);
    case "swing":
      return f.big
        ? s([`L'écart entre le jour et la nuit atteint environ ${f.deg}°C : prévoyez une couche pour le soir.`, `Les soirées se rafraîchissent nettement, avec une amplitude d'environ ${f.deg}°C.`])
        : s([`Le jour et la nuit sont proches, à peine ${f.deg}°C d'écart.`, `L'amplitude thermique est faible, autour de ${f.deg}°C.`]);
    case "trend":
      return f.delta > 0
        ? s([`La chaleur monte vite : en ${x.monthName(f.next)}, les maximales gagnent environ ${f.delta}°C.`, `Les températures grimpent : ${x.monthName(f.next)} est plus chaud d'environ ${f.delta}°C.`])
        : s([`Ça se rafraîchit vite : en ${x.monthName(f.next)}, les maximales perdent environ ${-f.delta}°C.`, `Les températures baissent : ${x.monthName(f.next)} est plus frais d'environ ${-f.delta}°C.`]);
    case "rain":
      return f.wetter
        ? s([`Il pleut davantage qu'un mois moyen ${inC} : environ ${f.pct} % de pluie en plus.`, `Les précipitations dépassent la moyenne habituelle d'environ ${f.pct} %.`])
        : s([`C'est l'un des mois les plus secs, avec environ ${f.pct} % de pluie en moins que la moyenne.`, `Les pluies sont bien inférieures à la normale ${inC} (environ ${f.pct} % de moins).`]);
    case "humid":
      return f.muggy
        ? s([`Avec près de ${f.h} % d'humidité, les ${f.hi}°C paraissent plus lourds.`, `L'air est humide (environ ${f.h} %) : la chaleur est plus pesante.`])
        : s([`L'air est plutôt sec (environ ${f.h} % d'humidité) : la chaleur reste agréable.`, `Une humidité faible (autour de ${f.h} %) rend les journées chaudes supportables.`]);
    case "sun":
      return f.sunny
        ? s([`C'est l'un des mois les plus ensoleillés, avec environ ${f.cloud} % de nébulosité.`, `Le ciel est parmi les plus dégagés de l'année.`])
        : s([`C'est l'un des mois les plus gris, avec près de ${f.cloud} % de nébulosité.`, `Attendez-vous à plus de nuages qu'à toute autre saison.`]);
    case "sibling":
      return f.diff > 0
        ? s([`En ${M}, il fait en général environ ${f.diff}°C de plus ${inC} qu'${a(f.other.name)}.`, `Par rapport à ${f.other.name}, ${city} est plus chaude d'environ ${f.diff}°C ce mois-ci.`])
        : s([`En ${M}, il fait en général environ ${-f.diff}°C de moins ${inC} qu'${a(f.other.name)}.`, `Par rapport à ${f.other.name}, ${city} est plus fraîche d'environ ${-f.diff}°C ce mois-ci.`]);
    case "landmark":
      return "";
  }
}
