"use client";

import Link from "next/link";
import {
  defaultStoreMap,
  openOrderLink,
  type OrderLocation,
  type OrderPlatform,
} from "@/lib/ordering";
import { trackPlatformClick } from "@/lib/tracking";

const HERO_LOCATION: OrderLocation = "homepage_hero";

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
        // Report before handing the tab over: openOrderLink navigates this
        // document away rather than opening a new one, so anything queued
        // after the call risks being cancelled mid-flight.
        trackPlatformClick(platform, HERO_LOCATION);
        openOrderLink(platform, null, defaultStoreMap, {
          utmContent: HERO_LOCATION,
        });
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
