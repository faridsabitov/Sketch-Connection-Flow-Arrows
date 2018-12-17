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
    toArray = _require.toArray;

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

var pluginKey = "userflows"; // var connection = []

var connections = [];
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var page = document.selectedPage;
var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var docData = context.document.documentData();
var connectionsDatabase = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey);
var command = context.command;
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
var currentGroup;
var selection = context.selection;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Checking all the groups that we have
  for (var i = 0; i < currentParentGroup.layers().count(); i++) {
    if (currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i];
    }
  }

  if (selection.count() == 2) {
    // When user selected two layers
    for (var i = 0; i < selection.count(); i++) {
      // Checking through all selected layers
      if (selection[i].class() == "MSSymbolInstance" || selection[i].class() == "MSRectangleShape" || selection[i].class() == "MSLayerGroup") {
        // If it's symbol, shape or a group
        var layer = selection[i];

        if (i == 0) {
          // First Layer Position Start Point Position
          var firstLayerPos = layer.frame();
          var firstLayerPosX = firstLayerPos.maxX();
          var firstLayerPosY = firstLayerPos.midY(); // Saving object ID for not recreating new arrows

          var firstObject = layer.objectID();
        } else if (i == 1) {
          // Second Layer Position End Point Position
          var secondLayerPos = layer.frame();
          var secondLayerPosX = secondLayerPos.minX();
          var secondLayerPosY = secondLayerPos.midY(); // Saving object ID for not recreating new arrows

          var secondObject = layer.objectID();
          var lineAvailable = false;
          var lineObject;

          if (connectionsDatabase) {
            // if we have connectionDatabase for this document
            // Need to check if we have this connection already
            for (var y = 0; y < connectionsDatabase.count(); y++) {
              log("we have database");

              if (firstObject == connectionsDatabase[y].firstObject || firstObject == connectionsDatabase[y].secondObject) {
                // if we found that we have this object in connection database already
                log("we found one of the objects");

                if (secondObject == connectionsDatabase[y].firstObject || secondObject == connectionsDatabase[y].secondObject) {
                  // if we found that we have this object in connection database already
                  log("we found the second one too");

                  for (var z = 0; z < currentGroup.layers().count(); z++) {
                    if (currentGroup.layers()[z].objectID() == connectionsDatabase[y].line) {
                      // we have this line
                      log("we have this line");
                      lineAvailable = true;
                      lineObject = currentGroup.layers()[z];
                    } else {
                      // we we don't have this line
                      log("we don;t have it");
                      lineAvailable = false;
                    }
                  }
                }
              }
            }
          }

          if (lineAvailable) {
            // if line is available
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

            var line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // TODO: Need to find a way, how to make corners rounded 
            // Making middle points rounded

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

            if (connectionsDatabase) {
              connections = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey);
              log(connections);
            } // Adding current connection to the all connections
            // Storage for current connection


            var connection = {
              firstObject: firstObject,
              secondObject: secondObject,
              line: line.objectID()
            };
            connections.push(connection);
            connections.push(connection);
            connections.push(connection);
            log(connections);
            log(connection); // Saving Connection Info to Sketch Plugin

            context.command.setValue_forKey_onLayer_forPluginIdentifier(connections, "connections", docData, pluginKey); // log(context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData,'myplugin'))

            log(connections);

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
        }
      } else {
        // If it's not an appropriate layer
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Only groups, shapes and symbols are supported");
      }
    }
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select only two layers");
  }
});
function updateArrows(context) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All unlocked arrows are updated 🚀"); // TO DO: Make a function for redrawing all the points
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
} // var sharedLayerStylesForContext = function(context) {
// 	var dict = {};
// 	if(sketchVersion < sketchVersion51) return dict;
// 	var doc = context.document || context.actionContext.document,
// 		localStyles = doc.documentData().layerStyles().sharedStyles(),
// 		foreignStyles = doc.documentData().valueForKeyPath("foreignLayerStyles.@unionOfObjects.localSharedStyle"),
// 		availableStyles = localStyles.arrayByAddingObjectsFromArray(foreignStyles),
// 		predicate = NSPredicate.predicateWithFormat("style.firstEnabledFill == nil"),
// 		borderStyles = availableStyles.filteredArrayUsingPredicate(predicate),
// 		loop = borderStyles.objectEnumerator(),
// 		sharedStyle;
// 	while(sharedStyle = loop.nextObject()) {
// 		dict[sharedStyle.objectID()] = sharedStyle;
// 	}
// 	return dict;
// }

function multiplyLayerByXY(layer, xScale, yScale) {
  var scaledRect = {
    origin: {
      x: layer.rect().origin.x,
      y: layer.rect().origin.y
    },
    size: {
      width: layer.rect().size.width * xScale,
      height: layer.rect().size.height * yScale
    }
  };
  layer.rect = scaledRect;
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