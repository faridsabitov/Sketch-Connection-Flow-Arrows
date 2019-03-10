var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! exports provided: default, updateSelectedArrows, updateArtboardArrows, updateAllArrows, deleteAllArrows, deleteArtboardArrows, deleteSelectedArrows, settings, onLayersMoved, panel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedArrows", function() { return updateSelectedArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArtboardArrows", function() { return updateArtboardArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAllArrows", function() { return updateAllArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAllArrows", function() { return deleteAllArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteArtboardArrows", function() { return deleteArtboardArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSelectedArrows", function() { return deleteSelectedArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onLayersMoved", function() { return onLayersMoved; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "panel", function() { return panel; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
 // const { toArray } = require('util')
//
//  Variables
//

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var SharedStyle = __webpack_require__(/*! sketch/dom */ "sketch/dom").SharedStyle;

var pluginKey = "flowArrows";
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData();
var pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey); // TODO: Need to refactor

var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards

var newConnectionsData = getConnectionsData(); // Settings

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var arrowDirectionSetting;

if (Settings.settingForKey("arrowDirection")) {
  arrowDirectionSetting = Settings.settingForKey('arrowDirection');
} else {
  arrowDirectionSetting = "Auto";
} //
//  Default Function
//


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var selection = context.selection;

  if (selection.count() > 1) {
    // Need to find source object by ID first
    var sourceObjectID = getSourceObjectFromSelection(selection);
    var currentConnectionsData = newConnectionsData;

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != sourceObjectID) {
        // Then need to create or update connection arrow with each selection
        var connectionIndex = findConnectionData(sourceObjectID, selection[g].objectID(), currentConnectionsData);

        if (connectionIndex != null) {
          // Because this is creating flow, we need to take the direction from user settings
          updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, currentConnectionsData[connectionIndex].style, currentConnectionsData[connectionIndex].type, arrowDirectionSetting, currentConnectionsData[connectionIndex].line, connectionIndex);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Current connection is updated 🚀");
        } else {
          // There is no connection with this two objects in our database
          createArrow(sourceObjectID, selection[g].objectID(), null, null, arrowDirectionSetting);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("New connection is created 🚀");
        }
      }
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers");
  }
}); //
// Plugin Commands
//

