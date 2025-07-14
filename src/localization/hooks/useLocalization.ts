/**
 * Localization hook - minimal implementation
 */

export interface LocalizationHook {
  t: (key: string, params?: Record<string, any>) => string;
  locale: string;
  setLocale: (locale: string) => void;
}

/**
 * Use localization hook
 */
export function useLocalization(): LocalizationHook {
  return {
    t: (key: string, params?: Record<string, any>) => {
      // Simple fallback - return the key if no translation found
      return key;
    },
    locale: 'en',
    setLocale: (locale: string) => {
      // Stub implementation
    }
  };
}

export default useLocalization; 