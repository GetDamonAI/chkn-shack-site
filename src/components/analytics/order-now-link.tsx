"use client";

import type { MouseEvent, ReactNode } from "react";

import {
  ORDER_ONLINE_URL,
  withOrderUtm,
  type OrderLocation,
} from "@/lib/ordering";
import { trackPlatformClick } from "@/lib/tracking";

declare global {
  interface Window {
    // Set by DoorDash's Storefront SDK (see <DoorDashStorefront />) once loaded.
    StorefrontSDK?: { visitorId?: string };
  }
}

/**
 * The site's single ORDER NOW link: our DoorDash online-ordering storefront,
 * tagged with UTMs and reported as an `order-online` conversion.
 *
 * Opens in a new tab like the platform links before it, which keeps this
 * document alive long enough for the pixel beacons to leave. If DoorDash's SDK
 * has loaded, its visitor ID is added at click time so DoorDash can tie the
 * order back to the same visitor its floating bar saw.
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
  const href = withOrderUtm(ORDER_ONLINE_URL, location);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackPlatformClick("order-online", location);

    const visitorId = window.StorefrontSDK?.visitorId;
    if (visitorId) {
      const url = new URL(href);
      url.searchParams.set("visitorId", visitorId);
      event.currentTarget.href = url.toString();
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
