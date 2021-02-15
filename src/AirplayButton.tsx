import React from 'react';
import {
  processColor,
  requireNativeComponent,
  ViewProps,
  ViewPropsIOS,
} from 'react-native';

type NativeAirplayButtonProps = ViewPropsIOS &
  ViewProps & {
    tintColor?: number;
    activeTintColor?: number;
    prioritizesVideoDevices?: boolean;
  };

export type AirplayButtonProps = Omit<
  NativeAirplayButtonProps,
  'tintColor' | 'activeTintColor'
> & {
  tintColor?: string;
  activeTintColor?: string;
};

const processOptionalColor = (colorString?: string | null) =>
  colorString === undefined || colorString === null
    ? undefined
    : processColor(colorString);

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
    tintColor={processOptionalColor(tintColor)}
    activeTintColor={processOptionalColor(activeTintColor)}
  />
);
