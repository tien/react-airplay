import type { HostComponent, ViewProps } from "react-native";
import type {
  ColorValue,
  WithDefault,
} from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

export interface NativeProps extends ViewProps {
  tintColor?: ColorValue;
  activeTintColor?: ColorValue;
  prioritizesVideoDevices?: WithDefault<boolean, false>;
}

export default codegenNativeComponent<NativeProps>(
  "RAAirplayButtonView",
) as HostComponent<NativeProps>;
