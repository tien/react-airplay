enum RAEvent: String, CaseIterable {
    case externalPlaybackAvailabilityChanged
    case airplayConnectivityChanged
}

@objc(RAEvents)
class RAEvents: NSObject, RCTBridgeModule {
    static func moduleName() -> String! {
        return "RAEvents"
    }

    func constantsToExport() -> [AnyHashable: Any]! {
        return [
            "EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED": RAEvent.externalPlaybackAvailabilityChanged.rawValue,
            "AIRPLAY_CONNECTIVITY_CHANGED": RAEvent.airplayConnectivityChanged.rawValue
        ]
    }
}
