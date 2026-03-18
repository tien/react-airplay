import {
  type ColorValue,
  processColor,
  type ProcessedColorValue,
  type ViewProps,
  type ViewPropsIOS,
} from "react-native";
import NativeRAAirplayButtonView from "./NativeRAAirplayButtonView";

type NativeAirplayButtonProps = ViewPropsIOS &
  ViewProps & {
    tintColor?: ProcessedColorValue | null;
    activeTintColor?: ProcessedColorValue | null;
    prioritizesVideoDevices?: boolean;
  };

export type AirplayButtonProps = Omit<
  NativeAirplayButtonProps,
  "tintColor" | "activeTintColor"
> & {
  tintColor?: number | ColorValue;
  activeTintColor?: number | ColorValue;
};

export const AirplayButton = ({
  tintColor,
  activeTintColor,
  ...props
}: AirplayButtonProps) => (
  <NativeRAAirplayButtonView
    {...props}
    tintColor={processColor(tintColor)}
    activeTintColor={processColor(activeTintColor)}
  />
);
