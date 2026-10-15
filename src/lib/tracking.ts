import type { OrderLocation, OrderPlatform } from "@/lib/ordering";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      page: () => void;
      track: (event: string, params?: Record<string, unknown>) => void;
    };
  }
}

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

// The site doesn't take payment — the conversion we can actually see is someone
// leaving for Uber Eats / DoorDash. `uber-eats` is the internal platform key;
// analytics wants snake_case, so map once here rather than at every call site.
const PLATFORM_EVENT_VALUE: Record<OrderPlatform, string> = {
  "uber-eats": "uber_eats",
  doordash: "doordash",
};

/**
 * Fire the outbound-click conversion into all three pixels.
 *
 * Meta has no "left for a delivery partner" standard event, so this reports
 * `Lead`; TikTok's closest is `CompleteRegistration`. Both are the events the
 * ad campaigns optimise against — renaming them means re-pointing the
 * campaigns, so keep them in sync with Events Manager.
 */
export function trackPlatformClick(
  platform: OrderPlatform,
  location: OrderLocation
) {
  if (typeof window === "undefined") return;

  const platformValue = PLATFORM_EVENT_VALUE[platform];

  window.gtag?.("event", "platform_click", {
    platform: platformValue,
    location,
  });

  window.fbq?.("track", "Lead", {
    content_name: `${platformValue}_click`,
    content_category: "platform_redirect",
    location,
  });

  // content_type is a closed vocabulary for TikTok — anything outside
  // product / product_group / destination / hotel / flight / vehicle is
  // rejected with an "Invalid content type" warning and the event is not
  // counted. The wing order being sent to the platform is the "product".
  window.ttq?.track("CompleteRegistration", {
    content_type: "product",
    content_name: `${platformValue}_click`,
    location,
  });
}

/**
 * A franchise inquiry that actually reached the inbox (fired on server success,
 * not on submit). GA4 only, on purpose: Meta `Lead` and TikTok
 * `CompleteRegistration` are what the delivery-order campaigns optimise
 * against, and franchise leads mixed in would skew them.
 */
export function trackFranchiseInquiry(investmentRange: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "generate_lead", {
    lead_source: "franchise_inquiry",
    investment_range: investmentRange || "unspecified",
  });
}
