import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      /**
       * 👈 THE ULTIMATE FIX: 
       * We point the alias EXACTLY to the index.js file.
       * This removes any guesswork for Vite.
       */
      '@ethio-buna/shared': path.resolve(__dirname, '../../packages/shared/index.js'),
    },
  },
  server: {
    port: 3001,
    fs: {
      /**
       * 👈 CRITICAL FOR MONOREPOS:
       * Allow Vite to access files outside the apps/admin folder.
       * '..' allows it to go up to the /apps folder.
       * '../..' allows it to go up to the ROOT folder.
       */
      allow: ['..', '../../packages/shared', '../../node_modules'],
    },
  },
});