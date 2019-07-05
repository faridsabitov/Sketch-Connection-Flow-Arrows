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

/***/ "./src/createArrow.js":
/*!****************************!*\
  !*** ./src/createArrow.js ***!
  \****************************/
/*! exports provided: createArrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArrow", function() { return createArrow; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _draw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw.js */ "./src/draw.js");


var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var pluginKey = "flowArrows";
var document;
var docData, pluginData, currentParentGroup, newConnectionsData;
document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
docData = context.document.documentData();
pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards

newConnectionsData = getConnectionsData();

function createArrow(firstObjectID, secondObjectID, style, type, direction, conditionID, isCondition) {
  // Refactored
  var localDirection = direction == "Auto" ? getDirection(firstObjectID, secondObjectID) : direction; // Main Operations based on the settings

  updateSpacing(firstObjectID, secondObjectID, localDirection);
  autoAlignLayer(firstObjectID, secondObjectID, localDirection); // Making an Arrow 

  var arrow = Object(_draw_js__WEBPACK_IMPORTED_MODULE_1__["drawConnection"])(firstObjectID, secondObjectID, style, type, localDirection, conditionID, isCondition); // Storage for current connection

  var connection = {
    firstObject: firstObjectID,
    secondObject: secondObjectID,
    style: arrow.style,
    condition: arrow.conditionID,
    isCondition: isCondition,
    type: arrow.type,
    direction: localDirection,
    line: arrow.line.objectID() // Need to save this data to the global array

  };
  newConnectionsData.push(connection);
  context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
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

/***/ }),

/***/ "./src/draw.js":
/*!*********************!*\
  !*** ./src/draw.js ***!
  \*********************/
/*! exports provided: drawConnection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawConnection", function() { return drawConnection; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities_styling_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/styling.js */ "./src/utilities/styling.js");



var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var pluginKey = "flowArrows";
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData(); // let pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);

var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // Main Function

function drawConnection(firstObjectID, secondObjectID, style, type, localDirection, conditionID, condition) {
  // Refactored
  // Process of creating new connection  
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var connectionPos = getConnectionPos(firstObject, secondObject, localDirection);
  var connection = {
    line: [],
    conditionID: [],
    type: [],
    style: [] // Type  

  };
  connection.type = type == null ? Settings.settingForKey("arrowType") : type;

  if (connection.type == "Angled" || connection.type == null) {
    connection.line = drawAngledLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.middlePosX, connectionPos.middlePosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  }

  if (connection.type == "Straight") {
    connection.line = drawStraightLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  }

  if (connection.type == "Curved") {
    connection.line = drawCurvedLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  } // Condition


  if (condition == true) {
    if (conditionID != null) {
      connection.conditionID = updateCondition(conditionID, connectionPos.middlePosX, connectionPos.middlePosY);
    } else {
      connection.conditionID = addCondition("#con", connectionPos.middlePosX, connectionPos.middlePosY);
    }
  } else {
    connection.conditionID = null;
  } // connection.conditionID = condition != false ? connection.conditionID = addCondition("#con", connectionPos.middlePosX, connectionPos.middlePosY) : connection.conditionID = null
  // Style


  connection.style = Object(_utilities_styling_js__WEBPACK_IMPORTED_MODULE_1__["styleLine"])(connection.line, style); // Add to group

  addToArrowsGroup(connection.line);
  return connection;
} // Positions

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
} // Drawing Types


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
    points[0].curveMode = 4;
    points[1].curveMode = 4;
    points[0].hasCurveFrom = true;
    points[1].hasCurveTo = true;

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

    _points[0].curveMode = 4;
    _points[1].curveMode = 4;
    _points[0].hasCurveFrom = true;
    _points[1].hasCurveTo = true;

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

    _points2[0].curveMode = 4;
    _points2[1].curveMode = 4;
    _points2[0].hasCurveFrom = true;
    _points2[1].hasCurveTo = true;

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

    _points3[0].curveMode = 4;
    _points3[1].curveMode = 4;
    _points3[0].hasCurveFrom = true;
    _points3[1].hasCurveTo = true;

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
} // Conditions


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
    symbol = addToConditionGroup(symbol, x, y);
  }

  return symbol;
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

  return condition.id;
}

