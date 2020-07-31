'use strict';

import { commands, ExtensionContext, window } from 'vscode';
import { insertText } from 'vscode-insert-text';
import { wpSalts } from 'wp-salts';
import {
  getConfig,
  dotEnvOut,
  phpOutput,
  yamlOutput,
} from './util';

// Load package components
const activate = (context: ExtensionContext): void => {
  context.subscriptions.push(
    commands.registerTextEditorCommand('extension.wordpress-salts.insert', () => {
      return insertSalt();
    })
  );
};

const insertSalt = () => {
  const textEditor = window.activeTextEditor;
  const scope = textEditor.document.languageId;

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
