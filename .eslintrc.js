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
    
    // Very relaxed TypeScript rules for v6.0 cleanup
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/prefer-as-const": "off",
    
    // Very relaxed general rules
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-console": "off",
    "prefer-const": "off",
    "no-case-declarations": "off",
    "no-fallthrough": "off",
    
    // React specific relaxations
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/no-unescaped-entities": "off",
    
    // Import relaxations
    "import/no-unresolved": "off",
    "import/named": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off"
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