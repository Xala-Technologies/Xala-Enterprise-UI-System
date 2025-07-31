/**
 * Responsive Token Adjustments
 * Defines how tokens adapt across different breakpoints and screen sizes
 */

import type { TokenReference } from './variant-maps';

// =============================================================================
// RESPONSIVE TOKEN TYPES
// =============================================================================

export interface ResponsiveTokenValue<T = string> {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

export interface ResponsiveTokenMap {
  [key: string]: ResponsiveTokenValue<string | TokenReference> | TokenReference;
}

export interface ResponsiveBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// =============================================================================
// DEFAULT BREAKPOINTS
// =============================================================================

export const defaultBreakpoints: ResponsiveBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// =============================================================================
// RESPONSIVE TYPOGRAPHY TOKENS
// =============================================================================

export const responsiveTypography: ResponsiveTokenMap = {
  // Font sizes that scale with viewport
  displayLarge: {
    base: { token: 'typography.fontSize.4xl', fallback: '2.25rem' } as TokenReference,
    md: { token: 'typography.fontSize.5xl', fallback: '3rem' } as TokenReference,
    lg: { token: 'typography.fontSize.6xl', fallback: '3.75rem' } as TokenReference,
    xl: { token: 'typography.fontSize.7xl', fallback: '4.5rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  displayMedium: {
    base: { token: 'typography.fontSize.3xl', fallback: '1.875rem' } as TokenReference,
    md: { token: 'typography.fontSize.4xl', fallback: '2.25rem' } as TokenReference,
    lg: { token: 'typography.fontSize.5xl', fallback: '3rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  displaySmall: {
    base: { token: 'typography.fontSize.2xl', fallback: '1.5rem' } as TokenReference,
    md: { token: 'typography.fontSize.3xl', fallback: '1.875rem' } as TokenReference,
    lg: { token: 'typography.fontSize.4xl', fallback: '2.25rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  headingLarge: {
    base: { token: 'typography.fontSize.xl', fallback: '1.25rem' } as TokenReference,
    md: { token: 'typography.fontSize.2xl', fallback: '1.5rem' } as TokenReference,
    lg: { token: 'typography.fontSize.3xl', fallback: '1.875rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  headingMedium: {
    base: { token: 'typography.fontSize.lg', fallback: '1.125rem' } as TokenReference,
    md: { token: 'typography.fontSize.xl', fallback: '1.25rem' } as TokenReference,
    lg: { token: 'typography.fontSize.2xl', fallback: '1.5rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  headingSmall: {
    base: { token: 'typography.fontSize.base', fallback: '1rem' } as TokenReference,
    md: { token: 'typography.fontSize.lg', fallback: '1.125rem' } as TokenReference,
    lg: { token: 'typography.fontSize.xl', fallback: '1.25rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  body: {
    base: { token: 'typography.fontSize.sm', fallback: '0.875rem' } as TokenReference,
    md: { token: 'typography.fontSize.base', fallback: '1rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  caption: {
    base: { token: 'typography.fontSize.xs', fallback: '0.75rem' } as TokenReference,
    md: { token: 'typography.fontSize.sm', fallback: '0.875rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,

  // Line heights that adjust with font size
  lineHeightDisplay: {
    base: { token: 'typography.lineHeight.tight', fallback: '1.25' } as TokenReference,
    lg: { token: 'typography.lineHeight.snug', fallback: '1.375' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  lineHeightHeading: {
    base: { token: 'typography.lineHeight.snug', fallback: '1.375' } as TokenReference,
    lg: { token: 'typography.lineHeight.normal', fallback: '1.5' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  lineHeightBody: {
    base: { token: 'typography.lineHeight.normal', fallback: '1.5' } as TokenReference,
    lg: { token: 'typography.lineHeight.relaxed', fallback: '1.625' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
};

// =============================================================================
// RESPONSIVE SPACING TOKENS
// =============================================================================

export const responsiveSpacing: ResponsiveTokenMap = {
  // Component padding that scales
  containerPadding: {
    base: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
    md: { token: 'spacing.6', fallback: '1.5rem' } as TokenReference,
    lg: { token: 'spacing.8', fallback: '2rem' } as TokenReference,
    xl: { token: 'spacing.12', fallback: '3rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  sectionPadding: {
    base: { token: 'spacing.8', fallback: '2rem' } as TokenReference,
    md: { token: 'spacing.12', fallback: '3rem' } as TokenReference,
    lg: { token: 'spacing.16', fallback: '4rem' } as TokenReference,
    xl: { token: 'spacing.20', fallback: '5rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  cardPadding: {
    base: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
    md: { token: 'spacing.6', fallback: '1.5rem' } as TokenReference,
    lg: { token: 'spacing.8', fallback: '2rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  buttonPadding: {
    base: { token: 'spacing.3', fallback: '0.75rem' } as TokenReference,
    md: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,

  // Gaps that adjust for different screens
  gridGap: {
    base: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
    md: { token: 'spacing.6', fallback: '1.5rem' } as TokenReference,
    lg: { token: 'spacing.8', fallback: '2rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  stackGap: {
    base: { token: 'spacing.2', fallback: '0.5rem' } as TokenReference,
    md: { token: 'spacing.3', fallback: '0.75rem' } as TokenReference,
    lg: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
  formGap: {
    base: { token: 'spacing.3', fallback: '0.75rem' } as TokenReference,
    md: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
  } as ResponsiveTokenValue<TokenReference>,
};

// =============================================================================
// RESPONSIVE LAYOUT TOKENS
// =============================================================================

export const responsiveLayout: ResponsiveTokenMap = {
  // Container widths
  containerMaxWidth: {
    base: '100%',
    sm: { token: 'breakpoints.sm', fallback: '640px' } as TokenReference,
    md: { token: 'breakpoints.md', fallback: '768px' } as TokenReference,
    lg: { token: 'breakpoints.lg', fallback: '1024px' } as TokenReference,
    xl: { token: 'breakpoints.xl', fallback: '1280px' } as TokenReference,
    '2xl': { token: 'breakpoints.2xl', fallback: '1536px' } as TokenReference,
  } as ResponsiveTokenValue<string | TokenReference>,

  // Grid columns
  gridColumns: {
    base: '1',
    sm: '2',
    md: '3',
    lg: '4',
    xl: '6',
    '2xl': '12',
  } as ResponsiveTokenValue<string>,

  // Sidebar widths
  sidebarWidth: {
    base: '0',
    md: '240px',
    lg: '280px',
    xl: '320px',
  } as ResponsiveTokenValue<string>,

  // Modal widths
  modalWidth: {
    base: '90vw',
    sm: '480px',
    md: '640px',
    lg: '768px',
    xl: '1024px',
  } as ResponsiveTokenValue<string>,
};

// =============================================================================
// RESPONSIVE COMPONENT TOKENS
// =============================================================================

export const responsiveComponents = {
  button: {
    height: {
      base: { token: 'sizing.10', fallback: '2.5rem' } as TokenReference,
      md: { token: 'sizing.12', fallback: '3rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
    paddingX: {
      base: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
      md: { token: 'spacing.6', fallback: '1.5rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
    fontSize: {
      base: { token: 'typography.fontSize.sm', fallback: '0.875rem' } as TokenReference,
      md: { token: 'typography.fontSize.base', fallback: '1rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
  },

  input: {
    height: {
      base: { token: 'sizing.10', fallback: '2.5rem' } as TokenReference,
      md: { token: 'sizing.12', fallback: '3rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
    paddingX: {
      base: { token: 'spacing.3', fallback: '0.75rem' } as TokenReference,
      md: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
    fontSize: {
      base: { token: 'typography.fontSize.sm', fallback: '0.875rem' } as TokenReference,
      md: { token: 'typography.fontSize.base', fallback: '1rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
  },

  card: {
    padding: {
      base: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
      md: { token: 'spacing.6', fallback: '1.5rem' } as TokenReference,
      lg: { token: 'spacing.8', fallback: '2rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
    gap: {
      base: { token: 'spacing.3', fallback: '0.75rem' } as TokenReference,
      md: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
  },

  modal: {
    padding: {
      base: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
      md: { token: 'spacing.6', fallback: '1.5rem' } as TokenReference,
      lg: { token: 'spacing.8', fallback: '2rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
    margin: {
      base: { token: 'spacing.4', fallback: '1rem' } as TokenReference,
      md: { token: 'spacing.8', fallback: '2rem' } as TokenReference,
    } as ResponsiveTokenValue<TokenReference>,
  },
};

// =============================================================================
// RESPONSIVE TOKEN UTILITIES
// =============================================================================

/**
 * Generate CSS media queries for responsive tokens
 */
export function generateResponsiveCSS(
  property: string,
  values: ResponsiveTokenValue,
  selector: string,
  resolver: (ref: any) => string
): string {
  const css: string[] = [];

  // Base value (mobile-first)
  const baseValue = typeof values.base === 'object' ? resolver(values.base) : values.base;
  css.push(`${selector} {\n  ${property}: ${baseValue};\n}`);

  // Breakpoint values
  const breakpointKeys: Array<keyof ResponsiveBreakpoints> = ['sm', 'md', 'lg', 'xl', '2xl'];
  
  breakpointKeys.forEach(breakpoint => {
    const value = values[breakpoint];
    if (value) {
      const resolvedValue = typeof value === 'object' ? resolver(value) : value;
      const mediaQuery = `@media (min-width: ${defaultBreakpoints[breakpoint]})`;
      css.push(`${mediaQuery} {\n  ${selector} {\n    ${property}: ${resolvedValue};\n  }\n}`);
    }
  });

  return css.join('\n\n');
}

/**
 * Generate CSS custom properties for responsive tokens
 */
export function generateResponsiveCustomProperties(
  tokens: ResponsiveTokenMap,
  prefix = '',
  resolver: (ref: any) => string
): Record<string, ResponsiveTokenValue<string>> {
  const properties: Record<string, ResponsiveTokenValue<string>> = {};

  Object.entries(tokens).forEach(([key, value]) => {
    const propName = `--${prefix}${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    
    if (typeof value === 'object' && 'base' in value) {
      // It's a responsive token
      const responsiveValue: ResponsiveTokenValue<string> = {
        base: typeof value.base === 'object' ? resolver(value.base) : value.base,
      };

      const breakpoints: Array<keyof ResponsiveBreakpoints> = ['sm', 'md', 'lg', 'xl', '2xl'];
      breakpoints.forEach(bp => {
        const bpValue = value[bp];
        if (bpValue) {
          responsiveValue[bp] = typeof bpValue === 'object' ? resolver(bpValue) : bpValue;
        }
      });

      properties[propName] = responsiveValue;
    } else {
      // It's a token reference
      properties[propName] = { base: resolver(value) };
    }
  });

  return properties;
}

/**
 * Create responsive utility classes
 */
export function generateResponsiveUtilities(
  property: string,
  values: Record<string, string>,
  breakpoints: ResponsiveBreakpoints = defaultBreakpoints
): string {
  const utilities: string[] = [];

  // Base utilities
  Object.entries(values).forEach(([key, value]) => {
    utilities.push(`.${property}-${key} { ${property}: ${value}; }`);
  });

  // Breakpoint utilities
  Object.entries(breakpoints).forEach(([bp, minWidth]) => {
    utilities.push(`\n@media (min-width: ${minWidth}) {`);
    Object.entries(values).forEach(([key, value]) => {
      utilities.push(`  .${bp}\\:${property}-${key} { ${property}: ${value}; }`);
    });
    utilities.push('}');
  });

  return utilities.join('\n');
}

/**
 * Get responsive value for current breakpoint
 */
export function getResponsiveValue<T>(
  value: ResponsiveTokenValue<T>,
  currentBreakpoint: keyof ResponsiveBreakpoints | 'base'
): T {
  // Start with base value
  let result = value.base;

  // Apply values up to current breakpoint
  const breakpointOrder: Array<keyof ResponsiveBreakpoints> = ['sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = currentBreakpoint === 'base' ? -1 : breakpointOrder.indexOf(currentBreakpoint);

  for (let i = 0; i <= currentIndex; i++) {
    const bp = breakpointOrder[i];
    if (value[bp] !== undefined) {
      result = value[bp]!;
    }
  }

  return result;
}

// =============================================================================
// EXPORTS
// =============================================================================

// Exports are already done inline with the declarations