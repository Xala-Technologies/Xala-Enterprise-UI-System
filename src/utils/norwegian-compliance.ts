/**
 * Norwegian Compliance Utilities
 * Shared utility functions for Norwegian compliance features across components
 * Following NSM classification levels and DigDir design standards
 */

/**
 * Norwegian security classification levels with corresponding icons
 * Based on NSM (Nasjonal sikkerhetsmyndighet) classification system
 */
export const NSM_CLASSIFICATION = {
  ÅPEN: 'ÅPEN',
  BEGRENSET: 'BEGRENSET',
  KONFIDENSIELT: 'KONFIDENSIELT',
  HEMMELIG: 'HEMMELIG',
} as const;

export type NSMClassification = (typeof NSM_CLASSIFICATION)[keyof typeof NSM_CLASSIFICATION];

/**
 * Get security classification icon based on NSM levels
 * @param level - NSM classification level
 * @returns Icon string for the classification level
 */
export const getClassificationIcon = (level: string): string => {
  const icons = {
    ÅPEN: '🟢',
    BEGRENSET: '🟡',
    KONFIDENSIELT: '🔴',
    HEMMELIG: '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

/**
 * Get variant icon for different alert/notification types
 * @param variant - Component variant type
 * @returns Icon string for the variant
 */
export const getVariantIcon = (variant: string): string => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };
  return icons[variant as keyof typeof icons] || 'ℹ️';
};

/**
 * Get severity icon for different priority levels
 * @param severity - Severity level
 * @returns Icon string for the severity level
 */
export const getSeverityIcon = (severity: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[severity as keyof typeof icons] || '■';
};

/**
 * Get category icon for different system categories
 * @param category - System category
 * @returns Icon string for the category
 */
export const getCategoryIcon = (category: string): string => {
  const icons = {
    system: '⚙️',
    validation: '✅',
    security: '🔒',
    process: '🔄',
    user: '👤',
  };
  return icons[category as keyof typeof icons] || '📋';
};

/**
 * Norwegian priority levels for government systems
 */
export const NORWEGIAN_PRIORITY = {
  LOW: 'lav',
  MEDIUM: 'middels',
  HIGH: 'høy',
  CRITICAL: 'kritisk',
} as const;

export type NorwegianPriority = (typeof NORWEGIAN_PRIORITY)[keyof typeof NORWEGIAN_PRIORITY];

/**
 * Get priority styling classes based on Norwegian standards
 * @param priority - Priority level
 * @returns CSS classes for priority styling
 */
export const getPriorityClasses = (priority?: string): string => {
  const priorityClasses = {
    lav: 'border-l-4 border-l-green-400',
    middels: 'border-l-4 border-l-yellow-400',
    høy: 'border-l-4 border-l-orange-400',
    kritisk: 'border-l-4 border-l-red-400',
  };
  return priority ? priorityClasses[priority as keyof typeof priorityClasses] || '' : '';
};

/**
 * Get classification styling classes based on NSM levels
 * @param classification - NSM classification level
 * @returns CSS classes for classification styling
 */
export const getClassificationClasses = (classification?: string): string => {
  const classificationClasses = {
    ÅPEN: 'bg-green-50 border-green-200',
    BEGRENSET: 'bg-yellow-50 border-yellow-200',
    KONFIDENSIELT: 'bg-red-50 border-red-200',
    HEMMELIG: 'bg-gray-900 border-gray-800 text-white',
  };
  return classification
    ? classificationClasses[classification as keyof typeof classificationClasses] || ''
    : '';
};

/**
 * Norwegian compliance metadata interface
 */
export interface NorwegianCompliance {
  classification?: NSMClassification;
  priority?: NorwegianPriority;
  category?: string;
  severity?: string;
  escalationLevel?: number;
  dataProcessing?: boolean;
  gdprCompliant?: boolean;
  accessibility?: 'WCAG_A' | 'WCAG_AA' | 'WCAG_AAA';
}

/**
 * Validate Norwegian compliance metadata
 * @param compliance - Compliance metadata object
 * @returns boolean indicating if compliance metadata is valid
 */
export const validateNorwegianCompliance = (compliance: NorwegianCompliance): boolean => {
  if (!compliance) return true;

  // Validate classification if provided
  if (
    compliance.classification &&
    !Object.values(NSM_CLASSIFICATION).includes(compliance.classification)
  ) {
    return false;
  }

  // Validate priority if provided
  if (compliance.priority && !Object.values(NORWEGIAN_PRIORITY).includes(compliance.priority)) {
    return false;
  }

  // Validate escalation level if provided
  if (
    compliance.escalationLevel &&
    (compliance.escalationLevel < 1 || compliance.escalationLevel > 4)
  ) {
    return false;
  }

  return true;
};
