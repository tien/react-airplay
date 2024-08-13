import { useEffect, useState } from "react";

import {
  AirplayConnectivityContext,
  type AvAudioSessionRoute,
  ExternalPlaybackAvailabilityContext,
  onAvAudioSessionRoutesChanged,
  onExternalPlaybackAvailabilityChanged,
} from "./airplayModule";

export type UseExternalPlaybackAvailabilityOptions = {
  enabled?: boolean;
  /**
   * @deprecated use {@link UseExternalPlaybackAvailabilityOptions.enabled} instead
   */
  useCachedValue?: boolean;
};

export const useExternalPlaybackAvailability = ({
  enabled = true,
  useCachedValue,
}: UseExternalPlaybackAvailabilityOptions = {}) => {
  const [isExternalPlaybackAvailable, setIsExternalPlaybackAvailable] =
    useState(false);

  useEffect(() => {
    if (useCachedValue ?? !enabled) return;

    const subscription = onExternalPlaybackAvailabilityChanged(
      setIsExternalPlaybackAvailable,
    );

    ExternalPlaybackAvailabilityContext?.fetchExternalPlaybackAvailability().then(
      setIsExternalPlaybackAvailable,
    );

    return subscription.remove.bind(subscription);
  }, [enabled, useCachedValue]);

  return isExternalPlaybackAvailable;
};

export const useAirplayConnectivity = () => {
  const routes = useAirplayRoutes();
  return routes.length > 0;
};

export const useAirplayRoutes = () => {
  const routes = useAvAudioSessionRoutes();
  return routes.filter((route) => route.portType === "AirPlay");
};

export const useAvAudioSessionRoutes = () => {
  const [routes, setRoutes] = useState<AvAudioSessionRoute[]>([]);

  useEffect(() => {
    const subscription = onAvAudioSessionRoutesChanged(setRoutes);

    AirplayConnectivityContext?.fetchAvAudioSessionRoutes().then(setRoutes);

    return subscription.remove.bind(subscription);
  }, []);

  return routes;
};
