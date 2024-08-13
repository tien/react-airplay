import { useCallback } from "react";
import {
  AirplayButton,
  showRoutePicker,
  useAirplayConnectivity,
  useAvAudioSessionRoutes,
  useExternalPlaybackAvailability,
} from "react-airplay";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Video from "react-native-video";

export default () => {
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability({
    useCachedValue: false,
  });
  const isAirplayConnected = useAirplayConnectivity();
  const routes = useAvAudioSessionRoutes();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* @ts-expect-error TODO: fix this */}
      <Video
        source={{
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        style={styles.video}
        controls={true}
      />
      <View>
        <Text>
          External playback available: {String(isExternalPlaybackAvailable)}
        </Text>
        <Text>Airplay connected: {String(isAirplayConnected)}</Text>
        <Text>Routes: {JSON.stringify(routes)}</Text>
      </View>
      <View style={styles.box}>
        {Platform.OS === "ios" && (
          <AirplayButton
            style={styles.button}
            prioritizesVideoDevices={true}
            tintColor="yellow"
            activeTintColor="red"
          />
        )}
      </View>
      <View>
        <Button
          title="Custom Button"
          onPress={useCallback(
            () => showRoutePicker({ prioritizesVideoDevices: true }),
            [],
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  video: { flex: 1 },
  box: {
    flex: 1,
    marginLeft: 144,
    marginRight: 144,
  },
  button: {
    width: "100%",
    height: "100%",
  },
});
