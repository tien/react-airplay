import {
  type ColorValue,
  processColor,
  type ProcessedColorValue,
  requireNativeComponent,
  type ViewProps,
  type ViewPropsIOS,
} from "react-native";

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

const RAAirplayButton = requireNativeComponent<NativeAirplayButtonProps>(
  "RAAirplayButtonView",
);

export const AirplayButton = ({
  tintColor,
  activeTintColor,
  ...props
}: AirplayButtonProps) => (
  <RAAirplayButton
    {...props}
    tintColor={processColor(tintColor)}
    activeTintColor={processColor(activeTintColor)}
  />
);
