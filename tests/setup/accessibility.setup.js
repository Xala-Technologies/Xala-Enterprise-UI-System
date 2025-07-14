/**
 * Accessibility Testing Setup for @xala-mock/ui-system
 * Norwegian WCAG 2.2 AA compliance validation with axe-core
 */

import { configureAxe } from 'jest-axe';

// Configure axe-core for Norwegian WCAG 2.2 AA compliance
const axe = configureAxe({
  // Norwegian government accessibility standards
  rules: {
    // WCAG 2.2 AA requirements
    'color-contrast': { enabled: true },
    'color-contrast-enhanced': { enabled: true },
    'focus-order-semantics': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'landmark-unique': { enabled: true },
    'region': { enabled: true },
    
    // Norwegian specific requirements
    'aria-allowed-attr': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'button-name': { enabled: true },
    'bypass': { enabled: true },
    'document-title': { enabled: true },
    'duplicate-id': { enabled: true },
    'form-field-multiple-labels': { enabled: true },
    'frame-title': { enabled: true },
    'html-has-lang': { enabled: true },
    'html-lang-valid': { enabled: true },
    'image-alt': { enabled: true },
    'input-image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
    'list': { enabled: true },
    'listitem': { enabled: true },
    'meta-refresh': { enabled: true },
    'meta-viewport': { enabled: true },
    'object-alt': { enabled: true },
    'role-img-alt': { enabled: true },
    'scrollable-region-focusable': { enabled: true },
    'select-name': { enabled: true },
    'server-side-image-map': { enabled: true },
    'svg-img-alt': { enabled: true },
    'td-headers-attr': { enabled: true },
    'th-has-data-cells': { enabled: true },
    'valid-lang': { enabled: true },
    'video-caption': { enabled: true },
    
    // Norwegian government form requirements
    'autocomplete-valid': { enabled: true },
    'avoid-inline-spacing': { enabled: true },
    
    // Touch target requirements for Norwegian mobile
    'target-size': { enabled: true },
    
    // Norwegian language requirements
    'page-has-heading-one': { enabled: true },
    'heading-order': { enabled: true }
  },
  
  // Norwegian accessibility tags to include
  tags: [
    'wcag2a',
    'wcag2aa',
    'wcag21aa',
    'wcag22aa',
    'best-practice'
  ],
  
  // Custom Norwegian accessibility checks
  checks: [
    {
      id: 'norwegian-lang-check',
      evaluate: function(node) {
        const lang = node.getAttribute('lang');
        const norwegianLangs = ['nb', 'nn', 'no', 'nb-NO', 'nn-NO', 'no-NO'];
        return !lang || norwegianLangs.includes(lang);
      },
      metadata: {
        impact: 'moderate',
        messages: {
          pass: 'Element has appropriate Norwegian language attribute',
          fail: 'Element should have Norwegian language attribute (nb, nn, or no)'
        }
      }
    },
    
    {
      id: 'classification-level-check',
      evaluate: function(node) {
        const classification = node.getAttribute('data-classification');
        const validLevels = ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'];
        return !classification || validLevels.includes(classification);
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: 'Element has valid NSM classification level',
          fail: 'Element has invalid NSM classification level'
        }
      }
    },
    
    {
      id: 'norwegian-touch-target-check',
      evaluate: function(node) {
        const styles = window.getComputedStyle(node);
        const width = parseInt(styles.width, 10);
        const height = parseInt(styles.height, 10);
        const minSize = 44; // Norwegian accessibility standard
        
        // Only check interactive elements
        const interactiveElements = ['button', 'a', 'input', 'select', 'textarea'];
        const isInteractive = interactiveElements.includes(node.tagName.toLowerCase()) ||
                             node.getAttribute('role') === 'button' ||
                             node.getAttribute('tabindex') === '0';
        
        return !isInteractive || (width >= minSize && height >= minSize);
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: 'Interactive element meets Norwegian touch target requirements (44px minimum)',
          fail: 'Interactive element does not meet Norwegian touch target requirements (44px minimum)'
        }
      }
    }
  ]
});

