import type { WeatherProvider } from "@/types/weather";
import { siteConfig } from "@/config/site";
import { createMockProvider } from "./mockProvider";
import { openWeatherProvider, openWeatherMeta } from "./openweather";
import { weatherApiProvider, weatherApiMeta } from "./weatherapi";
import { meteomaticsProvider, meteomaticsMeta } from "./meteomatics";

/**
 * Single place that decides which concrete implementation backs
 * "Provider A / B / C" in the UI. Swapping DEMO_MODE flips every provider
 * at once; nothing else in the app needs to change.
 *
 * Provider IDs (providerA/providerB/providerC) are the stable, neutral
 * names used in URLs (/api/providers/providerA) and internal wiring, kept
 * separate from the human-facing brand name so a provider swap never
 * breaks a route.
 */

const demoProfiles = {
  providerA: { tempBias: 0.6, rainBias: -4, windBias: 1, offset: 1 },
  providerB: { tempBias: -0.8, rainBias: 6, windBias: -2, offset: 2 },
  providerC: { tempBias: 0.2, rainBias: 2, windBias: 3, offset: 3 },
};

const mockProviderA = createMockProvider(
  { id: "providerA", name: "Provider A (Open-Meteo-style)", attributionLabel: "Demo data styled after Open-Meteo", attributionUrl: "https://open-meteo.com/" },
  demoProfiles.providerA
);
const mockProviderB = createMockProvider(
  { id: "providerB", name: "Provider B (OpenWeatherMap-style)", attributionLabel: "Demo data styled after OpenWeatherMap", attributionUrl: "https://openweathermap.org/" },
  demoProfiles.providerB
);
const mockProviderC = createMockProvider(
  { id: "providerC", name: "Provider C (WeatherAPI-style)", attributionLabel: "Demo data styled after WeatherAPI.com", attributionUrl: "https://www.weatherapi.com/" },
  demoProfiles.providerC
);

export const providerIds = ["providerA", "providerB", "providerC"] as const;
export type ProviderId = (typeof providerIds)[number];

export function getProvider(id: ProviderId): WeatherProvider {
  if (siteConfig.demoMode) {
    return { providerA: mockProviderA, providerB: mockProviderB, providerC: mockProviderC }[id];
  }
  // Live mode: real adapters. Extend/replace freely — this is the only
  // file that needs to change to add/remove/reorder comparison sources.
  const live: Record<ProviderId, WeatherProvider> = {
    providerA: openWeatherProvider,
    providerB: weatherApiProvider,
    providerC: meteomaticsProvider,
  };
  return live[id];
}

export function getAllProviders(): WeatherProvider[] {
  return providerIds.map(getProvider);
}

export const providerMetas = {
  providerA: siteConfig.demoMode ? mockProviderA.meta : openWeatherMeta,
  providerB: siteConfig.demoMode ? mockProviderB.meta : weatherApiMeta,
  providerC: siteConfig.demoMode ? mockProviderC.meta : meteomaticsMeta,
};
