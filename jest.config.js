/**
 * Jest Configuration for UI System Library
 * Extends @xala-technologies/enterprise-standards library configuration
 * with React/JSX support for component testing
 */

const libraryConfig = require('@xala-technologies/enterprise-standards/configs/jest/library.cjs');

module.exports = {
  ...libraryConfig,

  // Override test environment for React components
  testEnvironment: 'jsdom',

  // Add React setup
  setupFilesAfterEnv: [...libraryConfig.setupFilesAfterEnv, '<rootDir>/tests/setup/jest.setup.js'],

  // Add JSX transformation
  transform: {
    ...libraryConfig.transform,
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'ESNext',
          target: 'ES2022',
          jsx: 'react-jsx',
        },
      },
    ],
  },

  // Add module name mapping for CSS and static assets
  moduleNameMapper: {
    ...libraryConfig.moduleNameMapper,
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/tests/__mocks__/image.js',
  },

  // UI System specific test patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx}',
    '<rootDir>/tests/**/*.{test,spec}.{ts,tsx}',
  ],

  // Coverage configuration for UI components
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/index.ts',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
  ],

  // Higher coverage thresholds for UI system
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