function updateSelectedArrows(context) {
  var selection = context.selection;

  if (selection.count() > 1) {
    // Need to find source object by ID first
    var sourceObjectID = getSourceObjectFromSelection(selection);
    var currentConnectionsData = newConnectionsData;

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != sourceObjectID) {
        // Then need to create or update connection arrow with each selection
        var connectionIndex = findConnectionData(sourceObjectID, selection[g].objectID(), currentConnectionsData);

        if (connectionIndex != null) {
          updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, currentConnectionsData[connectionIndex].style, currentConnectionsData[connectionIndex].type, arrowDirectionSetting, currentConnectionsData[connectionIndex].line, connectionIndex);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Current connection is updated 🚀");
        }
      }
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers");
  }
}
function updateArtboardArrows(context) {
  // TODO: Need to show amount of updated arrows and deleted ones
  var selection = context.selection;
  var connections = getConnectionsData();
  var firstObjectArtboard;
  var secondObjectArtboard;

  if (connections.length > 0) {
    // We have connections in database
    var updateArrowsCounter = connections.length;

    for (var i = 0; i < updateArrowsCounter; i++) {
      // Need to check if the element is selected globally or from the artboard
      firstObjectArtboard = document.getLayerWithID(connections[i].firstObject);
      firstObjectArtboard = firstObjectArtboard.sketchObject.parentArtboard().objectID();
      secondObjectArtboard = document.getLayerWithID(connections[i].secondObject);
      secondObjectArtboard = secondObjectArtboard.sketchObject.parentArtboard().objectID();

      if (selection.count() == 1 && selection[0].class() == "MSArtboardGroup") {
        // Need to go through each connection and update arrow position for specific artboard
        if (firstObjectArtboard == selection[0].objectID()) {
          if (secondObjectArtboard == selection[0].objectID()) {
            updateArrow(connections[i].firstObject, connections[i].secondObject, connections[i].style, connections[i].type, connections[i].direction, connections[i].line, i);
          } else {
            newConnectionsData.push(connections[i]);
          }
        } else {
          // If not just saving it
          newConnectionsData.push(connections[i]);
        }
      }
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated 🚀");
  } else {
    // We don't have any connections to update
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("There is nothing to update");
  }
}
function updateAllArrows(context) {
  // TODO
  // TODO: Need to show amount of updated arrows and deleted ones
  var selection = context.selection;
  var connections = getConnectionsData();
  var firstObjectArtboard;
  var secondObjectArtboard;

  if (connections.length > 0) {
    // We have connections in database
    var updateArrowsCounter = connections.length;

    for (var i = 0; i < updateArrowsCounter; i++) {
      // Need to go through each connection and update arrow position without artboards
      // Need to check if current object don't have the parrent
      updateArrow(connections[i].firstObject, connections[i].secondObject, connections[i].style, connections[i].type, connections[i].direction, connections[i].line, i);
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated 🚀");
  } else {
    // We don't have any connections to update
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("There is nothing to update");
  }
}
function deleteAllArrows(context) {
  if (newConnectionsData.length > 0) {
    // We have connections in database
    for (var i = 0; i < newConnectionsData.length; i++) {
      // Need to go through each connection and update arrow position
      deleteLine(newConnectionsData[i].line);
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(null, "arrowConnections", docData, pluginKey);
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are deleted");
  } else {
    // We don't have any connections to update
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("There is nothing to delete");
  }
}
function deleteArtboardArrows(context) {
  var selection = context.selection;
  var firstObject, secondObject; // Need to delete all the arrows only from selected artboard

  if (selection.count() == 1 && selection[0].class() == "MSArtboardGroup") {
    var connections = getConnectionsData();

    if (connections.length > 0) {
      // We have connections in database
      var updateArrowsCounter = connections.length;

      for (var i = 0; i < updateArrowsCounter; i++) {
        // Need to go through each connection and check if it placed on selected artboard
        firstObject = document.getLayerWithID(connections[i].firstObject);
        secondObject = document.getLayerWithID(connections[i].secondObject);

        if (firstObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()) {
          if (secondObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()) {
            deleteLine(connections[i].line);
            newConnectionsData = deleteConnectionFromData(i);
          }
        }
      }

      context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows from selected artboard are deleted");
    } else {
      // We don't have any connections to update
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("There is nothing to delete");
    }
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select one artboard");
  }
}
function deleteSelectedArrows(context) {
  var selection = context.selection;
  var firstObject, secondObject; // Need to delete all the arrows only from selected artboard

  if (selection.count() == 2) {
    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != selection[0].objectID()) {
        // It will never check 3rd connection
        var connections = getConnectionsData();
        var connectionIndex = findConnectionData(selection[0].objectID(), selection[g].objectID(), connections);

        if (connectionIndex != null) {
          // We have connections in database
          deleteLine(connections[connectionIndex].line);
          newConnectionsData = deleteConnectionFromData(connectionIndex);
          var updateArrowsCounter = connections.length;

          for (var i = 0; i < updateArrowsCounter; i++) {
            // Need to go through each connection and check if it placed on selected artboard
            firstObject = document.getLayerWithID(connections[i].firstObject);
            secondObject = document.getLayerWithID(connections[i].secondObject);

            if (firstObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()) {
              if (secondObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()) {
                deleteLine(connections[i].line);
                newConnectionsData = deleteConnectionFromData(i);
              }
            }
          }

          context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows from selected layers are deleted ✌️");
        }
      }
    }
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Select two layers, please 🧐");
  }
}
function settings(context) {
  var alert = COSAlertWindow.new();
  var viewWidth = 300;
  var viewHeight = 500; // Alert window settingsnp

  alert = alertSetup(alert, viewWidth, viewHeight);
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view); // Label: Arrow Direction

  var arrowDirectionLabel = alertLabel("Arrow Direction", true, -1, viewHeight - 17, 330, 20);
  view.addSubview(arrowDirectionLabel); // Select: Arrow Direction

  var arrowDirectionField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 40, 300, 20));
  setActiveDirectionSetting(arrowDirectionField);
  view.addSubview(arrowDirectionField); // Label: Auto Direction Info

  var arrowDirectionInfoLabel = alertLabel("Auto mode will draw arrow based on location of the second object", false, -1, viewHeight - 84, 300, 40);
  view.addSubview(arrowDirectionInfoLabel); // Label: Arrow Spacing

  var arrowSpacingLabel = alertLabel("Arrow Spacing", true, -1, viewHeight - 110, 330, 20);
  view.addSubview(arrowSpacingLabel); // Select: Arrow Spacing

  var arrowSpacingField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 133, 300, 20));
  setActiveSpacingSetting(arrowSpacingField);
  view.addSubview(arrowSpacingField); // Label: Auto Spacing Info

  var arrowSpacingInfoLabel = alertLabel("If you will select spacing, the second layer position will be moved closer", false, -1, viewHeight - 177, 300, 40);
  view.addSubview(arrowSpacingInfoLabel); // Label: Arrow Style

  var arrowStyleLabel = alertLabel("Arrow Style", true, -1, viewHeight - 225, 280, 40);
  view.addSubview(arrowStyleLabel); // Select: Arrow Style

  var arrowStylingField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 225, 300, 20));
  setActiveStyleSetting(arrowStylingField);
  view.addSubview(arrowStylingField); // Label: Arrow Style Info

  var arrowStyleInfoLabel = alertLabel("Add layer style to your document that will contain $arrow name and you will be able to specify it here ", false, -1, viewHeight - 265, 300, 40);
  view.addSubview(arrowStyleInfoLabel); // Label: Arrow Type

  var arrowTypeLabel = alertLabel("Arrow Type", true, -1, viewHeight - 310, 280, 40);
  view.addSubview(arrowTypeLabel); // Select: Arrow Type

  var arrowTypeField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 310, 300, 20));
  setActiveTypeSetting(arrowTypeField);
  view.addSubview(arrowTypeField); // Label: Arrow Type Info

  var arrowTypeInfoLabel = alertLabel("Select one of the arrow types. Angled is used by default", false, -1, viewHeight - 350, 300, 40);
  view.addSubview(arrowTypeInfoLabel); // Label: Other Settings

  var otherSettingsLabel = alertLabel("Other Settings", true, -1, viewHeight - 400, 280, 40);
  view.addSubview(otherSettingsLabel); // Checkbox: Auto-Align

  var checkbox = alertCheckbox("Second layer auto-align", false, -1, viewHeight - 410, 260, 40);
  view.addSubview(checkbox); // Label: Auto-Align Info

  var autoAlignInfoLabel = alertLabel("Align the second layer for 5px misalignment with the first one", false, -1, viewHeight - 440, 280, 40);
  view.addSubview(autoAlignInfoLabel); // Label: Plugin Info

  var pluginInfoLabel = alertLabel("Made by @faridSabitov with the support of EPAM.com ❤️", true, -1, viewHeight - 490, 280, 40);
  view.addSubview(pluginInfoLabel); // Need to check if style is still available
  // Show modal and get the results

  var modalResponse = alert.runModal();

  if (modalResponse == NSAlertFirstButtonReturn) {
    // When user clicks on "Update Settings"
    // Need to save all this results into the Plugin Settings
    Settings.setSettingForKey("arrowDirection", alert.views()[0].subviews()[1].title());
    Settings.setSettingForKey("arrowSpacing", alert.views()[0].subviews()[4].title());
    context.command.setValue_forKey_onLayer_forPluginIdentifier(alert.views()[0].subviews()[7].title(), "arrowStyle", docData, pluginKey);
    context.command.setValue_forKey_onLayer_forPluginIdentifier(alert.views()[0].subviews()[10].title(), "arrowType", docData, pluginKey);
    Settings.setSettingForKey("autoAlign", alert.views()[0].subviews()[13].state());
    UI.message("Settings are updated 🚀");
  }
}
function onLayersMoved(context) {
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers");
  var action = context.actionContext;
}
function panel(context) {
  var ControlBar;
  ControlBar = NSPanel.alloc().init();
  ControlBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask); // ControlBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.99, 0.99, 0.99, 1));

  ControlBar.setTitleVisibility(NSWindowTitleHidden);
  ControlBar.setTitlebarAppearsTransparent(true);
  ControlBar.setFrame_display(NSMakeRect(0, 0, 720, 50), false);
  ControlBar.setMovableByWindowBackground(true);
  ControlBar.setHasShadow(true);
  ControlBar.setLevel(NSFloatingWindowLevel); // contentView.addSubview(closeButton)

  ControlBar.center();
  ControlBar.makeKeyAndOrderFront(nil); //   getImage = function(size, name){
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
} //
// Functions
//

