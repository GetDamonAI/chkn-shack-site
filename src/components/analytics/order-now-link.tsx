"use client";

import type { MouseEvent, ReactNode } from "react";

import {
  ORDER_ONLINE_URL,
  withOrderUtm,
  type OrderLocation,
} from "@/lib/ordering";
import { trackOrderClick } from "@/lib/tracking";

// DoorDash's own (hidden) order button, rendered by <DoorDashStorefront />.
const DOORDASH_BUTTON_SELECTOR = "#sf-floating-button";

/**
 * The site's single ORDER NOW link, reported as a conversion in GA4 / Meta /
 * TikTok.
 *
 * Once DoorDash's SDK has loaded, the click is handed to DoorDash's own hidden
 * button, so the order leaves through their link with all of their tracking
 * (`utm_source=sdk` + their visitor ID). Until then, or if the SDK is blocked,
 * the plain href is the fallback: the same order page with our UTMs.
 *
 * Opens in a new tab, which keeps this document alive long enough for the
 * pixel beacons to leave. The programmatic click happens inside the user's tap,
 * so popup blockers allow it.
 */
export function OrderNowLink({
  location,
  className,
  children = "Order now",
}: Readonly<{
  location: OrderLocation;
  className?: string;
  children?: ReactNode;
}>) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackOrderClick(location);

    const doordashButton = document.querySelector<HTMLAnchorElement>(
      DOORDASH_BUTTON_SELECTOR
    );
    if (!doordashButton?.href) return;

    event.preventDefault();
    doordashButton.target = "_blank";
    doordashButton.rel = "noopener noreferrer";
    doordashButton.click();
  }

  return (
    <a
      href={withOrderUtm(ORDER_ONLINE_URL, location)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
