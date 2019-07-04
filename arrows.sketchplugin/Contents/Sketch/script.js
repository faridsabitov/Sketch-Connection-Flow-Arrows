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
/*! exports provided: createAutoArrow, createRightArrow, createDownArrow, createLeftArrow, createUpArrow, createRightArrowWithCondition, createDownArrowWithCondition, createLeftArrowWithCondition, createUpArrowWithCondition, autoUpdateSelectedArrows, updateSelectedArrows, updateArtboardArrows, updateAllArrows, deleteSelectedArrows, deleteArtboardArrows, deleteAllArrows */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/faridsabitov/Sketch-Connection-Flow-Arrows/src/script.js: Unexpected token (255:0)\n\n\u001b[0m \u001b[90m 253 | \u001b[39m    sketch\u001b[33m.\u001b[39m\u001b[33mUI\u001b[39m\u001b[33m.\u001b[39mmessage(\u001b[32m\"There is nothing to delete\"\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 254 | \u001b[39m  }\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 255 | \u001b[39m}\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 256 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 257 | \u001b[39m\u001b[36mfunction\u001b[39m update(context\u001b[33m,\u001b[39m level\u001b[33m,\u001b[39m isUpdate) {\u001b[0m\n\u001b[0m \u001b[90m 258 | \u001b[39m  \u001b[90m// 1 - selection level\u001b[39m\u001b[0m\n    at Object.raise (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:3851:17)\n    at Object.unexpected (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:5167:16)\n    at Object.parseExprAtom (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:6328:20)\n    at Object.parseExprAtom (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:3570:20)\n    at Object.parseExprSubscripts (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:5914:23)\n    at Object.parseMaybeUnary (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:5894:21)\n    at Object.parseExprOps (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:5781:23)\n    at Object.parseMaybeConditional (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:5754:23)\n    at Object.parseMaybeAssign (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:5701:21)\n    at Object.parseExpression (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:5649:23)\n    at Object.parseStatementContent (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:7420:23)\n    at Object.parseStatement (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:7291:17)\n    at Object.parseBlockOrModuleBlockBody (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:7868:25)\n    at Object.parseBlockBody (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:7855:10)\n    at Object.parseTopLevel (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:7220:10)\n    at Object.parse (/Users/faridsabitov/Sketch-Connection-Flow-Arrows/node_modules/@babel/parser/lib/index.js:8863:17)");

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