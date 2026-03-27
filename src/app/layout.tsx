import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHKN Shack | Wings, Fries, Shakes, Crates",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
