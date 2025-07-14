/**
 * Platform-specific Design Tokens
 * Comprehensive token system for desktop, mobile, and tablet platforms
 */


/**
 * Platform breakpoints
 */
export const breakpoints = {
  mobile: '0px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
  ultrawide: '1920px',
} as const;

/**
 * Platform-specific spacing tokens
 */
export const platformSpacing = {
  mobile: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  tablet: {
    xs: '6px',
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '40px',
    xxl: '56px',
    xxxl: '72px',
  },
  desktop: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '40px',
    xl: '48px',
    xxl: '64px',
    xxxl: '80px',
  },
} as const;

/**
 * Platform-specific typography tokens
 */
export const platformTypography = {
  mobile: {
    display: {
      fontSize: '32px',
      lineHeight: '36px',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    h1: {
      fontSize: '24px',
      lineHeight: '30px',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '20px',
      lineHeight: '26px',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: '600',
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: '600',
      letterSpacing: '0em',
    },
    body: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    caption: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '400',
      letterSpacing: '0.01em',
    },
    small: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      letterSpacing: '0.01em',
    },
  },
  tablet: {
    display: {
      fontSize: '40px',
      lineHeight: '48px',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    h1: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: '600',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: '600',
      letterSpacing: '0em',
    },
    body: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    caption: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '400',
      letterSpacing: '0.01em',
    },
    small: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      letterSpacing: '0.01em',
    },
  },
  desktop: {
    display: {
      fontSize: '48px',
      lineHeight: '56px',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    h1: {
      fontSize: '40px',
      lineHeight: '48px',
      fontWeight: '600',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: '600',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    body: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    caption: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '400',
      letterSpacing: '0.01em',
    },
    small: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      letterSpacing: '0.01em',
    },
  },
} as const;

/**
 * Platform-specific component sizes
 */
export const platformComponentSizes = {
  mobile: {
    button: {
      sm: {
        height: '36px',
        padding: '8px 16px',
        fontSize: '14px',
        minWidth: '44px', // WCAG touch target
      },
      md: {
        height: '44px',
        padding: '12px 20px',
        fontSize: '16px',
        minWidth: '44px',
      },
      lg: {
        height: '52px',
        padding: '16px 24px',
        fontSize: '18px',
        minWidth: '52px',
      },
    },
    input: {
      sm: {
        height: '36px',
        padding: '8px 12px',
        fontSize: '14px',
      },
      md: {
        height: '44px',
        padding: '12px 16px',
        fontSize: '16px',
      },
      lg: {
        height: '52px',
        padding: '16px 20px',
        fontSize: '18px',
      },
    },
    card: {
      borderRadius: '12px',
      padding: '16px',
      gap: '12px',
    },
    modal: {
      borderRadius: '16px',
      padding: '24px',
      margin: '16px',
    },
  },
  tablet: {
    button: {
      sm: {
        height: '40px',
        padding: '10px 18px',
        fontSize: '14px',
        minWidth: '44px',
      },
      md: {
        height: '48px',
        padding: '14px 24px',
        fontSize: '16px',
        minWidth: '48px',
      },
      lg: {
        height: '56px',
        padding: '18px 28px',
        fontSize: '18px',
        minWidth: '56px',
      },
    },
    input: {
      sm: {
        height: '40px',
        padding: '10px 14px',
        fontSize: '14px',
      },
      md: {
        height: '48px',
        padding: '14px 18px',
        fontSize: '16px',
      },
      lg: {
        height: '56px',
        padding: '18px 22px',
        fontSize: '18px',
      },
    },
    card: {
      borderRadius: '16px',
      padding: '20px',
      gap: '16px',
    },
    modal: {
      borderRadius: '20px',
      padding: '32px',
      margin: '24px',
    },
  },
  desktop: {
    button: {
      sm: {
        height: '36px',
        padding: '8px 16px',
        fontSize: '14px',
        minWidth: '44px',
      },
      md: {
        height: '44px',
        padding: '12px 20px',
        fontSize: '16px',
        minWidth: '44px',
      },
      lg: {
        height: '52px',
        padding: '16px 24px',
        fontSize: '18px',
        minWidth: '52px',
      },
    },
    input: {
      sm: {
        height: '36px',
        padding: '8px 12px',
        fontSize: '14px',
      },
      md: {
        height: '44px',
        padding: '12px 16px',
        fontSize: '16px',
      },
      lg: {
        height: '52px',
        padding: '16px 20px',
        fontSize: '18px',
      },
    },
    card: {
      borderRadius: '12px',
      padding: '24px',
      gap: '20px',
    },
    modal: {
      borderRadius: '16px',
      padding: '40px',
      margin: '32px',
    },
  },
} as const;

