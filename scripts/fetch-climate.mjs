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
 * Run it once (and again whenever you add cities to config/countries.ts):
 *   node scripts/fetch-climate.mjs            (all cities)
 *   node scripts/fetch-climate.mjs --missing  (only cities not in climate.json yet — fast)
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

const onlyMissing = process.argv.includes("--missing");
const outPath = join(root, "lib", "data", "climate.json");
let existing = {};
if (onlyMissing) {
  try {
    existing = JSON.parse(readFileSync(outPath, "utf8")).cities ?? {};
  } catch {
    existing = {};
  }
}
const cities = readCities().filter((c) => !onlyMissing || !existing[`${c.country}/${c.slug}`]);
console.log(`Fetching climate averages for ${cities.length} cities from NASA POWER...`);

const out = {
  source: `NASA POWER daily data, ${START_YEAR}–${END_YEAR} monthly averages, https://power.larc.nasa.gov`,
  generatedAt: new Date().toISOString().slice(0, 10),
  cities: { ...existing },
};
const failed = [];

for (const [i, city] of cities.entries()) {
  const key = `${city.country}/${city.slug}`;
  try {
    out.cities[key] = await fetchCity(city);
    console.log(`  [${i + 1}/${cities.length}] ${key}  ✓  (Jul max ${out.cities[key].tMax[6]}°C)`);
  } catch (err) {
    failed.push(key);
    console.log(`  [${i + 1}/${cities.length}] ${key}  ✗  ${err.message}`);
  }
  await sleep(500);
}

writeFileSync(outPath, JSON.stringify(out, null, 1) + "\n");
console.log(`\nWrote lib/data/climate.json — ${Object.keys(out.cities).length} cities OK, ${failed.length} failed.`);
if (failed.length) {
  console.log(`Failed: ${failed.join(", ")} — just run the script again to retry.`);
  process.exitCode = 1;
}
