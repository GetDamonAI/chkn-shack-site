import type { Metadata } from "next";
import { Suspense } from "react";

import { Analytics } from "@/components/analytics/analytics";
import { RouteTracker } from "@/components/analytics/route-tracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wingschknshack.com"),
  title: "CHKN Shack | Chicken Wings + Group Order Delivery | Vancouver",
  description:
    "CHKN Shack is a delivery-first wing spot built for late-night cravings, group orders, and reckless amounts of ranch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <Analytics />
        {/* useSearchParams opts its subtree into client rendering, so the
            boundary keeps the rest of the page prerenderable. */}
        <Suspense fallback={null}>
          <RouteTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