function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, connectionIndex) {
  // There might be a situation, when user deleted current group or current group stays on another artboard => In that case need to create another group
  // Need to check if we have the layers with such IDs
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID); // Need to delete data first, because we will have a new line

  deleteLine(lineID);
  newConnectionsData = deleteConnectionFromData(connectionIndex);

  if (firstObject && secondObject) {
    // If we have all the objects, we can recreate the line
    createArrow(firstObjectID, secondObjectID, style, type, direction);
  }
}

function createArrow(firstObjectID, secondObjectID, style, type, direction) {
  // Process of creating new connection  
  var localDirection, localStyle, localType;

  if (direction == "Auto") {
    // If direction is auto, we need to specify direction ourselves
    localDirection = getDirection(firstObjectID, secondObjectID);
  } else {
    localDirection = direction;
  }

  if (type == null) {
    localType = context.command.valueForKey_onLayer_forPluginIdentifier("arrowType", docData, pluginKey);
  } else {
    localType = type;
  }

  localStyle = getLayerStyles(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey));

  if (style != null) {
    // if we updating connection with previously created objects
    if (getLayerStyles(style) != null) {
      localStyle = style;
    } else {
      localStyle = "Default Style";
    }
  }

  updateSpacing(firstObjectID, secondObjectID, localDirection);
  autoAlignLayer(firstObjectID, secondObjectID, localDirection);
  var currentGroup = checkForArrowGroup();
  var line = drawLine(firstObjectID, secondObjectID, localStyle, localType, localDirection, currentGroup);
  addToArrowsGroup(line, currentGroup); // Storage for current connection

  var connection = {
    firstObject: firstObjectID,
    secondObject: secondObjectID,
    style: localStyle,
    type: localType,
    direction: localDirection,
    line: line.objectID() // Need to save this data to the global array

  };
  newConnectionsData.push(connection);
}

