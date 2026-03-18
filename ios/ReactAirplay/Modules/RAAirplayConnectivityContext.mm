#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RAAirplayConnectivityContext, RCTEventEmitter)

_RCT_EXTERN_REMAP_METHOD(fetchAvAudioSessionRoutes,
                         fetchAVAudioSessionRoutesWithResolver
                         : (RCTPromiseResolveBlock)resolve rejecter
                         : (RCTPromiseRejectBlock)reject, NO)

@end

#ifdef RCT_NEW_ARCH_ENABLED

#import <ReactAirplaySpec/ReactAirplaySpec.h>

@interface RAAirplayConnectivityContext () <NativeRAAirplayConnectivityContextSpec>
@end

@implementation RAAirplayConnectivityContext (TurboModule)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeRAAirplayConnectivityContextSpecJSI>(params);
}

@end

#endif // RCT_NEW_ARCH_ENABLED
