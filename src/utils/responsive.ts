/**
 * @fileoverview Responsive Utilities v5.0.0 - Token-Based Design System
 * @description Comprehensive responsive utilities using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import { useEffect, useState, useMemo } from 'react';

// =============================================================================
// RESPONSIVE BREAKPOINT TYPES
// =============================================================================

export interface ResponsiveBreakpoints {
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly xl: number;
  readonly '2xl': number;
}

export interface ResponsiveConfig<T> {
  readonly default?: T;
  readonly xs?: T;
  readonly sm?: T;
  readonly md?: T;
  readonly lg?: T;
  readonly xl?: T;
  readonly '2xl'?: T;
}

export type BreakpointKey = keyof ResponsiveBreakpoints;

export interface ResponsiveUtilsConfig {
  readonly breakpoints: ResponsiveBreakpoints;
  readonly defaultBreakpoint: BreakpointKey;
}

// =============================================================================
// DEFAULT RESPONSIVE CONFIGURATION
// =============================================================================

export const DEFAULT_BREAKPOINTS: ResponsiveBreakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const DEFAULT_RESPONSIVE_CONFIG: ResponsiveUtilsConfig = {
  breakpoints: DEFAULT_BREAKPOINTS,
  defaultBreakpoint: 'md',
} as const;

// =============================================================================
// RESPONSIVE UTILITY FUNCTIONS
// =============================================================================

/**
 * Get the current breakpoint based on window width
 */
export const getCurrentBreakpoint = (
  width: number,
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): BreakpointKey => {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  if (width >= breakpoints.xs) return 'xs';
  return 'xs';
};

/**
 * Check if current width matches a breakpoint
 */
export const isBreakpoint = (
  width: number,
  breakpoint: BreakpointKey,
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): boolean => {
  return getCurrentBreakpoint(width, breakpoints) === breakpoint;
};

/**
 * Check if current width is at or above a breakpoint
 */
export const isBreakpointUp = (
  width: number,
  breakpoint: BreakpointKey,
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): boolean => {
  return width >= breakpoints[breakpoint];
};

/**
 * Check if current width is below a breakpoint
 */
export const isBreakpointDown = (
  width: number,
  breakpoint: BreakpointKey,
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): boolean => {
  return width < breakpoints[breakpoint];
};

/**
 * Get responsive value based on current breakpoint
 */
export const getResponsiveValue = <T>(
  config: ResponsiveConfig<T>,
  currentBreakpoint: BreakpointKey,
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): T | undefined => {
  // Check for exact match first
  if (config[currentBreakpoint] !== undefined) {
    return config[currentBreakpoint];
  }

  // Fall back to smaller breakpoints
  const breakpointOrder: BreakpointKey[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (config[bp] !== undefined) {
      return config[bp];
    }
  }

  // Fall back to default
  return config.default;
};

/**
 * Generate responsive CSS classes
 */
export const generateResponsiveClasses = <T extends string>(
  config: ResponsiveConfig<T>,
  classPrefix: string = ''
): string => {
  const classes: string[] = [];

  // Add default class
  if (config.default) {
    classes.push(`${classPrefix}${config.default}`);
  }

  // Add breakpoint-specific classes
  const breakpoints: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  
  breakpoints.forEach(bp => {
    if (config[bp]) {
      classes.push(`${bp}:${classPrefix}${config[bp]}`);
    }
  });

  return classes.join(' ');
};

/**
 * Create media query string for breakpoint
 */
export const createMediaQuery = (
  breakpoint: BreakpointKey,
  direction: 'up' | 'down' | 'only' = 'up',
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): string => {
  const bp = breakpoints[breakpoint];
  
  switch (direction) {
    case 'up':
      return `(min-width: ${bp}px)`;
    case 'down':
      return `(max-width: ${bp - 1}px)`;
    case 'only': {
      const breakpointOrder: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      const currentIndex = breakpointOrder.indexOf(breakpoint);
      const nextBreakpoint = breakpointOrder[currentIndex + 1];
      
      if (!nextBreakpoint) {
        return `(min-width: ${bp}px)`;
      }
      
      const nextBp = breakpoints[nextBreakpoint];
      return `(min-width: ${bp}px) and (max-width: ${nextBp - 1}px)`;
    }
    default:
      return `(min-width: ${bp}px)`;
  }
};

// =============================================================================
// SSR-SAFE RESPONSIVE HOOKS
// =============================================================================

/**
 * SSR-safe hook to get current window width
 */
