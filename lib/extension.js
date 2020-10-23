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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode_1 = __webpack_require__(1);
const vscode_get_config_1 = __webpack_require__(2);
const vscode_insert_text_1 = __webpack_require__(4);
const wp_salts_1 = __webpack_require__(5);
const util_1 = __webpack_require__(7);
// Load package components
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.subscriptions.push(vscode_1.commands.registerTextEditorCommand('extension.wordpress-salts.insert', () => __awaiter(this, void 0, void 0, function* () {
            return yield insertSalt();
        })));
    });
}
exports.activate = activate;
function insertSalt() {
    return __awaiter(this, void 0, void 0, function* () {
        const textEditor = vscode_1.window.activeTextEditor;
        const scope = textEditor.document.languageId;
        if (!textEditor) {
            return;
        }
        const { jsonIndentation, saltLength } = yield vscode_get_config_1.getConfig('wordpress-salts');
        const salts = wp_salts_1.wpSalts('', saltLength);
        let output = '';
        switch (scope) {
            case 'dotenv':
            case 'env':
                output = util_1.dotEnvOut(salts);
                break;
            case 'json':
                output = JSON.stringify(salts, null, jsonIndentation);
                break;
            case 'php':
                output = yield util_1.phpOutput(salts);
                break;
            case 'yaml':
                output = util_1.yamlOutput(salts);
                break;
            default:
                break;
        }
        vscode_insert_text_1.insertText(output);
    });
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var vscode = __webpack_require__(1);
var path = __webpack_require__(3);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var isObj = value => {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
};

const disallowedKeys = new Set([
	'__proto__',
	'prototype',
	'constructor'
]);

const isValidPath = pathSegments => !pathSegments.some(segment => disallowedKeys.has(segment));

function getPathSegments(path) {
	const pathArray = path.split('.');
	const parts = [];

	for (let i = 0; i < pathArray.length; i++) {
		let p = pathArray[i];

		while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.';
			p += pathArray[++i];
		}

		parts.push(p);
	}

	if (!isValidPath(parts)) {
		return [];
	}

	return parts;
}

var dotProp = {
	get(object, path, value) {
		if (!isObj(object) || typeof path !== 'string') {
			return value === undefined ? object : value;
		}

		const pathArray = getPathSegments(path);
		if (pathArray.length === 0) {
			return;
		}

		for (let i = 0; i < pathArray.length; i++) {
			object = object[pathArray[i]];

			if (object === undefined || object === null) {
				// `object` is either `undefined` or `null` so we want to stop the loop, and
				// if this is not the last bit of the path, and
				// if it did't return `undefined`
				// it would return `null` if `object` is `null`
				// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
				if (i !== pathArray.length - 1) {
					return value;
				}

				break;
			}
		}

		return object;
	},

	set(object, path, value) {
		if (!isObj(object) || typeof path !== 'string') {
			return object;
		}

		const root = object;
		const pathArray = getPathSegments(path);

		for (let i = 0; i < pathArray.length; i++) {
			const p = pathArray[i];

			if (!isObj(object[p])) {
				object[p] = {};
			}

			if (i === pathArray.length - 1) {
				object[p] = value;
			}

			object = object[p];
		}

		return root;
	},

	delete(object, path) {
		if (!isObj(object) || typeof path !== 'string') {
			return false;
		}

		const pathArray = getPathSegments(path);

		for (let i = 0; i < pathArray.length; i++) {
			const p = pathArray[i];

			if (i === pathArray.length - 1) {
				delete object[p];
				return true;
			}

			object = object[p];

			if (!isObj(object)) {
				return false;
			}
		}
	},

	has(object, path) {
		if (!isObj(object) || typeof path !== 'string') {
			return false;
		}

		const pathArray = getPathSegments(path);
		if (pathArray.length === 0) {
			return false;
		}

		// eslint-disable-next-line unicorn/no-for-loop
		for (let i = 0; i < pathArray.length; i++) {
			if (isObj(object)) {
				if (!(pathArray[i] in object)) {
					return false;
				}

				object = object[pathArray[i]];
			} else {
				return false;
			}
		}

		return true;
	}
};

