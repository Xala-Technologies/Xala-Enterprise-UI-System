/**
 * @fileoverview ESLint Configuration - Enterprise Standards Compliant
 * @description Modern ESLint configuration using the new flat config format
 * @version 3.0.0
 * @compliance Enterprise Standards, WCAG 2.2 AAA, NSM, DigDir
 */

const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // Core TypeScript rules for enterprise standards
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'error',

      // Code quality
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
    },
  },
  {
    files: ['*.js', '*.cjs', '*.mjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.min.js',
      '*.config.js',
      'jest.config.js',
      '.eslintrc.js',
      '.eslintrc.cjs',
    ],
  },
];
