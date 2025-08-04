// RTL (Right-to-Left) utilities for @xala-mock/ui-system
// Norwegian compliance with Arabic and Hebrew language support

export * from './tokens/rtl-design-tokens';

// RTL utility functions
export const RTLUtils = {
  isRTL: (language: string): boolean => {
    return ['ar', 'he', 'fa', 'ur'].includes(language);
  },

  getDirection: (language: string): 'ltr' | 'rtl' => {
    return RTLUtils.isRTL(language) ? 'rtl' : 'ltr';
  },

  // Mock validation function for RTL components
  // eslint-disable-next-line no-unused-vars
  validateRTLColorContrast: (_element: HTMLElement): boolean => {
    return true;
  },
};
