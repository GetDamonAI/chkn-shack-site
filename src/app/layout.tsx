import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHKN Shack | Chicken Wings + Group Order Delivery | Vancouver",
  description:
    "CHKN Shack is a delivery-first wing spot built for late-night cravings, group orders, and reckless amounts of ranch.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "CHKN Shack",
  servesCuisine: ["Chicken Wings", "American", "Comfort"],
  priceRange: "$$",
  hasMenu: "https://wingschknshack.com/",
  url: "https://wingschknshack.com",
  openingHours: ["Mo-Su 11:30-23:00"],
  sameAs: ["https://www.ubereats.com", "https://www.doordash.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
