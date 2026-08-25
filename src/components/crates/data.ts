import {
  DIP_FLAVOURS,
  DIP_TUB_9OZ_ADDON,
  EXTRA_DIP_2OZ,
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
  wings: string;
  fries: string;
  dips: string;
  pops?: string;
  /** Canonical customer-picked modifiers, in menu order. */
  modifiers: string[];
  /** Set while the real hero shot is pending — renders a placeholder tile. */
  imagePending?: { alt: string };
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
    wings: "50 · pick up to 2 flavours",
    fries: "1 large fries",
    dips: "3 dips",
    modifiers: [
      "Wing Flavours (pick 1–2)",
      "Fry Choice (pick 1): Shack Cut Seasoned Fries (Large 16oz) · Parm Bomb Garlic Fries · Hot Honey Fries · Dirty Curly Fries",
      "Included Dips 2oz (pick 3)",
      EXTRA_DIP_2OZ,
      DIP_TUB_9OZ_ADDON,
    ],
  },
  {
    name: "CHKN Crate 100pc",
    price: "$135",
    badge: "Medium mayhem",
    notice: "24hr notice",
    feeds: "Feeds 10-15",
    wings: "100 · pick up to 3 flavours",
    fries: "2 party fries",
    dips: "5 dips",
    modifiers: [
      "Wing Flavours (pick 1–3)",
      "Fry Choice (pick 2)",
      "Included Dips 2oz (pick 5)",
      EXTRA_DIP_2OZ,
      DIP_TUB_9OZ_ADDON,
    ],
  },
  {
    name: "CHKN Crate 200pc",
    price: "$245",
    badge: "Full send",
    notice: "24hr notice",
    feeds: "Feeds 20-30",
    wings: "200 · pick up to 4 flavours",
    fries: "4 party fries",
    dips: "8 dips",
    modifiers: [
      "Wing Flavours (pick 1–4)",
      "Fry Choice (pick 4)",
      "Included Dips 2oz (pick 8)",
      EXTRA_DIP_2OZ,
      DIP_TUB_9OZ_ADDON,
    ],
  },
  // Seasonal SKU — Football Season, Sep 1 – Feb 28. Gated on
  // NEXT_PUBLIC_TAILGATE_ACTIVE so it can be pulled without a code deploy.
  ...(TAILGATE_ACTIVE
    ? [
        {
          name: "The Tailgate Crate",
          price: TAILGATE_PRICE,
          badge: "New",
          ribbon: "Seasonal · Football Season",
          notice: "Same-day",
          feeds: "Feeds the crew (5–7)",
          wings: "50 · pick up to 3 flavours",
          fries: "1 big fries",
          dips: "4 dips",
          pops: "3 pops",
          modifiers: [
            "Wing Flavours (pick 1–3 of 12)",
            "Included Dips 2oz (pick 4 of 10, no upcharge)",
            "Fry Choice (pick 1): Shack Cut Seasoned Fries (Large 16oz, included) · Dirty Curly Fries (+$3) · Parm Bomb Garlic Fries (+$3) · Hot Honey Fries (+$3)",
            "Pop Flavour (pick 3 — duplicates allowed): Coke · Diet Coke · Sprite · Ginger Ale",
            EXTRA_DIP_2OZ,
            DIP_TUB_9OZ_ADDON,
          ],
          imagePending: {
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

export const addonOptions: string[] = [
  EXTRA_DIP_2OZ,
  DIP_TUB_9OZ_ADDON,
  "Gravy (Add-on) — $2",
  "Coleslaw (Add-on) — $3",
  // TODO: temporarily removed — 10-gal ranch bucket. Restore by re-adding: "The Bucket",
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
