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



var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings"); // Main Function


function createArrow(firstObjectID, secondObjectID, style, type, direction, conditionID, isCondition, document, docData) {
  // Refactored
  var localDirection = direction == "Auto" ? getDirection(firstObjectID, secondObjectID, document) : direction; // Main Operations based on the settings

  updateSpacing(firstObjectID, secondObjectID, localDirection, document);
  autoAlignLayer(firstObjectID, secondObjectID, localDirection, document); // Making an Arrow 

  var arrow = Object(_draw_js__WEBPACK_IMPORTED_MODULE_1__["drawConnection"])(firstObjectID, secondObjectID, style, type, localDirection, conditionID, isCondition, document, docData); // Storage for current connection

  var connection = {
    firstObject: firstObjectID,
    secondObject: secondObjectID,
    style: arrow.style,
    condition: arrow.conditionID,
    isCondition: isCondition,
    type: arrow.type,
    direction: localDirection,
    line: arrow.line.objectID()
  };
  return connection;
}

function getDirection(firstObjectID, secondObjectID, document) {
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

function updateSpacing(sourceObjectID, childObjectID, direction, document) {
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

function autoAlignLayer(sourceObjectID, childObjectID, direction, document) {
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
/* harmony import */ var _utilities_conditions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/conditions.js */ "./src/utilities/conditions.js");
/* harmony import */ var _utilities_groups_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/groups.js */ "./src/utilities/groups.js");





var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui"); // let document = sketch.fromNative(context.document);
// let docData = context.document.documentData();
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
// Main Function


function drawConnection(firstObjectID, secondObjectID, style, type, localDirection, conditionID, isCondition, document, docData) {
  // Refactored
  // Process of creating new connection  
  var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var connectionPos = getConnectionPos(firstObject, secondObject, localDirection, currentParentGroup);
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


  if (isCondition == true) {
    if (document.getLayerWithID(conditionID)) {
      connection.conditionID = Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_2__["updateCondition"])(conditionID, connectionPos.middlePosX, connectionPos.middlePosY, document, docData);
    } else {
      connection.conditionID = Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_2__["addCondition"])("#con", connectionPos.middlePosX, connectionPos.middlePosY, document, docData);
    }
  } else {
    connection.conditionID = null;
  } // Style


  connection.style = Object(_utilities_styling_js__WEBPACK_IMPORTED_MODULE_1__["styleLine"])(connection.line, style, docData); // Add to group

  Object(_utilities_groups_js__WEBPACK_IMPORTED_MODULE_3__["addToArrowsGroup"])(connection.line, currentParentGroup);
  return connection;
} // Positions

function getConnectionPos(firstObject, secondObject, direction, currentParentGroup) {
  // Refactored
  var firstObjectAbsPos = firstObject.frame.changeBasis({
    from: firstObject.parent,
    to: currentParentGroup
  });
  var secondObjectAbsPos = secondObject.frame.changeBasis({
    from: secondObject.parent,
    to: currentParentGroup
  });
  var currentGroup = Object(_utilities_groups_js__WEBPACK_IMPORTED_MODULE_3__["checkForGroup"])("Arrows", currentParentGroup);
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
}

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! exports provided: createAutoArrow, createRightArrow, createDownArrow, createLeftArrow, createUpArrow, createRightArrowWithCondition, createDownArrowWithCondition, createLeftArrowWithCondition, createUpArrowWithCondition, updateSelectedArrows, updateArtboardArrows, updateAllArrows, deleteSelectedArrows, deleteArtboardArrows, deleteAllArrows, update */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSelectedArrows", function() { return deleteSelectedArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteArtboardArrows", function() { return deleteArtboardArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAllArrows", function() { return deleteAllArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createArrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createArrow.js */ "./src/createArrow.js");
/* harmony import */ var _updateArrow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateArrow.js */ "./src/updateArrow.js");
/* harmony import */ var _utilities_getSourceObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/getSourceObject.js */ "./src/utilities/getSourceObject.js");
/* harmony import */ var _utilities_data_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities/data.js */ "./src/utilities/data.js");
/* harmony import */ var _utilities_lines_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities/lines.js */ "./src/utilities/lines.js");
/* harmony import */ var _utilities_conditions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utilities/conditions.js */ "./src/utilities/conditions.js");
//
//  Variables
//








var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var pluginKey = "flowArrows";
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData(); // let pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();

var connectionsData = Object(_utilities_data_js__WEBPACK_IMPORTED_MODULE_4__["getConnectionsData"])(docData); //
//  Plugin Incoming Commands - Create 
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

