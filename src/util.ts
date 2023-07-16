import { getConfig } from 'vscode-get-config';

const getLongestString = (input: string[]) => {
  const map = input.map( (x: string) => x.length);
  const max = map.indexOf(Math.max(...map));

  return input[max];
};

function dotEnvOut(salts: Record<string, string>): string {
  const output: Array<string> = [];

  Object.keys(salts).map(key => {
    output.push(`${key}='${salts[key]}'`);
  });

  return output.join('\n');
}

async function phpOutput(salts: Record<string, string>): Promise<string> {
  const maxLength = getLongestString(Object.keys(salts)).length;
  const alignPHP = await getConfig('wordpress-salts.alignPHP')
  const output: Array<string> = [];

  Object.keys(salts).map(key => {
    const whitespace = alignPHP
      ? ' '.repeat(maxLength - key.length)
      : '';

    output.push(`define('${key}', ${whitespace}'${salts[key]}');`);
  });

  return output.join('\n');
}

function yamlOutput(salts: Record<string, string>): string {
  const output: Array<string> = [];

  Object.keys(salts).map(key => {
    output.push(`${key.toLowerCase()}: "${salts[key]}"`);
  });

  return output.join('\n');
}

export {
  dotEnvOut,
  phpOutput,
  yamlOutput
};
