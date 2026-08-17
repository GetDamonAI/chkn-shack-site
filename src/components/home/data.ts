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
    tagline: "Bone-in. Flats and drums.",
    items: [
      { name: "10 Piece Wings", price: "$16" },
      {
        name: "20 Piece Wings (Anchor)",
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
    // Parallel render path in the accordion. crateOptions in
    // src/components/crates/data.ts stays the source of truth for /crates +
    // /group-orders. Taglines resolve from shared CRATE_TAGLINES via taglineFor.
    name: "Crates",
    tagline: "Group orders that actually feed the room.",
    items: [
      { name: "CHKN Crate 50pc", price: "$75", note: "Small chaos — feeds 5-7 — same-day" },
      {
        name: "CHKN Crate 100pc",
        price: "$135",
        note: "Medium mayhem — feeds 10-15 — 24h notice",
      },
      {
        name: "CHKN Crate 200pc",
        price: "$245",
        note: "Full send — feeds 20-30 — 24h notice",
      },
    ],
  },
  {
    name: "Fries & Sides",
    tagline: "Seasoned, crispy, and built to drag through sauce.",
    items: [
      { name: "Shack Cut Seasoned Fries", price: "$6" },
      { name: "Dirty Curly Fries", price: "$7" },
      { name: "Parm Bomb Garlic Fries", price: "$11.75", note: "signature loaded" },
      { name: "Hot Honey Fries", price: "$8", note: "signature loaded" },
      { name: "Cauli Bites", price: "$8", note: "vegetarian" },
      { name: "Mac and Cheese (Side)", price: "$8" },
      { name: "Perogies (7pc Side)", price: "$9" },
      { name: "Gravy (add-on)", price: "$2" },
      { name: "Coleslaw (add-on)", price: "$3" },
    ],
  },
  {
    name: "Sharing Trays",
    tagline: "Big-batch comfort food built for the whole table.",
    items: [
      { name: "Mac and Cheese Tray", price: "$32", note: "feeds 4-6" },
      { name: "Perogy Tray", price: "$30", note: "feeds 4-6" },
    ],
  },
  {
    name: "Dips",
    tagline: "Ranch, blue cheese, and a few bad decisions.",
    items: [
      { name: "2oz Dip (Single)", price: "$1.50" },
      { name: "3 Dips", price: "$4.00" },
      { name: "Dip Flight (4 mini)", price: "$5.00" },
      { name: "12oz Dip Tub", price: "$9.00" },
    ],
  },
  {
    name: "Drinks",
    tagline: "Cold, fizzy, and built to cut the heat.",
    items: [
      { name: "Canned Pop", price: "$3.49", note: "Coke · Diet · Sprite · Ginger Ale" },
      { name: "Bottled Water", price: "$2.49" },
      { name: "Red Bull", price: "$5.00" },
      { name: "Monster Energy", price: "$6.75" },
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
  "Buffalo ★", "Honey Hot", "HouseFire Ranch", "Honey Stinger",
  // Creamy & Dry
  "Wowy-ranch", "S&P ★",
  // Sweet & Sticky
  "Honey Garlic ★", "Louisiana Sweet", "Maple Bourbon", "Sweet Thai", "BC Honey Q", "Korean Sticky Sesame",
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
