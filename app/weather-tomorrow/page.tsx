import type { Metadata } from "next";
import { siteConfig, defaultOgImage } from "@/config/site";
import { seoTitle, seoDescription } from "@/lib/seo";
import { getCopy } from "@/lib/i18n/copy";
import { languageAlternates } from "@/lib/i18n/routing";
import { getDailySnapshot } from "@/lib/services/dailyWeather";
import { WeatherTomorrowView } from "@/components/today/WeatherTomorrowView";

// Rebuilt at most once an hour from a single Open-Meteo request (shared with
// the "today" page's snapshot — see lib/services/dailyWeather.ts).
export const revalidate = 10800; // 3h literal (Next requires a static value); keep in step with DAILY_REVALIDATE

export function generateMetadata(): Metadata {
  const copy = getCopy("en");
  const url = `${siteConfig.url}/weather-tomorrow`;
  return {
    title: seoTitle(copy.tomorrowPage.title),
    description: seoDescription(copy.tomorrowPage.desc),
    alternates: { canonical: url, languages: languageAlternates(siteConfig.url, { kind: "tomorrow" }) },
    openGraph: { type: "website", siteName: siteConfig.name, title: copy.tomorrowPage.title, description: copy.tomorrowPage.desc, url, images: [defaultOgImage] },
    twitter: { card: "summary_large_image", title: copy.tomorrowPage.title, description: copy.tomorrowPage.desc, images: [defaultOgImage] },
  };
}

export default async function WeatherTomorrowPage() {
  const snapshot = await getDailySnapshot();
  return <WeatherTomorrowView locale="en" snapshot={snapshot} />;
}
