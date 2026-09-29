import type { Fact } from "@/lib/content/insights";
import { pick } from "@/lib/content/insights";
import type { Ctx } from "./index";

export function es(f: Fact, x: Ctx): string {
  const { city, M, seed } = x;
  const s = (o: string[]) => pick(`${seed}:${f.k}`, o);
  switch (f.k) {
    case "rank":
      if (f.pos === 1) return s([`${M} es el mes más caluroso del año en ${city}.`, `Ningún mes es más caluroso que ${M} en ${city}.`, `Si quieres ${city} en su punto más caluroso, el mes es ${M}.`]);
      if (f.pos === 12) return s([`${M} es el mes más frío del año en ${city}.`, `${city} registra sus temperaturas más bajas en ${M}.`]);
      if (f.pos <= 3) return s([`${M} está entre los tres meses más calurosos de ${city}.`, `${f.pos - 1 === 1 ? "Solo un mes es más caluroso" : `Solo ${f.pos - 1} meses son más calurosos`} que ${M} en ${city}.`]);
      return s([`${M} está entre los tres meses más frescos de ${city}.`, `${12 - f.pos === 1 ? "Solo un mes es más frío" : `Solo ${12 - f.pos} meses son más fríos`} que ${M} en ${city}.`]);
    case "season": {
      const n = { winter: "invierno", spring: "primavera", summer: "verano", autumn: "otoño" }[f.season];
      const phr = f.phase === "mid" ? `en pleno ${n}`.replace("pleno primavera", "plena primavera") : f.phase === "early" ? `a comienzos de${f.season === "spring" ? " la" : "l"} ${n}` : `a finales de${f.season === "spring" ? " la" : "l"} ${n}`;
      const south = f.south ? " (en el hemisferio sur las estaciones están invertidas)" : "";
      return s([`En ${M}, ${city} está ${phr}${south}.`, `En ${city}, ${M} cae ${phr}${south}.`]);
    }
    case "tropical":
      return f.wet
        ? s([`En ${M} es temporada de lluvias en ${city}: los chaparrones cortos e intensos son frecuentes.`, `${M} cae en plena estación húmeda en ${city}.`])
        : s([`En ${M} es temporada seca en ${city}, normalmente un buen momento para viajar.`, `Es una de las épocas más secas del año en ${city}.`]);
    case "swing":
      return f.big
        ? s([`Entre el día y la noche hay unos ${f.deg}°C de diferencia: lleva una capa para la noche.`, `Por la noche refresca bastante, con una oscilación de unos ${f.deg}°C.`])
        : s([`El día y la noche se parecen, apenas ${f.deg}°C de diferencia.`, `La oscilación térmica es pequeña, de unos ${f.deg}°C.`]);
    case "trend":
      return f.delta > 0
        ? s([`A partir de aquí el calor sube rápido: en ${x.monthName(f.next)} las máximas suben unos ${f.delta}°C.`, `Las temperaturas van en aumento: ${x.monthName(f.next)} es unos ${f.delta}°C más cálido.`])
        : s([`A partir de aquí refresca rápido: en ${x.monthName(f.next)} las máximas bajan unos ${-f.delta}°C.`, `Las temperaturas van a la baja: ${x.monthName(f.next)} es unos ${-f.delta}°C más fresco.`]);
    case "rain":
      return f.wetter
        ? s([`Llueve más que en un mes típico en ${city}: alrededor de un ${f.pct} % más.`, `Las lluvias superan la media de ${city} en torno a un ${f.pct} %.`])
        : s([`Es uno de los meses más secos, con un ${f.pct} % menos de lluvia que la media.`, `La lluvia queda muy por debajo de lo habitual en ${city} (alrededor de un ${f.pct} % menos).`]);
    case "humid":
      return f.muggy
        ? s([`Con una humedad cercana al ${f.h} %, los ${f.hi}°C se sienten más pesados.`, `Hay bastante humedad (en torno al ${f.h} %), así que el calor agobia más.`])
        : s([`El aire es bastante seco (humedad de un ${f.h} %), así que el calor se lleva bien.`, `La humedad baja (alrededor del ${f.h} %) hace que los días cálidos sean agradables.`]);
    case "sun":
      return f.sunny
        ? s([`Es uno de los meses más soleados, con una nubosidad de alrededor del ${f.cloud} %.`, `El cielo está entre los más despejados del año.`])
        : s([`Es uno de los meses más grises, con una nubosidad cercana al ${f.cloud} %.`, `Cuenta con más nubes que en cualquier otra época del año.`]);
    case "sibling":
      if (f.km) return f.diff > 0 ? s([`Este mes ${city} suele estar unos ${f.diff}°C más cálida que ${f.other.name}, a ${f.km} km.`, `A solo ${f.km} km, ${f.other.name} está unos ${f.diff}°C más fresca que ${city}.`]) : s([`Este mes ${city} suele estar unos ${-f.diff}°C más fresca que ${f.other.name}, a ${f.km} km.`, `A solo ${f.km} km, ${f.other.name} está unos ${-f.diff}°C más cálida que ${city}.`]);
      return f.diff > 0
        ? s([`En ${M}, ${city} suele estar unos ${f.diff}°C más cálida que ${f.other.name}.`, `Comparada con ${f.other.name}, ${city} es unos ${f.diff}°C más cálida este mes.`])
        : s([`En ${M}, ${city} suele estar unos ${-f.diff}°C más fresca que ${f.other.name}.`, `Comparada con ${f.other.name}, ${city} es unos ${-f.diff}°C más fresca este mes.`]);
    case "nights":
      return f.frost
        ? s([`Por la noche suele helar (mínima media de ${f.lo}°C): cuidado con las heladas y el hielo por la mañana.`, `Las mañanas son frías: la mínima media es de ${f.lo}°C y las heladas son frecuentes.`])
        : s([`Las noches son calurosas, rara vez por debajo de ${f.lo}°C: el aire acondicionado se agradece.`, `Incluso de noche el termómetro se queda en torno a ${f.lo}°C (noches tropicales).`]);
    case "beach":
      return s([`Con máximas de unos ${f.hi}°C, poca lluvia y mucho sol, es tiempo de playa y piscina.`, `Sol, calor (unos ${f.hi}°C) y días secos: ${M} es buen mes para ir a la playa.`]);
    case "landmark":
      return "";
  }
}
