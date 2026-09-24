import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Colourful header band used at the top of index/section pages, matching
 * the /guides and /trip-finder headers.
 */
const TONES = {
  brand: "from-brand-950 via-brand-800 to-brand-600",
  sky: "from-sky-500 via-brand-600 to-indigo-700",
  teal: "from-emerald-500 via-teal-600 to-cyan-700",
  sunset: "from-orange-500 via-rose-500 to-fuchsia-600",
  violet: "from-violet-600 via-indigo-600 to-brand-700",
} as const;

interface PageHeaderProps {
  eyebrow?: string;
  icon?: LucideIcon;
  title: string;
  description?: ReactNode;
  tone?: keyof typeof TONES;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, icon: Icon, title, description, tone = "brand", children }: PageHeaderProps) {
  return (
    <header className={`relative mb-8 overflow-hidden rounded-xl3 bg-gradient-to-br ${TONES[tone]} px-6 py-9 text-white sm:px-10 sm:py-12`}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-sky-glow/20 blur-3xl" aria-hidden="true" />
      {Icon && <Icon size={150} className="pointer-events-none absolute -bottom-6 -right-6 text-white/10" aria-hidden="true" />}
      <div className="relative max-w-2xl">
        {eyebrow && (
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/75">
            {Icon && <Icon size={14} aria-hidden="true" />} {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
        {description && <div className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">{description}</div>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
