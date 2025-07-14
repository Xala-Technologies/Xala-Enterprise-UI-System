/**
 * @fileoverview Design Tokens Index
 * @module Tokens
 * @description Centralized export of all design tokens and token utilities
 */

import { Logger } from '@xala-technologies/enterprise-standards';

const logger = Logger.create({
  serviceName: 'ui-system-tokens',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// CORE TOKEN SYSTEM
// =============================================================================

// Global tokens (primitive values)
export * from './global-tokens';

// Semantic token system
export * from './semantic-token-system';

// Platform-specific tokens
export * from './platform-tokens';

// Dynamic token loading
export * from './dynamic-token-loader';

// =============================================================================
// ACCESSIBILITY TOKENS
// =============================================================================

// Accessibility tokens and configuration
export * from './accessibility-tokens';

// =============================================================================
// RE-EXPORTS FOR CONVENIENCE
// =============================================================================

// Main token system
export { tokenSystem } from './semantic-token-system';

// Dynamic loader
export { DynamicTokenLoader } from './dynamic-token-loader';

// Accessibility utilities
export {
    accessibilityPresets, generateAccessibilityTokens, getAriaAttributes,
    getKeyboardAttributes, meetsContrastRequirements,
    meetsTouchTargetRequirements
} from './accessibility-tokens';

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/**
 * @example Basic Token Usage
 * ```typescript
 * import { tokenSystem } from '@your-org/ui-system';
 * 
 * // Get a token value
 * const primaryColor = tokenSystem.getGlobalToken('color.primary.500');
 * 
 * // Use in component
 * const Button = () => (
 *   <button style={{ backgroundColor: primaryColor }}>
 *     Click me
 *   </button>
 * );
 * ```
 */

/**
 * @example Accessibility Configuration
 * ```typescript
 * import { UISystemProvider, accessibilityPresets } from '@your-org/ui-system';
 * 
 * // Basic accessibility
 * <UISystemProvider accessibility="basic">
 *   <App />
 * </UISystemProvider>
 * 
 * // Enhanced accessibility
 * <UISystemProvider accessibility="enhanced">
 *   <App />
 * </UISystemProvider>
 * 
 * // Custom accessibility
 * <UISystemProvider accessibility={{
 *   level: 'WCAG_2_2_AA',
 *   highContrast: true,
 *   reduceMotion: false,
 *   keyboardNavigation: true,
 *   // ... other settings
 * }}>
 *   <App />
 * </UISystemProvider>
 * ```
 */

/**
 * @example Dynamic Token Loading
 * ```typescript
 * import { DynamicTokenLoader } from '@your-org/ui-system';
 * 
 * // Load tokens from URL
 * const loader = new DynamicTokenLoader();
 * await loader.loadFromURL('https://api.example.com/tokens');
 * 
 * // Load from JSON
 * const config = { 
 *   tenantId: 'acme-corp',
 *   branding: { primaryColor: '#ff0000' }
 * };
 * await loader.loadFromJSON(config);
 * ```
 */

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
    // Core token types
    TokenPath,
    TokenValue
} from './semantic-token-system';

export type {
    // Accessibility types
    AccessibilityConfig,
    AccessibilityLevel,
    AccessibilityPreset,
    AccessibilityTokens
} from './accessibility-tokens';

export type {
    BrandingConfig,
    // Dynamic loading types
    TenantTokenConfig, TokenOverrideConfig, WhiteLabelConfig
} from './dynamic-token-loader';

// =============================================================================
// DEVELOPMENT UTILITIES
// =============================================================================

/**
 * Development mode utilities (stripped in production)
 * Note: These utilities are available for development debugging
 */
export const devUtils = {
  /**
   * Validate accessibility configuration
   */
  validateAccessibility: (config: { level?: string; [key: string]: unknown }): void => {
    if (process.env['NODE_ENV'] === 'development') {
      // Basic validation - extend as needed
      if (!config.level || !['WCAG_2_1_AA', 'WCAG_2_1_AAA', 'WCAG_2_2_AA', 'WCAG_2_2_AAA', 'none'].includes(config.level)) {
        logger.warn('Invalid accessibility level:', { level: config.level });
      }
    }
  },
};

