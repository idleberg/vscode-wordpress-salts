<<<<<<< HEAD
module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __webpack_require__(1);
const vscode_insert_text_1 = __webpack_require__(2);
const wp_salts_1 = __webpack_require__(3);
const util_1 = __webpack_require__(8);
// Load package components
const activate = (context) => {
    context.subscriptions.push(vscode_1.commands.registerTextEditorCommand('extension.wordpress-salts.insert', (editor) => {
        return insertSalt();
    }));
};
exports.activate = activate;
const insertSalt = () => {
    const textEditor = vscode_1.window.activeTextEditor;
    const scope = textEditor.document.languageId;
    if (!textEditor) {
        return;
    }
    const salts = wp_salts_1.wpSalts('', util_1.getConfig('saltLength'));
    let output = '';
    switch (scope) {
        case 'dotenv':
        case 'env':
            output = util_1.dotEnvOut(salts);
            break;
        case 'json':
            output = JSON.stringify(salts, null, util_1.getConfig('jsonIndentation'));
            break;
        case 'php':
            output = util_1.phpOutput(salts);
            break;
        case 'yaml':
            output = util_1.yamlOutput(salts);
            break;
        default:
            break;
    }
    vscode_insert_text_1.insertText(output);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var vscode_1 = __webpack_require__(1);
var insertText = function (text, appendText, newLine) {
    if (appendText === void 0) { appendText = false; }
    if (newLine === void 0) { newLine = false; }
    var activeTextEditor = vscode_1.window.activeTextEditor;
    if (!activeTextEditor)
        return;
    activeTextEditor.edit(function (edit) { return activeTextEditor.selections.forEach(function (selection) {
        if (appendText)
            edit.delete(selection);
        var position = (appendText) ? selection.end : selection.start;
        var textStr = (appendText && newLine) ? "\n" + text : text;
        edit.insert(position, textStr);
    }); });
};
exports.insertText = insertText;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(4);
var WORDPRESS_KEYS = [
    'AUTH_KEY',
    'SECURE_AUTH_KEY',
    'LOGGED_IN_KEY',
    'NONCE_KEY',
    'AUTH_SALT',
    'SECURE_AUTH_SALT',
    'LOGGED_IN_SALT',
    'NONCE_SALT',
];
var MINIMUM_KEY_LENGTH = 64;
/**
 * Returns object of default WordPress salts or any string/array of strings
 * @param length - length of the salt, defaults to 64
 * @returns - object of salts
 */
var wpSalts = function (keys, saltLength) {
    if (keys === void 0) { keys = ''; }
    if (saltLength === void 0) { saltLength = 64; }
    var output = {};
    if (typeof keys === 'string') {
        keys = (keys.length > 0) ? [keys] : WORDPRESS_KEYS;
    }
    else if (typeof keys === 'object') {
        keys = (keys !== null && keys.length > 0) ? keys : WORDPRESS_KEYS;
    }
    else {
        keys = WORDPRESS_KEYS;
    }
    saltLength = (saltLength < MINIMUM_KEY_LENGTH) ? MINIMUM_KEY_LENGTH : saltLength;
    keys.map(function (key) { return output[key] = util_1.generateSalt(saltLength); });
    return output;
};
exports.wpSalts = wpSalts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBc0M7QUFFdEMsSUFBTSxjQUFjLEdBQUc7SUFDckIsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsV0FBVztJQUNYLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLFlBQVk7Q0FDYixDQUFDO0FBQ0YsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFFOUI7Ozs7R0FJRztBQUNILElBQU0sT0FBTyxHQUFHLFVBQUMsSUFBb0MsRUFBRSxVQUF1QjtJQUE3RCxxQkFBQSxFQUFBLFNBQW9DO0lBQUUsMkJBQUEsRUFBQSxlQUF1QjtJQUM1RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFaEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO0tBQ3REO1NBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDbkMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztLQUNuRTtTQUFNO1FBQ0wsSUFBSSxHQUFHLGNBQWMsQ0FBQztLQUN2QjtJQUVELFVBQVUsR0FBRyxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBRWpGLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsbUJBQVksQ0FBQyxVQUFVLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO0lBRXhELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUdBLDBCQUFPIn0=

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getRandomValues = __webpack_require__(5);
var MINIMUM_KEY_LENGTH = 64;
/**
 * Generate random number
 * @param min - lowest value
 * @param max - highest value
 * @returns - random number
 *
 * @see https://github.com/EFForg/OpenWireless/blob/0e0bd06277f7178f840c36a9b799c7659870fa57/app/js/diceware.js#L59
 */
var getRandom = function (min, max) {
    var randomValue = 0;
    var range = max - min;
    var bitsNeeded = Math.ceil(Math.log2(range));
    if (bitsNeeded > 53) {
        throw new RangeError('Cannot generate numbers larger than 53 bits.');
    }
    var bytesNeeded = Math.ceil(bitsNeeded / 8);
    var mask = Math.pow(2, bitsNeeded) - 1;
    var byteArray = new Uint8Array(bytesNeeded);
    getRandomValues(byteArray);
    var p = (bytesNeeded - 1) * 8;
    for (var i = 0; i < bytesNeeded; i++) {
        randomValue += byteArray[i] * Math.pow(2, p);
        p -= 8;
    }
    randomValue = randomValue & mask;
    return randomValue >= range ? getRandom(min, max) : min + randomValue;
};
/**
 * Get random character
 * @returns - random character
 *
 * @see https://roots.io/salts.html
 */
var getRandomChar = function () {
    var minCharacter = 33;
    var maxCharacter = 126;
    var character = String.fromCharCode(getRandom(minCharacter, maxCharacter));
    if (['\'', '"', '\\'].some(function (badCharacter) {
        return character === badCharacter;
    })) {
        return getRandomChar();
    }
    return character;
};
/**
 * Generate a salt
 * @param length - length of the salt, defaults to 64
 * @returns - string
 *
 * @see https://roots.io/salts.html
 */
var generateSalt = function (saltLength) {
    if (saltLength === void 0) { saltLength = MINIMUM_KEY_LENGTH; }
    return Array.apply(null, Array(saltLength))
        .map(getRandomChar)
        .join('');
};
exports.generateSalt = generateSalt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXFEO0FBRXJELElBQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0FBRTlCOzs7Ozs7O0dBT0c7QUFDSCxJQUFNLFNBQVMsR0FBRyxVQUFDLEdBQVcsRUFBRSxHQUFXO0lBQ3pDLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztJQUM1QixJQUFNLEtBQUssR0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBRWhDLElBQU0sVUFBVSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXZELElBQUksVUFBVSxHQUFHLEVBQUUsRUFBRTtRQUNuQixNQUFNLElBQUksVUFBVSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7S0FDdEU7SUFFRCxJQUFNLFdBQVcsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0RCxJQUFNLElBQUksR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsSUFBTSxTQUFTLEdBQWUsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFMUQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNSO0lBRUQsV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFFakMsT0FBTyxXQUFXLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO0FBQ3hFLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsSUFBTSxhQUFhLEdBQUc7SUFDcEIsSUFBTSxZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQ2hDLElBQU0sWUFBWSxHQUFXLEdBQUcsQ0FBQztJQUNqQyxJQUFNLFNBQVMsR0FBVyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUVyRixJQUNFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxZQUFZO1FBQ2pDLE9BQU8sU0FBUyxLQUFLLFlBQVksQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFDRjtRQUNBLE9BQU8sYUFBYSxFQUFFLENBQUM7S0FDeEI7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDSCxJQUFNLFlBQVksR0FBRyxVQUFDLFVBQStCO0lBQS9CLDJCQUFBLEVBQUEsK0JBQStCO0lBQ25ELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3hDLEdBQUcsQ0FBQyxhQUFhLENBQUM7U0FDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBR0Esb0NBQVkifQ==

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var window = __webpack_require__(6);
var nodeCrypto = __webpack_require__(7);

function getRandomValues(buf) {
  if (window.crypto && window.crypto.getRandomValues) {
    return window.crypto.getRandomValues(buf);
  }
  if (typeof window.msCrypto === 'object' && typeof window.msCrypto.getRandomValues === 'function') {
    return window.msCrypto.getRandomValues(buf);
  }
  if (nodeCrypto.randomBytes) {
    if (!(buf instanceof Uint8Array)) {
      throw new TypeError('expected Uint8Array');
    }
    if (buf.length > 65536) {
      var e = new Error();
      e.code = 22;
      e.message = 'Failed to execute \'getRandomValues\' on \'Crypto\': The ' +
        'ArrayBufferView\'s byte length (' + buf.length + ') exceeds the ' +
        'number of bytes of entropy available via this API (65536).';
      e.name = 'QuotaExceededError';
      throw e;
    }
    var bytes = nodeCrypto.randomBytes(buf.length);
    buf.set(bytes);
    return buf;
  }
  else {
    throw new Error('No secure random number generator available.');
  }
}

module.exports = getRandomValues;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __webpack_require__(1);
const getLongestString = (input) => {
    const map = input.map((x) => x.length);
    const max = map.indexOf(Math.max(...map));
    return input[max];
};
const dotEnvOut = (salts) => {
    const output = [];
    Object.keys(salts).forEach(key => {
        output.push(`${key}='${salts[key]}'`);
    });
    return output.join('\n');
};
exports.dotEnvOut = dotEnvOut;
const phpOutput = (salts) => {
    const maxLength = getLongestString(Object.keys(salts)).length;
    const output = [];
    Object.keys(salts).forEach(key => {
        const whitespace = (getConfig('alignPHP')) ? ' '.repeat(maxLength - key.length) : '';
        output.push(`define('${key}', ${whitespace}'${salts[key]}');`);
    });
    return output.join('\n');
};
exports.phpOutput = phpOutput;
const yamlOutput = (salts) => {
    const output = [];
    Object.keys(salts).forEach(key => {
        output.push(`${key.toLowerCase()}: "${salts[key]}"`);
    });
    return output.join('\n');
};
exports.yamlOutput = yamlOutput;
const getConfig = (key) => {
    if (key && key.length) {
        return vscode_1.workspace.getConfiguration('wordpress-salts')[key];
    }
    return vscode_1.workspace.getConfiguration('wordpress-salts');
};
exports.getConfig = getConfig;


/***/ })
/******/ ]);
=======
module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("vscode")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(2),a=n(3),i=n(8);t.activate=e=>{e.subscriptions.push(r.commands.registerTextEditorCommand("extension.wordpress-salts.insert",e=>u()))};const u=()=>{const e=r.window.activeTextEditor,t=e.document.languageId;if(!e)return;const n=a.wpSalts("",i.getConfig("saltLength"));let u="";switch(t){case"dotenv":case"env":u=i.dotEnvOut(n);break;case"json":u=JSON.stringify(n,null,i.getConfig("jsonIndentation"));break;case"php":u=i.phpOutput(n);break;case"yaml":u=i.yamlOutput(n)}o.insertText(u)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o={append:!1,newLine:!1};t.insertText=function(e,t){void 0===t&&(t={});var n=r.window.activeTextEditor;if(n){var a=Object.assign(o,t);n.edit(function(t){return n.selections.forEach(function(n){a.append||t.delete(n);var r=a.append?n.end:n.start,o=a.append&&a.newLine?"\n"+e:e;t.insert(r,o)})})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),o=["AUTH_KEY","SECURE_AUTH_KEY","LOGGED_IN_KEY","NONCE_KEY","AUTH_SALT","SECURE_AUTH_SALT","LOGGED_IN_SALT","NONCE_SALT"];t.wpSalts=function(e,t){void 0===e&&(e=""),void 0===t&&(t=64);var n={};return e="string"==typeof e?e.length>0?[e]:o:"object"==typeof e&&null!==e&&e.length>0?e:o,t=t<64?64:t,e.map(function(e){return n[e]=r.generateSalt(t)}),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5),o=function(e,t){var n=0,a=t-e,i=Math.ceil(Math.log2(a));if(i>53)throw new RangeError("Cannot generate numbers larger than 53 bits.");var u=Math.ceil(i/8),s=Math.pow(2,i)-1,c=new Uint8Array(u);r(c);for(var f=8*(u-1),l=0;l<u;l++)n+=c[l]*Math.pow(2,f),f-=8;return(n&=s)>=a?o(e,t):e+n},a=function(){var e=String.fromCharCode(o(33,126));return["'",'"',"\\"].some(function(t){return e===t})?a():e};t.generateSalt=function(e){return void 0===e&&(e=64),Array.apply(null,Array(e)).map(a).join("")}},function(e,t,n){var r=n(6),o=n(7);e.exports=function(e){if(r.crypto&&r.crypto.getRandomValues)return r.crypto.getRandomValues(e);if("object"==typeof r.msCrypto&&"function"==typeof r.msCrypto.getRandomValues)return r.msCrypto.getRandomValues(e);if(o.randomBytes){if(!(e instanceof Uint8Array))throw new TypeError("expected Uint8Array");if(e.length>65536){var t=new Error;throw t.code=22,t.message="Failed to execute 'getRandomValues' on 'Crypto': The ArrayBufferView's byte length ("+e.length+") exceeds the number of bytes of entropy available via this API (65536).",t.name="QuotaExceededError",t}var n=o.randomBytes(e.length);return e.set(n),e}throw new Error("No secure random number generator available.")}},function(e,t){var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e.exports=n},function(e,t){e.exports=require("crypto")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);t.dotEnvOut=e=>{const t=[];return Object.keys(e).forEach(n=>{t.push(`${n}='${e[n]}'`)}),t.join("\n")};t.phpOutput=e=>{const t=(e=>{const t=e.map(e=>e.length);return e[t.indexOf(Math.max(...t))]})(Object.keys(e)).length,n=[];return Object.keys(e).forEach(r=>{const a=o("alignPHP")?" ".repeat(t-r.length):"";n.push(`define('${r}', ${a}'${e[r]}');`)}),n.join("\n")};t.yamlOutput=e=>{const t=[];return Object.keys(e).forEach(n=>{t.push(`${n.toLowerCase()}: "${e[n]}"`)}),t.join("\n")};const o=e=>e&&e.length?r.workspace.getConfiguration("wordpress-salts")[e]:r.workspace.getConfiguration("wordpress-salts");t.getConfig=o}]);
>>>>>>> c289081d8cd7a39bbd4930f915fb107974bcdf65
//# sourceMappingURL=extension.js.map