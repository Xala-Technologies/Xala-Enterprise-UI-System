/* eslint-disable no-console */
/**
 * useTranslation Hook
 * React hook for accessing translations and locale information
 */

import { useCallback, useMemo } from 'react';
import type { SupportedLocale } from '../locales';
import { 
  DEFAULT_LOCALE, 
  isRTLLocale, 
  getLocaleDirection, 
  LOCALE_METADATA 
} from '../locales';
import {
  getTranslation,
  formatNumber,
  formatDate,
  formatCurrency,
  formatRelativeTime,
  getTextDirection,
  getDirectionalClasses,
  type InterpolationValues,
  type PluralizationOptions
} from '../utils';

/**
 * Translation function type
 */
export type TranslationFunction = (
  key: string,
  options?: InterpolationValues | PluralizationOptions
) => string;

/**
 * useTranslation hook return type
 */
export interface UseTranslationReturn {
  /** Translation function */
  readonly t: TranslationFunction;
  /** Current locale */
  readonly locale: SupportedLocale;
  /** Text direction for current locale */
  readonly direction: 'ltr' | 'rtl';
  /** Whether current locale is RTL */
  readonly isRTL: boolean;
  /** Locale metadata */
  readonly localeMetadata: typeof LOCALE_METADATA[SupportedLocale];
  /** Format number for current locale */
  readonly formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  /** Format date for current locale */
  readonly formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  /** Format currency for current locale */
  readonly formatCurrency: (amount: number, currency?: string) => string;
  /** Format relative time for current locale */
  readonly formatRelativeTime: (date: Date | string | number) => string;
  /** Get directional CSS classes */
  readonly getDirectionalClasses: (ltrClasses?: string, rtlClasses?: string) => string;
}

/**
 * Hook configuration options
 */
export interface UseTranslationOptions {
  /** Override the locale (useful for testing or specific components) */
  readonly locale?: SupportedLocale;
  /** Fallback locale if translation is missing */
  readonly fallbackLocale?: SupportedLocale;
}

/**
 * Get current locale from various sources
 * This is a simple implementation - in a real app, this might come from:
 * - Context provider
 * - URL parameters
 * - User preferences
 * - Browser locale
 */
const getCurrentLocale = (): SupportedLocale => {
  // In a real implementation, this would get the locale from your app's state management
  // For now, we'll use a simple approach with localStorage and browser detection
  
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  try {
    // Try to get from localStorage
    const storedLocale = localStorage.getItem('ui-system-locale');
    if (storedLocale && storedLocale in LOCALE_METADATA) {
      return storedLocale as SupportedLocale;
    }

    // Try to get from browser
    const browserLanguage = navigator.language || navigator.languages?.[0];
    if (browserLanguage) {
      // Check for exact match
      if (browserLanguage in LOCALE_METADATA) {
        return browserLanguage as SupportedLocale;
      }
      
      // Check for language code match (e.g., 'nb' for 'nb-NO')
      const languageCode = browserLanguage.split('-')[0];
      const matchingLocale = Object.keys(LOCALE_METADATA).find(locale => 
        locale.startsWith(languageCode)
      );
      
      if (matchingLocale) {
        return matchingLocale as SupportedLocale;
      }
    }
  } catch (error) {
    console.warn('Error getting locale:', error);
  }

  return DEFAULT_LOCALE;
};

/**
 * React hook for translation and localization
 */
export const useTranslation = (options: UseTranslationOptions = {}): UseTranslationReturn => {
  const currentLocale = getCurrentLocale();
  const locale = options.locale || currentLocale;
  const fallbackLocale = options.fallbackLocale || DEFAULT_LOCALE;

  // Memoize locale metadata to avoid recalculation
  const localeMetadata = useMemo(() => LOCALE_METADATA[locale], [locale]);
  
  // Memoize direction and RTL status
  const direction = useMemo(() => getTextDirection(locale), [locale]);
  const isRTL = useMemo(() => isRTLLocale(locale), [locale]);

  // Create translation function with current locale
  const t = useCallback<TranslationFunction>(
    (key: string, options?: InterpolationValues | PluralizationOptions) => {
      const translation = getTranslation(key, locale, options);
      
      // If translation is the same as key (meaning not found) and we have a fallback
      if (translation === key && locale !== fallbackLocale) {
        return getTranslation(key, fallbackLocale, options);
      }
      
      return translation;
    },
    [locale, fallbackLocale]
  );

  // Create locale-specific formatting functions
  const formatNumberFn = useCallback(
    (value: number, options?: Intl.NumberFormatOptions) => 
      formatNumber(value, locale, options),
    [locale]
  );

  const formatDateFn = useCallback(
    (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => 
      formatDate(date, locale, options),
    [locale]
  );

  const formatCurrencyFn = useCallback(
    (amount: number, currency: string = 'USD') => 
      formatCurrency(amount, currency, locale),
    [locale]
  );

  const formatRelativeTimeFn = useCallback(
    (date: Date | string | number) => 
      formatRelativeTime(date, locale),
    [locale]
  );

  const getDirectionalClassesFn = useCallback(
    (ltrClasses: string = '', rtlClasses: string = '') => 
      getDirectionalClasses(locale, ltrClasses, rtlClasses),
    [locale]
  );

  return {
    t,
    locale,
    direction,
    isRTL,
    localeMetadata,
    formatNumber: formatNumberFn,
    formatDate: formatDateFn,
    formatCurrency: formatCurrencyFn,
    formatRelativeTime: formatRelativeTimeFn,
    getDirectionalClasses: getDirectionalClassesFn,
  };
};

/**
 * Hook for getting just the translation function (lighter alternative)
 */
export const useT = (locale?: SupportedLocale): TranslationFunction => {
  const { t } = useTranslation({ locale });
  return t;
};

/**
 * Hook for getting locale information only
 */
export const useLocale = (locale?: SupportedLocale) => {
  const { locale: currentLocale, direction, isRTL, localeMetadata } = useTranslation({ locale });
  
  return {
    locale: currentLocale,
    direction,
    isRTL,
    localeMetadata,
  };
};