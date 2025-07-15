/**
 * @fileoverview Xala Enterprise UI Components
 * @description Enterprise-grade React components for Norwegian compliance
 */

import { Logger } from '@xala-technologies/enterprise-standards';

const logger = Logger.create({
  serviceName: 'ui-system-xala-components',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// Re-export core components
export { Button } from './Button';
export { Input } from './Input';

// Re-export accessibility utilities
export { xalaAccessibility } from '@/lib/accessibility/wcag-aaa';

// Re-export design tokens from new semantic token system
export { semanticTokens as designTokens, getComponentTokens, getCSSVar } from '@/tokens';

/**
 * Xala component library version
 */
export const XALA_VERSION = '1.0.0';

/**
 * Xala component library metadata
 */
export const XALA_METADATA = {
  name: 'Xala UI Components',
  version: XALA_VERSION,
  description: 'Enterprise-grade React components with Norwegian compliance',
  author: 'Xala Technologies',
  license: 'MIT',
  repository: 'https://github.com/xala-technologies/ui-system',
  documentation: 'https://ui.xala.no',
  compliance: {
    nsm: 'NSM Classification Support',
    digdir: 'DigDir Design Standards',
    wcag: 'WCAG 2.2 AAA Compliance',
    gdpr: 'GDPR Privacy Compliance',
  },
  features: [
    'Semantic Design Tokens',
    'Accessibility First',
    'Norwegian Government Standards',
    'TypeScript Support',
    'Dark Mode Support',
    'Responsive Design',
    'Enterprise Security',
  ],
} as const;

/**
 * Xala component library configuration
 */
export const XALA_CONFIG = {
  defaultTheme: 'light',
  supportedThemes: ['light', 'dark', 'auto'],
  defaultLocale: 'nb-NO',
  supportedLocales: ['nb-NO', 'nn-NO', 'en-US'],
  accessibilityLevel: 'WCAG_2_2_AAA',
  classification: 'ÅPEN',
  complianceStandards: ['NSM', 'DigDir', 'GDPR', 'ISO27001'],
} as const;

/**
 * Xala component library utilities
 */
export const xalaUtils = {
  /**
   * Get component version
   */
  getVersion: (): string => XALA_VERSION,

  /**
   * Get component metadata
   */
  getMetadata: () => XALA_METADATA,

  /**
   * Get component configuration
   */
  getConfig: () => XALA_CONFIG,

  /**
   * Validate Norwegian compliance
   */
  validateNorwegianCompliance: (config: { classification?: string; [key: string]: unknown }): void => {
    if (process.env['NODE_ENV'] === 'development') {
      const validClassifications = ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'];
      if (config.classification && !validClassifications.includes(config.classification)) {
        logger.warn('Invalid NSM classification:', { classification: config.classification });
      }
    }
  },
} as const;
