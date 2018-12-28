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
/*! exports provided: default, updateArrows, updateLayerNames, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArrows", function() { return updateArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateLayerNames", function() { return updateLayerNames; });
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
var connections = [];
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var page = document.selectedPage;
var docData = context.document.documentData();
var connectionsDatabase = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey);
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
var selection = context.selection;
var currentGroup; // Saying that there is no line

var lineAvailable = false;
var lineObject;
var sourceObject; //firstObject

var objectsToConnect = []; //
//  Default Function
//

/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Check if we have "Arrows" group
  checkForArrowGroup();

  if (selection.count() > 1) {
    // When user selected more than one layer
    // We need to define the connections and connection position
    // defineArrowPoints()
    // if there is a line in Plugin Database, we are showing it
    // lineObject = checkConnections(firstObject,secondObject)
    if (connectionsDatabase) {
      // if we have connectionDatabase for this document
      // Need to check if we have this connection already
      for (var y = 0; y < connectionsDatabase.count(); y++) {
        if (firstObject == connectionsDatabase[y].firstObject || firstObject == connectionsDatabase[y].secondObject) {
          // if we found that we have this object in connection database already
          if (secondObject == connectionsDatabase[y].firstObject || secondObject == connectionsDatabase[y].secondObject) {
            // if we found that we have this object in connection database already
            // Here we found connection and here we need to update position
            // Do we have a line inside "Arrows" group?
            // TODO: Need to add check system if we don't have group
            for (var z = 0; z < currentGroup.layers().count(); z++) {
              if (currentGroup.layers()[z].objectID() == connectionsDatabase[y].line) {
                // we have this line
                lineAvailable = true;
                lineObject = currentGroup.layers()[z];
              }
            }
          }
        } else {// no such object
        }
      }
    } else {// Fresh Start
      }

    if (lineAvailable) {
      // if line is available we need to update it's position
      updateArrow(firstObject, secondObject, direction, line);
    } else {
      // if we don't have a line, need to create a new one
      // Middle Points
      var middlePosX = (firstLayerPosX + secondLayerPosX) / 2;
      var middlePosY = (firstLayerPosY + secondLayerPosY) / 2; // Drawing a line

      var path = NSBezierPath.bezierPath(); // Adding points

      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

      var _line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // Making middle points rounded


      var points = _line.layers().firstObject().points();

      points[1].cornerRadius = 20;
      points[2].cornerRadius = 20; // Providing Settings for the arrow

      _line.setName("Arrow"); // Styling Border Style


      var border = _line.style().addStylePartOfType(1);

      border.color = MSColor.colorWithRGBADictionary({
        r: 0.89,
        g: 0.89,
        b: 0.89,
        a: 1
      });
      border.thickness = 2;
      _line.style().endMarkerType = 2;

      if (connectionsDatabase) {
        connections = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey);
      } // Adding current connection to the all connections
      // Storage for current connection


      var _connection = {
        firstObject: firstObject,
        secondObject: secondObject,
        direction: "right",
        line: _line.objectID()
      };
      var connectionsArray = [];

      for (var i = 0; i < connections.length; i++) {
        connectionsArray.push(connections[i]);
      }

      connectionsArray.push(_connection); // Saving Connection Info to Sketch Plugin

      context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "connections", docData, pluginKey); // log(context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey))

      if (currentGroup) {
        // If we already have group
        currentGroup.addLayers([_line]);
      } else {
        // If we don't have a group
        // Creating a group
        var group = new Group({
          parent: currentParentGroup,
          name: 'Arrows',
          locked: true,
          layers: [_line]
        }); // Moving this group to the bottom of the page

        group.moveToBack();
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
  for (var y = 0; y < connectionsDatabase.count(); y++) {
    if (firstObject == connectionsDatabase[y].firstObject || firstObject == connectionsDatabase[y].secondObject) {
      // if we found that we have this object in connection database already
      if (secondObject == connectionsDatabase[y].firstObject || secondObject == connectionsDatabase[y].secondObject) {
        // if we found that we have this object in connection database already
        // Do we have a line inside "Arrows" group?
        // TODO: Need to add check system if we don't have group
        for (var z = 0; z < currentGroup.layers().count(); z++) {
          if (currentGroup.layers()[z].objectID() == connectionsDatabase[y].line) {
            // we have this line
            lineAvailable = true;
            lineObject = currentGroup.layers()[z];
          }
        }
      }
    }
  }

  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated 🚀"); // TO DO: Make a function for redrawing all the points
}
function updateLayerNames(context) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All Layers are updated 🎉");
}
function settings(context) {
  // Shop Popup for asking arrow type
  var options = ['Link Arrow', 'Back Arrow'];
  var selection = UI.getSelectionFromUser("Please choose link type", options);
  var ok = selection[2];
  var value = options[selection[1]];

  if (ok) {
    // If user specified decision
    log(value);
  }
} //
// Functions
//

function checkConnections(firstObject, secondObject) {
  // Need to check if we have this information already
  if (connectionsDatabase) {
    // if we have connectionDatabase for this document
    // Need to check if we have this connection already
    for (var y = 0; y < connectionsDatabase.count(); y++) {
      if (firstObject == connectionsDatabase[y].firstObject || firstObject == connectionsDatabase[y].secondObject) {
        // if we found that we have this object in connection database already
        if (secondObject == connectionsDatabase[y].firstObject || secondObject == connectionsDatabase[y].secondObject) {
          // if we found that we have this object in connection database already
          // Do we have a line inside "Arrows" group?
          // TODO: Need to add check system if we don't have group
          for (var z = 0; z < currentGroup.layers().count(); z++) {
            if (currentGroup.layers()[z].objectID() == connectionsDatabase[y].line) {
              // we have this line
              lineAvailable = true;
              lineObject = currentGroup.layers()[z];
            }
          }
        }
      }
    }
  }
}

function defineArrowPoints() {
  // TODO: Need to define direction
  sourceObject = {
    ID: selection[0].objectID(),
    //firstObject
    frame: selection[0].frame()
  };
  log(sourceObject);
  objectsToConnect = [];
  connection = {
    firstObject: firstObject,
    secondObject: secondObject,
    line: line.objectID() // First Layer Position Start Point Position

  };
  var firstLayerPos = selection[0].frame();
  var firstLayerPosX = firstLayerPos.maxX();
  var firstLayerPosY = firstLayerPos.midY(); // Saving object ID for not recreating new arrows
  // var firstObject = selection[0].objectID()
  // Second Layer Position End Point Position

  var secondLayerPos = selection[1].frame();
  var secondLayerPosX = secondLayerPos.minX();
  var secondLayerPosY = secondLayerPos.midY(); // Saving object ID for not recreating new arrows

  var secondObject = selection[1].objectID();
}

function checkForArrowGroup() {
  // Checking all the groups that we have
  for (var i = 0; i < currentParentGroup.layers().count(); i++) {
    if (currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i];
    }
  }
}

function updateArrow(firstObject, secondObject, direction, line) {
  // need to specify new size and location for the arrow shape
  lineObject.frame().x = firstLayerPos.maxX();
  lineObject.frame().width = secondLayerPos.minX() - firstLayerPos.maxX();
  lineObject.style().endMarkerType = 2;

  if (firstLayerPos.midY() < secondLayerPos.midY()) {
    // second object is higher
    lineObject.setIsFlippedVertical(false);
    lineObject.frame().y = firstLayerPos.midY();
    lineObject.frame().height = secondLayerPos.midY() - firstLayerPos.midY();
  } else {
    // second object is lower
    lineObject.setIsFlippedVertical(true);
    lineObject.frame().y = secondLayerPos.midY();
    lineObject.frame().height = firstLayerPos.midY() - secondLayerPos.midY();
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
that['updateLayerNames'] = __skpm_run.bind(this, 'updateLayerNames');
that['settings'] = __skpm_run.bind(this, 'settings')

//# sourceMappingURL=script.js.map