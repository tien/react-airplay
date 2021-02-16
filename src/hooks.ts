import { useEffect, useState } from 'react';

import {
  AirplayConnectivityContext,
  ExternalPlaybackAvailabilityContext,
  onAirplayConnectivityChanged,
  onExternalPlaybackAvailabilityChanged,
} from './airplayModule';

export const useExternalPlaybackAvailability = () => {
  const [
    isExternalPlaybackAvailable,
    setIsExternalPlaybackAvailable,
  ] = useState(false);

  useEffect(() => {
    const subscriptionPromise = ExternalPlaybackAvailabilityContext.fetchExternalPlaybackAvailability()
      .then(setIsExternalPlaybackAvailable)
      .then(() =>
        onExternalPlaybackAvailabilityChanged(setIsExternalPlaybackAvailable)
      );

    return () => {
      subscriptionPromise.then((subscription) => subscription.remove());
    };
  }, []);

  return isExternalPlaybackAvailable;
};

export const useAirplayConnectivity = () => {
  const [isAirplayConnected, setIsAirplayConnected] = useState(false);

  useEffect(() => {
    const subscriptionPromise = AirplayConnectivityContext.fetchAirplayConnectivity()
      .then(setIsAirplayConnected)
      .then(() => onAirplayConnectivityChanged(setIsAirplayConnected));

    return () => {
      subscriptionPromise.then((subscription) => subscription.remove());
    };
  }, []);

  return isAirplayConnected;
};
