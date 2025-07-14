module.exports = {
  "extends": [
    "./node_modules/@xala-technologies/enterprise-standards/configs/eslint/base.cjs"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "env": {
    "browser": true,
    "node": true,
    "es2022": true
  },
  "globals": {
    "JSX": true,
    "NodeJS": true
  },
  "rules": {
    "security/detect-object-injection": "error",
    "security/detect-non-literal-fs-filename": "error",
    "security/detect-non-literal-regexp": "error",
    "security/detect-unsafe-regex": "error",
    "security/detect-eval-with-expression": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
  }
};