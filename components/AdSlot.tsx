"use client";

import { useTranslations } from "@/lib/i18n/I18nProvider";

/**
 * Clean, clearly-labeled ad placeholder. Not wired to any ad network yet —
 * when ready, replace the contents of this component with your ad
 * network's tag (e.g. Google AdSense <ins> unit) behind the same
 * "advertising" cookie-consent gate used in lib/analytics.ts. Keeping this
 * as a single shared component means enabling ads later is a one-file
 * change.
 */
export function AdSlot({ variant = "banner" }: { variant?: "banner" | "square" | "inline" }) {
  const t = useTranslations();
  const heights: Record<string, string> = {
    banner: "h-24",
    square: "h-64",
    inline: "h-20",
  };
  return (
    <div
      className={`ad-slot flex w-full items-center justify-center rounded-xl2 border border-dashed border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-500 ${heights[variant]}`}
      data-ad-slot={variant}
    >
      {t("ad.label")}
    </div>
  );
}
