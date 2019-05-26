'use strict';

import { commands, window } from 'vscode';
import { wpSalts } from 'wp-salts';
import {
  getConfig,
  insertText,
  dotEnvOut,
  phpOutput,
  yamlOutput,
} from './util';

// Load package components
const activate = (context) => {
  context.subscriptions.push(
    commands.registerTextEditorCommand('extension.wordpress-salts.insert', (editor) => {
      return insertSalt();
    })
    );
};

const insertSalt = () => {
  const textEditor = window.activeTextEditor;
  const scope = textEditor.document.languageId;

  console.log(textEditor, scope);

  if (!textEditor) {
    return;
  }

  const salts = wpSalts('', getConfig('saltLength'));
  let output = '';

  switch (scope) {
    case 'dotenv':
    case 'env':
      output = dotEnvOut(salts);
      break;

    case 'json':
      output = JSON.stringify(salts, null, getConfig('jsonIndentation'));
      break;

    case 'php':
      output = phpOutput(salts);
      break;

    case 'yaml':
      output = yamlOutput(salts);
      break;

    default:
      break;
  }

  insertText(output);
};

export { activate };
