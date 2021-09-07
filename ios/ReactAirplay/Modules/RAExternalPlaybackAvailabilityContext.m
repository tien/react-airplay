#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE (RAExternalPlaybackAvailabilityContext,
                              RCTEventEmitter)

_RCT_EXTERN_REMAP_METHOD(fetchExternalPlaybackAvailability,
                         fetchExternalPlaybackAvailabilityWithResolver
                         : (RCTPromiseResolveBlock)resolve rejecter
                         : (RCTPromiseRejectBlock)reject, NO)

@end
