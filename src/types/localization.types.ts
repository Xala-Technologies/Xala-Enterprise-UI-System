// Localization and RTL types for @xala-mock/ui-system
// Norwegian government-compliant internationalization types

import { ComponentProps } from './index';

// React type definitions for this file
declare namespace React {
  type ReactNode = any;
  type ComponentType<_P = {}> = any;
}

// Norwegian language support
export type NorwegianLocale = 'nb-NO' | 'nn-NO' | 'en-NO';
export type SupportedLocale = NorwegianLocale | 'en-US' | 'ar' | 'he';
export type TextDirection = 'ltr' | 'rtl';

// Norwegian official languages
export interface NorwegianLanguageConfig {
  bokmaal: 'nb-NO';
  nynorsk: 'nn-NO';
  english: 'en-NO';
  fallback: 'nb-NO';
}

// Translation key structure following Norwegian government standards
export interface TranslationKeys {
  // Common Norwegian government terms
  common: {
    save: string;
    cancel: string;
    submit: string;
    edit: string;
    delete: string;
    confirm: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    home: string;
    help: string;
    search: string;
    filter: string;
    sort: string;
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    required: string;
    optional: string;
    yes: string;
    no: string;
    ok: string;
  };

  // Form-specific Norwegian translations
  forms: {
    labels: {
      personalNumber: string;
      organizationNumber: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      postalCode: string;
      city: string;
      municipality: string;
      dateOfBirth: string;
    };
    validation: {
      required: string;
      invalidFormat: string;
      invalidPersonalNumber: string;
      invalidOrganizationNumber: string;
      invalidEmail: string;
      invalidPhone: string;
      invalidDate: string;
      tooShort: string;
      tooLong: string;
      notFound: string;
    };
    errors: {
      networkError: string;
      validationFailed: string;
      submissionFailed: string;
      unauthorized: string;
      forbidden: string;
      notFound: string;
      serverError: string;
    };
  };

  // Norwegian government classification
  classification: {
    levels: {
      ÅPEN: string;
      BEGRENSET: string;
      KONFIDENSIELT: string;
      HEMMELIG: string;
    };
    descriptions: {
      ÅPEN: string;
      BEGRENSET: string;
      KONFIDENSIELT: string;
      HEMMELIG: string;
    };
    labels: {
      securityLevel: string;
      accessLevel: string;
      clearanceRequired: string;
    };
  };

  // Norwegian government services
  services: {
    altinn: {
      login: string;
      authorize: string;
      forms: string;
      messages: string;
    };
    idporten: {
      login: string;
      logout: string;
      profile: string;
    };
    bankid: {
      authenticate: string;
      sign: string;
      verify: string;
    };
    brreg: {
      lookup: string;
      verify: string;
      notFound: string;
    };
  };

  // Accessibility labels (Norwegian WCAG compliance)
  accessibility: {
    labels: {
      openMenu: string;
      closeMenu: string;
      expandSection: string;
      collapseSection: string;
      sortColumn: string;
      filterData: string;
      selectPage: string;
      selectAll: string;
      clearSelection: string;
      skipToContent: string;
      skipToNavigation: string;
    };
    descriptions: {
      requiredField: string;
      optionalField: string;
      validInput: string;
      invalidInput: string;
      loadingContent: string;
      errorOccurred: string;
    };
    instructions: {
      keyboardNavigation: string;
      screenReaderUsage: string;
      formCompletion: string;
    };
  };

  // Date and time formatting (Norwegian standards)
  dateTime: {
    formats: {
      short: string; // dd.mm.yyyy
      long: string; // d. mmmm yyyy
      time: string; // HH:mm
      dateTime: string; // dd.mm.yyyy HH:mm
    };
    relative: {
      today: string;
      yesterday: string;
      tomorrow: string;
      lastWeek: string;
      nextWeek: string;
    };
  };

  // Navigation and layout
  navigation: {
    mainMenu: string;
    breadcrumbs: string;
    footer: string;
    sidebar: string;
    userMenu: string;
    settingsMenu: string;
  };

  // Data display
  dataDisplay: {
    table: {
      noData: string;
      loading: string;
      errorLoading: string;
      rowsPerPage: string;
      page: string;
      of: string;
      showing: string;
      to: string;
      entries: string;
    };
    pagination: {
      first: string;
      last: string;
      next: string;
      previous: string;
      page: string;
      of: string;
    };
  };
}

// Localization context configuration
export interface LocalizationConfig {
  defaultLocale: SupportedLocale;
  fallbackLocale: SupportedLocale;
  supportedLocales: SupportedLocale[];
  norwegianConfig: NorwegianLanguageConfig;
  rtlLocales: SupportedLocale[];
  dateFormats: Record<SupportedLocale, Intl.DateTimeFormatOptions>;
  numberFormats: Record<SupportedLocale, Intl.NumberFormatOptions>;
  currencyFormats: Record<SupportedLocale, Intl.NumberFormatOptions>;
  governmentStandards: {
    nsmCompliance: boolean;
    gdprCompliance: boolean;
    digdirStandards: boolean;
    wcagLevel: 'AA' | 'AAA';
  };
}

// Translation function type
export type TranslationFunction = (key: string, values?: Record<string, string | number>) => string;

// Localization hook return type
export interface UseLocalizationReturn {
  locale: SupportedLocale;
  direction: TextDirection;
  isRTL: boolean;
  isNorwegian: boolean;
  t: TranslationFunction;
  changeLocale: (locale: SupportedLocale) => void;
  formatDate: (date: Date, format?: string) => string;
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  getLocalizedPath: (path: string) => string;
  getNorwegianMunicipality: (code: string) => string | null;
  validateNorwegianContent: (text: string) => boolean;
}

