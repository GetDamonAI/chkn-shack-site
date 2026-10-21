import { PlatformLink } from "@/components/analytics/platform-link";

// Search URLs, not storefronts: each platform routes the visitor to their
// nearest venue (Vancouver, Langley, Tsawwassen).
const UBER_EATS_SEARCH = "https://www.ubereats.com/ca/search?q=chkn+shack";
const DOORDASH_SEARCH = "https://www.doordash.com/search/store/chkn+shack/";

const VIDEO_SRC = "/videos/chkn-launch-hero.mp4";
const POSTER_SRC = "/videos/chkn-launch-hero-poster.jpg";

/**
 * Langley + Tsawwassen launch / BOGO hero. The video carries the headline, so
 * the overlay stays deliberately minimal. Styles live in globals.css under
 * `.chkn-hero*` / `.chkn-cta*`.
 *
 * Temporary: the previous hero is on the `hero/pre-bogo-backup` branch —
 * revert this commit when the BOGO window ends.
 */
export function LaunchHero() {
  return (
    <div className="chkn-hero-wrap">
      <section className="chkn-hero" aria-label="Now open in Langley and Tsawwassen">
        <div className="chkn-hero__media">
          {/* Desktop only: the video is vertical, so wide screens show it
              uncropped over a blurred copy of itself instead of cropping off
              the baked-in headline. Same URL, so it's one download. */}
          <video
            className="chkn-hero__video chkn-hero__video--fill"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <video
            className="chkn-hero__video chkn-hero__video--main"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="chkn-hero__overlay" />
        </div>

        <div className="chkn-hero__top">
          <div className="chkn-hero__badge">
            <span className="chkn-hero__badge-dot" aria-hidden="true" />
            <span>BUY 1 GET 1 · 10PC WINGS · 2 WEEKS ONLY</span>
          </div>
        </div>

        <div className="chkn-hero__spacer" aria-hidden="true" />

        <div className="chkn-hero__bottom">
          <h1 className="chkn-hero__label">
            NOW OPEN ·{" "}
            <span className="chkn-hero__label-accent">LANGLEY + TSAWWASSEN</span>
          </h1>
          <div className="chkn-hero__ctas">
            <PlatformLink
              platform="uber-eats"
              location="homepage_hero"
              href={UBER_EATS_SEARCH}
              className="chkn-cta chkn-cta--ue"
            >
              UBER EATS
            </PlatformLink>
            <PlatformLink
              platform="doordash"
              location="homepage_hero"
              href={DOORDASH_SEARCH}
              className="chkn-cta chkn-cta--dd"
            >
              DOORDASH
            </PlatformLink>
          </div>
        </div>
      </section>
    </div>
  );
}
