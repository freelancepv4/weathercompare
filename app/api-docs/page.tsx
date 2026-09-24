import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalLayout, LegalHeading } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "API",
  description: `Overview of the ${siteConfig.name} internal weather provider API architecture.`,
  alternates: { canonical: "/api-docs" },
  // Internal developer notes, not useful to searchers — keep out of the index.
  robots: { index: false, follow: true },
};

export default function ApiDocsPage() {
  return (
    <LegalLayout title="API">
      <p>
        {siteConfig.name} does not yet offer a public API for third-party developers. This page documents the internal API architecture
        for reference; a public, rate-limited, authenticated API is a natural premium feature to add later (see the Future Premium
        Features list in the project README).
      </p>

      <LegalHeading>Internal endpoints</LegalHeading>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">GET /api/geocode?q=&lt;query&gt;</code> — location search / autocomplete.
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">GET /api/providers/providerA?lat=&amp;lon=</code> — current + hourly + daily + alerts from Provider A.
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">GET /api/providers/providerB?lat=&amp;lon=</code> — same shape, Provider B.
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">GET /api/providers/providerC?lat=&amp;lon=</code> — same shape, Provider C.
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">POST /api/contact</code> — validated contact form submission.
        </li>
      </ul>

      <LegalHeading>Design principles</LegalHeading>
      <p>
        Every provider implements the same <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">WeatherProvider</code> TypeScript interface (see{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">types/weather.ts</code>), so the frontend and API routes never depend on a specific vendor's response
        shape. API keys are read from server-side environment variables only and are never sent to the browser.
      </p>
    </LegalLayout>
  );
}
