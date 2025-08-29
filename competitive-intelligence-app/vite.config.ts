import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    lib: {
      entry: resolve(__dirname, 'src/main.jsx'),
      name: 'CompetitiveIntelligenceApp',
      formats: ['iife'],
      fileName: () => 'competitive-intelligence-app.js'
    },
    rollupOptions: {
      output: {
        extend: true
      }
    }
  }
});


