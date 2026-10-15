import type { MetadataRoute } from "next";

// Matches the origin used by app/sitemap.ts — the two must agree or crawlers
// treat the sitemap as cross-host and ignore it.
const SITE_URL = "https://wingschknshack.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
