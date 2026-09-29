#!/usr/bin/env node
/**
 * Fetches long-term monthly climate averages for every seed city and writes
 * them to lib/data/climate.json. Those averages drive the month-by-month
 * city pages (/weather/{country}/{city}/{month}) and the trip weather finder.
 *
 * Source: NASA POWER daily API (https://power.larc.nasa.gov) — free, no API
 * key, public-domain data (attribution appreciated). Daily values for
 * 2011–2020 are averaged per calendar month, on a ~0.5° grid, so they
 * describe the typical climate of the area around each city, not a
 * specific weather station.
 *
 * Coastal and island destinations are different: NASA's ~50 km grid cell is
 * mostly sea there, which flattens the day/night range (highs too low, lows
 * too high). Cities listed under "era5" in climate.json are therefore fetched
 * from the ERA5 reanalysis (Copernicus/ECMWF) via Open-Meteo's historical
 * API instead, optionally at a fixed elevation (the resort's height). Add a
 * new coastal city to that map (e.g. "greece/kos": { "elevation": null }) and
 * run the script with --missing. Open-Meteo counts a 10-year request as ~260
 * API calls, so those requests are spaced about a minute apart.
 *
 * Run it once (and again whenever you add cities to config/countries.ts):
 *   node scripts/fetch-climate.mjs            (all cities)
 *   node scripts/fetch-climate.mjs --missing  (only cities not in climate.json yet — fast)
 *   node scripts/fetch-climate.mjs --era5     (re-source the "era5" cities not done yet;
 *                                              resumable, saves after every city)
 *
 * Open-Meteo's free tier allows 600 calls/minute, 5,000/hour and 10,000/day,
 * and a 10-year daily request counts as ~261 calls. --era5 therefore runs in
 * bursts: ~19 cities in about 10 minutes, then a pause until the hourly
 * allowance frees up, then the next burst. The daily allowance covers ~38
 * cities; if more are left, it stops and the same command finishes them the
 * next day.
 *
 * Takes a few minutes — requests are made one at a time with a short
 * pause so the free API isn't hammered.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DAYS_IN_MONTH = [31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const PARAMS = ["T2M_MAX", "T2M_MIN", "PRECTOTCORR", "RH2M", "CLOUD_AMT"];
const START_YEAR = 2011;
const END_YEAR = 2020;

/** Reads the city list straight out of config/countries.ts (no TS tooling needed). */
function readCities() {
  const src = readFileSync(join(root, "config", "countries.ts"), "utf8");
  const cities = [];
  let country = null;
  for (const line of src.split("\n")) {
    const countryMatch = line.match(/^ {4}slug: "([^"]+)",/);
    if (countryMatch) country = countryMatch[1];
    const cityMatch = line.match(/\{\s*slug: "([^"]+)",\s*name: "([^"]+)".*?lat: (-?[\d.]+), lon: (-?[\d.]+)/);
    if (cityMatch && country) {
      cities.push({ country, slug: cityMatch[1], name: cityMatch[2], lat: Number(cityMatch[3]), lon: Number(cityMatch[4]) });
    }
  }
  return cities;
}

const round1 = (n) => Math.round(n * 10) / 10;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Open-Meteo counts requests by size: ~261 "calls" for 10 years of daily data. */
const ERA5_WEIGHT = Math.ceil((((END_YEAR - START_YEAR + 1) * 365.25) / 14));
const MINUTE_BUDGET = 560; // free limit 600/min, kept a little under
const HOUR_BUDGET = 4990; // free limit 5,000/hour (19 ten-year requests)
const DAY_BUDGET = 9990; // free limit 10,000/day (38 ten-year requests)
const quotaLog = [];
let usedToday = 0;
/** Waits until one more ERA5 request fits in Open-Meteo's per-minute and per-hour allowances. */
async function waitForEra5Quota() {
  if (usedToday + ERA5_WEIGHT > DAY_BUDGET) {
    throw Object.assign(new Error("Open-Meteo daily allowance used up"), { daily: true });
  }
  for (;;) {
    const now = Date.now();
    while (quotaLog.length && now - quotaLog[0] >= 3600000) quotaLog.shift();
    const lastHour = quotaLog.length * ERA5_WEIGHT;
    const lastMinute = quotaLog.filter((t) => now - t < 60000).length * ERA5_WEIGHT;
    if (lastHour + ERA5_WEIGHT <= HOUR_BUDGET && lastMinute + ERA5_WEIGHT <= MINUTE_BUDGET) {
      quotaLog.push(now);
      usedToday += ERA5_WEIGHT;
      return;
    }
    const minuteFree = quotaLog.find((t) => now - t < 60000);
    const waitMs =
      lastHour + ERA5_WEIGHT > HOUR_BUDGET ? quotaLog[0] + 3600000 - now + 1000 : minuteFree + 60000 - now + 500;
    if (waitMs > 120000) {
      const at = new Date(now + waitMs).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      console.log(`  … hourly Open-Meteo allowance used up — pausing until about ${at} (safe to leave running)`);
    }
    await sleep(waitMs);
  }
}

