/**
 * Platform detection utilities for responsive design and feature detection
 * Provides SSR-safe platform detection and responsive utilities
 */

export type PlatformType = 'mobile' | 'tablet' | 'desktop' | 'web';
export type DeviceType = 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'unknown';

/**
 * Platform detection configuration
 */
interface PlatformConfig {
  mobileBreakpoint: number;
  tabletBreakpoint: number;
  desktopBreakpoint: number;
}

const defaultConfig: PlatformConfig = {
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  desktopBreakpoint: 1440,
};

/**
 * Get the current platform based on screen width
 * @param width - Screen width in pixels
 * @param config - Platform configuration
 * @returns The detected platform type
 */
export function getPlatformType(
  width: number,
  config: PlatformConfig = defaultConfig
): PlatformType {
  if (width < config.mobileBreakpoint) {
    return 'mobile';
  } else if (width < config.tabletBreakpoint) {
    return 'tablet';
  } else if (width < config.desktopBreakpoint) {
    return 'desktop';
  } else {
    return 'web';
  }
}

/**
 * Detect the device type based on user agent
 * @param userAgent - User agent string
 * @returns The detected device type
 */
export function getDeviceType(userAgent?: string): DeviceType {
  if (!userAgent) {
    if (typeof window === 'undefined') {
      return 'unknown';
    }
    userAgent = window.navigator.userAgent;
  }

  const ua = userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios';
  } else if (/android/.test(ua)) {
    return 'android';
  } else if (/windows/.test(ua)) {
    return 'windows';
  } else if (/macintosh|mac os x/.test(ua)) {
    return 'mac';
  } else if (/linux/.test(ua)) {
    return 'linux';
  }

  return 'unknown';
}

/**
 * Check if the current environment is a touch device
 * @returns True if touch device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

/**
 * Check if the current environment supports hover
 * @returns True if hover is supported
 */
export function supportsHover(): boolean {
  if (typeof window === 'undefined') {
    return true; // Default to hover support for SSR
  }

  return window.matchMedia('(hover: hover)').matches;
}

/**
 * Check if the current environment is reduced motion
 * @returns True if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false; // Default to full motion for SSR
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if the current environment is dark mode
 * @returns True if dark mode is preferred
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') {
    return false; // Default to light mode for SSR
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Check if the current environment is high contrast
 * @returns True if high contrast is preferred
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') {
    return false; // Default to normal contrast for SSR
  }

  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Get the current screen dimensions
 * @returns Object with width and height
 */
export function getScreenDimensions(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: 1024, height: 768 }; // Default for SSR
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Get the current device orientation
 * @returns 'portrait' or 'landscape'
 */
export function getOrientation(): 'portrait' | 'landscape' {
  if (typeof window === 'undefined') {
    return 'landscape'; // Default for SSR
  }

  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
}

/**
 * Check if the current environment is a PWA
 * @returns True if running as PWA
 */
export function isPWA(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

/**
 * Check if the current environment supports WebGL
 * @returns True if WebGL is supported
 */
export function supportsWebGL(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

/**
 * Get the current pixel density
 * @returns The pixel density ratio
 */
export function getPixelDensity(): number {
  if (typeof window === 'undefined') {
    return 1;
  }

  return window.devicePixelRatio || 1;
}

/**
 * Check if the current environment supports CSS Grid
 * @returns True if CSS Grid is supported
 */
export function supportsCSSGrid(): boolean {
  if (typeof window === 'undefined') {
    return true; // Assume support for SSR
  }

  return CSS.supports('display', 'grid');
}

/**
 * Check if the current environment supports CSS Custom Properties
 * @returns True if CSS Custom Properties are supported
 */
export function supportsCSSCustomProperties(): boolean {
  if (typeof window === 'undefined') {
    return true; // Assume support for SSR
  }

  return CSS.supports('color', 'var(--test)');
}

/**
 * Get the current browser information
 * @returns Object with browser name and version
 */
export function getBrowserInfo(): {
  name: string;
  version: string;
  majorVersion: number;
} {
  if (typeof window === 'undefined') {
    return { name: 'unknown', version: 'unknown', majorVersion: 0 };
  }

  const userAgent = window.navigator.userAgent;
  const browserRegex = /(chrome|firefox|safari|edge|opera|msie|trident)\/?\s*([\d.]+)/i;
  const match = userAgent.match(browserRegex);

  if (!match) {
    return { name: 'unknown', version: 'unknown', majorVersion: 0 };
  }

  const name = match[1].toLowerCase();
  const version = match[2];
  const majorVersion = parseInt(version.split('.')[0], 10);

  return { name, version, majorVersion };
}
