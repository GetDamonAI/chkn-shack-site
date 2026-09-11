"use client";

import type { ReactNode } from "react";

import {
  defaultStoreMap,
  getOrderLink,
  type OrderLocation,
  type OrderPlatform,
} from "@/lib/ordering";
import { trackPlatformClick } from "@/lib/tracking";

type PlatformLinkProps = {
  platform: OrderPlatform;
  location: OrderLocation;
  className?: string;
  children: ReactNode;
};

/**
 * An outbound Uber Eats / DoorDash link that reports itself.
 *
 * Most pages on this site are Server Components, which can't carry an onClick.
 * This is the client leaf they drop in instead — it resolves the store URL (so
 * no page hardcodes a storefront URL any more), appends the UTMs, and fires the
 * conversion event. It opens in a new tab, which also keeps this document alive
 * long enough for the three pixel beacons to leave the browser.
 */
export function PlatformLink({
  platform,
  location,
  className,
  children,
}: PlatformLinkProps) {
  const { href } = getOrderLink(platform, null, defaultStoreMap, {
    utmContent: location,
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackPlatformClick(platform, location)}
    >
      {children}
    </a>
  );
}
