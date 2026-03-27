import type { Metadata } from "next";
import { FranchisingPage } from "@/components/franchising/franchising-page";

export const metadata: Metadata = {
  title: "Franchise With CHKN Shack",
  description:
    "Learn about franchising with CHKN Shack, a delivery-first chicken brand built for scalable growth.",
};

export default function FranchisingRoute() {
  return <FranchisingPage />;
}
