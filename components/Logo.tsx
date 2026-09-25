import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * CSS/SVG logo mark — no external image asset required. The mark is a
 * simple sun-behind-cloud glyph inside a rounded gradient tile; swap the
 * brand name in .env (NEXT_PUBLIC_SITE_NAME) without touching this file.
 */
export function Logo({ compact = false, href = "/" }: { compact?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group" aria-label={`${siteConfig.name} — home`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 shadow-glow-brand transition-transform group-hover:scale-105">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="4" fill="#FFD166" />
          <path
            d="M6 17a4.5 4.5 0 0 1 1.2-8.85A6 6 0 0 1 18.8 10.2 3.8 3.8 0 0 1 18 17H6Z"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
      </span>
      {!compact && (
        <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
