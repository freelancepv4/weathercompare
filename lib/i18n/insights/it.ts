import type { Fact } from "@/lib/content/insights";
import { pick } from "@/lib/content/insights";
import type { Ctx } from "./index";


export function it(f: Fact, x: Ctx): string {
  const { city, inC, M, IN, seed } = x;
  const s = (o: string[]) => pick(`${seed}:${f.k}`, o);
  switch (f.k) {
    case "rank":
      if (f.pos === 1) return s([`${M} è il mese più caldo dell'anno ${inC}.`, `Se cerchi ${city} al massimo del caldo, il mese giusto è ${M}.`, `Nessun mese ${inC} è più caldo di ${M}.`]);
      if (f.pos === 12) return s([`${M} è il mese più freddo dell'anno ${inC}.`, `${city} tocca le temperature più basse proprio ${IN}.`]);
      if (f.pos <= 3) return s([`${M} è tra i tre mesi più caldi ${inC}.`, `${f.pos - 1 === 1 ? "Solo un mese è più caldo" : `Solo ${f.pos - 1} mesi sono più caldi`} di ${M} ${inC}.`]);
      return s([`${M} è tra i tre mesi più freschi ${inC}.`, `${12 - f.pos === 1 ? "Solo un mese è più freddo" : `Solo ${12 - f.pos} mesi sono più freddi`} di ${M} ${inC}.`]);
    case "season": {
      const art = { winter: "dell'inverno", spring: "della primavera", summer: "dell'estate", autumn: "dell'autunno" }[f.season];
      const full = { winter: "pieno inverno", spring: "piena primavera", summer: "piena estate", autumn: "pieno autunno" }[f.season];
      const phr = f.phase === "mid" ? `in ${full}` : f.phase === "early" ? `all'inizio ${art}` : `alla fine ${art}`;
      const south = f.south ? " (nell'emisfero sud le stagioni sono invertite)" : "";
      return s([`${cap(IN)} ${inC} siamo ${phr}${south}.`, `Per ${city}, ${M} cade ${phr}${south}.`]);
    }
    case "tropical":
      return f.wet
        ? s([`${cap(IN)} ${inC} è stagione delle piogge: acquazzoni brevi ma intensi sono frequenti.`, `È il periodo più piovoso ${inC}, con temporali improvvisi.`])
        : s([`${cap(IN)} ${inC} è stagione secca, di solito un buon momento per il viaggio.`, `È uno dei periodi più asciutti dell'anno ${inC}.`]);
    case "swing":
      return f.big
        ? s([`Tra giorno e notte ci sono circa ${f.deg}°C di differenza: serve uno strato in più la sera.`, `Le serate rinfrescano parecchio, con uno sbalzo di circa ${f.deg}°C.`])
        : s([`Giorno e notte hanno temperature simili, a soli ${f.deg}°C di distanza.`, `L'escursione termica è minima, circa ${f.deg}°C.`]);
    case "trend":
      return f.delta > 0
        ? s([`Da qui il caldo sale in fretta: ${x.inMonth(f.next)} le massime sono circa ${f.delta}°C più alte.`, `Le temperature sono in salita: ${x.monthName(f.next)} è più caldo di circa ${f.delta}°C.`])
        : s([`Da qui si rinfresca rapidamente: ${x.inMonth(f.next)} le massime scendono di circa ${-f.delta}°C.`, `Le temperature sono in calo: ${x.monthName(f.next)} è più fresco di circa ${-f.delta}°C.`]);
    case "rain":
      return f.wetter
        ? s([`Piove più del solito ${inC}: circa il ${f.pct}% in più rispetto al mese medio.`, `È un mese più piovoso della media, con circa il ${f.pct}% di pioggia in più.`])
        : s([`È tra i mesi più asciutti, con circa il ${f.pct}% di pioggia in meno della media.`, `La pioggia è ben sotto la media ${inC} (circa il ${f.pct}% in meno).`]);
    case "humid":
      return f.muggy
        ? s([`Con un'umidità vicina al ${f.h}%, i ${f.hi}°C si sentono di più: è afoso.`, `L'aria è umida (circa ${f.h}%) e il caldo risulta più pesante.`])
        : s([`L'aria è piuttosto secca (umidità intorno al ${f.h}%), quindi il caldo si sopporta bene.`, `L'umidità bassa (circa ${f.h}%) rende le giornate calde piacevoli.`]);
    case "sun":
      return f.sunny
        ? s([`È uno dei mesi più soleggiati, con nuvolosità intorno al ${f.cloud}%.`, `Il cielo è tra i più limpidi dell'anno.`])
        : s([`È uno dei mesi più grigi, con nuvolosità vicina al ${f.cloud}%.`, `Aspettati più nuvole che in qualsiasi altro periodo dell'anno.`]);
    case "sibling":
      return f.diff > 0
        ? s([`${cap(IN)} ${city} è in media circa ${f.diff}°C più calda di ${f.other.name}.`, `Rispetto a ${f.other.name}, ${city} è più calda di circa ${f.diff}°C in questo mese.`])
        : s([`${cap(IN)} ${city} è in media circa ${-f.diff}°C più fresca di ${f.other.name}.`, `Rispetto a ${f.other.name}, ${city} è più fresca di circa ${-f.diff}°C in questo mese.`]);
    case "landmark":
      return "";
  }
}

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
