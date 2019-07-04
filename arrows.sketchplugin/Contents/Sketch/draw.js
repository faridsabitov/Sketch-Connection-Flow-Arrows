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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/draw.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/draw.js":
/*!*********************!*\
  !*** ./src/draw.js ***!
  \*********************/
/*! exports provided: drawConnection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawConnection", function() { return drawConnection; });
// Main Function
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


  connection.style = styleLine(connection.line, style); // Add to group

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
  var libraries = sketch.getLibraries();
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
} // Style


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

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['deleteAllArrows'] = __skpm_run.bind(this, 'deleteAllArrows');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=draw.js.map