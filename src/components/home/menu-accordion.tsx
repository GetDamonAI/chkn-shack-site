"use client";

import { useState } from "react";
import type { MenuCategory } from "@/components/home/data";
import { CRATE_TAGLINES, FLAVOUR_TAGLINES } from "@/components/home/taglines";

const ITEM_TAGLINES: Record<string, string> = {
  "10 Piece Wings": "10 wings. One flavour. One dip. The 'I just want wings' order.",
  "20 Piece Wings": "The size that wins. 20 wings, one flavour (or two for +$1.50), 3 dips, real weeknight energy.",
  "30 Piece Wings": "The 30. Mix 2 flavours, 4 dips, feed two adults or one very committed one.",
  "Solo Combo": "The 'just feed me' order. 10 wings, fries, drink, no need for a table.",
  "Anchor Combo": "For the crowd of one who came prepared. 20 wings + loaded fries + 3 dips + drink.",
  "Shack Cut Fries": "The base fry. Thick-cut russet, twice-fried, does its job.",
  "Bayou Fries": "The fry that took a trip to Louisiana. Cajun-dust, warm, opinionated.",
  "Peri Peri Fries": "Portuguese heat, Vancouver commute. Peri peri dust, smoky, mid-burn.",
  "Garlic Parm Herb Fries": "The signature loaded. Garlic butter, parm, fresh parsley — the fries other loaded fries are jealous of.",
  "Hot Honey Fries": "The fry with the punch line. Hot honey, chili flakes, salt, and the same personality as the wing.",
  "Yam Fries (with Honey Mustard)": "The fry that thought ahead. Yam + Honey Mustard cup, no extra order needed.",
  "Dirty Curly Fries": "New. Curly-cut, Cajun-dust, bacon crumble, chipotle crema. Bring napkins.",
  "Shack Fries": "The fries that ate the menu. Pulled CHKN, Wowy-ranch, Hot Honey, scallion, absolute chaos.",
  "Mac and Cheese (Side)": "Personal-sized comfort. Sharp cheddar, parm, breadcrumb. Add toppings if you insist.",
  "Perogies (6pc Side)": "Baba would approve. Six pierogies, pan-finished, absolutely correct.",
  "Cauli Bites": "All the flavour, none of the bird.",
  "Mac and Cheese Tray": "The one that ends the argument about sides. Cheddar, parm, breadcrumb top, feeds 4-6.",
  "Perogie Tray": "Full pierogie commitment. Butter-pan-finished, sour cream + chili crisp on standby, feeds 4-6.",
  "Single Dip": "Pick any of our 13.",
  "3 Dips (mix or match)": "The right ratio for any 10pc+ order.",
  "Dip Flight — 4 mini cups": "Discovery mode.",
  "16oz Dip Tub": "Take it home or feed the table.",
  "Fountain Pop": "Coke, Diet, Sprite, Ginger Ale, or Root Beer. Correctly cold.",
  "Iced Tea": "Sweet or unsweet. Not making that choice for you.",
  "Bottled Water": "Water. 500mL. That's it. That's the item.",
  "Sparkling Water": "Perrier or SanPellegrino. Adult behavior.",
};

const DIP_TAGLINES: Record<string, string> = {
  "Ranch": "The dip that ends debates. Absolute reliability.",
  "Wowy-ranch": "The ranch that changed things. Creamier, sharper, and the reason we sell 10-gallon buckets.",
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

function taglineFor(name: string): string | undefined {
  return (
    ITEM_TAGLINES[name] ??
    FLAVOUR_TAGLINES[name] ??
    DIP_TAGLINES[name] ??
    CRATE_TAGLINES[name]
  );
}

export function MenuAccordion({ categories }: { categories: MenuCategory[] }) {
  const [open, setOpen] = useState<string | null>(categories[0]?.name ?? null);

  return (
    <div className="space-y-2">
      {categories.map((cat) => {
        const isOpen = open === cat.name;
        return (
          <div
            key={cat.name}
            className="overflow-hidden rounded-[1.4rem] border-2 border-brand-ink bg-[#fff9ef] shadow-[0_8px_0_0_#100800]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : cat.name)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div>
                <p className="font-display text-2xl uppercase leading-none text-brand-ink">
                  {cat.name}
                </p>
                <p className="mt-1 text-sm leading-5 text-brand-ink/68">{cat.tagline}</p>
              </div>
              <span
                className="shrink-0 text-base text-brand-ink transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                aria-hidden
              >
                ▾
              </span>
            </button>
            {isOpen && (
              <div className="border-t-2 border-brand-ink/12 px-5 pb-4 pt-3">
                {cat.items.length > 0 ? (
                  <div className="space-y-2.5">
                    {cat.items.map((item) => {
                      const tagline = taglineFor(item.name);
                      return (
                        <div key={item.name}>
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-sm font-semibold text-brand-ink">
                              {item.name}
                              {item.note && (
                                <span className="ml-1.5 text-xs font-normal text-brand-ink/58">
                                  — {item.note}
                                </span>
                              )}
                            </span>
                            {item.price && (
                              <span className="shrink-0 text-sm font-black text-brand-ink">
                                {item.price}
                              </span>
                            )}
                          </div>
                          {tagline && (
                            <p className="mt-0.5 text-xs leading-5 text-brand-ink/55">
                              {tagline}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-brand-ink/58">Coming soon.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
