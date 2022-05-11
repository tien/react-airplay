import React

enum RAEvent: String, CaseIterable {
  case externalPlaybackAvailabilityChanged
  case avAudioSessionRoutesChanged
}

@objc(RAEvents)
class RAEvents: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "RAEvents"
  }

  func constantsToExport() -> [AnyHashable: Any]! {
    return [
      "EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED": RAEvent.externalPlaybackAvailabilityChanged
        .rawValue,
      "AV_AUDIO_SESSION_ROUTES_CHANGED": RAEvent.avAudioSessionRoutesChanged.rawValue,
    ]
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
