/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/desktop/block3/block3.js":
/*!**************************************!*\
  !*** ./src/desktop/block3/block3.js ***!
  \**************************************/
/***/ (() => {

eval("document.getElementsByClassName('block3')[0].innerHTML += \" [This text is added by block3.js!]\";\n\n//# sourceURL=webpack://webpacktest/./src/desktop/block3/block3.js?");

/***/ }),

/***/ "./src/desktop/block4/block4.js":
/*!**************************************!*\
  !*** ./src/desktop/block4/block4.js ***!
  \**************************************/
/***/ (() => {

eval("document.getElementsByClassName('block4')[0].innerHTML += \" [This text is added by block4.js!]\";\n\n//# sourceURL=webpack://webpacktest/./src/desktop/block4/block4.js?");

/***/ }),

/***/ "./src/pages/color/color.js":
/*!**********************************!*\
  !*** ./src/pages/color/color.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ../../../src/assets/scss/style.scss */ \"./src/assets/scss/style.scss\");\n\n__webpack_require__(/*! ../../../bem_webpack/color.html */ \"./bem_webpack/color.html\");\n\n//# sourceURL=webpack://webpacktest/./src/pages/color/color.js?");

/***/ }),

/***/ "./bem_webpack/color.html":
/*!********************************!*\
  !*** ./bem_webpack/color.html ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ../src/desktop/block3/block3.scss */ \"./src/desktop/block3/block3.scss\")\n__webpack_require__(/*! ../src/desktop/block3/block3.js */ \"./src/desktop/block3/block3.js\")\n__webpack_require__(/*! ../src/desktop/block4/block4.scss */ \"./src/desktop/block4/block4.scss\")\n__webpack_require__(/*! ../src/desktop/block4/block4.js */ \"./src/desktop/block4/block4.js\")\n\n//# sourceURL=webpack://webpacktest/./bem_webpack/color.html?");

/***/ }),

/***/ "./src/assets/scss/style.scss":
/*!************************************!*\
  !*** ./src/assets/scss/style.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpacktest/./src/assets/scss/style.scss?");

/***/ }),

/***/ "./src/desktop/block3/block3.scss":
/*!****************************************!*\
  !*** ./src/desktop/block3/block3.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpacktest/./src/desktop/block3/block3.scss?");

/***/ }),

/***/ "./src/desktop/block4/block4.scss":
/*!****************************************!*\
  !*** ./src/desktop/block4/block4.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpacktest/./src/desktop/block4/block4.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/color/color.js");
/******/ 	
/******/ })()
;