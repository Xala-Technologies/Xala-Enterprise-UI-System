// Mobile platform components
export { BottomNavigation } from './components/BottomNavigation';
export { MobileDrawer } from './components/MobileDrawer';
export { MobileHeader } from './components/MobileHeader';
export { MobileHeaderButton } from './components/MobileHeaderButton';

// Export mobile layouts (to be implemented)
// export { MobileLayout } from './layouts/MobileLayout';
// export { MobileSection } from './layouts/MobileSection';
// export { MobileContainer } from './layouts/MobileContainer';

// Export types
export type { } from // Will be exported once components are properly typed
    '../types/mobile.types';

// Mobile platform utilities
export const mobileUtils = {
  // Touch target validation (WCAG 2.2 AA - minimum 44px)
  validateTouchTarget: (size: number): boolean => size >= 44,

  // Safe area utilities
  getSafeAreaInsets: (): { top: string; bottom: string; left: string; right: string } => ({
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
    right: 'env(safe-area-inset-right)',
  }),

  // Norwegian mobile compliance
  norwegianCompliance: {
    // DigDir mobile guidelines
    digdir: {
      minimumTouchTarget: 44, // px
      recommendedTouchTarget: 48, // px
      maximumTouchTarget: 64, // px
      tapAreaSpacing: 8, // px minimum between targets
    },

    // NSM mobile security
    nsm: {
      classificationIndicators: true,
      auditLogging: true,
      emergencyAccess: true,
      secureDataHandling: true,
    },

    // WCAG 2.2 AA mobile
    wcag: {
      minimumContrastRatio: 4.5,
      largeTextContrastRatio: 3,
      focusIndicatorSize: 2, // px
      scrollableRegionLabels: true,
    },
  },

  // Device detection
  device: {
    isMobile: (): boolean => window.innerWidth <= 768,
    isTablet: (): boolean => window.innerWidth > 768 && window.innerWidth <= 1024,
    hasTouchScreen: (): boolean => 'ontouchstart' in window,
    getOrientation: (): 'portrait' | 'landscape' => (window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'),
  },

  // Gesture utilities
  gestures: {
    swipeThreshold: 50, // px
    swipeVelocityThreshold: 0.5, // px/ms
    tapThreshold: 10, // px
    longPressDelay: 500, // ms
  },
};

// Norwegian mobile constants
export const NORWEGIAN_MOBILE_CONSTANTS = {
  municipalities: {
    // Major Norwegian municipalities with mobile optimizations
    oslo: '0301',
    bergen: '1201',
    trondheim: '1601',
    stavanger: '1103',
    tromso: '1902',
  },

  services: {
    // Norwegian government mobile services
    altinn: 'no.altinn.mobile',
    idporten: 'no.idporten.mobile',
    bankid: 'no.bankid.mobile',
    helsenorge: 'no.helsenorge.mobile',
  },

  accessibility: {
    // Norwegian accessibility standards for mobile
    minimumFontSize: 16, // px
    minimumLineHeight: 1.5,
    minimumTouchTarget: 44, // px (WCAG 2.2 AA)
    recommendedTouchTarget: 48, // px (DigDir)
    colorContrastMinimum: 4.5, // WCAG AA
    animationDurationMax: 500, // ms
  },
};
