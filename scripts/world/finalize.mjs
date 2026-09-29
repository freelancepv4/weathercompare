// Merges world-pick.json + Wikidata names (wd.txt, countries.txt) into the
// repo's lib/data/world.json, and climate rows (climate.txt) into climate-world.json.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { countries: CL } = require("countries-list");
const REPO = "/home/claude/weathercompare";
const pick = JSON.parse(readFileSync("world-pick.json", "utf8"));

const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ø/g, "o").replace(/æ/g, "ae").replace(/ß/g, "ss").replace(/ł/g, "l").replace(/đ/g, "d").replace(/ı/g, "i").replace(/ħ/g, "h").toLowerCase();
const slugify = (s) => fold(s).replace(/['’`]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ---- wikidata city rows: gn|links|pop|en|it|de|fr|es|pt|nl|pl|tr
const wd = {};
for (const line of readFileSync("wd.txt", "utf8").split("\n")) {
  const p = line.split("|");
  wd[p[0]] = { links: +p[1], pop: +p[2], names: p.slice(3) };
}
const BAD = /(mairie|municip|gmina|jednostka|distret|district|urban area|prefectur|provinc|metropol|comune di|\(|\)|,|\bcity\b(?! of)|stadtkreis|kreisfreie|regional unit|arrondissement|landkreis|okres|powiat|città metropolitana|área metropolitana)/i;
const PREFIX = /^(ciudad de |ville de |stadt |città di |cidade de |miasto |gemeente |cité de )/i;
function clean(label) {
  if (!label) return "";
  let s = label.replace(PREFIX, "").trim();
  if (BAD.test(s)) return "";
  if (/[Ѐ-ӿ؀-ۿऀ-ॿ぀-ヿ一-鿿가-힯]/.test(s)) return ""; // non-Latin scripts
  if (/[āīūṭḍṇṣṛ]/.test(s)) return ""; // scholarly transliterations
  return ov(s);
}
const OVERRIDE = {
  "Heroica Puebla de Zaragoza": "Puebla", "León de Los Aldama": "León", "León de los Aldama": "León", "Acapulco de Juárez": "Acapulco",
  "Santiago de Querétaro": "Querétaro", "Victoria de Durango": "Durango", "Heroica Matamoros": "Matamoros", "Xalapa-Enríquez": "Xalapa",
  "Xalapa de Enríquez": "Xalapa", "Heroica Nogales": "Nogales", "Heroica Veracruz": "Veracruz", "San Francisco de Campeche": "Campeche",
  "Oaxaca de Juárez": "Oaxaca", "Tuxtla": "Tuxtla Gutiérrez", "Heroica Guaymas": "Guaymas", "Heroica Caborca": "Caborca",
  "Heroica Zitácuaro": "Zitácuaro", "Lexington-Fayette": "Lexington", "Ciudad General Escobedo": "General Escobedo",
  "San Fernando del Valle de Catamarca": "Catamarca", "Tapachula de Córdova y Ordóñez": "Tapachula", "Chilpancingo de los Bravo": "Chilpancingo",
  "Heroica Ciudad de Tlaxiaco": "Tlaxiaco", "Heroica Huajuapan de León": "Huajuapan de León", "Cuauhtémoc": "Cuauhtémoc",
};
const ov = (n) => OVERRIDE[n] ?? n;
function cleanGeo(name) {
  name = ov(name);
  if (name === "Gasteiz / Vitoria") return "Vitoria-Gasteiz";
  if (name.includes(" / ")) return name.split(" / ").pop().trim();
  return name;
}
const KEEP_CITY = /^(kuwait city|panama city|gaza city|mexico city|quebec city|guatemala city|belize city|ho chi minh city|cebu city|davao city|jeju city|kansas city|oklahoma city|salt lake city|carson city|panama city beach)$/i;

// ---- countries (wikidata): ISO|en|it|de|fr|es|pt|nl|pl|tr
const coNames = {};
if (existsSync("countries.txt")) for (const line of readFileSync("countries.txt", "utf8").split("\n")) {
  const p = line.split("|");
  if (p.length >= 10) coNames[p[0]] = p.slice(2, 10);
}
const places = readFileSync(`${REPO}/lib/i18n/places.ts`, "utf8");
const placeKeys = new Set([...places.matchAll(/^ {2}"?([a-z0-9-]+)"?: \[/gm)].map((m) => m[1]));
const curatedSrc = readFileSync(`${REPO}/config/countries.ts`, "utf8");
const usedSlugs = new Set([...placeKeys, ...[...curatedSrc.matchAll(/\{ slug: "([^"]+)", name:/g)].map((m) => m[1])]);

const MIDEAST = new Set("AE SA QA KW BH OM YE IQ IR JO LB SY IL PS".split(" "));
function region(iso) {
  const c = CL[iso]?.continent;
  if (iso === "RU" || iso === "TR" || iso === "CY") return "Europe";
  if (MIDEAST.has(iso) || c === "AF") return "Middle East & Africa";
  return { EU: "Europe", AS: "Asia", NA: "Americas", SA: "Americas", OC: "Oceania", AN: "Oceania" }[c] ?? "Other";
}

// climate
const climate = {};
if (existsSync("climate.txt")) for (const line of readFileSync("climate.txt", "utf8").split("\n")) {
  const [gn, data] = line.split("|");
  if (!data) continue;
  const arr = data.split("/").map((s) => s.split(",").map(Number));
  if (arr.length === 5 && arr.every((a) => a.length === 12 && a.every((v) => Number.isFinite(v)))) climate[gn] = arr;
}

const COUNTRY_FIX = {
  "republic-of-the-gambia": { slug: "gambia", n: "Gambia" },
};
const NAME_FIX = {
  CN: ["Cina", "China", "Chine", "China", "China", "China", "Chiny", "Çin"],
  CZ: ["Repubblica Ceca", "Tschechien", "Tchéquie", "Chequia", "Chéquia", "Tsjechië", "Czechy", "Çekya"],
  FM: ["Micronesia", "Mikronesien", "Micronésie", "Micronesia", "Micronésia", "Micronesië", "Mikronezja", "Mikronezya"],
};
const out = { countries: {} };
const climateOut = {};
let renamed = 0, localized = 0, dropped = 0;
for (let [cslug, co] of Object.entries(pick)) {
  if (COUNTRY_FIX[cslug]) { co = { ...co, name: COUNTRY_FIX[cslug].n }; cslug = COUNTRY_FIX[cslug].slug; }
  const isCurated = new RegExp(`^ {4}slug: "${cslug}",`, "m").test(curatedSrc);
  const entry = { n: co.name, iso: co.iso, r: region(co.iso), c: [] };
  if (!isCurated && coNames[co.iso]) {
    const l = coNames[co.iso].map((s, i) => (s && s !== co.name ? s : ""));
    if (l.some(Boolean)) entry.l = coNames[co.iso].map((s) => s || co.name);
  }
  if (NAME_FIX[co.iso]) entry.l = NAME_FIX[co.iso];
  for (const row of co.cities) {
    const [, geoName, reg, lat, lon, pop, tz, gn, tourist] = row;
    const w = wd[String(gn)];
    // GeoNames population clearly bogus vs Wikidata (e.g. a hamlet listed with 300k)
    if (w && w.pop > 0 && pop > 200000 && pop > w.pop * 8 && w.links >= 5) { dropped++; continue; }
    let name = cleanGeo(geoName);
    if (w && w.links >= 20) {
      const en = w.names[0];
      const c = KEEP_CITY.test(en) ? en : clean(en);
      if (c && c !== name && !OVERRIDE[geoName]) { name = c; renamed++; }
    }
    let slug = slugify(name);
    if (!slug) continue;
    if (usedSlugs.has(slug)) slug = `${slug}-${cslug}`;
    if (usedSlugs.has(slug)) slug = `${slugify(name)}-${slugify(reg)}-${cslug}`;
    if (usedSlugs.has(slug)) continue;
    usedSlugs.add(slug);
    const r = [slug, name, reg, lat, lon, w?.pop > 0 && pop < 1000 ? w.pop : pop, tz, tourist ? 1 : 0];
    if (w && w.links >= 5) {
      const long = fold(geoName);
      const loc = w.names.slice(1).map((s) => { const c = clean(s); return c && fold(c) === long ? name : c; });
      if (loc.some((s) => s && s !== name)) {
        r.push(loc.map((s) => s || name));
        localized++;
      }
    }
    entry.c.push(r);
    if (climate[String(gn)]) climateOut[`${cslug}/${slug}`] = climate[String(gn)];
  }
  if (entry.c.length) out.countries[cslug] = entry;
}
writeFileSync(`${REPO}/lib/data/world.json`, JSON.stringify(out));
writeFileSync(
  `${REPO}/lib/data/climate-world.json`,
  JSON.stringify({ source: "NASA POWER daily data (https://power.larc.nasa.gov), 2011–2020 monthly averages", generatedAt: new Date().toISOString().slice(0, 10), cities: climateOut })
);
const n = Object.values(out.countries).reduce((s, c) => s + c.c.length, 0);
console.log({ cities: n, countries: Object.keys(out.countries).length, renamed, localized, dropped, climate: Object.keys(climateOut).length });

// Drop climate for world cities whose numbers are identical to another page's
// (same NASA grid cell as a curated city — e.g. Monaco/Nice): their month pages
// would be duplicates, so they keep only the live-forecast page.
{
  const cur = JSON.parse(readFileSync(`${REPO}/lib/data/climate.json`, "utf8")).cities;
  const seen = new Map(Object.entries(cur).map(([k, c]) => [JSON.stringify([c.tMax, c.tMin, c.precipMm, c.humidity, c.cloud]), k]));
  const file = JSON.parse(readFileSync(`${REPO}/lib/data/climate-world.json`, "utf8"));
  for (const [k, v] of Object.entries(file.cities)) {
    const s = JSON.stringify(v);
    if (seen.has(s)) { console.log("duplicate climate, dropped:", k, "=", seen.get(s)); delete file.cities[k]; }
    else seen.set(s, k);
  }
  writeFileSync(`${REPO}/lib/data/climate-world.json`, JSON.stringify(file));
}
