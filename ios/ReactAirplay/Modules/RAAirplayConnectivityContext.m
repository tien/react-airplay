#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE (RAAirplayConnectivityContext, RCTEventEmitter)

RCT_EXTERN_METHOD(fetchAirplayConnectivity
                  : (RCTPromiseResolveBlock)resolve withRejecter
                  : (RCTPromiseRejectBlock)reject)

@end
