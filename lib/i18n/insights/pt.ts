import type { Fact } from "@/lib/content/insights";
import { pick } from "@/lib/content/insights";
import type { Ctx } from "./index";

export function pt(f: Fact, x: Ctx): string {
  const { city, inC, M, seed } = x;
  const s = (o: string[]) => pick(`${seed}:${f.k}`, o);
  switch (f.k) {
    case "rank":
      if (f.pos === 1) return s([`${M} é o mês mais quente do ano ${inC}.`, `Nenhum mês é mais quente do que ${M} ${inC}.`, `Para apanhar ${city} no seu ponto mais quente, o mês certo é ${M}.`]);
      if (f.pos === 12) return s([`${M} é o mês mais frio do ano ${inC}.`, `É em ${M} que ${city} regista as temperaturas mais baixas.`]);
      if (f.pos <= 3) return s([`${M} está entre os três meses mais quentes ${inC}.`, `${f.pos - 1 === 1 ? "Só um mês é mais quente" : `Só ${f.pos - 1} meses são mais quentes`} do que ${M} ${inC}.`]);
      return s([`${M} está entre os três meses mais frescos ${inC}.`, `${12 - f.pos === 1 ? "Só um mês é mais frio" : `Só ${12 - f.pos} meses são mais frios`} do que ${M} ${inC}.`]);
    case "season": {
      const n = { winter: "inverno", spring: "primavera", summer: "verão", autumn: "outono" }[f.season];
      const da = f.season === "spring" ? "da" : "do";
      const phr = f.phase === "mid" ? `em pleno ${n}`.replace("pleno primavera", "plena primavera") : f.phase === "early" ? `no início ${da} ${n}` : `no fim ${da} ${n}`;
      const south = f.south ? " (no hemisfério sul as estações são invertidas)" : "";
      return s([`Em ${M}, ${city} está ${phr}${south}.`, `${inC.charAt(0).toUpperCase() + inC.slice(1)}, ${M} calha ${phr}${south}.`]);
    }
    case "tropical":
      return f.wet
        ? s([`Em ${M} é época das chuvas ${inC}: aguaceiros curtos e fortes são frequentes.`, `${M} calha em plena estação húmida ${inC}.`])
        : s([`Em ${M} é época seca ${inC}, normalmente uma boa altura para viajar.`, `É uma das alturas mais secas do ano ${inC}.`]);
    case "swing":
      return f.big
        ? s([`Entre o dia e a noite há cerca de ${f.deg}°C de diferença: leve uma camada extra para a noite.`, `As noites arrefecem bastante, com uma amplitude de cerca de ${f.deg}°C.`])
        : s([`O dia e a noite são parecidos, apenas ${f.deg}°C de diferença.`, `A amplitude térmica é pequena, à volta de ${f.deg}°C.`]);
    case "trend":
      return f.delta > 0
        ? s([`A partir daqui aquece depressa: em ${x.monthName(f.next)} as máximas sobem cerca de ${f.delta}°C.`, `As temperaturas estão a subir: ${x.monthName(f.next)} é cerca de ${f.delta}°C mais quente.`])
        : s([`A partir daqui arrefece depressa: em ${x.monthName(f.next)} as máximas descem cerca de ${-f.delta}°C.`, `As temperaturas estão a descer: ${x.monthName(f.next)} é cerca de ${-f.delta}°C mais fresco.`]);
    case "rain":
      return f.wetter
        ? s([`Chove mais do que num mês típico ${inC}: cerca de ${f.pct}% mais.`, `A chuva fica cerca de ${f.pct}% acima da média ${inC}.`])
        : s([`É um dos meses mais secos, com cerca de ${f.pct}% menos chuva do que a média.`, `A chuva fica bem abaixo do habitual ${inC} (cerca de ${f.pct}% menos).`]);
    case "humid":
      return f.muggy
        ? s([`Com humidade perto dos ${f.h}%, os ${f.hi}°C parecem mais abafados.`, `O ar está húmido (cerca de ${f.h}%), por isso o calor pesa mais.`])
        : s([`O ar é bastante seco (humidade de cerca de ${f.h}%), por isso o calor é agradável.`, `A humidade baixa (à volta de ${f.h}%) torna os dias quentes fáceis de suportar.`]);
    case "sun":
      return f.sunny
        ? s([`É um dos meses com mais sol, com nebulosidade à volta de ${f.cloud}%.`, `O céu está entre os mais limpos do ano.`])
        : s([`É um dos meses mais cinzentos, com nebulosidade perto de ${f.cloud}%.`, `Conte com mais nuvens do que em qualquer outra altura do ano.`]);
    case "sibling":
      if (f.km) return f.diff > 0 ? s([`Este mês, ${city} costuma estar cerca de ${f.diff}°C mais quente do que ${f.other.name}, a ${f.km} km.`, `A apenas ${f.km} km, ${f.other.name} fica cerca de ${f.diff}°C mais fresca do que ${city}.`]) : s([`Este mês, ${city} costuma estar cerca de ${-f.diff}°C mais fresca do que ${f.other.name}, a ${f.km} km.`, `A apenas ${f.km} km, ${f.other.name} fica cerca de ${-f.diff}°C mais quente do que ${city}.`]);
      return f.diff > 0
        ? s([`Em ${M}, ${city} costuma estar cerca de ${f.diff}°C mais quente do que ${f.other.name}.`, `Em comparação com ${f.other.name}, ${city} está cerca de ${f.diff}°C mais quente neste mês.`])
        : s([`Em ${M}, ${city} costuma estar cerca de ${-f.diff}°C mais fresca do que ${f.other.name}.`, `Em comparação com ${f.other.name}, ${city} está cerca de ${-f.diff}°C mais fresca neste mês.`]);
    case "nights":
      return f.frost
        ? s([`À noite a temperatura desce muitas vezes abaixo de zero (mínima média de ${f.lo}°C): conte com geada de manhã.`, `As manhãs são frias: a mínima média é de ${f.lo}°C e a geada é frequente.`])
        : s([`As noites continuam quentes, raramente abaixo de ${f.lo}°C: o ar condicionado dá jeito.`, `Mesmo depois do pôr do sol, a temperatura fica perto dos ${f.lo}°C.`]);
    case "beach":
      return s([`Com máximas perto dos ${f.hi}°C, pouca chuva e muito sol, é tempo de praia e piscina.`, `Sol, calor (cerca de ${f.hi}°C) e dias secos: ${M} é um bom mês para praia.`]);
    case "landmark":
      return "";
  }
}
