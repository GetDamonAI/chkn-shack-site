import Image from "next/image";
import Link from "next/link";
import { PlatformLink } from "@/components/analytics/platform-link";
import {
  listNeighbourhoods,
  venueJsonLd,
  type Venue,
  type VenueSlug,
} from "@/components/locations/data";
import type { OrderLocation } from "@/lib/ordering";

// Abbotsford has no order links yet, so it never reaches the buttons.
const ORDER_LOCATION: Record<Exclude<VenueSlug, "abbotsford">, OrderLocation> = {
  "downtown-vancouver": "location_page_downtown_vancouver",
  langley: "location_page_langley",
  tsawwassen: "location_page_tsawwassen",
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function PageSection({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <section className={cn("px-4 py-8 sm:px-6 sm:py-10", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function formatAddress(venue: Venue) {
  const a = venue.address;
  return a ? `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}` : null;
}

export function VenuePage({ venue }: Readonly<{ venue: Venue }>) {
  const isLive = venue.status === "live";
  const address = formatAddress(venue);
  const neighbourhoods = listNeighbourhoods(venue);
  const orderLocation =
    venue.slug === "abbotsford" ? null : ORDER_LOCATION[venue.slug];

  return (
    <main className="bg-background pb-28 text-foreground md:pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(venueJsonLd(venue)).replace(/</g, "\\u003c"),
        }}
      />
      <PageSection className="pt-4 sm:pt-6">
        <div className="brand-grid rounded-[2rem] border-2 border-brand-ink bg-surface px-4 py-4 shadow-[0_12px_0_0_#100800] sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-3xl uppercase leading-none text-brand-ink sm:text-4xl">
                CHKN Shack
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
                Wings for the wildly hungry
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border-2 border-brand-ink bg-[#fff7ed] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-brand-ink"
            >
              Home
            </Link>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="rounded-[2.5rem] border-2 border-brand-ink bg-brand-ink px-5 py-6 text-[#fff7ed] shadow-[0_16px_0_0_#ef3d23] sm:px-7 sm:py-8">
            <p
              className={cn(
                "w-fit rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.24em]",
                isLive ? "bg-brand-red text-[#fff7ed]" : "bg-brand-yellow text-brand-ink"
              )}
            >
              {isLive ? "Live" : "Opening Soon"}
            </p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.92] sm:text-6xl">
              CHKN Shack · {venue.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#fff7ed]/82 sm:text-lg">
              {isLive
                ? `Serving hand-sauced wings, Shack Cut Fries, and Crates to ${neighbourhoods}.`
                : `Coming soon: hand-sauced wings, Shack Cut Fries, and Crates for ${neighbourhoods}.`}
            </p>

            {venue.order && orderLocation ? (
              <div className="mt-7 space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-yellow">
                  Order now
                </p>
                <div className="grid gap-3 sm:max-w-md sm:grid-cols-2">
                  <PlatformLink
                    platform="uber-eats"
                    location={orderLocation}
                    href={venue.order.uberEats}
                    className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-red px-5 text-center text-base font-black uppercase tracking-[0.2em] text-[#fff7ed] shadow-[0_8px_0_0_#100800] transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    Uber Eats
                  </PlatformLink>
                  <PlatformLink
                    platform="doordash"
                    location={orderLocation}
                    href={venue.order.doorDash}
                    className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow px-5 text-center text-base font-black uppercase tracking-[0.2em] text-brand-ink shadow-[0_8px_0_0_#100800] transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    DoorDash
                  </PlatformLink>
                </div>
              </div>
            ) : (
              <p className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-brand-yellow">
                Not taking orders yet. Check back soon.
              </p>
            )}

            {address || venue.phone || venue.hours ? (
              <dl className="mt-8 grid gap-4 border-t-2 border-[#fff7ed]/20 pt-6 text-sm sm:grid-cols-2">
                {address ? (
                  <div>
                    <dt className="text-xs font-black uppercase tracking-[0.24em] text-brand-yellow">
                      Kitchen
                    </dt>
                    <dd className="mt-1 leading-6 text-[#fff7ed]/82">{address}</dd>
                  </div>
                ) : null}
                {venue.phone ? (
                  <div>
                    <dt className="text-xs font-black uppercase tracking-[0.24em] text-brand-yellow">
                      Phone
                    </dt>
                    <dd className="mt-1 leading-6 text-[#fff7ed]/82">
                      <a href={`tel:${venue.phone.replace(/[^\d+]/g, "")}`}>{venue.phone}</a>
                    </dd>
                  </div>
                ) : null}
                {venue.hours ? (
                  <div>
                    <dt className="text-xs font-black uppercase tracking-[0.24em] text-brand-yellow">
                      Hours
                    </dt>
                    {venue.hours.map((h) => (
                      <dd key={h.label} className="mt-1 leading-6 text-[#fff7ed]/82">
                        {h.label} · {h.time}
                      </dd>
                    ))}
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>

          <Image
            src="/hero.jpg"
            alt="CHKN Shack hand-sauced wings"
            width={2400}
            height={1600}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-full w-full rounded-[2.5rem] border-2 border-brand-ink object-cover shadow-[0_16px_0_0_#100800]"
          />
        </div>
      </PageSection>

      {address ? (
        <PageSection>
          <iframe
            title={`Map of CHKN Shack ${venue.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full rounded-[2rem] border-2 border-brand-ink shadow-[0_12px_0_0_#100800]"
          />
        </PageSection>
      ) : null}
    </main>
  );
}
