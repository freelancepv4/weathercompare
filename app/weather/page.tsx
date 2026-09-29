import type { Metadata } from "next";
import { CountriesIndex, COUNTRIES_COPY, countriesIndexStats } from "@/components/CountriesIndex";
import { localizedMetadata } from "@/lib/i18n/pageMeta";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const t = COUNTRIES_COPY.en;
  const s = countriesIndexStats("en");
  return localizedMetadata("en", { kind: "countries" }, t.title, t.desc(s.countries, s.cities));
}

export default function WeatherIndexPage() {
  return <CountriesIndex locale="en" />;
}
