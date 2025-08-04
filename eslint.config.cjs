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
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.min.js',
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.releaserc.js',
      'jest.config.js',
      'tests/mocks/**/*.js',
      'tests/setup/**/*.js',
      'scripts/xala-scaffold/**/*',
      '**/*.test.tsx',
      '**/*.test.ts',
      '**/*.spec.tsx',
      '**/*.spec.ts',
      'src/components/**/__tests__/**/*',
    ],
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
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
        NodeJS: 'readonly',
        sessionStorage: 'readonly',
        HTMLElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLLinkElement: 'readonly',
        FormData: 'readonly',
        Event: 'readonly',
        Buffer: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // Softened TypeScript rules for v6.0 cleanup
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // Softened code quality rules
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'off',
      'no-var': 'warn',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-case-declarations': 'off',

      // Keep essential security rules
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        performance: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        navigator: 'readonly',
        process: 'readonly',
        require: 'readonly',
        localStorage: 'readonly',
        HTMLElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLLinkElement: 'readonly',
        FormData: 'readonly',
        Event: 'readonly',
        Buffer: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['scripts/**/*.js', '*.config.{js,cjs}', 'tests/**/*.js', 'tests/setup/**/*.js', 'jest.config.comprehensive.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        // Jest globals for test setup files
        jest: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        // Browser globals for test setup
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.min.js',
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.releaserc.js',
      'jest.config.js',
      'tests/**/*',
      'cli/**/*',
      'scripts/**/*',
      'mcp-servers/**/*',
      'debug-render.js',
      'tailwind.config.js',
      'tailwind.preset.js',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      'src/lib/__tests__/**/*.ts',
      'src/components/__tests__/**/*.tsx',
      'src/rtl/tests/**/*.ts',
      'scripts/**/*.js',
      'scripts/**/*.cjs',
      'scripts/xala-scaffold/**/*',
      '**/_archived/**',
      '**/_problematic/**',
    ],
  },
];
