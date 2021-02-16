#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RAExternalPlaybackAvailabilityContext, RCTEventEmitter)

RCT_EXTERN_METHOD(fetchExternalPlaybackAvailability: (RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

@end
