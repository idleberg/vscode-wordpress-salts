'use strict';

import { commands, ExtensionContext, window } from 'vscode';
import { getConfig } from 'vscode-get-config';
import { insertText } from 'vscode-insert-text';
import { wpSalts } from 'wp-salts';
import {
  dotEnvOut,
  phpOutput,
  yamlOutput,
} from './util';

// Load package components
async function activate(context: ExtensionContext): Promise<void> {
  context.subscriptions.push(
    commands.registerTextEditorCommand('extension.wordpress-salts.insert', async () => {
      return await insertSalt();
    })
  );
}

async function insertSalt() {
  const textEditor = window.activeTextEditor;
  const scope = textEditor.document.languageId;

  if (!textEditor) {
    return;
  }

  const { jsonIndentation, saltLength } = await getConfig('wordpress-salts');

  const salts = wpSalts('', saltLength);
  let output = '';

  switch (scope) {
    case 'dotenv':
    case 'env':
      output = dotEnvOut(salts);
      break;

    case 'json':
      output = JSON.stringify(salts, null, jsonIndentation);
      break;

    case 'php':
      output = await phpOutput(salts);
      break;

    case 'yaml':
      output = yamlOutput(salts);
      break;

    default:
      break;
  }

  insertText(output);
}

export { activate };
