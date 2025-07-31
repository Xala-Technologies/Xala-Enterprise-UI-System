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
  [key: string]: ResponsiveTokenValue | TokenReference;
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
    base: { token: 'typography.fontSize.4xl', fallback: '2.25rem' },
    md: { token: 'typography.fontSize.5xl', fallback: '3rem' },
    lg: { token: 'typography.fontSize.6xl', fallback: '3.75rem' },
    xl: { token: 'typography.fontSize.7xl', fallback: '4.5rem' },
  },
  displayMedium: {
    base: { token: 'typography.fontSize.3xl', fallback: '1.875rem' },
    md: { token: 'typography.fontSize.4xl', fallback: '2.25rem' },
    lg: { token: 'typography.fontSize.5xl', fallback: '3rem' },
  },
  displaySmall: {
    base: { token: 'typography.fontSize.2xl', fallback: '1.5rem' },
    md: { token: 'typography.fontSize.3xl', fallback: '1.875rem' },
    lg: { token: 'typography.fontSize.4xl', fallback: '2.25rem' },
  },
  headingLarge: {
    base: { token: 'typography.fontSize.xl', fallback: '1.25rem' },
    md: { token: 'typography.fontSize.2xl', fallback: '1.5rem' },
    lg: { token: 'typography.fontSize.3xl', fallback: '1.875rem' },
  },
  headingMedium: {
    base: { token: 'typography.fontSize.lg', fallback: '1.125rem' },
    md: { token: 'typography.fontSize.xl', fallback: '1.25rem' },
    lg: { token: 'typography.fontSize.2xl', fallback: '1.5rem' },
  },
  headingSmall: {
    base: { token: 'typography.fontSize.base', fallback: '1rem' },
    md: { token: 'typography.fontSize.lg', fallback: '1.125rem' },
    lg: { token: 'typography.fontSize.xl', fallback: '1.25rem' },
  },
  body: {
    base: { token: 'typography.fontSize.sm', fallback: '0.875rem' },
    md: { token: 'typography.fontSize.base', fallback: '1rem' },
  },
  caption: {
    base: { token: 'typography.fontSize.xs', fallback: '0.75rem' },
    md: { token: 'typography.fontSize.sm', fallback: '0.875rem' },
  },

  // Line heights that adjust with font size
  lineHeightDisplay: {
    base: { token: 'typography.lineHeight.tight', fallback: '1.25' },
    lg: { token: 'typography.lineHeight.snug', fallback: '1.375' },
  },
  lineHeightHeading: {
    base: { token: 'typography.lineHeight.snug', fallback: '1.375' },
    lg: { token: 'typography.lineHeight.normal', fallback: '1.5' },
  },
  lineHeightBody: {
    base: { token: 'typography.lineHeight.normal', fallback: '1.5' },
    lg: { token: 'typography.lineHeight.relaxed', fallback: '1.625' },
  },
};

// =============================================================================
// RESPONSIVE SPACING TOKENS
// =============================================================================

export const responsiveSpacing: ResponsiveTokenMap = {
  // Component padding that scales
  containerPadding: {
    base: { token: 'spacing.4', fallback: '1rem' },
    md: { token: 'spacing.6', fallback: '1.5rem' },
    lg: { token: 'spacing.8', fallback: '2rem' },
    xl: { token: 'spacing.12', fallback: '3rem' },
  },
  sectionPadding: {
    base: { token: 'spacing.8', fallback: '2rem' },
    md: { token: 'spacing.12', fallback: '3rem' },
    lg: { token: 'spacing.16', fallback: '4rem' },
    xl: { token: 'spacing.20', fallback: '5rem' },
  },
  cardPadding: {
    base: { token: 'spacing.4', fallback: '1rem' },
    md: { token: 'spacing.6', fallback: '1.5rem' },
    lg: { token: 'spacing.8', fallback: '2rem' },
  },
  buttonPadding: {
    base: { token: 'spacing.3', fallback: '0.75rem' },
    md: { token: 'spacing.4', fallback: '1rem' },
  },

  // Gaps that adjust for different screens
  gridGap: {
    base: { token: 'spacing.4', fallback: '1rem' },
    md: { token: 'spacing.6', fallback: '1.5rem' },
    lg: { token: 'spacing.8', fallback: '2rem' },
  },
  stackGap: {
    base: { token: 'spacing.2', fallback: '0.5rem' },
    md: { token: 'spacing.3', fallback: '0.75rem' },
    lg: { token: 'spacing.4', fallback: '1rem' },
  },
  formGap: {
    base: { token: 'spacing.3', fallback: '0.75rem' },
    md: { token: 'spacing.4', fallback: '1rem' },
  },
};

