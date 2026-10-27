export type OrderPlatform = "uber-eats" | "doordash";

export type UserLocation = {
  city?: string;
  region?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
};

export type PlatformStoreConfig = {
  appDeepLink?: string;
  webUrl: string;
};

export type StoreConfig = {
  key: string;
  label: string;
  platforms: Partial<Record<OrderPlatform, PlatformStoreConfig>>;
};

export type StoreMap = {
  defaultStoreKey: string;
  locationSelector: Record<OrderPlatform, string>;
  stores: Record<string, StoreConfig>;
  aliases?: Record<string, string>;
};

export type OrderDestination = {
  href: string;
  fallbackHref: string;
  usedStoreKey?: string;
  usedLocationSelector: boolean;
};

// Every place on the site that can send someone to Uber Eats / DoorDash. This is
// a closed union so the analytics `location` dimension and the outbound
// `utm_content` value can never drift apart or pick up a typo at a call site.
export type OrderLocation =
  | "homepage_hero"
  | "homepage_sticky_bar"
  | "crates_hero"
  | "crates_final_cta"
  | "crates_sticky_bar"
  | "group_orders_hero"
  | "group_orders_final_cta"
  | "party_builder"
  | "location_page_downtown_vancouver"
  | "location_page_langley"
  | "location_page_tsawwassen";

const UTM_PARAMS = {
  utm_source: "wingschknshack.com",
  utm_medium: "website",
  utm_campaign: "direct",
} as const;

/**
 * Tag an outbound platform URL so Uber Eats / DoorDash attribute the session to
 * us too. Deep links (uberats://, doordash://) are returned untouched — the apps
 * parse their own path grammar and choke on stray query params.
 */
export function withOrderUtm(url: string, location: OrderLocation): string {
  if (!/^https?:\/\//i.test(url)) {
    return url;
  }

  const tagged = new URL(url);
  for (const [key, value] of Object.entries(UTM_PARAMS)) {
    tagged.searchParams.set(key, value);
  }
  tagged.searchParams.set("utm_content", location);
  return tagged.toString();
}

export const defaultStoreMap: StoreMap = {
  defaultStoreKey: "vancouver",
  locationSelector: {
    "uber-eats": "https://www.order.store/store/wings-chkn-shack/P6HcLdBWWTOobb5RB31jJw",
    doordash: "https://order.online/business/wings-chkn-shack-13029476",
  },
  stores: {
    vancouver: {
      key: "vancouver",
      label: "Vancouver",
      platforms: {
        "uber-eats": {
          webUrl: "https://www.order.store/store/wings-chkn-shack/P6HcLdBWWTOobb5RB31jJw",
        },
        doordash: {
          webUrl: "https://order.online/business/wings-chkn-shack-13029476",
        },
      },
    },
  },
  aliases: {
    burnaby: "vancouver",
    surrey: "vancouver",
    "mount pleasant": "vancouver",
  },
};

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function resolveStoreKey(userLocation: UserLocation | null, storeMap: StoreMap) {
  if (!userLocation) {
    return storeMap.defaultStoreKey;
  }

  const candidates = [
    userLocation.city,
    userLocation.region,
    userLocation.postalCode,
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const normalizedCandidate = normalizeKey(candidate);
    if (storeMap.stores[normalizedCandidate]) {
      return normalizedCandidate;
    }

    const aliased = storeMap.aliases?.[normalizedCandidate];
    if (aliased && storeMap.stores[aliased]) {
      return aliased;
    }
  }

  return storeMap.defaultStoreKey;
}

export function getOrderLink(
  platform: OrderPlatform,
  userLocation: UserLocation | null,
  storeMap: StoreMap = defaultStoreMap,
  options?: {
    preferDeepLink?: boolean;
    utmContent?: OrderLocation;
  }
): OrderDestination {
  const storeKey = resolveStoreKey(userLocation, storeMap);
  const platformStore = storeMap.stores[storeKey]?.platforms[platform];
  const locationSelector = storeMap.locationSelector[platform];

  const tag = (url: string) =>
    options?.utmContent ? withOrderUtm(url, options.utmContent) : url;

  if (!platformStore) {
    return {
      href: tag(locationSelector),
      fallbackHref: tag(locationSelector),
      usedLocationSelector: true,
    };
  }

  return {
    href: tag(
      options?.preferDeepLink && platformStore.appDeepLink
        ? platformStore.appDeepLink
        : platformStore.webUrl
    ),
    fallbackHref: tag(platformStore.webUrl || locationSelector),
    usedStoreKey: storeKey,
    usedLocationSelector: false,
  };
}

export function openOrderLink(
  platform: OrderPlatform,
  userLocation: UserLocation | null,
  storeMap: StoreMap = defaultStoreMap,
  options?: {
    utmContent?: OrderLocation;
  }
) {
  const destination = getOrderLink(platform, userLocation, storeMap, {
    preferDeepLink: true,
    utmContent: options?.utmContent,
  });

  if (typeof window === "undefined") {
    return destination;
  }

  if (destination.href === destination.fallbackHref) {
    window.location.assign(destination.href);
    return destination;
  }

  const fallbackTimer = window.setTimeout(() => {
    window.location.assign(destination.fallbackHref);
  }, 900);

  const clearFallback = () => {
    window.clearTimeout(fallbackTimer);
    window.removeEventListener("pagehide", clearFallback);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      clearFallback();
    }
  };

  window.addEventListener("pagehide", clearFallback, { once: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.location.assign(destination.href);

  return destination;
}
