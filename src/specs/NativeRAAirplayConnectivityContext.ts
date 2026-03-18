import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export type AvAudioSessionChannel = {
  channelName: string;
  channelNumber: number;
  owningPortUID: string;
  channelLabel: number;
};

export type AvAudioSessionRoute = {
  portName: string;
  portType: string;
  channels: AvAudioSessionChannel[] | null;
  uid: string;
  hasHardwareVoiceCallProcessing: boolean;
};

export interface Spec extends TurboModule {
  fetchAvAudioSessionRoutes(): Promise<AvAudioSessionRoute[]>;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.get<Spec>("RAAirplayConnectivityContext");