// =============================================================================
// RESPONSIVE LAYOUT TOKENS
// =============================================================================

export const responsiveLayout: ResponsiveTokenMap = {
  // Container widths
  containerMaxWidth: {
    base: '100%',
    sm: { token: 'breakpoints.sm', fallback: '640px' },
    md: { token: 'breakpoints.md', fallback: '768px' },
    lg: { token: 'breakpoints.lg', fallback: '1024px' },
    xl: { token: 'breakpoints.xl', fallback: '1280px' },
    '2xl': { token: 'breakpoints.2xl', fallback: '1536px' },
  },

  // Grid columns
  gridColumns: {
    base: '1',
    sm: '2',
    md: '3',
    lg: '4',
    xl: '6',
    '2xl': '12',
  },

  // Sidebar widths
  sidebarWidth: {
    base: '0',
    md: '240px',
    lg: '280px',
    xl: '320px',
  },

  // Modal widths
  modalWidth: {
    base: '90vw',
    sm: '480px',
    md: '640px',
    lg: '768px',
    xl: '1024px',
  },
};

// =============================================================================
// RESPONSIVE COMPONENT TOKENS
// =============================================================================

export const responsiveComponents = {
  button: {
    height: {
      base: { token: 'sizing.10', fallback: '2.5rem' },
      md: { token: 'sizing.12', fallback: '3rem' },
    },
    paddingX: {
      base: { token: 'spacing.4', fallback: '1rem' },
      md: { token: 'spacing.6', fallback: '1.5rem' },
    },
    fontSize: {
      base: { token: 'typography.fontSize.sm', fallback: '0.875rem' },
      md: { token: 'typography.fontSize.base', fallback: '1rem' },
    },
  },

  input: {
    height: {
      base: { token: 'sizing.10', fallback: '2.5rem' },
      md: { token: 'sizing.12', fallback: '3rem' },
    },
    paddingX: {
      base: { token: 'spacing.3', fallback: '0.75rem' },
      md: { token: 'spacing.4', fallback: '1rem' },
    },
    fontSize: {
      base: { token: 'typography.fontSize.sm', fallback: '0.875rem' },
      md: { token: 'typography.fontSize.base', fallback: '1rem' },
    },
  },

  card: {
    padding: {
      base: { token: 'spacing.4', fallback: '1rem' },
      md: { token: 'spacing.6', fallback: '1.5rem' },
      lg: { token: 'spacing.8', fallback: '2rem' },
    },
    gap: {
      base: { token: 'spacing.3', fallback: '0.75rem' },
      md: { token: 'spacing.4', fallback: '1rem' },
    },
  },

  modal: {
    padding: {
      base: { token: 'spacing.4', fallback: '1rem' },
      md: { token: 'spacing.6', fallback: '1.5rem' },
      lg: { token: 'spacing.8', fallback: '2rem' },
    },
    margin: {
      base: { token: 'spacing.4', fallback: '1rem' },
      md: { token: 'spacing.8', fallback: '2rem' },
    },
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

export {
  defaultBreakpoints,
  responsiveTypography,
  responsiveSpacing,
  responsiveLayout,
  responsiveComponents,
};