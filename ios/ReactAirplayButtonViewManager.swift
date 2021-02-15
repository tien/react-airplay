import AVKit

@available(iOS 11.0, *)
@objc(ReactAirplayButtonViewManager)
class ReactAirplayButtonViewManager: RCTViewManager {
    override func view() -> (ReactAirplayButtonView) {
        return ReactAirplayButtonView()
    }
}

@available(iOS 11.0, *)
class ReactAirplayButtonView : AVRoutePickerView {
    @objc override var tintColor: UIColor! {
        get { return super.tintColor }
        set { super.tintColor = newValue }
    }
    
    @objc override var activeTintColor: UIColor! {
        get { return super.activeTintColor }
        set { super.activeTintColor = newValue }
    }
    
    @objc override var prioritizesVideoDevices: Bool {
        get {
            if #available(iOS 13.0, *) {
                return super.prioritizesVideoDevices
            }
            return false
        }
        set {
            if #available(iOS 13.0, *) {
                super.prioritizesVideoDevices = newValue
            }
        }
    }
}
