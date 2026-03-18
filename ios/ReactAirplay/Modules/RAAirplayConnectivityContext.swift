import AVKit
import React

@objc(RAAirplayConnectivityContext)
class RAAirplayConnectivityContext: RAEventEmitter {
  override func startObserving() {
    super.startObserving()

    NotificationCenter
      .default
      .addObserver(
        self,
        selector: #selector(handleRouteChange),
        name: AVAudioSession.routeChangeNotification,
        object: nil)
  }

  override func stopObserving() {
    super.stopObserving()
    NotificationCenter.default.removeObserver(self)
  }

  override func supportedEvents() -> [String]! {
    return [RAEvent.avAudioSessionRoutesChanged.rawValue]
  }

  @objc override class func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(fetchAVAudioSessionRoutesWithResolver:rejecter:)
  func fetchAVAudioSessionRoutes(
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) {
    resolve(getAVAudioSessionRoutes())
  }

  private func getAVAudioSessionRoutes() -> [[String: Any]] {
    let session = AVAudioSession.sharedInstance()
    let routes = session.currentRoute.outputs.map { route in
      var entry: [String: Any] = [
        "portName": route.portName,
        "portType": route.portType.rawValue,
        "channels": route.channels?.map { channel in
          [
            "channelName": channel.channelName,
            "channelNumber": channel.channelNumber,
            "owningPortUID": channel.owningPortUID,
            "channelLabel": "\(channel.channelLabel)",
          ]
        } as Any,
        "uid": route.uid,
        "hasHardwareVoiceCallProcessing": route.hasHardwareVoiceCallProcessing,
        "isSpatialAudioEnabled": false,
      ]

      if #available(iOS 15.0, *) {
        entry["isSpatialAudioEnabled"] = route.isSpatialAudioEnabled
      }

      return entry
    }

    return routes
  }

  @objc private func handleRouteChange() {
    sendEvent(
      withName: RAEvent.avAudioSessionRoutesChanged.rawValue, body: getAVAudioSessionRoutes())
  }
}
