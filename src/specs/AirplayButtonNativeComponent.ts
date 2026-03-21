import type {
  CodegenTypes,
  ColorValue,
  HostComponent,
  ViewProps,
} from "react-native";
import { codegenNativeComponent } from "react-native";

export interface NativeProps extends ViewProps {
  tintColor?: ColorValue;
  activeTintColor?: ColorValue;
  prioritizesVideoDevices?: CodegenTypes.WithDefault<boolean, false>;
}

export default codegenNativeComponent<NativeProps>(
  "AirplayButton",
) as HostComponent<NativeProps>;
