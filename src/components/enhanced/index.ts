/**
 * @fileoverview Enhanced Theme-Aware Components Export
 * @description Complete export system for production-ready, theme-aware components
 * @version 5.0.0
 * @compliance Multi-theme support, Design token-driven, Production-ready
 */

// =============================================================================
// ENHANCED THEME-AWARE COMPONENTS
// =============================================================================

// Core enhanced components
export {
  ThemeAwareCard,
  type ThemeAwareCardProps,
  type ThemeAwareCardVariant,
  themeAwareCardVariants,
} from './ThemeAwareCard';

export {
  ThemeAwareSearch,
  type ThemeAwareSearchProps,
  type ThemeAwareSearchVariant,
  type SearchResult,
  themeAwareSearchVariants,
} from './ThemeAwareSearch';

export {
  ThemeAwareButton,
  ButtonGroup,
  type ThemeAwareButtonProps,
  type ThemeAwareButtonVariant,
  type ButtonGroupProps,
  themeAwareButtonVariants,
} from './ThemeAwareButton';

// =============================================================================
// COMPONENT COLLECTIONS
// =============================================================================

/**
 * Collection of all enhanced theme-aware components
 */
export const EnhancedComponents = {
  // Cards
  Card: ThemeAwareCard,
  
  // Inputs & Search
  Search: ThemeAwareSearch,
  
  // Buttons
  Button: ThemeAwareButton,
  ButtonGroup,
} as const;

/**
 * Collection of all component variants
 */
export const EnhancedVariants = {
  Card: themeAwareCardVariants,
  Search: themeAwareSearchVariants,
  Button: themeAwareButtonVariants,
} as const;

// =============================================================================
// TYPE COLLECTIONS
// =============================================================================

/**
 * Collection of all component prop types
 */
export type EnhancedComponentProps = {
  Card: ThemeAwareCardProps;
  Search: ThemeAwareSearchProps;
  Button: ThemeAwareButtonProps;
  ButtonGroup: ButtonGroupProps;
};

/**
 * Collection of all variant types
 */
export type EnhancedVariantTypes = {
  Card: ThemeAwareCardVariant;
  Search: ThemeAwareSearchVariant;
  Button: ThemeAwareButtonVariant;
};

// =============================================================================
// UTILITY EXPORTS
// =============================================================================

/**
 * Common theme-aware component patterns
 */
export const ThemeAwarePatterns = {
  /**
   * Get responsive size based on screen size
   */
  getResponsiveSize: (isMobile: boolean, isTablet: boolean) => {
    if (isMobile) return 'sm' as const;
    if (isTablet) return 'md' as const;
    return 'lg' as const;
  },
  
  /**
   * Get elevation based on hierarchy level
   */
  getElevationLevel: (level: 'base' | 'raised' | 'floating' | 'modal') => {
    const levels = {
      base: 0,
      raised: 1,
      floating: 2,
      modal: 4,
    } as const;
    return levels[level];
  },
  
  /**
   * Get animation settings based on performance preferences
   */
  getAnimationSettings: (prefersReducedMotion: boolean) => ({
    enableAnimations: !prefersReducedMotion,
    duration: prefersReducedMotion ? '0ms' : '300ms',
  }),
} as const;