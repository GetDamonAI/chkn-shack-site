"use client";

import { useState } from "react";
import type { MenuCategory } from "@/components/home/data";
import {
  CRATE_TAGLINES,
  DIP_TAGLINES,
  FLAVOUR_TAGLINES,
  SIGNATURE_DIPS,
} from "@/components/home/taglines";

const ITEM_TAGLINES: Record<string, string> = {
  "10 Piece Wings": "10 wings. One flavour. One dip. The 'I just want wings' order.",
  "20 Piece Wings (Anchor)": "The size that wins. 20 wings, one flavour (or split 2 for +$1.50), 3 dips. Real weeknight energy.",
  "30 Piece Wings": "The 30. Mix 2 flavours, 4 dips, feed two people or one hungry one.",
  "Solo Combo": "10 wings, one flavour, one dip, Shack Cut Fries, drink. The party of one.",
  "Anchor Combo": "Signature. 20 wings (one flavour or split 2), Shack Cut Fries, 3 dips, drink.",
  "Shack Cut Seasoned Fries": "Hand-cut russet, house Cajun spice. Smoky + savoury. Get a dip.",
  "Dirty Curly Fries": "Hand-cut curly, peri-peri spice blend, pickled onions, green onion, spicy aioli.",
  "Parm Bomb Garlic Fries": "The signature loaded. Garlic + herb butter, shaved parm, fresh parsley. Feels like fine dining, priced like fries.",
  "Hot Honey Fries": "Nashville hot seasoning, hot honey drizzle. Sweet-spicy hero.",
  "Cauli Bites": "Buffalo-battered cauliflower. The veggie play that still hits.",
  "Mac and Cheese (Side)": "Personal-sized comfort. Alfredo base, marble cheddar. Baked, not boiled.",
  "Perogies (7pc Side)": "Baba would approve. Seven potato-cheddar perogies, pan-finished with caramelized onions, sour cream on the side.",
  "Gravy (add-on)": "Beef gravy, hot-held, side ramekin. Add to any fry.",
  "Coleslaw (add-on)": "Fresh coleslaw, side ramekin.",
  "Mac and Cheese Tray": "Full comfort. Alfredo base, marble cheddar, bacon. Feeds 4-6.",
  "Perogy Tray": "Full perogy commitment. Butter-pan-finished with caramelized onions, bacon, sour cream. Feeds 4-6.",
  "2oz Dip (Single)": "Pick any of our 12. 2oz side cup.",
  "3 Dips": "The right ratio for any 10pc+ order. Mix or match from our 12.",
  "Dip Flight (4 mini)": "Discovery mode. Four mini cups. Find your ranch.",
  "12oz Dip Tub": "Take it home or feed the table. 12oz of any dip. Pick your flavour.",
  "Canned Pop": "Coke · Diet · Sprite · Ginger Ale. Cold and classic.",
  "Bottled Water": "500ml still.",
  "Red Bull": "Regular. 250ml. Cause you can never have enough energy.",
  "Monster Energy": "Zero Ultra. 473ml. Cold, loud, and awake.",
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
                {cat.name === "Dips" && (
                  <div className="mt-4 border-t-2 border-brand-ink/12 pt-3">
                    <p className="text-sm font-black uppercase tracking-wider text-brand-ink/55">
                      Pick from all 12
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(DIP_TAGLINES).map(([name, tagline]) => {
                        const isSignature = SIGNATURE_DIPS.has(name);
                        return (
                          <div
                            key={name}
                            className="relative rounded-[1.2rem] border-2 border-brand-ink bg-brand-yellow px-4 py-3 text-brand-ink transition-transform duration-150 hover:-translate-y-0.5"
                          >
                            {isSignature && (
                              <span className="absolute right-3 top-3 rounded-full border-2 border-brand-ink bg-brand-ink px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#fff7ed]">
                                Signature
                              </span>
                            )}
                            <p
                              className={
                                isSignature
                                  ? "pr-20 text-sm font-semibold uppercase tracking-[0.12em] sm:text-base"
                                  : "text-sm font-semibold uppercase tracking-[0.12em] sm:text-base"
                              }
                            >
                              {name}
                            </p>
                            <p className="mt-1 text-xs font-normal leading-5 text-brand-ink/70">
                              {tagline}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
