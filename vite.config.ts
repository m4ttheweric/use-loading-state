/// <reference types="vitest" />

import fs from 'fs';
import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
    }),
    {
      name: 'copy-css-to-dist',
      apply: 'build',
      closeBundle() {
        const cssSource = path.resolve(__dirname, 'lib/css/styles.css');
        const cssDestination = path.resolve(__dirname, 'dist/styles.css');
        fs.copyFileSync(cssSource, cssDestination);
      },
    },
  ],
  define: {
    // this allows the package version to be printed in in the code
    GLOBALS: {
      packageVersion: version,
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es', 'cjs'], // Build both ES and CommonJS
      fileName: format => {
        console.log('format:', format);
        return format === 'es' ? 'main.mjs' : 'main.cjs';
      },
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['lib/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
