#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RARoutePickerContext, NSObject)

_RCT_EXTERN_REMAP_METHOD(showRoutePicker, showRoutePickerWithOptions
                         : (NSDictionary *)options resolver
                         : (RCTPromiseResolveBlock)resolve rejecter
                         : (RCTPromiseRejectBlock)reject, NO)

@end

#ifdef RCT_NEW_ARCH_ENABLED

#import <ReactAirplaySpec/ReactAirplaySpec.h>

@interface RARoutePickerContext () <NativeRARoutePickerContextSpec>
@end

@implementation RARoutePickerContext (TurboModule)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeRARoutePickerContextSpecJSI>(params);
}

@end

#endif // RCT_NEW_ARCH_ENABLED
