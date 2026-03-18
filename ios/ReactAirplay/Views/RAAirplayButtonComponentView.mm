#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTViewComponentView.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <UIKit/UIKit.h>

#import <ReactAirplaySpec/ComponentDescriptors.h>
#import <ReactAirplaySpec/EventEmitters.h>
#import <ReactAirplaySpec/Props.h>
#import <ReactAirplaySpec/RCTComponentViewHelpers.h>

#import "ReactAirplay-Swift.h"

using namespace facebook::react;

@interface RAAirplayButtonComponentView : RCTViewComponentView
@end

@implementation RAAirplayButtonComponentView {
  RAAirplayButtonView *_airplayButtonView;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RAAirplayButtonViewProps>();
    _props = defaultProps;

    _airplayButtonView = [[RAAirplayButtonView alloc] initWithFrame:frame];
    self.contentView = _airplayButtonView;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps =
      *std::static_pointer_cast<const RAAirplayButtonViewProps>(_props);
  const auto &newViewProps =
      *std::static_pointer_cast<const RAAirplayButtonViewProps>(props);

  if (oldViewProps.tintColor != newViewProps.tintColor) {
    _airplayButtonView.tintColor = RCTUIColorFromSharedColor(newViewProps.tintColor);
  }

  if (oldViewProps.activeTintColor != newViewProps.activeTintColor) {
    _airplayButtonView.activeTintColor = RCTUIColorFromSharedColor(newViewProps.activeTintColor);
  }

  if (oldViewProps.prioritizesVideoDevices != newViewProps.prioritizesVideoDevices) {
    _airplayButtonView.prioritizesVideoDevices = newViewProps.prioritizesVideoDevices;
  }

  [super updateProps:props oldProps:oldProps];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RAAirplayButtonViewComponentDescriptor>();
}

@end

Class<RCTComponentViewFactoryComponentProvider> RAAirplayButtonViewCls(void)
{
  return RAAirplayButtonComponentView.class;
}

#endif // RCT_NEW_ARCH_ENABLED
