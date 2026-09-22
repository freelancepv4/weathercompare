import type {
  ConditionCode,
  CurrentConditions,
  DailyPoint,
  GeoLocation,
  HourlyPoint,
  WeatherAlert,
} from "@/types/weather";

/**
 * Deterministic demo/mock data generator.
 *
 * This is NOT random per request — it's seeded from the location's
 * coordinates plus the current calendar day, so the same city returns
 * stable, self-consistent numbers within a day (as a real forecast would),
 * while still varying between locations and slowly over time. This is what
 * lets the entire frontend (including the comparison view) work correctly
 * with zero API keys.
 *
 * IMPORTANT: this file produces realistic-looking demo data only. It is
 * used by lib/providers/mockProvider.ts. Real integrations live in
 * lib/providers/openweather.ts, weatherapi.ts and meteomatics.ts.
 */

const CONDITIONS: ConditionCode[] = [
  "clear",
  "mostly-clear",
  "partly-cloudy",
  "cloudy",
  "drizzle",
  "rain",
  "partly-cloudy",
  "clear",
];

const CONDITION_LABELS: Record<ConditionCode, string> = {
  clear: "Sunny",
  "mostly-clear": "Mostly Sunny",
  "partly-cloudy": "Partly Cloudy",
  cloudy: "Cloudy",
  fog: "Foggy",
  drizzle: "Light Drizzle",
  rain: "Rain",
  "heavy-rain": "Heavy Rain",
  thunderstorm: "Thunderstorm",
  snow: "Snow",
  sleet: "Sleet",
  windy: "Windy",
};

export { CONDITION_LABELS };

// Simple deterministic PRNG (mulberry32) so demo data is stable per seed.
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromLocation(location: GeoLocation, providerOffset: number, daySalt = 0): number {
  const base = Math.round((location.lat + 90) * 1000 + (location.lon + 180) * 7 + daySalt * 97);
  return base + providerOffset * 104729;
}

function dayOfYear(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((date.getTime() - start) / 86400000);
}

/** Rough seasonal baseline temperature by latitude + day of year (very simplified, demo only). */
function seasonalBaseline(lat: number, date: Date) {
  const doy = dayOfYear(date);
  const seasonPhase = Math.cos(((doy - 200) / 365) * 2 * Math.PI); // peak ~mid-July
  const latFactor = Math.max(0.3, 1 - Math.abs(lat) / 90);
  const summerPeak = 14 + latFactor * 14; // warmer near equator-ish latitudes
  const winterLow = 2 + latFactor * 4;
  const amplitude = (summerPeak - winterLow) / 2;
  const mean = (summerPeak + winterLow) / 2;
  return mean + seasonPhase * amplitude;
}

export interface MockProviderProfile {
  /** Small deterministic bias so providers "disagree" slightly, like real models do. */
  tempBias: number;
  rainBias: number;
  windBias: number;
  offset: number;
}

export function generateCurrent(
  location: GeoLocation,
  profile: MockProviderProfile,
  now: Date = new Date()
): CurrentConditions {
  const rng = mulberry32(seedFromLocation(location, profile.offset, dayOfYear(now)));
  const baseline = seasonalBaseline(location.lat, now);
  const hourFactor = Math.sin(((now.getUTCHours() - 6) / 24) * 2 * Math.PI); // warmer midday
  const temperature = Math.round(baseline + hourFactor * 5 + profile.tempBias + (rng() - 0.5) * 2);
  const conditionIdx = Math.floor(rng() * CONDITIONS.length);
  const condition = CONDITIONS[conditionIdx] ?? "clear";
  const precipitationProbability = Math.max(
    0,
    Math.min(100, Math.round(rng() * 40 + profile.rainBias))
  );
  const windSpeed = Math.max(2, Math.round(8 + rng() * 18 + profile.windBias));

  const sunriseHour = 6 + Math.round(rng() * 1);
  const sunsetHour = 19 + Math.round(rng() * 1);
  const sunrise = new Date(now);
  sunrise.setUTCHours(sunriseHour, Math.round(rng() * 59), 0, 0);
  const sunset = new Date(now);
  sunset.setUTCHours(sunsetHour, Math.round(rng() * 59), 0, 0);

  return {
    temperature,
    feelsLike: temperature + Math.round((rng() - 0.5) * 4),
    condition,
    conditionLabel: CONDITION_LABELS[condition],
    humidity: Math.round(40 + rng() * 45),
    windSpeed,
    windGust: Math.round(windSpeed * (1.3 + rng() * 0.4)),
    windDirection: Math.round(rng() * 359),
    pressure: Math.round(1000 + rng() * 25),
    visibility: Math.round((6 + rng() * 14) * 10) / 10,
    uvIndex: Math.max(0, Math.round(rng() * 9)),
    precipitationProbability,
    sunrise: sunrise.toISOString(),
    sunset: sunset.toISOString(),
    observedAt: now.toISOString(),
  };
}

