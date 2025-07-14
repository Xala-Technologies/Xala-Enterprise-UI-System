// Main localization exports for @xala-mock/ui-system
// Norwegian government-compliant internationalization and RTL support

// Types and interfaces
export * from '../types/localization.types';

// Translation data
export { nbNO } from './translations/nb-NO';
export { nnNO } from './translations/nn-NO';
export { enNO } from './translations/en-NO';

// Hooks
export { useLocalization, useRTLStyles, useNorwegianCompliance } from './hooks/useLocalization';

// Providers
export { LocalizationProvider, LocalizationContext } from './providers/LocalizationProvider';
export type { LocalizationContextType } from './providers/LocalizationProvider';

// RTL utilities
export * from '../rtl/tokens/rtl-design-tokens';

// Utility functions
export const createTranslationBundle = (
  nbTranslations: any,
  nnTranslations: any,
  enTranslations: any
) => ({
  'nb-NO': nbTranslations,
  'nn-NO': nnTranslations,
  'en-NO': enTranslations,
});

// Norwegian government compliance utilities
export const norwegianLocalizationUtils = {
  // Validate if text contains Norwegian-specific content
  isNorwegianContent: (text: string): boolean => {
    const norwegianPatterns = [
      /\b(fødselsnummer|fnr)\b/i,
      /\b(organisasjonsnummer|orgnr)\b/i,
      /\b(kommune|fylke)\b/i,
      /\b(norge|norway)\b/i,
      /\b(altinn|id-porten|bankid)\b/i,
    ];
    return norwegianPatterns.some(pattern => pattern.test(text));
  },

  // Get appropriate locale for Norwegian context
  getAppropriateNorwegianLocale: (userPreference?: string): 'nb-NO' | 'nn-NO' | 'en-NO' => {
    if (userPreference === 'nynorsk' || userPreference === 'nn-NO') {
      return 'nn-NO';
    }
    if (userPreference === 'english' || userPreference === 'en-NO') {
      return 'en-NO';
    }
    return 'nb-NO'; // Default to Bokmål
  },

  // NSM classification validation
  validateNSMClassification: (level: string): boolean => {
    return ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'].includes(level);
  },

  // Format Norwegian personal number
  formatPersonalNumber: (number: string): string => {
    if (number.length === 11) {
      return `${number.slice(0, 6)} ${number.slice(6)}`;
    }
    return number;
  },

  // Format Norwegian organization number
  formatOrganizationNumber: (number: string): string => {
    if (number.length === 9) {
      return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }
    return number;
  },
};

// RTL testing utilities
export const rtlTestingUtils = {
  // Test component in RTL mode
  testComponentInRTL: (componentElement: HTMLElement): boolean => {
    const originalDir = componentElement.dir;
    componentElement.dir = 'rtl';

    // Check if component handles RTL properly
    const computedStyle = window.getComputedStyle(componentElement);
    const { direction } = computedStyle;
    const { textAlign } = computedStyle;

    // Restore original direction
    componentElement.dir = originalDir;

    return direction === 'rtl' && (textAlign === 'right' || textAlign === 'start');
  },

  // Generate RTL test data
  generateRTLTestData: () => ({
    arabic: {
      text: 'مرحبا بكم في النرويج',
      numbers: '١٢٣٤٥٦٧٨٩٠',
      mixed: 'Velkommen مرحبا til Norge',
    },
    hebrew: {
      text: 'ברוכים הבאים לנורווגיה',
      numbers: '١٢٣٤٥٦٧٨٩٠',
      mixed: 'Velkommen ברוכים הבאים til Norge',
    },
  }),

  // Validate RTL layout
  validateRTLLayout: (
    element: HTMLElement
  ): {
    hasRTLSupport: boolean;
    issues: string[];
  } => {
    const issues: string[] = [];
    const computedStyle = window.getComputedStyle(element);

    // Check for logical properties
    const hasLogicalMargin =
      computedStyle.marginInlineStart !== '' || computedStyle.marginInlineEnd !== '';
    const hasLogicalPadding =
      computedStyle.paddingInlineStart !== '' || computedStyle.paddingInlineEnd !== '';

    if (!hasLogicalMargin && !hasLogicalPadding) {
      issues.push('Missing logical properties for RTL support');
    }

    // Check for hardcoded direction-specific properties
    if (computedStyle.marginLeft !== '' && computedStyle.marginRight !== '') {
      issues.push('Using hardcoded left/right margins instead of logical properties');
    }

    return {
      hasRTLSupport: issues.length === 0,
      issues,
    };
  },
};

// Default configuration export
export const defaultLocalizationSetup = {
  supportedLocales: ['nb-NO', 'nn-NO', 'en-NO', 'en-US', 'ar', 'he'],
  defaultLocale: 'nb-NO',
  rtlLocales: ['ar', 'he'],
  norwegianMunicipalities: [
    { code: '0301', name: 'Oslo' },
    { code: '1103', name: 'Stavanger' },
    { code: '1201', name: 'Bergen' },
    { code: '1601', name: 'Trondheim' },
    { code: '1902', name: 'Tromsø' },
  ],
};
