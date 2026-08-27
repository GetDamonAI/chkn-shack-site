// Shared brand-voice taglines surfaced across multiple render surfaces.
// FLAVOUR_TAGLINES -> homepage flavour chips + menu accordion lookup.
// CRATE_TAGLINES   -> /crates + /group-orders crate cards + menu accordion lookup.
// DIP_TAGLINES     -> Dips-category chip grid + menu accordion lookup.
// SIGNATURE_*      -> flags which flavours/dips get the "signature" pill.
// ITEM_TAGLINES stays in menu-accordion.tsx (only consumed there).
//
// Keys here MUST match WING_FLAVOURS / DIP_FLAVOURS in src/lib/menu-constants.ts
// verbatim — those constants drive render order, this file only supplies copy.

export const FLAVOUR_TAGLINES: Record<string, string> = {
  "Buffalo": "The one everybody orders. Cayenne, butter, and yes — get the ranch.",
  "Honey Hot": "Buffalo's sweeter twin. Real honey, real heat, real napkins required.",
  "Jakarta Heat": "Sambal-style burn with a slow build. Sweet on the way in, serious on the way out.",
  "Chilean Chili": "Smoky South American chili. Deep heat that never raises its voice.",
  "Salt and Pepper": "The purist's flex. Cracked pepper, flaky salt. That's it. That's the flavour.",
  "Lemon Pepper": "Bright, zippy, dangerously easy. You'll finish twelve without noticing.",
  "Texas Dry Rub": "No sauce, no apologies. Smoked paprika, brown sugar, and a proper crust.",
  "Honey Garlic": "The one people order twice. Sticky glaze, ranch on standby.",
  "Louisiana Sweet": "The nice one. Sweet Louisiana glaze, mild heat, all charm.",
  "Korean Sticky Sesame": "The wing with international flair. Sesame, gochujang, tamari, full commitment.",
  "Maple Bourbon": "The Canadian one. Maple, bourbon char, and a wing that knows what winter is.",
  "Honey Stinger": "Yes, it stings. Honey glaze up front, ghost pepper on the drop.",
};

export const SIGNATURE_FLAVOURS = new Set<string>([
  "Buffalo",
  "Salt and Pepper",
  "Honey Garlic",
]);

export const CRATE_TAGLINES: Record<string, string> = {
  "CHKN Crate 50pc": "The group-order starter kit.",
  "CHKN Crate 100pc": "Medium mayhem.",
  "CHKN Crate 200pc": "Full send.",
  "The Tailgate Crate": "The game's already on.",
};

// Insertion order matches DIP_FLAVOURS; the chip grid renders from the constant.
export const DIP_TAGLINES: Record<string, string> = {
  "WOWY Ranch": "The ranch that changed things. Creamier, sharper, unforgettable.",
  "House Fire Ranch": "The signature burn, cooled in ranch. House chili, smoke, buttermilk.",
  "Ranch": "The dip that ends debates. Absolute reliability.",
  "Blue Cheese": "Not for everyone. That's kind of the point.",
  "Garlic Aioli": "For people tired of being polite with garlic. Roasted, sharp, present.",
  "Buffalo": "The sauce, in dip form. Double down and stop pretending you weren't going to.",
  "Spicy Aioli": "The dip that ends up on everything. Wings, fries, sandwich, life.",
  "Hot Honey": "Sweet with a punch line. Honey, chili flakes, medium heat.",
  "Honey BBQ": "Sweet, smoky, and the one the whole table quietly agrees on.",
  "Sweet Thai": "Sweet, sticky, whisper of chili. Plays well with absolutely everything.",
};

export const SIGNATURE_DIPS = new Set<string>([
  "Ranch",
  "WOWY Ranch",
  "House Fire Ranch",
  "Hot Honey",
]);

// Flavour chips render straight from WING_FLAVOURS, so the label already matches
// the tagline key. Kept as a helper so callers stay decoupled from the map shape.
export function flavourTaglineFor(flavour: string): string | undefined {
  return FLAVOUR_TAGLINES[flavour];
}
