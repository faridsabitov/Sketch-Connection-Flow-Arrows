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
/*! exports provided: default, updateArrows, updateLayerNames, cleanArrows, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateArrows", function() { return updateArrows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateLayerNames", function() { return updateLayerNames; });
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
var currentGroup; // Saying that there is no line

var lineAvailable = false;
var lineObject;
var sourceObject; // currently Sketch can't provide really firsrt selection
//
//  Default Function
//
//
// defineLink
// .
// .  Check if we have more than one selection
// .  .
// .  .  If we have database
// .  .  .
// .  .  .  For every selection need to have separate flow
// .  .  .  .
// .  .  .  .  If we don’t have this two objects in one connection
// .  .  .  .  .
// .  .  .  .  .  Create new arrow(firstObject, secondObject)
// .  .  .  .  .
// .  .  .  .  else If we have this two objects in one connection
// .  .  .  .  .
// .  .  .  .  .  If we have this lineObject
// .  .  .  .  .  .
// .  .  .  .  .  .  UpdateArrow(firstObject, secondObject, line)
// .  .  .  .  .  .
// .  .  .  .  .  if we don’t have this lineObject
// .  .  .  .  .  .
// .  .  .  .  .  .  Need to delete this line from database(line)
// .  .  .  .  .  .  Create new arrow(firstObject, secondObject)
// .  .  .  .  .  .
// .  .  else if we don’t have database
// .  .  .
// .  .  .  For every selection need to have separate flow
// .  .  .  . 
// .  .  .  . Create new arrow(firstObject, secondObject)
// .  .  .  . 

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  // Check if we have "Arrows" group
  checkForArrowGroup(); //Check if we have more than one selection

  if (selection.count() > 1) {
    // When user selected more than one layer
    // We need to define the connections and connection position
    // defineArrowPoints()
    // Need to define source object first
    sourceObject = selection.firstObject(); // if there is a line in Plugin Database, we are showing it
    // lineObject = checkConnections(firstObject,secondObject)
    // if(pluginData) {
    // if we have connectionDatabase for this document
    // Need to check if we have this connection already
    // for(var g = 0; g < selection.count(); g++) {
    //   if(selection[g].objectID() != sourceObject.objectID()){
    //     createArrow(sourceObject, selection[g])
    //   }
    // }
    // for(var y = 0; y < pluginData.count(); y++){
    //   if(selection[g].objectID() != sourceObject.objectID()){
    //     createArrow(sourceObject, selection[g])
    //   }
    //   if(firstObject == pluginData[y].firstObject || firstObject == pluginData[y].secondObject){
    //     // if we found that we have this object in connection database already
    //     if(secondObject == pluginData[y].firstObject || secondObject == pluginData[y].secondObject){
    //       // if we found that we have this object in connection database already
    //       // Here we found connection and here we need to update position
    //       // Do we have a line inside "Arrows" group?
    //       // TODO: Need to add check system if we don't have group
    //       for(var z = 0; z < currentGroup.layers().count(); z++){
    //         if(currentGroup.layers()[z].objectID() == pluginData[y].line) {                      
    //           // we have this line
    //           lineAvailable = true
    //           lineObject = currentGroup.layers()[z]
    //         } 
    //       }
    //     }
    //   } else {
    //     // no such object
    //   }
    // }
    // } else {
    // Fresh Start
    // log(selection.count()-1)

    for (var g = 0; g < selection.count(); g++) {
      if (selection[g].objectID() != sourceObject.objectID()) {
        createArrow(sourceObject, selection[g]);
      }
    } // 
    // }
    // if(lineAvailable) {
    //   // if line is available we need to update it's position
    //   updateArrow(firstObject, secondObject, direction, line) 
    // } else {
    //   // if we don't have a line, need to create a new one
    //   // Middle Points
    //   let middlePosX = (firstLayerPosX + secondLayerPosX)/2
    //   let middlePosY = (firstLayerPosY + secondLayerPosY)/2
    //   // Drawing a line
    //   let path = NSBezierPath.bezierPath()
    //   // Adding points
    //   path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    //   path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY))
    //   path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY))
    //   path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
    //   // Painting the line
    //   let line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
    //   // Making middle points rounded
    //   let points = line.layers().firstObject().points()
    //   points[1].cornerRadius = 20
    //   points[2].cornerRadius = 20
    //   // Providing Settings for the arrow
    //   line.setName("Arrow")
    //   // Styling Border Style
    //   let border = line.style().addStylePartOfType(1)
    //   border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1})
    //   border.thickness = 2
    //   line.style().endMarkerType = 2
    //   if(pluginData){
    //     connections = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey)
    //   }
    //   // Adding current connection to the all connections
    //   // Storage for current connection
    //   let connection = {
    //     firstObject : firstObject,
    //     secondObject : secondObject,
    //     direction: "right",
    //     line : line.objectID()
    //   }
    //   let connectionsArray = []
    //   for (let i = 0; i < connections.length; i ++) {
    //     connectionsArray.push(connections[i])
    //   }
    //   connectionsArray.push(connection)
    //   // Saving Connection Info to Sketch Plugin
    //   context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "connections", docData, pluginKey)
    //   // log(context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey))
    //   if(currentGroup){
    //     // If we already have group
    //     currentGroup.addLayers([line])
    //   } else {
    //     // If we don't have a group
    //     // Creating a group
    //     var group = new Group({
    //       parent: currentParentGroup,
    //       name: 'Arrows',
    //       locked: true,
    //       layers: [line]
    //     })
    //     // Moving this group to the bottom of the page
    //     group.moveToBack()
    //   }
    // }

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
  getConnectionsFromPluginData();
  log(connectionsArray);

  for (var i = 0; i < connectionsArray.length; i++) {
    // Need to go through each connection and update arrow position
    updateArrow(connectionsArray[i].firstObject, connectionsArray[i].secondObject, connectionsArray[i].direction, connectionsArray[i].line);
  }

  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All arrows are updated 🚀");
}
function updateLayerNames(context) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All Layers are updated 🎉");
}
function cleanArrows(context) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
  checkForArrowGroup();
  currentGroup.ungroup();
  context.command.setValue_forKey_onLayer_forPluginIdentifier(null, "arrowConnections", docData, pluginKey);
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("All Connections are deleted 🎉");
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
  if (pluginData) {
    // if we have connectionDatabase for this document
    // Need to check if we have this connection already
    for (var y = 0; y < pluginData.count(); y++) {
      if (firstObject == pluginData[y].firstObject || firstObject == pluginData[y].secondObject) {
        // if we found that we have this object in connection database already
        if (secondObject == pluginData[y].firstObject || secondObject == pluginData[y].secondObject) {
          // if we found that we have this object in connection database already
          // Do we have a line inside "Arrows" group?
          // TODO: Need to add check system if we don't have group
          for (var z = 0; z < currentGroup.layers().count(); z++) {
            if (currentGroup.layers()[z].objectID() == pluginData[y].line) {
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

function updateArrow(firstObjectID, secondObjectID, direction, lineID) {
  currentGroup = checkForArrowGroup();

  if (currentGroup) {
    var firstObject = document.getLayerWithID(firstObjectID);
    var secondObject = document.getLayerWithID(secondObjectID);

    var _lineObject = document.getLayerWithID(lineID);

    _lineObject.remove(); // const directionString = String(direction)


    var _direction = getDirection(firstObjectID, secondObjectID);

    var line = drawLine(firstObjectID, secondObjectID, _direction);
    addToArrowsGroup(line); // Storage for current connection

    var connection = {
      firstObject: firstObjectID,
      secondObject: secondObjectID,
      direction: _direction,
      line: line.objectID()
    };
    connectionsArray.push(connection); // Saving Connection Info to Sketch Plugin

    context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "arrowConnections", docData, pluginKey); // if(firstObject && secondObject && lineObject){
    //   // If we have all the objects
    //   // need to specify new size and location for the arrow shape
    //   switch(directionString) {
    //     case "right":
    //       log(lineObject)
    //       if(firstObject.frame.y+firstObject.frame.height/2 < secondObject.frame.y+secondObject.frame.height/2){
    //         // second object is lower
    //         if(lineObject.frame.y == (firstObject.frame.y+firstObject.frame.height/2)){
    //           // just reposition, don't need to reverse
    //           lineObject.frame.x = firstObject.frame.x + firstObject.frame.width
    //           lineObject.frame.width = secondObject.frame.x - (firstObject.frame.x + firstObject.frame.width)
    //           lineObject.frame.y = firstObject.frame.y + (firstObject.frame.height/2)
    //           lineObject.frame.height = (secondObject.frame.y + (secondObject.frame.height / 2)) - (firstObject.frame.y + (firstObject.frame.height/2))
    //         } else {
    //           // lineObject.setIsFlippedVertical(true)
    //         }
    //         // lineObject.setIsFlippedVertical(false)
    //         // lineObject.frame().y = firstLayerPos.midY()
    //         // lineObject.frame().height = secondLayerPos.midY() - firstLayerPos.midY()
    //       } else {
    //         // second object is higher
    //         lineObject.frame.x = firstObject.frame.x + firstObject.frame.width
    //         lineObject.frame.width = secondObject.frame.x - (firstObject.frame.x + firstObject.frame.width)
    //         lineObject.frame.y = secondObject.frame.y + (secondObject.frame.height/2)
    //         lineObject.frame.height = (firstObject.frame.y + (firstObject.frame.height/2)-(secondObject.frame.y + (secondObject.frame.height / 2)))
    //         // lineObject.setIsFlippedVertical(true)
    //         // lineObject.frame().y = secondLayerPos.midY()
    //         // lineObject.frame().height = firstLayerPos.midY() - secondLayerPos.midY()
    //       }
    //       break;
    //     case "left":
    //       log("no")
    //       line.frame.x = firstObject.frame.x + firstObject.frame.width
    //       line.frame.width = secondObject.frame.x - (firstObject.frame.x + firstObject.frame.width)
    //       line.frame.y = firstObject.frame.y + (secondObject.frame.height/2)
    //       line.frame.height = (secondObject.frame.y + (secondObject.frame.height / 2)) - (firstObject.frame.y + (firstObject.frame.height/2))
    //       break;   
    //     default:
    //       log("dwedw")
    //   }
    // } else {
    // }
    // // log(firstObject)
  } else {} // If we don't have "Arrows" group 
    // TODO: We need to check if we have a group for "Arrows"
    // If yes,
    // // Need to check each object. If we don't have, need to delete this data from plugin data
    // // // Then we need to update line 
    // 

}

function createArrow(firstObject, secondObject) {
  // Process of creating new connection
  var firstObjectID = firstObject.objectID();
  var secondObjectID = secondObject.objectID(); // Need to understand the direction
  // TODO: Because Sketch is not allowing to get order of selected elements, we will select elements based on it's ID (creation order)

  var direction = getDirection(firstObjectID, secondObjectID);
  var line = drawLine(firstObjectID, secondObjectID, direction);
  addToArrowsGroup(line); // Storage for current connection

  var connection = {
    firstObject: firstObjectID,
    secondObject: secondObjectID,
    direction: direction,
    line: line.objectID()
  };
  connectionsArray.push(connection); // Saving Connection Info to Sketch Plugin

  context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "arrowConnections", docData, pluginKey);
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
that['cleanArrows'] = __skpm_run.bind(this, 'cleanArrows');
that['settings'] = __skpm_run.bind(this, 'settings')

//# sourceMappingURL=script.js.map