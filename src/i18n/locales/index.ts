/**
 * Localization files for the UI System
 * Comprehensive translation support for English, Norwegian Bokmål, French, and Arabic
 */

// Import all locale files
import en from './en.json';
import nbNO from './nb-NO.json';
import fr from './fr.json';
import ar from './ar.json';

/**
 * Available locale codes
 */
export const SUPPORTED_LOCALES = ['en', 'nb-NO', 'fr', 'ar'] as const;

/**
 * Type for supported locale codes
 */
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/**
 * RTL languages configuration
 */
export const RTL_LOCALES: readonly SupportedLocale[] = ['ar'] as const;

/**
 * Default locale
 */
export const DEFAULT_LOCALE: SupportedLocale = 'en';

/**
 * Locale metadata
 */
export interface LocaleMetadata {
  readonly code: SupportedLocale;
  readonly name: string;
  readonly nativeName: string;
  readonly direction: 'ltr' | 'rtl';
  readonly flag: string;
  readonly region?: string;
  readonly pluralRules?: string;
}

/**
 * Locale metadata mapping
 */
export const LOCALE_METADATA: Record<SupportedLocale, LocaleMetadata> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
    region: 'US',
    pluralRules: 'en'
  },
  'nb-NO': {
    code: 'nb-NO',
    name: 'Norwegian Bokmål',
    nativeName: 'Norsk bokmål',
    direction: 'ltr',
    flag: '🇳🇴',
    region: 'NO',
    pluralRules: 'nb'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    flag: '🇫🇷',
    region: 'FR',
    pluralRules: 'fr'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    flag: '🇦🇪',
    region: 'AE',
    pluralRules: 'ar'
  }
} as const;

/**
 * Translation resources
 */
export const LOCALE_RESOURCES = {
  en,
  'nb-NO': nbNO,
  fr,
  ar
} as const;

/**
 * Type for translation keys (extracted from English locale)
 */
export type TranslationKey = keyof typeof en;

/**
 * Utility to check if a locale is RTL
 */
export const isRTLLocale = (locale: SupportedLocale): boolean => {
  return RTL_LOCALES.includes(locale);
};

/**
 * Utility to get locale direction
 */
export const getLocaleDirection = (locale: SupportedLocale): 'ltr' | 'rtl' => {
  return LOCALE_METADATA[locale].direction;
};

/**
 * Utility to validate if a string is a supported locale
 */
export const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
};

/**
 * Utility to get the closest supported locale from a given locale string
 */
export const getClosestSupportedLocale = (locale: string): SupportedLocale => {
  // Direct match
  if (isSupportedLocale(locale)) {
    return locale;
  }

  // Try language code only (e.g., 'nb' from 'nb-NO')
  const languageCode = locale.split('-')[0];
  const matchByLanguage = SUPPORTED_LOCALES.find(supportedLocale => 
    supportedLocale.split('-')[0] === languageCode
  );

  if (matchByLanguage) {
    return matchByLanguage;
  }

  // Fallback to default
  return DEFAULT_LOCALE;
};

/**
 * Utility to get browser locale preference
 */
export const getBrowserLocale = (): SupportedLocale => {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const browserLocales = navigator.languages || [navigator.language];
  
  for (const browserLocale of browserLocales) {
    const closestSupported = getClosestSupportedLocale(browserLocale);
    if (closestSupported !== DEFAULT_LOCALE || browserLocale.startsWith('en')) {
      return closestSupported;
    }
  }

  return DEFAULT_LOCALE;
};

/**
 * Export individual locales for direct import
 */
export { en, nbNO, fr, ar };

/**
 * Default export with all locale resources
 */
export default LOCALE_RESOURCES;