/**
 * @fileoverview Design Token Helper Utilities
 * @description Utilities to convert semantic tokens to CSS and help components use tokens properly
 * @version 2.0.0
 */

import {
    componentTokens,
    designTokens,
    getToken,
    platformTokens,
    semanticColors,
    semanticSpacing,
    semanticTypography,
} from './design-tokens';

// =============================================================================
// CSS VARIABLE GENERATION
// =============================================================================

/**
 * Convert design tokens to CSS custom properties
 */
export function generateCSSVariables(): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Color tokens
  Object.entries(semanticColors).forEach(([category, colors]) => {
    Object.entries(colors as Record<string, string>).forEach(([name, value]) => {
      cssVars[`--color-${category}-${name}`] = value as string;
    });
  });

  // Spacing tokens
  Object.entries(semanticSpacing).forEach(([category, spacing]) => {
    Object.entries(spacing as Record<string, string>).forEach(([name, value]) => {
      cssVars[`--spacing-${category}-${name}`] = value as string;
    });
  });

  // Typography tokens
  Object.entries(semanticTypography).forEach(([category, styles]) => {
    Object.entries(styles as Record<string, any>).forEach(([name, style]) => {
      if (typeof style === 'object' && style !== null) {
        Object.entries(style as Record<string, any>).forEach(([prop, value]) => {
          cssVars[`--typography-${category}-${name}-${prop}`] = String(value);
        });
      }
    });
  });

  // Component tokens
  Object.entries(componentTokens).forEach(([component, tokens]) => {
    Object.entries(tokens as Record<string, any>).forEach(([category, values]) => {
      Object.entries(values as Record<string, any>).forEach(([name, value]) => {
        cssVars[`--component-${component}-${category}-${name}`] = String(value);
      });
    });
  });

  return cssVars;
}

/**
 * Generate CSS custom properties string for injection
 */
export function generateCSSString(): string {
  const cssVars = generateCSSVariables();
  const cssString = Object.entries(cssVars)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n');

  return `:root {\n${cssString}\n}`;
}

// =============================================================================
// TOKEN ACCESS UTILITIES
// =============================================================================

/**
 * Get semantic color token
 */
export function getSemanticColor(path: string): string {
  const keys = path.split('.');
  let current: any = semanticColors;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      console.warn(`Semantic color token not found: ${path}`);
      return '#000000'; // Fallback
    }
  }
  
  return String(current);
}

/**
 * Get semantic spacing token
 */
export function getSemanticSpacing(path: string): string {
  const keys = path.split('.');
  let current: any = semanticSpacing;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      console.warn(`Semantic spacing token not found: ${path}`);
      return '0px'; // Fallback
    }
  }
  
  return String(current);
}

/**
 * Get component token
 */
export function getComponentToken(component: string, path: string): string {
  const keys = path.split('.');
  let current: any = componentTokens[component as keyof typeof componentTokens];
  
  if (!current) {
    console.warn(`Component token not found: ${component}`);
    return '';
  }
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      console.warn(`Component token not found: ${component}.${path}`);
      return '';
    }
  }
  
  return String(current);
}

/**
 * Get platform-specific token
 */
export function getPlatformToken(platform: 'mobile' | 'desktop', path: string): string {
  const keys = path.split('.');
  let current: any = platformTokens[platform];
  
  if (!current) {
    console.warn(`Platform token not found: ${platform}`);
    return '';
  }
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      console.warn(`Platform token not found: ${platform}.${path}`);
      return '';
    }
  }
  
  return String(current);
}

// =============================================================================
// COMPONENT STYLE UTILITIES
// =============================================================================

/**
 * Create button styles using semantic tokens
 */
