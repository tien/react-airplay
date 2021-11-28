import {
  NativeEventEmitter,
  NativeModule,
  NativeModules,
  Platform,
} from 'react-native';

export type ExternalPlaybackAvailabilityContext = NativeModule & {
  fetchExternalPlaybackAvailability: () => Promise<boolean>;
};

export type AirplayConnectivityContext = NativeModule & {
  fetchAirplayConnectivity: () => Promise<boolean>;
};

export type RoutePickerContext = NativeModule & {
  showRoutePicker: (options?: ShowRoutePickerOptions) => Promise<void>;
};

export type ShowRoutePickerOptions = {
  prioritizesVideoDevices?: boolean;
};

const {
  RAEvents,
  RAAirplayConnectivityContext,
  RAExternalPlaybackAvailabilityContext,
  RARoutePickerContext,
} = NativeModules as {
  RAEvents?: {getConstants: () => Record<string, string>};
  RAAirplayConnectivityContext?: AirplayConnectivityContext;
  RAExternalPlaybackAvailabilityContext?: ExternalPlaybackAvailabilityContext;
  RARoutePickerContext?: RoutePickerContext;
};

const constants = RAEvents?.getConstants();

export const AirplayConnectivityContext = RAAirplayConnectivityContext;
export const ExternalPlaybackAvailabilityContext =
  RAExternalPlaybackAvailabilityContext;

export const {
  EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
  AIRPLAY_CONNECTIVITY_CHANGED,
} = constants ?? {};

export const ExternalPlaybackAvailabilityEventEmitter = new NativeEventEmitter(
  RAExternalPlaybackAvailabilityContext,
);

export const AirplayConnectivityEventEmitter = new NativeEventEmitter(
  RAAirplayConnectivityContext,
);

export const onExternalPlaybackAvailabilityChanged = (
  callback: (availability: boolean) => void,
) =>
  ExternalPlaybackAvailabilityEventEmitter.addListener(
    EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
    callback,
  );

export const onAirplayConnectivityChanged = (
  callback: (connected: boolean) => void,
) =>
  AirplayConnectivityEventEmitter.addListener(
    AIRPLAY_CONNECTIVITY_CHANGED,
    callback,
  );

export const showRoutePicker = (options: ShowRoutePickerOptions) => {
  if (Platform.OS !== 'ios' && RARoutePickerContext === undefined) {
    console.warn('showRoutePicker is only supported on iOS');
  }

  return RARoutePickerContext?.showRoutePicker(options) ?? Promise.resolve();
};
