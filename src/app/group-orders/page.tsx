import type { Metadata } from "next";
import { GroupOrdersPage } from "@/components/group-orders/group-orders-page";

export const metadata: Metadata = {
  title: "Wings Catering + Group Orders in Downtown Vancouver | CHKN Shack",
  description:
    "Wing crates for offices, parties, and events. 50pc $75, 100pc $145, 200pc $260. Order online or 24h ahead. Sharing trays too.",
};

export default function GroupOrdersRoute() {
  return <GroupOrdersPage />;
}
