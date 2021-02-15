import { NativeEventEmitter, NativeModules } from 'react-native';

const { ReactAirplay } = NativeModules;

const constants = ReactAirplay.getConstants() as Record<string, string>;

export const {
  EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
  AIRPLAY_CONNECTIVITY_CHANGED,
} = constants;

export const AirplayListener = new NativeEventEmitter(ReactAirplay);

export const onExternalPlaybackAvailabilityChanged = (
  callback: (availability: boolean) => void
) => {
  const listener = AirplayListener.addListener(
    EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
    callback
  );

  return listener.remove.bind(listener);
};

export const onAirplayConnectivityChanged = (
  callback: (connected: boolean) => void
) => {
  const listener = AirplayListener.addListener(
    AIRPLAY_CONNECTIVITY_CHANGED,
    callback
  );

  return listener.remove.bind(listener);
};
