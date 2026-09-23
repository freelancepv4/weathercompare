import type { Metadata } from "next";
import Link from "next/link";
import { MapPinOff, Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <MapPinOff className="text-slate-400" size={36} aria-hidden="true" />
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
        We couldn't find that page — it may have moved, or the link may be out of date.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Home size={14} aria-hidden="true" />
          Go home
        </Link>
        <Link
          href="/weather/search"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
        >
          <Search size={14} aria-hidden="true" />
          Search for a city
        </Link>
      </div>
    </div>
  );
}
