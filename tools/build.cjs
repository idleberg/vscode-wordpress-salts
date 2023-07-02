const isDevMode = process.env.ESBUILD_WATCH === 'development';

/* eslint-disable @typescript-eslint/no-var-requires */
require('esbuild')
  .build({
    bundle: true,
    entryPoints: ['src/index.ts'],
    external: ['vscode'],
    minify: !isDevMode,
    outfile: 'lib/extension.js',
    platform: 'node',
    sourcemap: !isDevMode,
    watch: isDevMode
  }).catch(() => process.exit(1))
