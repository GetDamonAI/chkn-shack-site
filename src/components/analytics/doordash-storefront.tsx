import Script from "next/script";

import { DOORDASH_BUSINESS_ID } from "@/lib/ordering";

/**
 * DoorDash Storefront SDK, mounted once in the root layout. This is DoorDash's
 * snippet verbatim (only the business ID comes from ordering.ts), so all of
 * their tracking runs as they built it: the visitor ID, the button-load
 * impression, their experimentation script and the server-driven sign-up
 * pop-up.
 *
 * Their red "Order Online" bar is hidden in globals.css. Our branded ORDER NOW
 * buttons click it instead (see <OrderNowLink />), so every order still leaves
 * through DoorDash's own link: `utm_source=sdk` plus that visitor ID.
 *
 * Note the SDK swaps its own API once loaded: `executeCommand` only exists on
 * the pre-load buffer below, so commands can't be issued from elsewhere later.
 */
const SDK_SNIPPET = `
(function(e, t) {
  var o, c, s;
  o = e.document, c = t.children[0], s = o.createElement("script"), e.StorefrontSDKObject = "StorefrontSDK", e[e.StorefrontSDKObject] = {
    executeCommand: function(t, r) {
      e[e.StorefrontSDKObject].buffer.push([t, r])
    },
    buffer: []
  }, s.async = 1, s.src = 'https://web-apps.cdn4dd.com/webapps/sdk-storefront/latest/sdk.js', t.insertBefore(s, c)
})(window, document.head);
StorefrontSDK.executeCommand('renderFloatingButton', {
  businessId: ${DOORDASH_BUSINESS_ID},
  businessSlug: 'Wings Chkn Shack',
  floatingBar: true,
  position: 'bottom',
  buttonAlignment: 'center',
  backgroundColor: 'transparent',
  buttonBackgroundColor: '#D92128',
  borderColor: 'transparent',
  buttonText: 'Order Online',
  showModal: true
});
`;

export function DoorDashStorefront() {
  return (
    <Script id="doordash-storefront-sdk" strategy="afterInteractive">
      {SDK_SNIPPET}
    </Script>
  );
}
