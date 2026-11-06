// The live stores. The homepage location cards report the store itself as the
// `location`, so a Langley click and a Tsawwassen click can be told apart.
export type OrderStore = "downtown" | "langley" | "tsawwassen";

// Every place on the site with an ORDER NOW button. This is a closed union so
// the analytics `location` dimension and the outbound `utm_content` value can
// never drift apart or pick up a typo at a call site.
export type OrderLocation =
  | OrderStore
  | "homepage_hero"
  | "homepage_sticky_bar"
  | "crates_hero"
  | "crates_final_cta"
  | "crates_sticky_bar"
  | "group_orders_hero"
  | "group_orders_final_cta"
  | "party_builder";

// Our commission-free DoorDash online-ordering page: where every ORDER NOW
// sends people. Normally the click goes through DoorDash's SDK button (see
// <OrderNowLink />); otherwise it goes via ORDER_REDIRECT_PATH, which logs the
// hit and redirects here.
export const ORDER_ONLINE_URL =
  "https://order.online/business/wings-chkn-shack-13029476";
export const DOORDASH_BUSINESS_ID = 13029476;

const UTM_PARAMS = {
  utm_source: "wingschknshack.com",
  utm_medium: "website",
  utm_campaign: "direct",
} as const;

// Our own redirect (src/app/go/dd/route.ts): logs the hit, then forwards to
// ORDER_ONLINE_URL with the same UTMs.
export const ORDER_REDIRECT_PATH = "/go/dd";

/** The ORDER NOW href: our redirect, tagged so the visit is attributed to us. */
export function orderNowHref(location: OrderLocation): string {
  const params = new URLSearchParams({ ...UTM_PARAMS, utm_content: location });
  return `${ORDER_REDIRECT_PATH}?${params}`;
}
