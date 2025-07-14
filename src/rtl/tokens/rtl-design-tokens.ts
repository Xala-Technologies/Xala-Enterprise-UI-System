// RTL Design Tokens for @xala-mock/ui-system
// Right-to-left language support with Norwegian testing capabilities

import type { RTLDesignTokens, TextDirection } from '../../types/localization.types';

// RTL-aware spacing tokens
export const RTL_SPACING_TOKENS = {
  // Logical properties for RTL support
  marginStart: {
    ltr: 'margin-left',
    rtl: 'margin-right',
    token: 'var(--spacing-margin-start)',
  },
  marginEnd: {
    ltr: 'margin-right',
    rtl: 'margin-left',
    token: 'var(--spacing-margin-end)',
  },
  paddingStart: {
    ltr: 'padding-left',
    rtl: 'padding-right',
    token: 'var(--spacing-padding-start)',
  },
  paddingEnd: {
    ltr: 'padding-right',
    rtl: 'padding-left',
    token: 'var(--spacing-padding-end)',
  },
  borderStartWidth: {
    ltr: 'border-left-width',
    rtl: 'border-right-width',
    token: 'var(--border-start-width)',
  },
  borderEndWidth: {
    ltr: 'border-right-width',
    rtl: 'border-left-width',
    token: 'var(--border-end-width)',
  },
};

// RTL-aware positioning tokens
export const RTL_POSITION_TOKENS = {
  start: {
    ltr: 'left',
    rtl: 'right',
    token: 'var(--position-start)',
  },
  end: {
    ltr: 'right',
    rtl: 'left',
    token: 'var(--position-end)',
  },
  textAlign: {
    start: {
      ltr: 'left',
      rtl: 'right',
    },
    end: {
      ltr: 'right',
      rtl: 'left',
    },
  },
};

// RTL-aware typography tokens
export const RTL_TYPOGRAPHY_TOKENS = {
  direction: {
    ltr: 'ltr',
    rtl: 'rtl',
    token: 'var(--text-direction)',
  },
  unicodeBidi: {
    normal: 'normal',
    embed: 'embed',
    isolate: 'isolate',
    token: 'var(--unicode-bidi)',
  },
};

// Generate RTL design tokens for a specific direction
export const generateRTLTokens = (direction: TextDirection): RTLDesignTokens => {
  return {
    spacing: {
      marginStart:
        direction === 'rtl' ? 'var(--spacing-margin-right)' : 'var(--spacing-margin-left)',
      marginEnd: direction === 'rtl' ? 'var(--spacing-margin-left)' : 'var(--spacing-margin-right)',
      paddingStart:
        direction === 'rtl' ? 'var(--spacing-padding-right)' : 'var(--spacing-padding-left)',
      paddingEnd:
        direction === 'rtl' ? 'var(--spacing-padding-left)' : 'var(--spacing-padding-right)',
    },
    positioning: {
      left: direction === 'rtl' ? 'var(--position-right)' : 'var(--position-left)',
      right: direction === 'rtl' ? 'var(--position-left)' : 'var(--position-right)',
      textAlign: direction === 'rtl' ? 'right' : 'left',
    },
    borders: {
      borderStartWidth:
        direction === 'rtl' ? 'var(--border-right-width)' : 'var(--border-left-width)',
      borderEndWidth:
        direction === 'rtl' ? 'var(--border-left-width)' : 'var(--border-right-width)',
      borderStartColor:
        direction === 'rtl' ? 'var(--border-right-color)' : 'var(--border-left-color)',
      borderEndColor:
        direction === 'rtl' ? 'var(--border-left-color)' : 'var(--border-right-color)',
    },
    typography: {
      direction: direction,
      textAlign: direction === 'rtl' ? 'right' : 'left',
      unicodeBidi: 'isolate',
    },
  };
};

