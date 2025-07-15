/**
 * Localization hook - minimal implementation
 */

export interface LocalizationHook {
   
  // eslint-disable-next-line no-unused-vars
  t: (_key: string, params?: Record<string, unknown>) => string;
  locale: string;
  // eslint-disable-next-line no-unused-vars
  setLocale: (_locale: string) => void;
}

/**
 * Use localization hook
 */
export function useLocalization(): LocalizationHook {
  return {
    // eslint-disable-next-line no-unused-vars
    t: (_key: string, _params?: Record<string, unknown>) => {
      // Simple fallback - return the key if no translation found
      return _key;
    },
    locale: 'en',
    // eslint-disable-next-line no-unused-vars
    setLocale: (_locale: string) => {
      // Stub implementation
    }
  };
}

export default useLocalization; 