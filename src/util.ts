import { workspace } from 'vscode';

const getLongestString = (input: string[]) => {
  const map = input.map( (x: string) => x.length);
  const max = map.indexOf(Math.max(...map));

  return input[max];
};

const dotEnvOut = (salts: string[]): string => {
  const output: Array<string> = [];

  Object.keys(salts).map(key => {
    output.push(`${key}='${salts[key]}'`);
  });

  return output.join('\n');
};

const phpOutput = (salts: string[]): string => {
  const maxLength = getLongestString(Object.keys(salts)).length;
  const output: Array<string> = [];

  Object.keys(salts).map(key => {
    const whitespace = (getConfig('alignPHP')) ? ' '.repeat(maxLength - key.length) : '';

    output.push(`define('${key}', ${whitespace}'${salts[key]}');`);
  });

  return output.join('\n');
};

const yamlOutput = (salts: string[]): string => {
  const output: Array<string> = [];

  Object.keys(salts).map(key => {
    output.push(`${key.toLowerCase()}: "${salts[key]}"`);
  });

  return output.join('\n');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getConfig = (key: string | undefined): any => {
  if (key && key.length) {
    return workspace.getConfiguration('wordpress-salts')[key];
  }

  return workspace.getConfiguration('wordpress-salts');
};

export {
  dotEnvOut,
  phpOutput,
  yamlOutput,
  getConfig
};
