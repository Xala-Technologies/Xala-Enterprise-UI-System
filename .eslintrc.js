module.exports = {
  "extends": [
    "./node_modules/@xala-technologies/enterprise-standards/configs/eslint/base.cjs"
  ],
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "es2020": true,
    "jest": true
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    }
  },
  "rules": {
    // Enterprise security rules
    "security/detect-object-injection": "error",
    "security/detect-non-literal-fs-filename": "error",
    "security/detect-non-literal-regexp": "error",
    "security/detect-unsafe-regex": "error",
    "security/detect-eval-with-expression": "error"
  },
  "overrides": [
    {
      "files": ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
      "env": {
        "jest": true
      },
      "rules": {
        "@typescript-eslint/no-explicit-any": "off" // Allow any in tests for mocking
      }
    },
    {
      "files": ["scripts/**/*.js"],
      "env": {
        "node": true
      },
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ]
};