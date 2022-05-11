import {
  NativeEventEmitter,
  NativeModule,
  NativeModules,
  Platform,
} from 'react-native';

export type ExternalPlaybackAvailabilityContext = NativeModule & {
  fetchExternalPlaybackAvailability: () => Promise<boolean>;
};

/* As per https://developer.apple.com/documentation/avfaudio/avaudiosession/port */
export type AVAudioSessionPortType =
  | 'BuiltInMic'
  | 'HeadsetMic'
  | 'LineIn'
  | 'AirPlay'
  | 'BluetoothA2DP'
  | 'BluetoothLE'
  | 'BuiltInReceiver'
  | 'BuiltInSpeaker'
  | 'HDMI'
  | 'Headphones'
  | 'LineOut'
  | 'AVB'
  | 'BluetoothHFP'
  | 'DisplayPort'
  | 'CarAudio'
  | 'FireWire'
  | 'PCI'
  | 'Thunderbolt'
  | 'UsbAudio'
  | 'Virtual';

export interface AVAudioSessionChannel {
  channelName: string;
  channelNumber: number;
  owningPortUID: string;
  channelLabel: string;
}

export interface AVAudioSessionRoute {
  portName: string;
  portType: AVAudioSessionPortType;
  channels: AVAudioSessionChannel[];
  uid: string;
  hasHardwareVoiceCallProcessing: boolean;
  isSpatialAudioEnabled: boolean;
}

export type AirplayConnectivityContext = NativeModule & {
  fetchAVAudioSessionRoutes: () => Promise<AVAudioSessionRoute[]>;
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
  AV_AUDIO_SESSION_ROUTES_CHANGED,
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

export const onAVAudioSessionRoutesChanged = (
  callback: (routes: AVAudioSessionRoute[]) => void,
) =>
  AirplayConnectivityEventEmitter.addListener(
    AV_AUDIO_SESSION_ROUTES_CHANGED,
    callback,
  );

export const showRoutePicker = (options: ShowRoutePickerOptions) => {
  if (Platform.OS !== 'ios' && RARoutePickerContext === undefined) {
    console.warn('showRoutePicker is only supported on iOS');
  }

  return RARoutePickerContext?.showRoutePicker(options) ?? Promise.resolve();
};
