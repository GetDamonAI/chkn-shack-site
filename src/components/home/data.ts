export type MenuItem = {
  name: string;
  detail: string;
};

export type Location = {
  city: string;
  area: string;
  availability: string;
};

export type DipCard = {
  title: string;
  copy: string;
};

export const menuItems: MenuItem[] = [
  { name: "Wings", detail: "Stacks of flats and drums with zero patience for bland." },
  { name: "Fries", detail: "Seasoned, crispy, and built to drag through sauce." },
  { name: "Cauli Bites", detail: "Crunch-first, dunk-heavy, meatless menace." },
  { name: "Dips", detail: "Ranch, blue cheese, and a few bad decisions." },
  { name: "Shakes", detail: "Cold, thick, and suspiciously easy to finish." },
  { name: "Combos", detail: "One-person chaos with fries and a drink in tow." },
  { name: "CHKN Crates", detail: "Big box energy for teams, parties, and game night." },
];

export const wingFlavours: string[] = [
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
