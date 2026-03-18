import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  showRoutePicker(prioritizesVideoDevices: boolean): Promise<void>;
}

export default TurboModuleRegistry.get<Spec>("RARoutePickerContext");
