module.exports = {
  "preset": "ts-jest",
  "testEnvironment": "node",
  "extensionsToTreatAsEsm": [
    ".ts"
  ],
  "globals": {
    "ts-jest": {
      "useESM": true
    }
  },
  "moduleNameMapping": {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 95,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
    "!src/**/index.ts"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{ts,tsx}"
  ],
  "verbose": true,
  "testTimeout": 10000,
  "maxWorkers": "50%"
};