require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name          = "react-airplay"
  s.version       = package["version"]
  s.summary       = package["description"]
  s.homepage      = package["homepage"]
  s.license       = package["license"]
  s.authors       = package["author"]

  s.platforms     = { :ios => '15.1' }
  s.source        = { :git => "https://github.com/tien/react-airplay.git", :tag => "#{s.version}" }

  s.source_files  = "ios/ReactAirplay/**/*.{h,mm}"
  s.frameworks    = ["AVFoundation", "AVKit"]

  install_modules_dependencies(s)
end
