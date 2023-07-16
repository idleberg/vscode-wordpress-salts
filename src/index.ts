'use strict';

import { commands, ExtensionContext, window } from 'vscode';
import { getConfig } from 'vscode-get-config';
import { insertText } from 'vscode-insert-text';
import { reporter, sendTelemetryEvent } from './telemetry';
import { wpSalts } from 'wp-salts';
import {
  dotEnvOut,
  phpOutput,
  yamlOutput
} from './util';

// Load package components
async function activate(context: ExtensionContext): Promise<void> {
  const { disableTelemetry } = await getConfig('wordpress-salts');

  if (disableTelemetry === false) {
    context.subscriptions.push(reporter);
  }

  context.subscriptions.push(
    commands.registerTextEditorCommand('extension.wordpress-salts.insert', async () => {
      return await insertSalt();
    })
  );
}

async function insertSalt() {
  const textEditor = window.activeTextEditor;

  if (!textEditor) {
    return;
  }

  const scope = textEditor.document.languageId;
  const { jsonIndentation, saltLength } = await getConfig('wordpress-salts');

  const salts = wpSalts(null, saltLength);
  let output = '';

  sendTelemetryEvent('insertSalt', {
    fileType: scope
  })

  switch (scope) {
    case 'dotenv':
    case 'env':
      output = dotEnvOut(salts);
      break;

    case 'json':
    case 'json5':
    case 'jsonc':
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

  if (output?.length) {
    insertText(output);
  }
}

export { activate };
