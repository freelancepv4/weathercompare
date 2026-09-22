import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalLayout, LegalHeading } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="Placeholder — pending legal review">
      <p>
        {siteConfig.name} uses a small number of cookies and browser-storage entries, grouped into the categories below. You can choose
        which non-essential categories to allow via the cookie banner shown on your first visit, or at any time by clearing your browser
        storage.
      </p>

      <LegalHeading>Necessary</LegalHeading>
      <p>Required for the site to function — e.g. remembering your cookie consent choice itself. Always active.</p>

      <LegalHeading>Preferences</LegalHeading>
      <p>Remembers your language, unit system (°C/°F, km/h/mph/m/s, mm/in), theme (light/dark/system), favorites and recent searches — all stored locally in your browser.</p>

      <LegalHeading>Analytics</LegalHeading>
      <p>
        If accepted, aggregate, privacy-conscious analytics help us understand how the site is used (e.g. which pages are visited) so we
        can improve it. No analytics runs before you accept this category. The specific analytics provider is configured via the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">ANALYTICS_ID</code> environment variable — see{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">lib/analytics.ts</code>.
      </p>

      <LegalHeading>Advertising</LegalHeading>
      <p>
        Reserved for future use. Advertising is not currently enabled on {siteConfig.name}; this category exists so consent is already in
        place if/when advertising (e.g. Google AdSense) is turned on. See the clearly-labeled ad placeholders throughout the site.
      </p>

      <LegalHeading>Managing your choices</LegalHeading>
      <p>You can change your cookie preferences at any time by reopening the cookie banner's "Manage Preferences" option.</p>
    </LegalLayout>
  );
}