function checkForArrowGroup() {
  var currentGroup = null; // Checking all the groups that we have

  for (var i = 0; i < currentParentGroup.layers().count(); i++) {
    if (currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i];
      refactorLines(currentGroup);
    }
  }

  return currentGroup;
}

function getDirection(firstObjectID, secondObjectID) {
  // Get direction from the source object
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var firstObjectMidX = firstObject.frame.x + firstObject.frame.width / 2;
  var firstObjectMidY = firstObject.frame.y + firstObject.frame.height / 2;
  var secondObjectMidX = secondObject.frame.x + secondObject.frame.width / 2;
  var secondObjectMidY = secondObject.frame.y + secondObject.frame.height / 2;
  var diffX = firstObjectMidX - secondObjectMidX;
  var diffY = firstObjectMidY - secondObjectMidY;
  var absDiffX = Math.abs(diffX);
  var absDiffY = Math.abs(diffY);
  var direction;

  if (secondObjectMidX > firstObjectMidX) {
    // Right Half
    if (secondObjectMidY > firstObjectMidY) {
      // Bottom quarter
      if (diffX > diffY) {
        direction = "Down";
      } else {
        direction = "Right";
      }
    } else {
      // Top quarter
      if (absDiffX > absDiffY) {
        direction = "Right";
      } else {
        direction = "Up";
      }
    }
  } else {
    // Left Half
    if (secondObjectMidY > firstObjectMidY) {
      // Bottom quarter
      if (absDiffX > absDiffY) {
        direction = "Left";
      } else {
        direction = "Down";
      }
    } else {
      // Top quarter
      if (diffX > diffY) {
        direction = "Left";
      } else {
        direction = "Up";
      }
    }
  }

  return direction;
}

