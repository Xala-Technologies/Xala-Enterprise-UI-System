/**
 * i18n Utility Functions
 * Helper functions for internationalization and localization
 */

import type { SupportedLocale } from '../locales';
import { LOCALE_RESOURCES, DEFAULT_LOCALE, isRTLLocale } from '../locales';

/**
 * Type for interpolation values
 */
export interface InterpolationValues {
  readonly [key: string]: string | number | boolean;
}

/**
 * Type for pluralization options
 */
export interface PluralizationOptions {
  readonly count: number;
  readonly values?: InterpolationValues;
}

/**
 * Get nested translation value from object using dot notation
 */
export const getNestedValue = (
  obj: Record<string, any>,
  path: string
): string | Record<string, any> | undefined => {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj);
};

/**
 * Interpolate template string with values
 */
export const interpolateString = (
  template: string,
  values: InterpolationValues = {}
): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = values[key];
    return value !== undefined ? String(value) : match;
  });
};

/**
 * Handle pluralization based on count
 */
export const handlePluralization = (
  translations: Record<string, string>,
  options: PluralizationOptions,
  locale: SupportedLocale = DEFAULT_LOCALE
): string => {
  const { count, values = {} } = options;

  // Get the appropriate plural form based on locale rules
  let pluralForm: string;

  if (locale === 'ar') {
    // Arabic has complex plural rules
    if (count === 0) pluralForm = 'zero';
    else if (count === 1) pluralForm = 'one';
    else if (count === 2) pluralForm = 'two';
    else if (count >= 3 && count <= 10) pluralForm = 'few';
    else if (count >= 11 && count <= 99) pluralForm = 'many';
    else pluralForm = 'other';
  } else {
    // Standard plural rules for other languages
    if (count === 0) pluralForm = 'zero';
    else if (count === 1) pluralForm = 'one';
    else pluralForm = 'other';
  }

  // Fallback chain: try plural form -> 'other' -> first available
  const template = translations[pluralForm] || 
                   translations.other || 
                   Object.values(translations)[0] || 
                   String(count);

  return interpolateString(template, { ...values, count });
};

/**
 * Get translation with support for nested keys, interpolation, and pluralization
 */
export const getTranslation = (
  key: string,
  locale: SupportedLocale = DEFAULT_LOCALE,
  options?: InterpolationValues | PluralizationOptions
): string => {
  const localeData = LOCALE_RESOURCES[locale];
  
  if (!localeData) {
    console.warn(`Locale "${locale}" not found, falling back to ${DEFAULT_LOCALE}`);
    return getTranslation(key, DEFAULT_LOCALE, options);
  }

  const value = getNestedValue(localeData, key);

  if (value === undefined) {
    // Try fallback to default locale if different
    if (locale !== DEFAULT_LOCALE) {
      return getTranslation(key, DEFAULT_LOCALE, options);
    }
    
    console.warn(`Translation key "${key}" not found`);
    return key; // Return key as fallback
  }

  if (typeof value === 'string') {
    // Simple string translation with optional interpolation
    const values = options && 'count' in options ? options.values || {} : (options as InterpolationValues) || {};
    return interpolateString(value, values);
  }

  if (typeof value === 'object' && options && 'count' in options) {
    // Handle pluralization
    return handlePluralization(value as Record<string, string>, options, locale);
  }

  if (typeof value === 'object') {
    console.warn(`Translation key "${key}" points to an object but no count provided for pluralization`);
    return key;
  }

  return String(value);
};

/**
 * Simple translation function (alias for getTranslation)
 */
export const t = getTranslation;

/**
 * Format number according to locale
 */
export const formatNumber = (
  value: number,
  locale: SupportedLocale = DEFAULT_LOCALE,
  options?: Intl.NumberFormatOptions
): string => {
  try {
    const localeCode = locale === 'nb-NO' ? 'nb-NO' : locale;
    return new Intl.NumberFormat(localeCode, options).format(value);
  } catch (error) {
    console.warn(`Error formatting number for locale "${locale}":`, error);
    return String(value);
  }
};

/**
 * Format date according to locale
 */
export const formatDate = (
  date: Date | string | number,
  locale: SupportedLocale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    const localeCode = locale === 'nb-NO' ? 'nb-NO' : locale;
    return new Intl.DateTimeFormat(localeCode, options).format(dateObj);
  } catch (error) {
    console.warn(`Error formatting date for locale "${locale}":`, error);
    return String(date);
  }
};

/**
 * Format currency according to locale
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: SupportedLocale = DEFAULT_LOCALE
): string => {
  try {
    const localeCode = locale === 'nb-NO' ? 'nb-NO' : locale;
    return new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.warn(`Error formatting currency for locale "${locale}":`, error);
    return `${currency} ${amount}`;
  }
};

/**
 * Get relative time format (e.g., "2 hours ago")
 */
export const formatRelativeTime = (
  date: Date | string | number,
  locale: SupportedLocale = DEFAULT_LOCALE
): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    const localeCode = locale === 'nb-NO' ? 'nb-NO' : locale;
    const rtf = new Intl.RelativeTimeFormat(localeCode, { numeric: 'auto' });

    // Determine the appropriate unit and value
    const units: Array<[string, number]> = [
      ['year', 31536000],
      ['month', 2592000],
      ['week', 604800],
      ['day', 86400],
      ['hour', 3600],
      ['minute', 60],
      ['second', 1],
    ];

    for (const [unit, secondsInUnit] of units) {
      const value = Math.floor(Math.abs(diffInSeconds) / secondsInUnit);
      if (value >= 1) {
        return rtf.format(diffInSeconds >= 0 ? -value : value, unit as Intl.RelativeTimeFormatUnit);
      }
    }

    return rtf.format(0, 'second');
  } catch (error) {
    console.warn(`Error formatting relative time for locale "${locale}":`, error);
    return String(date);
  }
};

/**
 * Get text direction for locale
 */
export const getTextDirection = (locale: SupportedLocale): 'ltr' | 'rtl' => {
  return isRTLLocale(locale) ? 'rtl' : 'ltr';
};

/**
 * Apply RTL/LTR specific CSS classes
 */
export const getDirectionalClasses = (
  locale: SupportedLocale,
  ltrClasses: string = '',
  rtlClasses: string = ''
): string => {
  return isRTLLocale(locale) ? rtlClasses : ltrClasses;
};

/**
 * Validate translation completeness
 */
export const validateTranslationCompleteness = (
  targetLocale: SupportedLocale,
  baseLocale: SupportedLocale = DEFAULT_LOCALE
): { missing: string[]; extra: string[] } => {
  const baseData = LOCALE_RESOURCES[baseLocale];
  const targetData = LOCALE_RESOURCES[targetLocale];

  const getAllKeys = (obj: Record<string, any>, prefix: string = ''): string[] => {
    const keys: string[] = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        keys.push(...getAllKeys(value, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    
    return keys;
  };

  const baseKeys = new Set(getAllKeys(baseData));
  const targetKeys = new Set(getAllKeys(targetData));

  const missing = Array.from(baseKeys).filter(key => !targetKeys.has(key));
  const extra = Array.from(targetKeys).filter(key => !baseKeys.has(key));

  return { missing, extra };
};

/**
 * Export commonly used functions
 */
export {
  getTranslation as translate,
  interpolateString as interpolate,
  handlePluralization as pluralize,
};