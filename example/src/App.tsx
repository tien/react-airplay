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
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability();
  const isAirplayConnected = useAirplayConnectivity();
  const avAudioSessionRoutes = useAvAudioSessionRoutes();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Video
        source={{
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        style={styles.video}
        controls
      />
      <View>
        <Text>
          External playback available: {String(isExternalPlaybackAvailable)}
        </Text>
        <Text>Airplay connected: {String(isAirplayConnected)}</Text>
        <Text>Routes: {JSON.stringify(avAudioSessionRoutes)}</Text>
      </View>
      <View style={styles.box}>
        {Platform.OS === "ios" && (
          <AirplayButton
            style={styles.button}
            tintColor="yellow"
            activeTintColor="red"
            prioritizesVideoDevices
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
