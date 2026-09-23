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
    <LegalLayout title="Cookie Policy" updated="23 September 2026">
      <p>
        {siteConfig.name} uses a small number of cookies and browser-storage entries, grouped into the categories below. Only
        "Necessary" storage is active before you choose — everything else waits for your explicit opt-in via the cookie banner shown on
        your first visit, or any time after via "Manage Preferences" in the footer.
      </p>

      <LegalHeading>Necessary</LegalHeading>
      <p>
        Required for the site to function and always active — there's no consent toggle for these because the site can't work without
        them:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">wc_cookie_consent</code> — remembers your cookie
          choice itself, so you're not asked again every visit.
        </li>
      </ul>

      <LegalHeading>Preferences</LegalHeading>
      <p>
        Stored locally in your browser only — never sent to our server:{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">wc_locale</code> (language),{" "}
        plus your unit system (°C/°F, km/h/mph/m/s, mm/in), theme (light/dark/system), favorites, and recent searches.
      </p>

      <LegalHeading>Analytics</LegalHeading>
      <p>
        If accepted, we use <strong>Vercel Analytics</strong> and <strong>Vercel Speed Insights</strong> — privacy-oriented,
        cookieless-by-default tools built into our hosting platform — to see aggregate traffic patterns and page performance (e.g. which
        pages are visited, how fast they load). They don't use third-party advertising cookies and don't build cross-site profiles. See{" "}
        <a className="font-medium text-brand-600 hover:underline" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">
          Vercel's Analytics privacy documentation
        </a>{" "}
        for specifics — verify current terms there, as they can change. Nothing in this category loads before you accept it.
      </p>

      <LegalHeading>Advertising</LegalHeading>
      <p>
        Reserved for future use. Advertising is not currently enabled on {siteConfig.name}; this category exists so consent is already in
        place if/when advertising is turned on. This page will be updated with specifics before that happens.
      </p>

      <LegalHeading>Not a cookie, but worth knowing: map tiles</LegalHeading>
      <p>
        The interactive map on each weather page loads image tiles directly from your browser to OpenStreetMap, Esri, and (when
        configured) OpenWeatherMap. This is an ordinary web request, not a cookie, and isn't gated by the banner above — declining
        non-essential cookies doesn't stop map tiles from loading, since the map is core content, not tracking. Each provider may log
        that request the way any web server does; see their own privacy policies for details. See our{" "}
        <a className="font-medium text-brand-600 hover:underline" href="/privacy">
          Privacy Policy
        </a>{" "}
        for more.
      </p>

      <LegalHeading>Managing your choices</LegalHeading>
      <p>
        Change your cookie preferences at any time via "Manage Preferences" in the footer, or by clearing this site's data in your
        browser settings (which resets you to the first-visit banner).
      </p>
    </LegalLayout>
  );
}
