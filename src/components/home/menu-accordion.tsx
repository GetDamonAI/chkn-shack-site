"use client";

import { useState } from "react";
import type { MenuCategory } from "@/components/home/data";

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
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-baseline justify-between gap-3"
                      >
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
                    ))}
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
