import { OrderNowLink } from "@/components/analytics/order-now-link";
import { HeroSoundToggle } from "@/components/home/hero-sound-toggle";
import { HeroVideo } from "@/components/home/hero-video";

// v2 ("Only Canadian Chickens") is one cut for every screen size, so phones and
// desktop get the same file. The v1 cuts (chkn-launch-hero.mp4 / -mobile.mp4 /
// -poster.jpg) stay in /public/videos as a rollback until 2026-11-04.
const VIDEO_SRC = "/videos/chkn-launch-hero-v2.mp4";
const MOBILE_VIDEO_SRC = VIDEO_SRC;
const POSTER_SRC = "/videos/chkn-launch-hero-v2-poster.jpg";

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
          <HeroVideo
            className="chkn-hero__video chkn-hero__video--fill"
            src={VIDEO_SRC}
            mobileSrc={MOBILE_VIDEO_SRC}
            poster={POSTER_SRC}
          />
          <HeroVideo
            className="chkn-hero__video chkn-hero__video--main"
            src={VIDEO_SRC}
            mobileSrc={MOBILE_VIDEO_SRC}
            poster={POSTER_SRC}
          />
          <div className="chkn-hero__overlay" />
        </div>

        {/* Outside the media layer: on phones the content layer sits on top of
            the video and would swallow taps. */}
        <HeroSoundToggle />

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
              <OrderNowLink location="homepage_hero" className="chkn-cta chkn-cta--order">
                ORDER NOW
              </OrderNowLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
