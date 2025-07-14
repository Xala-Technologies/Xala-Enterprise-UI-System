/**
 * @fileoverview Design Tokens Index - Enterprise-Grade Token System
 * @description Export the new semantic token system
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
  architecture: 'Three-tier semantic token system',
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
 * MIGRATION GUIDE - Moving from old to new token system
 * 
 * NEW RECOMMENDED USAGE:
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
 * COMPONENT INTEGRATION:
 * ```typescript
 * import { getComponentTokens } from '@/tokens';
 * 
 * const Button = ({ variant = 'primary' }) => {
 *   const buttonTokens = getComponentTokens('button');
 *   const variantTokens = buttonTokens[variant];
 *   
 *   return (
 *     <button style={{
 *       backgroundColor: variantTokens.background,
 *       color: variantTokens.foreground,
 *       padding: variantTokens.padding.md,
 *     }}>
 *       Button
 *     </button>
 *   );
 * };
 * ```
 * 
 * NORWEGIAN COMPLIANCE:
 * ```typescript
 * import { norwegianTokenUtils } from '@/tokens';
 * 
 * const govColors = norwegianTokenUtils.getGovernmentColors();
 * const nsmColors = norwegianTokenUtils.getNSMClassificationColors();
 * ```
 */

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

// Import for default export
import { designTokens } from './semantic-token-system';

export default designTokens;