export const useWindowWidth = (): number => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Set initial width
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    updateWidth();

    // Add event listener
    window.addEventListener('resize', updateWidth);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return width;
};

/**
 * SSR-safe hook to get current breakpoint
 */
export const useBreakpoint = (
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): BreakpointKey => {
  const width = useWindowWidth();
  
  return useMemo(() => {
    if (width === 0) return 'md'; // SSR fallback
    return getCurrentBreakpoint(width, breakpoints);
  }, [width, breakpoints]);
};

/**
 * SSR-safe hook to check if at or above breakpoint
 */
export const useBreakpointUp = (
  breakpoint: BreakpointKey,
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): boolean => {
  const width = useWindowWidth();
  
  return useMemo(() => {
    if (width === 0) return breakpoint === 'xs' || breakpoint === 'sm'; // SSR fallback
    return isBreakpointUp(width, breakpoint, breakpoints);
  }, [width, breakpoint, breakpoints]);
};

/**
 * SSR-safe hook to check if below breakpoint
 */
export const useBreakpointDown = (
  breakpoint: BreakpointKey,
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): boolean => {
  const width = useWindowWidth();
  
  return useMemo(() => {
    if (width === 0) return breakpoint !== 'xs'; // SSR fallback
    return isBreakpointDown(width, breakpoint, breakpoints);
  }, [width, breakpoint, breakpoints]);
};

/**
 * SSR-safe hook to get responsive value
 */
export const useResponsiveValue = <T>(
  config: ResponsiveConfig<T>,
  breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS
): T | undefined => {
  const currentBreakpoint = useBreakpoint(breakpoints);
  
  return useMemo(() => {
    return getResponsiveValue(config, currentBreakpoint, breakpoints);
  }, [config, currentBreakpoint, breakpoints]);
};

/**
 * Hook for media query matching with SSR safety
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Add listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      (mediaQuery as any).addListener(listener);
    }

    // Cleanup
    return () => {
      if ('removeEventListener' in mediaQuery) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        (mediaQuery as any).removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};

// =============================================================================
// RESPONSIVE UTILITY CLASSES
// =============================================================================

/**
 * Responsive utility class generator
 */
export class ResponsiveUtils {
  private breakpoints: ResponsiveBreakpoints;

  constructor(breakpoints: ResponsiveBreakpoints = DEFAULT_BREAKPOINTS) {
    this.breakpoints = breakpoints;
  }

  /**
   * Get current breakpoint for given width
   */
  getCurrentBreakpoint(width: number): BreakpointKey {
    return getCurrentBreakpoint(width, this.breakpoints);
  }

  /**
   * Check breakpoint conditions
   */
  isBreakpoint(width: number, breakpoint: BreakpointKey): boolean {
    return isBreakpoint(width, breakpoint, this.breakpoints);
  }

  isBreakpointUp(width: number, breakpoint: BreakpointKey): boolean {
    return isBreakpointUp(width, breakpoint, this.breakpoints);
  }

  isBreakpointDown(width: number, breakpoint: BreakpointKey): boolean {
    return isBreakpointDown(width, breakpoint, this.breakpoints);
  }

  /**
   * Get responsive value
   */
  getResponsiveValue<T>(config: ResponsiveConfig<T>, width: number): T | undefined {
    const currentBreakpoint = this.getCurrentBreakpoint(width);
    return getResponsiveValue(config, currentBreakpoint, this.breakpoints);
  }

  /**
   * Create media query
   */
  createMediaQuery(
    breakpoint: BreakpointKey,
    direction: 'up' | 'down' | 'only' = 'up'
  ): string {
    return createMediaQuery(breakpoint, direction, this.breakpoints);
  }

  /**
   * Generate responsive classes
   */
  generateResponsiveClasses<T extends string>(
    config: ResponsiveConfig<T>,
    classPrefix: string = ''
  ): string {
    return generateResponsiveClasses(config, classPrefix);
  }
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export const responsiveUtils = new ResponsiveUtils(DEFAULT_BREAKPOINTS);

// Export individual utilities for convenience
export {
  getCurrentBreakpoint as getCurrentBreakpointUtil,
  isBreakpoint as isBreakpointUtil,
  isBreakpointUp as isBreakpointUpUtil,
  isBreakpointDown as isBreakpointDownUtil,
  getResponsiveValue as getResponsiveValueUtil,
  generateResponsiveClasses as generateResponsiveClassesUtil,
  createMediaQuery as createMediaQueryUtil,
};