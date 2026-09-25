import type { Fact } from "@/lib/content/insights";
import { pick } from "@/lib/content/insights";
import type { Ctx } from "./index";

const SEASON = { winter: "Winter", spring: "Frühling", summer: "Sommer", autumn: "Herbst" };

export function de(f: Fact, x: Ctx): string {
  const { city, inC, M, seed } = x;
  const s = (o: string[]) => pick(`${seed}:${f.k}`, o);
  switch (f.k) {
    case "rank":
      if (f.pos === 1) return s([`Der ${M} ist der wärmste Monat des Jahres ${inC}.`, `Wärmer als im ${M} wird es ${inC} nie.`, `Wer ${city} von der heißesten Seite erleben will, reist im ${M}.`]);
      if (f.pos === 12) return s([`Der ${M} ist der kälteste Monat des Jahres ${inC}.`, `Kälter als im ${M} wird es ${inC} nicht.`]);
      if (f.pos <= 3) return s([`Der ${M} gehört zu den drei wärmsten Monaten ${inC}.`, `Nur ${f.pos - 1 === 1 ? "ein Monat ist" : `${f.pos - 1} Monate sind`} ${inC} wärmer als der ${M}.`]);
      return s([`Der ${M} gehört zu den drei kühlsten Monaten ${inC}.`, `Nur ${12 - f.pos === 1 ? "ein Monat ist" : `${12 - f.pos} Monate sind`} ${inC} kälter als der ${M}.`]);
    case "season": {
      const gen = { winter: "Winters", spring: "Frühlings", summer: "Sommers", autumn: "Herbstes" }[f.season];
      const phr = f.phase === "mid" ? `mitten im ${SEASON[f.season]}` : f.phase === "early" ? `am Anfang des ${gen}` : `am Ende des ${gen}`;
      const south = f.south ? " – auf der Südhalbkugel sind die Jahreszeiten vertauscht" : "";
      return s([`Im ${M} ist man ${inC} ${phr}${south}.`, `${inC.charAt(0).toUpperCase() + inC.slice(1)} liegt der ${M} ${phr}${south}.`]);
    }
    case "tropical":
      return f.wet
        ? s([`Im ${M} ist ${inC} Regenzeit – kurze, heftige Schauer sind häufig.`, `Der ${M} fällt ${inC} in die nasse Jahreszeit.`])
        : s([`Im ${M} ist ${inC} Trockenzeit, meist eine angenehme Reisezeit.`, `Der ${M} gehört ${inC} zu den trockeneren Monaten.`]);
    case "swing":
      return f.big
        ? s([`Zwischen Tag und Nacht liegen rund ${f.deg}°C – abends braucht man eine Jacke.`, `Die Abende kühlen deutlich ab: Die Tagesschwankung beträgt etwa ${f.deg}°C.`])
        : s([`Tag und Nacht liegen nur etwa ${f.deg}°C auseinander.`, `Die Temperaturen schwanken kaum, nur um rund ${f.deg}°C.`]);
    case "trend":
      return f.delta > 0
        ? s([`Ab jetzt wird es schnell wärmer: Im ${x.monthName(f.next)} liegen die Höchstwerte etwa ${f.delta}°C höher.`, `Die Temperaturen steigen – der ${x.monthName(f.next)} ist rund ${f.delta}°C wärmer.`])
        : s([`Ab jetzt kühlt es schnell ab: Der ${x.monthName(f.next)} ist etwa ${-f.delta}°C kühler.`, `Die Temperaturen sinken – im ${x.monthName(f.next)} sind die Höchstwerte rund ${-f.delta}°C niedriger.`]);
    case "rain":
      return f.wetter
        ? s([`Es regnet mehr als in einem durchschnittlichen Monat ${inC} – etwa ${f.pct} % mehr.`, `Der Niederschlag liegt rund ${f.pct} % über dem Monatsmittel von ${city}.`])
        : s([`Es ist einer der trockeneren Monate, mit etwa ${f.pct} % weniger Regen als im Schnitt.`, `Der Niederschlag liegt deutlich unter dem Mittel von ${city} (rund ${f.pct} % weniger).`]);
    case "humid":
      return f.muggy
        ? s([`Bei rund ${f.h} % Luftfeuchte fühlen sich ${f.hi}°C schwüler an, als sie klingen.`, `Es ist feucht (etwa ${f.h} %), die Hitze wirkt drückender.`])
        : s([`Die Luft ist eher trocken (etwa ${f.h} % Luftfeuchte), warme Tage sind daher angenehm.`, `Niedrige Luftfeuchte (rund ${f.h} %) macht die Wärme gut erträglich.`]);
    case "sun":
      return f.sunny
        ? s([`Es ist einer der sonnigsten Monate, mit rund ${f.cloud} % Bewölkung.`, `Der Himmel ist jetzt so klar wie selten im Jahr.`])
        : s([`Es ist einer der trübsten Monate, mit etwa ${f.cloud} % Bewölkung.`, `Rechne mit mehr Wolken als zu jeder anderen Jahreszeit.`]);
    case "sibling":
      return f.diff > 0
        ? s([`Im ${M} ist es ${inC} meist rund ${f.diff}°C wärmer als in ${f.other.name}.`, `Verglichen mit ${f.other.name} ist ${city} in diesem Monat etwa ${f.diff}°C wärmer.`])
        : s([`Im ${M} ist es ${inC} meist rund ${-f.diff}°C kühler als in ${f.other.name}.`, `Verglichen mit ${f.other.name} ist ${city} in diesem Monat etwa ${-f.diff}°C kühler.`]);
    case "landmark":
      return "";
  }
}