export function generateHourly(
  location: GeoLocation,
  profile: MockProviderProfile,
  now: Date = new Date(),
  hours = 24
): HourlyPoint[] {
  const points: HourlyPoint[] = [];
  const baseline = seasonalBaseline(location.lat, now);
  for (let h = 0; h < hours; h++) {
    const t = new Date(now);
    t.setUTCMinutes(0, 0, 0);
    t.setUTCHours(now.getUTCHours() + h);
    const rng = mulberry32(seedFromLocation(location, profile.offset, dayOfYear(t) * 24 + t.getUTCHours()));
    const hourFactor = Math.sin(((t.getUTCHours() - 6) / 24) * 2 * Math.PI);
    const temperature = Math.round(baseline + hourFactor * 5 + profile.tempBias + (rng() - 0.5) * 1.5);
    const condition = CONDITIONS[Math.floor(rng() * CONDITIONS.length)] ?? "clear";
    points.push({
      time: t.toISOString(),
      temperature,
      precipitationProbability: Math.max(0, Math.min(100, Math.round(rng() * 35 + profile.rainBias))),
      windSpeed: Math.max(2, Math.round(6 + rng() * 16 + profile.windBias)),
      condition,
    });
  }
  return points;
}

export function generateDaily(
  location: GeoLocation,
  profile: MockProviderProfile,
  now: Date = new Date(),
  days = 10
): DailyPoint[] {
  const points: DailyPoint[] = [];
  for (let d = 0; d < days; d++) {
    const date = new Date(now);
    date.setUTCDate(now.getUTCDate() + d);
    const baseline = seasonalBaseline(location.lat, date);
    const rng = mulberry32(seedFromLocation(location, profile.offset, dayOfYear(date)));
    const tempMax = Math.round(baseline + 4 + profile.tempBias + rng() * 3);
    const tempMin = Math.round(baseline - 4 + profile.tempBias - rng() * 3);
    const condition = CONDITIONS[Math.floor(rng() * CONDITIONS.length)] ?? "clear";
    const sunrise = new Date(date);
    sunrise.setUTCHours(6, Math.round(rng() * 40), 0, 0);
    const sunset = new Date(date);
    sunset.setUTCHours(19, Math.round(rng() * 40), 0, 0);
    points.push({
      date: date.toISOString().slice(0, 10),
      tempMax,
      tempMin,
      precipitationProbability: Math.max(0, Math.min(100, Math.round(rng() * 45 + profile.rainBias))),
      windSpeed: Math.max(2, Math.round(8 + rng() * 16 + profile.windBias)),
      condition,
      sunrise: sunrise.toISOString(),
      sunset: sunset.toISOString(),
    });
  }
  return points;
}

/**
 * Demo alerts are intentionally almost always empty — real alerts must come
 * from an authorized meteorological source (see /data-sources). This only
 * simulates the rare "active alert" state so the UI/UX can be reviewed; it
 * is never presented as a real alert because condition/text below say so.
 */
export function generateAlerts(location: GeoLocation, now: Date = new Date()): WeatherAlert[] {
  const rng = mulberry32(seedFromLocation(location, 9999, dayOfYear(now)));
  if (rng() > 0.12) return [];
  return [
    {
      id: `demo-alert-${location.id}`,
      title: "Heavy rain expected (demo alert)",
      description:
        "This is placeholder demo content illustrating how a weather alert would appear. Connect an authorized meteorological alert feed to replace this with real, official alerts.",
      severity: "moderate",
      area: location.region,
      startsAt: now.toISOString(),
      endsAt: new Date(now.getTime() + 6 * 3600 * 1000).toISOString(),
      source: "Demo data — not an official alert",
    },
  ];
}
