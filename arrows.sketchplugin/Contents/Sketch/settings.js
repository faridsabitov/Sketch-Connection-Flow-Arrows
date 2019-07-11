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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/settings.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/*! exports provided: settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities_styling_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/styling.js */ "./src/utilities/styling.js");



var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var pluginKey = "flowArrows";
var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document);
var docData = context.document.documentData();
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
} // Functions

function setActiveStyleSetting(arrowStylingField) {
  var docSettings = context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey);
  var styles = Object(_utilities_styling_js__WEBPACK_IMPORTED_MODULE_1__["getLayerStyles"])(null);

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
that['settings'] = __skpm_run.bind(this, 'settings');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=settings.js.map