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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/autoUpdate.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/autoUpdate.js":
/*!***************************!*\
  !*** ./src/autoUpdate.js ***!
  \***************************/
/*! exports provided: autoUpdateSelectedArrows */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoUpdateSelectedArrows", function() { return autoUpdateSelectedArrows; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities_lines_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/lines.js */ "./src/utilities/lines.js");
/* harmony import */ var _utilities_conditions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/conditions.js */ "./src/utilities/conditions.js");


var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var pluginKey = "flowArrows";


function autoUpdateSelectedArrows(context) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.actionContext.document);
  var action = context.actionContext;
  var docData = action.document.documentData();
  var pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
  var connectionsData = [];

  if (pluginData) {
    for (var i = 0; i < pluginData.length; i++) {
      connectionsData.push(pluginData[i]);
    }
  }

  console.log(connectionsData);
  var movedLayers = Array.from(context.actionContext.layers).map(function (layer) {
    return sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(layer);
  });
  var firstObjectID = String(movedLayers[0].id);
  var connectionIndex = [];

  if (connectionsData.length > 0) {
    for (var y = 0; y < connectionsData.length; y++) {
      if (firstObjectID == connectionsData[y].firstObject || firstObjectID == connectionsData[y].secondObject) {
        connectionIndex.push(y);
      }
    }
  }

  if (connectionIndex.length > 0) {
    for (var x = 0; x < connectionIndex.length; x++) {
      Object(_utilities_lines_js__WEBPACK_IMPORTED_MODULE_1__["deleteLine"])(connectionsData[connectionIndex[x]].line, document);

      if (!isCondition) {
        Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_2__["deleteCondition"])(connectionsData[connectionIndex[x]].condition, document);
      }

      var connection = createArrow(connectionsData[connectionIndex[x]].firstObject, connectionsData[connectionIndex[x]].secondObject, connectionsData[connectionIndex[x]].style, connectionsData[connectionIndex[x]].type, connectionsData[connectionIndex[x]].direction, connectionsData[connectionIndex[x]].conditionID, connectionsData[connectionIndex[x]].isCondition);
      connectionsData.push(connection);
    }
  }

  if (connectionIndex.length > 0) {
    // Update data if there was changes
    connectionsData = deleteConnectionFromData(connectionIndex, connectionsData);
  }

  context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsData, "arrowConnections", docData, pluginKey);
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

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var docData = context.document.documentData();
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
function addCondition(keyword, x, y) {
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
    UI.alert("Condition symbol is not found", 'If you would like to add arrows with specific conditions, you need to specify them in your libraries. You can download the library that works well with the plugin by going into Plugins -> Connection Arrows -> Get Free Library. Conditions are taken from the library based on their names. Make sure to name symbol as "#condition" so it will be added here');
  } else {
    var symbolMaster = libraryObject.import();
    symbol = symbolMaster.createNewInstance();
    symbol = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["addToConditionGroup"])(symbol, x, y);
  }

  return symbol;
}
function updateCondition(conditionID, x, y) {
  var condition = document.getLayerWithID(conditionID);
  var conGroup = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["checkForGroup"])("Conditions");
  var arGroup = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["checkForGroup"])("Arrows");
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

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData();
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
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
  log(lineID);
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
that['autoUpdateSelectedArrows'] = __skpm_run.bind(this, 'autoUpdateSelectedArrows');
that['autoUpdateSelectedArrows'] = __skpm_run.bind(this, 'autoUpdateSelectedArrows');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=autoUpdate.js.map