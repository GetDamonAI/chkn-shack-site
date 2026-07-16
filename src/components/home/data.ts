export type MenuItemV2 = {
  name: string;
  price?: string;
  note?: string;
};

export type MenuCategory = {
  name: string;
  tagline: string;
  items: MenuItemV2[];
};

export const menuCategories: MenuCategory[] = [
  {
    name: "Wings",
    tagline: "Bone-in or boneless. Flats and drums.",
    items: [
      { name: "10 Piece Wings", price: "$16" },
      {
        name: "20 Piece Wings",
        price: "$28",
        note: "our anchor · split 2 flavours for +$1.50",
      },
      { name: "30 Piece Wings", price: "$39" },
    ],
  },
  {
    name: "Combos",
    tagline: "One-person chaos with fries and a drink.",
    items: [
      { name: "Solo Combo", price: "$22" },
      { name: "Anchor Combo", price: "$36", note: "signature" },
    ],
  },
  {
    name: "Fries & Sides",
    tagline: "Seasoned, crispy, and built to drag through sauce.",
    items: [
      { name: "Shack Cut Fries", price: "$5", note: "default, plain on request" },
      { name: "Bayou Fries", price: "$6" },
      { name: "Peri Peri Fries", price: "$7", note: "NEW" },
      { name: "Garlic Parm Herb Fries", price: "$8", note: "signature loaded" },
      { name: "Hot Honey Fries", price: "$8", note: "signature loaded" },
      { name: "Yam Fries (with Honey Mustard)", price: "$7" },
      { name: "Dirty Curly Fries", price: "$8", note: "NEW" },
      { name: "Shack Fries", price: "$9", note: "NEW · signature loaded" },
      { name: "Mac and Cheese (Side)", price: "$8", note: "NEW" },
      { name: "Perogies (6pc Side)", price: "$9", note: "NEW" },
      { name: "Cauli Bites", price: "$8", note: "vegetarian" },
    ],
  },
  {
    name: "Sharing Trays",
    tagline: "Big-batch comfort food built for the whole table.",
    items: [
      { name: "Mac and Cheese Tray", price: "$32", note: "feeds 4-6 · add toppings" },
      { name: "Perogie Tray", price: "$30", note: "feeds 4-6 · add toppings" },
    ],
  },
  {
    // Parallel render path in the accordion. crateOptions in
    // src/components/crates/data.ts stays the source of truth for /crates +
    // /group-orders. Taglines resolve from shared CRATE_TAGLINES via taglineFor.
    name: "Crates",
    tagline: "Group orders that actually feed the room.",
    items: [
      { name: "CHKN Crate 50pc", price: "$75", note: "Small chaos — feeds 5-7" },
      {
        name: "CHKN Crate 100pc",
        price: "$135",
        note: "Medium mayhem — feeds 10-14 — signature",
      },
      {
        name: "CHKN Crate 200pc",
        price: "$245",
        note: "Full send — feeds 18-25 — 24h notice",
      },
    ],
  },
  {
    name: "Dips",
    tagline: "Ranch, blue cheese, and a few bad decisions.",
    items: [
      { name: "Single Dip", price: "$1.50" },
      { name: "3 Dips (mix or match)", price: "$4.00" },
      { name: "Dip Flight — 4 mini cups", price: "$5.00" },
      { name: "16oz Dip Tub", price: "$9.00" },
    ],
  },
  {
    name: "Drinks",
    tagline: "Cold, fizzy, and built to cut the heat.",
    items: [
      { name: "Fountain Pop", price: "$3.49" },
      { name: "Iced Tea", price: "$3.49", note: "sweet or unsweet" },
      { name: "Bottled Water", price: "$2.49" },
      { name: "Sparkling Water", price: "$3.99", note: "Perrier or SanPellegrino" },
    ],
  },
];

export type Location = {
  city: string;
  area: string;
  availability?: string;
  status: "live" | "coming-soon";
};

export const wingFlavours: string[] = [
  // Heat
  "Buffalo ★", "Honey Hot", "Jakarta Heat", "Chilean Chilli",
  // Dry Rubs
  "Salt & Pepper ★", "Lemon Pepper", "Texas Dry Rub",
  // Sweet & Sticky
  "Honey Garlic ★", "Louisiana Sweet", "Korean Sticky Sesame", "Maple Bourbon", "Honey Stinger",
];

export const locations: Location[] = [
  {
    city: "Downtown",
    area: "Vancouver",
    availability: "Late lunch to midnight",
    status: "live",
  },
  {
    city: "Tsawwassen",
    area: "Metro Vancouver",
    status: "coming-soon",
  },
  {
    city: "Maple Ridge",
    area: "Metro Vancouver",
    status: "coming-soon",
  },
];
