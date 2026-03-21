import NativeAirplay from "./specs/NativeAirplay";
export type {
  AvAudioSessionChannel,
  AvAudioSessionPortType,
  AvAudioSessionRoute,
  ShowRoutePickerOptions,
} from "./specs/NativeAirplay";

export const getExternalPlaybackAvailability =
  NativeAirplay.getExternalPlaybackAvailability.bind(NativeAirplay);

export function onExternalPlaybackAvailabilityChanged(
  ...args: Parameters<
    typeof NativeAirplay.onExternalPlaybackAvailabilityChanged
  >
) {
  const eventSubscription = NativeAirplay.onExternalPlaybackAvailabilityChanged(
    ...args,
  );
  NativeAirplay.increaseExternalPlaybackAvailabilityListeners();

  return () => {
    eventSubscription.remove();
    NativeAirplay.decreaseExternalPlaybackAvailabilityListeners();
  };
}

export const getAvAudioSessionRoutes =
  NativeAirplay.getAvAudioSessionRoutes.bind(NativeAirplay);

export function onAvAudioSessionRoutesChanged(
  ...args: Parameters<typeof NativeAirplay.onAvAudioSessionRoutesChanged>
) {
  const eventSubscription = NativeAirplay.onAvAudioSessionRoutesChanged(
    ...args,
  );
  NativeAirplay.increaseAvAudioSessionRoutesListeners();

  return () => {
    eventSubscription.remove();
    NativeAirplay.decreaseAvAudioSessionRoutesListeners();
  };
}

export const showRoutePicker =
  NativeAirplay.showRoutePicker.bind(NativeAirplay);
