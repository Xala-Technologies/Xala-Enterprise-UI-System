/**
 * @fileoverview Enhanced Components Export - CVA Pattern
 * @description Complete export system for production-ready components using CVA pattern
 * @version 5.0.0
 * @compliance CVA-based, SSR-Safe, No hooks, Semantic tokens, Production-ready
 */

// =============================================================================
// ENHANCED CVA COMPONENTS
// =============================================================================

// Import all components first
import {
  EnhancedCard,
  type EnhancedCardProps,
  type EnhancedCardVariant,
  enhancedCardVariants,
} from './ThemeAwareCard';

import {
  EnhancedSearch,
  type EnhancedSearchProps,
  type EnhancedSearchVariant,
  enhancedSearchVariants,
} from './ThemeAwareSearch';

import {
  EnhancedButton,
  ButtonGroup,
  type EnhancedButtonProps,
  type EnhancedButtonVariant,
  type ButtonGroupProps,
  enhancedButtonVariants,
} from './ThemeAwareButton';

// Re-export components
export {
  EnhancedCard,
  type EnhancedCardProps,
  type EnhancedCardVariant,
  enhancedCardVariants,
} from './ThemeAwareCard';

export {
  EnhancedSearch,
  type EnhancedSearchProps,
  type EnhancedSearchVariant,
  enhancedSearchVariants,
} from './ThemeAwareSearch';

export {
  EnhancedButton,
  ButtonGroup,
  type EnhancedButtonProps,
  type EnhancedButtonVariant,
  type ButtonGroupProps,
  enhancedButtonVariants,
} from './ThemeAwareButton';

// Backward compatibility exports
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
  themeAwareSearchVariants,
} from './ThemeAwareSearch';

export {
  ThemeAwareButton,
  type ThemeAwareButtonProps,
  type ThemeAwareButtonVariant,
  themeAwareButtonVariants,
} from './ThemeAwareButton';

// =============================================================================
// COMPONENT COLLECTIONS
// =============================================================================

/**
 * Collection of all enhanced CVA components
 */
export const EnhancedComponents = {
  // Cards
  Card: EnhancedCard,
  
  // Inputs & Search
  Search: EnhancedSearch,
  
  // Buttons
  Button: EnhancedButton,
  ButtonGroup,
} as const;

/**
 * Collection of all component variants
 */
export const EnhancedVariants = {
  Card: enhancedCardVariants,
  Search: enhancedSearchVariants,
  Button: enhancedButtonVariants,
} as const;

// =============================================================================
// TYPE COLLECTIONS
// =============================================================================

/**
 * Collection of all enhanced component prop types
 */
export type EnhancedComponentProps = {
  Card: EnhancedCardProps;
  Search: EnhancedSearchProps;
  Button: EnhancedButtonProps;
  ButtonGroup: ButtonGroupProps;
};

/**
 * Collection of all enhanced variant types
 */
export type EnhancedVariantTypes = {
  Card: EnhancedCardVariant;
  Search: EnhancedSearchVariant;
  Button: EnhancedButtonVariant;
};

// =============================================================================
// UTILITY EXPORTS
// =============================================================================

/**
 * Common enhanced component patterns using CVA
 */
export const EnhancedPatterns = {
  /**
   * Get responsive size based on screen size
   */
  getResponsiveSize: (isMobile: boolean, isTablet: boolean) => {
    if (isMobile) return 'sm' as const;
    if (isTablet) return 'md' as const;
    return 'lg' as const;
  },
  
  /**
   * Get component state based on validation
   */
  getValidationState: (isValid?: boolean, hasError?: boolean) => {
    if (hasError) return 'error' as const;
    if (isValid === true) return 'success' as const;
    return 'default' as const;
  },
  
  /**
   * Get interaction settings based on context
   */
  getInteractionSettings: (clickable: boolean, disabled: boolean) => ({
    interactive: clickable && !disabled,
    tabIndex: clickable && !disabled ? 0 : -1,
    role: clickable ? 'button' : undefined,
  }),
} as const;