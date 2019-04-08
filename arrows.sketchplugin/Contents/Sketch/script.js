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
/*! exports provided: default, createAutoArrow, createRightArrow, createDownArrow, createLeftArrow, createUpArrow, createRightArrowWithCondition, createDownArrowWithCondition, createLeftArrowWithCondition, createUpArrowWithCondition, updateSelectedArrows, updateArtboardArrows, updateAllArrows, deleteAllArrows, deleteArtboardArrows, deleteSelectedArrows, settings, onLayersMoved, panel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAutoArrow", function() { return createAutoArrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRightArrow", function() { return createRightArrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDownArrow", function() { return createDownArrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLeftArrow", function() { return createLeftArrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUpArrow", function() { return createUpArrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRightArrowWithCondition", function() { return createRightArrowWithCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDownArrowWithCondition", function() { return createDownArrowWithCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLeftArrowWithCondition", function() { return createLeftArrowWithCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUpArrowWithCondition", function() { return createUpArrowWithCondition; });
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

 // const { toArray } = require('util')
//
//  Variables
//

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui"); // var SharedStyle = require('sketch/dom').SharedStyle


var pluginKey = "flowArrows";
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData();
var pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards

var newConnectionsData = getConnectionsData(); // Settings

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings"); //
//  Create Connection Function
//


/* harmony default export */ __webpack_exports__["default"] = (function (context) {});
function createAutoArrow(context) {
  start(context, "Auto", false);
}
function createRightArrow(context) {
  start(context, "Right", false);
}
function createDownArrow(context) {
  start(context, "Down", false);
}
function createLeftArrow(context) {
  start(context, "Left", false);
}
function createUpArrow(context) {
  start(context, "Up", false);
}
function createRightArrowWithCondition(context) {
  start(context, "Right", true);
}
function createDownArrowWithCondition(context) {
  start(context, "Down", true);
}
function createLeftArrowWithCondition(context) {
  start(context, "Left", true);
}
function createUpArrowWithCondition(context) {
  start(context, "Up", true);
} //
// Plugin Commands
//

