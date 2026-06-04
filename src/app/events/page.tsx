import type { Metadata } from "next";
import PartyBuilder from "@/components/party-builder";

export const metadata: Metadata = {
  title: "Party Builder | CHKN Shack",
  description:
    "Plan the right wing order for your event. Pick your occasion, set your headcount, and lock in the order before it gets chaotic.",
};

export default function EventsRoute() {
  return <PartyBuilder />;
}
