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
      { name: "10pc Wings", price: "$22", composition: "10 wings · 1 flavour · 1 dip" },
      { name: "20pc Wings", price: "$36", composition: "20 wings · up to 2 flavours · 3 dips" },
      { name: "30pc Wings", price: "$49", composition: "30 wings · up to 3 flavours · 4 dips" },
    ],
  },
  {
    name: "Combos",
    tagline: "One-person chaos with fries and a drink.",
    items: [
      { name: "Solo Combo", price: "$27", composition: "1 flavour · 1 dip · fries · pop" },
      {
        name: "20 Piece Combo",
        price: "$44",
        composition: "20 wings · 2 flavours · 2 dips · large fries · pop",
      },
    ],
  },
  {
    // Parallel render path in the accordion. crateOptions in
    // src/components/crates/data.ts stays the source of truth for /crates +
    // /group-orders. Taglines resolve from shared CRATE_TAGLINES via taglineFor.
    name: "Crates",
    tagline: "Group orders that actually feed the room.",
    items: [
      {
        name: "CHKN Crate 50pc",
        price: "$95",
        note: "Same-day",
        composition: "50 wings · up to 2 flavours · 3 dips · 1 large fries",
      },
      // HIDDEN (Nov 2026): 100pc + 200pc crates aren't live yet. Uncomment to restore.
      // {
      //   name: "CHKN Crate 100pc",
      //   price: "$179",
      //   note: "24hr notice",
      //   composition: "100 wings · up to 3 flavours · 5 dips · 2 party fries",
      // },
      // {
      //   name: "CHKN Crate 200pc",
      //   price: "$339",
      //   note: "24hr notice",
      //   composition: "200 wings · up to 4 flavours · 8 dips · 4 party fries",
      // },
    ],
  },
  {
    name: "Fries & Sides",
    tagline: "Seasoned, crispy, and built to drag through sauce.",
    items: [
      { name: "Shack Cut Seasoned Fries", price: "$7" },
      { name: "Parm Bomb Garlic Fries", price: "$13" },
      { name: "Hot Honey Fries", price: "$9" },
      { name: "Mac and Cheese (Side)", price: "$9" },
      { name: "Perogies (7pc Side)", price: "$10" },
      { name: "Cauli Bites", price: "$10", note: "vegetarian" },
      { name: "Gravy (Add-on)", price: "$2" },
      { name: "Coleslaw (Add-on)", price: "$3" },
    ],
  },
  {
    name: "Sharing Trays",
    tagline: "Big-batch comfort food built for the whole table.",
    items: [
      { name: "Mac and Cheese Tray", price: "$32", note: "feeds 4-6" },
      { name: "Perogy Tray", price: "$33", note: "feeds 4-6" },
    ],
  },
  {
    name: "Dips",
    tagline: "Ranch, blue cheese, and a few bad decisions.",
    items: [
      { name: "Single Dip (2oz)", price: "$1.75" },
      { name: "3 Dips (mix or match)", price: "$4.25" },
      { name: "Dip Flight (4 mini cups)", price: "$5.25" },
      { name: "9oz Dip Tub", price: "$7" },
      { name: "12oz Dip Tub", price: "$10" },
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
      { name: "Bottled Water", price: "$3.49", note: "591mL" },
      { name: "Red Bull", price: "$6", note: "250mL" },
    ],
  },
];

export type Location = {
  city: string;
  area: string;
  availability?: string;
  status: "live" | "coming-soon";
};

export const locations: Location[] = [
  {
    city: "Downtown Vancouver",
    area: "Vancouver",
    availability: "Lunch til late",
    status: "live",
  },
  {
    city: "Langley",
    area: "Fraser Valley",
    availability: "Lunch til late",
    status: "live",
  },
  {
    city: "Tsawwassen",
    area: "Delta",
    availability: "Lunch til late",
    status: "live",
  },
  { city: "Abbotsford", area: "Fraser Valley", status: "coming-soon" },
  { city: "Burnaby", area: "Metro Vancouver", status: "coming-soon" },
  { city: "Surrey", area: "Metro Vancouver", status: "coming-soon" },
  { city: "Port Moody", area: "Tri-Cities", status: "coming-soon" },
  { city: "Kelowna", area: "Okanagan", status: "coming-soon" },
];