// RTL-aware component props
export interface RTLAwareProps extends ComponentProps {
  direction?: TextDirection;
  locale?: SupportedLocale;
  rtlOptimized?: boolean;
  norwegianRTL?: {
    enabled: boolean;
    supportLevel: 'basic' | 'advanced';
    testingMode: boolean;
  };
}

// Translation validation
export interface TranslationValidation {
  hasRequiredKeys: boolean;
  missingKeys: string[];
  invalidValues: string[];
  norwegianCompliance: {
    hasBokmaal: boolean;
    hasNynorsk: boolean;
    hasProperTerminology: boolean;
    followsNamingConventions: boolean;
  };
  accessibilityCompliance: {
    hasAriaLabels: boolean;
    hasScreenReaderTexts: boolean;
    hasKeyboardInstructions: boolean;
  };
}

// Localization provider props
export interface LocalizationProviderProps {
  locale?: SupportedLocale;
  config?: Partial<LocalizationConfig>;
  translations?: Partial<Record<SupportedLocale, Partial<TranslationKeys>>>;
  children: React.ReactNode;
  norwegianConfig?: {
    municipality?: string;
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    enableGDPRMode?: boolean;
    strictNorwegianOnly?: boolean;
  };
}

// Norwegian government-specific localization features
export interface NorwegianLocalizationFeatures {
  // Municipality integration
  municipalities: Record<string, { nb: string; nn: string; en: string }>;

  // Government service terminology
  governmentTerms: {
    digitalServices: Record<string, { nb: string; nn: string; en: string }>;
    legalTerms: Record<string, { nb: string; nn: string; en: string }>;
    technicalTerms: Record<string, { nb: string; nn: string; en: string }>;
  };

  // NSM classification terminology
  securityTerminology: {
    classifications: Record<string, { nb: string; nn: string; en: string }>;
    accessLevels: Record<string, { nb: string; nn: string; en: string }>;
    procedures: Record<string, { nb: string; nn: string; en: string }>;
  };

  // GDPR compliance terminology
  gdprTerminology: {
    dataTypes: Record<string, { nb: string; nn: string; en: string }>;
    processingBasis: Record<string, { nb: string; nn: string; en: string }>;
    userRights: Record<string, { nb: string; nn: string; en: string }>;
  };
}

// RTL design token overrides
export interface RTLDesignTokens {
  spacing: {
    marginStart: string;
    marginEnd: string;
    paddingStart: string;
    paddingEnd: string;
  };
  positioning: {
    left: string;
    right: string;
    textAlign: 'left' | 'right' | 'center';
  };
  borders: {
    borderStartWidth: string;
    borderEndWidth: string;
    borderStartColor: string;
    borderEndColor: string;
  };
  typography: {
    direction: TextDirection;
    textAlign: 'left' | 'right' | 'center' | 'justify';
    unicodeBidi: 'normal' | 'embed' | 'isolate';
  };
}

// Localization testing utilities
export interface LocalizationTestUtils {
  validateTranslations: (translations: Partial<TranslationKeys>) => TranslationValidation;
  testRTLLayout: (component: React.ComponentType) => boolean;
  validateNorwegianTerminology: (text: string) => boolean;
  checkAccessibilityLabels: (translations: Partial<TranslationKeys>) => string[];
  generateTestTranslations: (locale: SupportedLocale) => Partial<TranslationKeys>;
}

// Export default configuration
export const DEFAULT_LOCALIZATION_CONFIG: LocalizationConfig = {
  defaultLocale: 'nb-NO',
  fallbackLocale: 'nb-NO',
  supportedLocales: ['nb-NO', 'nn-NO', 'en-NO', 'en-US', 'ar', 'he'],
  norwegianConfig: {
    bokmaal: 'nb-NO',
    nynorsk: 'nn-NO',
    english: 'en-NO',
    fallback: 'nb-NO',
  },
  rtlLocales: ['ar', 'he'],
  dateFormats: {
    'nb-NO': { day: '2-digit', month: '2-digit', year: 'numeric' },
    'nn-NO': { day: '2-digit', month: '2-digit', year: 'numeric' },
    'en-NO': { day: '2-digit', month: '2-digit', year: 'numeric' },
    'en-US': { month: '2-digit', day: '2-digit', year: 'numeric' },
    ar: { day: '2-digit', month: '2-digit', year: 'numeric' },
    he: { day: '2-digit', month: '2-digit', year: 'numeric' },
  },
  numberFormats: {
    'nb-NO': { useGrouping: true },
    'nn-NO': { useGrouping: true },
    'en-NO': { useGrouping: true },
    'en-US': { useGrouping: true },
    ar: { useGrouping: true },
    he: { useGrouping: true },
  },
  currencyFormats: {
    'nb-NO': { style: 'currency', currency: 'NOK' },
    'nn-NO': { style: 'currency', currency: 'NOK' },
    'en-NO': { style: 'currency', currency: 'NOK' },
    'en-US': { style: 'currency', currency: 'USD' },
    ar: { style: 'currency', currency: 'NOK' },
    he: { style: 'currency', currency: 'NOK' },
  },
  governmentStandards: {
    nsmCompliance: true,
    gdprCompliance: true,
    digdirStandards: true,
    wcagLevel: 'AA',
  },
};
