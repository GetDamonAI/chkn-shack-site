import type { NextRequest } from "next/server";

import { ORDER_ONLINE_URL } from "@/lib/ordering";

/**
 * GET /go/dd — ORDER NOW redirect to our DoorDash online-ordering page.
 *
 * Logs the hit, then forwards with every `utm_*` from the inbound URL kept as
 * is, so attribution set by the button (or an ad, QR code or email linking
 * here) reaches DoorDash. v1 logs to stdout (Vercel runtime logs) as one JSON
 * line per hit; swap console.log for a real sink later.
 *
 * Reading the request makes this run on every hit (route handlers that read
 * the request are never prerendered), and `no-store` keeps any cache from
 * replaying the redirect without logging it.
 */
export function GET(request: NextRequest) {
  const destination = new URL(ORDER_ONLINE_URL);
  const utm: Record<string, string> = {};

  for (const [key, value] of request.nextUrl.searchParams) {
    if (!key.startsWith("utm_")) continue;
    destination.searchParams.set(key, value);
    utm[key] = value;
  }

  console.log(
    JSON.stringify({
      event: "order_redirect",
      platform: "doordash",
      utm,
      referer: request.headers.get("referer"),
      at: new Date().toISOString(),
    })
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: destination.toString(),
      "Cache-Control": "no-store",
    },
  });
}
