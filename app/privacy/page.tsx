import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalLayout, LegalHeading } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects personal data, your rights under GDPR, and how to contact us about your privacy.`,
  alternates: { canonical: "/privacy" },
};

const CONTACT_EMAIL = "privacy@weathercompare.eu";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="23 September 2026">
      <p>
        This policy describes what {siteConfig.name} actually does, technically, with data connected to you — it is written to match the
        site's real implementation rather than adapted from a generic template. It is not a substitute for review by a qualified privacy
        professional, and it does not cover third-party sites you may reach by following a link from here.
      </p>

      <LegalHeading>Who is responsible for your data (data controller)</LegalHeading>
      <p>
        {siteConfig.name} is operated by an individual based in the European Union/European Economic Area, not a registered company. For
        any privacy question or to exercise the rights listed below, contact{" "}
        <a className="font-medium text-brand-600 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        . Full identity and postal contact details are provided on request, as permitted under GDPR for a sole operator without a
        registered business address.
      </p>

      <LegalHeading>Data we collect, and why</LegalHeading>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Location (optional, on request only):</strong> if you use "Use my location", your browser's geolocation API is invoked
          only after you explicitly trigger it and your browser's own permission prompt. Coordinates are sent to our server solely to
          look up the nearest city and are discarded immediately after — not stored, not logged, not linked to you.
        </li>
        <li>
          <strong>Search and location lookups:</strong> when you search for a city or view a weather page, the coordinates involved are
          sent to our geocoding and weather providers to fetch results (see "Who we share data with" below). These requests do not
          include your name, email, or any other identifier — only the coordinates or place name needed to answer the query.
        </li>
        <li>
          <strong>Preferences:</strong> language, units, theme, favorites and recent searches are stored only in your browser's local
          storage. They are never transmitted to our servers and we have no access to them.
        </li>
        <li>
          <strong>Interactive map:</strong> the map on each weather page loads tiles directly from your browser — not through our server
          — from OpenStreetMap, Esri, and (when configured) OpenWeatherMap. Loading a map tile is an ordinary web request, so those
          providers receive your IP address and standard browser headers the same way any website you visit would, independent of us.
          See "Who we share data with" for each provider's own privacy terms.
        </li>
        <li>
          <strong>Contact form:</strong> if you submit the contact form, we receive the name, email address and message you provide, used
          solely to respond to your inquiry. We keep these only as long as needed to handle the request, and delete them afterward unless
          you ask us to retain them for an ongoing matter.
        </li>
        <li>
          <strong>Analytics:</strong> Vercel Analytics and Vercel Speed Insights run only if you accept the "Analytics" cookie category
          in the cookie banner — nothing loads before that. See our{" "}
          <Link className="font-medium text-brand-600 hover:underline" href="/cookies">
            Cookie Policy
          </Link>{" "}
          for what they measure.
        </li>
        <li>
          <strong>Server logs:</strong> like virtually every website, our hosting provider (Vercel) automatically records basic request
          logs (IP address, requested URL, timestamp, user agent) for security and operational purposes — for example, to detect abuse.
          These are Vercel's standard infrastructure logs, not something this site adds on top, and are retained only as long as Vercel's
          own operational retention policy specifies.
        </li>
      </ul>
      <p>We do not use tracking pixels, fingerprinting, or cross-site advertising identifiers, and we do not sell personal data.</p>

      <LegalHeading>Legal basis for processing (GDPR Art. 6)</LegalHeading>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Delivering the weather comparison itself</strong> (location lookups, map tiles): our legitimate interest in operating
          the site you asked to use (Art. 6(1)(f)) — this is the core function you're here for, and no more data is sent than is needed
          to answer your query.
        </li>
        <li>
          <strong>Analytics and advertising cookies:</strong> your consent (Art. 6(1)(a)), given or withheld via the cookie banner, and
          withdrawable at any time — see the Cookie Policy.
        </li>
        <li>
          <strong>Contact form submissions:</strong> our legitimate interest in responding to inquiries you initiate (Art. 6(1)(f)).
        </li>
      </ul>

      <LegalHeading>Who we share data with</LegalHeading>
      <p>Data is shared only with the specific service needed to answer your request, and only the minimum needed to do so:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Weather providers</strong> — OpenWeatherMap, WeatherAPI.com and Open-Meteo (see{" "}
          <Link className="font-medium text-brand-600 hover:underline" href="/data-sources">
            Data Sources
          </Link>{" "}
          for which is active) receive coordinates or a place name from our server, never your name or contact details.
        </li>
        <li>
          <strong>Map tiles</strong> — OpenStreetMap, Esri, and OpenWeatherMap's map tile service are contacted directly by your browser
          when you view the interactive map, as described above.
        </li>
        <li>
          <strong>Trip assistant (optional)</strong> — if you use the chat assistant, the questions you type and the page you are on
          are sent from our server to Google&apos;s Gemini API to generate an answer. We don&apos;t attach your name, email or IP address,
          and we don&apos;t store the conversation. Please don&apos;t type personal information into the chat.
        </li>
        <li>
          <strong>Hosting</strong> — Vercel Inc. (USA) hosts the site and processes the server logs and analytics data described above.
          Where this involves transferring data outside the EU/EEA, it relies on Vercel's own compliance mechanisms (e.g. Standard
          Contractual Clauses) under Vercel's Data Processing Addendum — verify Vercel's current terms directly, as they can change.
        </li>
      </ul>
      <p>We do not share data with data brokers or for third-party marketing purposes.</p>

      <LegalHeading>How long we keep data</LegalHeading>
      <p>
        We don't hold a persistent record of your visits: location lookups and search coordinates are used to answer the request and
        discarded, not stored in a database. Contact form messages are kept only as long as needed to resolve your inquiry. Preferences
        live only in your own browser's storage, under your control. Infrastructure logs follow Vercel's own retention policy, not ours.
      </p>

      <LegalHeading>Your rights</LegalHeading>
      <p>Under the GDPR, you have the right to:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Access the personal data we hold about you</li>
        <li>Correct inaccurate data</li>
        <li>Request erasure ("right to be forgotten")</li>
        <li>Restrict or object to certain processing</li>
        <li>Receive your data in a portable format</li>
        <li>Withdraw consent at any time (for anything based on consent, e.g. analytics cookies), without affecting past processing</li>
        <li>Lodge a complaint with your national data protection authority</li>
      </ul>
      <p>
        To exercise any of these, email{" "}
        <a className="font-medium text-brand-600 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        or use the{" "}
        <Link className="font-medium text-brand-600 hover:underline" href="/contact">
          Contact page
        </Link>
        . Given how little we actually store, most requests can be resolved immediately by confirming there's nothing on file beyond
        what's described above.
      </p>

      <LegalHeading>Children</LegalHeading>
      <p>{siteConfig.name} is not directed at children and we do not knowingly collect personal data from anyone under 16.</p>

      <LegalHeading>Changes to this policy</LegalHeading>
      <p>
        If this policy changes in a way that materially affects how your data is handled, the "Last updated" date above will change and,
        for significant changes, we'll note it on this page.
      </p>
    </LegalLayout>
  );
}
