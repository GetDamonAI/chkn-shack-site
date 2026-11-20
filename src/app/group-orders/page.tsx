import type { Metadata } from "next";
import { GroupOrdersPage } from "@/components/group-orders/group-orders-page";

export const metadata: Metadata = {
  title: "Wings Catering + Group Orders in Downtown Vancouver | CHKN Shack",
  description:
    "Wing crates for offices, parties, and events. 50pc $95, 100pc $179, 200pc $339. Order online or 24h ahead. Sharing trays too.",
};

export default function GroupOrdersRoute() {
  return <GroupOrdersPage />;
}
