import { NativeEventEmitter, Platform } from "react-native";
import NativeRAAirplayConnectivityContext from "./NativeRAAirplayConnectivityContext";
import NativeRAExternalPlaybackAvailabilityContext from "./NativeRAExternalPlaybackAvailabilityContext";
import NativeRARoutePickerContext from "./NativeRARoutePickerContext";

export type {
  AvAudioSessionChannel,
  AvAudioSessionRoute,
} from "./NativeRAAirplayConnectivityContext";
export type { ShowRoutePickerOptions } from "./NativeRARoutePickerContext";

/* As per https://developer.apple.com/documentation/avfaudio/avaudiosession/port */
export type AvAudioSessionPortType =
  | "BuiltInMic"
  | "HeadsetMic"
  | "LineIn"
  | "AirPlay"
  | "BluetoothA2DP"
  | "BluetoothLE"
  | "BuiltInReceiver"
  | "BuiltInSpeaker"
  | "HDMI"
  | "Headphones"
  | "LineOut"
  | "AVB"
  | "BluetoothHFP"
  | "DisplayPort"
  | "CarAudio"
  | "FireWire"
  | "PCI"
  | "Thunderbolt"
  | "UsbAudio"
  | "Virtual";

export const EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED =
  "externalPlaybackAvailabilityChanged";
export const AV_AUDIO_SESSION_ROUTES_CHANGED = "avAudioSessionRoutesChanged";

export const AirplayConnectivityContext = NativeRAAirplayConnectivityContext;
export const ExternalPlaybackAvailabilityContext =
  NativeRAExternalPlaybackAvailabilityContext;

export const ExternalPlaybackAvailabilityEventEmitter = new NativeEventEmitter(
  NativeRAExternalPlaybackAvailabilityContext ?? undefined,
);

export const AirplayConnectivityEventEmitter = new NativeEventEmitter(
  NativeRAAirplayConnectivityContext ?? undefined,
);

export const onExternalPlaybackAvailabilityChanged = (
  callback: (availability: boolean) => void,
) =>
  ExternalPlaybackAvailabilityEventEmitter.addListener(
    EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
    callback,
  );

export const onAvAudioSessionRoutesChanged = (
  callback: (
    routes: import("./NativeRAAirplayConnectivityContext").AvAudioSessionRoute[],
  ) => void,
) =>
  AirplayConnectivityEventEmitter.addListener(
    AV_AUDIO_SESSION_ROUTES_CHANGED,
    callback,
  );

export const showRoutePicker = (
  options: import("./NativeRARoutePickerContext").ShowRoutePickerOptions,
) => {
  if (Platform.OS !== "ios" || NativeRARoutePickerContext === null) {
    console.warn("showRoutePicker is only supported on iOS");
    return Promise.resolve();
  }

  return NativeRARoutePickerContext.showRoutePicker(options ?? null);
};
