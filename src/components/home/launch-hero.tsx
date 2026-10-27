import { PlatformLink } from "@/components/analytics/platform-link";

// Search URLs, not storefronts: each platform routes the visitor to their
// nearest venue (Vancouver, Langley, Tsawwassen).
const UBER_EATS_SEARCH = "https://www.ubereats.com/ca/search?q=chkn+shack";
const DOORDASH_SEARCH = "https://www.doordash.com/search/store/chkn+shack/";

const VIDEO_SRC = "/videos/chkn-launch-hero.mp4";
// Phones (under 768px) get their own cut; picked once at load via <source media>.
const MOBILE_VIDEO_SRC = "/videos/chkn-launch-hero-mobile.mp4";
const MOBILE_MEDIA = "(max-width: 767px)";
const POSTER_SRC = "/videos/chkn-launch-hero-poster.jpg";

/**
 * Langley + Tsawwassen launch / BOGO hero. The video carries the headline, so
 * the overlay stays deliberately minimal. Under 768px the content overlays a
 * full-bleed video; from 768px the card splits into a 9:16 video column and a
 * content column. Styles live in globals.css under
 * `.chkn-hero*` / `.chkn-cta*`.
 *
 * Temporary: the previous hero is on the `hero/pre-bogo-backup` branch —
 * revert this commit when the BOGO window ends.
 */
export function LaunchHero() {
  return (
    <div className="chkn-hero-wrap">
      <section
        id="launch-hero"
        className="chkn-hero"
        aria-label="Now open in Langley and Tsawwassen"
      >
        <div className="chkn-hero__media">
          {/* Large phones / small tablets (480–767px) only: the video is
              vertical, so it's shown uncropped over a blurred copy of itself
              instead of cropping off the baked-in headline. Same URL, so it's
              one download. From 768px the hero splits into columns instead. */}
          <video
            className="chkn-hero__video chkn-hero__video--fill"
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={MOBILE_VIDEO_SRC} media={MOBILE_MEDIA} type="video/mp4" />
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
          <video
            className="chkn-hero__video chkn-hero__video--main"
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={MOBILE_VIDEO_SRC} media={MOBILE_MEDIA} type="video/mp4" />
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
          <div className="chkn-hero__overlay" />
        </div>

        <div className="chkn-hero__content">
          <div className="chkn-hero__top">
            <div className="chkn-hero__badge">
              <span className="chkn-hero__badge-dot" aria-hidden="true" />
              <span>BUY 1 GET 1 · 10PC WINGS · 2 WEEKS ONLY</span>
            </div>
          </div>

          <div className="chkn-hero__spacer" aria-hidden="true" />

          <div className="chkn-hero__bottom">
            <h1 className="chkn-hero__label">
              <span>
                NOW OPEN<span className="chkn-hero__label-sep"> ·</span>
              </span>
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
        </div>
      </section>
    </div>
  );
}
