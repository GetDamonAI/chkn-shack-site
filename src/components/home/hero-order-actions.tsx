"use client";

import Link from "next/link";
import {
  defaultStoreMap,
  openOrderLink,
  type OrderPlatform,
} from "@/lib/ordering";

type PlatformButtonProps = {
  label: string;
  platform: OrderPlatform;
  variant?: "primary" | "secondary";
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function PlatformButton({
  label,
  platform,
  variant = "primary",
}: PlatformButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        openOrderLink(platform, null, defaultStoreMap);
      }}
      className={cn(
        "inline-flex min-h-14 items-center justify-center rounded-full border-2 border-brand-ink px-5 text-center font-black uppercase tracking-[0.2em] transition-transform duration-150 hover:-translate-y-0.5",
        variant === "primary"
          ? "bg-brand-yellow text-brand-ink shadow-[0_10px_0_0_#100800]"
          : "bg-[#fff7ed] text-brand-ink shadow-[0_8px_0_0_#100800]"
      )}
    >
      {label}
    </button>
  );
}

export function HeroOrderActions() {
  return (
    <>
      <div className="mt-5 grid gap-3 sm:max-w-xl sm:grid-cols-2">
        <PlatformButton label="Uber Eats" platform="uber-eats" />
        <PlatformButton
          label="DoorDash"
          platform="doordash"
          variant="secondary"
        />
      </div>
      <p className="mt-2 text-sm text-[#fff7ed]/74">
        Feeding a crew? See{" "}
        <Link href="/crates" className="font-black text-brand-yellow underline">
          CHKN Crates
        </Link>
      </p>
    </>
  );
}
