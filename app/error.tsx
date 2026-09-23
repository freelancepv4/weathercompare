"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw, Home } from "lucide-react";
import Link from "next/link";

/**
 * Segment-level error boundary — catches render/runtime errors anywhere
 * under the root layout (Header/Footer still render normally) and shows a
 * recoverable UI instead of a blank page. Logged with console.error so it
 * shows up in Vercel's Runtime Logs; wire a real error-tracking provider
 * (Sentry, etc.) here later by replacing the console.error call below —
 * this is the single choke point every uncaught error already passes
 * through, so nothing else needs to change.
 */
export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[app-error]", error.message, error.digest ? `(digest: ${error.digest})` : "", error.stack);
  }, [error]);

  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <AlertTriangle className="text-rose-500" size={36} aria-hidden="true" />
      <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Something went wrong</h1>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
        This page hit an unexpected error. It's been logged — try again, or head back home.
        {error.digest && <span className="mt-1 block font-mono text-xs text-slate-400">Reference: {error.digest}</span>}
      </p>
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <RotateCw size={14} aria-hidden="true" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
        >
          <Home size={14} aria-hidden="true" />
          Go home
        </Link>
      </div>
    </div>
  );
}
