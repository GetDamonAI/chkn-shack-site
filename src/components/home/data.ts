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
      { name: "10pc", price: "$16" },
      { name: "20pc", price: "$28" },
      { name: "30pc", price: "$39" },
    ],
  },
  {
    name: "Fries & Sides",
    tagline: "Seasoned, crispy, and built to drag through sauce.",
    items: [
      { name: "Cajun Seasoned", price: "$5", note: "default, plain on request" },
      { name: "Peri Peri", price: "$8" },
      { name: "Garlic Parm Herb", price: "$8" },
      { name: "Yam Fries", price: "$7" },
      { name: "Hot Honey Fries ★", price: "$8" },
      { name: "Mac & Cheese", price: "$7" },
      { name: "Perogies", price: "$8" },
      { name: "Cauli Bites (veg)", price: "$8" },
    ],
  },
  {
    name: "Dips",
    tagline: "Ranch, blue cheese, and a few bad decisions.",
    items: [
      { name: "Single dip", price: "$1.50" },
      { name: "3 for", price: "$4" },
      { name: "16oz bottle", price: "$9" },
    ],
  },
  {
    name: "Combos",
    tagline: "One-person chaos with fries and a drink.",
    items: [
      { name: "Solo", price: "$22", note: "10pc + fries + drink" },
      { name: "Anchor ★", price: "$36", note: "20pc + loaded fries + 3 dips + drink" },
    ],
  },
  {
    name: "CHKN Crates",
    tagline: "Big box energy for teams, parties, and game night.",
    items: [
      { name: "50pc", price: "$75", note: "wings + fries + dips" },
      { name: "100pc", price: "$135", note: "wings + fries + dips" },
      { name: "200pc", price: "$245", note: "wings + fries + dips" },
      { name: "Mac & Cheese Tray", price: "$32", note: "feeds 6–8" },
      { name: "Perogie Tray", price: "$30", note: "feeds 6–8" },
    ],
  },
];

export type Location = {
  city: string;
  area: string;
  availability: string;
};

export type DipCard = {
  title: string;
  copy: string;
};

export const wingFlavours: string[] = [
  // Heat
  "Buffalo ★", "Honey Hot", "Jakarta Heat", "Chilean Chilli",
  // Dry Rubs
  "Salt & Pepper ★", "Lemon Pepper", "Texas Dry Rub", "Maple Bacon",
  // Sweet & Sticky
  "Honey Garlic ★", "Louisiana Sweet", "Korean Sticky Sesame", "Honey Stinger",
];

export const dipCards: DipCard[] = [
  {
    title: "Signature Flavours",
    copy: "Built to hit hard with wings",
  },
  {
    title: "Bottle It",
    copy: "Take the flavour home",
  },
  {
    title: "Vato Picante",
    copy: "Creamy habanero. Bold heat. Built to stand out.",
  },
  {
    title: "Coming Soon",
    copy: "Seasonal + limited drops",
  },
];

export const locations: Location[] = [
  {
    city: "Vancouver",
    area: "Mount Pleasant",
    availability: "Late lunch to midnight",
  },
  {
    city: "Burnaby",
    area: "Brentwood",
    availability: "Open late for campus and condo cravings",
  },
  {
    city: "Surrey",
    area: "Guildford",
    availability: "Family feasts and game-day rescue missions",
  },
];
