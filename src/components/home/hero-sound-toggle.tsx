"use client";

import { useState } from "react";

// Only the main video gets sound; the blurred fill copy stays muted so the
// voiceover never plays twice.
const VIDEO_SELECTOR = ".chkn-hero__video--main";

/**
 * Speaker button for the hero video. Browsers only autoplay video muted, so
 * the hero starts silent and this turns the voiceover on. The unmute happens
 * inside the tap, which is what iOS requires to allow sound.
 */
export function HeroSoundToggle() {
  const [muted, setMuted] = useState(true);

  function toggle() {
    const video = document.querySelector<HTMLVideoElement>(VIDEO_SELECTOR);
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    // Autoplay may have been refused (Low Power Mode); the tap can start it.
    if (video.paused) {
      video.play().catch(() => {});
    }
    setMuted(nextMuted);
  }

  return (
    <button
      type="button"
      className="chkn-hero__sound"
      onClick={toggle}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      aria-pressed={!muted}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
        {muted ? (
          <path d="m23 9-6 6M17 9l6 6" />
        ) : (
          <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
        )}
      </svg>
    </button>
  );
}
