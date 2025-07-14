/**
 * @fileoverview Design Tokens Index - Enterprise-Grade Token System
 * @description Export the new semantic token system with dynamic loading support
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA, NSM, DigDir
 */

// =============================================================================
// SEMANTIC TOKEN SYSTEM (v3.0.0)
// =============================================================================

// Primary exports for the new semantic token system
export {
    createCSSProperties, designTokens, generateComponentCSS,
    getComponentTokens, getCSSVar,
    // Token utilities
    getToken,
    // Migration utilities
    migrationUtils,

    // Norwegian compliance
    norwegianTokenUtils,
    // Core token system
    SemanticTokenSystem,
    tokenSystem, validateTokens,
    // Types
    type SemanticToken, type TokenMetadata, type TokenPath, type TokenValidationResult, type TokenValue
} from './semantic-token-system';

// =============================================================================
// DYNAMIC TOKEN LOADING (v3.0.0)
// =============================================================================

export {
    clearTenantConfiguration,
    // Dynamic token loader
    DynamicTokenLoader,
    dynamicTokenLoader, getCurrentTenant,
    initializeDynamicTokens, injectCustomTokens,
    // Convenience functions
    loadTenantConfiguration,
    loadTenantFromJSON, type BrandingConfig, type DynamicTokenLoaderConfig, type NorwegianComplianceConfig,
    // Types
    type TenantTokenConfig, type TokenOverrideConfig, type WhiteLabelConfig
} from './dynamic-token-loader';

// =============================================================================
// PLATFORM TOKENS (v3.0.0)
// =============================================================================

export {
    desktopTokens,
    mobileTokens,
    // Platform tokens
    platformTokens,
    // Platform utilities
    platformUtils, tabletTokens
} from './platform-tokens';

// =============================================================================
// GLOBAL TOKENS (Foundation Layer)
// =============================================================================

export {

    // Animation system
    globalAnimationDurations,
    globalAnimationEasings,
    // Layout system
    globalBorderRadius,
    globalBorderWidths, globalBreakpoints,
    // Color primitives
    globalColorPrimitives,
    // Typography system
    globalFontFamilies,
    globalFontSizes,
    globalFontWeights, globalLetterSpacing, globalLineHeights, globalShadows,
    // Spacing system
    globalSpacingPrimitives, globalZIndices
} from './global-tokens';

// =============================================================================
// ALIAS TOKENS (Semantic Layer)
// =============================================================================

export {
    aliasAnimationTokens, aliasBorderTokens, aliasBreakpointTokens, aliasColorTokens, aliasShadowTokens, aliasSpacingTokens,
    // Alias token collections
    aliasTokens, aliasTypographyTokens, aliasZIndexTokens
} from './alias-tokens';

// =============================================================================
// COMPONENT TOKENS (Component Layer)
// =============================================================================

export {
    buttonComponentTokens, cardComponentTokens,
    // Component token collections
    componentTokens, inputComponentTokens, modalComponentTokens,
    toastComponentTokens
} from './component-tokens';

// =============================================================================
// SYSTEM INFORMATION
// =============================================================================

/**
 * Token system information
 */
export const TOKEN_SYSTEM_INFO = {
  version: '3.0.0',
  architecture: 'Three-tier semantic token system with dynamic loading',
  layers: [
    'Global tokens (primitives)',
    'Alias tokens (semantic)',
    'Component tokens (specific)',
  ],
  features: [
    'Type-safe token paths',
    'Validation and error handling',
    'CSS variable generation',
    'Norwegian compliance utilities',
    'Migration utilities',
    'WCAG AAA compliance',
    'NSM compliance',
    'Dynamic token loading',
    'Tenant configuration support',
    'White labeling capabilities',
    'Runtime token injection',
    'Platform-specific tokens',
  ],
  compliance: [
    'WCAG 2.2 AAA',
    'NSM (Norwegian Security Authority)',
    'DigDir (Norwegian Digitalization Directorate)',
  ],
} as const;

// =============================================================================
// MIGRATION GUIDE
// =============================================================================

/**
 * MIGRATION GUIDE - Token system usage
 * 
 * BASIC TOKEN USAGE:
 * ```typescript
 * import { getToken, getCSSVar } from '@/tokens';
 * 
 * // Get token value
 * const primaryColor = getToken('alias.color.brand.primary');
 * 
 * // Get CSS variable
 * const primaryCSSVar = getCSSVar('alias.color.brand.primary');
 * 
 * // Get component tokens
 * const buttonTokens = getComponentTokens('button');
 * ```
 * 
 * DYNAMIC TOKEN LOADING:
 * ```typescript
 * import { loadTenantConfiguration, injectCustomTokens } from '@/tokens';
 * 
 * // Load tenant configuration
 * await loadTenantConfiguration('tenant-123');
 * 
 * // Inject custom tokens at runtime
 * injectCustomTokens({
 *   'alias.color.brand.primary': '#ff0000',
 *   'alias.color.brand.secondary': '#00ff00',
 * });
 * ```
 * 
 * PLATFORM-SPECIFIC TOKENS:
 * ```typescript
 * import { platformTokens } from '@/tokens';
 * 
 * // Get current platform
 * const platform = platformTokens.utils.getCurrentPlatform();
 * 
 * // Get platform-specific tokens
 * const currentTokens = platformTokens.getCurrentPlatformTokens();
 * 
 * // Get platform-specific values
 * const sidebarWidth = platformTokens.getSidebarWidth();
 * const clickTargetSize = platformTokens.getClickTargetSize();
 * ```
 * 
 * TENANT CONFIGURATION:
 * ```typescript
 * import { loadTenantFromJSON, type TenantTokenConfig } from '@/tokens';
 * 
 * const tenantConfig: TenantTokenConfig = {
 *   tenantId: 'customer-corp',
 *   displayName: 'Customer Corporation',
 *   whiteLabelConfig: {
 *     primaryColors: {
 *       brand: '#1a365d',
 *       brandHover: '#2d3748',
 *       brandActive: '#4a5568',
 *       brandDisabled: '#cbd5e0',
 *     },
 *   },
 *   branding: {
 *     companyName: 'Customer Corp',
 *     colors: {
 *       primary: '#1a365d',
 *       secondary: '#2d3748',
 *     },
 *   },
 * };
 * 
 * await loadTenantFromJSON(tenantConfig);
 * ```
 */

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

// Import for default export
import { designTokens } from './semantic-token-system';

export default designTokens;