function drawLine(firstObjectID, secondObjectID, style, type, direction, currentGroup) {
  var firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, middlePosX, middlePosY, diffX, diffY, line;
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);

  if (currentGroup) {
    //if we already have a group, need to specify the difference
    diffX = currentGroup.frame().x();
    diffY = currentGroup.frame().y();
  } else {
    diffX = 0;
    diffY = 0;
  } // Drawing a line


  var path = NSBezierPath.bezierPath();

  if (type == "Angled" || type == null) {
    // Based on direction, we need to specify connection points
    if (direction == "Up") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width / 2 - diffX;
      firstLayerPosY = firstObject.frame.y - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width / 2 - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }

    if (direction == "Right") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height / 2 - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height / 2 - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }

    if (direction == "Down") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width / 2 - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width / 2 - diffX;
      secondLayerPosY = secondObject.frame.y - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }

    if (direction == "Left") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height / 2 - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height / 2 - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    } //TODO: Provide a separate file with all the stylings
    // Painting the line


    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // Making middle points rounded

    var points = line.layers().firstObject().points();
    points[1].cornerRadius = 20;
    points[2].cornerRadius = 20; // Providing Settings for the arrow

    line.setName("Arrow");
  }

  if (type == "Straight") {
    // Based on direction, we need to specify connection points
    if (direction == "Up") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width / 2 - diffX;
      firstLayerPosY = firstObject.frame.y - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width / 2 - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }

    if (direction == "Right") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height / 2 - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height / 2 - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }

    if (direction == "Down") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width / 2 - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width / 2 - diffX;
      secondLayerPosY = secondObject.frame.y - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }

    if (direction == "Left") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height / 2 - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height / 2 - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    } // Painting the line


    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // Providing Settings for the arrow

    line.setName("Arrow");
  }

  if (type == "Curved") {
    // Based on direction, we need to specify connection points
    if (direction == "Up") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width / 2 - diffX;
      firstLayerPosY = firstObject.frame.y - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width / 2 - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

      line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

      var _points = line.layers().firstObject().points();

      _points[0].curveMode = _points[1].curveMode = 4;
      _points[0].hasCurveFrom = _points[1].hasCurveTo = true;

      if (firstLayerPosX < secondLayerPosX) {
        _points[0].curveFrom = {
          x: 0,
          y: 0.5
        };
        _points[0].curveTo = {
          x: -0.5,
          y: 1
        };
        _points[1].curveFrom = {
          x: 1,
          y: 1
        };
        _points[1].curveTo = {
          x: 1,
          y: 0.5
        };
      } else {
        _points[0].curveFrom = {
          x: 1,
          y: 0.5
        };
        _points[0].curveTo = {
          x: -0.5,
          y: 1
        };
        _points[1].curveFrom = {
          x: 1,
          y: 1
        };
        _points[1].curveTo = {
          x: 0,
          y: 0.5
        };
      }
    }

    if (direction == "Right") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height / 2 - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height / 2 - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

      line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

      var _points2 = line.layers().firstObject().points();

      _points2[0].curveMode = _points2[1].curveMode = 4;
      _points2[0].hasCurveFrom = _points2[1].hasCurveTo = true;

      if (firstLayerPosY < secondLayerPosY) {
        _points2[0].curveFrom = {
          x: 0.5,
          y: 0
        };
        _points2[0].curveTo = {
          x: -0.5,
          y: 1
        };
        _points2[1].curveFrom = {
          x: 1,
          y: 1
        };
        _points2[1].curveTo = {
          x: 0.5,
          y: 1
        };
      } else {
        _points2[0].curveFrom = {
          x: 0.5,
          y: 1
        };
        _points2[0].curveTo = {
          x: -0.5,
          y: 1
        };
        _points2[1].curveFrom = {
          x: 1,
          y: 1
        };
        _points2[1].curveTo = {
          x: 0.5,
          y: 0
        };
      }
    }

    if (direction == "Down") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x + firstObject.frame.width / 2 - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width / 2 - diffX;
      secondLayerPosY = secondObject.frame.y - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

      line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

      var _points3 = line.layers().firstObject().points();

      _points3[0].curveMode = _points3[1].curveMode = 4;
      _points3[0].hasCurveFrom = _points3[1].hasCurveTo = true;

      if (firstLayerPosX < secondLayerPosX) {
        _points3[0].curveFrom = {
          x: 0,
          y: 0.5
        };
        _points3[0].curveTo = {
          x: -0.5,
          y: 1
        };
        _points3[1].curveFrom = {
          x: 1,
          y: 1
        };
        _points3[1].curveTo = {
          x: 1,
          y: 0.5
        };
      } else {
        _points3[0].curveFrom = {
          x: 1,
          y: 0.5
        };
        _points3[0].curveTo = {
          x: -0.5,
          y: 1
        };
        _points3[1].curveFrom = {
          x: 1,
          y: 1
        };
        _points3[1].curveTo = {
          x: 0,
          y: 0.5
        };
      }
    }

    if (direction == "Left") {
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame.x - diffX;
      firstLayerPosY = firstObject.frame.y + firstObject.frame.height / 2 - diffY; // Second Layer Position End Point Position

      secondLayerPosX = secondObject.frame.x + secondObject.frame.width - diffX;
      secondLayerPosY = secondObject.frame.y + secondObject.frame.height / 2 - diffY; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

      line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

      var _points4 = line.layers().firstObject().points();

      _points4[0].curveMode = _points4[1].curveMode = 4;
      _points4[0].hasCurveFrom = _points4[1].hasCurveTo = true;

      if (firstLayerPosY < secondLayerPosY) {
        _points4[0].curveFrom = {
          x: 0.5,
          y: 0
        };
        _points4[0].curveTo = {
          x: -0.5,
          y: 1
        };
        _points4[1].curveFrom = {
          x: 1,
          y: 1
        };
        _points4[1].curveTo = {
          x: 0.5,
          y: 1
        };
      } else {
        _points4[0].curveFrom = {
          x: 0.5,
          y: 1
        };
        _points4[0].curveTo = {
          x: -0.5,
          y: 1
        };
        _points4[1].curveFrom = {
          x: 1,
          y: 1
        };
        _points4[1].curveTo = {
          x: 0.5,
          y: 0
        };
      }
    } // Providing Settings for the arrow


    line.setName("Arrows");
  } // Style Start


  if (context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey)) {
    // if we have specified options
    var _style = getLayerStyles(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey));

    if (_style[0] == null) {
      // Default Arrow Style
      var border = line.style().addStylePartOfType(1);
      border.color = MSColor.colorWithRGBADictionary({
        r: 0.89,
        g: 0.89,
        b: 0.89,
        a: 1
      });
      border.thickness = 2;
      line.style().endMarkerType = 2;
    } else {
      line.sharedStyle = _style[0];
    }
  } else {
    // Default Arrow Style
    var _border = line.style().addStylePartOfType(1);

    _border.color = MSColor.colorWithRGBADictionary({
      r: 0.89,
      g: 0.89,
      b: 0.89,
      a: 1
    });
    _border.thickness = 2;
    line.style().endMarkerType = 2;
  } // Style End


  return line;
}

function addToArrowsGroup(line, currentGroup) {
  if (currentGroup) {
    currentGroup.addLayers([line]);
    currentGroup.fixGeometryWithOptions(1);
  } else {
    // If we don't have a group
    var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

    var group = new Group({
      parent: currentParentGroup,
      name: 'Arrows',
      locked: true,
      layers: [line]
    }); // Moving this group to the bottom of the page

    group.moveToBack();
    currentGroup = checkForArrowGroup();
    currentGroup.fixGeometryWithOptions(1);
  }
}

function getConnectionsData() {
  var dataArray = [];
  var pluginDataConnections = [];

  if (pluginData) {
    pluginDataConnections = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);

    for (var i = 0; i < pluginDataConnections.length; i++) {
      dataArray.push(pluginDataConnections[i]);
    }
  }

  return dataArray;
}

