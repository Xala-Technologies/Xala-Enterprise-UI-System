/**
 * Toast Helper Functions
 * Style generation and utility functions for Toast component
 */

import type React from 'react';
import type { ToastProps } from '../../types/action-feedback.types';
import type { NorwegianCompliance } from '../../utils/norwegian-compliance';

// Extended ToastProps interface with Norwegian compliance
export interface ToastPropsWithNorwegian extends Omit<ToastProps, 'norwegian'> {
  titleKey?: string;
  messageKey?: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
  testId?: string;
  norwegian?: NorwegianCompliance & {
    priority?: 'lav' | 'middels' | 'høy' | 'kritisk';
    classification?: string;
  };
}

/**
 * Get position-based styles for Toast component
 * @param position - Toast position
 * @returns CSS styles object
 */
export const getPositionStyles = (position: string): React.CSSProperties => {
  const positions = {
    'top-left': { top: 'var(--spacing-4)', left: 'var(--spacing-4)' },
    'top-center': { top: 'var(--spacing-4)', left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: 'var(--spacing-4)', right: 'var(--spacing-4)' },
    'bottom-left': { bottom: 'var(--spacing-4)', left: 'var(--spacing-4)' },
    'bottom-center': { bottom: 'var(--spacing-4)', left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: 'var(--spacing-4)', right: 'var(--spacing-4)' },
  };
  return positions[position as keyof typeof positions] || positions['bottom-right'];
};

/**
 * Get variant-based styles for Toast component
 * @param variant - Toast variant
 * @returns CSS styles object
 */
export const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants = {
    info: {
      backgroundColor: 'var(--color-blue-600)',
      borderColor: 'var(--color-blue-700)',
      color: 'var(--color-white)',
    },
    success: {
      backgroundColor: 'var(--color-green-600)',
      borderColor: 'var(--color-green-700)',
      color: 'var(--color-white)',
    },
    warning: {
      backgroundColor: 'var(--color-orange-600)',
      borderColor: 'var(--color-orange-700)',
      color: 'var(--color-white)',
    },
    error: {
      backgroundColor: 'var(--color-red-600)',
      borderColor: 'var(--color-red-700)',
      color: 'var(--color-white)',
    },
  };
  return variants[variant as keyof typeof variants] || variants.info;
};

/**
 * Get priority styles for Toast component
 * @param priority - Priority level
 * @returns CSS styles object
 */
export const getPriorityStyles = (priority?: string): React.CSSProperties => {
  if (!priority) return {};
  const priorityStyles: Record<string, React.CSSProperties> = {
    low: { opacity: '0.9' },
    medium: {},
    high: { borderWidth: 'var(--border-width-thick)', boxShadow: 'var(--shadow-2xl)' },
    critical: {
      borderWidth: 'var(--border-width-thick)',
      boxShadow: 'var(--shadow-2xl)',
      animation:
        'toast-pulse 2s infinite, toast-slide-in var(--transition-duration-normal) ease-out',
    },
  };
  return priorityStyles[priority] || {};
};

/**
 * Get Norwegian classification styles for Toast component
 * @param classification - NSM classification level
 * @returns CSS styles object
 */
export const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) return {};
  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: { borderLeft: 'var(--border-accent-width) solid var(--color-green-400)' },
    BEGRENSET: { borderLeft: 'var(--border-accent-width) solid var(--color-orange-400)' },
    KONFIDENSIELT: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-400)',
      backgroundColor: 'var(--color-red-800)',
    },
    HEMMELIG: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-300)',
      backgroundColor: 'var(--color-red-900)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-400), var(--shadow-xl)',
    },
  };
  return classificationStyles[classification] || {};
};

/**
 * Generate complete Toast styles using design tokens
 * @param props - Toast component props
 * @returns Complete CSS styles object
 */
export const getToastStyles = (props: ToastPropsWithNorwegian): React.CSSProperties => {
  const { variant = 'info', position = 'bottom-right', norwegian } = props;
  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-4)',
    minWidth: 'var(--toast-min-width)',
    maxWidth: 'var(--toast-max-width)',
    borderRadius: 'var(--border-radius-lg)',
    border: 'var(--border-width) solid transparent',
    fontFamily: 'var(--font-family-sans)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
    boxShadow: 'var(--shadow-xl)',
    backdropFilter: 'blur(var(--blur-md))',
    position: 'fixed',
    zIndex: 'var(--z-index-toast)',
    animation: 'toast-slide-in var(--transition-duration-normal) ease-out',
    cursor: 'pointer',
    transition: 'all var(--transition-duration-fast) ease',
  };
  // Position-based styles
  const positionStyles = getPositionStyles(position);
  // Variant-based styles
  const variantStyles = getVariantStyles(variant);
  // Priority styling
  const priorityStyles = getPriorityStyles(norwegian?.priority);
  // Classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);
  return {
    ...baseStyles,
    ...positionStyles,
    ...variantStyles,
    ...priorityStyles,
    ...classificationStyles,
  };
};

/**
 * Get toast role based on variant
 * @param variant - Toast variant
 * @returns ARIA role string
 */
export const getToastRole = (variant: string): string => {
  return variant === 'error' || variant === 'warning' ? 'alert' : 'status';
};

/**
 * Get aria-live attribute based on variant
 * @param variant - Toast variant
 * @returns aria-live value
 */
export const getAriaLive = (variant: string): 'polite' | 'assertive' | 'off' => {
  if (variant === 'error') return 'assertive';
  if (variant === 'warning') return 'assertive';
  return 'polite';
};

/**
 * Get Norwegian NSM classification icon for a given level
 * @param level - NSM classification level
 * @returns Unicode icon string
 */
export const getClassificationIcon = (level: string): string => {
  const icons: Record<string, string> = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level] || '📋';
};

/**
 * Get Norwegian priority icon for a given priority
 * @param priority - Priority level
 * @returns Unicode icon string
 */
export const getPriorityIcon = (priority?: string): string => {
  const icons: Record<string, string> = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  const key = priority && icons[priority] ? priority : 'medium';
  return icons[key] || '■';
};
