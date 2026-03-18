#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RAExternalPlaybackAvailabilityContext, RCTEventEmitter)

_RCT_EXTERN_REMAP_METHOD(fetchExternalPlaybackAvailability,
                         fetchExternalPlaybackAvailabilityWithResolver
                         : (RCTPromiseResolveBlock)resolve rejecter
                         : (RCTPromiseRejectBlock)reject, NO)

@end

#ifdef RCT_NEW_ARCH_ENABLED

#import <ReactAirplaySpec/ReactAirplaySpec.h>

@interface RAExternalPlaybackAvailabilityContext () <NativeRAExternalPlaybackAvailabilityContextSpec>
@end

@implementation RAExternalPlaybackAvailabilityContext (TurboModule)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeRAExternalPlaybackAvailabilityContextSpecJSI>(params);
}

@end

#endif // RCT_NEW_ARCH_ENABLED
