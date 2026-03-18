import { type ColorValue, type ViewProps } from "react-native";

import RAAirplayButtonViewNativeComponent from "./specs/RAAirplayButtonViewNativeComponent";

export type AirplayButtonProps = ViewProps & {
  tintColor?: ColorValue;
  activeTintColor?: ColorValue;
  prioritizesVideoDevices?: boolean;
};

export const AirplayButton = ({
  tintColor,
  activeTintColor,
  prioritizesVideoDevices,
  ...props
}: AirplayButtonProps) => (
  <RAAirplayButtonViewNativeComponent
    {...props}
    tintColor={tintColor}
    activeTintColor={activeTintColor}
    prioritizesVideoDevices={prioritizesVideoDevices}
  />
);