function create(context, direction, isCondition) {
  var selection = context.selection;

  if (selection.count() > 1 && selection[0].class() != "MSArtboardGroup") {
    var sourceObjectID = Object(_utilities_getSourceObject_js__WEBPACK_IMPORTED_MODULE_3__["getSourceObjectFromSelection"])(selection, direction);
    var connectionIndex = [];

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != sourceObjectID) {
        var firstObjectID = String(sourceObjectID);
        var secondObjectID = String(selection[g].objectID());
        var _create = true;
        var index = void 0;

        if (connectionsData.length > 0) {
          for (var y = 0; y < connectionsData.length; y++) {
            if ((firstObjectID == connectionsData[y].firstObject || firstObjectID == connectionsData[y].secondObject) && (secondObjectID == connectionsData[y].firstObject || secondObjectID == connectionsData[y].secondObject)) {
              // We have this connection and need to update
              _create = false;
              index = y;
              connectionIndex.push(y);
            }
          }
        }

        if (_create) {
          // Create
          var connection = Object(_createArrow_js__WEBPACK_IMPORTED_MODULE_1__["createArrow"])(firstObjectID, secondObjectID, null, null, direction, null, isCondition, document, docData);
          connectionsData.push(connection);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("New connection is created 🚀");
        } else {
          // Update
          Object(_utilities_lines_js__WEBPACK_IMPORTED_MODULE_5__["deleteLine"])(connectionsData[index].line, document);

          if (!isCondition) {
            Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_6__["deleteCondition"])(connectionsData[index].condition, document);
          }

          var _connection = Object(_createArrow_js__WEBPACK_IMPORTED_MODULE_1__["createArrow"])(firstObjectID, secondObjectID, null, null, direction, connectionsData[index].condition, isCondition, document, docData);

          connectionsData.push(_connection);
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Current connection is updated 🤘");
        }
      }
    }

    if (connectionIndex.length > 0) {
      // Update data if there was changes
      connectionsData = Object(_utilities_data_js__WEBPACK_IMPORTED_MODULE_4__["deleteConnectionFromData"])(connectionIndex, connectionsData);
    }

    context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsData, "arrowConnections", docData, pluginKey);
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
  }
} //
//  Plugin Incoming Commands - Update and Delete
//


function updateSelectedArrows(context) {
  update(context, 1, true);
}
function updateArtboardArrows(context) {
  update(context, 2, true);
}
function updateAllArrows(context) {
  update(context, 3, true);
}
function deleteSelectedArrows(context) {
  update(context, 1, false);
}
function deleteArtboardArrows(context) {
  update(context, 2, false);
}
function deleteAllArrows(context) {
  update(context, 3, false);
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
    if (level == 3) {
      if (isUpdate) {
        newConnectionsData = Object(_updateArrow_js__WEBPACK_IMPORTED_MODULE_2__["updateArrow"])(connectionsData[i].firstObject, connectionsData[i].secondObject, connectionsData[i].style, connectionsData[i].type, connectionsData[i].direction, connectionsData[i].line, connectionsData[i].condition, i);
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated");
      } else {
        for (var _i = 0; _i < connectionsData.length; _i++) {
          Object(_utilities_lines_js__WEBPACK_IMPORTED_MODULE_5__["deleteLine"])(connectionsData[_i].line, document);
          Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_6__["deleteCondition"])(connectionsData[_i].condition, document);
          newConnectionsData = null;
        }
      }
    }

    if (level == 2) {
      if (isUpdate) {// Need to update
      } else {
        for (var _i2 = 0; _i2 < connectionsData.length; _i2++) {
          if (selection[0].class() == "MSArtboardGroup") {
            firstObjectArtboard = document.getLayerWithID(connectionsData[_i2].firstObject);
            firstObjectArtboard = firstObjectArtboard.sketchObject.parentArtboard().objectID();

            if (firstObjectArtboard == selection[0].objectID()) {
              Object(_utilities_lines_js__WEBPACK_IMPORTED_MODULE_5__["deleteLine"])(connectionsData[_i2].line, document);
              Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_6__["deleteCondition"])(connectionsData[_i2].condition, document);
            } else {
              newConnectionsData.push(connectionsData[_i2]);
            }
          } else {
            sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select an artboard");
          }
        }
      }
    }

    if (level == 1) {
      if (isUpdate) {// updateArrow(connectionsData[i].firstObject, connectionsData[i].secondObject, connectionsData[i].style, connectionsData[i].type, connectionsData[i].direction, connectionsData[i].line, connectionsData[i].condition, i);
        // sketch.UI.message("All arrows are updated");
      } else {
        for (var _i3 = 0; _i3 < connectionsData.length; _i3++) {
          if (selection[0].objectID() == connectionsData[_i3].firstObject) {
            log("here");
            Object(_utilities_lines_js__WEBPACK_IMPORTED_MODULE_5__["deleteLine"])(connectionsData[_i3].line, document);
            Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_6__["deleteCondition"])(connectionsData[_i3].condition, document);
          } else {
            newConnectionsData.push(connectionsData[_i3]);
          }
        }

        newConnectionsData = null;
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are deleted");
      }
    }

    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated 🚀"); // let connection = createArrow(sourceObjectID, selection[g].objectID(), null, null, direction, null, isCondition, document, docData);
    // connectionsData.push(connection);

    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("There is no arrows");
  }
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
/* harmony import */ var _utilities_data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/data.js */ "./src/utilities/data.js");
/* harmony import */ var _utilities_lines_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/lines.js */ "./src/utilities/lines.js");




