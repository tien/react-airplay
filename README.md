# react-airplay

[![npm](https://img.shields.io/npm/v/react-airplay)](https://www.npmjs.com/package/react-airplay)

Airplay bridge for React Native.

## Installation

```sh
yarn add react-airplay
npx pod-install
```

- Extra step for creating a bridging header:

  > Only required if your project doesn't already use Swift

  Create an empty Swift file in XCode, it will then ask if you want to create a bridging header

## Usage

```tsx
import {
  AirplayButton,
  showRoutePicker,
  useAirplayConnectivity,
  useExternalPlaybackAvailability,
  useAvAudioSessionRoutes,
} from 'react-airplay';
import {Button, Text} from 'react-native'

const App = () => {
  const isAirplayConnected = useAirplayConnectivity();
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability();
  const routes = useAvAudioSessionRoutes();

  return (
    <View>
      {isExternalPlaybackAvailable && (
        <AirplayButton
          prioritizesVideoDevices={true}
          tintColor={'red'}
          activeTintColor={'blue'}
          style={{
            width: 24,
            height: 24,
          }}
        />

        <Button title="Custom Button" onPress={() => showRoutePicker({prioritizesVideoDevices: true})}/>
      )}
      {routes.length && (
        <Text>Currently playing on {routes.map((route) => route.portName).join(', ')}</Text>
      )}
    </View>
  );
};
```

### Note

Enabling route detection increase power consumption, as per [Apple documentation](https://developer.apple.com/documentation/avfoundation/avroutedetector/2915762-isroutedetectionenabled). So be sure to un-mount the component when not in use, if that's not possible (e.g. when component is part of a `react-navigation` screen) the `useCachedValue` option parameter can be used:

```typescript
import {useIsFocused} from '@react-navigation/native';
import {useExternalPlaybackAvailability} from 'react-airplay';

const isScreenFocused = useIsFocused();

const isExternalPlaybackAvailable = useExternalPlaybackAvailability({
  useCachedValue: !isScreenFocused,
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
