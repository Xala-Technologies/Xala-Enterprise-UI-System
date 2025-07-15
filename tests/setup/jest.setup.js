/**
 * Jest Setup for UI System Library
 * Enterprise-compliant testing configuration following @xala-technologies/enterprise-standards
 */

require('@testing-library/jest-dom');
const { configure } = require('@testing-library/react');

// Configure React Testing Library
configure({
  // Accessibility: Prefer accessible queries
  defaultHidden: true,

  // Forms require strict testing
  getByLabelText: {
    exact: false,
    trim: true,
    collapseWhitespace: true,
  },

  // Timeout for slow systems
  asyncUtilTimeout: 5000,

  // Show helpful error messages
  showOriginalStackTrace: true,
});

// Global test utilities
global.testUtils = {
  // WCAG compliance testing helpers
  wcag: {
    minimumContrastRatio: 4.5,
    minimumTouchTargetSize: 44,
    requiredAriaAttributes: ['aria-label', 'aria-describedby', 'role'],
  },

  // Design token validation
  designTokens: {
    colorVarPattern: /var\(--color-[\w-]+\)/,
    spacingVarPattern: /var\(--spacing-[\w-]+\)/,
    fontVarPattern: /var\(--font-[\w-]+\)/,
  },
};

// Mock console for cleaner test output
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is deprecated') ||
        args[0].includes('Warning: componentWillReceiveProps') ||
        args[0].includes('act(') ||
        args[0].includes('useLayoutEffect does nothing on the server'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue(''),
  },
  writable: true,
});

// Mock window.getComputedStyle
global.getComputedStyle = jest.fn().mockReturnValue({
  getPropertyValue: jest.fn().mockReturnValue(''),
});

// Enterprise logger mock
jest.mock('@xala-technologies/enterprise-standards', () => ({
  Logger: {
    create: jest.fn(() => ({
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn(),
      audit: jest.fn(),
      child: jest.fn(),
      clearLogs: jest.fn(),
    })),
  },
}));

// Global test helpers
global.testHelpers = {
  validateDesignTokenUsage: (element) => {
    const violations = [];
    // Check for hardcoded values instead of design tokens
    const style = element.style || {};
    Object.entries(style).forEach(([prop, value]) => {
      if (typeof value === 'string' && 
          (value.includes('#') || value.includes('px') || value.includes('rem')) &&
          !value.includes('var(--')) {
        violations.push({ property: prop, value, element });
      }
    });
    return violations;
  }
};
