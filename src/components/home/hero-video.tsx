"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const isMobileNow = () => window.matchMedia(MOBILE_QUERY).matches;
// Unknown on the server: render no src so neither cut downloads before the
// client has picked one. The poster covers the gap.
const isMobileOnServer = () => null;

/**
 * Hero background video that loads `mobileSrc` under 768px and `src` above it.
 * Picked in JS rather than with `<source media>`, which iOS Safari ignored
 * (phones were getting the desktop cut).
 */
export function HeroVideo({
  className,
  src,
  mobileSrc,
  poster,
}: Readonly<{
  className: string;
  src: string;
  mobileSrc: string;
  poster: string;
}>) {
  const isMobile = useSyncExternalStore(subscribe, isMobileNow, isMobileOnServer);
  const current = isMobile === null ? undefined : isMobile ? mobileSrc : src;
  const ref = useRef<HTMLVideoElement>(null);

  // React sets `muted` as a property but never writes the attribute, and iOS
  // only autoplays a video that has an audio track when the attribute is there.
  // So set it ourselves and start playback once the src is in.
  useEffect(() => {
    const video = ref.current;
    if (!video || !current) return;
    video.muted = true;
    video.setAttribute("muted", "");
    video.play().catch(() => {
      // Autoplay refused (e.g. Low Power Mode): the poster stays up.
    });
  }, [current]);

  return (
    <video
      ref={ref}
      className={className}
      src={current}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