async function fetchCity(city) {
  // Daily values, averaged per calendar month over START_YEAR..END_YEAR.
  // (POWER's "climatology" endpoint reports T2M_MAX/T2M_MIN as the monthly
  // *extremes*, not the typical daily high/low — hence the daily series.)
  const url =
    "https://power.larc.nasa.gov/api/temporal/daily/point" +
    `?parameters=${PARAMS.join(",")}&community=AG` +
    `&latitude=${city.lat}&longitude=${city.lon}` +
    `&start=${START_YEAR}0101&end=${END_YEAR}1231&format=JSON`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "weathercompare.eu climate build script" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const p = json?.properties?.parameter;
      if (!p) throw new Error("unexpected response shape");

      // Mean of the daily values for each calendar month (skipping POWER's -999 "missing").
      const monthlyMean = (key) => {
        const sums = new Array(12).fill(0);
        const counts = new Array(12).fill(0);
        for (const [date, v] of Object.entries(p[key] ?? {})) {
          if (typeof v !== "number" || v <= -999) continue;
          const m = Number(date.slice(4, 6)) - 1;
          sums[m] += v;
          counts[m] += 1;
        }
        return sums.map((s, m) => {
          if (counts[m] < 100) throw new Error(`too little ${key} data for month ${m + 1}`);
          return s / counts[m];
        });
      };

      return {
        tMax: monthlyMean("T2M_MAX").map(round1),
        tMin: monthlyMean("T2M_MIN").map(round1),
        // Mean daily precipitation (mm/day) x days in the month = typical monthly total.
        precipMm: monthlyMean("PRECTOTCORR").map((v, i) => Math.round(v * DAYS_IN_MONTH[i])),
        humidity: monthlyMean("RH2M").map((v) => Math.round(v)),
        cloud: monthlyMean("CLOUD_AMT").map((v) => Math.round(v)),
      };
    } catch (err) {
      if (attempt === 3) throw err;
      await sleep(3000 * attempt);
    }
  }
}

/** Same monthly aggregation, from ERA5 via Open-Meteo's archive API. */
async function fetchCityEra5(city, elevation, point = {}) {
  const lat = point.lat ?? city.lat;
  const lon = point.lon ?? city.lon;
  const url =
    "https://archive-api.open-meteo.com/v1/archive" +
    `?latitude=${lat}&longitude=${lon}` +
    `&start_date=${START_YEAR}-01-01&end_date=${END_YEAR}-12-31` +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_mean,cloud_cover_mean&timezone=UTC" +
    (elevation != null ? `&elevation=${elevation}` : "");
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        const reason = (await res.text()).toLowerCase();
        // The daily quota won't recover by waiting a few minutes: stop and let the caller save.
        if (reason.includes("daily")) throw Object.assign(new Error("Open-Meteo daily limit reached"), { daily: true });
        throw new Error("rate limited");
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const d = (await res.json()).daily;
      const monthlyMean = (key) => {
        const sums = new Array(12).fill(0);
        const counts = new Array(12).fill(0);
        d.time.forEach((t, i) => {
          const v = d[key][i];
          if (v == null) return;
          const m = Number(t.slice(5, 7)) - 1;
          sums[m] += v;
          counts[m] += 1;
        });
        return sums.map((s, m) => {
          if (counts[m] < 100) throw new Error(`too little ${key} data for month ${m + 1}`);
          return s / counts[m];
        });
      };
      return {
        tMax: monthlyMean("temperature_2m_max").map(round1),
        tMin: monthlyMean("temperature_2m_min").map(round1),
        precipMm: monthlyMean("precipitation_sum").map((v, i) => Math.round(v * DAYS_IN_MONTH[i])),
        humidity: monthlyMean("relative_humidity_2m_mean").map((v) => Math.round(v)),
        cloud: monthlyMean("cloud_cover_mean").map((v) => Math.round(v)),
      };
    } catch (err) {
      if (err.daily || attempt === 4) throw err;
      await sleep(65000 * attempt);
    }
  }
}

