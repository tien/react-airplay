---
"react-airplay": patch
---

Linked the AVKit framework in the podspec to fix `_OBJC_CLASS_$_AVRoutePickerView` link errors in apps that don't otherwise pull in AVKit.
