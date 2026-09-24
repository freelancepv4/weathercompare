import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getWeatherNews } from "@/lib/services/newsService";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageHeader } from "@/components/PageHeader";
import { Newspaper } from "lucide-react";
import { ExternalLink } from "lucide-react";

export const revalidate = 1800; // ISR: refresh every 30 minutes, matching the feed cache

export const metadata: Metadata = {
  title: "Weather & Climate News",
  description: `The latest weather, climate and environment headlines, aggregated from public sources and linked back to the original publisher — curated by ${siteConfig.name}.`,
  keywords: ["weather news", "climate news", "meteo notizie", "wetter nachrichten", "météo actualités", "noticias del tiempo"],
  alternates: { canonical: "/news" },
};

function formatDate(pubDate: string | null) {
  if (!pubDate) return null;
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function NewsPage() {
  const { items, errors } = await getWeatherNews();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Weather & Climate News",
    url: `${siteConfig.url}/news`,
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "News" }]} />

      <PageHeader
        eyebrow="News"
        icon={Newspaper}
        tone="violet"
        title="Weather & Climate News"
        description={
          <p>
            Headlines aggregated from public news sources, shown as a short excerpt with a link to the full story on the publisher&apos;s
            own site. {siteConfig.name} does not write or edit this reporting — see the source credit on each item.
          </p>
        }
      />

      {items.length === 0 ? (
        <p className="rounded-xl3 border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-400">
          News is temporarily unavailable. Please check back shortly.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => {
            const date = formatDate(item.pubDate);
            return (
              <li key={item.link}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group flex h-full flex-col rounded-xl3 border border-slate-200 bg-white p-5 transition-colors hover:border-brand-300 dark:border-white/10 dark:bg-surface-dark-subtle dark:hover:border-brand-500/40"
                >
                  <div className="mb-2 flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="font-medium text-slate-500 dark:text-slate-400">{item.source}</span>
                    {date && <span>{date}</span>}
                  </div>
                  <h2 className="text-base font-semibold leading-snug text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.excerpt}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-300">
                    Read on {item.source}
                    <ExternalLink size={12} aria-hidden="true" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {errors.length > 0 && (
        <p className="mt-6 text-xs text-slate-400">
          {errors.length} source{errors.length > 1 ? "s were" : " was"} temporarily unreachable and left out of this list.
        </p>
      )}
    </div>
  );
}
