"use client";

import { useEffect, useState } from "react";
import { MapPinned } from "lucide-react";
import { readConsent, openCookiePreferences } from "@/components/CookieConsent";

/**
 * Klook "tours & activities in this city" widget (Travelpayouts affiliate
 * program). Gated on advertising consent — same bucket as the Travelpayouts
 * Drive script in app/layout.tsx — because it sets tracking cookies, so it
 * only injects once the visitor has accepted advertising cookies, and reacts
 * live to consent changes via CookieConsent's wc-consent-updated event.
 *
 * `klookCityId` comes from lib/data/klookCityIds.ts, a small hand-grown
 * lookup (Klook has no public city-ID API) — a city missing from that list
 * just renders nothing instead of an empty/broken box.
 */

const TRAVELPAYOUTS_MARKER = "788373";
const KLOOK_CAMPAIGN_ID = "137";
const KLOOK_PROMO_ID = "4497"; // Travelpayouts "Specific City/Category Tours Widget"

export function TripBookingWidget({ cityName, klookCityId }: { cityName: string; klookCityId: number }) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    function check() {
      setConsented(!!readConsent()?.advertising);
    }
    check();
    window.addEventListener("wc-consent-updated", check);
    return () => window.removeEventListener("wc-consent-updated", check);
  }, []);

  useEffect(() => {
    if (!consented) return;
    const slot = document.getElementById(`klook-widget-slot-${klookCityId}`);
    if (!slot || slot.querySelector("script")) return;
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = `https://tpemd.com/content?currency=USD&trs=584098&shmarker=${TRAVELPAYOUTS_MARKER}&locale=en&city_id=${klookCityId}&category=2&amount=3&powered_by=true&campaign_id=${KLOOK_CAMPAIGN_ID}&promo_id=${KLOOK_PROMO_ID}`;
    slot.appendChild(script);
  }, [consented, klookCityId]);

  return (
    <div className="mt-10 rounded-xl2 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
      <h2 className="mb-1 flex items-center gap-1.5 text-base font-bold text-slate-900 dark:text-white">
        <MapPinned size={18} className="text-brand-500" aria-hidden="true" />
        Plan your trip to {cityName}
      </h2>
      {consented ? (
        <div id={`klook-widget-slot-${klookCityId}`} className="mt-3" />
      ) : (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Tours and activities in {cityName} — accept advertising cookies to see live options here, or{" "}
          <button
            type="button"
            onClick={openCookiePreferences}
            className="font-medium text-brand-600 underline hover:no-underline dark:text-brand-300"
          >
            manage cookie preferences
          </button>
          .
        </p>
      )}
      <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
        Affiliate links — we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
