/**
 * Alert Helper Functions
 * Style generation and utility functions for Alert component
 */

import type React from 'react';
import type { AlertProps } from '../../types/action-feedback.types';
import type { NorwegianCompliance } from '../../utils/norwegian-compliance';

// Extended AlertProps interface with Norwegian compliance
export interface AlertPropsWithNorwegian extends AlertProps {
  titleKey?: string;
  messageKey?: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
  testId?: string;
  norwegian?: NorwegianCompliance & {
    municipality?: string;
    category?: string;
    onAcknowledgment?: () => void;
    requiresAcknowledgment?: boolean;
    acknowledgmentMessageKey?: string;
    relatedDocumentationKey?: string;
  };
}

/**
 * Get variant-based styles for Alert component
 * @param variant - Alert variant type
 * @returns CSS styles object
 */
export const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants = {
    info: {
      backgroundColor: 'var(--color-blue-50)',
      borderColor: 'var(--color-blue-200)',
      color: 'var(--color-blue-800)',
    },
    success: {
      backgroundColor: 'var(--color-green-50)',
      borderColor: 'var(--color-green-200)',
      color: 'var(--color-green-800)',
    },
    warning: {
      backgroundColor: 'var(--color-orange-50)',
      borderColor: 'var(--color-orange-200)',
      color: 'var(--color-orange-800)',
    },
    error: {
      backgroundColor: 'var(--color-red-50)',
      borderColor: 'var(--color-red-200)',
      color: 'var(--color-red-800)',
    },
  };
  return variants[variant as keyof typeof variants] || variants.info;
};

/**
 * Get severity-based styles for Alert component
 * @param severity - Alert severity level
 * @returns CSS styles object
 */
export const getSeverityStyles = (severity: string): React.CSSProperties => {
  const severities = {
    low: {
      borderLeftWidth: 'var(--border-width)',
    },
    medium: {
      borderLeftWidth: 'var(--border-accent-width)',
    },
    high: {
      borderLeftWidth: 'var(--border-thick-width)',
      boxShadow: 'var(--shadow-sm)',
    },
    critical: {
      borderLeftWidth: 'var(--border-thick-width)',
      boxShadow: 'var(--shadow-md)',
      borderWidth: 'var(--border-width-thick)',
    },
  };
  return severities[severity as keyof typeof severities] || severities.medium;
};

/**
 * Get Norwegian classification styles
 * @param classification - NSM classification level
 * @returns CSS styles object
 */
export const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) {
    return {};
  }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderTop: 'var(--border-accent-width) solid var(--color-green-500)',
    },
    BEGRENSET: {
      borderTop: 'var(--border-accent-width) solid var(--color-orange-500)',
    },
    KONFIDENSIELT: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-500)',
      backgroundColor: 'var(--color-red-25)',
    },
    HEMMELIG: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-800)',
      backgroundColor: 'var(--color-red-50)',
      border: 'var(--border-width) solid var(--color-red-200)',
    },
  };

  return classificationStyles[classification] || {};
};

/**
 * Get escalation level styles
 * @param escalationLevel - Escalation level
 * @returns CSS styles object
 */
export const getEscalationStyles = (escalationLevel?: number): React.CSSProperties => {
  if (!escalationLevel) {
    return {};
  }

  const escalationStyles: Record<number, React.CSSProperties> = {
    1: {
      // Default styling
    },
    2: {
      borderWidth: 'var(--border-width-thick)',
    },
    3: {
      borderWidth: 'var(--border-width-thick)',
      boxShadow: 'var(--shadow-lg)',
    },
    4: {
      borderWidth: 'var(--border-width-thick)',
      boxShadow: 'var(--shadow-xl)',
      animation: 'alert-pulse 1.5s infinite',
    },
  };

  return escalationStyles[escalationLevel] || {};
};

/**
 * Generate complete Alert styles using design tokens
 * @param props - Alert component props
 * @returns Complete CSS styles object
 */
export const getAlertStyles = (props: AlertPropsWithNorwegian): React.CSSProperties => {
  const { variant = 'info', severity = 'medium', norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-4)',
    borderRadius: 'var(--border-radius-base)',
    border: 'var(--border-width) solid transparent',
    fontFamily: 'var(--font-family-sans)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
    position: 'relative',
    minHeight: 'var(--touch-target-min-height)', // Norwegian accessibility
  };

  // Variant-based styles
  const variantStyles = getVariantStyles(variant);

  // Severity-based styles
  const severityStyles = getSeverityStyles(severity);

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  // Escalation level styling
  const escalationStyles = getEscalationStyles(norwegian?.escalationLevel);

  return {
    ...baseStyles,
    ...variantStyles,
    ...severityStyles,
    ...classificationStyles,
    ...escalationStyles,
  };
};

/**
 * Get alert role based on severity
 * @param severity - Alert severity level
 * @returns ARIA role string
 */
export const getAlertRole = (severity: string): string => {
  return severity === 'critical' || severity === 'high' ? 'alert' : 'status';
};

/**
 * Get aria-live attribute based on severity
 * @param severity - Alert severity level
 * @returns aria-live value
 */
export const getAriaLive = (severity: string): 'polite' | 'assertive' | 'off' => {
  if (severity === 'critical') return 'assertive';
  if (severity === 'high') return 'assertive';
  return 'polite';
};
