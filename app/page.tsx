import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/HomeSections";
import { siteConfig, defaultOgImage } from "@/config/site";
import { popularCities, worldHighlights } from "@/config/countries";
import { climateHighsFor } from "@/lib/data/climate";
import { allGuides } from "@/lib/data/guides";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { GuideCard } from "@/components/GuideCard";
import { hreflang } from "@/lib/i18n/pageMeta";

export const metadata: Metadata = {
  title: { absolute: `Weather Forecast Compared: 14 Days & Climate | ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: "/", ...hreflang({ kind: "home" }) },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Weather forecasts, compared in one place`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Weather forecasts, compared in one place`,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
};

export default async function HomePage() {
  const climate = climateHighsFor([...popularCities(8), ...worldHighlights(12)]);
  const latestGuides = [...allGuides()].reverse().slice(0, 3);
  const guidePhotos = await Promise.all(latestGuides.map((g) => getLandscapePhoto(g.photoQuery)));

  const jsonLd = [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon-512.png`,
      sameAs: Object.values(siteConfig.social).filter(Boolean),
      email: siteConfig.contactEmail,
      telephone: `+${siteConfig.whatsapp}`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.contactEmail,
        telephone: `+${siteConfig.whatsapp}`,
        availableLanguage: ["English", "Italian"],
      },
    },
  ];

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <HomeSections
        climate={climate}
        guides={
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestGuides.map((g, i) => (
              <GuideCard key={g.slug} guide={g} photo={guidePhotos[i] ?? null} />
            ))}
          </div>
        }
      />
    </>
  );
}
