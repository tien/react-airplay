import React from 'react';
import {
  ColorValue,
  processColor,
  ProcessedColorValue,
  requireNativeComponent,
  ViewProps,
  ViewPropsIOS,
} from 'react-native';

type NativeAirplayButtonProps = ViewPropsIOS &
  ViewProps & {
    tintColor?: ProcessedColorValue | null;
    activeTintColor?: ProcessedColorValue | null;
    prioritizesVideoDevices?: boolean;
  };

export type AirplayButtonProps = Omit<
  NativeAirplayButtonProps,
  'tintColor' | 'activeTintColor'
> & {
  tintColor?: number | ColorValue;
  activeTintColor?: number | ColorValue;
};

const NativeAirplayButton = requireNativeComponent<NativeAirplayButtonProps>(
  'ReactAirplayButtonView'
);

export const AirplayButton = ({
  tintColor,
  activeTintColor,
  ...props
}: AirplayButtonProps) => (
  <NativeAirplayButton
    {...props}
    tintColor={processColor(tintColor)}
    activeTintColor={processColor(activeTintColor)}
  />
);
