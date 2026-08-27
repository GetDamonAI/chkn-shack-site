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

/** The four fries, in menu order. Pricing lives in the ordering platform. */
export const FRY_CHOICE_NAMES = [
  "Shack Cut Seasoned Fries",
  "Dirty Curly Fries",
  "Parm Bomb Garlic Fries",
  "Hot Honey Fries",
] as const;

export type WingFlavour = (typeof WING_FLAVOURS)[number];
export type DipFlavour = (typeof DIP_FLAVOURS)[number];
export type PopFlavour = (typeof POP_FLAVOURS)[number];

/**
 * THE TAILGATE CRATE price. Rendered on the homepage tile and the /crates card,
 * and parsed into the Product schema — keep it here so a reprice is one edit.
 */
export const TAILGATE_PRICE = "$89";

/**
 * Seasonal gate for THE TAILGATE CRATE (Football Season, Sep 1 – Feb 28).
 * Defaults to on; set NEXT_PUBLIC_TAILGATE_ACTIVE=false to pull the card and
 * product copy without a code change.
 *
 * NEXT_PUBLIC_* values are inlined at build time, so flipping this needs a
 * redeploy (env change only — no code deploy).
 */
export const TAILGATE_ACTIVE =
  process.env.NEXT_PUBLIC_TAILGATE_ACTIVE !== "false";
