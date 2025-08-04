/**
 * Internationalization (i18n) Module
 * Comprehensive localization support for the UI System
 * 
 * Features:
 * - Support for English, Norwegian Bokmål, French, and Arabic
 * - RTL support for Arabic
 * - Pluralization rules
 * - Number, date, and currency formatting
 * - React hooks and context providers
 * - TypeScript support with full type safety
 */

// Export locale data and metadata
export {
  SUPPORTED_LOCALES,
  RTL_LOCALES,
  LOCALE_METADATA,
  LOCALE_RESOURCES,
  isRTLLocale,
  getLocaleDirection,
  isSupportedLocale,
  getClosestSupportedLocale,
  getBrowserLocale,
  type LocaleMetadata,
  type TranslationKey
} from './locales';

// Import from types
export { 
  type SupportedLocale,
  DEFAULT_LOCALE 
} from '../types/i18n.types';

// Export utility functions
export {
  getTranslation,
  t,
  translate,
  interpolateString,
  interpolate,
  handlePluralization,
  pluralize,
  formatNumber,
  formatDate,
  formatCurrency,
  formatRelativeTime,
  getTextDirection,
  getDirectionalClasses,
  validateTranslationCompleteness,
  type InterpolationValues,
  type PluralizationOptions
} from './utils';

// Export React hooks
export {
  useTranslation,
  useT,
  useLocale,
  type TranslationFunction,
  type UseTranslationReturn,
  type UseTranslationOptions
} from './hooks';

// Export React providers and components
export {
  I18nProvider,
  useI18nContext,
  withI18n,
  LocaleSwitcher,
  type I18nContextValue,
  type I18nProviderProps,
  type LocaleSwitcherProps
} from './providers';

/**
 * Quick setup function for basic i18n usage
 */
export const createI18n = (locale: SupportedLocale = DEFAULT_LOCALE) => {
  const { getTranslation: t } = require('./utils');
  
  return {
    t: (key: string, options?: any) => t(key, locale, options),
    locale,
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => 
      require('./utils').formatNumber(value, locale, options),
    formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => 
      require('./utils').formatDate(date, locale, options),
    formatCurrency: (amount: number, currency: string = 'USD') => 
      require('./utils').formatCurrency(amount, currency, locale),
  };
};

/**
 * Re-export individual locales for direct access
 */
export { en, nbNO, fr, ar } from './locales';