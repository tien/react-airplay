import {useEffect, useState} from 'react';

import {
  AirplayConnectivityContext,
  AVAudioSessionRoute,
  ExternalPlaybackAvailabilityContext,
  onAVAudioSessionRoutesChanged,
  onExternalPlaybackAvailabilityChanged,
} from './airplayModule';

export type UseExternalPlaybackAvailabilityOptions = {
  useCachedValue?: boolean;
};

export const useExternalPlaybackAvailability = (
  options?: UseExternalPlaybackAvailabilityOptions,
) => {
  const [isExternalPlaybackAvailable, setIsExternalPlaybackAvailable] =
    useState(false);

  useEffect(() => {
    if (options?.useCachedValue ?? false) return;

    const subscription = onExternalPlaybackAvailabilityChanged(
      setIsExternalPlaybackAvailable,
    );

    ExternalPlaybackAvailabilityContext?.fetchExternalPlaybackAvailability().then(
      setIsExternalPlaybackAvailable,
    );

    return subscription.remove.bind(subscription);
  }, [options?.useCachedValue ?? false]);

  return isExternalPlaybackAvailable;
};

export const useAirplayConnectivity = () => {
  const routes = useAirplayRoutes();
  return routes.length > 0;
};

export const useAirplayRoutes = () => {
  const routes = useAVAudioSessionRoutes();
  return routes.filter(route => route.portType === 'AirPlay');
};

export const useAVAudioSessionRoutes = () => {
  const [routes, setRoutes] = useState<AVAudioSessionRoute[]>([]);

  useEffect(() => {
    const subscription = onAVAudioSessionRoutesChanged(setRoutes);

    AirplayConnectivityContext?.fetchAVAudioSessionRoutes().then(setRoutes);

    return subscription.remove.bind(subscription);
  }, []);

  return routes;
};
