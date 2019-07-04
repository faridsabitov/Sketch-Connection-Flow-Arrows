export function panel(context) {
  let ControlBar;
  ControlBar = NSPanel.alloc().init();
  ControlBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask);
  // ControlBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.99, 0.99, 0.99, 1));
  ControlBar.setTitleVisibility(NSWindowTitleHidden);
  ControlBar.setTitlebarAppearsTransparent(true);
  ControlBar.setFrame_display(NSMakeRect(0, 0, 720, 50), false);
  ControlBar.setMovableByWindowBackground(true);
  ControlBar.setHasShadow(true);
  ControlBar.setLevel(NSFloatingWindowLevel);

  // contentView.addSubview(closeButton)
  ControlBar.center();
  ControlBar.makeKeyAndOrderFront(nil);

//   getImage = function(size, name){
//     var isRetinaDisplay = (NSScreen.mainScreen().backingScaleFactor() > 1)? true: false;
//         suffix = (isRetinaDisplay)? "@2x": "",
//         imageURL = NSURL.fileURLWithPath(self.pluginResources + "/icons/" + name + suffix + ".png"),
//         image = NSImage.alloc().initWithContentsOfURL(imageURL);
//     return image
// },
// addButton = function(rect, name, callAction){
//     var button = NSButton.alloc().initWithFrame(rect),
//         image = getImage(rect.size, name);

//     button.setImage(image);
//     button.setBordered(false);
//     button.sizeToFit();
//     button.setButtonType(NSMomentaryChangeButton);
//     button.setCOSJSTargetFunction(callAction);
//     button.setAction("callAction:");
//     return button;
// },
// addImage = function(rect, name){
//     var view = NSImageView.alloc().initWithFrame(rect),
//         image = getImage(rect.size, name);
//     view.setImage(image);
//     return view;
// },

// closeButton = addButton( NSMakeRect(20, 10, 30, 30), "close-control",
//     function(sender){
//         coscript.setShouldKeepAround(false);
//         threadDictionary.removeObjectForKey(identifier);
//         ControlBar.close();
// }),



}