var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var pluginKey = "flowArrows";
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData();
var pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards

var connectionsData = Object(_utilities_data_js__WEBPACK_IMPORTED_MODULE_1__["getConnectionsData"])(docData);
function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, conditionID, isCondition, connectionIndex) {
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var conditionObject = document.getLayerWithID(conditionID);
  var connection = [];
  Object(_utilities_lines_js__WEBPACK_IMPORTED_MODULE_2__["deleteLine"])(lineID);

  if (conditionID && !isCondition) {
    if (conditionObject) {
      conditionObject.remove();
    }
  }

  connectionsData = Object(_utilities_data_js__WEBPACK_IMPORTED_MODULE_1__["deleteConnectionFromData"])(connectionIndex);

  if (firstObject && secondObject) {
    connection = createArrow(connectionsData[connectionIndex[x]].firstObject, connectionsData[connectionIndex[x]].secondObject, connectionsData[connectionIndex[x]].style, connectionsData[connectionIndex[x]].type, connectionsData[connectionIndex[x]].direction, connectionsData[connectionIndex[x]].condition, connectionsData[connectionIndex[x]].isCondition, document, docData);
  }

  return connection;
}

/***/ }),

/***/ "./src/utilities/conditions.js":
/*!*************************************!*\
  !*** ./src/utilities/conditions.js ***!
  \*************************************/
/*! exports provided: addCondition, updateCondition, deleteCondition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCondition", function() { return addCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCondition", function() { return updateCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteCondition", function() { return deleteCondition; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _groups_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./groups.js */ "./src/utilities/groups.js");



var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui"); // let docData = context.document.documentData();
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();


function addCondition(keyword, x, y, document, docData) {
  var libraries = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getLibraries();
  var libraryObject, symbolReferences, symbol;
  var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();

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
    UI.alert("Condition symbol is not found", 'If you would like to add arrows with specific conditions, you need to specify them in your libraries. You can download the library that works well with the plugin by going into Plugins -> Connection Arrows -> Get Free Library. Conditions are taken from the library based on their names. Make sure to name symbol as "#condition" so it will be added here');
  } else {
    var symbolMaster = libraryObject.import();
    symbol = symbolMaster.createNewInstance();
    symbol = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["addToConditionGroup"])(symbol, x, y, currentParentGroup);
  }

  return symbol;
}
function updateCondition(conditionID, x, y, document, docData) {
  var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
  var condition = document.getLayerWithID(conditionID);
  var conGroup = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["checkForGroup"])("Conditions", currentParentGroup);
  var arGroup = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["checkForGroup"])("Arrows", currentParentGroup);
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
}
function deleteCondition(conditionID, document) {
  var conditionObject = document.getLayerWithID(conditionID);
  var selectedGroup;

  if (conditionObject) {
    selectedGroup = conditionObject.parent;
    conditionObject.remove();

    if (selectedGroup.layers.length == 0) {
      selectedGroup.remove();
    }
  }
}

/***/ }),

/***/ "./src/utilities/data.js":
/*!*******************************!*\
  !*** ./src/utilities/data.js ***!
  \*******************************/
/*! exports provided: getConnectionsData, deleteConnectionFromData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnectionsData", function() { return getConnectionsData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteConnectionFromData", function() { return deleteConnectionFromData; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);


var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var pluginKey = "flowArrows";
function getConnectionsData(docData) {
  var pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
  var dataArray = [];

  if (pluginData) {
    for (var i = 0; i < pluginData.length; i++) {
      dataArray.push(pluginData[i]);
    }
  }

  return dataArray;
}
function deleteConnectionFromData(connectionIndexArray, data) {
  if (data) {
    for (var i = connectionIndexArray.length - 1; i >= 0; i--) {
      data.splice(connectionIndexArray[i], 1);
    }
  }

  return data;
}

/***/ }),

/***/ "./src/utilities/getSourceObject.js":
/*!******************************************!*\
  !*** ./src/utilities/getSourceObject.js ***!
  \******************************************/
