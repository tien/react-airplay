#import "AirplayButton.h"

#import <react/renderer/components/ReactAirplaySpec/ComponentDescriptors.h>
#import <react/renderer/components/ReactAirplaySpec/EventEmitters.h>
#import <react/renderer/components/ReactAirplaySpec/Props.h>
#import <react/renderer/components/ReactAirplaySpec/RCTComponentViewHelpers.h>

#import <AVKit/AVKit.h>
#import <React/RCTConversions.h>

using namespace facebook::react;

@interface AirplayButton () <RCTAirplayButtonViewProtocol>
@end

@implementation AirplayButton {
  AVRoutePickerView *_routePickerView;
}

- (instancetype)init {
  if (self = [super init]) {
    _routePickerView = [AVRoutePickerView new];
    [self addSubview:_routePickerView];
  }
  return self;
}

- (void)updateProps:(const Props::Shared &)props
           oldProps:(const Props::Shared &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<const AirplayButtonProps>(_props);
  const auto &newViewProps =
      *std::static_pointer_cast<const AirplayButtonProps>(props);

  if (oldViewProps.tintColor != newViewProps.tintColor) {
    _routePickerView.tintColor =
        RCTUIColorFromSharedColor(newViewProps.tintColor);
  }

  if (oldViewProps.activeTintColor != newViewProps.activeTintColor) {
    _routePickerView.activeTintColor =
        RCTUIColorFromSharedColor(newViewProps.activeTintColor);
  }

  if (oldViewProps.prioritizesVideoDevices !=
      newViewProps.prioritizesVideoDevices) {
    if (@available(iOS 13.0, *)) {
      _routePickerView.prioritizesVideoDevices =
          newViewProps.prioritizesVideoDevices;
    }
  }

  [super updateProps:props oldProps:oldProps];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  _routePickerView.frame = self.bounds;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
      AirplayButtonComponentDescriptor>();
}

@end
