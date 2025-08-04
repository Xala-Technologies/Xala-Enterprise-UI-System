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
    "node": true,
    "es2022": true,
    "jest": true
  },
  "globals": {
    "JSX": true,
    "NodeJS": true,
    "React": "readonly"
  },
  "rules": {
    // Security rules (keep essential)
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-eval-with-expression": "error",
    
    // Relaxed TypeScript rules
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    
    // Relaxed general rules
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "no-undef": "off",
    "no-console": "warn",
    "prefer-const": "warn",
    
    // React specific relaxations
    "react/prop-types": "off",
    "react/display-name": "warn",
    "react-hooks/exhaustive-deps": "warn",
    
    // Import relaxations
    "import/no-unresolved": "warn",
    "import/named": "warn"
  },
  "overrides": [
    {
      "files": ["**/*.test.ts", "**/*.test.tsx", "**/__tests__/**/*"],
      "env": {
        "jest": true
      }
    }
  ]
};