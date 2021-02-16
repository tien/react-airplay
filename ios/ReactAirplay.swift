import AVKit

@available(iOS 11.0, *)
@objc(ReactAirplay)
class ReactAirplay: RCTEventEmitter {
    enum ReactAirplayEvent: String, CaseIterable {
        case externalPlaybackAvailabilityChanged
        case airplayConnectivityChanged
    }
    
    private var hasListeners = false
    
    private var avPlayer = AVPlayer()
    private var avRouteDetector = AVRouteDetector()
    
    override func startObserving() {
        self.hasListeners = true
        self.avRouteDetector.isRouteDetectionEnabled = true
        
        // MARK: Initial events
        
        self.checkAirplayConnectivity()
        self.checkExternalPlaybackAvailability()
        
        // MARK: Setup observers
        
        NotificationCenter
            .default
            .addObserver(self,
                         selector: #selector(checkExternalPlaybackAvailability),
                         name: NSNotification.Name.AVRouteDetectorMultipleRoutesDetectedDidChange,
                         object: nil)
        
        NotificationCenter
            .default
            .addObserver(self,
                         selector: #selector(checkAirplayConnectivity),
                         name: AVAudioSession.routeChangeNotification,
                         object: nil)
    }
    
    override func stopObserving() {
        self.hasListeners = false
        self.avRouteDetector.isRouteDetectionEnabled = false
        NotificationCenter.default.removeObserver(self)
    }
    
    override func sendEvent(withName name: String!, body: Any!) {
        guard hasListeners else { return }
        super.sendEvent(withName: name, body: body)
    }
    
    @objc private func checkAirplayConnectivity() {
        let session = AVAudioSession.sharedInstance()
        let airplayConnected = session.currentRoute.outputs.contains { $0.portType == .airPlay }
        
        self.sendEvent(withName: ReactAirplayEvent.airplayConnectivityChanged.rawValue, body: airplayConnected)
    }
    
    @objc private func checkExternalPlaybackAvailability() {
        self.sendEvent(withName: ReactAirplayEvent.externalPlaybackAvailabilityChanged.rawValue, body: self.avRouteDetector.multipleRoutesDetected)
    }
    
    override func constantsToExport() -> [AnyHashable : Any]! {
        return [
            "EXTERNAL_PLAYBACK_AVAILABILITY_CHANGED": ReactAirplayEvent.externalPlaybackAvailabilityChanged.rawValue,
            "AIRPLAY_CONNECTIVITY_CHANGED": ReactAirplayEvent.airplayConnectivityChanged.rawValue
        ]
    }
    
    override func supportedEvents() -> [String]! {
        return ReactAirplayEvent.allCases.map { $0.rawValue }
    }
    
    override class func requiresMainQueueSetup() -> Bool {
        return false
    }
}
