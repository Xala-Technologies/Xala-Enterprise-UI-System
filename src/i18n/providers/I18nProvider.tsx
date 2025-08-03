/**
 * I18n Provider
 * React context provider for internationalization
 */

import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { SupportedLocale } from '../locales';
import { 
  DEFAULT_LOCALE, 
  isSupportedLocale, 
  getBrowserLocale, 
  LOCALE_METADATA,
  isRTLLocale 
} from '../locales';

/**
 * I18n context value type
 */
export interface I18nContextValue {
  /** Current locale */
  readonly locale: SupportedLocale;
  /** Change locale */
  readonly setLocale: (locale: SupportedLocale) => void;
  /** Text direction */
  readonly direction: 'ltr' | 'rtl';
  /** Whether current locale is RTL */
  readonly isRTL: boolean;
  /** Available locales */
  readonly availableLocales: readonly SupportedLocale[];
  /** Locale metadata */
  readonly localeMetadata: typeof LOCALE_METADATA[SupportedLocale];
}

/**
 * Create the context
 */
const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * I18n provider props
 */
export interface I18nProviderProps {
  /** Child components */
  readonly children: ReactNode;
  /** Initial locale (defaults to browser locale or DEFAULT_LOCALE) */
  readonly initialLocale?: SupportedLocale;
  /** Available locales (defaults to all supported locales) */
  readonly availableLocales?: readonly SupportedLocale[];
  /** Whether to persist locale choice in localStorage */
  readonly persistLocale?: boolean;
  /** Storage key for persisted locale */
  readonly storageKey?: string;
  /** Callback when locale changes */
  readonly onLocaleChange?: (locale: SupportedLocale) => void;
}

/**
 * I18n Provider Component
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  initialLocale,
  availableLocales = ['en', 'nb-NO', 'fr', 'ar'],
  persistLocale = true,
  storageKey = 'ui-system-locale',
  onLocaleChange,
}) => {
  // Initialize locale
  const getInitialLocale = (): SupportedLocale => {
    if (initialLocale && availableLocales.includes(initialLocale)) {
      return initialLocale;
    }

    // Try to get from localStorage if persistence is enabled
    if (persistLocale && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored && isSupportedLocale(stored) && availableLocales.includes(stored)) {
          return stored;
        }
      } catch (error) {
        console.warn('Failed to read locale from localStorage:', error);
      }
    }

    // Use browser locale or default
    const browserLocale = getBrowserLocale();
    return availableLocales.includes(browserLocale) ? browserLocale : DEFAULT_LOCALE;
  };

  const [locale, setLocaleState] = useState<SupportedLocale>(getInitialLocale);

  // Set locale with persistence and callback
  const setLocale = useCallback((newLocale: SupportedLocale) => {
    if (!availableLocales.includes(newLocale)) {
      console.warn(`Locale "${newLocale}" is not in available locales:`, availableLocales);
      return;
    }

    setLocaleState(newLocale);

    // Persist to localStorage if enabled
    if (persistLocale && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, newLocale);
      } catch (error) {
        console.warn('Failed to persist locale to localStorage:', error);
      }
    }

    // Call onChange callback
    onLocaleChange?.(newLocale);
  }, [availableLocales, persistLocale, storageKey, onLocaleChange]);

  // Update document direction and lang attribute
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const direction = isRTLLocale(locale) ? 'rtl' : 'ltr';
    
    // Set document direction
    document.documentElement.dir = direction;
    
    // Set document language
    document.documentElement.lang = locale;

    // Add/remove RTL class for CSS
    document.documentElement.classList.toggle('rtl', direction === 'rtl');
    document.documentElement.classList.toggle('ltr', direction === 'ltr');

    // Set CSS custom property for direction
    document.documentElement.style.setProperty('--text-direction', direction);
  }, [locale]);

  // Memoized context value
  const contextValue: I18nContextValue = React.useMemo(() => ({
    locale,
    setLocale,
    direction: isRTLLocale(locale) ? 'rtl' : 'ltr',
    isRTL: isRTLLocale(locale),
    availableLocales,
    localeMetadata: LOCALE_METADATA[locale],
  }), [locale, setLocale, availableLocales]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * Hook to use the I18n context
 */
export const useI18nContext = (): I18nContextValue => {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  
  return context;
};

/**
 * HOC to wrap components with I18n provider
 */
export const withI18n = <P extends object>(
  Component: React.ComponentType<P>,
  providerProps?: Omit<I18nProviderProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <I18nProvider {...providerProps}>
      <Component {...props} />
    </I18nProvider>
  );

  WrappedComponent.displayName = `withI18n(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

/**
 * Locale switcher component
 */
export interface LocaleSwitcherProps {
  /** Custom className for the select element */
  readonly className?: string;
  /** Whether to show native names */
  readonly showNativeNames?: boolean;
  /** Whether to show flags */
  readonly showFlags?: boolean;
  /** Custom render function for options */
  readonly renderOption?: (locale: SupportedLocale, metadata: typeof LOCALE_METADATA[SupportedLocale]) => ReactNode;
}

export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  className = '',
  showNativeNames = true,
  showFlags = true,
  renderOption,
}) => {
  const { locale, setLocale, availableLocales } = useI18nContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as SupportedLocale;
    setLocale(newLocale);
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      aria-label="Select language"
    >
      {availableLocales.map((localeCode) => {
        const metadata = LOCALE_METADATA[localeCode];
        
        if (renderOption) {
          return (
            <option key={localeCode} value={localeCode}>
              {renderOption(localeCode, metadata)}
            </option>
          );
        }

        const flag = showFlags ? `${metadata.flag} ` : '';
        const name = showNativeNames ? metadata.nativeName : metadata.name;
        
        return (
          <option key={localeCode} value={localeCode}>
            {flag}{name}
          </option>
        );
      })}
    </select>
  );
};