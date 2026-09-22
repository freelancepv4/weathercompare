import type { ReactNode } from "react";

export function LegalLayout({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <div className="container-page max-w-3xl py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
      {updated && <p className="mt-2 text-sm text-slate-400">Last updated: {updated}</p>}
      <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
    </div>
  );
}

export function LegalHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{children}</h2>;
}