function updateSelectedArrows(context) {
  var selection = context.selection;

  if (selection.count() > 1 && selection[0].class() != "MSArtboardGroup") {
    // Need to find source object by ID first
    var currentConnectionsData = newConnectionsData; // Need to refactor

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != selection[0].objectID()) {
        // Then need to create or update connection arrow with each selection
        var connectionIndex = findConnectionData(selection[0].objectID(), selection[g].objectID(), currentConnectionsData);

        if (connectionIndex != null) {
          var str = currentConnectionsData[connectionIndex].condition;
          log(_typeof(str)); // Problem her is that we need to know is there a condition or not
          // Also, we need to check, what if user will change override of the layer
          // All the styles too

          if (currentConnectionsData[connectionIndex].condition) {
            log("hewr");
          } // let isCondition = 


          updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, currentConnectionsData[connectionIndex].style, currentConnectionsData[connectionIndex].type, currentConnectionsData[connectionIndex].direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, isCondition, connectionIndex);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Current connection is updated 🤘");
        } else {
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("There is no connection between selected layers on the plugin data");
        }
      }
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
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
            updateArrow(connections[i].firstObject, connections[i].secondObject, connections[i].style, connections[i].type, connections[i].direction, connections[i].line, connections[i].condition, i);
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
  var currentConnectionsData = newConnectionsData;

  if (currentConnectionsData.length > 0) {
    // We have connections in database
    var updateArrowsCounter = currentConnectionsData.length;

    for (var i = 0; i < updateArrowsCounter; i++) {
      // Need to go through each connection and update arrow position without artboards
      // Need to check if current object don't have the parrent
      updateArrow(currentConnectionsData[i].firstObject, currentConnectionsData[i].secondObject, currentConnectionsData[i].style, currentConnectionsData[i].type, currentConnectionsData[i].direction, currentConnectionsData[i].line, currentConnectionsData[i].condition, i);
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
  var viewHeight = 450; // Alert window settings

  alert = alertSetup(alert, viewWidth, viewHeight);
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view); // Label: Arrow Style

  var arrowStyleLabel = alertLabel("Arrow Style", true, -1, viewHeight - 40, 280, 40);
  view.addSubview(arrowStyleLabel); // Select: Arrow Style

  var arrowStylingField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 40, 300, 20));
  setActiveStyleSetting(arrowStylingField);
  view.addSubview(arrowStylingField); // Label: Arrow Style Info

  var arrowStyleInfoLabel = alertLabel("Add layer style to your document that will contain $arrow name and you will be able to specify it here ", false, -1, viewHeight - 80, 300, 40);
  view.addSubview(arrowStyleInfoLabel); // Label: Arrow Type

  var arrowTypeLabel = alertLabel("Arrow Type", true, -1, viewHeight - 130, 280, 40);
  view.addSubview(arrowTypeLabel); // Select: Arrow Type

  var arrowTypeField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 130, 300, 20));
  setActiveTypeSetting(arrowTypeField);
  view.addSubview(arrowTypeField); // Label: Arrow Type Info

  var arrowTypeInfoLabel = alertLabel("Select one of the arrow types. Angled is used by default", false, -1, viewHeight - 170, 300, 40);
  view.addSubview(arrowTypeInfoLabel); // Label: Arrow Spacing

  var arrowSpacingLabel = alertLabel("Arrow Spacing", true, -1, viewHeight - 200, 330, 20);
  view.addSubview(arrowSpacingLabel); // Label: Arrow Spacing PX

  var arrowSpacingPxLabel = alertLabel("px", true, 90, viewHeight - 220, 330, 20);
  view.addSubview(arrowSpacingPxLabel); // Input: Arrow Spacing

  var arrowSpacingField = NSTextField.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 220, 80, 20));
  var formatter = NSNumberFormatter.alloc().init().autorelease();
  arrowSpacingField.setStringValue(String(Settings.settingForKey("arrowSpacing")));
  arrowSpacingField.setFormatter(formatter);
  view.addSubview(arrowSpacingField); // Stepper: Arrow Spacing

  var arrowSpacingStepper = NSStepper.alloc().initWithFrame(NSMakeRect(70, viewHeight - 220, 20, 20));
  arrowSpacingStepper.setMaxValue(1000);
  arrowSpacingStepper.setMinValue(0);
  arrowSpacingStepper.setValueWraps(false);
  arrowSpacingStepper.setAutorepeat(true);
  arrowSpacingStepper.setCOSJSTargetFunction(function (sender) {
    var value = 0 + sender.integerValue();
    arrowSpacingField.setStringValue(String(value));
  });
  view.addSubview(arrowSpacingStepper); // view.addSubview(formatter)
  // Label: Auto Spacing Info

  var arrowSpacingInfoLabel = alertLabel("The second layer will be moved closer based on the value provided here. Keep it 0 if you don't want to have auto spacing feature ", false, -1, viewHeight - 285, 300, 60);
  view.addSubview(arrowSpacingInfoLabel); // Label: Other Settings

  var otherSettingsLabel = alertLabel("Other Settings", true, -1, viewHeight - 330, 280, 40);
  view.addSubview(otherSettingsLabel); // Checkbox: Auto-Align

  var checkbox = alertCheckbox("Second layer auto-align", false, -1, viewHeight - 340, 260, 40);
  view.addSubview(checkbox); // Label: Auto-Align Info

  var autoAlignInfoLabel = alertLabel("Align the second layer for 5px misalignment with the first one", false, -1, viewHeight - 370, 280, 40);
  view.addSubview(autoAlignInfoLabel); // Label: Plugin Info

  var pluginInfoLabel = alertLabel("Made by @faridSabitov with the support of EPAM.com ❤️", true, -1, viewHeight - 420, 280, 40);
  view.addSubview(pluginInfoLabel); // Need to check if style is still available
  // Show modal and get the results

  var modalResponse = alert.runModal();

  if (modalResponse == NSAlertFirstButtonReturn) {
    // When user clicks on "Update Settings"
    // Need to save all this results into the Plugin Settings
    context.command.setValue_forKey_onLayer_forPluginIdentifier(alert.views()[0].subviews()[1].title(), "arrowStyle", docData, pluginKey);
    Settings.setSettingForKey("arrowType", alert.views()[0].subviews()[4].title());
    Settings.setSettingForKey("arrowSpacing", alert.views()[0].subviews()[8].intValue());
    Settings.setSettingForKey("autoAlign", alert.views()[0].subviews()[12].state());
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

function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, conditionID, isCondition, connectionIndex) {
  // Refactored
  // Need to check if we have the layers with such IDs
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var conditionObject = document.getLayerWithID(conditionID); // Need to delete data first, because we will have a new line

  deleteLine(lineID);

  if (conditionObject) {
    conditionObject.remove();
  }

  newConnectionsData = deleteConnectionFromData(connectionIndex);

  if (firstObject && secondObject) {
    // If we have all the objects, we can recreate the line
    createArrow(firstObjectID, secondObjectID, style, type, direction, isCondition);
  }
}

