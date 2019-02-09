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
/*! exports provided: default, updateArrows, cleanArrows, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArrows", function() { return updateArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanArrows", function() { return cleanArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);


var _require = __webpack_require__(/*! util */ "util"),
    toArray = _require.toArray; //
//  Variables
//


var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

var pluginKey = "flowArrows";
var arrowConnections = [];
var connectionsArray = [];
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var page = document.selectedPage;
var docData = context.document.documentData();
var pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
var selection = context.selection;
var currentGroup;
var lineObject;
var sourceObject; // currently Sketch can't provide really firsrt selection
// Settings

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var arrowDirectionSetting = Settings.settingForKey('arrowDirection'); //
//  Default Function
//

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  // Check if we have "Arrows" group
  currentGroup = checkForArrowGroup(); //Check if we have more than one selection

  if (selection.count() > 1) {
    // When user selected more than one layer
    // Need to define source object first
    sourceObject = selection.firstObject(); // if there is a line in Plugin Database, we are showing it
    // lineObject = checkConnections(firstObject,secondObject)
    // Start

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != sourceObject.objectID()) {
        createArrow(sourceObject, selection[g]);
      }
    }
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers");
  }
}); //
// Plugin Commands
//

function updateArrows(context) {
  // TODO: Need to show amount of updated arrows and deleted ones
  // TODO: Need to make a function that will delete arrows and connection itself, if there is no object
  // TODO: Need to go through all the connections and check if we have all the object
  getConnectionsFromPluginData(); // TODO: If there is no database, we need to clean everything. Don't forget about active artboard

  log(connectionsArray);
  var updateArrowsCounter = connectionsArray.length;

  for (var i = 0; i < updateArrowsCounter; i++) {
    // Need to go through each connection and update arrow position
    updateArrow(connectionsArray[i].firstObject, connectionsArray[i].secondObject, connectionsArray[i].direction, connectionsArray[i].line);
  }

  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated 🚀");
}
function cleanArrows(context) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
  checkForArrowGroup();
  currentGroup.ungroup();
  context.command.setValue_forKey_onLayer_forPluginIdentifier(null, "arrowConnections", docData, pluginKey);
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All Connections are deleted 🎉");
}
function settings(context) {
  var alert = COSAlertWindow.new(); // TODO: Need to specify plugin icon
  // alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed("icon.png").path()))
  // Title

  alert.setMessageText("Arrow Plugin Settings"); // Creating dialog buttons

  alert.addButtonWithTitle("Update Settings");
  alert.addButtonWithTitle("Cancel"); // Creating the view

  var viewWidth = 300;
  var viewHeight = 140;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view); // Label: Arrow Direction

  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 17, 330, 20));
  infoLabel.setStringValue("Arrow Direction");
  infoLabel.setSelectable(false);
  infoLabel.setDrawsBackground(false);
  infoLabel.setBezeled(false);
  view.addSubview(infoLabel); // Select: Arrow Direction

  var arrowDirectionField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 40, 300, 20)); // Add select options and mark selected the active one

  setActiveDirectionSetting(arrowDirectionField);
  view.addSubview(arrowDirectionField); // Label: Auto Direction Desctiption

  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 84, 280, 40));
  infoLabel.setStringValue("ℹ️ Auto mode will draw arrow based on location of the second object");
  infoLabel.setSelectable(false);
  infoLabel.setDrawsBackground(false);
  infoLabel.setBezeled(false);
  view.addSubview(infoLabel); // Show modal and get the results

  var modalResponse = alert.runModal();

  if (modalResponse == NSAlertFirstButtonReturn) {
    // When user clicks on "Update Settings"
    // Need to save all this results into the Plugin Settings
    Settings.setSettingForKey("arrowDirection", alert.views()[0].subviews()[1].title());
    UI.message("Settings are updated 🚀");
  }
} //
// Functions
//

