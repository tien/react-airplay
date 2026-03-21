import { useEffect, useState } from "react";

import {
  getAvAudioSessionRoutes,
  getExternalPlaybackAvailability,
  onAvAudioSessionRoutesChanged,
  onExternalPlaybackAvailabilityChanged,
} from "./airplayModule";
import type { AvAudioSessionRoute } from "./specs/NativeAirplay";

export type UseExternalPlaybackAvailabilityOptions = {
  enabled?: boolean;
};

export const useExternalPlaybackAvailability = ({
  enabled = true,
}: UseExternalPlaybackAvailabilityOptions = {}) => {
  const [isExternalPlaybackAvailable, setIsExternalPlaybackAvailable] =
    useState(() => getExternalPlaybackAvailability());

  useEffect(() => {
    if (!enabled) return;

    return onExternalPlaybackAvailabilityChanged(
      setIsExternalPlaybackAvailable,
    );
  }, [enabled]);

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
  const [routes, setRoutes] = useState<AvAudioSessionRoute[]>(() =>
    getAvAudioSessionRoutes(),
  );

  useEffect(() => onAvAudioSessionRoutesChanged(setRoutes), []);

  return routes;
};
