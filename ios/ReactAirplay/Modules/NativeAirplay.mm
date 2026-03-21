#import "NativeAirplay.h"
#import <AVFoundation/AVFoundation.h>
#import <AVKit/AVKit.h>

@implementation NativeAirplay {
  AVRouteDetector *_avRouteDetector;
  NSInteger _externalPlaybackListenerCount;
  NSInteger _avAudioSessionRoutesListenerCount;
}

+ (NSString *)moduleName {
  return @"NativeAirplay";
}

- (instancetype)init {
  self = [super init];
  if (self) {
    _avRouteDetector = [[AVRouteDetector alloc] init];
    _externalPlaybackListenerCount = 0;
    _avAudioSessionRoutesListenerCount = 0;
  }
  return self;
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
  _avRouteDetector.routeDetectionEnabled = NO;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeAirplaySpecJSI>(params);
}

#pragma mark - External Playback Availability

- (NSNumber *)getExternalPlaybackAvailability {
  return @(_avRouteDetector.multipleRoutesDetected);
}

- (void)increaseExternalPlaybackAvailabilityListeners {
  _externalPlaybackListenerCount++;
  if (_externalPlaybackListenerCount == 1) {
    _avRouteDetector.routeDetectionEnabled = YES;
    [[NSNotificationCenter defaultCenter]
        addObserver:self
           selector:@selector(handleMultipleRoutesDetectedDidChange:)
               name:AVRouteDetectorMultipleRoutesDetectedDidChangeNotification
             object:nil];
  }
}

- (void)decreaseExternalPlaybackAvailabilityListeners {
  _externalPlaybackListenerCount--;
  if (_externalPlaybackListenerCount <= 0) {
    _externalPlaybackListenerCount = 0;
    _avRouteDetector.routeDetectionEnabled = NO;
    [[NSNotificationCenter defaultCenter]
        removeObserver:self
                  name:
                      AVRouteDetectorMultipleRoutesDetectedDidChangeNotification
                object:nil];
  }
}

- (void)handleMultipleRoutesDetectedDidChange:(NSNotification *)notification {
  [self emitOnExternalPlaybackAvailabilityChanged:_avRouteDetector
                                                      .multipleRoutesDetected];
}

#pragma mark - AV Audio Session Routes

- (NSArray<NSDictionary *> *)getAvAudioSessionRoutes {
  AVAudioSession *session = [AVAudioSession sharedInstance];
  NSMutableArray<NSDictionary *> *routes = [NSMutableArray array];

  for (AVAudioSessionPortDescription *port in session.currentRoute.outputs) {
    NSMutableArray *channels = [NSMutableArray array];
    for (AVAudioSessionChannelDescription *channel in port.channels) {
      [channels addObject:@{
        @"channelName" : channel.channelName,
        @"channelNumber" : @(channel.channelNumber),
        @"owningPortUID" : channel.owningPortUID,
        @"channelLabel" : @(channel.channelLabel),
      }];
    }

    NSMutableDictionary *route = [@{
      @"portName" : port.portName,
      @"portType" : port.portType,
      @"channels" : channels,
      @"uid" : port.UID,
      @"hasHardwareVoiceCallProcessing" :
          @(port.hasHardwareVoiceCallProcessing),
    } mutableCopy];

    if (@available(iOS 15.0, *)) {
      route[@"isSpatialAudioEnabled"] = @(port.isSpatialAudioEnabled);
    } else {
      route[@"isSpatialAudioEnabled"] = @(NO);
    }

    [routes addObject:route];
  }

  return routes;
}

- (void)increaseAvAudioSessionRoutesListeners {
  _avAudioSessionRoutesListenerCount++;
  if (_avAudioSessionRoutesListenerCount == 1) {
    [[NSNotificationCenter defaultCenter]
        addObserver:self
           selector:@selector(handleRouteChange:)
               name:AVAudioSessionRouteChangeNotification
             object:nil];
  }
}

- (void)decreaseAvAudioSessionRoutesListeners {
  _avAudioSessionRoutesListenerCount--;
  if (_avAudioSessionRoutesListenerCount <= 0) {
    _avAudioSessionRoutesListenerCount = 0;
    [[NSNotificationCenter defaultCenter]
        removeObserver:self
                  name:AVAudioSessionRouteChangeNotification
                object:nil];
  }
}

- (void)handleRouteChange:(NSNotification *)notification {
  [self emitOnAvAudioSessionRoutesChanged:[self getAvAudioSessionRoutes]];
}

#pragma mark - Route Picker

- (void)showRoutePicker:(JS::NativeAirplay::ShowRoutePickerOptions &)options
                resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject {
  std::optional<bool> prioritizesVideoDevices =
      options.prioritizesVideoDevices();

  dispatch_async(dispatch_get_main_queue(), ^{
    AVRoutePickerView *routePickerView = [[AVRoutePickerView alloc] init];
    routePickerView.hidden = YES;

    if (@available(iOS 13.0, *)) {
      if (prioritizesVideoDevices.has_value()) {
        routePickerView.prioritizesVideoDevices =
            prioritizesVideoDevices.value();
      }
    }

    UIButton *button = nil;
    for (UIView *subview in routePickerView.subviews) {
      if ([subview isKindOfClass:[UIButton class]]) {
        button = (UIButton *)subview;
        break;
      }
    }

    if (button) {
      [button sendActionsForControlEvents:UIControlEventTouchUpInside];
      resolve(nil);
    } else {
      reject(@"show_route_picker_failure", @"unable to send touch event", nil);
    }
  });
}

@end