function getConfig(configNotation) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = (configNotation === null || configNotation === void 0 ? void 0 : configNotation.length) ? dotProp.get(vscode.workspace.getConfiguration(), configNotation)
                        : vscode.workspace.getConfiguration();
                    return [4 /*yield*/, substituteVariables(config)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function substituteVariables(config) {
    return __awaiter(this, void 0, void 0, function () {
        var configString, lineNumber, selectedText, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    configString = JSON.stringify(config);
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${workspaceFolder}')) {
                        configString = configString.replace(/\${workspaceFolder}/g, getWorkspaceFolder());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${workspaceFolderBasename}')) {
                        configString = configString.replace(/\${workspaceFolderBasename}/g, path.basename(getWorkspaceFolder()));
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${file}')) {
                        configString = configString.replace(/\${file}/g, getFile());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${relativeFile}')) {
                        configString = configString.replace(/\${relativeFile}/g, getRelativeFile());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${relativeFileDirname}')) {
                        configString = configString.replace(/\${relativeFileDirname}/g, getRelativeFileDirname());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${fileBasename}')) {
                        configString = configString.replace(/\${fileBasename}/g, getFileBasename());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${fileBasenameNoExtension}')) {
                        configString = configString.replace(/\${fileBasenameNoExtension}/g, getFileBasenameNoExtension());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${fileDirname}')) {
                        configString = configString.replace(/\${fileDirname}/g, getFileDirname());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${fileExtname}')) {
                        configString = configString.replace(/\${fileExtname}/g, getFileExtname());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${cwd}')) {
                        configString = configString.replace(/\${cwd}/g, process.cwd());
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${lineNumber}')) {
                        lineNumber = getLineNumber();
                        if (lineNumber && parseInt(lineNumber)) {
                            configString = configString.replace(/\${lineNumber}/g, getLineNumber());
                        }
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${selectedText}')) {
                        selectedText = getSelection().join();
                        if (selectedText) {
                            configString = configString.replace(/\${selectedText}/g, selectedText);
                        }
                    }
                    if (configString === null || configString === void 0 ? void 0 : configString.includes('${execPath}')) {
                        configString = configString.replace(/\${execPath}/g, process.execPath);
                    }
                    if (configString && /\${env:\w+}/.test(configString)) {
                        configString = configString.replace(/(\${env:(\w+)})/g, process.env['$2']);
                    }
                    if (configString && /\${config:[\w.]+}/.test(configString)) {
                        configString = configString.replace(/(\${config:(\w+)})/g, process.env['$2']);
                    }
                    if (!(configString && /\${command:[\w.]+}/.test(configString))) return [3 /*break*/, 2];
                    _b = (_a = configString).replace;
                    _c = [/(\${command:(\w+)})/g];
                    return [4 /*yield*/, vscode.commands.getCommands()];
                case 1:
                    configString = _b.apply(_a, _c.concat([(_d.sent())['$2']]));
                    _d.label = 2;
                case 2:
                    console.log('fertig', configString);
                    return [2 /*return*/, JSON.parse(configString)];
            }
        });
    });
}
function getFile() {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No open editors');
        return;
    }
    return editor.document.uri.fsPath;
}
function getRelativeFile() {
    var workspaceFolder = getWorkspaceFolder();
    return path.relative(workspaceFolder, getFile());
}
function getRelativeFileDirname() {
    return path.dirname(getRelativeFile());
}
function getFileBasename() {
    return path.basename(getFile());
}
function getFileBasenameNoExtension() {
    return path.basename(getFile(), getFileExtname());
}
function getFileDirname() {
    return path.dirname(getFile());
}
function getFileExtname() {
    return path.extname(getFile());
}
function getLineNumber() {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No open editors');
        return;
    }
    return String(editor.selection.active.line);
}
function getSelection() {
    return vscode.window.activeTextEditor.selections.map(function (selection) {
        return vscode.window.activeTextEditor.document.getText(new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character));
    });
}
function getWorkspaceFolder() {
    var _a, _b;
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No open editors');
        return;
    }
    var uri = vscode.workspace.getWorkspaceFolder((_a = editor === null || editor === void 0 ? void 0 : editor.document) === null || _a === void 0 ? void 0 : _a.uri).uri;
    if (!((_b = uri.fsPath) === null || _b === void 0 ? void 0 : _b.length)) {
        vscode.window.showWarningMessage('No open workspaces');
        return;
    }
    return uri.fsPath;
}

exports.getConfig = getConfig;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var nodeCrypto = __webpack_require__(6);

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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yamlOutput = exports.phpOutput = exports.dotEnvOut = void 0;
const vscode_get_config_1 = __webpack_require__(2);
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
function phpOutput(salts) {
    return __awaiter(this, void 0, void 0, function* () {
        const maxLength = getLongestString(Object.keys(salts)).length;
        const alignPHP = yield vscode_get_config_1.getConfig('wordpress-salts.alignPHP');
        const output = [];
        Object.keys(salts).map(key => {
            const whitespace = alignPHP
                ? ' '.repeat(maxLength - key.length)
                : '';
            output.push(`define('${key}', ${whitespace}'${salts[key]}');`);
        });
        return output.join('\n');
    });
}
exports.phpOutput = phpOutput;
function yamlOutput(salts) {
    const output = [];
    Object.keys(salts).map(key => {
        output.push(`${key.toLowerCase()}: "${salts[key]}"`);
    });
    return output.join('\n');
}
exports.yamlOutput = yamlOutput;


/***/ })
/******/ ]);
//# sourceMappingURL=extension.js.map