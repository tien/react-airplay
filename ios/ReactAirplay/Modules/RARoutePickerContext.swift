import AVKit
import React

@objc(RARoutePickerContext)
class RARoutePickerContext: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @available(iOS 11.0, *)
  @objc(showRoutePickerWithOptions:resolver:rejecter:)
  func showRoutePicker(
    options: NSDictionary?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      let routePickerView = AVRoutePickerView()

      routePickerView.isHidden = true

      if #available(iOS 13.0, *) {
        routePickerView.prioritizesVideoDevices =
          options?["prioritizesVideoDevices"] as? Bool ?? false
      }

      if let button = routePickerView.subviews.first(where: { $0 is UIButton }) as? UIButton {
        button.sendActions(for: .touchUpInside)
        resolve(nil)
      } else {
        reject("show_route_picker_failure", "unable to send touch event", nil)
      }
    }
  }
}
