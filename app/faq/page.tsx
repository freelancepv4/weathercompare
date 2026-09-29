import type { Metadata } from "next";
import { FaqPage } from "@/components/FaqPage";
import { FAQ_COPY } from "@/lib/content/faq";
import { localizedMetadata } from "@/lib/i18n/pageMeta";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const t = FAQ_COPY.en;
  return localizedMetadata("en", { kind: "faq" }, t.title, t.desc);
}

export default function Page() {
  return <FaqPage locale="en" />;
}
