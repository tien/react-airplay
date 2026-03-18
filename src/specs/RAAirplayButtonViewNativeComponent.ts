import type { HostComponent, ViewProps, ColorValue } from "react-native";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

export interface NativeProps extends ViewProps {
  tintColor?: ColorValue;
  activeTintColor?: ColorValue;
  prioritizesVideoDevices?: boolean;
}

export default codegenNativeComponent<NativeProps>(
  "RAAirplayButtonView",
) as HostComponent<NativeProps>;
