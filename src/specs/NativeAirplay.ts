import {
  CodegenTypes,
  TurboModuleRegistry,
  type TurboModule,
} from "react-native";

/* As per https://developer.apple.com/documentation/avfaudio/avaudiosession/port */
export type AvAudioSessionPortType =
  | "AirPlay"
  | "AVB"
  | "BluetoothA2DPOutput"
  | "BluetoothHFP"
  | "BluetoothLE"
  | "CarAudio"
  | "DisplayPort"
  | "FireWire"
  | "HDMI"
  | "Headphones"
  | "Line In"
  | "Line Out"
  | "MicrophoneBuiltIn"
  | "MicrophoneContinuity"
  | "MicrophoneWired"
  | "PCI"
  | "Receiver"
  | "Speaker"
  | "Thunderbolt"
  | "USBAudio"
  | "Virtual";

export type AvAudioSessionChannel = {
  channelName: string;
  channelNumber: number;
  owningPortUID: string;
  channelLabel: number;
};

export type AvAudioSessionRoute = {
  portName: string;
  portType: AvAudioSessionPortType;
  channels?: AvAudioSessionChannel[];
  uid: string;
  hasHardwareVoiceCallProcessing: boolean;
  isSpatialAudioEnabled: boolean;
};

export type ShowRoutePickerOptions = {
  prioritizesVideoDevices?: boolean;
};

export interface Spec extends TurboModule {
  getExternalPlaybackAvailability(): boolean;
  onExternalPlaybackAvailabilityChanged: CodegenTypes.EventEmitter<boolean>;
  increaseExternalPlaybackAvailabilityListeners(): void;
  decreaseExternalPlaybackAvailabilityListeners(): void;

  getAvAudioSessionRoutes(): AvAudioSessionRoute[];
  onAvAudioSessionRoutesChanged: CodegenTypes.EventEmitter<
    AvAudioSessionRoute[]
  >;
  increaseAvAudioSessionRoutesListeners(): void;
  decreaseAvAudioSessionRoutesListeners(): void;

  showRoutePicker(options?: ShowRoutePickerOptions): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeAirplay");
