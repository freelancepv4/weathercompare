import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/HomeSections";
import { siteConfig, defaultOgImage } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Weather forecasts, compared in one place`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Weather forecasts, compared in one place`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [defaultOgImage],
  },
  twitter: {
    title: `${siteConfig.name} — Weather forecasts, compared in one place`,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/weather/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <HomeSections />
    </>
  );
}
