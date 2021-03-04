import AVKit

@objc(RAAirplayConnectivityContext)
class RAAirplayConnectivityContext: RAEventEmitter {
    override func startObserving() {
        super.startObserving()
        
        NotificationCenter
            .default
            .addObserver(self,
                         selector: #selector(handleRouteChange),
                         name: AVAudioSession.routeChangeNotification,
                         object: nil)
    }
    
    override func stopObserving() {
        super.stopObserving()
        NotificationCenter.default.removeObserver(self)
    }
    
    override func supportedEvents() -> [String]! {
        return [RAEvent.airplayConnectivityChanged.rawValue]
    }
    
    override class func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc(fetchAirplayConnectivity:withRejecter:)
    func fetchAirplayConnectivity(_ resolve: RCTPromiseResolveBlock, withRejecter reject: RCTPromiseRejectBlock) {
        resolve(self.getAirplayConnectivity())
    }
    
    private func getAirplayConnectivity() -> Bool {
        let session = AVAudioSession.sharedInstance()
        let airplayConnected = session.currentRoute.outputs.contains { $0.portType == .airPlay }
        
        return airplayConnected
    }
    
    @objc private func handleRouteChange() {
        self.sendEvent(withName: RAEvent.airplayConnectivityChanged.rawValue, body: self.getAirplayConnectivity())
    }
}