function createArrow(firstObjectID, secondObjectID, style, type, direction, isCondition) {
  // Refactored
  var localDirection = direction == "Auto" ? getDirection(firstObjectID, secondObjectID) : direction; // Main Operations based on the settings

  updateSpacing(firstObjectID, secondObjectID, localDirection);
  autoAlignLayer(firstObjectID, secondObjectID, localDirection); // Making an Arrow 

  var arrow = drawConnection(firstObjectID, secondObjectID, style, type, localDirection, isCondition); // Storage for current connection

  var connection = {
    firstObject: firstObjectID,
    secondObject: secondObjectID,
    style: arrow.style,
    condition: arrow.conditionID,
    type: arrow.type,
    direction: localDirection,
    line: arrow.line.objectID() // Need to save this data to the global array

  };
  newConnectionsData.push(connection);
}

function checkForGroup(groupName) {
  // refactored
  var currentGroup = null; // Checking all the groups that we have

  for (var i = 0; i < currentParentGroup.layers().count(); i++) {
    if (currentParentGroup.layers()[i].name() == groupName) {
      currentGroup = currentParentGroup.layers()[i];
    }
  }

  return currentGroup;
}

function getDirection(firstObjectID, secondObjectID) {
  // Refactored
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
      direction = diffX > diffY ? "Down" : "Right";
    } else {
      // Top quarter
      direction = absDiffX > absDiffY ? "Right" : "Up";
    }
  } else {
    // Left Half
    if (secondObjectMidY > firstObjectMidY) {
      // Bottom quarter
      direction = absDiffX > absDiffY ? "Left" : "Down";
    } else {
      // Top quarter
      direction = diffX > diffY ? "Left" : "Up";
    }
  }

  return direction;
}

function drawConnection(firstObjectID, secondObjectID, style, type, localDirection, condition) {
  // Refactored
  // Process of creating new connection  
  var localType = type == null ? Settings.settingForKey("arrowType") : type;
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var connectionPos = getConnectionPos(firstObject, secondObject, localDirection);
  var connection = {
    line: [],
    conditionID: [],
    type: [],
    style: [] // Type  

  };

  if (localType == "Angled" || localType == null) {
    connection.line = drawAngledLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.middlePosX, connectionPos.middlePosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  }

  if (localType == "Straight") {
    connection.line = drawStraightLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  }

  if (localType == "Curved") {
    connection.line = drawCurvedLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  } // Condition


  connection.conditionID = condition != false ? connection.conditionID = addCondition("#con", connectionPos.middlePosX, connectionPos.middlePosY) : connection.conditionID = null; // Style

  connection.style = styleLine(connection.line, style); // Add to group

  addToArrowsGroup(connection.line);
  return connection;
}

function addToArrowsGroup(line) {
  var currentGroup = checkForGroup("Arrows");

  if (currentGroup) {
    currentGroup.addLayers([line]);
    currentGroup.fixGeometryWithOptions(1);
  } else {
    var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

    var group = new Group({
      parent: currentParentGroup,
      name: 'Arrows',
      locked: true,
      layers: [line]
    });
    group.moveToBack();
    group.adjustToFit();
  }
}

function addToConditionGroup(condition, x, y) {
  // Refactored
  var conGroup = checkForGroup("Conditions");
  var arGroup = checkForGroup("Arrows");
  var arGroupX = arGroup != null ? arGroup.frame().x() : 0;
  var arGroupY = arGroup != null ? arGroup.frame().y() : 0;

  if (conGroup) {
    condition.frame.x = x - condition.frame.width / 2 - (conGroup.frame().x() - arGroupX);
    condition.frame.y = y - condition.frame.height / 2 - (conGroup.frame().y() - arGroupY);
    condition.parent = conGroup;
    conGroup.fixGeometryWithOptions(1);
  } else {
    condition.frame.x = x - condition.frame.width / 2;
    condition.frame.y = y - condition.frame.height / 2;

    var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

    var group = new Group({
      parent: currentParentGroup,
      name: 'Conditions',
      layers: [condition]
    });
    group.moveToBack();
    group.adjustToFit();
  }
}

