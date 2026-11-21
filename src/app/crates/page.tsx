import type { Metadata } from "next";
import { CratesPage } from "@/components/crates/crates-page";

export const metadata: Metadata = {
  title: "CHKN Crate | Feed the Crew",
  description:
    "The 50 piece CHKN Crate is built for office lunches, parties, game days, and late-night group hunger.",
};

export default function CratesRoute() {
  return <CratesPage />;
}
