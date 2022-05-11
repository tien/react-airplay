#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE (RAAirplayConnectivityContext, RCTEventEmitter)

_RCT_EXTERN_REMAP_METHOD(fetchAVAudioSessionRoutes,
                         fetchAVAudioSessionRoutesWithResolver
                         : (RCTPromiseResolveBlock)resolve rejecter
                         : (RCTPromiseRejectBlock)reject, NO)

@end
