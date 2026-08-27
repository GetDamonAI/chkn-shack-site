"use client";

import { useState } from "react";
import type { MenuCategory } from "@/components/home/data";
import {
  CRATE_TAGLINES,
  DIP_TAGLINES,
  FLAVOUR_TAGLINES,
  SIGNATURE_DIPS,
} from "@/components/home/taglines";
import { DIP_FLAVOURS } from "@/lib/menu-constants";

// Canonical customer-facing descriptions. Copy is verbatim from the menu —
// edit the menu, not these strings. Dips and Drinks carry their pick rules in
// item `note`s instead, so they intentionally have no entry here.
const ITEM_TAGLINES: Record<string, string> = {
  "10pc Wings": "The 'I just want wings' order.",
  "20pc Wings": "The size that wins. Real weeknight energy.",
  "30pc Wings": "The 30. Feeds two \u2014 or one hungry one.",
  "Solo Combo": "The one-person plan.",
  "The Drop": "The whole shack in one drop.",
  "Shack Cut Seasoned Fries": "Thick-cut russet, twice-fried, tossed in Texas Dry Rub + Grandpa J's seasoning. Pick your size.",
  "Parm Bomb Garlic Fries": "16oz fries tossed in parm + herbs, fresh parsley, and a Garlic Aioli ramekin on the side. No drizzle \u2014 dip on your terms.",
  "Hot Honey Fries": "Shack cut fries tossed in Nashville Hot seasoning, hot honey sauce in a side ramekin. Sweet meets scorched.",
  "Dirty Curly Fries": "Curly-cut fries, seasoned, topped with pickled + green onions, Spicy Aioli ramekin on the side. Loud, messy, worth it.",
  "Mac and Cheese (Side)": "Personal-size mac. Alfredo base, marble cheese, panko top, green onion garnish.",
  "Perogies (7pc Side)": "Seven perogies, pan-finished. Caramelized onions, bacon, sour cream ramekin on the side.",
  "Cauli Bites": "Battered cauliflower bites tossed in your choice of wing flavour. Vegetarian, ranch-ready.",
  "Gravy (Add-on)": "Beef gravy in a side ramekin. Because sometimes fries need a swim.",
  "Coleslaw (Add-on)": "Fresh coleslaw in a side ramekin. Crunch, tang, and something green.",
  "Mac and Cheese Tray": "The one that ends the argument about sides. Alfredo base, marble cheese, panko top. Feeds 4-6.",
  "Perogy Tray": "Full perogy commitment. 25 pan-finished, sour cream + chili crisp on standby. Feeds 4-6.",
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
                          {item.composition && (
                            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-ink/50 break-words">
                              {item.composition}
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
                      Pick from all 10
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {DIP_FLAVOURS.map((name) => {
                        const tagline = DIP_TAGLINES[name];
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
