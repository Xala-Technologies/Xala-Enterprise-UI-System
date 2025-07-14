// useLocalization hook for @xala-mock/ui-system
// Norwegian government-compliant internationalization with RTL support

import {
  SupportedLocale,
  TextDirection,
  UseLocalizationReturn,
  TranslationFunction,
  DEFAULT_LOCALIZATION_CONFIG,
} from '../../types/localization.types';

// Norwegian municipality data for localization
const NORWEGIAN_MUNICIPALITIES: Record<string, string> = {
  '0301': 'Oslo',
  '1101': 'Eigersund',
  '1103': 'Stavanger',
  '1106': 'Haugesund',
  '1201': 'Bergen',
  '1601': 'Trondheim',
  '1902': 'Tromsø',
  // Add more municipalities as needed
};

// Norwegian terminology validation patterns
const NORWEGIAN_PATTERNS = {
  personalNumber: /^\d{11}$/,
  organizationNumber: /^\d{9}$/,
  postalCode: /^\d{4}$/,
  phoneNumber: /^(\+47|0047|47)?[2-9]\d{7}$/,
};

export const useLocalization = (): UseLocalizationReturn => {
  // Mock implementation for development
  const locale: SupportedLocale = 'nb-NO';
  const config = DEFAULT_LOCALIZATION_CONFIG;

  // Determine text direction based on locale
  const direction: TextDirection = config.rtlLocales.includes(locale) ? 'rtl' : 'ltr';

  // Check if current locale is RTL
  const isRTL = direction === 'rtl';

  // Check if current locale is Norwegian
  const isNorwegian = ['nb-NO', 'nn-NO', 'en-NO'].includes(locale);

  // Translation function with fallback support
  const t: TranslationFunction = (key: string, values?: Record<string, string | number>) => {
    // Mock implementation - return key for now
    if (values) {
      return Object.entries(values).reduce((result, [variable, value]) => {
        return result.replace(new RegExp(`{{${variable}}}`, 'g'), String(value));
      }, key);
    }
    return key;
  };

  // Change locale function
  const changeLocale = (newLocale: SupportedLocale) => {
    console.log(`Changing locale to: ${newLocale}`);
  };

  // Format date according to Norwegian standards
  const formatDate = (date: Date, format?: string) => {
    const dateFormat = config.dateFormats[locale] || config.dateFormats[config.defaultLocale];
    const formatter = new Intl.DateTimeFormat(locale, dateFormat);
    return formatter.format(date);
  };

  // Format number according to Norwegian standards
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    const numberFormat = { ...config.numberFormats[locale], ...options };
    const formatter = new Intl.NumberFormat(locale, numberFormat);
    return formatter.format(number);
  };

  // Format currency (NOK for Norwegian locales)
  const formatCurrency = (amount: number, currency = 'NOK') => {
    const currencyFormat = { ...config.currencyFormats[locale], currency };
    const formatter = new Intl.NumberFormat(locale, currencyFormat);
    return formatter.format(amount);
  };

  // Get localized path (for routing)
  const getLocalizedPath = (path: string) => {
    if (isNorwegian) {
      // Norwegian paths might need localization
      const norwegianPaths: Record<string, Record<string, string>> = {
        '/profile': {
          'nb-NO': '/profil',
          'nn-NO': '/profil',
          'en-NO': '/profile',
        },
        '/settings': {
          'nb-NO': '/innstillinger',
          'nn-NO': '/innstillingar',
          'en-NO': '/settings',
        },
      };

      if (norwegianPaths[path]?.[locale]) {
        return norwegianPaths[path][locale];
      }
    }
    return path;
  };

  // Get Norwegian municipality name
  const getNorwegianMunicipality = (code: string): string | null => {
    return NORWEGIAN_MUNICIPALITIES[code] || null;
  };

  // Validate Norwegian content (personal numbers, org numbers, etc.)
  const validateNorwegianContent = (text: string): boolean => {
    // Check for Norwegian-specific patterns
    const hasPersonalNumber = NORWEGIAN_PATTERNS.personalNumber.test(text);
    const hasOrgNumber = NORWEGIAN_PATTERNS.organizationNumber.test(text);
    const hasPostalCode = NORWEGIAN_PATTERNS.postalCode.test(text);
    const hasPhoneNumber = NORWEGIAN_PATTERNS.phoneNumber.test(text);

    return hasPersonalNumber || hasOrgNumber || hasPostalCode || hasPhoneNumber;
  };

  return {
    locale,
    direction,
    isRTL,
    isNorwegian,
    t,
    changeLocale,
    formatDate,
    formatNumber,
    formatCurrency,
    getLocalizedPath,
    getNorwegianMunicipality,
    validateNorwegianContent,
  };
};

// Utility hook for RTL-aware styling
export const useRTLStyles = () => {
  const { direction, isRTL } = useLocalization();

  return {
    direction,
    isRTL,
    marginStart: isRTL ? 'marginRight' : 'marginLeft',
    marginEnd: isRTL ? 'marginLeft' : 'marginRight',
    paddingStart: isRTL ? 'paddingRight' : 'paddingLeft',
    paddingEnd: isRTL ? 'paddingLeft' : 'paddingRight',
    textAlign: isRTL ? 'right' : 'left',
    float: isRTL ? 'right' : 'left',
    clear: isRTL ? 'right' : 'left',
  };
};

// Utility hook for Norwegian government compliance
export const useNorwegianCompliance = () => {
  const { locale, isNorwegian, t } = useLocalization();

  return {
    isNorwegian,
    isBokmaal: locale === 'nb-NO',
    isNynorsk: locale === 'nn-NO',
    isEnglish: locale === 'en-NO',

    // NSM classification helpers
    getClassificationLabel: (level: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG') => {
      return t(`classification.levels.${level}`);
    },

    // Government service helpers
    getServiceLabel: (service: 'altinn' | 'idporten' | 'bankid' | 'brreg', action: string) => {
      return t(`services.${service}.${action}`);
    },

    // Accessibility helpers
    getA11yLabel: (type: string) => {
      return t(`accessibility.labels.${type}`);
    },

    // Form validation helpers
    getValidationMessage: (type: string) => {
      return t(`forms.validation.${type}`);
    },
  };
};
