/**
 * @fileoverview Semantic Tokens Index - Consolidated Semantic Token System
 * @description Exports all semantic token categories following industry standards
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA, NSM, DigDir
 */

// Import tokens for consolidated export
import {
    backgroundColorTokens,
    borderColorTokens,
    brandColorTokens,
    foregroundColorTokens,
    interactiveColorTokens,
    nsmClassificationColorTokens,
    semanticColorTokens,
    stateColorTokens,
} from './colors';

import {
    componentSpacingTokens,
    contentSpacingTokens,
    interactiveSpacingTokens,
    layoutSpacingTokens,
    norwegianSpacingTokens,
    platformSpacingTokens,
    semanticSpacingTokens,
} from './spacing';

// Export semantic token categories
export * from './colors';
export * from './spacing';
// export * from './typography'; // Temporarily disabled due to font family issues

// Re-export for convenience
export {
    backgroundColorTokens, borderColorTokens, brandColorTokens, componentSpacingTokens, contentSpacingTokens, foregroundColorTokens, interactiveColorTokens, interactiveSpacingTokens, layoutSpacingTokens, norwegianSpacingTokens, nsmClassificationColorTokens, platformSpacingTokens, semanticColorTokens, semanticSpacingTokens, stateColorTokens
};

// Consolidated semantic tokens object
export const semanticTokens = {
  color: {
    brand: brandColorTokens,
    background: backgroundColorTokens,
    foreground: foregroundColorTokens,
    border: borderColorTokens,
    interactive: interactiveColorTokens,
    state: stateColorTokens,
    nsm: nsmClassificationColorTokens,
  },
  spacing: {
    layout: layoutSpacingTokens,
    component: componentSpacingTokens,
    interactive: interactiveSpacingTokens,
    content: contentSpacingTokens,
    platform: platformSpacingTokens,
    norwegian: norwegianSpacingTokens,
  },
} as const;

// Type definitions
export type SemanticTokens = typeof semanticTokens; 