import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

export type ExternalPlaybackAvailabilityContext = {
  fetchExternalPlaybackAvailability: () => Promise<boolean>;
};

export type AirplayConnectivityContext = {
  fetchAirplayConnectivity: () => Promise<boolean>;
};

const {
  RAEvents,
  RAAirplayConnectivityContext,
  RAExternalPlaybackAvailabilityContext,
} = NativeModules;

const constants =
  Platform.OS !== 'ios'
    ? {}
    : (RAEvents.getConstants() as Record<string, string>);

export const ExternalPlaybackAvailabilityContext =
  RAExternalPlaybackAvailabilityContext as ExternalPlaybackAvailabilityContext;
export const AirplayConnectivityContext =
  RAAirplayConnectivityContext as AirplayConnectivityContext;

export const {
  EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
  AIRPLAY_CONNECTIVITY_CHANGED,
} = constants;

export const ExternalPlaybackAvailabilityEventEmitter = new NativeEventEmitter(
  RAExternalPlaybackAvailabilityContext
);

export const AirplayConnectivityEventEmitter = new NativeEventEmitter(
  RAAirplayConnectivityContext
);

export const onExternalPlaybackAvailabilityChanged = (
  callback: (availability: boolean) => void
) =>
  ExternalPlaybackAvailabilityEventEmitter.addListener(
    EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
    callback
  );

export const onAirplayConnectivityChanged = (
  callback: (connected: boolean) => void
) =>
  AirplayConnectivityEventEmitter.addListener(
    AIRPLAY_CONNECTIVITY_CHANGED,
    callback
  );
