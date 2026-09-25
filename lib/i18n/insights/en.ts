import type { Fact } from "@/lib/content/insights";
import { pick } from "@/lib/content/insights";
import type { Ctx } from "./index";

const SEASON = { winter: "winter", spring: "spring", summer: "summer", autumn: "autumn" };
const PHASE = { early: "early", mid: "mid-", late: "late" };
const ord = (n: number) => (n === 2 ? "second" : n === 3 ? "third" : `${n}th`);

export function en(f: Fact, x: Ctx): string {
  const { city, M, seed } = x;
  const s = (opts: string[]) => pick(`${seed}:${f.k}`, opts);
  switch (f.k) {
    case "rank":
      if (f.pos === 1) return s([`${M} is the warmest month of the year in ${city}.`, `Nowhere in ${city}'s calendar is warmer than ${M}.`, `If you want ${city} at its hottest, ${M} is the month.`]);
      if (f.pos === 12) return s([`${M} is the coldest month of the year in ${city}.`, `${city} is at its chilliest in ${M}.`, `No month in ${city} is cooler than ${M}.`]);
      if (f.pos <= 3) return s([`${M} is ${city}'s ${ord(f.pos)} warmest month.`, `Only ${f.pos - 1 === 1 ? "one month is" : `${f.pos - 1} months are`} warmer in ${city} than ${M}.`]);
      return s([`${M} is among ${city}'s three coolest months.`, `Only ${12 - f.pos === 1 ? "one month is" : `${12 - f.pos} months are`} cooler in ${city} than ${M}.`]);
    case "season": {
      const phr = `${PHASE[f.phase]}${f.phase === "mid" ? "" : " "}${SEASON[f.season]}`;
      const south = f.south ? " — the seasons are reversed south of the equator" : "";
      return s([`In ${city}, ${M} is ${phr}${south}.`, `${M} brings ${phr} to ${city}${south}.`, `Seasonally, ${M} counts as ${phr} in ${city}${south}.`]);
    }
    case "tropical":
      return f.wet
        ? s([`${M} falls in ${city}'s wetter season, when heavy showers are common.`, `This is rainy-season territory in ${city}: short, heavy downpours are typical.`])
        : s([`${M} sits in ${city}'s drier season — usually a comfortable time to visit.`, `It's one of the drier stretches of the year in ${city}.`]);
    case "swing":
      return f.big
        ? s([`Expect a big gap between day and night — about ${f.deg}°C.`, `Evenings cool off sharply: the daily range is around ${f.deg}°C, so pack a layer.`, `Afternoons and nights feel like different seasons, roughly ${f.deg}°C apart.`])
        : s([`Days and nights are close, only about ${f.deg}°C apart.`, `There's little difference between day and night (around ${f.deg}°C).`]);
    case "trend":
      return f.delta > 0
        ? s([`It warms up quickly from here: by ${x.monthName(f.next)} highs are about ${f.delta}°C higher.`, `Temperatures are climbing — ${x.monthName(f.next)} is around ${f.delta}°C warmer.`])
        : s([`It cools down fast from here: ${x.monthName(f.next)} is about ${-f.delta}°C cooler.`, `Temperatures are falling — expect highs around ${-f.delta}°C lower by ${x.monthName(f.next)}.`]);
    case "rain":
      return f.wetter
        ? s([`It's wetter than a typical month in ${city} — roughly ${f.pct}% more rain than average.`, `Rain is above ${city}'s usual level, by about ${f.pct}%.`])
        : s([`It's one of the drier months, with about ${f.pct}% less rain than ${city}'s average.`, `Rain is well below ${city}'s usual level (around ${f.pct}% less).`]);
    case "humid":
      return f.muggy
        ? s([`Humidity near ${f.h}% makes ${f.hi}°C feel stickier than it sounds.`, `It's humid — around ${f.h}% — so the heat feels heavier.`])
        : s([`The air is fairly dry (about ${f.h}% humidity), so warm days feel comfortable.`, `Low humidity (around ${f.h}%) keeps the warmth pleasant rather than muggy.`]);
    case "sun":
      return f.sunny
        ? s([`It's one of the sunniest months here, with cloud cover around ${f.cloud}%.`, `Skies are at their clearest this time of year.`])
        : s([`It's one of the greyest months, with cloud cover near ${f.cloud}%.`, `Expect more cloud than at any other time of year.`]);
    case "sibling":
      return f.diff > 0
        ? s([`${city} is usually about ${f.diff}°C warmer than ${f.other.name} in ${M}.`, `Compared with ${f.other.name}, ${city} runs roughly ${f.diff}°C warmer this month.`])
        : s([`${city} is usually about ${-f.diff}°C cooler than ${f.other.name} in ${M}.`, `Compared with ${f.other.name}, ${city} runs roughly ${-f.diff}°C cooler this month.`]);
    case "landmark": {
      const [a, b] = f.names;
      if (f.mode === "early") return s([`With the heat, see ${a} early in the morning or late in the afternoon.`, `Plan ${a} for the cooler hours — early morning is best.`]);
      if (f.mode === "rainy") return s([`Keep a flexible plan: if showers roll in, shift ${a} to a drier part of the day.`, `Check the hourly forecast before heading to ${a} — showers are likely.`]);
      if (f.mode === "cold") return s([`Dress warmly for ${a}: short, cold days are the norm.`, `Short daylight hours mean ${a} is best seen around midday.`]);
      return s([`Good walking weather for combining ${a} and ${b} in one day.`, `Comfortable temperatures make it easy to walk between ${a} and ${b}.`]);
    }
  }
}
