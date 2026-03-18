#import "RARoutePickerContext.h"
#import <AVKit/AVKit.h>

@implementation RARoutePickerContext

RCT_EXPORT_MODULE(RARoutePickerContext)

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

#pragma mark - NativeRARoutePickerContextSpec

- (void)showRoutePicker:(BOOL)prioritizesVideoDevices
                resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject {
  dispatch_async(dispatch_get_main_queue(), ^{
    AVRoutePickerView *routePickerView = [[AVRoutePickerView alloc] init];
    routePickerView.hidden = YES;

    if (@available(iOS 13.0, *)) {
      routePickerView.prioritizesVideoDevices = prioritizesVideoDevices;
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

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeRARoutePickerContextSpecJSI>(params);
}

@end
