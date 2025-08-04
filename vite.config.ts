/**
 * @fileoverview Vite Configuration for UI System
 * @description Build configuration for Storybook and library bundling
 * @version 6.0.0
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/types': resolve(__dirname, './src/types'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/tokens': resolve(__dirname, './src/tokens'),
      '@/lib': resolve(__dirname, './src/lib'),
    },
  },
  
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'XalaUISystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `ui-system.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    minify: 'terser',
  },
  
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  
  server: {
    port: 3000,
    open: true,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'class-variance-authority', 'clsx'],
  },
});