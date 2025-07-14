// Platform Components for @xala-technologies/ui-system
// Norwegian government-compliant mobile and desktop components

// Export mobile platform components
export * from './mobile';

// Export desktop platform components
export { DesktopSidebar } from './desktop/components/DesktopSidebar';

// Platform detection utilities
export const platformUtils = {
  // Device detection
  isMobile: () => window.innerWidth <= 768,
  isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
  isDesktop: () => window.innerWidth > 1024,

  // Touch capability detection
  hasTouchScreen: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,

  // Platform optimization
  getOptimalPlatform: () => {
    if (window.innerWidth <= 768) {
      return 'mobile';
    }
    if (window.innerWidth <= 1024) {
      return 'tablet';
    }
    return 'desktop';
  },

  // Norwegian platform compliance
  norwegianCompliance: {
    // Universal design requirements
    universalDesign: {
      minimumContrastRatio: 4.5, // WCAG AA
      minimumTouchTarget: 44, // px
      maximumCognitiveLoad: 7, // items
      readingLevel: 'B1', // Norwegian language level
    },

    // Platform-specific requirements
    mobile: {
      minimumTouchTarget: 44, // px - WCAG 2.2 AA
      recommendedTouchTarget: 48, // px - DigDir
      safeAreaHandling: true,
      emergencyAccess: true,
    },

    desktop: {
      keyboardNavigation: true,
      norwegianShortcuts: true,
      resizableComponents: true,
      multiWindowSupport: true,
    },

    // Government standards
    nsm: {
      classificationRequired: true,
      auditLogging: true,
      secureDataHandling: true,
      emergencyOverrides: true,
    },

    digdir: {
      designPrinciples: true,
      accessibilityFirst: true,
      norwegianLanguage: true,
      municipalitySupport: true,
    },
  },
};

// Norwegian platform constants
export const NORWEGIAN_PLATFORM_CONSTANTS = {
  breakpoints: {
    mobile: {
      small: 320, // Small phones
      medium: 375, // Standard phones
      large: 414, // Large phones
    },
    tablet: {
      small: 768, // Small tablets
      large: 1024, // Large tablets
    },
    desktop: {
      small: 1280, // Small desktop
      medium: 1440, // Standard desktop
      large: 1920, // Large desktop
      xlarge: 2560, // 4K displays
    },
  },

  accessibility: {
    wcag: {
      minimumContrastRatio: 4.5,
      largeTextContrastRatio: 3,
      minimumTouchTarget: 44,
      maximumAnimationDuration: 500,
    },

    norwegian: {
      languageSupport: ['nb-NO', 'nn-NO', 'en-NO'],
      readingLevel: 'B1',
      cognitiveLoad: 7,
      emergencyAccess: true,
    },
  },

  government: {
    services: ['altinn', 'idporten', 'bankid', 'helsenorge', 'brreg', 'nav'],

    classifications: ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'],

    municipalities: {
      major: {
        oslo: '0301',
        bergen: '1201',
        trondheim: '1601',
        stavanger: '1103',
        tromso: '1902',
      },
    },
  },
};
