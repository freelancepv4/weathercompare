import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { CATEGORY_LABELS, type Guide, type GuideCategory } from "@/lib/data/guides";
import type { CityPhoto } from "@/lib/providers/photos";

/**
 * Per-category accent colours. Written out as full class names (not
 * built from a variable) so Tailwind's purge step keeps them.
 */
export const CATEGORY_STYLES: Record<GuideCategory, { pill: string; fallback: string }> = {
  comparison: {
    pill: "bg-violet-600 text-white",
    fallback: "from-violet-500 via-indigo-500 to-brand-600",
  },
  packing: {
    pill: "bg-amber-500 text-white",
    fallback: "from-amber-400 via-orange-400 to-rose-500",
  },
  seasonal: {
    pill: "bg-orange-600 text-white",
    fallback: "from-orange-500 via-rose-500 to-fuchsia-600",
  },
  "ai-tools": {
    pill: "bg-emerald-600 text-white",
    fallback: "from-emerald-500 via-teal-500 to-cyan-600",
  },
};

/** Rough reading time from the guide's own text, at ~200 words/minute. */
export function readingMinutes(guide: Guide): number {
  const text = [
    guide.intro,
    ...guide.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.bullets ?? [])]),
  ].join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}

interface GuideCardProps {
  guide: Guide;
  photo: CityPhoto | null;
  /** Larger, horizontal layout for the lead story on the guides index. */
  featured?: boolean;
}

export function GuideCard({ guide, photo, featured = false }: GuideCardProps) {
  const style = CATEGORY_STYLES[guide.category];
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={`group flex overflow-hidden rounded-xl3 border border-slate-200 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle ${
        featured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-gradient-to-br ${style.fallback} ${
          featured ? "aspect-[16/10] md:aspect-auto md:w-1/2" : "aspect-[16/10]"
        }`}
      >
        {photo && (
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(min-width: 768px) 560px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${style.pill}`}>
          {CATEGORY_LABELS[guide.category]}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-8" : "p-5"}`}>
        <h3
          className={`font-bold leading-snug text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-200 ${
            featured ? "text-xl sm:text-2xl" : "text-base"
          }`}
        >
          {guide.title}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 ${
            featured ? "line-clamp-4" : "line-clamp-3"
          }`}
        >
          {guide.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Clock size={13} aria-hidden="true" />
            {readingMinutes(guide)} min read
          </span>
          <span className="flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-300">
            Read guide
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
