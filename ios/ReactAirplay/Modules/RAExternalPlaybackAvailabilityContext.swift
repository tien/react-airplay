import AVKit

@available(iOS 11.0, *)
@objc(RAExternalPlaybackAvailabilityContext)
class RAExternalPlaybackAvailabilityContext: RAEventEmitter {
    private let avRouteDetector = AVRouteDetector()

    override func startObserving() {
        super.startObserving()
        avRouteDetector.isRouteDetectionEnabled = true

        NotificationCenter
            .default
            .addObserver(self,
                         selector: #selector(handleMultipleRoutesDetectedDidChange),
                         name: NSNotification.Name.AVRouteDetectorMultipleRoutesDetectedDidChange,
                         object: nil)
    }

    override func stopObserving() {
        super.stopObserving()
        avRouteDetector.isRouteDetectionEnabled = false
        NotificationCenter.default.removeObserver(self)
    }

    override func supportedEvents() -> [String]! {
        return [RAEvent.externalPlaybackAvailabilityChanged.rawValue]
    }

    override class func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc(fetchExternalPlaybackAvailability:withRejecter:)
    func fetchExternalPlaybackAvailability(
        _ resolve: RCTPromiseResolveBlock,
        withRejecter reject: RCTPromiseRejectBlock) {
        resolve(getExternalPlaybackAvailability())
    }

    private func getExternalPlaybackAvailability() -> Bool {
        return avRouteDetector.multipleRoutesDetected
    }

    @objc private func handleMultipleRoutesDetectedDidChange() {
        sendEvent(
            withName: RAEvent.externalPlaybackAvailabilityChanged.rawValue,
            body: avRouteDetector.multipleRoutesDetected)
    }
}
