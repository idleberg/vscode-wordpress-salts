'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const wp_salts_1 = require("wp-salts");
const util_1 = require("./util");
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
    console.log(textEditor, scope);
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
    util_1.insertText(output);
};
//# sourceMappingURL=main.js.map