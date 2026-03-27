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
    name: "Small Crate",
    price: "from $39",
    feeds: "Feeds 3-4",
    wings: "24 wings",
    fries: "1 large fries",
    dips: "3 dips",
    addons: "Add cauli bites, extra wings, or two shakes for the closer",
    vibe: "For small office squads and snack-first hangs.",
  },
  {
    name: "Classic Crate",
    price: "from $59",
    badge: "Most Ordered",
    feeds: "Feeds 5-7",
    wings: "40 wings",
    fries: "2 large fries",
    dips: "4 dips",
    addons: "Add more fries, extra flavour split, or dessert backup",
    vibe: "The reliable move for lunch drops and living-room takeovers.",
  },
  {
    name: "Mega Crate",
    price: "from $89",
    feeds: "Feeds 8-12",
    wings: "64 wings",
    fries: "3 large fries",
    dips: "6 dips",
    addons: "Add cauli bites, shakes, and enough extra ranch to stop arguments",
    vibe: "Game-day volume without game-day panic.",
  },
  {
    name: "Party Crate",
    price: "from $129",
    feeds: "Feeds 15+",
    wings: "96 wings",
    fries: "5 large fries",
    dips: "10 dips",
    addons: "Add dessert, extra sides, or go fully unhinged with The Bucket",
    vibe: "For birthdays, office raids, and people who refuse to run out early.",
  },
];

export const flavourOptions: string[] = [
  "Shack Buffalo",
  "Sweet Heat",
  "Lemon Pepper",
  "Honey BBQ",
  "Garlic Parm",
  "Mango Habanero",
  "Nashville Hot",
  "Cajun Dry Rub",
  "Seoul Fire",
  "Teriyaki Crackle",
  "Dill Pickle Ranch",
  "Atomic Nope",
];

export const dipOptions: string[] = [
  "Ranch",
  "Blue Cheese",
  "Roasted Garlic Ranch",
  "Spicy Shack Sauce",
  "Honey Mustard",
  "Buffalo Ranch",
];

export const sideOptions: string[] = [
  "Large fries",
  "Loaded fries",
  "Cauli bites",
  "Extra dips",
  "Shakes",
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
