"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
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
const insertText = (text) => {
    const textEditor = vscode_1.window.activeTextEditor;
    textEditor.edit(edit => textEditor.selections.forEach(selection => {
        edit.delete(selection);
        edit.insert(selection.start, text);
    }));
};
exports.insertText = insertText;
//# sourceMappingURL=util.js.map