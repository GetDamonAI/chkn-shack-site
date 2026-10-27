import { defaultStoreMap } from "@/lib/ordering";

export const SITE_URL = "https://wingschknshack.com";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export type VenueSlug =
  | "downtown-vancouver"
  | "langley"
  | "tsawwassen"
  | "abbotsford";

export type VenueHours = {
  /** Shown on the page, e.g. "Fri – Sat". */
  label: string;
  /** schema.org day names. */
  days: string[];
  opens: string;
  closes: string;
  /** Shown on the page, e.g. "11am – midnight". */
  time: string;
};

export type Venue = {
  slug: VenueSlug;
  /** "Langley" — the page H1 reads "CHKN Shack · {name}". */
  name: string;
  status: "live" | "opening-soon";
  /** Delivery neighbourhoods, closest first. Feeds the copy and the meta description. */
  neighbourhoods: string[];
  // Address, geo, phone and hours are optional: a venue renders and emits schema
  // with only the facts we actually have, rather than guessed ones.
  address?: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
  };
  geo?: { latitude: number; longitude: number };
  phone?: string;
  hours?: VenueHours[];
  /** Order links. Absent for venues that are not live yet. */
  order?: { uberEats: string; doorDash: string };
};

export const venues: Venue[] = [
  {
    slug: "downtown-vancouver",
    name: "Downtown Vancouver",
    status: "live",
    neighbourhoods: ["Downtown", "Yaletown", "the West End", "Coal Harbour", "Gastown"],
    // DT has its own storefronts, so it links straight to them.
    order: {
      uberEats: defaultStoreMap.stores.vancouver.platforms["uber-eats"]!.webUrl,
      doorDash: defaultStoreMap.stores.vancouver.platforms.doordash!.webUrl,
    },
  },
  {
    slug: "langley",
    name: "Langley",
    status: "live",
    neighbourhoods: ["Langley City", "Willoughby", "Murrayville", "Brookswood", "Walnut Grove"],
    address: {
      street: "19696 Fraser Highway",
      locality: "Langley",
      region: "BC",
      postalCode: "V3A 4C4",
    },
    geo: { latitude: 49.1067, longitude: -122.6719 },
    hours: [
      {
        label: "Sun – Thu",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        opens: "11:00",
        closes: "23:00",
        time: "11am – 11pm",
      },
      {
        label: "Fri – Sat",
        days: ["Friday", "Saturday"],
        opens: "11:00",
        closes: "00:00",
        time: "11am – midnight",
      },
    ],
    order: {
      uberEats: "https://www.ubereats.com/ca/search?q=chkn+shack+langley",
      doorDash: "https://www.doordash.com/search/store/chkn+shack+langley/",
    },
  },
  {
    slug: "tsawwassen",
    name: "Tsawwassen",
    status: "live",
    neighbourhoods: ["Tsawwassen", "Ladner", "Boundary Bay", "Beach Grove"],
    order: {
      uberEats: "https://www.ubereats.com/ca/search?q=chkn+shack+tsawwassen",
      doorDash: "https://www.doordash.com/search/store/chkn+shack+tsawwassen/",
    },
  },
  {
    slug: "abbotsford",
    name: "Abbotsford",
    status: "opening-soon",
    neighbourhoods: ["Abbotsford", "Clearbrook", "Mill Lake"],
  },
];

export function getVenue(slug: string): Venue | undefined {
  return venues.find((venue) => venue.slug === slug);
}

export function venueUrl(venue: Venue) {
  return `${SITE_URL}/locations/${venue.slug}`;
}

/** "A, B, and C" */
export function listNeighbourhoods(venue: Venue) {
  const n = venue.neighbourhoods;
  return n.length < 3 ? n.join(" and ") : `${n.slice(0, -1).join(", ")}, and ${n.at(-1)}`;
}

export function venueTitle(venue: Venue) {
  return `CHKN Shack ${venue.name} | Chicken Wings Delivery`;
}

export function venueDescription(venue: Venue) {
  const area = venue.neighbourhoods.filter((n) => n !== venue.name).join(", ");
  return venue.status === "live"
    ? `Order CHKN Shack wings for delivery in ${venue.name}, ${area}. Hand-sauced bone-in wings, Shack Cut Fries, and Crates for groups. Uber Eats + DoorDash.`
    : `CHKN Shack is opening soon in ${venue.name}, delivering to ${area}. Hand-sauced bone-in wings, Shack Cut Fries, and Crates for groups. Uber Eats + DoorDash.`;
}

export function venueJsonLd(venue: Venue) {
  const platforms = [
    "http://schema.org/DesktopWebPlatform",
    "http://schema.org/MobileWebPlatform",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `CHKN Shack ${venue.name}`,
    url: venueUrl(venue),
    image: OG_IMAGE,
    servesCuisine: ["Chicken Wings", "Comfort Food"],
    priceRange: "$$",
    ...(venue.phone && { telephone: venue.phone }),
    ...(venue.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: venue.address.street,
        addressLocality: venue.address.locality,
        addressRegion: venue.address.region,
        postalCode: venue.address.postalCode,
        addressCountry: "CA",
      },
    }),
    ...(venue.geo && {
      geo: { "@type": "GeoCoordinates", ...venue.geo },
    }),
    ...(venue.hours && {
      openingHoursSpecification: venue.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    hasMenu: `${SITE_URL}/#menu`,
    ...(venue.order && {
      potentialAction: {
        "@type": "OrderAction",
        target: [venue.order.uberEats, venue.order.doorDash].map((url) => ({
          "@type": "EntryPoint",
          urlTemplate: url,
          actionPlatform: platforms,
        })),
        deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      },
    }),
  };
}
