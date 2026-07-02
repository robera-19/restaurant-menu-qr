import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
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
});
