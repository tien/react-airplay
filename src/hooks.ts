import { DependencyList, useEffect, useState } from 'react';

import {
  onAirplayConnectivityChanged,
  onExternalPlaybackAvailabilityChanged,
} from './airplayModule';

export const useExternalPlaybackAvailability = (deps: DependencyList = []) => {
  const [
    isExternalPlaybackAvailable,
    setIsExternalPlaybackAvailable,
  ] = useState(false);

  useEffect(
    () => onExternalPlaybackAvailabilityChanged(setIsExternalPlaybackAvailable),
    deps
  );

  return isExternalPlaybackAvailable;
};

export const useAirplayConnectivity = (deps: DependencyList = []) => {
  const [isAirplayConnected, setIsAirplayConnected] = useState(false);

  useEffect(() => onAirplayConnectivityChanged(setIsAirplayConnected), deps);

  return isAirplayConnected;
};
