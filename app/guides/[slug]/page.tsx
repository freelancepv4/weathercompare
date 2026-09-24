import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, ExternalLink } from "lucide-react";
import { allGuideSlugs, allGuides, getGuide, CATEGORY_LABELS } from "@/lib/data/guides";
import { findCity, type CountrySeed, type CitySeed } from "@/config/countries";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { siteConfig, defaultOgImage } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityGrid } from "@/components/CityGrid";
import { AdSlot } from "@/components/AdSlot";
import { HeroPhoto } from "@/components/HeroPhoto";
import { GuideCard } from "@/components/GuideCard";
import { climateHighsFor } from "@/lib/data/climate";

// Hand-written editorial content, so this can stay fully static rather than
// ISR-revalidated like the weather pages — see lib/data/guides.ts.
export const dynamic = "force-static";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return allGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  const url = `${siteConfig.url}/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    // No `images` here on purpose — app/guides/[slug]/opengraph-image.tsx
    // (a portrait image, sized for Pinterest's Save-from-URL requirement)
    // auto-attaches as og:image whenever a route doesn't set one explicitly.
    openGraph: { title: guide.title, description: guide.description, url },
    twitter: { title: guide.title, description: guide.description, images: [defaultOgImage] },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();
  const heroPhoto = await getLandscapePhoto(guide.photoQuery);
  const moreGuides = allGuides()
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 3);
  const morePhotos = await Promise.all(moreGuides.map((g) => getLandscapePhoto(g.photoQuery)));

  const relatedCities = guide.relatedCityPaths
    .map((p) => findCity(p.country, p.city))
    .filter((v): v is { country: CountrySeed; city: CitySeed } => v !== null);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: `${siteConfig.url}/guides/${guide.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      dateModified: guide.updated,
      url: `${siteConfig.url}/guides/${guide.slug}`,
      publisher: { "@type": "Organization", name: siteConfig.name },
    },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        <HeroPhoto photo={heroPhoto} priority />

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
          {CATEGORY_LABELS[guide.category]}
        </p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{guide.title}</h1>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
          <CalendarDays size={14} aria-hidden="true" />
          Updated{" "}
          {new Date(guide.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">{guide.intro}</p>

        <div className="mt-8 space-y-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-2.5 text-lg font-semibold text-slate-900 dark:text-white">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="mb-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-2 space-y-1.5">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.links && section.links.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {section.links.map((link) => (
                    <a
                      key={link.url + link.label}
                      href={link.url}
                      target="_blank"
                      rel={link.sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200 dark:hover:bg-brand-500/20"
                    >
                      {link.label}
                      <ExternalLink size={12} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-8">
          <AdSlot variant="inline" />
        </div>
      </article>

      {relatedCities.length > 0 && (
        <div className="mx-auto mt-12 max-w-3xl">
          <CityGrid title="Check the live forecast" items={relatedCities} climate={climateHighsFor(relatedCities)} />
        </div>
      )}

      {moreGuides.length > 0 && (
        <section className="mx-auto mt-14 max-w-5xl" aria-labelledby="more-guides-heading">
          <h2 id="more-guides-heading" className="mb-5 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            More travel guides
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreGuides.map((g, i) => (
              <GuideCard key={g.slug} guide={g} photo={morePhotos[i] ?? null} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 text-center text-xs text-slate-400">
        Looking for more?{" "}
        <Link href="/guides" className="font-medium text-brand-600 hover:underline">
          Browse all guides
        </Link>
      </p>
    </div>
  );
}
