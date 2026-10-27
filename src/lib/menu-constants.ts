// Canonical CHKN Shack menu constants (source: CHKN Shack Menu — Aug 21, 2026).
//
// These are the ONLY definitions of the flavour, dip, pop, and fry lists.
// Never re-declare them inline — import from here so a menu change lands in one
// place instead of drifting across render surfaces.

/** All 12 wing flavours, in menu order. Also the Cauli Bites sauce list. */
export const WING_FLAVOURS = [
  "Buffalo",
  "Honey Hot",
  "Jakarta Heat",
  "Chilean Chili",
  "Salt and Pepper",
  "Lemon Pepper",
  "Texas Dry Rub",
  "Honey Garlic",
  "Louisiana Sweet",
  "Korean Sticky Sesame",
  "Maple Bourbon",
  "Honey Stinger",
] as const;

/** All 10 dips, in menu order. Every dip modifier picks from this list. */
export const DIP_FLAVOURS = [
  "WOWY Ranch",
  "House Fire Ranch",
  "Ranch",
  "Blue Cheese",
  "Garlic Aioli",
  "Buffalo",
  "Spicy Aioli",
  "Hot Honey",
  "Honey BBQ",
  "Sweet Thai",
] as const;

/** Pop flavours — one Canned Pop SKU, flavour is a required modifier. */
export const POP_FLAVOURS = [
  "Coke",
  "Diet Coke",
  "Sprite",
  "Ginger Ale",
] as const;

/** The three fries, in menu order. Pricing lives in the ordering platform. */
export const FRY_CHOICE_NAMES = [
  "Shack Cut Seasoned Fries",
  "Parm Bomb Garlic Fries",
  "Hot Honey Fries",
] as const;

export type WingFlavour = (typeof WING_FLAVOURS)[number];
export type DipFlavour = (typeof DIP_FLAVOURS)[number];
export type PopFlavour = (typeof POP_FLAVOURS)[number];

/** Whether each flavour is a sauce (wet) or a seasoning (dry). */
export const WING_FLAVOUR_STYLE: Record<WingFlavour, "Wet" | "Dry"> = {
  "Buffalo": "Wet",
  "Honey Hot": "Wet",
  "Jakarta Heat": "Wet",
  "Chilean Chili": "Wet",
  "Salt and Pepper": "Dry",
  "Lemon Pepper": "Dry",
  "Texas Dry Rub": "Dry",
  "Honey Garlic": "Wet",
  "Louisiana Sweet": "Wet",
  "Korean Sticky Sesame": "Wet",
  "Maple Bourbon": "Wet",
  "Honey Stinger": "Wet",
};