/**
 * Platform-specific layout tokens
 */
export const platformLayout = {
  mobile: {
    container: {
      maxWidth: '100%',
      padding: '16px',
    },
    grid: {
      columns: 1,
      gap: '16px',
    },
    header: {
      height: '64px',
      padding: '12px 16px',
    },
    sidebar: {
      width: '280px',
      padding: '16px',
    },
    navigation: {
      height: '72px',
      padding: '12px 16px',
    },
  },
  tablet: {
    container: {
      maxWidth: '768px',
      padding: '24px',
    },
    grid: {
      columns: 2,
      gap: '24px',
    },
    header: {
      height: '72px',
      padding: '16px 24px',
    },
    sidebar: {
      width: '320px',
      padding: '24px',
    },
    navigation: {
      height: '80px',
      padding: '16px 24px',
    },
  },
  desktop: {
    container: {
      maxWidth: '1200px',
      padding: '32px',
    },
    grid: {
      columns: 3,
      gap: '32px',
    },
    header: {
      height: '80px',
      padding: '20px 32px',
    },
    sidebar: {
      width: '280px',
      padding: '32px',
    },
    navigation: {
      height: '88px',
      padding: '20px 32px',
    },
  },
} as const;

/**
 * Platform-specific animation tokens
 */
export const platformAnimation = {
  mobile: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transform: {
      slideIn: 'translateX(100%)',
      slideOut: 'translateX(-100%)',
      fadeIn: 'opacity 0',
      fadeOut: 'opacity 1',
    },
  },
  tablet: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '400ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transform: {
      slideIn: 'translateX(100%)',
      slideOut: 'translateX(-100%)',
      fadeIn: 'opacity 0',
      fadeOut: 'opacity 1',
    },
  },
  desktop: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transform: {
      slideIn: 'translateX(100%)',
      slideOut: 'translateX(-100%)',
      fadeIn: 'opacity 0',
      fadeOut: 'opacity 1',
    },
  },
} as const;

/**
 * Platform-specific shadows
 */
export const platformShadows = {
  mobile: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.18)',
  },
  tablet: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.15)',
  },
  desktop: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
    md: '0 2px 6px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
} as const;

/**
 * Platform detection utilities
 */
export const platformUtils = {
  getCurrentPlatform: (): 'mobile' | 'tablet' | 'desktop' => {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  },
  
  getTokensForPlatform: (platform: 'mobile' | 'tablet' | 'desktop') => ({
    spacing: platformSpacing[platform],
    typography: platformTypography[platform],
    componentSizes: platformComponentSizes[platform],
    layout: platformLayout[platform],
    animation: platformAnimation[platform],
    shadows: platformShadows[platform],
  }),
  
  getResponsiveValue: <T>(values: { mobile: T; tablet: T; desktop: T }): T => {
    const platform = platformUtils.getCurrentPlatform();
    return values[platform];
  },
};

/**
 * Responsive CSS utilities
 */
export const responsiveCSS = {
  mobile: `@media (max-width: ${breakpoints.tablet})`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
  ultrawide: `@media (min-width: ${breakpoints.ultrawide})`,
};

/**
 * Export all platform tokens
 */
export const platformTokens = {
  breakpoints,
  spacing: platformSpacing,
  typography: platformTypography,
  componentSizes: platformComponentSizes,
  layout: platformLayout,
  animation: platformAnimation,
  shadows: platformShadows,
  utils: platformUtils,
  css: responsiveCSS,
};

export default platformTokens; 