import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalLayout, LegalHeading } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles personal data, in line with GDPR.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="Placeholder — pending legal review">
      <p>
        This is a placeholder privacy policy for {siteConfig.name}, written to reflect the site's actual technical behavior. It is not a
        substitute for review by a qualified privacy professional before launch, particularly for compliance with the GDPR and other
        applicable European data protection law.
      </p>

      <LegalHeading>Data we collect</LegalHeading>
      <p>
        In its current form, {siteConfig.name} is designed to avoid collecting unnecessary personal data:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Location:</strong> if you use "Use my location", your browser's geolocation API is invoked only after you explicitly
          trigger it, and only after your browser's own permission prompt. Coordinates are sent to our server solely to look up the
          nearest city and are not stored.
        </li>
        <li>
          <strong>Preferences:</strong> language, units, theme, favorites and recent searches are stored only in your browser's local
          storage and are never transmitted to our servers.
        </li>
        <li>
          <strong>Contact form:</strong> if you submit the contact form, we receive the name, email address and message you provide, used
          solely to respond to your inquiry.
        </li>
        <li>
          <strong>Analytics:</strong> aggregate, privacy-respecting analytics only run if you accept the "Analytics" cookie category in
          the cookie banner. See our <a className="font-medium text-brand-600 hover:underline" href="/cookies">Cookie Policy</a>.
        </li>
      </ul>

      <LegalHeading>Legal basis for processing</LegalHeading>
      <p>
        Where processing occurs (e.g. responding to a contact form submission), it is based on your consent or on our legitimate interest
        in operating and improving the site, as applicable — to be finalized during legal review.
      </p>

      <LegalHeading>Your rights</LegalHeading>
      <p>
        Under the GDPR, you have the right to access, correct, delete, or export personal data we hold about you, and to object to or
        restrict certain processing. Contact us via the <a className="font-medium text-brand-600 hover:underline" href="/contact">Contact page</a> to exercise these rights.
      </p>

      <LegalHeading>Third parties</LegalHeading>
      <p>
        Weather data is requested from third-party providers listed on our <a className="font-medium text-brand-600 hover:underline" href="/data-sources">Data Sources</a> page.
        These requests do not include personal data beyond the coordinates or city name needed to fetch a forecast.
      </p>

      <LegalHeading>Contact</LegalHeading>
      <p>
        For privacy questions, use the <a className="font-medium text-brand-600 hover:underline" href="/contact">Contact page</a>.
      </p>
    </LegalLayout>
  );
}