function updateArrow(firstObjectID, secondObjectID, direction, lineID) {
  currentGroup = checkForArrowGroup();

  if (currentGroup) {
    // If we have already created group before
    var firstObject = document.getLayerWithID(firstObjectID);
    var secondObject = document.getLayerWithID(secondObjectID);

    var _lineObject = document.getLayerWithID(lineID);

    if (firstObject && secondObject && _lineObject) {
      _lineObject.remove(); // TODO When we are removing the line, need to remove this info from Sketch Plugin too


      var _direction = getDirection(firstObjectID, secondObjectID);

      var line = drawLine(firstObjectID, secondObjectID, _direction);
      addToArrowsGroup(line);
      getConnectionsFromPluginData(); // Storage for current connection

      var connection = {
        firstObject: firstObjectID,
        secondObject: secondObjectID,
        direction: _direction,
        line: line.objectID()
      };
      connectionsArray.push(connection); // Saving Connection Info to Sketch Plugin

      context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "arrowConnections", docData, pluginKey);
    } else {// We don't have some of the object. Need to delete line if there is and connection from database
    }
  } else {
    log("Else"); // If we don't have "Arrows" group 
  }
}

function createArrow(firstObject, secondObject) {
  // Process of creating new connection
  var firstObjectID = firstObject.objectID();
  var secondObjectID = secondObject.objectID();
  var direction; // Need to understand the direction
  // TODO: Because Sketch is not allowing to get order of selected elements, we will select elements based on it's ID (creation order)

  if (Settings.settingForKey("arrowDirection")) {
    // if there is data in settings
    direction = Settings.settingForKey("arrowDirection");
  } else {
    direction = getDirection(firstObjectID, secondObjectID);
  }

  log(direction);
  var line = drawLine(firstObjectID, secondObjectID, direction);
  addToArrowsGroup(line);
  getConnectionsFromPluginData(); // Storage for current connection

  var connection = {
    firstObject: firstObjectID,
    secondObject: secondObjectID,
    direction: direction,
    line: line.objectID()
  };
  connectionsArray.push(connection); // Saving Connection Info to Sketch Plugin

  context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "arrowConnections", docData, pluginKey);
}

function checkForArrowGroup() {
  // Checking all the groups that we have
  for (var i = 0; i < currentParentGroup.layers().count(); i++) {
    if (currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i];
    }
  }

  return currentGroup;
}

function getDirection(firstObjectID, secondObjectID) {
  // Get direction from the source object
  var firstObjectByID = document.getLayerWithID(firstObjectID);
  var secondObjectByID = document.getLayerWithID(secondObjectID);
  var firstObjectByIDMidX = firstObjectByID.frame.x + firstObjectByID.frame.width / 2;
  var firstObjectByIDMidY = firstObjectByID.frame.y + firstObjectByID.frame.height / 2;
  var secondObjectByIDMidX = secondObjectByID.frame.x + secondObjectByID.frame.width / 2;
  var secondObjectByIDMidY = secondObjectByID.frame.y + secondObjectByID.frame.height / 2;
  var diffX = firstObjectByIDMidX - secondObjectByIDMidX;
  var diffY = firstObjectByIDMidY - secondObjectByIDMidY;
  var absDiffX = Math.abs(diffX);
  var absDiffY = Math.abs(diffY);
  var direction;

  if (secondObjectByIDMidX > firstObjectByIDMidX) {
    // Right Half
    if (secondObjectByIDMidY > firstObjectByIDMidY) {
      // Bottom quarter
      if (diffX > diffY) {
        direction = "bottom";
      } else {
        direction = "right";
      }
    } else {
      // Top quarter
      if (absDiffX > absDiffY) {
        direction = "right";
      } else {
        direction = "top";
      }
    }
  } else {
    // Left Half
    if (secondObjectByIDMidY > firstObjectByIDMidY) {
      // Bottom quarter
      if (absDiffX > absDiffY) {
        direction = "left";
      } else {
        direction = "bottom";
      }
    } else {
      // Top quarter
      if (diffX > diffY) {
        direction = "left";
      } else {
        direction = "top";
      }
    }
  }

  return direction;
}

