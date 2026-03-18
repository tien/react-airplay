import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface AvAudioSessionChannel extends Object {
  channelName: string;
  channelNumber: number;
  owningPortUID: string;
  channelLabel: string;
}

export interface AvAudioSessionRoute extends Object {
  portName: string;
  portType: string;
  channels: ReadonlyArray<AvAudioSessionChannel> | null;
  uid: string;
  hasHardwareVoiceCallProcessing: boolean;
  isSpatialAudioEnabled: boolean;
}

export interface Spec extends TurboModule {
  fetchAvAudioSessionRoutes(): Promise<ReadonlyArray<AvAudioSessionRoute>>;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.get<Spec>("RAAirplayConnectivityContext");
