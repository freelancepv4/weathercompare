import type { Fact } from "@/lib/content/insights";
import { pick } from "@/lib/content/insights";
import type { Ctx } from "./index";

/**
 * Polish avoids city-name declension by using the prepared locative phrase
 * (x.inC = "w Rzymie") or a neutral "(Rzym)" construction.
 */
export function pl(f: Fact, x: Ctx): string {
  const { city, inC, M, IN, seed } = x;
  const s = (o: string[]) => pick(`${seed}:${f.k}`, o);
  switch (f.k) {
    case "rank":
      if (f.pos === 1) return s([`${M} to najcieplejszy miesiąc w roku ${inC}.`, `${inC} nigdy nie jest cieplej niż ${IN}.`, `Kto chce poczuć największe ciepło ${inC}, powinien przyjechać ${IN}.`]);
      if (f.pos === 12) return s([`${M} to najzimniejszy miesiąc w roku ${inC}.`, `${inC} nigdy nie jest zimniej niż ${IN}.`]);
      if (f.pos <= 3) return s([`${M} należy do trzech najcieplejszych miesięcy ${inC}.`, `${f.pos - 1 === 1 ? `Tylko jeden miesiąc jest ${inC} cieplejszy` : `Tylko ${f.pos - 1} miesiące są ${inC} cieplejsze`} niż ${M}.`]);
      return s([`${M} należy do trzech najchłodniejszych miesięcy ${inC}.`, `${12 - f.pos === 1 ? `Tylko jeden miesiąc jest ${inC} zimniejszy` : `Tylko ${12 - f.pos} miesiące są ${inC} zimniejsze`} niż ${M}.`]);
    case "season": {
      const n = { winter: "zimy", spring: "wiosny", summer: "lata", autumn: "jesieni" }[f.season];
      const mid = { winter: "środek zimy", spring: "pełnia wiosny", summer: "środek lata", autumn: "pełnia jesieni" }[f.season];
      const phr = f.phase === "mid" ? mid : f.phase === "early" ? `początek ${n}` : `koniec ${n}`;
      const south = f.south ? " (na półkuli południowej pory roku są odwrócone)" : "";
      return s([`${IN} ${inC} to ${phr}${south}.`, `Dla miasta ${city} ${M} oznacza ${phr}${south}.`]);
    }
    case "tropical":
      return f.wet
        ? s([`${IN} ${inC} trwa pora deszczowa: częste są krótkie, gwałtowne ulewy.`, `${M} przypada ${inC} na porę deszczową.`])
        : s([`${IN} ${inC} trwa pora sucha – zwykle dobry czas na podróż.`, `To jeden z najsuchszych okresów w roku ${inC}.`]);
    case "swing":
      return f.big
        ? s([`Między dniem a nocą jest około ${f.deg}°C różnicy – weź cieplejszą warstwę na wieczór.`, `Wieczory są wyraźnie chłodniejsze, dobowa amplituda to około ${f.deg}°C.`])
        : s([`Dzień i noc niewiele się różnią – tylko około ${f.deg}°C.`, `Dobowe wahania temperatury są małe, około ${f.deg}°C.`]);
    case "trend":
      return f.delta > 0
        ? s([`Od teraz szybko się ociepla: ${x.inMonth(f.next)} maksima są wyższe o około ${f.delta}°C.`, `Temperatury rosną – ${x.inMonth(f.next)} jest cieplej o około ${f.delta}°C.`])
        : s([`Od teraz szybko się ochładza: ${x.inMonth(f.next)} maksima spadają o około ${-f.delta}°C.`, `Temperatury spadają – ${x.inMonth(f.next)} jest chłodniej o około ${-f.delta}°C.`]);
    case "rain":
      return f.wetter
        ? s([`Pada więcej niż w typowym miesiącu ${inC} – o około ${f.pct}%.`, `Opady są o około ${f.pct}% wyższe od średniej ${inC}.`])
        : s([`To jeden z suchszych miesięcy – deszczu jest o około ${f.pct}% mniej niż średnio.`, `Opady są wyraźnie poniżej normy ${inC} (o około ${f.pct}% mniej).`]);
    case "humid":
      return f.muggy
        ? s([`Przy wilgotności około ${f.h}% ${f.hi}°C odczuwa się jako parne.`, `Jest wilgotno (około ${f.h}%), więc upał jest bardziej męczący.`])
        : s([`Powietrze jest dość suche (wilgotność około ${f.h}%), więc ciepło jest przyjemne.`, `Niska wilgotność (około ${f.h}%) sprawia, że ciepłe dni łatwo znieść.`]);
    case "sun":
      return f.sunny
        ? s([`To jeden z najbardziej słonecznych miesięcy – zachmurzenie wynosi około ${f.cloud}%.`, `Niebo jest teraz jednym z najczystszych w roku.`])
        : s([`To jeden z najbardziej pochmurnych miesięcy – zachmurzenie sięga około ${f.cloud}%.`, `Chmur jest więcej niż o każdej innej porze roku.`]);
    case "sibling":
      if (f.km) return f.diff > 0 ? s([`${city} jest w tym miesiącu zwykle o ok. ${f.diff}°C cieplejsze niż ${f.other.name} (${f.km} km dalej).`, `Tylko ${f.km} km, a ${f.other.name} jest o ok. ${f.diff}°C chłodniejsze niż ${city}.`]) : s([`${city} jest w tym miesiącu zwykle o ok. ${-f.diff}°C chłodniejsze niż ${f.other.name} (${f.km} km dalej).`, `Tylko ${f.km} km, a ${f.other.name} jest o ok. ${-f.diff}°C cieplejsze niż ${city}.`]);
      return f.diff > 0
        ? s([`${IN} ${inC} jest zwykle o około ${f.diff}°C cieplej niż w mieście ${f.other.name}.`, `W porównaniu z miastem ${f.other.name} ${inC} jest w tym miesiącu cieplej o około ${f.diff}°C.`])
        : s([`${IN} ${inC} jest zwykle o około ${-f.diff}°C chłodniej niż w mieście ${f.other.name}.`, `W porównaniu z miastem ${f.other.name} ${inC} jest w tym miesiącu chłodniej o około ${-f.diff}°C.`]);
    case "nights":
      return f.frost
        ? s([`Noce są często mroźne (średnia minimalna ${f.lo}°C), rano może być ślisko.`, `Poranki są zimne: średnia temperatura minimalna to ${f.lo}°C, przymrozki są częste.`])
        : s([`Noce pozostają ciepłe, rzadko poniżej ${f.lo}°C – przyda się klimatyzacja.`, `Nawet po zmroku temperatura trzyma się około ${f.lo}°C.`]);
    case "beach":
      return s([`Maksima około ${f.hi}°C, mało deszczu i dużo słońca – to pogoda na plażę i basen.`, `Słońce, ciepło (około ${f.hi}°C) i suche dni: dobry czas na plażę.`]);
    case "landmark":
      return "";
  }
}
