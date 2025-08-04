/**
 * @fileoverview Platform Detection and Configuration
 * @description Platform-specific utilities and constants for Norwegian compliance
 */

/**
 * Platform detection utilities
 */
export const platformDetection = {
  /**
   * Get current platform
   */
  getCurrentPlatform(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  },

  /**
   * Check if mobile device
   */
  isMobile(): boolean {
    return this.getCurrentPlatform() === 'mobile';
  },

  /**
   * Check if tablet device
   */
  isTablet(): boolean {
    return this.getCurrentPlatform() === 'tablet';
  },

  /**
   * Check if desktop device
   */
  isDesktop(): boolean {
    return this.getCurrentPlatform() === 'desktop';
  },

  /**
   * Norwegian platform configuration
   */
  norwegianConfig: {
    compliance: {
      wcag: 'WCAG_2_2_AAA',
      nsm: true,
      digdir: true,
      municipalitySupport: true,
    },
  },
};

/**
 * Norwegian platform constants
 */
export const NORWEGIAN_PLATFORM_CONSTANTS = {
  breakpoints: {
    mobile: {
      small: 320, // Small phones
      medium: 375, // Medium phones
      large: 414, // Large phones
    },
    tablet: {
      small: 768, // Small tablets
      medium: 834, // Medium tablets
      large: 1024, // Large tablets
    },
    desktop: {
      small: 1280, // Small desktops
      medium: 1440, // Medium desktops
      large: 1920, // Large desktops
    },
  },
  
  municipalities: {
    oslo: '0301',
    bergen: '4601',
    trondheim: '5001',
    stavanger: '1103',
    baerum: '3024',
    kristiansand: '4204',
    tromso: '1902',
  },
};

export default platformDetection;