export function createButtonStyles(variant: 'primary' | 'secondary' | 'outline' = 'primary', size: 'sm' | 'md' | 'lg' = 'md'): Record<string, any> {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getComponentToken('button', `borderRadius.${size}`),
    fontSize: getToken('semantic.typography.ui.button.fontSize'),
    fontWeight: getToken('semantic.typography.ui.button.fontWeight'),
    lineHeight: getToken('semantic.typography.ui.button.lineHeight'),
    height: getComponentToken('button', `height.${size}`),
    padding: getComponentToken('button', `padding.${size}`),
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    textDecoration: 'none',
    userSelect: 'none',
    
    // Focus styles for accessibility
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${getSemanticColor('interactive.focus')}`,
    },
    
    // Disabled styles
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: getSemanticColor('interactive.primary'),
      color: getSemanticColor('text.inverse'),
      borderColor: getSemanticColor('interactive.primary'),
      
      '&:hover:not(:disabled)': {
        backgroundColor: getSemanticColor('interactive.primaryHover'),
        borderColor: getSemanticColor('interactive.primaryHover'),
      },
      
      '&:active:not(:disabled)': {
        backgroundColor: getSemanticColor('interactive.primaryActive'),
        borderColor: getSemanticColor('interactive.primaryActive'),
      },
    },
    
    secondary: {
      backgroundColor: getSemanticColor('interactive.secondary'),
      color: getSemanticColor('text.primary'),
      borderColor: getSemanticColor('border.primary'),
      
      '&:hover:not(:disabled)': {
        backgroundColor: getSemanticColor('interactive.secondaryHover'),
        borderColor: getSemanticColor('border.secondary'),
      },
      
      '&:active:not(:disabled)': {
        backgroundColor: getSemanticColor('interactive.secondaryActive'),
        borderColor: getSemanticColor('border.strong'),
      },
    },
    
    outline: {
      backgroundColor: 'transparent',
      color: getSemanticColor('interactive.primary'),
      borderColor: getSemanticColor('interactive.primary'),
      
      '&:hover:not(:disabled)': {
        backgroundColor: getSemanticColor('interactive.primary'),
        color: getSemanticColor('text.inverse'),
      },
      
      '&:active:not(:disabled)': {
        backgroundColor: getSemanticColor('interactive.primaryActive'),
        borderColor: getSemanticColor('interactive.primaryActive'),
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant],
  };
}

/**
 * Create input styles using semantic tokens
 */
export function createInputStyles(size: 'sm' | 'md' | 'lg' = 'md', hasError: boolean = false): Record<string, any> {
  return {
    display: 'block',
    width: '100%',
    height: getComponentToken('input', `height.${size}`),
    padding: getComponentToken('input', `padding.${size}`),
    fontSize: getToken('semantic.typography.body.medium.fontSize'),
    lineHeight: getToken('semantic.typography.body.medium.lineHeight'),
    color: getSemanticColor('text.primary'),
    backgroundColor: getSemanticColor('surface.primary'),
    borderRadius: getComponentToken('input', 'borderRadius'),
    border: `${getComponentToken('input', 'borderWidth')} solid ${
      hasError ? getSemanticColor('state.error') : getSemanticColor('border.primary')
    }`,
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    
    '&::placeholder': {
      color: getSemanticColor('text.tertiary'),
    },
    
    '&:focus': {
      outline: 'none',
      borderColor: hasError ? getSemanticColor('state.error') : getSemanticColor('interactive.focus'),
      boxShadow: `0 0 0 2px ${
        hasError ? getSemanticColor('state.errorBackground') : getSemanticColor('interactive.focus')
      }25`, // 25 is alpha for 0.15 opacity
    },
    
    '&:disabled': {
      backgroundColor: getSemanticColor('background.disabled'),
      borderColor: getSemanticColor('border.disabled'),
      color: getSemanticColor('text.disabled'),
      cursor: 'not-allowed',
    },
  };
}

/**
 * Create card styles using semantic tokens
 */
export function createCardStyles(padding: 'sm' | 'md' | 'lg' = 'md'): Record<string, any> {
  return {
    backgroundColor: getSemanticColor('surface.elevated'),
    border: `1px solid ${getSemanticColor('border.primary')}`,
    borderRadius: getComponentToken('card', 'borderRadius'),
    padding: getComponentToken('card', `padding.${padding}`),
    boxShadow: getComponentToken('card', 'shadow'),
    
    '&:hover': {
      boxShadow: getToken('global.shadows.lg'),
    },
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Convert tokens to CSS-in-JS object
 */
export function tokensToCSSObject(tokens: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {};
  
  function flatten(obj: any, prefix: string = ''): void {
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        flatten(value, newKey);
      } else {
        result[newKey] = String(value);
      }
    });
  }
  
  flatten(tokens);
  return result;
}

/**
 * Get responsive token value based on platform
 */
export function getResponsiveToken(
  basePath: string,
  platform: 'mobile' | 'desktop' | 'auto' = 'auto'
): string {
  if (platform === 'auto') {
    // In a real app, this would detect the platform
    platform = typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop';
  }
  
  // Try to get platform-specific token first
  const platformToken = getPlatformToken(platform, basePath);
  if (platformToken) {
    return platformToken;
  }
  
  // Fall back to generic token
  return getToken(basePath);
}

/**
 * Validate token exists
 */
export function validateToken(path: string): boolean {
  const token = getToken(path);
  return token !== '';
}

/**
 * Get all tokens for debugging
 */
export function getDebugTokens(): Record<string, any> {
  return {
    designTokens,
    semanticColors,
    semanticSpacing,
    semanticTypography,
    componentTokens,
    platformTokens,
    cssVariables: generateCSSVariables(),
  };
}

// =============================================================================
// DEPRECATED HELPERS (for backward compatibility)
// =============================================================================

/**
 * @deprecated Use getSemanticColor instead
 */
export function getColor(path: string): string {
  console.warn('getColor is deprecated. Use getSemanticColor instead.');
  return getSemanticColor(path);
}

/**
 * @deprecated Use getSemanticSpacing instead
 */
export function getSpacing(path: string): string {
  console.warn('getSpacing is deprecated. Use getSemanticSpacing instead.');
  return getSemanticSpacing(path);
}

// Export everything for convenience
export {
    componentTokens, designTokens, getToken, platformTokens, semanticColors,
    semanticSpacing,
    semanticTypography
};

