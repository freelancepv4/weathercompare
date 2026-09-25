import type { Metadata } from "next";
import { siteConfig, defaultOgImage } from "@/config/site";
import { seoTitle, seoDescription } from "@/lib/seo";
import { getCopy } from "@/lib/i18n/copy";
import { languageAlternates } from "@/lib/i18n/routing";
import { getDailySnapshot } from "@/lib/services/dailyWeather";
import { WeatherTodayView } from "@/components/today/WeatherTodayView";

// Rebuilt at most once an hour from a single Open-Meteo request.
export const revalidate = 10800; // 3h literal (Next requires a static value); keep in step with DAILY_REVALIDATE

export function generateMetadata(): Metadata {
  const copy = getCopy("en");
  const url = `${siteConfig.url}/weather-today`;
  return {
    title: seoTitle(copy.todayTitle),
    description: seoDescription(copy.todayDesc),
    alternates: { canonical: url, languages: languageAlternates(siteConfig.url, { kind: "today" }) },
    openGraph: { title: copy.todayTitle, description: copy.todayDesc, url, images: [defaultOgImage] },
    twitter: { title: copy.todayTitle, description: copy.todayDesc, images: [defaultOgImage] },
  };
}

export default async function WeatherTodayPage() {
  const snapshot = await getDailySnapshot();
  return <WeatherTodayView locale="en" snapshot={snapshot} />;
}