function findConnectionData(firstObjectID, secondObjectID, data) {
  var arrayNumber = null;
  firstObjectID = String(firstObjectID);
  secondObjectID = String(secondObjectID);

  if (pluginData) {
    // If we have database, need to check for connections
    for (var y = 0; y < data.length; y++) {
      if (firstObjectID == data[y].firstObject || firstObjectID == data[y].secondObject) {
        // if we found that we have this object in connection database already
        if (secondObjectID == data[y].firstObject || secondObjectID == data[y].secondObject) {
          // if we found that we have this object in connection database already
          arrayNumber = y;
        }
      }
    }
  }

  return arrayNumber;
}

function setActiveDirectionSetting(arrowDirectionField) {
  var currentDirection = "Auto";

  if (Settings.settingForKey("arrowDirection")) {
    // if there is data in settings
    currentDirection = Settings.settingForKey("arrowDirection");

    if (currentDirection == "Auto") {
      arrowDirectionField.addItemWithTitle("Auto");
      arrowDirectionField.lastItem().setState(1);
      arrowDirectionField.addItemWithTitle("Right");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Down");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Left");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Up");
      arrowDirectionField.lastItem().setState(0);
    }

    if (currentDirection == "Right") {
      arrowDirectionField.addItemWithTitle("Right");
      arrowDirectionField.lastItem().setState(1);
      arrowDirectionField.addItemWithTitle("Down");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Left");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Up");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Auto");
      arrowDirectionField.lastItem().setState(0);
    }

    if (currentDirection == "Down") {
      arrowDirectionField.addItemWithTitle("Down");
      arrowDirectionField.lastItem().setState(1);
      arrowDirectionField.addItemWithTitle("Left");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Up");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Auto");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Right");
      arrowDirectionField.lastItem().setState(0);
    }

    if (currentDirection == "Left") {
      arrowDirectionField.addItemWithTitle("Left");
      arrowDirectionField.lastItem().setState(1);
      arrowDirectionField.addItemWithTitle("Up");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Auto");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Right");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Down");
      arrowDirectionField.lastItem().setState(0);
    }

    if (currentDirection == "Up") {
      arrowDirectionField.addItemWithTitle("Up");
      arrowDirectionField.lastItem().setState(1);
      arrowDirectionField.addItemWithTitle("Auto");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Right");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Down");
      arrowDirectionField.lastItem().setState(0);
      arrowDirectionField.addItemWithTitle("Left");
      arrowDirectionField.lastItem().setState(0);
    }
  } else {
    // Show default
    arrowDirectionField.addItemWithTitle("Auto");
    arrowDirectionField.addItemWithTitle("Right");
    arrowDirectionField.addItemWithTitle("Down");
    arrowDirectionField.addItemWithTitle("Left");
    arrowDirectionField.addItemWithTitle("Up");
  }
}

function setActiveSpacingSetting(arrowSpacingField) {
  var currentSpacing = "Not selected";

  if (Settings.settingForKey("arrowSpacing")) {
    // if there is data in settings
    currentSpacing = Settings.settingForKey("arrowSpacing");

    if (currentSpacing == "Not selected") {
      arrowSpacingField.addItemWithTitle("Not selected");
      arrowSpacingField.lastItem().setState(1);
      arrowSpacingField.addItemWithTitle("30px");
      arrowSpacingField.lastItem().setState(0);
      arrowSpacingField.addItemWithTitle("70px");
      arrowSpacingField.lastItem().setState(0);
    }

    if (currentSpacing == "30px") {
      arrowSpacingField.addItemWithTitle("30px");
      arrowSpacingField.lastItem().setState(1);
      arrowSpacingField.addItemWithTitle("70px");
      arrowSpacingField.lastItem().setState(0);
      arrowSpacingField.addItemWithTitle("Not selected");
      arrowSpacingField.lastItem().setState(0);
    }

    if (currentSpacing == "70px") {
      arrowSpacingField.addItemWithTitle("70px");
      arrowSpacingField.lastItem().setState(1);
      arrowSpacingField.addItemWithTitle("Not selected");
      arrowSpacingField.lastItem().setState(0);
      arrowSpacingField.addItemWithTitle("30px");
      arrowSpacingField.lastItem().setState(0);
    }
  } else {
    // Show default
    arrowSpacingField.addItemWithTitle("Not Selected");
    arrowSpacingField.addItemWithTitle("30px");
    arrowSpacingField.addItemWithTitle("70px");
  }
}

function setActiveStyleSetting(arrowStylingField) {
  var docSettings = context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey);
  var styles = getLayerStyles(null);

  if (docSettings) {
    // We have info about the settings in the current document
    if (docSettings != "Default Style") {
      // if user specified own option
      arrowStylingField.addItemWithTitle(docSettings);
      arrowStylingField.addItemWithTitle("Default Style");

      for (var i = 0; i < styles.length; i++) {
        if (styles[i].name() != docSettings) {
          arrowStylingField.addItemWithTitle(styles[i].name());
        }
      }
    } else {
      // Need to show the default first
      arrowStylingField.addItemWithTitle("Default Style");

      for (var _i = 0; _i < styles.length; _i++) {
        arrowStylingField.addItemWithTitle(styles[_i].name());
      }
    }
  } else {
    arrowStylingField.addItemWithTitle("Default Style");

    for (var _i2 = 0; _i2 < styles.length; _i2++) {
      arrowStylingField.addItemWithTitle(styles[_i2].name());
    }
  }
}

