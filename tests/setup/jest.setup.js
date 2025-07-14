/**
 * Jest Setup for @xala-mock/ui-system
 * Main testing configuration with React Testing Library and Norwegian compliance
 */

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
// import { server } from '../mocks/server';

// Configure React Testing Library
configure({
  // Norwegian accessibility: Prefer accessible queries
  defaultHidden: true,
  
  // Norwegian government forms require strict form testing
  getByLabelText: {
    exact: false,
    trim: true,
    collapseWhitespace: true
  },
  
  // Timeout for Norwegian government slow systems
  asyncUtilTimeout: 5000,
  
  // Show helpful error messages in Norwegian if needed
  showOriginalStackTrace: true
});

// Global test utilities for Norwegian compliance
global.norwegianTestUtils = {
  // NSM Classification levels
  classifications: ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'],
  
  // Norwegian locales for testing
  locales: ['nb-NO', 'nn-NO', 'en-NO'],
  
  // WCAG compliance testing helpers
  wcag: {
    minimumContrastRatio: 4.5,
    minimumTouchTargetSize: 44,
    requiredAriaAttributes: ['aria-label', 'aria-describedby', 'role']
  },
  
  // Norwegian government testing constants
  government: {
    municipalityCodes: ['0301', '1103', '5001'], // Oslo, Stavanger, Trondheim
    organizationNumberPattern: /^\d{9}$/,
    personalNumberPattern: /^[0-3]\d[01]\d\d{5}$/,
    brregApiBaseUrl: 'https://data.brreg.no/enhetsregisteret/api'
  },
  
  // Design token validation
  designTokens: {
    colorVarPattern: /var\(--color-[\w-]+\)/,
    spacingVarPattern: /var\(--spacing-[\w-]+\)/,
    fontVarPattern: /var\(--font-[\w-]+\)/
  }
};

// Norwegian text validation helper
global.validateNorwegianText = (text) => {
  // Check for Norwegian characters
  const norwegianChars = /[æøåÆØÅ]/;
  const hasNorwegianChars = norwegianChars.test(text);
  
  // Check for common Norwegian words
  const norwegianWords = ['og', 'eller', 'med', 'uten', 'til', 'fra', 'av', 'på', 'i', 'for'];
  const hasNorwegianWords = norwegianWords.some(word => 
    text.toLowerCase().includes(` ${word} `) || 
    text.toLowerCase().startsWith(`${word} `) ||
    text.toLowerCase().endsWith(` ${word}`)
  );
  
  return hasNorwegianChars || hasNorwegianWords;
};

