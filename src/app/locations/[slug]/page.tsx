import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  OG_IMAGE,
  getVenue,
  venueDescription,
  venueTitle,
  venueUrl,
  venues,
} from "@/components/locations/data";
import { VenuePage } from "@/components/locations/venue-page";

type Props = {
  params: Promise<{ slug: string }>;
};

// Only the venues in data.ts exist; anything else under /locations is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return venues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const venue = getVenue((await params).slug);
  if (!venue) return {};

  const title = venueTitle(venue);
  const description = venueDescription(venue);
  const url = venueUrl(venue);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "CHKN Shack",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default async function LocationRoute({ params }: Props) {
  const venue = getVenue((await params).slug);
  if (!venue) notFound();

  return <VenuePage venue={venue} />;
}
