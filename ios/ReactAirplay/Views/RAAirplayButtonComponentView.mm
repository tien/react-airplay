#import "RAAirplayButtonComponentView.h"
#import <AVKit/AVKit.h>
#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/ReactAirplaySpec/ComponentDescriptors.h>
#import <react/renderer/components/ReactAirplaySpec/Props.h>

using namespace facebook::react;

@implementation RAAirplayButtonComponentView {
  AVRoutePickerView *_routePickerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<RAAirplayButtonViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RAAirplayButtonViewProps>();
    _props = defaultProps;

    _routePickerView = [[AVRoutePickerView alloc] init];
    _routePickerView.translatesAutoresizingMaskIntoConstraints = NO;

    self.contentView = _routePickerView;
  }
  return self;
}

- (void)updateProps:(const Props::Shared &)props oldProps:(const Props::Shared &)oldProps {
  const auto &oldViewProps = *std::static_pointer_cast<const RAAirplayButtonViewProps>(_props);
  const auto &newViewProps = *std::static_pointer_cast<const RAAirplayButtonViewProps>(props);

  if (oldViewProps.tintColor != newViewProps.tintColor) {
    _routePickerView.tintColor = RCTUIColorFromSharedColor(newViewProps.tintColor);
  }

  if (oldViewProps.activeTintColor != newViewProps.activeTintColor) {
    _routePickerView.activeTintColor = RCTUIColorFromSharedColor(newViewProps.activeTintColor);
  }

  if (oldViewProps.prioritizesVideoDevices != newViewProps.prioritizesVideoDevices) {
    if (@available(iOS 13.0, *)) {
      _routePickerView.prioritizesVideoDevices = newViewProps.prioritizesVideoDevices;
    }
  }

  [super updateProps:props oldProps:oldProps];
}

@end

Class<RCTComponentViewProtocol> RAAirplayButtonViewCls(void) {
  return RAAirplayButtonComponentView.class;
}
