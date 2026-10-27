import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { menuCategories } from "@/components/home/data";
import {
  OG_IMAGE,
  SITE_URL,
  venueUrl,
  venues,
} from "@/components/locations/data";

const TITLE = "CHKN Shack | Chicken Wings Delivery · Vancouver, Langley, Tsawwassen";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "CHKN Shack delivers hand-sauced chicken wings, Shack Cut Fries, and group-order Crates across Vancouver, Langley, and Tsawwassen. Order on Uber Eats or DoorDash.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: TITLE,
    description:
      "Hand-sauced wings, built for delivery. Order on Uber Eats or DoorDash. Now open in Vancouver, Langley, and Tsawwassen.",
    images: [OG_IMAGE],
    url: SITE_URL,
    type: "website",
    siteName: "CHKN Shack",
  },
  twitter: {
    card: "summary_large_image",
    title: "CHKN Shack · Chicken Wings Delivery",
    description:
      "Hand-sauced wings delivered across Metro Vancouver. Order on Uber Eats or DoorDash.",
    images: [OG_IMAGE],
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "CHKN Shack",
  url: SITE_URL,
  logo: `${SITE_URL}/chkn-icon.png`,
  image: OG_IMAGE,
  servesCuisine: ["Chicken Wings", "Comfort Food", "American"],
  priceRange: "$$",
  acceptsReservations: false,
  hasMenu: `${SITE_URL}/#menu`,
  sameAs: [
    "https://www.instagram.com/wingschknshack",
    "https://www.facebook.com/wingschknshack",
    "https://www.tiktok.com/@wingschknshack",
  ],
  location: venues.map((venue) => ({
    "@type": "Restaurant",
    name: `CHKN Shack ${venue.name}`,
    url: venueUrl(venue),
  })),
};

// Built off the on-page menu so the schema can't drift from what's shown.
const MENU_SCHEMA_ITEM = /^(\d+pc Wings|CHKN Crate \d+pc)$/;

const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "CHKN Shack Menu",
  hasMenuSection: menuCategories
    .filter((category) => category.name === "Wings" || category.name === "Crates")
    .map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      hasMenuItem: category.items
        .filter((item) => MENU_SCHEMA_ITEM.test(item.name))
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.composition,
        })),
    })),
};

export default function Home() {
  return (
    <>
      {[restaurantJsonLd, menuJsonLd].map((jsonLd) => (
        <script
          key={jsonLd["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <HomePage />
    </>
  );
}
