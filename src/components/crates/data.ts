import {
  DIP_FLAVOURS,
  FRY_CHOICE_NAMES,
  TAILGATE_ACTIVE,
  TAILGATE_PRICE,
  WING_FLAVOURS,
} from "@/lib/menu-constants";

export type CrateOption = {
  name: string;
  price: string;
  badge?: string;
  /** Seasonal ribbon copy. Only set on gated SKUs. */
  ribbon?: string;
  /** Lead-time badge — "Same-day" or "24hr notice". */
  notice: string;
  feeds: string;
  /**
   * What's in the crate, as one plain line. Upcharges and pick-rules live in
   * the ordering platform, not here.
   */
  composition: string;
  /** Card photo. Omit to render the card without an image. */
  image?: { src: string; alt: string };
};

export type Occasion = {
  name: string;
  detail: string;
};

export const crateOptions: CrateOption[] = [
  {
    name: "CHKN Crate 50pc",
    price: "$75",
    badge: "Small chaos",
    notice: "Same-day",
    feeds: "Feeds 5-7",
    composition: "50 wings · up to 2 flavours · 3 dips · 1 large fries",
  },
  {
    name: "CHKN Crate 100pc",
    price: "$135",
    badge: "Medium mayhem",
    notice: "24hr notice",
    feeds: "Feeds 10-15",
    composition: "100 wings · up to 3 flavours · 5 dips · 2 party fries",
  },
  {
    name: "CHKN Crate 200pc",
    price: "$245",
    badge: "Full send",
    notice: "24hr notice",
    feeds: "Feeds 20-30",
    composition: "200 wings · up to 4 flavours · 8 dips · 4 party fries",
  },
  // Seasonal SKU — Football Season, Sep 1 – Feb 28. Gated on
  // NEXT_PUBLIC_TAILGATE_ACTIVE so it can be pulled without a code deploy.
  ...(TAILGATE_ACTIVE
    ? [
        {
          name: "The Tailgate Crate",
          price: TAILGATE_PRICE,
          ribbon: "For Football SZN",
          notice: "Same-day",
          feeds: "Feeds the crew (5–7)",
          composition: "50 wings · up to 3 flavours · 4 dips · large fries · 3 pops",
          image: {
            src: "/menu/crates-hero.webp",
            alt: "The Tailgate Crate — 50 wings, fries, dips, pops.",
          },
        } satisfies CrateOption,
      ]
    : []),
];

/** Wing flavour + dip pill lists render straight off the canonical constants. */
export const flavourOptions: string[] = [...WING_FLAVOURS];
export const dipOptions: string[] = [...DIP_FLAVOURS];

export const sideOptions: string[] = [
  ...FRY_CHOICE_NAMES,
  "Cauli Bites",
  "Mac and Cheese Tray",
  "Perogy Tray",
];


export const occasions: Occasion[] = [
  {
    name: "Office lunches",
    detail: "Easy to pass around. Hard to pretend you are only having six.",
  },
  {
    name: "Game days",
    detail: "Enough heat, crunch, and dip to keep everyone parked in front of the screen.",
  },
  {
    name: "Parties",
    detail: "Big boxes. Fast decisions. Zero tragic snack tables.",
  },
  {
    name: "Late night",
    detail: "When the group chat gets reckless and somebody needs to make it real.",
  },
];

export const howItWorks = [
  "Choose your crate size.",
  "Pick the wing flavours and dips.",
  "Order through Uber Eats or DoorDash.",
  "Open box. Feed crew. Accept praise.",
];