/*! exports provided: getSourceObjectFromSelection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSourceObjectFromSelection", function() { return getSourceObjectFromSelection; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData();
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
function getSourceObjectFromSelection(selection, direction) {
  var sourceObjectID = selection.firstObject().objectID();

  if (direction != "Auto") {
    for (var g = 0; g < selection.count(); g++) {
      sourceObjectID = defineSourceObject(sourceObjectID, selection[g].objectID(), direction);
    }
  }

  return sourceObjectID;
}

function defineSourceObject(firstObjectID, secondObjectID, direction) {
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var firstObjectAbsPos = firstObject.frame.changeBasis({
    from: firstObject.parent,
    to: currentParentGroup
  });
  var secondObjectAbsPos = secondObject.frame.changeBasis({
    from: secondObject.parent,
    to: currentParentGroup
  });
  var sourceObjectID;

  if (direction == "Right") {
    if (firstObjectAbsPos.x <= secondObjectAbsPos.x) {
      // We need to get the doc position
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if (direction == "Down") {
    if (firstObject.y <= secondObjectAbsPos.y) {
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if (direction == "Left") {
    if (firstObjectAbsPos.x <= secondObjectAbsPos.x) {
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  if (direction == "Up") {
    if (firstObjectAbsPos.y <= secondObjectAbsPos.y) {
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  return sourceObjectID;
}

/***/ }),

/***/ "./src/utilities/groups.js":
/*!*********************************!*\
  !*** ./src/utilities/groups.js ***!
  \*********************************/
/*! exports provided: checkForGroup, addToArrowsGroup, addToConditionGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkForGroup", function() { return checkForGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToArrowsGroup", function() { return addToArrowsGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToConditionGroup", function() { return addToConditionGroup; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);


var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui"); // let document = sketch.fromNative(context.document);
// let docData = context.document.documentData();
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();


function checkForGroup(groupName, currentParentGroup) {
  // refactored
  var currentGroup = null; // Checking all the groups that we have

  for (var i = 0; i < currentParentGroup.layers().count(); i++) {
    if (currentParentGroup.layers()[i].name() == groupName) {
      currentGroup = currentParentGroup.layers()[i];
    }
  }

  return currentGroup;
}
function addToArrowsGroup(line, currentParentGroup) {
  var currentGroup = checkForGroup("Arrows", currentParentGroup);

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
function addToConditionGroup(condition, x, y, currentParentGroup) {
  var conGroup = checkForGroup("Conditions", currentParentGroup);
  var arGroup = checkForGroup("Arrows", currentParentGroup);
  var arGroupX = arGroup != null ? arGroup.frame().x() : 0;
  var arGroupY = arGroup != null ? arGroup.frame().y() : 0;

  if (conGroup) {
    condition.frame.x = x - condition.frame.width / 2 - (conGroup.frame().x() - arGroupX);
    condition.frame.y = y - condition.frame.height / 2 - (conGroup.frame().y() - arGroupY);
    condition.parent = conGroup;
    conGroup.fixGeometryWithOptions(1);
  } else {
    condition.frame.x = x - condition.frame.width / 2 + arGroupX;
    condition.frame.y = y - condition.frame.height / 2 + arGroupY;

    var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

    var group = new Group({
      parent: currentParentGroup,
      name: "Conditions",
      layers: [condition]
    });
    group.moveToBack();
    group.adjustToFit();
  }

  return condition.id;
}

/***/ }),

/***/ "./src/utilities/lines.js":
/*!********************************!*\
  !*** ./src/utilities/lines.js ***!
  \********************************/
/*! exports provided: deleteLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteLine", function() { return deleteLine; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);


var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

function deleteLine(lineID, document) {
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

var pluginKey = "flowArrows"; // let document = sketch.fromNative(context.document);
// let docData = context.document.documentData();

function styleLine(line, style, docData) {
  // Refactored
  var localStyle;

  if (style != null) {
    // For updates
    if (getLayerStyles(style, docData) != null && style != "Default Style") {
      // If style is specified
      localStyle = style;
      var ownStyle = getLayerStyles(style, docData);
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
      localStyle = getLayerStyles(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey), docData);
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
function getLayerStyles(name, docData) {
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
that['updateArtboardArrows'] = __skpm_run.bind(this, 'updateArtboardArrows');
that['updateAllArrows'] = __skpm_run.bind(this, 'updateAllArrows');
that['deleteSelectedArrows'] = __skpm_run.bind(this, 'deleteSelectedArrows');
that['deleteArtboardArrows'] = __skpm_run.bind(this, 'deleteArtboardArrows');
that['deleteAllArrows'] = __skpm_run.bind(this, 'deleteAllArrows');
that['panel'] = __skpm_run.bind(this, 'panel')

//# sourceMappingURL=script.js.map