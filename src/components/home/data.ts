import { TAILGATE_ACTIVE, TAILGATE_PRICE } from "@/lib/menu-constants";

export type MenuItemV2 = {
  name: string;
  price?: string;
  note?: string;
  /**
   * What's in it, as one plain line. Upcharges and pick-rules deliberately live
   * in the ordering platform (Deliverect / UE / DD), not on the marketing site.
   */
  composition?: string;
};

export type MenuCategory = {
  name: string;
  tagline: string;
  items: MenuItemV2[];
};

export const menuCategories: MenuCategory[] = [
  {
    name: "Wings",
    tagline: "Bone-in wings tossed in your flavour. Twelve to pick from.",
    items: [
      { name: "10pc Wings", price: "$18", composition: "10 wings · 1 flavour · 1 dip" },
      { name: "20pc Wings", price: "$28", composition: "20 wings · up to 2 flavours · 3 dips" },
      { name: "30pc Wings", price: "$39", composition: "30 wings · up to 3 flavours · 4 dips" },
    ],
  },
  {
    name: "Combos",
    tagline: "One-person chaos with fries and a drink.",
    items: [
      { name: "Solo Combo", price: "$22", composition: "1 flavour · 1 dip · fries · pop" },
      {
        name: "The Drop",
        price: "$36",
        composition: "20 wings · 2 flavours · 2 dips · large fries · pop",
      },
    ],
  },
  {
    // Parallel render path in the accordion. crateOptions in
    // src/components/crates/data.ts stays the source of truth for /crates +
    // /group-orders. Taglines resolve from shared CRATE_TAGLINES via taglineFor.
    name: "Crates",
    tagline: "Group orders that actually feed the room. 50, 100, 200.",
    items: [
      {
        name: "CHKN Crate 50pc",
        price: "$75",
        note: "Same-day",
        composition: "50 wings · up to 2 flavours · 3 dips · 1 large fries",
      },
      {
        name: "CHKN Crate 100pc",
        price: "$135",
        note: "24hr notice",
        composition: "100 wings · up to 3 flavours · 5 dips · 2 party fries",
      },
      {
        name: "CHKN Crate 200pc",
        price: "$245",
        note: "24hr notice",
        composition: "200 wings · up to 4 flavours · 8 dips · 4 party fries",
      },
      // Seasonal SKU — gated on NEXT_PUBLIC_TAILGATE_ACTIVE (Football Season).
      ...(TAILGATE_ACTIVE
        ? [
            {
              name: "The Tailgate Crate",
              price: TAILGATE_PRICE,
              note: "Same-day · Seasonal",
              composition:
                "50 wings · up to 3 flavours · 4 dips · large fries · 3 pops",
            },
          ]
        : []),
    ],
  },
  {
    name: "Fries & Sides",
    tagline: "Seasoned, crispy, and built to drag through sauce.",
    items: [
      { name: "Shack Cut Seasoned Fries", price: "$6" },
      { name: "Parm Bomb Garlic Fries", price: "$11.75" },
      { name: "Hot Honey Fries", price: "$8" },
      { name: "Dirty Curly Fries", price: "$7" },
      { name: "Mac and Cheese (Side)", price: "$8" },
      { name: "Perogies (7pc Side)", price: "$9" },
      { name: "Cauli Bites", price: "$10", note: "vegetarian" },
      { name: "Gravy (Add-on)", price: "$2" },
      { name: "Coleslaw (Add-on)", price: "$3" },
    ],
  },
  {
    name: "Sharing Trays",
    tagline: "Big-batch comfort food built for the whole table.",
    items: [
      { name: "Mac and Cheese Tray", price: "$29", note: "feeds 4-6" },
      { name: "Perogy Tray", price: "$30", note: "feeds 4-6" },
    ],
  },
  {
    name: "Dips",
    tagline: "Ranch, blue cheese, and a few bad decisions.",
    items: [
      { name: "Single Dip (2oz)", price: "$1.50" },
      { name: "3 Dips (mix or match)", price: "$4" },
      { name: "Dip Flight (4 mini cups)", price: "$5" },
      { name: "9oz Dip Tub", price: "$6" },
      { name: "12oz Dip Tub", price: "$9" },
    ],
  },
  {
    name: "Drinks",
    tagline: "Cold, fizzy, and built to cut the heat.",
    items: [
      {
        name: "Canned Pop",
        price: "$3.49",
        note: "355mL",
        composition: "Coke · Diet Coke · Sprite · Ginger Ale",
      },
      { name: "Iced Tea", price: "$3.49", note: "20oz · Sweet only" },
      { name: "Bottled Water", price: "$2.49", note: "591mL" },
      { name: "Red Bull", price: "$6", note: "250mL" },
    ],
  },
];

export type Location = {
  city: string;
  area: string;
  availability?: string;
  status: "live" | "coming-soon";
  /** Sub-label under the Coming Soon badge, e.g. a launch date. */
  launchNote?: string;
};

export const locations: Location[] = [
  {
    city: "Downtown Vancouver",
    area: "Vancouver",
    availability: "Late lunch to midnight",
    status: "live",
  },
  {
    city: "Abbotsford",
    area: "Fraser Valley",
    availability: "Late lunch to midnight",
    status: "coming-soon",
    launchNote: "Launching Sep 6",
  },
  {
    city: "Burnaby",
    area: "Metro Vancouver",
    availability: "TBD",
    status: "coming-soon",
  },
];
