#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE (RAAirplayButtonViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor *)
RCT_EXPORT_VIEW_PROPERTY(activeTintColor, UIColor *)
RCT_EXPORT_VIEW_PROPERTY(prioritizesVideoDevices, BOOL)

@end
