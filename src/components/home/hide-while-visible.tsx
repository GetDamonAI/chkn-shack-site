"use client";

import { useEffect, useState, type ReactNode } from "react";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

/**
 * Slides its children out of view while the element with `targetId` is on
 * screen — used to keep the sticky Order Now bar from doubling up on the hero's
 * own CTAs. Starts hidden because the hero is what's on screen at page load.
 */
export function HideWhileVisible({
  targetId,
  className,
  children,
}: Readonly<{
  targetId: string;
  className?: string;
  children: ReactNode;
}>) {
  const [targetVisible, setTargetVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setTargetVisible(entry.isIntersecting);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      className={cn(
        className,
        "transition-transform duration-200",
        targetVisible && "pointer-events-none translate-y-[calc(100%+8px)]"
      )}
      inert={targetVisible}
    >
      {children}
    </div>
  );
}
