// Every place on the site with an ORDER NOW button. This is a closed union so
// the analytics `location` dimension and the outbound `utm_content` value can
// never drift apart or pick up a typo at a call site.
export type OrderLocation =
  | "homepage_hero"
  | "homepage_sticky_bar"
  | "homepage_locations"
  | "crates_hero"
  | "crates_final_cta"
  | "crates_sticky_bar"
  | "group_orders_hero"
  | "group_orders_final_cta"
  | "party_builder";

// Our commission-free DoorDash online-ordering page: where every ORDER NOW
// sends people. Normally the click goes through DoorDash's SDK button (see
// <OrderNowLink />); this URL is the fallback when the SDK hasn't loaded.
export const ORDER_ONLINE_URL =
  "https://order.online/business/wings-chkn-shack-13029476";
export const DOORDASH_BUSINESS_ID = 13029476;

const UTM_PARAMS = {
  utm_source: "wingschknshack.com",
  utm_medium: "website",
  utm_campaign: "direct",
} as const;

/** Tag the outbound order URL so the ordering page attributes the visit to us. */
export function withOrderUtm(url: string, location: OrderLocation): string {
  const tagged = new URL(url);
  for (const [key, value] of Object.entries(UTM_PARAMS)) {
    tagged.searchParams.set(key, value);
  }
  tagged.searchParams.set("utm_content", location);
  return tagged.toString();
}
