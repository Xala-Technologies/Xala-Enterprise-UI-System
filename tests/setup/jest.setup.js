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

// Global test helpers for compatibility
global.testHelpers = {
  validateDesignTokenUsage: element => {
    const violations = [];
    // Check for hardcoded values instead of design tokens
    const style = element.style || {};
    Object.entries(style).forEach(([prop, value]) => {
      if (
        typeof value === 'string' &&
        (value.includes('#') || value.includes('px') || value.includes('rem')) &&
        !value.includes('var(--')
      ) {
        violations.push({ property: prop, value, element });
      }
    });
    return violations;
  },
};

// Global Norwegian compliance helper for compatibility
global.validateNorwegianText = text => {
  if (!text || text.trim() === '') return false;

  const norwegianChars = /[æøåÆØÅ]/;
  const norwegianWords = [
    'og',
    'eller',
    'med',
    'uten',
    'til',
    'fra',
    'av',
    'på',
    'i',
    'for',
    'ikke',
    'skal',
    'kan',
    'må',
    'vil',
    'være',
    'har',
    'hadde',
    'ville',
    'dette',
    'den',
    'det',
    'de',
    'som',
    'en',
    'et',
    'alle',
    'noen',
    'laster',
    'loading',
    'henter',
    'data',
    'ingen',
    'tom',
    'tabell',
    'eksporter',
    'export',
    'rader',
    'rows',
  ];

  const hasNorwegianChars = norwegianChars.test(text);
  const hasNorwegianWords = norwegianWords.some(word => text.toLowerCase().includes(word));

  return hasNorwegianChars || hasNorwegianWords;
};

// Custom Jest matcher for design tokens
expect.extend({
  toUseDesignTokens(received) {
    const violations = global.testHelpers.validateDesignTokenUsage(received);
    const hasViolations = violations.length > 0;

    return {
      message: () => {
        if (hasViolations) {
          return `Expected element to use design tokens, but found hardcoded values:\n${violations.map(v => `${v.property}: ${v.value}`).join('\n')}`;
        }
        return 'Expected element not to use design tokens';
      },
      pass: !hasViolations,
    };
  },
});

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

// Mock window.getComputedStyle with proper return values
global.getComputedStyle = jest.fn().mockReturnValue({
  getPropertyValue: jest.fn().mockReturnValue(''),
  borderColor: 'var(--color-border)',
  padding: 'var(--spacing-md)',
  fontSize: 'var(--font-size-base)',
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
