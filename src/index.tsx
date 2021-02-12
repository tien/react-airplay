import { requireNativeComponent, ViewStyle } from 'react-native';

type ReactAirplayProps = {
  color: string;
  style: ViewStyle;
};


export const ReactAirplayViewManager = requireNativeComponent<ReactAirplayProps>(
  'ReactAirplayView'
);

export default ReactAirplayViewManager;