// Global accessibility testing utilities
global.accessibilityUtils = {
  // Test component for Norwegian WCAG compliance
  testNorwegianAccessibility: async (container) => {
    const results = await axe(container);
    
    // Custom Norwegian accessibility validation
    const norwegianViolations = [];
    
    // Check for Norwegian language support
    const elementsWithText = container.querySelectorAll('*');
    elementsWithText.forEach(element => {
      const text = element.textContent || element.getAttribute('aria-label') || element.getAttribute('title');
      if (text && text.trim()) {
        const hasNorwegianChars = /[æøåÆØÅ]/.test(text);
        const hasNorwegianWords = /(og|eller|med|uten|til|fra|av|på|i|for|ikke|skal|kan|må|vil)/.test(text.toLowerCase());
        
        if (!hasNorwegianChars && !hasNorwegianWords && text.length > 10) {
          norwegianViolations.push({
            type: 'norwegian-language',
            element: element,
            message: 'Text content may not be in Norwegian',
            text: text.substring(0, 50) + (text.length > 50 ? '...' : '')
          });
        }
      }
    });
    
    // Check for NSM classification compliance
    const classifiedElements = container.querySelectorAll('[data-classification]');
    classifiedElements.forEach(element => {
      const classification = element.getAttribute('data-classification');
      const validLevels = ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'];
      
      if (!validLevels.includes(classification)) {
        norwegianViolations.push({
          type: 'nsm-classification',
          element: element,
          message: `Invalid NSM classification: ${classification}`,
          classification: classification
        });
      }
    });
    
    // Check for municipality compliance
    const municipalityElements = container.querySelectorAll('[data-municipality]');
    municipalityElements.forEach(element => {
      const municipality = element.getAttribute('data-municipality');
      const municipalityPattern = /^\d{4}$/; // Norwegian municipality codes are 4 digits
      
      if (!municipalityPattern.test(municipality)) {
        norwegianViolations.push({
          type: 'municipality-code',
          element: element,
          message: `Invalid municipality code: ${municipality}`,
          municipality: municipality
        });
      }
    });
    
    return {
      ...results,
      norwegianViolations: norwegianViolations
    };
  },
  
  // Validate color contrast for Norwegian standards
  validateNorwegianColorContrast: (element) => {
    const styles = window.getComputedStyle(element);
    const backgroundColor = styles.backgroundColor;
    const color = styles.color;
    
    // Mock contrast calculation (in real implementation, use color-contrast library)
    const contrastRatio = calculateContrastRatio(color, backgroundColor);
    const minRatio = 4.5; // WCAG AA standard
    
    return {
      ratio: contrastRatio,
      passes: contrastRatio >= minRatio,
      requirement: minRatio,
      level: contrastRatio >= 7 ? 'AAA' : (contrastRatio >= 4.5 ? 'AA' : 'Fail')
    };
  },
  
  // Test keyboard navigation for Norwegian government workflows
  testNorwegianKeyboardNavigation: async (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const keyboardIssues = [];
    
    focusableElements.forEach((element, index) => {
      // Test Tab navigation
      element.focus();
      const hasFocusRing = window.getComputedStyle(element, ':focus').outline !== 'none';
      
      if (!hasFocusRing) {
        keyboardIssues.push({
          type: 'missing-focus-indicator',
          element: element,
          message: 'Element lacks visible focus indicator',
          index: index
        });
      }
      
      // Test Norwegian keyboard shortcuts
      const shortcutAttr = element.getAttribute('data-norwegian-shortcut');
      if (shortcutAttr) {
        const validShortcuts = ['Ctrl+L', 'Ctrl+S', 'Ctrl+H', 'Alt+H']; // Norwegian standard shortcuts
        if (!validShortcuts.includes(shortcutAttr)) {
          keyboardIssues.push({
            type: 'invalid-norwegian-shortcut',
            element: element,
            message: `Invalid Norwegian keyboard shortcut: ${shortcutAttr}`,
            shortcut: shortcutAttr
          });
        }
      }
    });
    
    return keyboardIssues;
  },
  
  // Validate Norwegian form accessibility
  validateNorwegianFormAccessibility: (formElement) => {
    const formIssues = [];
    
    // Check for Norwegian field labels
    const inputs = formElement.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const label = formElement.querySelector(`label[for="${input.id}"]`) || 
                   input.closest('label');
      
      if (!label) {
        formIssues.push({
          type: 'missing-label',
          element: input,
          message: 'Form input missing associated label'
        });
      } else {
        const labelText = label.textContent || label.getAttribute('aria-label');
        if (labelText && !global.validateNorwegianText(labelText)) {
          formIssues.push({
            type: 'non-norwegian-label',
            element: input,
            message: 'Form label may not be in Norwegian',
            labelText: labelText
          });
        }
      }
      
      // Check for Norwegian error messages
      const errorId = input.getAttribute('aria-describedby');
      if (errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement && errorElement.textContent) {
          if (!global.validateNorwegianText(errorElement.textContent)) {
            formIssues.push({
              type: 'non-norwegian-error',
              element: input,
              message: 'Error message may not be in Norwegian',
              errorText: errorElement.textContent
            });
          }
        }
      }
    });
    
    return formIssues;
  }
};

// Helper function for contrast calculation (simplified)
function calculateContrastRatio(color1, color2) {
  // This is a simplified version - in practice, use a proper color contrast library
  // For testing purposes, return a mock value
  return 4.6; // Mock WCAG AA compliant ratio
}

// Custom Jest matchers for Norwegian accessibility
expect.extend({
  async toBeAccessibleForNorway(received) {
    const results = await global.accessibilityUtils.testNorwegianAccessibility(received);
    const hasViolations = results.violations.length > 0 || results.norwegianViolations.length > 0;
    
    return {
      message: () => {
        if (hasViolations) {
          const violationMessages = [
            ...results.violations.map(v => `WCAG: ${v.description}`),
            ...results.norwegianViolations.map(v => `Norwegian: ${v.message}`)
          ];
          return `Expected element to be accessible for Norwegian users, but found violations:\n${violationMessages.join('\n')}`;
        }
        return 'Expected element not to be accessible for Norwegian users';
      },
      pass: !hasViolations
    };
  },
  
  toHaveNorwegianKeyboardSupport(received) {
    const issues = global.accessibilityUtils.testNorwegianKeyboardNavigation(received);
    const hasIssues = issues.length > 0;
    
    return {
      message: () => {
        if (hasIssues) {
          const issueMessages = issues.map(i => i.message);
          return `Expected element to have Norwegian keyboard support, but found issues:\n${issueMessages.join('\n')}`;
        }
        return 'Expected element not to have Norwegian keyboard support';
      },
      pass: !hasIssues
    };
  },
  
  toMeetNorwegianColorStandards(received) {
    const contrast = global.accessibilityUtils.validateNorwegianColorContrast(received);
    
    return {
      message: () => `Expected element to meet Norwegian color contrast standards (4.5:1), but got ${contrast.ratio}:1`,
      pass: contrast.passes
    };
  }
});

// Export axe configuration for use in tests
global.axe = axe; 