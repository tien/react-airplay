import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface ShowRoutePickerOptions extends Object {
  prioritizesVideoDevices?: boolean;
}

export interface Spec extends TurboModule {
  showRoutePicker(options: ShowRoutePickerOptions | null): Promise<void>;
}

export default TurboModuleRegistry.get<Spec>("RARoutePickerContext");
