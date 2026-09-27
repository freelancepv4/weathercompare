import type { ReactNode } from "react";

/**
 * Layout for text pages (About, Data Sources, API, Privacy, Terms, Cookies):
 * a compact colourful header band matching the rest of the site, then the
 * text in a readable white card.
 */
export function LegalLayout({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <div className="container-page max-w-4xl py-8 sm:py-10">
      <header className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-blue-900 via-blue-700 to-sky-600 px-6 py-8 text-white sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-glow/20 blur-3xl" aria-hidden="true" />
        <h1 className="relative text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {updated && <p className="relative mt-2 text-sm text-white/70">Last updated: {updated}</p>}
      </header>
      <div className="prose-legal mt-6 space-y-6 rounded-xl3 border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-600 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-300 sm:p-10">
        {children}
      </div>
    </div>
  );
}

export function LegalHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 pt-2 text-lg font-bold text-slate-900 dark:text-white">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-brand-400 to-indigo-500" aria-hidden="true" />
      {children}
    </h2>
  );
}
