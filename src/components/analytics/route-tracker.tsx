"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Re-reports a page view to Meta and TikTok on each client-side navigation.
 *
 * Two deliberate omissions, both confirmed against real beacons in a browser:
 *
 * 1. The mount run is skipped. meta-pixel and tiktok-pixel each already report
 *    the landing page view, so reporting again here would double every
 *    session's first page view.
 * 2. GA4 is not called at all. gtag.js Enhanced Measurement already tracks
 *    History API navigations ("Page changes based on browser history events",
 *    on by default), and App Router routing is pushState — sending our own
 *    page_view on top of it produced exactly two per navigation. If that
 *    setting is ever turned off in the GA4 property, GA4 stops counting
 *    in-app navigations and this is the place to add it back.
 */
export function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    window.fbq?.("track", "PageView");
    window.ttq?.page();
  }, [pathname, searchParams]);

  return null;
}
