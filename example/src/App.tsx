import React, {useCallback} from 'react';
import {
  AirplayButton,
  showRoutePicker,
  useAirplayConnectivity,
  useExternalPlaybackAvailability,
} from 'react-airplay';
import {Button, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

export default () => {
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability({
    useCachedValue: false,
  });
  const isAirplayConnected = useAirplayConnectivity();

  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={styles.video}
        controls={true}
      />
      <View>
        <Text>
          External playback available: {String(isExternalPlaybackAvailable)}
        </Text>
        <Text>Airplay connected: {String(isAirplayConnected)}</Text>
      </View>
      <View style={styles.box}>
        <AirplayButton
          style={styles.button}
          prioritizesVideoDevices={true}
          tintColor="yellow"
          activeTintColor="red"
        />
      </View>
      <View>
        <Button
          title="Custom Button"
          onPress={useCallback(
            () => showRoutePicker({prioritizesVideoDevices: true}),
            [],
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {flex: 1},
  box: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: '100%',
  },
});
