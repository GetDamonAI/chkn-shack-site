// Shared brand-voice taglines surfaced across multiple render surfaces.
// FLAVOUR_TAGLINES -> homepage flavour chips + menu accordion lookup.
// CRATE_TAGLINES   -> /crates + /group-orders crate cards + menu accordion lookup.
// DIP_TAGLINES     -> Dips-category chip grid + menu accordion lookup.
// SIGNATURE_DIPS   -> flags which dips get the "signature" pill in the grid.
// ITEM_TAGLINES stays in menu-accordion.tsx (only consumed there).

export const FLAVOUR_TAGLINES: Record<string, string> = {
  "Buffalo": "The one everybody orders. Cayenne, butter, and yes — get the ranch.",
  "Honey Hot": "Buffalo's sweeter twin. Real honey, real heat, real napkins required.",
  "Jakarta Heat": "Southeast Asian sneak attack. Sambal, tamarind, and a slow-building 'oh.'",
  "Chilean Chilli": "Chile knows heat. Merkén, smoked paprika, and about two minutes of 'wait, more.'",
  "Salt and Pepper": "The purist's flex. Cracked pepper, flaky salt. That's it. That's the flavour.",
  "Lemon Pepper": "The wing that texts back. Lemon zest, cracked pepper, absolute peace.",
  "Texas Dry Rub": "Big flavour, small mess. Brown sugar, smoke — and yes, still get the ranch.",
  "Honey Garlic": "The one people order twice. Sticky glaze, ranch on standby.",
  "Louisiana Sweet": "The nice one. Sweet Louisiana glaze, mild heat, all charm.",
  "Korean Sticky Sesame": "The wing with international flair. Sesame, gochujang, tamari, full commitment.",
  "Maple Bourbon": "The Canadian one. Maple, bourbon char, and a wing that knows what winter is.",
  "Honey Stinger": "Yes, it stings. Honey glaze up front, ghost pepper on the drop.",
};

export const CRATE_TAGLINES: Record<string, string> = {
  "CHKN Crate 50pc": "The group-order starter kit. 50 wings, 1 fry side, 3 dips, feeds 5-7.",
  "CHKN Crate 100pc": "Medium mayhem. For team lunches, playoff nights, and very optimistic hosts.",
  "CHKN Crate 200pc": "Full send. The 'nobody leaves hungry' move with extra ranch on deck.",
};

// Insertion order determines render order in the Dips-category chip grid.
export const DIP_TAGLINES: Record<string, string> = {
  "Ranch": "The dip that ends debates. Absolute reliability.",
  "Wowy-ranch": "The ranch that changed things. Creamier, sharper, unforgettable.",
  "Blue Cheese": "Not for everyone. That's kind of the point.",
  "Garlic Aioli": "For people tired of being polite with garlic. Roasted, sharp, present.",
  "Spicy Ranch": "The ranch that woke up angry. Buffalo edge, still creamy.",
  "Buffalo Sauce": "For dipping fries, wings, courage. Buffalo in cup form.",
  "Spicy Aioli": "The dip that ends up on everything. Wings, fries, sandwich, life.",
  "Chipotle Crema": "Smoke, cooled. Chipotle in crema form, calm-heat energy.",
  "Housefire": "The signature burn. House chili, smoke, and the dip named after itself.",
  "Honey Mustard": "The dip that already made a friend today. Honey + Dijon + zero drama.",
  "Hot Honey": "Sweet with a punch line. Honey, chili flakes, medium heat.",
  "Maple BBQ": "The BBQ that skipped Texas and moved to Canada. Maple + smoke + sticky.",
  "Sweet Chili": "The dip that plays well with everyone. Sweet, sticky, whisper of chili.",
};

export const SIGNATURE_DIPS = new Set<string>([
  "Ranch",
  "Wowy-ranch",
  "Housefire",
  "Hot Honey",
]);

// Normalise a wing flavour label ("Buffalo ★", "Salt & Pepper ★") to a
// FLAVOUR_TAGLINES key ("Buffalo", "Salt and Pepper").
export function flavourTaglineFor(flavour: string): string | undefined {
  const key = flavour.replace(/\s*★/g, "").replace(/&/g, "and").trim();
  return FLAVOUR_TAGLINES[key];
}
