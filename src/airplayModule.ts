import { NativeEventEmitter, Platform } from "react-native";

import NativeRAAirplayConnectivityContext, {
  type AvAudioSessionChannel as NativeAvAudioSessionChannel,
  type AvAudioSessionRoute as NativeAvAudioSessionRoute,
} from "./specs/NativeRAAirplayConnectivityContext";

import NativeRAExternalPlaybackAvailabilityContext from "./specs/NativeRAExternalPlaybackAvailabilityContext";

import NativeRARoutePickerContext from "./specs/NativeRARoutePickerContext";

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

export interface AvAudioSessionChannel {
  channelName: string;
  channelNumber: number;
  owningPortUID: string;
  channelLabel: string;
}

export interface AvAudioSessionRoute {
  portName: string;
  portType: AvAudioSessionPortType;
  channels: AvAudioSessionChannel[];
  uid: string;
  hasHardwareVoiceCallProcessing: boolean;
  isSpatialAudioEnabled: boolean;
}

export type ShowRoutePickerOptions = {
  prioritizesVideoDevices?: boolean;
};

const EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED =
  "externalPlaybackAvailabilityChanged";
const AV_AUDIO_SESSION_ROUTES_CHANGED = "avAudioSessionRoutesChanged";

export {
  EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
  AV_AUDIO_SESSION_ROUTES_CHANGED,
};

export const AirplayConnectivityContext = NativeRAAirplayConnectivityContext;
export const ExternalPlaybackAvailabilityContext =
  NativeRAExternalPlaybackAvailabilityContext;

export const ExternalPlaybackAvailabilityEventEmitter =
  NativeRAExternalPlaybackAvailabilityContext
    ? new NativeEventEmitter(NativeRAExternalPlaybackAvailabilityContext)
    : null;

export const AirplayConnectivityEventEmitter =
  NativeRAAirplayConnectivityContext
    ? new NativeEventEmitter(NativeRAAirplayConnectivityContext)
    : null;

const transformRoute = (
  route: NativeAvAudioSessionRoute,
): AvAudioSessionRoute => ({
  portName: route.portName,
  portType: route.portType as AvAudioSessionPortType,
  channels:
    route.channels?.map(
      (channel: NativeAvAudioSessionChannel): AvAudioSessionChannel => ({
        channelName: channel.channelName,
        channelNumber: channel.channelNumber,
        owningPortUID: channel.owningPortUID,
        channelLabel: String(channel.channelLabel),
      }),
    ) ?? [],
  uid: route.uid,
  hasHardwareVoiceCallProcessing: route.hasHardwareVoiceCallProcessing,
  isSpatialAudioEnabled: false,
});

export const onExternalPlaybackAvailabilityChanged = (
  callback: (availability: boolean) => void,
) => {
  if (!ExternalPlaybackAvailabilityEventEmitter) {
    console.warn(
      "react-airplay: ExternalPlaybackAvailabilityContext native module not found",
    );
    return { remove: () => {} };
  }
  return ExternalPlaybackAvailabilityEventEmitter.addListener(
    EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED,
    callback,
  );
};

export const onAvAudioSessionRoutesChanged = (
  callback: (routes: AvAudioSessionRoute[]) => void,
) => {
  if (!AirplayConnectivityEventEmitter) {
    console.warn(
      "react-airplay: AirplayConnectivityContext native module not found",
    );
    return { remove: () => {} };
  }
  return AirplayConnectivityEventEmitter.addListener(
    AV_AUDIO_SESSION_ROUTES_CHANGED,
    (routes: NativeAvAudioSessionRoute[]) =>
      callback(routes.map(transformRoute)),
  );
};

export const showRoutePicker = (options: ShowRoutePickerOptions) => {
  if (Platform.OS !== "ios") {
    console.warn("showRoutePicker is only supported on iOS");
    return Promise.resolve();
  }

  if (!NativeRARoutePickerContext) {
    console.warn("react-airplay: RoutePickerContext native module not found");
    return Promise.resolve();
  }

  return NativeRARoutePickerContext.showRoutePicker(
    options?.prioritizesVideoDevices ?? false,
  );
};

export const fetchAvAudioSessionRoutes = async (): Promise<
  AvAudioSessionRoute[]
> => {
  if (!NativeRAAirplayConnectivityContext) {
    console.warn(
      "react-airplay: AirplayConnectivityContext native module not found",
    );
    return [];
  }
  const routes =
    await NativeRAAirplayConnectivityContext.fetchAvAudioSessionRoutes();
  return routes.map(transformRoute);
};

export const fetchExternalPlaybackAvailability = (): Promise<boolean> => {
  if (!NativeRAExternalPlaybackAvailabilityContext) {
    console.warn(
      "react-airplay: ExternalPlaybackAvailabilityContext native module not found",
    );
    return Promise.resolve(false);
  }
  return NativeRAExternalPlaybackAvailabilityContext.fetchExternalPlaybackAvailability();
};
