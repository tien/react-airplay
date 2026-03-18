#import "RAExternalPlaybackAvailabilityContext.h"
#import <AVKit/AVKit.h>

@implementation RAExternalPlaybackAvailabilityContext {
  BOOL _hasListeners;
  AVRouteDetector *_avRouteDetector;
}

RCT_EXPORT_MODULE(RAExternalPlaybackAvailabilityContext)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

- (instancetype)init {
  if (self = [super init]) {
    _hasListeners = NO;
    _avRouteDetector = [[AVRouteDetector alloc] init];
  }
  return self;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"externalPlaybackAvailabilityChanged"];
}

- (void)startObserving {
  _hasListeners = YES;
  _avRouteDetector.routeDetectionEnabled = YES;
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handleMultipleRoutesDetectedDidChange:)
                                               name:AVRouteDetectorMultipleRoutesDetectedDidChangeNotification
                                             object:nil];
}

- (void)stopObserving {
  _hasListeners = NO;
  _avRouteDetector.routeDetectionEnabled = NO;
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)handleMultipleRoutesDetectedDidChange:(NSNotification *)notification {
  if (!_hasListeners) {
    return;
  }
  [self sendEventWithName:@"externalPlaybackAvailabilityChanged" body:@(_avRouteDetector.multipleRoutesDetected)];
}

#pragma mark - NativeRAExternalPlaybackAvailabilityContextSpec

- (void)fetchExternalPlaybackAvailability:(RCTPromiseResolveBlock)resolve
                                   reject:(RCTPromiseRejectBlock)reject {
  resolve(@(_avRouteDetector.multipleRoutesDetected));
}

- (void)addListener:(NSString *)eventName {
  // Required for RCTEventEmitter
}

- (void)removeListeners:(double)count {
  // Required for RCTEventEmitter
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeRAExternalPlaybackAvailabilityContextSpecJSI>(params);
}

@end
