import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalLayout, LegalHeading } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name}, a weather comparison platform covering cities worldwide.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalLayout title={`About ${siteConfig.name}`}>
      <p>
        We bring weather forecasts from multiple sources together so people can explore the forecast for a location in one place. Rather
        than showing a single number and asking you to trust it, {siteConfig.name} shows you how independent forecast providers see the
        same place at the same time — so you can judge for yourself how much confidence to put in a given prediction.
      </p>

      <LegalHeading>Why we built this</LegalHeading>
      <p>
        Weather forecasting is inherently uncertain, especially more than a few days out. Different providers use different atmospheric
        models, different data sources, and different update schedules, which means their forecasts can and do disagree. We think that
        disagreement is useful information in itself, not something to hide behind a single averaged number.
      </p>

      <LegalHeading>What we are not</LegalHeading>
      <p>
        {siteConfig.name} is not a meteorological authority and does not produce its own forecasts or issue official weather warnings.
        We aggregate and visually compare data licensed from third-party providers, each of which is clearly credited throughout the
        site — see our <a className="font-medium text-brand-600 hover:underline" href="/data-sources">Data Sources</a> page for details.
        For official warnings and alerts, always consult your national meteorological service.
      </p>

      <LegalHeading>Where we're headed</LegalHeading>
      <p>
        We launched focused on Italy, and have since expanded to cities across Europe, North and South America, Asia, the Middle East,
        Africa and Australia. Over time we plan to add accounts, notifications, historical weather data and business-oriented
        dashboards, while keeping the core comparison experience free and fast.
      </p>
    </LegalLayout>
  );
}
