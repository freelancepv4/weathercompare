import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Backpack, Users, Sparkles } from "lucide-react";
import { allGuides, CATEGORY_LABELS, type GuideCategory } from "@/lib/data/guides";
import { siteConfig, defaultOgImage } from "@/config/site";
import { countries } from "@/config/countries";
import { Breadcrumb } from "@/components/Breadcrumb";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const title = "Travel Guides — Best Time to Visit, Comparisons & Packing Lists";
  const description =
    "City guides beyond the forecast: when to visit, how cities compare, what to pack, and seasonal picks for destinations worldwide.";
  const url = `${siteConfig.url}/guides`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [defaultOgImage] },
    twitter: { title, description, images: [defaultOgImage] },
  };
}

const CATEGORY_ICONS: Record<GuideCategory, typeof CalendarDays> = {
  packing: Backpack,
  comparison: Users,
  seasonal: CalendarDays,
  "ai-tools": Sparkles,
};

export default function GuidesIndexPage() {
  const cityCount = countries.reduce((sum, c) => sum + c.cities.length, 0);
  const categories: GuideCategory[] = ["comparison", "packing", "seasonal", "ai-tools"];

  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Travel Guides</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Beyond the live forecast: when to go, how cities compare, what to pack, and seasonal picks — drawn from the
          same city data as the rest of the site.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <Link
          href="/guides/best-time-to-visit"
          className="group flex items-center justify-between gap-4 rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
              <CalendarDays size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Best time to visit</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Every one of our {cityCount} cities, with its recommended shoulder season and what to plan around.
              </p>
            </div>
          </div>
          <ArrowRight size={18} className="hidden shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500 sm:block" aria-hidden="true" />
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-10">
        {categories.map((category) => {
          const items = allGuides().filter((g) => g.category === category);
          if (items.length === 0) return null;
          const Icon = CATEGORY_ICONS[category];
          return (
            <section key={category}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                <Icon size={18} className="text-brand-500" aria-hidden="true" />
                {CATEGORY_LABELS[category]}
              </h2>
              <div className="space-y-3">
                {items.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl2 border border-slate-200 bg-white px-5 py-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{guide.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{guide.description}</p>
                    </div>
                    <ArrowRight size={16} className="hidden shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500 sm:block" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