function drawLine(firstObjectID, secondObjectID, direction) {
  var firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, middlePosX, middlePosY;
  var firstObjectByID = document.getLayerWithID(firstObjectID);
  var secondObjectByID = document.getLayerWithID(secondObjectID); // Drawing a line

  var path = NSBezierPath.bezierPath(); // Based on direction, we need to specify connection points

  switch (direction) {
    case "top":
      // First Layer Position Start Point Position
      firstLayerPosX = firstObjectByID.frame.x + firstObjectByID.frame.width / 2;
      firstLayerPosY = firstObjectByID.frame.y; // Second Layer Position End Point Position

      secondLayerPosX = secondObjectByID.frame.x + secondObjectByID.frame.width / 2;
      secondLayerPosY = secondObjectByID.frame.y + secondObjectByID.frame.height; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
      break;

    case "right":
      // First Layer Position Start Point Position
      firstLayerPosX = firstObjectByID.frame.x + firstObjectByID.frame.width;
      firstLayerPosY = firstObjectByID.frame.y + firstObjectByID.frame.height / 2; // Second Layer Position End Point Position

      secondLayerPosX = secondObjectByID.frame.x;
      secondLayerPosY = secondObjectByID.frame.y + secondObjectByID.frame.height / 2; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
      break;

    case "bottom":
      // First Layer Position Start Point Position
      firstLayerPosX = firstObjectByID.frame.x + firstObjectByID.frame.width / 2;
      firstLayerPosY = firstObjectByID.frame.y + firstObjectByID.frame.height; // Second Layer Position End Point Position

      secondLayerPosX = secondObjectByID.frame.x + secondObjectByID.frame.width / 2;
      secondLayerPosY = secondObjectByID.frame.y; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
      break;

    case "left":
      // First Layer Position Start Point Position
      firstLayerPosX = firstObjectByID.frame.x;
      firstLayerPosY = firstObjectByID.frame.y + firstObjectByID.frame.height / 2; // Second Layer Position End Point Position

      secondLayerPosX = secondObjectByID.frame.x + secondObjectByID.frame.width;
      secondLayerPosY = secondObjectByID.frame.y + secondObjectByID.frame.height / 2; // Middle Points

      middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Connecting points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
      break;
  } //TODO: Provide a separate file with all the stylings
  // Painting the line


  var line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // Making middle points rounded

  var points = line.layers().firstObject().points();
  points[1].cornerRadius = 20;
  points[2].cornerRadius = 20; // Providing Settings for the arrow

  line.setName("Arrow"); // Styling Border Style

  var border = line.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary({
    r: 0.89,
    g: 0.89,
    b: 0.89,
    a: 1
  });
  border.thickness = 2;
  line.style().endMarkerType = 2;
  return line;
}

function addToArrowsGroup(line) {
  if (currentGroup) {
    // If we already have group
    currentGroup.addLayers([line]);
  } else {
    // If we don't have a group
    // Creating a group
    var group = new Group({
      parent: currentParentGroup,
      name: 'Arrows',
      locked: true,
      layers: [line]
    }); // Moving this group to the bottom of the page

    group.moveToBack();
  }
}

function getConnectionsFromPluginData() {
  if (pluginData) {
    // If we have database, need to get all previous arrowConnections
    arrowConnections = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);

    for (var i = 0; i < arrowConnections.length; i++) {
      connectionsArray.push(arrowConnections[i]);
    }
  }
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

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default');
that['updateArrows'] = __skpm_run.bind(this, 'updateArrows');
that['cleanArrows'] = __skpm_run.bind(this, 'cleanArrows');
that['settings'] = __skpm_run.bind(this, 'settings')

//# sourceMappingURL=script.js.map