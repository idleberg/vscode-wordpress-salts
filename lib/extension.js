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
exports.activate = void 0;
const vscode_1 = __webpack_require__(1);
const vscode_insert_text_1 = __webpack_require__(2);
const wp_salts_1 = __webpack_require__(3);
const util_1 = __webpack_require__(5);
// Load package components
const activate = (context) => {
    context.subscriptions.push(vscode_1.commands.registerTextEditorCommand('extension.wordpress-salts.insert', () => {
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertText", function() { return insertText; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);


var insertText = function (text, appendText, newLine) {
    if (appendText === void 0) { appendText = false; }
    if (newLine === void 0) { newLine = false; }
    var activeTextEditor = vscode__WEBPACK_IMPORTED_MODULE_0__["window"].activeTextEditor;
    if (!activeTextEditor)
        return;
    activeTextEditor.edit(function (edit) { return activeTextEditor.selections.map(function (selection) {
        if (!appendText)
            edit["delete"](selection);
        var location = appendText
            ? selection.end
            : selection.start;
        var value = appendText && newLine
            ? "\n" + text
            : text;
        edit.insert(location, value);
    }); });
};




/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var nodeCrypto = __webpack_require__(4);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var nodeCrypto__default = /*#__PURE__*/_interopDefaultLegacy(nodeCrypto);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof commonjsGlobal !== "undefined") {
    win = commonjsGlobal;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

var window_1 = win;

function getRandomValues(buf) {
  if (window_1.crypto && window_1.crypto.getRandomValues) {
    return window_1.crypto.getRandomValues(buf);
  }
  if (typeof window_1.msCrypto === 'object' && typeof window_1.msCrypto.getRandomValues === 'function') {
    return window_1.msCrypto.getRandomValues(buf);
  }
  if (nodeCrypto__default['default'].randomBytes) {
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
    var bytes = nodeCrypto__default['default'].randomBytes(buf.length);
    buf.set(bytes);
    return buf;
  }
  else {
    throw new Error('No secure random number generator available.');
  }
}

var getRandomValues_1 = getRandomValues;

var MINIMUM_KEY_LENGTH = 64;
/**
 * Generate random number
 * @param min - lowest value
 * @param max - highest value
 * @returns - random number
 *
 * @see https://github.com/EFForg/OpenWireless/blob/0e0bd06277f7178f840c36a9b799c7659870fa57/app/js/diceware.js#L59
 */
function getRandom(min, max) {
    var randomValue = 0;
    var range = max - min;
    var bitsNeeded = Math.ceil(Math.log2(range));
    if (bitsNeeded > 53) {
        throw new RangeError('Cannot generate numbers larger than 53 bits.');
    }
    var bytesNeeded = Math.ceil(bitsNeeded / 8);
    var mask = Math.pow(2, bitsNeeded) - 1;
    var byteArray = new Uint8Array(bytesNeeded);
    getRandomValues_1(byteArray);
    var p = (bytesNeeded - 1) * 8;
    for (var i = 0; i < bytesNeeded; i++) {
        randomValue += byteArray[i] * Math.pow(2, p);
        p -= 8;
    }
    randomValue = randomValue & mask;
    return randomValue >= range ? getRandom(min, max) : min + randomValue;
}
/**
 * Get random character
 * @returns - random character
 *
 * @see https://roots.io/salts.html
 */
function getRandomChar() {
    var minCharacter = 33;
    var maxCharacter = 126;
    var character = String.fromCharCode(getRandom(minCharacter, maxCharacter));
    if (['\'', '"', '\\'].some(function (badCharacter) {
        return character === badCharacter;
    })) {
        return getRandomChar();
    }
    return character;
}
/**
 * Generate a salt
 * @param length - length of the salt, defaults to 64
 * @returns - string
 *
 * @see https://roots.io/salts.html
 */
function generateSalt(saltLength) {
    if (saltLength === void 0) { saltLength = MINIMUM_KEY_LENGTH; }
    return Array.apply(void 0, Array(saltLength)).map(getRandomChar)
        .join('');
}

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
var MINIMUM_KEY_LENGTH$1 = 64;
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
    saltLength = (saltLength < MINIMUM_KEY_LENGTH$1) ? MINIMUM_KEY_LENGTH$1 : saltLength;
    keys.map(function (key) { return output[key] = generateSalt(saltLength); });
    return output;
};

exports.wpSalts = wpSalts;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.yamlOutput = exports.phpOutput = exports.dotEnvOut = void 0;
const vscode_1 = __webpack_require__(1);
const getLongestString = (input) => {
    const map = input.map((x) => x.length);
    const max = map.indexOf(Math.max(...map));
    return input[max];
};
const dotEnvOut = (salts) => {
    const output = [];
    Object.keys(salts).map(key => {
        output.push(`${key}='${salts[key]}'`);
    });
    return output.join('\n');
};
exports.dotEnvOut = dotEnvOut;
const phpOutput = (salts) => {
    const maxLength = getLongestString(Object.keys(salts)).length;
    const output = [];
    Object.keys(salts).map(key => {
        const whitespace = (getConfig('alignPHP')) ? ' '.repeat(maxLength - key.length) : '';
        output.push(`define('${key}', ${whitespace}'${salts[key]}');`);
    });
    return output.join('\n');
};
exports.phpOutput = phpOutput;
const yamlOutput = (salts) => {
    const output = [];
    Object.keys(salts).map(key => {
        output.push(`${key.toLowerCase()}: "${salts[key]}"`);
    });
    return output.join('\n');
};
exports.yamlOutput = yamlOutput;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getConfig = (key) => {
    if (key && key.length) {
        return vscode_1.workspace.getConfiguration('wordpress-salts')[key];
    }
    return vscode_1.workspace.getConfiguration('wordpress-salts');
};
exports.getConfig = getConfig;


/***/ })
/******/ ]);
//# sourceMappingURL=extension.js.map