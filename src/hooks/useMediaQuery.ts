/**
 * @fileoverview useMediaQuery Hook - Responsive Design System
 * @description Provides responsive design capabilities with SSR safety and performance optimization
 * @version 5.0.0
 * @compliance Enterprise Standards, SSR-Safe, Performance Optimized
 */

import { useState, useEffect } from 'react';
import { usePlatform } from '../providers/UiProvider/UiProvider';
import { isServer } from '@/utils/ssr';

/**
 * Media query configuration
 */
export interface MediaQueryConfig {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  custom?: Record<string, string>;
}

/**
 * Hook for responsive media queries with SSR safety
 * @param query - Media query string or breakpoint name
 * @returns Boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const { platform } = usePlatform();

  useEffect(() => {
    if (isServer()) {
      // SSR: Use platform detection as fallback
      const platformMap: Record<string, boolean> = {
        mobile: query.includes('max-width: 768px') || query.includes('(max-width: 767px)'),
        tablet: query.includes('min-width: 768px') && query.includes('max-width: 1024px'),
        desktop: query.includes('min-width: 1024px'),
      };
      
      setMatches(platformMap[platform] || false);
      return;
    }

    // Client-side: Use actual media query
    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query, platform]);

  return matches;
}

/**
 * Hook for responsive breakpoints using predefined queries
 * @returns Object with boolean values for each breakpoint
 */
export function useResponsive(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeScreen: boolean;
} {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px) and (max-width: 1439px)');
  const isLargeScreen = useMediaQuery('(min-width: 1440px)');

  return { isMobile, isTablet, isDesktop, isLargeScreen };
}

/**
 * Hook for breakpoint-specific rendering
 * @param mobile - Component or value for mobile
 * @param tablet - Component or value for tablet
 * @param desktop - Component or value for desktop
 * @returns Appropriate value based on current breakpoint
 */
export function useBreakpoint<T>(
  mobile: T,
  tablet?: T,
  desktop?: T,
  largeScreen?: T
): T {
  const { isMobile, isTablet, isDesktop, isLargeScreen } = useResponsive();

  if (isLargeScreen && largeScreen !== undefined) return largeScreen;
  if (isDesktop && desktop !== undefined) return desktop;
  if (isTablet && tablet !== undefined) return tablet;
  return mobile;
}
