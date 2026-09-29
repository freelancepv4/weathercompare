// Picks ~1,700 new cities worldwide for weathercompare.eu.
// Rule: one city per NASA POWER grid cell (0.5° lat x 0.625° lon), so every
// city's climate pages carry their own numbers — no two pages share data.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { TOURIST } from "./tourist.mjs";
const require = createRequire(import.meta.url);
const all = require("all-the-cities");
const admin1 = Object.fromEntries(require("cities.json/admin1.json").map((a) => [a.code, a.name]));
const tzlookup = require("tz-lookup");
const isoC = require("i18n-iso-countries");
isoC.registerLocale(require("i18n-iso-countries/langs/en.json"));

const TARGET_TOTAL = Number(process.env.TARGET || 1830);
const REPO = "/home/claude/weathercompare";

const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ø/g, "o").replace(/æ/g, "ae").replace(/ß/g, "ss").replace(/ł/g, "l").replace(/đ/g, "d").replace(/ı/g, "i").replace(/ħ/g, "h").toLowerCase();
const slugify = (s) => fold(s).replace(/['’`]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const cell = (lat, lon) => `${Math.round(lat / 0.5)}:${Math.round(lon / 0.625)}`;

// ---- curated cities already on the site
const src = readFileSync(`${REPO}/config/countries.ts`, "utf8");
const curated = [];
const isoBySlug = {};
let cur = null;
for (const line of src.split("\n")) {
  const m = line.match(/^ {4}slug: "([^"]+)",/);
  if (m) cur = m[1];
  const iso = line.match(/^ {4}isoCode: "([A-Z]{2})"/);
  if (iso && cur) isoBySlug[cur] = iso[1];
  const c = line.match(/\{\s*slug: "([^"]+)",\s*name: "([^"]+)".*?lat: (-?[\d.]+), lon: (-?[\d.]+)/);
  if (c && cur) curated.push({ country: cur, slug: c[1], name: c[2], lat: +c[3], lon: +c[4] });
}
const countrySlugByIso = Object.fromEntries(Object.entries(isoBySlug).map(([s, i]) => [i, s]));
const placesSrc = readFileSync(`${REPO}/lib/i18n/places.ts`, "utf8");
const placeKeys = new Set([...placesSrc.matchAll(/^ {2}"?([a-z0-9-]+)"?: \[/gm)].map((m) => m[1]));

// ---- countries
const EN_NAME = {
  CN: "China", US: "USA", GB: "UK", RU: "Russia", IR: "Iran", TW: "Taiwan", LA: "Laos", SY: "Syria", TZ: "Tanzania", KR: "South Korea",
  KP: "North Korea", CD: "DR Congo", CG: "Republic of the Congo", CI: "Ivory Coast", MK: "North Macedonia", MD: "Moldova",
  PS: "Palestine", FM: "Micronesia", VA: "Vatican City", BN: "Brunei", CZ: "Czech Republic", BO: "Bolivia", VE: "Venezuela",
  VN: "Vietnam", RE: "Réunion", BQ: "Caribbean Netherlands", SX: "Sint Maarten", MF: "Saint Martin", BL: "Saint Barthélemy",
  VI: "US Virgin Islands", VG: "British Virgin Islands", KN: "Saint Kitts and Nevis", LC: "Saint Lucia", VC: "Saint Vincent and the Grenadines",
  TC: "Turks and Caicos Islands", FK: "Falkland Islands", CV: "Cape Verde", SZ: "Eswatini", TL: "East Timor", MO: "Macau", HK: "Hong Kong",
  AE: "UAE", DO: "Dominican Republic", BA: "Bosnia and Herzegovina", PF: "French Polynesia", NC: "New Caledonia", ST: "São Tomé and Príncipe",
  CW: "Curaçao", AX: "Åland Islands", TT: "Trinidad and Tobago", AG: "Antigua and Barbuda", MP: "Northern Mariana Islands",
  SH: "Saint Helena", PM: "Saint Pierre and Miquelon", WF: "Wallis and Futuna", SJ: "Svalbard", GF: "French Guiana", MM: "Myanmar",
};
const SKIP_ISO = new Set(["AQ", "BV", "HM", "UM", "TF", "IO", "GS", "PN", "XK_", "CC", "CX", "NF", "TK", "NU", "SJ", "EH", "FK", "SH", "PM", "WF", "MS", "AX"]);
function countryInfo(iso) {
  const name = EN_NAME[iso] || isoC.getName(iso, "en") || iso;
  const slug = countrySlugByIso[iso] || slugify(name);
  return { iso, name, slug };
}

// ---- weights
const LATAM_ES = "MX AR CO CL PE VE EC GT CU BO DO HN PY SV NI CR PA UY PR".split(" ");
const EUROPE = "ES IT FR DE PT GB IE NL BE LU CH AT PL CZ SK HU SI HR BA RS ME AL MK GR BG RO MD UA BY LT LV EE FI SE NO DK IS MT CY AD MC SM LI VA TR XK".split(" ");
const TOURISM = "TH VN ID MY PH LK MA EG AE JP KR MV MU SC CV TN JO OM QA KH LA NP BR US CA AU NZ ZA KE TZ".split(" ");
const weight = (iso) =>
  iso === "ES" ? 5 : LATAM_ES.includes(iso) ? 2.6 : EUROPE.includes(iso) ? 2.2 : TOURISM.includes(iso) ? 1.5 :
  iso === "CN" ? 0.3 : iso === "IN" ? 0.45 : iso === "RU" ? 0.6 : 1;
const CAP = { CN: 45, IN: 55, US: 150, BR: 65, RU: 45, ID: 40, NG: 14, PK: 18, BD: 8, JP: 45, MX: 80, ES: 220, IT: 110, FR: 110, DE: 90, GB: 70, TR: 55, PH: 30, EG: 20, IR: 16, CD: 10, ET: 10, AU: 45, CA: 55 };
const DEFAULT_CAP = 30;

const BAD_IDS = new Set([4295940]);
const OK_CODES = new Set(["PPL", "PPLA", "PPLA2", "PPLA3", "PPLA4", "PPLC", "PPLG", "PPLS", "PPLF", "PPLR"]);
const touristKey = new Set(TOURIST.map((t) => `${t.iso}:${fold(t.name)}`));

// a tourist name only boosts the biggest place of that name in the country
const bestOfName = {};
for (const c of all) {
  const k = `${c.country}:${fold(c.name)}`;
  if (!bestOfName[k] || c.population > bestOfName[k].population) bestOfName[k] = c;
}
const pool = [];
for (const c of all) {
  if (SKIP_ISO.has(c.country) || BAD_IDS.has(c.cityId)) continue;
  if (!OK_CODES.has(c.featureCode)) continue;
  const [lon, lat] = c.loc.coordinates;
  const nk = `${c.country}:${fold(c.name)}`;
  const tourist = touristKey.has(nk) && bestOfName[nk] === c;
  const minPop = c.country === "ES" ? 3000 : LATAM_ES.includes(c.country) || EUROPE.includes(c.country) ? 8000 : 15000;
  if (c.population < minPop && !tourist && c.featureCode !== "PPLC") continue;
  const w = weight(c.country);
  let score = c.population * w;
  if (tourist) score = Math.max(score, 400000 * w) * 8;
  if (c.featureCode === "PPLC") score *= 4;
  else if (c.featureCode === "PPLA") score *= 1.6;
  pool.push({ ...c, lat, lon, tourist, score });
}

const usedCells = new Set(curated.map((c) => cell(c.lat, c.lon)));
const usedSlugs = new Set([...curated.map((c) => c.slug), ...placeKeys]);
const perCountry = {};
for (const c of curated) {
  const iso = isoBySlug[c.country];
  perCountry[iso] = (perCountry[iso] || 0) + 1;
}
const picked = [];
const countriesCovered = new Set(Object.values(isoBySlug));

function take(c, ignoreCell = false) {
  const k = cell(c.lat, c.lon);
  if (!ignoreCell && usedCells.has(k)) return false;
  // no suburbs: keep ≥25 km from every other page (≥12 km for capitals)
  const minDeg = ignoreCell ? 0.11 : 0.225;
  if ([...curated, ...picked].some((p) => Math.hypot(p.lat - c.lat, (p.lon - c.lon) * Math.cos((c.lat * Math.PI) / 180)) < minDeg)) return false;
  usedCells.add(k);
  picked.push(c);
  perCountry[c.country] = (perCountry[c.country] || 0) + 1;
  countriesCovered.add(c.country);
  return true;
}

// 1) one city for every country: the capital (or biggest place)
const byCountry = {};
for (const c of pool) (byCountry[c.country] ||= []).push(c);
for (const [iso, list] of Object.entries(byCountry)) {
  list.sort((a, b) => b.score - a.score);
  const cap = list.find((c) => c.featureCode === "PPLC");
  if (cap) take(cap, true);
  else if (!countriesCovered.has(iso)) take(list[0], true);
}
// 1b) Spain first: the market that already sends clicks gets every free grid cell
for (const c of pool.filter((c) => c.country === "ES" && !picked.includes(c)).sort((a, b) => b.score - a.score)) take(c);
// 2) everything else by score
const rest = pool.filter((c) => !picked.includes(c)).sort((a, b) => b.score - a.score);
for (const c of rest) {
  if (curated.length + picked.length >= TARGET_TOTAL) break;
  if ((perCountry[c.country] || 0) >= (CAP[c.country] ?? DEFAULT_CAP)) continue;
  take(c);
}

// ---- output
const out = {};
for (const c of picked) {
  const co = countryInfo(c.country);
  let slug = slugify(c.name);
  if (!slug) continue;
  if (usedSlugs.has(slug)) slug = `${slug}-${co.slug}`;
  if (usedSlugs.has(slug)) slug = `${slugify(c.name)}-${slugify(admin1[`${c.country}.${c.adminCode}`] || "")}-${co.slug}`;
  if (usedSlugs.has(slug)) continue;
  usedSlugs.add(slug);
  let tz;
  try { tz = tzlookup(c.lat, c.lon); } catch { tz = "UTC"; }
  const region = admin1[`${c.country}.${c.adminCode}`] || "";
  (out[co.slug] ||= { name: co.name, iso: co.iso, cities: [] }).cities.push([
    slug, c.name, region, +c.lat.toFixed(4), +c.lon.toFixed(4), c.population, tz, c.cityId, c.tourist ? 1 : 0,
  ]);
}
for (const v of Object.values(out)) v.cities.sort((a, b) => b[5] - a[5]);
const n = Object.values(out).reduce((s, v) => s + v.cities.length, 0);
writeFileSync("/home/claude/data/world-pick.json", JSON.stringify(out));
const top = Object.entries(out).map(([k, v]) => [k, v.cities.length]).sort((a, b) => b[1] - a[1]);
console.log("new cities", n, "countries", Object.keys(out).length, "curated", curated.length, "total", n + curated.length);
console.log(top.slice(0, 40).map((x) => x.join(":")).join(" "));
console.log("tourist picked", picked.filter((p) => p.tourist).length, "of", TOURIST.length);
