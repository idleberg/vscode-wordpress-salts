import { getConfig } from 'vscode-get-config';
import TelemetryReporter, { type TelemetryEventProperties, type TelemetryEventMeasurements } from '@vscode/extension-telemetry';

function stringifyProperties(properties: Record<string, unknown>): TelemetryEventProperties {
  const newProperties = {};
  Object.entries(properties).map(([key, value]) => newProperties[key] = value.toString());

  return newProperties;
}

export async function sendTelemetryEvent(name: string, properties: Record<string, unknown> = {}, measurements: TelemetryEventMeasurements = {}) {
  const { disableTelemetry } = await getConfig('wordpress-salts');

  if (disableTelemetry) {
    return;
  }

  reporter.sendTelemetryEvent(name, stringifyProperties(properties), measurements);
}

export const reporter = new TelemetryReporter('3ded993e-9f23-475c-b65d-65c99828eb6f');
