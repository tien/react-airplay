import AVKit
import React

@available(iOS 11.0, *)
@objc(RAAirplayButtonViewManager)
class RAAirplayButtonViewManager: RCTViewManager {
  override func view() -> (RAAirplayButtonView) {
    return RAAirplayButtonView()
  }

  @objc override class func requiresMainQueueSetup() -> Bool {
    return true
  }
}
