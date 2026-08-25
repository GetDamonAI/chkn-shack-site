import type { MetadataRoute } from "next";

const SITE_URL = "https://wingschknshack.com";

// The Tailgate Crate is a card on /crates, not its own route — this site has no
// per-product pages, so /crates is the canonical URL for every crate SKU.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-21");

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/crates`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/group-orders`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/franchising`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
