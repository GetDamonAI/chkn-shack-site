"use client";

import type { ReactNode } from "react";

import {
  ORDER_ONLINE_URL,
  withOrderUtm,
  type OrderLocation,
} from "@/lib/ordering";
import { trackOrderClick } from "@/lib/tracking";

/**
 * The site's single ORDER NOW link: our online-ordering page, tagged with UTMs
 * and reported as a conversion.
 *
 * Most pages on this site are Server Components, which can't carry an onClick;
 * this is the client leaf they drop in instead. It opens in a new tab, which
 * keeps this document alive long enough for the pixel beacons to leave.
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
  return (
    <a
      href={withOrderUtm(ORDER_ONLINE_URL, location)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackOrderClick(location)}
    >
      {children}
    </a>
  );
}
