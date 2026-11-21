import type { Metadata } from "next";
import { GroupOrdersPage } from "@/components/group-orders/group-orders-page";

export const metadata: Metadata = {
  title: "Wings Catering + Group Orders in Downtown Vancouver | CHKN Shack",
  description:
    "Wing crates for offices, parties, and events. 50pc crate $95. Order online for same-day pickup or delivery. Sharing trays too.",
};

export default function GroupOrdersRoute() {
  return <GroupOrdersPage />;
}