function getConnectionsData() {
  //Refactored
  var dataArray = [];

  if (pluginData) {
    for (var i = 0; i < pluginData.length; i++) {
      dataArray.push(pluginData[i]);
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
  var docTypeSettings = Settings.settingForKey("arrowType");

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

function deleteConnectionFromData(connectionIndex) {
  // Refactored
  var newConnections = [];

  if (pluginData) {
    // If we have database
    var connections = pluginData;

    for (var i = 0; i < connections.length; i++) {
      // Updating all connections without deleted one
      if (i != connectionIndex) {
        newConnections.push(connections[i]);
      }
    }
  }

  return newConnections;
}

function deleteLine(lineID) {
  // refactored
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

  if (Settings.settingForKey("arrowSpacing") && Settings.settingForKey("arrowSpacing") != 0) {
    var currentSpacing = Settings.settingForKey("arrowSpacing");

    if (direction == "Right") {
      childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + currentSpacing;
    }

    if (direction == "Down") {
      childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + currentSpacing;
    }

    if (direction == "Left") {
      childObject.frame.x = sourceObject.frame.x - childObject.frame.width - currentSpacing;
    }

    if (direction == "Up") {
      childObject.frame.y = sourceObject.frame.y - childObject.frame.height - currentSpacing;
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
  //Refactored
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var sourceObjectID;

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

function getSourceObjectFromSelection(selection, direction) {
  //Refactored
  var sourceObjectID = selection.firstObject().objectID();

  if (direction != "Auto") {
    for (var g = 0; g < selection.count(); g++) {
      sourceObjectID = defineSourceObject(sourceObjectID, selection[g].objectID(), direction);
    }
  }

  return sourceObjectID;
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
  // Refactored
  var allStyles = docData.allLayerStyles();
  var keyword = "$arrow";
  var styles = [];

  for (var i = 0; i < allStyles.count(); i++) {
    if (name == null) {
      if (allStyles[i].name().includes(keyword)) {
        styles.push(allStyles[i]);
      }
    } else {
      if (allStyles[i].name() == name) {
        styles.push(allStyles[i]);
      }
    }
  }

  return styles;
}

function start(context, direction, isCondition) {
  var selection = context.selection;

  if (selection.count() > 1 && selection[0].class() != "MSArtboardGroup") {
    // Need to find source object by ID first
    var sourceObjectID = getSourceObjectFromSelection(selection, direction);
    var currentConnectionsData = newConnectionsData; // Need to refactor

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != sourceObjectID) {
        // Then need to create or update connection arrow with each selection
        var connectionIndex = findConnectionData(sourceObjectID, selection[g].objectID(), currentConnectionsData);

        if (connectionIndex == null) {
          // There is no connection with this two objects in our database
          createArrow(sourceObjectID, selection[g].objectID(), null, null, direction, isCondition);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("New connection is created 🚀");
        } else {
          // Need to remake the arrow condition
          updateArrow(sourceObjectID, selection[g].objectID(), null, null, direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, isCondition, connectionIndex);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Current connection is updated 🤘");
        }
      }
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
  }
}

function addCondition(keyword, x, y) {
  // Refactored
  var libraries = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getLibraries();
  var libraryObject, symbolReferences, symbol;

  for (var g = 0; g < libraries.length; g++) {
    symbolReferences = libraries[g].getImportableSymbolReferencesForDocument(document);

    for (var i = 0; i < symbolReferences.length; i++) {
      if (symbolReferences[i].name.includes(keyword)) {
        libraryObject = symbolReferences[i];
      }
    }
  }

  if (libraryObject == null) {
    symbol = null;
    UI.alert('Condition symbol is not found', 'If you would like to add arrows with specific conditions, you need to specify them in your libraries. You can download the library that works well with the plugin by going into Plugins -> Connection Arrows -> Get Free Library. Conditions are taken from the library based on their names. Make sure to name symbol as "#condition" so it will be added here');
  } else {
    var symbolMaster = libraryObject.import();
    symbol = symbolMaster.createNewInstance();
    addToConditionGroup(symbol, x, y);
    symbol = symbol.id;
  }

  return symbol;
}

function getConnectionPos(firstObject, secondObject, direction) {
  // Refactored
  var firstObjectAbsPos = firstObject.frame.changeBasis({
    from: firstObject.parent,
    to: currentParentGroup
  });
  var secondObjectAbsPos = secondObject.frame.changeBasis({
    from: secondObject.parent,
    to: currentParentGroup
  });
  var currentGroup = checkForGroup("Arrows");
  var diffX, diffY;

  if (currentGroup) {
    diffX = currentGroup.frame().x();
    diffY = currentGroup.frame().y();
  } else {
    diffX = 0;
    diffY = 0;
  }

  var connectionPos = {
    firstLayerPosX: null,
    firstLayerPosY: null,
    secondLayerPosX: null,
    secondLayerPosY: null,
    middlePosX: null,
    middlePosY: null // Getting all the positions

  };

  if (direction == "Up") {
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x + firstObjectAbsPos.width / 2 - diffX;
    connectionPos.firstLayerPosY = firstObjectAbsPos.y - diffY; // Second Layer Position End Point Position

    connectionPos.secondLayerPosX = secondObjectAbsPos.x + secondObjectAbsPos.width / 2 - diffX;
    connectionPos.secondLayerPosY = secondObjectAbsPos.y + secondObjectAbsPos.height - diffY; // Middle Points

    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX) / 2;
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY) / 2;
  }

  if (direction == "Right") {
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x + firstObjectAbsPos.width - diffX;
    connectionPos.firstLayerPosY = firstObjectAbsPos.y + firstObjectAbsPos.height / 2 - diffY; // Second Layer Position End Point Position

    connectionPos.secondLayerPosX = secondObjectAbsPos.x - diffX;
    connectionPos.secondLayerPosY = secondObjectAbsPos.y + secondObjectAbsPos.height / 2 - diffY; // Middle Points

    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX) / 2;
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY) / 2;
  }

  if (direction == "Down") {
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x + firstObjectAbsPos.width / 2 - diffX;
    connectionPos.firstLayerPosY = firstObjectAbsPos.y + firstObjectAbsPos.height - diffY; // Second Layer Position End Point Position

    connectionPos.secondLayerPosX = secondObjectAbsPos.x + secondObjectAbsPos.width / 2 - diffX;
    connectionPos.secondLayerPosY = secondObjectAbsPos.y - diffY; // Middle Points

    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX) / 2;
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY) / 2;
  }

  if (direction == "Left") {
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x - diffX;
    connectionPos.firstLayerPosY = firstObjectAbsPos.y + firstObjectAbsPos.height / 2 - diffY; // Second Layer Position End Point Position

    connectionPos.secondLayerPosX = secondObjectAbsPos.x + secondObjectAbsPos.width - diffX;
    connectionPos.secondLayerPosY = secondObjectAbsPos.y + secondObjectAbsPos.height / 2 - diffY; // Middle Points

    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX) / 2;
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY) / 2;
  }

  return connectionPos;
}

