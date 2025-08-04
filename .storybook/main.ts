/**
 * @fileoverview Storybook Main Configuration - Enterprise UI System v6.0.0
 * @description Production-ready Storybook setup with Norwegian compliance and accessibility
 * @version 6.0.0
 * @compliance WCAG AAA, SSR-Safe, Norwegian Standards
 */

import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  // Story file patterns - organized by enterprise architecture
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  // Essential addons for enterprise UI system
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'), // WCAG AAA compliance
    getAbsolutePath('@storybook/addon-viewport'), // Responsive testing
    getAbsolutePath('@storybook/addon-backgrounds'), // Theme testing
    getAbsolutePath('@storybook/addon-docs'), // Documentation
    getAbsolutePath('@storybook/addon-controls'), // Interactive controls
    getAbsolutePath('@storybook/addon-actions'), // Event handling
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      // Vite configuration for optimal performance
      builder: {
        viteConfigPath: undefined, // Use default Vite config
      },
    },
  },

  // TypeScript configuration for strict compliance
  typescript: {
    check: true, // Enable TypeScript checking
    checkOptions: {
      typescript: {
        configFile: '../tsconfig.json',
      },
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Enhanced prop extraction for documentation
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        // Filter out props from node_modules except for our enterprise standards
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules') ||
                 prop.parent.fileName.includes('@xala-technologies');
        }
        return true;
      },
    },
  },

  // Vite-specific configuration for enterprise setup
  viteFinal: async (config) => {
    // Ensure path aliases match the main project
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': join(__dirname, '../src'),
      '@/components': join(__dirname, '../src/components'),
      '@/types': join(__dirname, '../src/types'),
      '@/utils': join(__dirname, '../src/utils'),
      '@/tokens': join(__dirname, '../src/tokens'),
      '@/lib': join(__dirname, '../src/lib'),
    };

    // Handle CSS imports for design tokens
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    };

    // Optimize for SSR compatibility
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    };

    return config;
  },

  // Features configuration for enterprise compliance
  features: {
    // Enhanced build performance
    buildStoriesJson: true,
    // Modern story indexing
    storyStoreV7: true,
  },

  // Documentation settings for enterprise standards
  docs: {
    autodocs: 'tag', // Generate docs for tagged stories
    defaultName: 'Documentation',
  },

  // Static directories for enterprise assets
  staticDirs: ['../src/styles', '../public'],

  // Core configuration
  core: {
    disableTelemetry: true, // Enterprise privacy compliance
  },

  // Environment variables for Norwegian compliance
  env: (config) => ({
    ...config,
    STORYBOOK_THEME: 'enterprise',
    NORWEGIAN_COMPLIANCE: 'true',
    WCAG_LEVEL: 'AAA',
  }),
};

export default config;