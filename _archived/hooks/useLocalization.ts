/**
 * @fileoverview Minimal Localization Hook v6.0.0
 * @description Simple replacement for archived localization functionality
 * @version 6.0.0
 */

export interface LocalizationResult {
  readonly t: (key: string, params?: Record<string, any>) => string;
  readonly locale: string;
  readonly direction: 'ltr' | 'rtl';
}

export const useLocalization = (): LocalizationResult => {
  return {
    t: (key: string, params?: Record<string, any>) => {
      // Simple fallback - return key with params interpolated
      let result = key;
      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          result = result.replace(`{${param}}`, String(value));
        });
      }
      return result;
    },
    locale: 'en-US',
    direction: 'ltr',
  };
};