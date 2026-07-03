import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js'),
  },
  resolve: {
    alias: {
      '@ethio-buna/shared': path.resolve(
        __dirname,
        '../../packages/shared/index.js',
      ),
    },
  },
  server: {
    port: 3000,
    fs: {
      allow: ['..', '../../packages/shared', '../../node_modules'],
    },
  },
  root: path.resolve(__dirname),
});
