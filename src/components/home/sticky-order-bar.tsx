"use client";

import { useEffect, useState } from "react";

import { OrderNowLink } from "@/components/analytics/order-now-link";

// Dismissing the bar hides it for 24 hours. localStorage has no expiry of its
// own, so the time of dismissal is stored alongside the flag.
const DISMISSED_KEY = "chkn_sticky_dismissed";
const DISMISSED_AT_KEY = "chkn_sticky_dismissed_at";
const DISMISS_FOR_MS = 24 * 60 * 60 * 1000;

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function isDismissed() {
  try {
    if (localStorage.getItem(DISMISSED_KEY) !== "1") return false;
    const at = Number(localStorage.getItem(DISMISSED_AT_KEY));
    if (Date.now() - at < DISMISS_FOR_MS) return true;
    localStorage.removeItem(DISMISSED_KEY);
    localStorage.removeItem(DISMISSED_AT_KEY);
  } catch {
    // Storage blocked (private mode etc.): treat as not dismissed.
  }
  return false;
}

function rememberDismissed() {
  try {
    localStorage.setItem(DISMISSED_KEY, "1");
    localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
  } catch {
    // Storage blocked: the bar still closes for this page view.
  }
}

/**
 * Mobile-only ORDER NOW reminder for the homepage. Hidden while the element
 * with `heroId` is on screen (the hero has its own ORDER NOW), slides up once
 * the hero has scrolled away, and can be dismissed for 24 hours. Starts hidden
 * because the hero is what's on screen at page load.
 */
export function StickyOrderBar({ heroId }: Readonly<{ heroId: string }>) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Dismissed earlier: never start observing, so the bar stays hidden.
    if (isDismissed()) return;
    const hero = document.getElementById(heroId);
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setHeroVisible(entry.isIntersecting);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  const hidden = heroVisible || closed;

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex items-center gap-1.5 rounded-[1.4rem] bg-[#0a0a0a] p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[ease] md:hidden",
        hidden && "pointer-events-none translate-y-[calc(100%+2rem)]"
      )}
      inert={hidden}
    >
      <OrderNowLink
        location="homepage_sticky_bar"
        className="flex min-h-10 flex-1 items-center justify-center rounded-full bg-[#FFC94B] px-5 text-center font-display text-base uppercase tracking-[0.14em] text-[#0a0a0a] shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#FFC94B]"
      >
        Order now
      </OrderNowLink>
      <button
        type="button"
        aria-label="Dismiss order bar"
        onClick={() => {
          rememberDismissed();
          setClosed(true);
        }}
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#F5EDE0]/70 transition-colors hover:text-[#F5EDE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EDE0]"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>
    </div>
  );
}
