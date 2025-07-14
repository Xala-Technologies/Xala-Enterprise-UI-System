/**
 * Button Helper Functions
 * Style generation and utility functions for Button component
 */

import type { ButtonProps } from '../../types/action-feedback.types';
import type { NorwegianCompliance } from '../../utils/norwegian-compliance';

// Extended ButtonProps interface with Norwegian compliance
export interface ButtonPropsWithNorwegian extends ButtonProps {
  titleKey?: string;
  messageKey?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
  testId?: string;
  labelKey?: string;
  norwegian?: NorwegianCompliance & {
    municipality?: string;
    actionType?: string;
    priority?: string;
    requiresConfirmation?: boolean;
    confirmationMessageKey?: string;
  };
}

/**
 * Get size-based styles for Button component
 * @param size - Button size
 * @returns CSS styles object
 */
export const getSizeStyles = (size: string): React.CSSProperties => {
  const sizes = {
    sm: {
      padding: 'var(--spacing-2) var(--spacing-3)',
      fontSize: 'var(--font-size-sm)',
      minHeight: 'var(--button-height-sm)',
    },
    md: {
      padding: 'var(--spacing-3) var(--spacing-4)',
      fontSize: 'var(--font-size-base)',
      minHeight: 'var(--touch-target-min-height)', // Norwegian WCAG 2.2 accessibility
    },
    lg: {
      padding: 'var(--spacing-4) var(--spacing-6)',
      fontSize: 'var(--font-size-lg)',
      minHeight: 'var(--button-height-lg)',
    },
    xl: {
      padding: 'var(--spacing-5) var(--spacing-8)',
      fontSize: 'var(--font-size-xl)',
      minHeight: 'var(--button-height-xl)',
    },
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
};

/**
 * Get shape-based styles for Button component
 * @param shape - Button shape
 * @returns CSS styles object
 */
export const getShapeStyles = (shape: string): React.CSSProperties => {
  const shapes = {
    rounded: {
      borderRadius: 'var(--border-radius-base)',
    },
    pill: {
      borderRadius: 'var(--border-radius-full)',
    },
    square: {
      borderRadius: 'var(--border-radius-sm)',
    },
  };
  return shapes[shape as keyof typeof shapes] || shapes.rounded;
};

/**
 * Get variant-based styles for Button component
 * @param variant - Button variant
 * @param disabled - Whether button is disabled
 * @param loading - Whether button is loading
 * @returns CSS styles object
 */
export const getVariantStyles = (
  variant: string,
  disabled: boolean,
  loading: boolean
): React.CSSProperties => {
  const alpha = disabled || loading ? '50' : '100';

  const variants = {
    primary: {
      backgroundColor: `var(--color-primary-${alpha === '50' ? '300' : '600'})`,
      color: 'var(--color-white)',
      borderColor: `var(--color-primary-${alpha === '50' ? '300' : '600'})`,
    },
    secondary: {
      backgroundColor: 'var(--background-primary)',
      color: `var(--color-primary-${alpha === '50' ? '400' : '600'})`,
      borderColor: `var(--color-primary-${alpha === '50' ? '300' : '600'})`,
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: `var(--color-primary-${alpha === '50' ? '400' : '600'})`,
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: `var(--color-red-${alpha === '50' ? '300' : '600'})`,
      color: 'var(--color-white)',
      borderColor: `var(--color-red-${alpha === '50' ? '300' : '600'})`,
    },
    success: {
      backgroundColor: `var(--color-green-${alpha === '50' ? '300' : '600'})`,
      color: 'var(--color-white)',
      borderColor: `var(--color-green-${alpha === '50' ? '300' : '600'})`,
    },
    warning: {
      backgroundColor: `var(--color-orange-${alpha === '50' ? '300' : '600'})`,
      color: 'var(--color-white)',
      borderColor: `var(--color-orange-${alpha === '50' ? '300' : '600'})`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: `var(--text-${alpha === '50' ? 'tertiary' : 'primary'})`,
      borderColor: 'transparent',
    },
    link: {
      backgroundColor: 'transparent',
      color: `var(--color-primary-${alpha === '50' ? '400' : '600'})`,
      borderColor: 'transparent',
      textDecoration: 'underline',
      padding: '0',
      minHeight: 'auto',
    },
  };
  return variants[variant as keyof typeof variants] || variants.primary;
};

/**
 * Get width styles for Button component
 * @param fullWidth - Whether button should be full width
 * @returns CSS styles object
 */
export const getWidthStyles = (fullWidth: boolean): React.CSSProperties => {
  return fullWidth ? { width: '100%' } : {};
};

/**
 * Get Norwegian classification styles for Button component
 * @param classification - NSM classification level
 * @returns CSS styles object
 */
export const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) {
    return {};
  }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderLeft: 'var(--border-accent-width) solid var(--color-green-500)',
    },
    BEGRENSET: {
      borderLeft: 'var(--border-accent-width) solid var(--color-orange-500)',
    },
    KONFIDENSIELT: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-500)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-200)',
    },
    HEMMELIG: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-800)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-400)',
      backgroundColor: 'var(--color-red-900)',
      color: 'var(--color-white)',
    },
  };

  return classificationStyles[classification] || {};
};

/**
 * Get priority styles for Button component
 * @param priority - Priority level
 * @returns CSS styles object
 */
export const getPriorityStyles = (priority?: string): React.CSSProperties => {
  if (!priority) {
    return {};
  }

  const priorityStyles: Record<string, React.CSSProperties> = {
    low: {
      opacity: '0.8',
    },
    medium: {
      // Default styling
    },
    high: {
      boxShadow: 'var(--shadow-md)',
      transform: 'translateY(var(--transform-hover))',
    },
    critical: {
      boxShadow: 'var(--shadow-lg)',
      animation: 'button-pulse 2s infinite',
      borderWidth: 'var(--border-width-thick)',
    },
  };

  return priorityStyles[priority] || {};
};

/**
 * Generate complete Button styles using design tokens
 * @param props - Button component props
 * @returns Complete CSS styles object
 */
export const getButtonStyles = (props: ButtonPropsWithNorwegian): React.CSSProperties => {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    fullWidth = false,
    disabled = false,
    loading = false,
    norwegian,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-2)',
    fontFamily: 'var(--font-family-sans)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-none)',
    textAlign: 'center',
    userSelect: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-duration-fast) ease-in-out',
    border: 'var(--border-width) solid transparent',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    position: 'relative',
    overflow: 'hidden',
  };

  // Size-based styles
  const sizeStyles = getSizeStyles(size);

  // Shape-based styles
  const shapeStyles = getShapeStyles(shape);

  // Variant-based styles
  const variantStyles = getVariantStyles(variant, disabled, loading);

  // Full width styling
  const widthStyles = getWidthStyles(fullWidth);

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  // Priority styling
  const priorityStyles = getPriorityStyles(norwegian?.priority);

  return {
    ...baseStyles,
    ...sizeStyles,
    ...shapeStyles,
    ...variantStyles,
    ...widthStyles,
    ...classificationStyles,
    ...priorityStyles,
  };
};
