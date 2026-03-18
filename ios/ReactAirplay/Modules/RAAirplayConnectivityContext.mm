#import "RAAirplayConnectivityContext.h"
#import <AVFoundation/AVFoundation.h>

@implementation RAAirplayConnectivityContext {
  BOOL _hasListeners;
}

RCT_EXPORT_MODULE(RAAirplayConnectivityContext)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

- (instancetype)init {
  if (self = [super init]) {
    _hasListeners = NO;
  }
  return self;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"avAudioSessionRoutesChanged"];
}

- (void)startObserving {
  _hasListeners = YES;
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handleRouteChange:)
                                               name:AVAudioSessionRouteChangeNotification
                                             object:nil];
}

- (void)stopObserving {
  _hasListeners = NO;
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)handleRouteChange:(NSNotification *)notification {
  if (!_hasListeners) {
    return;
  }
  [self sendEventWithName:@"avAudioSessionRoutesChanged" body:[self getAVAudioSessionRoutes]];
}

- (NSArray<NSDictionary *> *)getAVAudioSessionRoutes {
  AVAudioSession *session = [AVAudioSession sharedInstance];
  NSMutableArray *routes = [NSMutableArray array];

  for (AVAudioSessionPortDescription *port in session.currentRoute.outputs) {
    NSMutableArray *channels = nil;

    if (port.channels) {
      channels = [NSMutableArray array];
      for (AVAudioSessionChannelDescription *channel in port.channels) {
        [channels addObject:@{
          @"channelName": channel.channelName,
          @"channelNumber": @(channel.channelNumber),
          @"owningPortUID": channel.owningPortUID,
          @"channelLabel": @(channel.channelLabel),
        }];
      }
    }

    [routes addObject:@{
      @"portName": port.portName,
      @"portType": port.portType,
      @"channels": channels ?: [NSNull null],
      @"uid": port.UID,
      @"hasHardwareVoiceCallProcessing": @(port.hasHardwareVoiceCallProcessing),
    }];
  }

  return routes;
}

#pragma mark - NativeRAAirplayConnectivityContextSpec

- (void)fetchAvAudioSessionRoutes:(RCTPromiseResolveBlock)resolve
                           reject:(RCTPromiseRejectBlock)reject {
  resolve([self getAVAudioSessionRoutes]);
}

- (void)addListener:(NSString *)eventName {
  // Required for RCTEventEmitter
}

- (void)removeListeners:(double)count {
  // Required for RCTEventEmitter
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeRAAirplayConnectivityContextSpecJSI>(params);
}

@end
