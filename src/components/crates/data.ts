export type CrateOption = {
  name: string;
  price: string;
  badge?: string;
  feeds: string;
  wings: string;
  fries: string;
  dips: string;
  addons: string;
  vibe: string;
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
    feeds: "Feeds 5-7",
    wings: "50 · up to 2 flavours",
    fries: "1 large fry side",
    dips: "3 dips",
    addons: "Add cauli bites, extra wings, or an extra dip tub for the closer",
    vibe: "The one you order when the group chat finally commits to a plan.",
  },
  {
    name: "CHKN Crate 100pc",
    price: "$135",
    badge: "Medium mayhem",
    feeds: "Feeds 10-14",
    wings: "100 · up to 2 flavours",
    fries: "2 large fry sides",
    dips: "5 dips",
    addons: "Add sharing trays, an extra flavour split, or more dips",
    vibe: "Enough wings that nobody does the sad math on who ate what.",
  },
  {
    name: "CHKN Crate 200pc",
    price: "$245",
    badge: "Full send",
    feeds: "Feeds 18-25",
    wings: "200 · up to 2 flavours",
    fries: "4 large fry sides",
    dips: "8 dips",
    addons: "Add sharing trays, extra sides, or go fully unhinged with The Bucket",
    vibe: "When the invite list got out of hand and you leaned all the way in. Heads up: 24-hour advance notice required.",
  },
];

export const flavourOptions: string[] = [
  // Heat
  "Buffalo ★", "Honey Hot", "Jakarta Heat", "Chilean Chilli",
  // Dry Rubs
  "Salt & Pepper ★", "Lemon Pepper", "Texas Dry Rub",
  // Sweet & Sticky
  "Honey Garlic ★", "Louisiana Sweet", "Korean Sticky Sesame", "Maple Bourbon", "Honey Stinger",
];

export const dipOptions: string[] = [
  "Ranch",
  "Wowy-ranch",
  "Blue Cheese",
  "Garlic Aioli",
  "Spicy Ranch",
  "Buffalo Sauce",
  "Spicy Aioli",
  "Chipotle Crema",
  "Housefire",
  "Honey Mustard",
  "Hot Honey",
  "Maple BBQ",
  "Sweet Chili",
];

export const sideOptions: string[] = [
  "Large fries",
  "Loaded fries",
  "Cauli bites",
  "Extra dips",
  "Mac and Cheese Tray",
  "Perogie Tray",
];

export const addonOptions: string[] = [
  "Extra wings",
  "Extra flavour split",
  "Extra fries",
  "Dessert add-on",
  "The Bucket",
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
