#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE (RAAirplayConnectivityContext, RCTEventEmitter)

_RCT_EXTERN_REMAP_METHOD(fetchAvAudioSessionRoutes,
                         fetchAVAudioSessionRoutesWithResolver
                         : (RCTPromiseResolveBlock)resolve rejecter
                         : (RCTPromiseRejectBlock)reject, NO)

@end
