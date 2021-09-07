#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE (RARoutePickerContext, NSObject)

_RCT_EXTERN_REMAP_METHOD(showRoutePicker, showRoutePickerWithOptions
                         : (NSDictionary *)options resolver
                         : (RCTPromiseResolveBlock)resolve rejecter
                         : (RCTPromiseRejectBlock)reject, NO)

@end
