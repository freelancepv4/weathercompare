"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { readConsent } from "@/components/CookieConsent";
import { useTranslations } from "@/lib/i18n/I18nProvider";

/**
 * Ad units (highrevenueformat.com).
 *
 *  - "banner" → 320×50 strip, between page sections
 *  - "inline" / "square" → 300×250 box, after the main content
 *
 * Reader- and Google-friendly by design:
 *  - Only loads after the visitor accepts "Advertising" cookies (EU consent).
 *  - Lazy: the ad loads only when its slot is about to scroll into view.
 *  - Each ad runs inside its own sandboxed iframe, so the ad script can't
 *    touch our page, open pop-unders over it or redirect the visitor
 *    (no allow-top-navigation). Clicks on the ad still open in a new tab.
 *  - Space is reserved at the exact size, so nothing jumps (no layout shift).
 *  - Clearly labelled "Advertisement"; never shown inside /embed widgets.
 */
const UNITS = {
  banner: { key: "6ab22c4fd8ad5465c838abe2e93a77b6", w: 320, h: 50 },
  box: { key: "def578511e1fb56b8dc8cdc14c4cddba", w: 300, h: 250 },
} as const;

function adDoc(key: string, w: number, h: number) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body><script>atOptions={'key':'${key}','format':'iframe','height':${h},'width':${w},'params':{}};</script><script src="https://www.highrevenueformat.com/${key}/invoke.js"></script></body></html>`;
}

export function AdSlot({ variant = "banner" }: { variant?: "banner" | "square" | "inline" }) {
  const t = useTranslations();
  const pathname = usePathname();
  const unit = variant === "banner" ? UNITS.banner : UNITS.box;
  const ref = useRef<HTMLDivElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setAllowed(!!readConsent()?.advertising);
    check();
    window.addEventListener("wc-consent-updated", check);
    return () => window.removeEventListener("wc-consent-updated", check);
  }, []);

  useEffect(() => {
    if (!allowed || visible || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [allowed, visible]);

  if (!allowed || pathname?.startsWith("/embed")) return null;

  return (
    <aside ref={ref} className="my-2 flex flex-col items-center" aria-label={t("ad.label")}>
      <span className="mb-1 text-[10px] font-medium uppercase tracking-widest text-slate-400">{t("ad.label")}</span>
      <div style={{ width: unit.w, height: unit.h, maxWidth: "100%" }} className="overflow-hidden rounded-lg">
        {visible && (
          <iframe
            title={t("ad.label")}
            width={unit.w}
            height={unit.h}
            srcDoc={adDoc(unit.key, unit.w, unit.h)}
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ border: 0, display: "block" }}
          />
        )}
      </div>
    </aside>
  );
}
