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
    wings: "50 · one flavour",
    fries: "1 large fry side",
    dips: "3 dips",
    addons: "Grandpa J's toss on top. Add cauli bites, extra wings, or an extra dip tub for the closer",
    vibe: "The group-order starter kit. Order it same-day when the group chat finally commits to a plan.",
  },
  {
    name: "CHKN Crate 100pc",
    price: "$145",
    badge: "Medium mayhem",
    feeds: "Feeds 10-15",
    wings: "100 · across 2 flavours",
    fries: "Party-size fries",
    dips: "5 dips",
    addons: "Add sharing trays, an extra flavour split, or more dips",
    vibe: "Enough wings that nobody does the sad math on who ate what. Heads up: 24-hour advance notice required.",
  },
  {
    name: "CHKN Crate 200pc",
    price: "$260",
    badge: "Full send",
    feeds: "Feeds 20-30",
    wings: "200 · across 2 flavours",
    fries: "2 party fry sides",
    dips: "8 dips",
    addons: "Add sharing trays, extra sides, or go fully unhinged with extra dips and fry sides",
    vibe: "When the invite list got out of hand and you leaned all the way in. Heads up: 24-hour advance notice required.",
  },
];

export const flavourOptions: string[] = [
  // Heat
  "Buffalo ★", "Honey Hot", "HouseFire Ranch", "Honey Stinger",
  // Creamy & Dry
  "Wowy-ranch", "S&P ★",
  // Sweet & Sticky
  "Honey Garlic ★", "Louisiana Sweet", "Maple Bourbon", "Sweet Thai", "BC Honey Q", "Korean Sticky Sesame",
];

export const dipOptions: string[] = [
  "Ranch",
  "Wowy-ranch",
  "HouseFire Ranch",
  "BC Honey Q",
  "Sweet Thai",
  "Peri-Peri",
  "Honey Mustard",
  "Sriracha Mayo",
  "Garlic Aioli",
  "Spicy Aioli",
  "Blue Cheese",
  "Hot Honey",
];

export const sideOptions: string[] = [
  "Large fries",
  "Loaded fries",
  "Cauli bites",
  "Extra dips",
  "Mac and Cheese Tray",
  "Perogy Tray",
];

export const addonOptions: string[] = [
  "Extra wings",
  "Extra flavour split",
  "Extra fries",
  "Dessert add-on",
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