function setActiveTypeSetting(arrowTypeField) {
  var docTypeSettings = context.command.valueForKey_onLayer_forPluginIdentifier("arrowType", docData, pluginKey);

  if (docTypeSettings) {
    // We have info about the settings in the current document
    if (docTypeSettings == "Angled") {
      arrowTypeField.addItemWithTitle("Angled");
      arrowTypeField.lastItem().setState(1);
      arrowTypeField.addItemWithTitle("Curved");
      arrowTypeField.lastItem().setState(0);
      arrowTypeField.addItemWithTitle("Straight");
      arrowTypeField.lastItem().setState(0);
    }

    if (docTypeSettings == "Curved") {
      arrowTypeField.addItemWithTitle("Curved");
      arrowTypeField.lastItem().setState(1);
      arrowTypeField.addItemWithTitle("Straight");
      arrowTypeField.lastItem().setState(0);
      arrowTypeField.addItemWithTitle("Angled");
      arrowTypeField.lastItem().setState(0);
    }

    if (docTypeSettings == "Straight") {
      arrowTypeField.addItemWithTitle("Straight");
      arrowTypeField.lastItem().setState(1);
      arrowTypeField.addItemWithTitle("Angled");
      arrowTypeField.lastItem().setState(0);
      arrowTypeField.addItemWithTitle("Curved");
      arrowTypeField.lastItem().setState(0);
    }
  } else {
    // Show default
    arrowTypeField.addItemWithTitle("Angled");
    arrowTypeField.addItemWithTitle("Curved");
    arrowTypeField.addItemWithTitle("Straight");
  }
}

function deleteConnectionFromData(arrayNumber) {
  var newConnections = [];

  if (pluginData) {
    // If we have database
    var connections = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);

    for (var i = 0; i < connections.length; i++) {
      // Updating all connections without deleted one
      if (i != arrayNumber) {
        newConnections.push(connections[i]);
      }
    }
  }

  return newConnections;
}

function refactorLines(group) {
  // Need to finish
  for (var i = 0; i < group.layers().length; i++) {// Here we need to go through each data in our database and delete line if there is no data
  }
}

function deleteLine(lineID) {
  var lineObject = document.getLayerWithID(lineID);
  var selectedGroup;

  if (lineObject) {
    selectedGroup = lineObject.parent;
    lineObject.remove();

    if (selectedGroup.layers.length == 0) {
      selectedGroup.remove();
    }
  }
}

function updateSpacing(sourceObjectID, childObjectID, direction) {
  var sourceObject = document.getLayerWithID(sourceObjectID);
  var childObject = document.getLayerWithID(childObjectID);

  if (Settings.settingForKey("arrowSpacing")) {
    var currentSpacing = Settings.settingForKey("arrowSpacing");

    if (direction == "Right") {
      if (currentSpacing == "30px") {
        childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + 30;
      }

      if (currentSpacing == "70px") {
        childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + 70;
      }
    }

    if (direction == "Down") {
      if (currentSpacing == "30px") {
        childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + 30;
      }

      if (currentSpacing == "70px") {
        childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + 70;
      }
    }

    if (direction == "Left") {
      if (currentSpacing == "30px") {
        childObject.frame.x = sourceObject.frame.x - childObject.frame.width - 30;
      }

      if (currentSpacing == "70px") {
        childObject.frame.x = sourceObject.frame.x - childObject.frame.width - 70;
      }
    }

    if (direction == "Up") {
      if (currentSpacing == "30px") {
        childObject.frame.y = sourceObject.frame.y - childObject.frame.height - 30;
      }

      if (currentSpacing == "70px") {
        childObject.frame.y = sourceObject.frame.y - childObject.frame.height - 70;
      }
    }
  }
}

function autoAlignLayer(sourceObjectID, childObjectID, direction) {
  var sourceObject = document.getLayerWithID(sourceObjectID);
  var childObject = document.getLayerWithID(childObjectID);
  var sourceMidY, childMidY, sourceMidX, childMidX, diff;

  if (Settings.settingForKey("autoAlign")) {
    if (Settings.settingForKey("autoAlign") == true) {
      // If user turned on Auto-Align settings
      if (direction == "Right" || direction == "Left") {
        sourceMidY = sourceObject.frame.y + sourceObject.frame.height / 2;
        childMidY = childObject.frame.y + childObject.frame.height / 2;
        diff = sourceMidY - childMidY;

        if (diff > -6 && diff < 6) {
          childObject.frame.y = childObject.frame.y + diff;
        }
      }

      if (direction == "Down" || direction == "Up") {
        sourceMidX = sourceObject.frame.x + sourceObject.frame.width / 2;
        childMidX = childObject.frame.x + childObject.frame.width / 2;
        diff = sourceMidX - childMidX;

        if (diff > -6 && diff < 6) {
          childObject.frame.x = childObject.frame.x + diff;
        }
      }
    }
  }
}