// Classification level validation
global.validateClassificationLevel = (level) => {
  return global.norwegianTestUtils.classifications.includes(level);
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

// Setup MSW (Mock Service Worker) for API mocking
// beforeAll(() => {
//   // Start the MSW server for mocking Norwegian APIs
//   server.listen({
//     onUnhandledRequest: 'warn'
//   });
// });

// afterEach(() => {
//   // Reset any request handlers that are declared as a part of our tests
//   server.resetHandlers();
// });

// afterAll(() => {
//   // Clean up after all tests
//   server.close();
// });

// Norwegian compliance: Test environment validation
beforeAll(() => {
  // Ensure test environment has Norwegian locale support
  try {
    new Intl.DateTimeFormat('nb-NO');
    new Intl.NumberFormat('nb-NO');
  } catch (error) {
    console.warn('Norwegian locale support not available in test environment');
  }
  
  // Validate required testing globals
  const requiredGlobals = [
    'NORWEGIAN_LOCALE',
    'NSM_CLASSIFICATION_LEVELS',
    'WCAG_COMPLIANCE_LEVEL'
  ];
  
  for (const globalVar of requiredGlobals) {
    if (!(globalVar in global)) {
      console.warn(`Missing required testing global: ${globalVar}`);
    }
  }
});

// Global test helpers for Norwegian components
global.testHelpers = {
  // Render component with Norwegian context
  renderWithNorwegianContext: (ui, options = {}) => {
    const { render } = require('@testing-library/react');
    
    const AllTheProviders = ({ children }) => {
      return (
        <div 
          data-testid="norwegian-context"
          data-locale="nb-NO"
          data-classification="ÅPEN"
          data-municipality="0301"
        >
          {children}
        </div>
      );
    };
    
    return render(ui, { wrapper: AllTheProviders, ...options });
  },
  
  // Get element with Norwegian accessibility validation
  getByNorwegianLabel: (container, labelText) => {
    const { getByLabelText } = require('@testing-library/react');
    
    try {
      return getByLabelText(container, labelText);
    } catch (error) {
      // Try Norwegian alternative texts
      const norwegianAlternatives = {
        'Name': ['Navn', 'Fullt navn'],
        'Email': ['E-post', 'E-postadresse'],
        'Phone': ['Telefon', 'Telefonnummer'],
        'Address': ['Adresse', 'Postadresse'],
        'Save': ['Lagre', 'Bekreft'],
        'Cancel': ['Avbryt', 'Lukk'],
        'Submit': ['Send inn', 'Bekreft'],
        'Search': ['Søk', 'Finn']
      };
      
      const alternatives = norwegianAlternatives[labelText] || [];
      for (const alt of alternatives) {
        try {
          return getByLabelText(container, alt);
        } catch {
          // Continue to next alternative
        }
      }
      
      throw error;
    }
  },
  
  // Validate design token usage
  validateDesignTokenUsage: (element) => {
    const styles = window.getComputedStyle(element);
    const cssText = styles.cssText || '';
    
    // Check for hardcoded values that should use tokens
    const hardcodedPatterns = {
      color: /#[0-9a-fA-F]{3,6}/,
      spacing: /\d+px/,
      font: /Arial|Helvetica|Times/
    };
    
    const violations = [];
    for (const [property, pattern] of Object.entries(hardcodedPatterns)) {
      if (pattern.test(cssText)) {
        violations.push(`Hardcoded ${property} detected, should use design tokens`);
      }
    }
    
    return violations;
  },
  
  // Mock Norwegian government APIs
  mockNorwegianAPIs: () => {
    // Mock BRREG API
    global.fetch = jest.fn((url) => {
      if (url.includes('data.brreg.no')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            organisasjonsnummer: '123456789',
            navn: 'Test Organisasjon AS',
            organisasjonsform: {
              kode: 'AS',
              beskrivelse: 'Aksjeselskap'
            },
            postadresse: {
              land: 'Norge',
              landkode: 'NO',
              postnummer: '0150',
              poststed: 'OSLO',
              adresse: ['Testgata 1']
            }
          })
        });
      }
      
      // Mock ID-porten
      if (url.includes('idporten.no')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            sub: 'test-user-id',
            pid: '12345678901',
            locale: 'nb'
          })
        });
      }
      
      return Promise.reject(new Error('Unmocked API call'));
    });
  }
};

// Custom matchers for Norwegian compliance testing
expect.extend({
  toHaveNorwegianCompliance(received) {
    const pass = received.getAttribute('data-norwegian-compliant') === 'true' ||
                 received.getAttribute('data-classification') !== null ||
                 received.getAttribute('lang') === 'nb-NO';
                 
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to have Norwegian compliance attributes`,
      pass
    };
  },
  
  toHaveAccessibleTouchTarget(received) {
    const styles = window.getComputedStyle(received);
    const width = parseInt(styles.width, 10);
    const height = parseInt(styles.height, 10);
    const minSize = global.MINIMUM_TOUCH_TARGET_SIZE || 44;
    
    const pass = width >= minSize && height >= minSize;
    
    return {
      message: () => `expected element to have minimum touch target size of ${minSize}px (got ${width}x${height})`,
      pass
    };
  },
  
  toUseDesignTokens(received) {
    const styles = window.getComputedStyle(received);
    const cssText = styles.cssText || '';
    
    // Check for CSS custom properties (design tokens)
    const hasTokens = /var\(--[\w-]+\)/.test(cssText);
    
    return {
      message: () => `expected element ${hasTokens ? 'not ' : ''}to use design tokens`,
      pass: hasTokens
    };
  }
});

// Suppress specific warnings in test environment
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('componentWillReceiveProps') ||
     args[0].includes('componentWillMount'))
  ) {
    return;
  }
  originalWarn.apply(console, args);
}; 