const onlyMissing = process.argv.includes("--missing");
const era5Mode = process.argv.includes("--era5");
const outPath = join(root, "lib", "data", "climate.json");
let file = {};
try {
  file = JSON.parse(readFileSync(outPath, "utf8"));
} catch {
  file = {};
}
const era5 = file.era5 ?? {};
const existing = onlyMissing || era5Mode ? file.cities ?? {} : {};

const out = {
  source: `NASA POWER daily data (https://power.larc.nasa.gov); coastal/island cities listed in "era5": ERA5 reanalysis via Open-Meteo (https://open-meteo.com). ${START_YEAR}–${END_YEAR} monthly averages`,
  generatedAt: new Date().toISOString().slice(0, 10),
  era5,
  cities: { ...existing },
};
const save = () => writeFileSync(outPath, JSON.stringify(out, null, 1) + "\n");

/** Mean daily range (tMax − tMin) over the year. Sea-dominated grid cells flatten it. */
const dayNightRange = (c) => c.tMax.reduce((s, t, i) => s + (t - c.tMin[i]), 0) / 12;

let cities = readCities();
if (onlyMissing) cities = cities.filter((c) => !existing[`${c.country}/${c.slug}`]);
if (era5Mode) cities = cities.filter((c) => era5[`${c.country}/${c.slug}`] && !era5[`${c.country}/${c.slug}`].fetched);
console.log(
  era5Mode
    ? `Re-sourcing ${cities.length} coastal/island cities from ERA5 in bursts of ~19 per hour (Open-Meteo's free quota)...`
    : `Fetching climate averages for ${cities.length} cities...`,
);

const failed = [];
const kept = [];
let stoppedEarly = false;

for (const [i, city] of cities.entries()) {
  const key = `${city.country}/${city.slug}`;
  const cfg = era5[key];
  try {
    if (cfg) {
      if (era5Mode) await waitForEra5Quota();
      const fresh = await fetchCityEra5(city, cfg.elevation ?? null, cfg);
      const old = existing[key];
      // Keep NASA when ERA5 isn't clearly more realistic (it should show a wider day/night range).
      if (era5Mode && old && dayNightRange(fresh) < dayNightRange(old) + 0.5) {
        kept.push(key);
        cfg.fetched = out.generatedAt;
        cfg.kept = "nasa";
        console.log(`  [${i + 1}/${cities.length}] ${key}  kept NASA (ERA5 not more realistic)`);
      } else {
        out.cities[key] = fresh;
        cfg.fetched = out.generatedAt;
        delete cfg.kept;
        console.log(`  [${i + 1}/${cities.length}] ${key}  ✓ ERA5  (Jul max ${old ? `${old.tMax[6]} → ` : ""}${fresh.tMax[6]}°C)`);
      }
    } else {
      out.cities[key] = await fetchCity(city);
      console.log(`  [${i + 1}/${cities.length}] ${key}  ✓  (Jul max ${out.cities[key].tMax[6]}°C)`);
    }
    if (era5Mode) save();
  } catch (err) {
    failed.push(key);
    console.log(`  [${i + 1}/${cities.length}] ${key}  ✗  ${err.message}`);
    if (err.daily) {
      stoppedEarly = true;
      break;
    }
  }
  // --era5 paces itself in waitForEra5Quota(); other modes keep a simple pause.
  if (i < cities.length - 1 && !era5Mode) await sleep(cfg ? 65000 : 500);
}

save();
console.log(`\nWrote lib/data/climate.json — ${Object.keys(out.cities).length} cities in total, ${failed.length} failed.`);
if (kept.length) console.log(`Kept NASA data for: ${kept.join(", ")}`);
if (stoppedEarly) {
  const left = Object.entries(era5).filter(([, v]) => !v.fetched).length;
  console.log(`Stopped at Open-Meteo's daily limit with ${left} ERA5 cities left. Everything so far is saved — run the same command again tomorrow to finish.`);
  process.exitCode = 1;
} else if (failed.length) {
  console.log(`Failed: ${failed.join(", ")} — just run the script again to retry.`);
  process.exitCode = 1;
}