function drawStraightLine(firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, direction) {
  // Refactored
  var path = NSBezierPath.bezierPath();

  if (direction == "Up") {
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Right") {
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Down") {
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Left") {
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  var line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
  line.setName("Straight Arrow");
  return line;
}

function drawAngledLine(firstLayerPosX, firstLayerPosY, middlePosX, middlePosY, secondLayerPosX, secondLayerPosY, direction) {
  // Refactored
  var path = NSBezierPath.bezierPath();

  if (direction == "Up") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Right") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Down") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Left") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  var line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
  var points = line.layers().firstObject().points();
  points[1].cornerRadius = 20;
  points[2].cornerRadius = 20;
  line.setName("Angled Arrow");
  return line;
}

function drawCurvedLine(firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, direction) {
  // Refactored
  var path = NSBezierPath.bezierPath();
  var line;

  if (direction == "Up") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
    var points = line.layers().firstObject().points();
    points[0].curveMode = points[1].curveMode = 4;
    points[0].hasCurveFrom = points[1].hasCurveTo = true;

    if (firstLayerPosX < secondLayerPosX) {
      points[0].curveFrom = {
        x: 0,
        y: 0.5
      };
      points[0].curveTo = {
        x: -0.5,
        y: 1
      };
      points[1].curveFrom = {
        x: 1,
        y: 1
      };
      points[1].curveTo = {
        x: 1,
        y: 0.5
      };
    } else {
      points[0].curveFrom = {
        x: 1,
        y: 0.5
      };
      points[0].curveTo = {
        x: -0.5,
        y: 1
      };
      points[1].curveFrom = {
        x: 1,
        y: 1
      };
      points[1].curveTo = {
        x: 0,
        y: 0.5
      };
    }
  }

  if (direction == "Right") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

    var _points = line.layers().firstObject().points();

    _points[0].curveMode = _points[1].curveMode = 4;
    _points[0].hasCurveFrom = _points[1].hasCurveTo = true;

    if (firstLayerPosY < secondLayerPosY) {
      _points[0].curveFrom = {
        x: 0.5,
        y: 0
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
        x: 0.5,
        y: 1
      };
    } else {
      _points[0].curveFrom = {
        x: 0.5,
        y: 1
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
        x: 0.5,
        y: 0
      };
    }
  }

  if (direction == "Down") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

    var _points2 = line.layers().firstObject().points();

    _points2[0].curveMode = _points2[1].curveMode = 4;
    _points2[0].hasCurveFrom = _points2[1].hasCurveTo = true;

    if (firstLayerPosX < secondLayerPosX) {
      _points2[0].curveFrom = {
        x: 0,
        y: 0.5
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
        x: 1,
        y: 0.5
      };
    } else {
      _points2[0].curveFrom = {
        x: 1,
        y: 0.5
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
        x: 0,
        y: 0.5
      };
    }
  }

  if (direction == "Left") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

    var _points3 = line.layers().firstObject().points();

    _points3[0].curveMode = _points3[1].curveMode = 4;
    _points3[0].hasCurveFrom = _points3[1].hasCurveTo = true;

    if (firstLayerPosY < secondLayerPosY) {
      _points3[0].curveFrom = {
        x: 0.5,
        y: 0
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
        x: 0.5,
        y: 1
      };
    } else {
      _points3[0].curveFrom = {
        x: 0.5,
        y: 1
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
        x: 0.5,
        y: 0
      };
    }
  } // Providing Settings for the arrow


  line.setName("Curved Arrow");
  return line;
}

