"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

import { DOORDASH_BUSINESS_ID } from "@/lib/ordering";
import { trackPlatformClick } from "@/lib/tracking";

/**
 * DoorDash Storefront SDK: renders DoorDash's red "Order Online" floating bar on
 * every page and links it to our online-ordering storefront. Mounted once in the
 * root layout. The snippet is DoorDash's, verbatim apart from the business ID
 * coming from ordering.ts.
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
  const pathname = usePathname();

  // Keep the bar from doubling up on (and covering) the homepage hero's own
  // ORDER NOW: hide it while the hero is on screen. The bar is DoorDash's
  // element, so this flags <html> and globals.css does the hiding.
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.getElementById("launch-hero");
    if (!hero) {
      delete root.dataset.ddBarHidden;
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) root.dataset.ddBarHidden = "";
      else delete root.dataset.ddBarHidden;
    });
    observer.observe(hero);
    return () => {
      observer.disconnect();
      delete root.dataset.ddBarHidden;
    };
  }, [pathname]);

  // Count the bar's clicks with one delegated listener instead of wrapping it.
  useEffect(() => {
    function handleClick(event: globalThis.MouseEvent) {
      if ((event.target as Element | null)?.closest?.("#sf-floating-button")) {
        trackPlatformClick("order-online", "doordash_floating_bar");
      }
    }
    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return (
    <Script id="doordash-storefront-sdk" strategy="afterInteractive">
      {SDK_SNIPPET}
    </Script>
  );
}
