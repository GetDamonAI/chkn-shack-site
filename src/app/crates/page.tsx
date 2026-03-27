import type { Metadata } from "next";
import { CratesPage } from "@/components/crates/crates-page";

export const metadata: Metadata = {
  title: "CHKN Crates | Feed the Crew",
  description:
    "CHKN Crates are built for office lunches, parties, game days, and late-night group hunger.",
};

export default function CratesRoute() {
  return <CratesPage />;
}