function defineSourceObject(firstObjectID, secondObjectID, direction) {
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var sourceObjectID;

  if (direction == "Auto") {
    sourceObjectID = firstObject.id;
  }

  if (direction == "Right") {
    if (firstObject.frame.x <= secondObject.frame.x) {
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if (direction == "Down") {
    if (firstObject.frame.y <= secondObject.frame.y) {
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if (direction == "Left") {
    if (firstObject.frame.x <= secondObject.frame.x) {
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  if (direction == "Up") {
    if (firstObject.frame.y <= secondObject.frame.y) {
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  return sourceObjectID;
}

function getSourceObjectFromSelection(selection) {
  var sourceObjectID = selection.firstObject().objectID();

  if (arrowDirectionSetting != "Auto") {
    for (var g = 0; g < selection.count(); g++) {
      sourceObjectID = defineSourceObject(sourceObjectID, selection[g].objectID(), arrowDirectionSetting);
    }
  } else {
    sourceObjectID = defineSourceObject(sourceObjectID, selection[0].objectID(), arrowDirectionSetting);
  }

  return sourceObjectID;
}

function confirmationAlert(alert, message) {
  // Title
  alert.setMessageText("Would you like to delete all the arrows from " + message); // Creating dialog buttons

  alert.addButtonWithTitle("Delete Arrows");
  alert.addButtonWithTitle("Cancel"); // Creating the view

  var viewWidth = 300;
  var viewHeight = 40;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view); // Label

  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 40, 330, 40));
  infoLabel.setStringValue("ℹ️ You can select layers, artboards to delete all the arrows from selected one only");
  infoLabel.setSelectable(false);
  infoLabel.setDrawsBackground(false);
  infoLabel.setBezeled(false);
  view.addSubview(infoLabel);
  return alert;
}

function alertSetup(alert, viewWidth, viewHeight) {
  // Title
  alert.setMessageText("Arrow Plugin Settings"); // Creating dialog buttons

  alert.addButtonWithTitle("Update Settings");
  alert.addButtonWithTitle("Cancel");
  return alert;
}

function alertLabel(message, state, x, y, width, height) {
  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(x, y, width, height));
  infoLabel.setStringValue(message);
  infoLabel.setSelectable(false);
  infoLabel.setDrawsBackground(false);
  infoLabel.setBezeled(false);

  if (state == false) {
    infoLabel.textColor = NSColor.disabledControlTextColor();
  }

  return infoLabel;
}

function alertCheckbox(message, state, x, y, width, height) {
  var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(x, y, width, height));
  checkbox.setButtonType(NSSwitchButton);
  checkbox.setBezelStyle(0);
  checkbox.setTitle(message);

  if (Settings.settingForKey("autoAlign")) {
    var currentState = Settings.settingForKey("autoAlign");
    checkbox.setState(currentState);
  } else {
    checkbox.setState(state);
  }

  return checkbox;
}

function getLayerStyles(name) {
  var allStyles = docData.allLayerStyles();
  var keyword = "$arrow";
  var styles = [];

  if (name == null) {
    for (var i = 0; i < allStyles.count(); i++) {
      if (allStyles[i].name().includes(keyword)) {
        styles.push(allStyles[i]);
      }
    }
  } else {
    // Searching only for name
    for (var _i3 = 0; _i3 < allStyles.count(); _i3++) {
      if (allStyles[_i3].name() == name) {
        styles.push(allStyles[_i3]);
      }
    }
  }

  return styles;
} // {
//   "script": "./script.js",
//   "name" : "onLayersMoved",
//   "handlers" : {
//     "actions": {
//       "LayersMoved.finish": "onLayersMoved"
//     }
//   },
//   "identifier" : "onLayersMoved"
// }

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default');
that['updateSelectedArrows'] = __skpm_run.bind(this, 'updateSelectedArrows');
that['updateArtboardArrows'] = __skpm_run.bind(this, 'updateArtboardArrows');
that['updateAllArrows'] = __skpm_run.bind(this, 'updateAllArrows');
that['deleteSelectedArrows'] = __skpm_run.bind(this, 'deleteSelectedArrows');
that['deleteArtboardArrows'] = __skpm_run.bind(this, 'deleteArtboardArrows');
that['deleteAllArrows'] = __skpm_run.bind(this, 'deleteAllArrows');
that['settings'] = __skpm_run.bind(this, 'settings');
that['panel'] = __skpm_run.bind(this, 'panel')

//# sourceMappingURL=script.js.map