function styleLine(line, style) {
  // Refactored
  var localStyle;

  if (style != null) {
    // For updates
    if (getLayerStyles(style) != null && style != "Default Style") {
      // If style is specified
      localStyle = style;
      var ownStyle = getLayerStyles(style);
      line.sharedStyle = ownStyle[0];
    } else {
      // if there is no specific style
      localStyle = "Default Style";
      var border = line.style().addStylePartOfType(1);
      border.color = MSColor.colorWithRGBADictionary({
        r: 0.89,
        g: 0.89,
        b: 0.89,
        a: 1
      });
      border.thickness = 2;
      line.style().endMarkerType = 2;
    }
  } else {
    // For creating new
    if (context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey) != null && context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey) != "Default Style") {
      // we have settins almost all the time and it's not default
      localStyle = getLayerStyles(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey));
      line.sharedStyle = localStyle[0];
      localStyle = localStyle[0].name();
    } else {
      localStyle = "Default Style";

      var _border = line.style().addStylePartOfType(1);

      _border.color = MSColor.colorWithRGBADictionary({
        r: 0.89,
        g: 0.89,
        b: 0.89,
        a: 1
      });
      _border.thickness = 2;
      line.style().endMarkerType = 2;
    }
  }

  return localStyle;
}

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
that['createAutoArrow'] = __skpm_run.bind(this, 'createAutoArrow');
that['onRun'] = __skpm_run.bind(this, 'default');
that['createRightArrow'] = __skpm_run.bind(this, 'createRightArrow');
that['createDownArrow'] = __skpm_run.bind(this, 'createDownArrow');
that['createLeftArrow'] = __skpm_run.bind(this, 'createLeftArrow');
that['createUpArrow'] = __skpm_run.bind(this, 'createUpArrow');
that['createRightArrowWithCondition'] = __skpm_run.bind(this, 'createRightArrowWithCondition');
that['createDownArrowWithCondition'] = __skpm_run.bind(this, 'createDownArrowWithCondition');
that['createLeftArrowWithCondition'] = __skpm_run.bind(this, 'createLeftArrowWithCondition');
that['createUpArrowWithCondition'] = __skpm_run.bind(this, 'createUpArrowWithCondition');
that['updateSelectedArrows'] = __skpm_run.bind(this, 'updateSelectedArrows');
that['updateArtboardArrows'] = __skpm_run.bind(this, 'updateArtboardArrows');
that['updateAllArrows'] = __skpm_run.bind(this, 'updateAllArrows');
that['deleteSelectedArrows'] = __skpm_run.bind(this, 'deleteSelectedArrows');
that['deleteArtboardArrows'] = __skpm_run.bind(this, 'deleteArtboardArrows');
that['deleteAllArrows'] = __skpm_run.bind(this, 'deleteAllArrows');
that['settings'] = __skpm_run.bind(this, 'settings');
that['panel'] = __skpm_run.bind(this, 'panel')

//# sourceMappingURL=script.js.map