function updateCondition(conditionID, x, y) {
  // Refactored
  var condition = document.getLayerWithID(conditionID); // log (condition)

  var conGroup = checkForGroup("Conditions");
  var arGroup = checkForGroup("Arrows");
  var arGroupX = arGroup != null ? arGroup.frame().x() : 0;
  var arGroupY = arGroup != null ? arGroup.frame().y() : 0;

  if (conGroup) {
    condition.frame.x = x - condition.frame.width / 2 - (conGroup.frame().x() - arGroupX);
    condition.frame.y = y - condition.frame.height / 2 - (conGroup.frame().y() - arGroupY);
    conGroup.fixGeometryWithOptions(1);
  } else {
    condition.frame.x = x - condition.frame.width / 2;
    condition.frame.y = y - condition.frame.height / 2;
  }

  return condition.id;
} // Groups


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

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! exports provided: createAutoArrow, createRightArrow, createDownArrow, createLeftArrow, createUpArrow, createRightArrowWithCondition, createDownArrowWithCondition, createLeftArrowWithCondition, createUpArrowWithCondition, autoUpdateSelectedArrows, updateSelectedArrows, updateArtboardArrows, updateAllArrows, deleteSelectedArrows, deleteArtboardArrows, deleteAllArrows, update */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoUpdateSelectedArrows", function() { return autoUpdateSelectedArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedArrows", function() { return updateSelectedArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArtboardArrows", function() { return updateArtboardArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAllArrows", function() { return updateAllArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSelectedArrows", function() { return deleteSelectedArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteArtboardArrows", function() { return deleteArtboardArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAllArrows", function() { return deleteAllArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createArrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createArrow.js */ "./src/createArrow.js");
/* harmony import */ var _updateArrow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateArrow.js */ "./src/updateArrow.js");
//
//  Variables
//


var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var pluginKey = "flowArrows";
var document;
var docData, pluginData, currentParentGroup, newConnectionsData;

if (context.document) {
  //cc:remember place
  document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
  docData = context.document.documentData();
  pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
  currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards

  newConnectionsData = getConnectionsData();
} else {
  document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.actionContext.document); //cc:here is bug;well, seems like a bug in logic
} //
//  Create Connection Function
//


function createAutoArrow(context) {
  create(context, "Auto", false);
}
function createRightArrow(context) {
  create(context, "Right", false);
}
function createDownArrow(context) {
  create(context, "Down", false);
}
function createLeftArrow(context) {
  create(context, "Left", false);
}
function createUpArrow(context) {
  create(context, "Up", false);
}
function createRightArrowWithCondition(context) {
  create(context, "Right", true);
}
function createDownArrowWithCondition(context) {
  create(context, "Down", true);
}
function createLeftArrowWithCondition(context) {
  create(context, "Left", true);
}
function createUpArrowWithCondition(context) {
  create(context, "Up", true);
}
function autoUpdateSelectedArrows(context) {} // const action = context.actionContext;
// docData = action.document.documentData();
// pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
// currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards
// newConnectionsData = getConnectionsData();
// const movedLayers = Array.from(context.actionContext.layers).map(layer => sketch.fromNative(layer));
// log(movedLayers[0].id);
// log(movedLayers.length);
// // if (movedLayers.filter(layer => (layer.type == 'Artboard' || (layer.type == 'SymbolMaster' && config.arrangeSymbols))).length > 0) {
// //   ArrangeArtboards(context)
// // }
// let currentConnectionsData = newConnectionsData; // Need to refactor
// for(let g = 0; g < movedLayers.length; g++) {
//   let connectionIndex = findConnectionIndex(movedLayers[0].id, null, currentConnectionsData);
//   log("yes "+connectionIndex);
//   if(connectionIndex.length == 0){
//     updateArrow(currentConnectionsData[connectionIndex[0]].firstObject, currentConnectionsData[connectionIndex[0]].secondObject, currentConnectionsData[connectionIndex[0]].style, currentConnectionsData[connectionIndex[0]].type, currentConnectionsData[connectionIndex[0]].direction, currentConnectionsData[connectionIndex[0]].line, currentConnectionsData[connectionIndex[0]].condition, currentConnectionsData[connectionIndex[0]].isCondition, connectionIndex[0]);
//     sketch.UI.message("Current connection is updated 🤘");
//   } else {
//     sketch.UI.message("There is no connection between selected layers on the plugin data");
//   }
// }
// context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
//
//  Update Connection Function
//

function updateSelectedArrows(context) {
  var selection = context.selection;

  if (selection.count() > 1 && selection[0].class() != "MSArtboardGroup") {
    // Need to find source object by ID first
    var currentConnectionsData = newConnectionsData; // Need to refactor

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != selection[0].objectID()) {
        // Then need to create or update connection arrow with each selection
        var connectionIndex = findConnectionIndex(selection[0].objectID(), selection[g].objectID(), currentConnectionsData);

        if (connectionIndex.length == 0) {
          Object(_updateArrow_js__WEBPACK_IMPORTED_MODULE_2__["updateArrow"])(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, currentConnectionsData[connectionIndex].style, currentConnectionsData[connectionIndex].type, currentConnectionsData[connectionIndex].direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, currentConnectionsData[connectionIndex].isCondition, connectionIndex);
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
  update(context, 2, false);
}
function updateAllArrows(context) {
  update(context, 3, true);
}
function deleteSelectedArrows(context) {
  var selection = context.selection;
  var firstObject, secondObject;

  if (selection.count() == 2) {
    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != selection[0].objectID()) {
        // It will never check 3rd connection
        var connections = getConnectionsData();
        var connectionIndex = findConnectionIndex(selection[0].objectID(), selection[g].objectID(), connections);

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
function deleteAllArrows(context) {
  update(context, 3, false);
} // let selection = context.selection;
// if(selection.count() > 1 && selection[0].class() != "MSArtboardGroup"){
//   // Need to find source object by ID first
//   let currentConnectionsData = newConnectionsData; // Need to refactor
//   for(let g = 0; g < selection.count(); g++) {
//     if(selection[g].objectID() != selection[0].objectID()){
//       // Then need to create or update connection arrow with each selection
//       let connectionIndex = findConnectionIndex(selection[0].objectID(), selection[g].objectID(), currentConnectionsData);
//       if(connectionIndex.length == 0){
//         updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, currentConnectionsData[connectionIndex].style, currentConnectionsData[connectionIndex].type, currentConnectionsData[connectionIndex].direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, currentConnectionsData[connectionIndex].isCondition, connectionIndex);
//         sketch.UI.message("Current connection is updated 🤘");
//       } else {
//         sketch.UI.message("There is no connection between selected layers on the plugin data");
//       }
//     }
//   }
//   context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
// } else {
//   // When user didn't select anything
//   sketch.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
// }
//
//  Data
//

function getConnectionsData() {
  //Refactored
  var dataArray = [];

  if (pluginData) {
    for (var i = 0; i < pluginData.length; i++) {
      dataArray.push(pluginData[i]);
    }
  }

  return dataArray;
} //
// Functions
//





function create(context, direction, isCondition) {
  //cc:create#1;Passing all the data
  var selection = context.selection;

  if (selection.count() > 1 && selection[0].class() != "MSArtboardGroup") {
    // Need to find source object by ID first
    var sourceObjectID = getSourceObjectFromSelection(selection, direction);
    var currentConnectionsData = newConnectionsData; // Need to refactor

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != sourceObjectID) {
        // Then need to create or update connection arrow with each selection
        var connectionIndex = findConnectionIndex(sourceObjectID, selection[g].objectID(), currentConnectionsData);

        if (connectionIndex.length == 0) {
          // There is no connection with this two objects in our database
          Object(_createArrow_js__WEBPACK_IMPORTED_MODULE_1__["createArrow"])(sourceObjectID, selection[g].objectID(), null, null, direction, null, isCondition);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("New connection is created 🚀");
        } else {
          // Need to remake the arrow condition
          if (Object(_updateArrow_js__WEBPACK_IMPORTED_MODULE_2__["updateArrow"])(sourceObjectID, selection[g].objectID(), null, null, direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, isCondition, connectionIndex)) {
            Object(_createArrow_js__WEBPACK_IMPORTED_MODULE_1__["createArrow"])(sourceObjectID, selection[g].objectID(), null, null, direction, currentConnectionsData[connectionIndex].condition, isCondition);
          }

          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Current connection is updated 🤘");
        }
      }
    }
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
  }
}

function update(context, level, isUpdate) {
  // 1 - selection level
  // 2 - artboard level
  // 3 - document level
  var newConnectionsData = [];
  var selection = context.selection;
  var firstObjectArtboard;
  var secondObjectArtboard;

  if (connectionsData.length > 0) {
    for (var i = 0; i < connectionsData.length; i++) {
      deleteLine(connectionsData[i].line);

      if (level == 3) {
        if (isUpdate) {
          Object(_updateArrow_js__WEBPACK_IMPORTED_MODULE_2__["updateArrow"])(connectionsData[i].firstObject, connectionsData[i].secondObject, connectionsData[i].style, connectionsData[i].type, connectionsData[i].direction, connectionsData[i].line, connectionsData[i].condition, i);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated");
        } else {
          newConnectionsData = null;
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are deleted");
        }
      }

      if (level == 2) {
        firstObjectArtboard = document.getLayerWithID(connectionsData[i].firstObject);
        firstObjectArtboard = firstObjectArtboard.sketchObject.parentArtboard().objectID();
        secondObjectArtboard = document.getLayerWithID(connectionsData[i].secondObject);
        secondObjectArtboard = secondObjectArtboard.sketchObject.parentArtboard().objectID();

        if (selection.count() == 1 && selection[0].class() == "MSArtboardGroup") {
          if (firstObjectArtboard == selection[0].objectID()) {
            if (secondObjectArtboard == selection[0].objectID()) {
              Object(_updateArrow_js__WEBPACK_IMPORTED_MODULE_2__["updateArrow"])(connectionsData[i].firstObject, connectionsData[i].secondObject, connectionsData[i].style, connectionsData[i].type, connectionsData[i].direction, connectionsData[i].line, connectionsData[i].condition, i);
            } else {
              newConnectionsData.push(connectionsData[i]);
            }
          } else {
            newConnectionsData.push(connectionsData[i]);
          }
        }
      }

      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated 🚀");
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("There is no arrows");
  }
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

function findConnectionIndex(firstObjectID, secondObjectID, data) {
  var indexArray = [];
  firstObjectID = String(firstObjectID);
  secondObjectID = String(secondObjectID);

  if (pluginData) {
    // If we have database, need to check for connections
    for (var y = 0; y < data.length; y++) {
      if (firstObjectID == data[y].firstObject || firstObjectID == data[y].secondObject) {
        if (secondObjectID == null) {
          // When we need to find connection between two objects
          if (secondObjectID == data[y].firstObject || secondObjectID == data[y].secondObject) {
            indexArray[0] = y;
          }
        } else {
          // When we need to find a connection for one object only
          indexArray.push(y);
        }
      }
    }
  }

  return indexArray;
} // const track = require("sketch-module-google-analytics")
// track("UA-138226597-1", "event", {
//   ec: "command", 
//   ea: "create", 
//   ev: "my-command"
// });

/***/ }),

/***/ "./src/updateArrow.js":
/*!****************************!*\
  !*** ./src/updateArrow.js ***!
  \****************************/
/*! exports provided: updateArrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArrow", function() { return updateArrow; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);


var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var pluginKey = "flowArrows";
var document;
var docData, pluginData, currentParentGroup, connectionsData;
document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
docData = context.document.documentData();
pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards

connectionsData = getConnectionsData();
function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, conditionID, isCondition, connectionIndex) {
  // Refactored
  // Need to check if we have the layers with such IDs
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var conditionObject = document.getLayerWithID(conditionID);
  var result = false; // Need to delete data first, because we will have a new line

  deleteLine(lineID);

  if (conditionID && !isCondition) {
    if (conditionObject) {
      conditionObject.remove();
    }
  }

  connectionsData = deleteConnectionFromData(connectionIndex);

  if (firstObject && secondObject) {
    // If we have all the objects, we can recreate the line
    result = true;
  }

  return result;
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

/***/ }),

/***/ "./src/utilities/styling.js":
/*!**********************************!*\
  !*** ./src/utilities/styling.js ***!
  \**********************************/
/*! exports provided: styleLine, getLayerStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleLine", function() { return styleLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLayerStyles", function() { return getLayerStyles; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var pluginKey = "flowArrows";
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData();
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
that['autoUpdateSelectedArrows'] = __skpm_run.bind(this, 'autoUpdateSelectedArrows');
that['autoUpdateSelectedArrows'] = __skpm_run.bind(this, 'autoUpdateSelectedArrows');
that['updateArtboardArrows'] = __skpm_run.bind(this, 'updateArtboardArrows');
that['updateAllArrows'] = __skpm_run.bind(this, 'updateAllArrows');
that['deleteSelectedArrows'] = __skpm_run.bind(this, 'deleteSelectedArrows');
that['deleteArtboardArrows'] = __skpm_run.bind(this, 'deleteArtboardArrows');
that['deleteAllArrows'] = __skpm_run.bind(this, 'deleteAllArrows');
that['panel'] = __skpm_run.bind(this, 'panel')

//# sourceMappingURL=script.js.map