// CSS custom properties for RTL support
export const RTL_CSS_PROPERTIES = `
  /* RTL-aware spacing tokens */
  --spacing-margin-start: var(--spacing-4);
  --spacing-margin-end: var(--spacing-4);
  --spacing-padding-start: var(--spacing-3);
  --spacing-padding-end: var(--spacing-3);
  
  /* RTL-aware positioning tokens */
  --position-start: 0;
  --position-end: auto;
  
  /* RTL-aware border tokens */
  --border-start-width: var(--border-width-1);
  --border-end-width: var(--border-width-1);
  --border-start-color: var(--color-border-default);
  --border-end-color: var(--color-border-default);
  
  /* RTL-aware typography tokens */
  --text-direction: ltr;
  --unicode-bidi: isolate;
  
  /* RTL overrides */
  [dir="rtl"] {
    --text-direction: rtl;
    --position-start: auto;
    --position-end: 0;
  }
  
  /* Logical property support fallbacks */
  .margin-start { 
    margin-left: var(--spacing-margin-start);
    margin-inline-start: var(--spacing-margin-start);
  }
  .margin-end { 
    margin-right: var(--spacing-margin-end);
    margin-inline-end: var(--spacing-margin-end);
  }
  .padding-start { 
    padding-left: var(--spacing-padding-start);
    padding-inline-start: var(--spacing-padding-start);
  }
  .padding-end { 
    padding-right: var(--spacing-padding-end);
    padding-inline-end: var(--spacing-padding-end);
  }
  
  [dir="rtl"] .margin-start {
    margin-left: auto;
    margin-right: var(--spacing-margin-start);
  }
  [dir="rtl"] .margin-end {
    margin-right: auto;
    margin-left: var(--spacing-margin-end);
  }
  [dir="rtl"] .padding-start {
    padding-left: auto;
    padding-right: var(--spacing-padding-start);
  }
  [dir="rtl"] .padding-end {
    padding-right: auto;
    padding-left: var(--spacing-padding-end);
  }
`;

// Norwegian RTL testing utilities
export const NORWEGIAN_RTL_TESTING = {
  // Test Norwegian interface in RTL mode for accessibility testing
  testStrings: {
    'nb-NO': [
      'Dette er en test av norsk tekst i RTL-modus',
      'Fødselsnummer: 12345678901',
      'Organisasjonsnummer: 123456789',
      'E-postadresse: test@example.no',
    ],
    'nn-NO': [
      'Dette er ein test av norsk tekst i RTL-modus',
      'Fødselsnummer: 12345678901',
      'Organisasjonsnummer: 123456789',
      'E-postadresse: test@example.no',
    ],
  },

  // Mixed language testing (Norwegian + Arabic/Hebrew)
  mixedLanguageTests: {
    norwegianArabic: ['Velkommen مرحبا til Norge', 'Fødselsnummer رقم الهوية: 12345678901'],
    norwegianHebrew: ['Velkommen ברוכים הבאים til Norge', 'Fødselsnummer מספר זהות: 12345678901'],
  },

  // RTL form field testing
  formFieldTests: {
    labels: {
      ltr: 'Fødselsnummer:',
      rtl: ':رقم الهوية',
    },
    placeholders: {
      ltr: 'Skriv inn fødselsnummer',
      rtl: 'أدخل رقم الهوية',
    },
  },
};

// RTL component utilities
export const RTL_COMPONENT_UTILITIES = {
  // Get appropriate margin/padding for RTL
  getSpacing: (property: 'margin' | 'padding', side: 'start' | 'end', value: string) => {
    return `var(--spacing-${property}-${side})`;
  },

  // Get appropriate positioning for RTL
  getPosition: (side: 'start' | 'end') => {
    return `var(--position-${side})`;
  },

  // Generate RTL-aware CSS
  generateRTLCSS: (styles: Record<string, string>, direction: TextDirection) => {
    const rtlStyles: Record<string, string> = {};

    Object.entries(styles).forEach(([property, value]) => {
      if (property.includes('left') && direction === 'rtl') {
        rtlStyles[property.replace('left', 'right')] = value;
      } else if (property.includes('right') && direction === 'rtl') {
        rtlStyles[property.replace('right', 'left')] = value;
      } else {
        rtlStyles[property] = value;
      }
    });

    return rtlStyles;
  },

  // Validate RTL support in component
  validateRTLSupport: (component: HTMLElement): boolean => {
    const computedStyle = window.getComputedStyle(component);
    const { direction } = computedStyle;

    // Check if component properly handles RTL
    const hasLogicalProperties = [
      'margin-inline-start',
      'margin-inline-end',
      'padding-inline-start',
      'padding-inline-end',
    ].some(prop => computedStyle.getPropertyValue(prop) !== '');

    const hasDirectionAttribute =
      component.hasAttribute('dir') || component.closest('[dir]') !== null;

    return hasLogicalProperties || hasDirectionAttribute;
  },
};

// Export default RTL configuration
export const DEFAULT_RTL_CONFIG = {
  supportedDirections: ['ltr', 'rtl'] as TextDirection[],
  rtlLocales: ['ar', 'he'],
  fallbackDirection: 'ltr' as TextDirection,
  enableLogicalProperties: true,
  enableRTLTesting: true,
  norwegianRTLTesting: true,
};
