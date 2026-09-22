import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalLayout, LegalHeading } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for using ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="Placeholder — pending legal review">
      <p>
        These Terms of Service are a placeholder draft and should be reviewed by a qualified legal professional before {siteConfig.name}
        is launched publicly with real users.
      </p>

      <LegalHeading>The service</LegalHeading>
      <p>
        {siteConfig.name} aggregates and displays weather forecast data from third-party providers for informational purposes only. It
        does not produce its own weather forecasts and is not a meteorological authority.
      </p>

      <LegalHeading>No warranty on weather data</LegalHeading>
      <p>
        Weather forecasts are inherently uncertain and may be inaccurate, delayed, or unavailable. {siteConfig.name} makes no guarantee
        of accuracy, completeness, or timeliness of any forecast, comparison, or alert shown on the site. Do not rely on this site as
        your sole source of information for safety-critical decisions — always consult your national meteorological service for official
        warnings.
      </p>

      <LegalHeading>Acceptable use</LegalHeading>
      <p>
        You agree not to misuse the site, including by attempting to scrape data at a rate that would violate our upstream providers'
        terms, attempting to circumvent rate limiting, or using the site for any unlawful purpose.
      </p>

      <LegalHeading>Intellectual property</LegalHeading>
      <p>
        The {siteConfig.name} name, design and codebase (excluding third-party weather data, which remains the property of its
        respective providers) belong to their respective owners.
      </p>

      <LegalHeading>Changes</LegalHeading>
      <p>We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>

      <LegalHeading>Contact</LegalHeading>
      <p>
        Questions about these terms can be sent via the <a className="font-medium text-brand-600 hover:underline" href="/contact">Contact page</a>.
      </p>
    </LegalLayout>
  );
}
