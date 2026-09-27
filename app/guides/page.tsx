import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Compass, BookOpen, MapPin } from "lucide-react";
import { allGuides, CATEGORY_LABELS, type GuideCategory } from "@/lib/data/guides";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { siteConfig, defaultOgImage } from "@/config/site";
import { countries } from "@/config/countries";
import { Breadcrumb } from "@/components/Breadcrumb";
import { seoTitle, seoDescription } from "@/lib/seo";
import { GuideCard, CATEGORY_STYLES } from "@/components/GuideCard";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const title = "Travel Guides: Best Time to Visit, Packing & More";
  const description =
    "City guides beyond the forecast: when to visit, how cities compare, what to pack, seasonal picks and AI travel tools for destinations worldwide.";
  const url = `${siteConfig.url}/guides`;
  return {
    title: seoTitle(title),
    description: seoDescription(description),
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [defaultOgImage] },
    twitter: { title, description, images: [defaultOgImage] },
  };
}

const CATEGORY_ORDER: GuideCategory[] = ["comparison", "packing", "seasonal", "ai-tools"];

export default async function GuidesIndexPage() {
  const cityCount = countries.reduce((sum, c) => sum + c.cities.length, 0);
  const guides = allGuides();
  // Newest entry in lib/data/guides.ts leads the page.
  const [featured, ...rest] = [...guides].reverse();
  const photos = await Promise.all(guides.map((g) => getLandscapePhoto(g.photoQuery)));
  const photoFor = (slug: string) => photos[guides.findIndex((g) => g.slug === slug)] ?? null;
  const usedCategories = CATEGORY_ORDER.filter((c) => guides.some((g) => g.category === c));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Travel Guides",
    url: `${siteConfig.url}/guides`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/guides/${g.slug}`,
        name: g.title,
      })),
    },
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />

      {/* Header band */}
      <header className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-blue-900 via-blue-700 to-sky-600 px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-glow/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-brand-400/30 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-200">
            <BookOpen size={14} aria-hidden="true" /> Travel guides
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Plan the trip, not just the forecast</h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-100 sm:text-base">
            When to go, how cities compare, what to pack and the tools worth using — built on the same city data as our
            live forecast comparisons.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {usedCategories.map((c) => (
              <span key={c} className={`rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_STYLES[c].pill}`}>
                {CATEGORY_LABELS[c]}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Feature tiles */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/guides/best-time-to-visit"
          className="group relative overflow-hidden rounded-xl3 bg-gradient-to-br from-sky-400 via-brand-500 to-indigo-600 p-6 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg sm:p-8"
        >
          <CalendarDays size={96} className="absolute -bottom-4 -right-4 text-white/15" aria-hidden="true" />
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <CalendarDays size={20} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-bold">Best time to visit</h2>
          <p className="mt-1.5 max-w-sm text-sm text-white/85">
            All {cityCount} cities, each with its recommended season and what to plan around.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
            Browse cities <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
        <Link
          href="/trip-finder"
          className="group relative overflow-hidden rounded-xl3 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-6 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg sm:p-8"
        >
          <Compass size={96} className="absolute -bottom-4 -right-4 text-white/15" aria-hidden="true" />
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Compass size={20} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-bold">Trip weather finder</h2>
          <p className="mt-1.5 max-w-sm text-sm text-white/85">
            Pick a month and the weather you want — we&apos;ll rank every city for you.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
            Find my destination <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </div>

      {/* Lead guide */}
      {featured && (
        <section className="mt-12" aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Latest guide
          </h2>
          <GuideCard guide={featured} photo={photoFor(featured.slug)} featured />
        </section>
      )}

      {/* Everything else */}
      {rest.length > 0 && (
        <section className="mt-12" aria-labelledby="all-guides-heading">
          <h2 id="all-guides-heading" className="mb-5 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            More guides
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} photo={photoFor(guide.slug)} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-12 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
        <MapPin size={13} aria-hidden="true" />
        Every guide links back to live, multi-source forecasts for the cities it covers.
      </p>
    </div>
  );
}
