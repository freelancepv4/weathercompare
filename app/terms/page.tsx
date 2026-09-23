import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalLayout, LegalHeading } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for using ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

const CONTACT_EMAIL = "privacy@weathercompare.eu";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="23 September 2026">
      <p>
        These terms govern your use of {siteConfig.name}, a free weather comparison and city-information site. By using the site, you
        agree to them. This is a general-audience consumer terms document; it is not a substitute for review by a qualified legal
        professional for your specific circumstances.
      </p>

      <LegalHeading>The service</LegalHeading>
      <p>
        {siteConfig.name} aggregates and displays weather forecast data from third-party providers, alongside destination information
        and news headlines, for informational purposes only. It does not produce its own weather forecasts, does not employ
        meteorologists, and is not a meteorological authority. See{" "}
        <a className="font-medium text-brand-600 hover:underline" href="/data-sources">
          Data Sources
        </a>{" "}
        for exactly where each type of content comes from.
      </p>

      <LegalHeading>No warranty on weather data, or on the site's availability</LegalHeading>
      <p>
        Weather forecasts are inherently uncertain and may be inaccurate, delayed, or unavailable. {siteConfig.name} makes no guarantee
        of accuracy, completeness, or timeliness of any forecast, comparison, alert, or piece of destination information shown on the
        site. <strong>Do not rely on this site as your sole source of information for safety-critical decisions</strong> — always consult
        your national meteorological service for official warnings and advisories. The site itself is provided "as is": we don't
        guarantee uninterrupted or error-free availability, though we do monitor and work to keep it running (see our{" "}
        <a className="font-medium text-brand-600 hover:underline" href="/status">
          status page
        </a>
        ).
      </p>

      <LegalHeading>News section</LegalHeading>
      <p>
        The News section shows headlines and short excerpts from third-party publishers (currently BBC News), each linking back to the
        original article on the publisher's own site. We do not host, modify, or claim authorship of that content — see the excerpt's
        "Source" attribution and click through to read the full piece on the publisher's site.
      </p>

      <LegalHeading>Acceptable use</LegalHeading>
      <p>You agree not to:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Scrape or systematically extract data from the site at a rate or in a manner that would violate our upstream providers' own terms of use.</li>
        <li>Attempt to circumvent rate limiting or other technical protections on the site or its APIs.</li>
        <li>Use the site to transmit malware, spam, or unlawful content, or to attack, disrupt, or gain unauthorized access to it.</li>
        <li>Misrepresent your affiliation with {siteConfig.name} or use its branding without permission.</li>
      </ul>
      <p>We may suspend or block access for use that violates this section.</p>

      <LegalHeading>Intellectual property</LegalHeading>
      <p>
        The {siteConfig.name} name, logo, design and original codebase belong to their respective owners. Third-party weather data,
        city-guide facts, and news content remain the property of their respective providers/publishers and are used under attribution as
        described on the{" "}
        <a className="font-medium text-brand-600 hover:underline" href="/data-sources">
          Data Sources
        </a>{" "}
        page.
      </p>

      <LegalHeading>Limitation of liability</LegalHeading>
      <p>
        To the fullest extent permitted by applicable law, {siteConfig.name} and its operator are not liable for any indirect,
        incidental, or consequential loss arising from your use of, or inability to use, the site — including decisions made based on a
        forecast, comparison, or alert shown here. Nothing in these terms limits liability that cannot be limited under applicable
        consumer-protection law (for example, liability for death or personal injury caused by negligence, where legally non-excludable).
      </p>

      <LegalHeading>Changes</LegalHeading>
      <p>
        We may update these terms from time to time; the "Last updated" date above reflects the latest revision. Continued use of the
        site after a change constitutes acceptance of the updated terms.
      </p>

      <LegalHeading>Governing law</LegalHeading>
      <p>
        These terms are governed by the laws of the European Union member state in which the site's operator is established, without
        prejudice to any mandatory consumer-protection rights you have under the law of your own country of residence.
      </p>

      <LegalHeading>Contact</LegalHeading>
      <p>
        Questions about these terms can be sent to{" "}
        <a className="font-medium text-brand-600 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        or via the{" "}
        <a className="font-medium text-brand-600 hover:underline" href="/contact">
          Contact page
        </a>
        .
      </p>
    </LegalLayout>
  );
}
