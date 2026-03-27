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

export const defaultStoreMap: StoreMap = {
  defaultStoreKey: "vancouver",
  locationSelector: {
    "uber-eats": "https://www.ubereats.com",
    doordash: "https://www.doordash.com",
  },
  stores: {
    vancouver: {
      key: "vancouver",
      label: "Vancouver",
      platforms: {
        "uber-eats": {
          appDeepLink: "ubereats://",
          webUrl: "https://www.ubereats.com",
        },
        doordash: {
          appDeepLink: "doordash://",
          webUrl: "https://www.doordash.com",
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
  }
): OrderDestination {
  const storeKey = resolveStoreKey(userLocation, storeMap);
  const platformStore = storeMap.stores[storeKey]?.platforms[platform];
  const locationSelector = storeMap.locationSelector[platform];

  if (!platformStore) {
    return {
      href: locationSelector,
      fallbackHref: locationSelector,
      usedLocationSelector: true,
    };
  }

  return {
    href:
      options?.preferDeepLink && platformStore.appDeepLink
        ? platformStore.appDeepLink
        : platformStore.webUrl,
    fallbackHref: platformStore.webUrl || locationSelector,
    usedStoreKey: storeKey,
    usedLocationSelector: false,
  };
}

export function openOrderLink(
  platform: OrderPlatform,
  userLocation: UserLocation | null,
  storeMap: StoreMap = defaultStoreMap
) {
  const destination = getOrderLink(platform, userLocation, storeMap, {
    preferDeepLink: true,
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
