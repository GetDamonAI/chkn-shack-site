// Shared brand-voice taglines surfaced across multiple render surfaces.
// FLAVOUR_TAGLINES -> homepage flavour chips + menu accordion lookup.
// CRATE_TAGLINES   -> /crates + /group-orders crate cards + menu accordion lookup.
// DIP_TAGLINES     -> Dips-category chip grid + menu accordion lookup.
// SIGNATURE_DIPS   -> flags which dips get the "signature" pill in the grid.
// ITEM_TAGLINES stays in menu-accordion.tsx (only consumed there).

export const FLAVOUR_TAGLINES: Record<string, string> = {
  "Buffalo": "The one everybody orders. Cayenne, butter, and yes — get the ranch.",
  "Honey Hot": "Buffalo's sweeter twin. Real honey, real heat, real napkins required.",
  "HouseFire Ranch": "Ranch with a temper. House chili heat cut with cool buttermilk.",
  "Honey Stinger": "Yes, it stings. Honey glaze up front, ghost pepper on the drop.",
  "Wowy-ranch": "The ranch that went rogue. Creamier, sharper, and somehow a wing sauce now.",
  "S&P": "The purist's flex. Cracked pepper, flaky salt. That's it. That's the flavour.",
  "Honey Garlic": "The one people order twice. Sticky glaze, ranch on standby.",
  "Louisiana Sweet": "The nice one. Sweet Louisiana glaze, mild heat, all charm.",
  "Maple Bourbon": "The Canadian one. Maple, bourbon char, and a wing that knows what winter is.",
  "Sweet Thai": "Sweet chili with a passport. Sticky, mild, and gone first every time.",
  "BC Honey Q": "Local honey, backyard smoke. The BBQ wing that grew up here.",
  "Korean Sticky Sesame": "The wing with international flair. Sesame, gochujang, tamari, full commitment.",
};

export const CRATE_TAGLINES: Record<string, string> = {
  "CHKN Crate 50pc": "The group-order starter kit. 50 wings, one large fries, 3 dips, Grandpa J's toss on top. Feeds 5-7. Same-day.",
  "CHKN Crate 100pc": "Medium mayhem. 100 wings across 2 flavours, party-size fries, 5 dips. 24-hr notice. Feeds 10-15.",
  "CHKN Crate 200pc": "Full send. 200 wings, 2 party fries, 8 dips. 24-hr notice. Feeds 20-30.",
};

// Insertion order determines render order in the Dips-category chip grid.
export const DIP_TAGLINES: Record<string, string> = {
  "Ranch": "The dip that ends debates. Absolute reliability.",
  "Wowy-ranch": "The ranch that changed things. Creamier, sharper, unforgettable.",
  "HouseFire Ranch": "The signature burn, cooled in ranch. House chili, smoke, buttermilk.",
  "BC Honey Q": "Local honey meets backyard smoke. BBQ with a Canadian accent.",
  "Sweet Thai": "Sweet, sticky, whisper of chili. Plays well with absolutely everything.",
  "Peri-Peri": "Portuguese heat in a cup. Bright, smoky, and a proper mid-burn.",
  "Honey Mustard": "The dip that already made a friend today. Honey + Dijon + zero drama.",
  "Sriracha Mayo": "The creamy one with a mean streak. Sriracha, mayo, no notes.",
  "Garlic Aioli": "For people tired of being polite with garlic. Roasted, sharp, present.",
  "Spicy Aioli": "The dip that ends up on everything. Wings, fries, sandwich, life.",
  "Blue Cheese": "Not for everyone. That's kind of the point.",
  "Hot Honey": "Sweet with a punch line. Honey, chili flakes, medium heat.",
};

export const SIGNATURE_DIPS = new Set<string>([
  "Ranch",
  "Wowy-ranch",
  "HouseFire Ranch",
  "Hot Honey",
]);

// Normalise a wing flavour label ("Buffalo ★", "S&P ★") to a FLAVOUR_TAGLINES
// key ("Buffalo", "S&P"). Only the signature star is stripped — flavour names
// are otherwise keyed exactly as they render.
export function flavourTaglineFor(flavour: string): string | undefined {
  const key = flavour.replace(/\s*★/g, "").trim();
  return FLAVOUR_TAGLINES[key];
}
