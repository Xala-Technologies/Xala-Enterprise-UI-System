/**
 * CSS Variable Output Transformer for Design Tokens
 * Generates CSS custom properties from token system
 */

import type { ThemeTemplate } from '../themes/template-loader';
import type { TokenSystem, TokenTransformer } from './typescript-types';

// =============================================================================
// CSS VARIABLE TRANSFORMER INTERFACES
// =============================================================================

export interface CSSVariableOptions {
  prefix?: string;
  selector?: string;
  includeComments?: boolean;
  generateMediaQueries?: boolean;
  generateUtilityClasses?: boolean;
  colorFormat?: 'hex' | 'rgb' | 'hsl';
}

export interface CSSVariableResult {
  variables: string;
  utilities?: string;
  mediaQueries?: string;
  full: string;
}

// =============================================================================
// CSS VARIABLE TRANSFORMER
// =============================================================================

export class CSSVariableTransformer implements TokenTransformer<CSSVariableResult> {
  private defaultOptions: Required<CSSVariableOptions> = {
    prefix: '',
    selector: ':root',
    includeComments: true,
    generateMediaQueries: true,
    generateUtilityClasses: true,
    colorFormat: 'hex',
  };

  transform(tokens: TokenSystem, options: CSSVariableOptions = {}): CSSVariableResult {
    const opts = { ...this.defaultOptions, ...options };
    
    // Generate CSS variables
    const variables = this.generateCSSVariables(tokens, opts);
    
    // Generate utility classes if requested
    const utilities = opts.generateUtilityClasses 
      ? this.generateUtilityClasses(tokens, opts)
      : '';
    
    // Generate media queries if requested
    const mediaQueries = opts.generateMediaQueries
      ? this.generateMediaQueries(tokens, opts)
      : '';
    
    // Combine all parts
    const full = this.combineAll(variables, utilities, mediaQueries, opts);
    
    return {
      variables,
      utilities,
      mediaQueries,
      full,
    };
  }

  private generateCSSVariables(tokens: TokenSystem, options: Required<CSSVariableOptions>): string {
    const { prefix, selector, includeComments } = options;
    let output = '';

    if (includeComments) {
      output += `/* =============================================================================\n`;
      output += ` * CSS Variables Generated from Design Tokens\n`;
      output += ` * Theme: ${tokens.metadata.name} (${tokens.metadata.mode})\n`;
      output += ` * Version: ${tokens.metadata.version}\n`;
      output += ` * ============================================================================= */\n\n`;
    }

    output += `${selector} {\n`;
    
    // Generate color variables
    output += this.generateColorVariables(tokens.colors, prefix, '  ');
    output += '\n';
    
    // Generate typography variables
    output += this.generateTypographyVariables(tokens.typography, prefix, '  ');
    output += '\n';
    
    // Generate spacing variables
    output += this.generateSpacingVariables(tokens.spacing, prefix, '  ');
    output += '\n';
    
    // Generate other token variables
    output += this.generateMiscVariables(tokens, prefix, '  ');
    
    output += '}\n';
    
    return output;
  }

  private generateColorVariables(colors: Record<string, unknown>, prefix: string, indent: string): string {
    let output = `${indent}/* Colors */\n`;
    
    const processColorObject = (obj: Record<string, unknown>, path: string[] = []): void => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = [...path, key];
        const varName = `${prefix}color-${currentPath.join('-')}`;
        
        if (typeof value === 'object' && value !== null) {
          processColorObject(value as Record<string, unknown>, currentPath);
        } else if (typeof value === 'string') {
          output += `${indent}--${varName}: ${value};\n`;
        }
      });
    };
    
    processColorObject(colors);
    return output;
  }

  private generateTypographyVariables(typography: Record<string, unknown>, prefix: string, indent: string): string {
    let output = `${indent}/* Typography */\n`;
    
    // Font families
    if (typography.fontFamily) {
      const families = typography.fontFamily as Record<string, string[]>;
      Object.entries(families).forEach(([key, value]) => {
        output += `${indent}--${prefix}font-family-${key}: ${value.join(', ')};\n`;
      });
    }
    
    // Font sizes
    if (typography.fontSize) {
      const sizes = typography.fontSize as Record<string, string>;
      Object.entries(sizes).forEach(([key, value]) => {
        output += `${indent}--${prefix}font-size-${key}: ${value};\n`;
      });
    }
    
    // Font weights
    if (typography.fontWeight) {
      const weights = typography.fontWeight as Record<string, number>;
      Object.entries(weights).forEach(([key, value]) => {
        output += `${indent}--${prefix}font-weight-${key}: ${value};\n`;
      });
    }
    
    // Line heights
    if (typography.lineHeight) {
      const heights = typography.lineHeight as Record<string, number>;
      Object.entries(heights).forEach(([key, value]) => {
        output += `${indent}--${prefix}line-height-${key}: ${value};\n`;
      });
    }
    
    return output;
  }

  private generateSpacingVariables(spacing: Record<string, unknown>, prefix: string, indent: string): string {
    let output = `${indent}/* Spacing */\n`;
    
    Object.entries(spacing).forEach(([key, value]) => {
      output += `${indent}--${prefix}spacing-${key}: ${value};\n`;
    });
    
    return output;
  }

  private generateMiscVariables(tokens: TokenSystem, prefix: string, indent: string): string {
    let output = '';
    
    // Breakpoints
    if (tokens.responsive?.breakpoints) {
      output += `${indent}/* Breakpoints */\n`;
      Object.entries(tokens.responsive.breakpoints).forEach(([key, value]) => {
        output += `${indent}--${prefix}breakpoint-${key}: ${value};\n`;
      });
      output += '\n';
    }
    
    // Add other token categories as needed
    // Shadows, borders, animations, etc.
    
    return output;
  }

  private generateUtilityClasses(tokens: TokenSystem, options: Required<CSSVariableOptions>): string {
    const { prefix, includeComments } = options;
    let output = '';
    
    if (includeComments) {
      output += `\n/* =============================================================================\n`;
      output += ` * Utility Classes\n`;
      output += ` * ============================================================================= */\n\n`;
    }
    
    // Text color utilities
    output += this.generateColorUtilities(tokens.colors, prefix, 'text');
    
    // Background color utilities
    output += this.generateColorUtilities(tokens.colors, prefix, 'bg');
    
    // Border color utilities
    output += this.generateColorUtilities(tokens.colors, prefix, 'border');
    
    // Spacing utilities
    output += this.generateSpacingUtilities(tokens.spacing, prefix);
    
    // Typography utilities
    output += this.generateTypographyUtilities(tokens.typography, prefix);
    
    return output;
  }

  private generateColorUtilities(colors: Record<string, unknown>, prefix: string, utilityPrefix: string): string {
    let output = `/* ${utilityPrefix} color utilities */\n`;
    
    const processColorObject = (obj: Record<string, unknown>, path: string[] = []): void => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = [...path, key];
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          processColorObject(value as Record<string, unknown>, currentPath);
        } else if (typeof value === 'string') {
          const className = `.${utilityPrefix}-${currentPath.join('-')}`;
          const varName = `--${prefix}color-${currentPath.join('-')}`;
          
          if (utilityPrefix === 'text') {
            output += `${className} { color: var(${varName}); }\n`;
          } else if (utilityPrefix === 'bg') {
            output += `${className} { background-color: var(${varName}); }\n`;
          } else if (utilityPrefix === 'border') {
            output += `${className} { border-color: var(${varName}); }\n`;
          }
        }
      });
    };
    
    processColorObject(colors);
    output += '\n';
    return output;
  }

  private generateSpacingUtilities(spacing: Record<string, unknown>, prefix: string): string {
    let output = `/* Spacing utilities */\n`;
    
    Object.entries(spacing).forEach(([key, value]) => {
      const varName = `--${prefix}spacing-${key}`;
      
      // Padding utilities
      output += `.p-${key} { padding: var(${varName}); }\n`;
      output += `.px-${key} { padding-left: var(${varName}); padding-right: var(${varName}); }\n`;
      output += `.py-${key} { padding-top: var(${varName}); padding-bottom: var(${varName}); }\n`;
      output += `.pt-${key} { padding-top: var(${varName}); }\n`;
      output += `.pr-${key} { padding-right: var(${varName}); }\n`;
      output += `.pb-${key} { padding-bottom: var(${varName}); }\n`;
      output += `.pl-${key} { padding-left: var(${varName}); }\n`;
      
      // Margin utilities
      output += `.m-${key} { margin: var(${varName}); }\n`;
      output += `.mx-${key} { margin-left: var(${varName}); margin-right: var(${varName}); }\n`;
      output += `.my-${key} { margin-top: var(${varName}); margin-bottom: var(${varName}); }\n`;
      output += `.mt-${key} { margin-top: var(${varName}); }\n`;
      output += `.mr-${key} { margin-right: var(${varName}); }\n`;
      output += `.mb-${key} { margin-bottom: var(${varName}); }\n`;
      output += `.ml-${key} { margin-left: var(${varName}); }\n`;
      
      // Gap utilities
      output += `.gap-${key} { gap: var(${varName}); }\n`;
    });
    
    output += '\n';
    return output;
  }

  private generateTypographyUtilities(typography: Record<string, unknown>, prefix: string): string {
    let output = `/* Typography utilities */\n`;
    
    // Font size utilities
    if (typography.fontSize) {
      const sizes = typography.fontSize as Record<string, string>;
      Object.entries(sizes).forEach(([key, value]) => {
        output += `.text-${key} { font-size: var(--${prefix}font-size-${key}); }\n`;
      });
    }
    
    // Font weight utilities
    if (typography.fontWeight) {
      const weights = typography.fontWeight as Record<string, number>;
      Object.entries(weights).forEach(([key, value]) => {
        output += `.font-${key} { font-weight: var(--${prefix}font-weight-${key}); }\n`;
      });
    }
    
    // Line height utilities
    if (typography.lineHeight) {
      const heights = typography.lineHeight as Record<string, number>;
      Object.entries(heights).forEach(([key, value]) => {
        output += `.leading-${key} { line-height: var(--${prefix}line-height-${key}); }\n`;
      });
    }
    
    output += '\n';
    return output;
  }

  private generateMediaQueries(tokens: TokenSystem, options: Required<CSSVariableOptions>): string {
    const { includeComments } = options;
    let output = '';
    
    if (!tokens.responsive?.breakpoints) {
      return output;
    }
    
    if (includeComments) {
      output += `\n/* =============================================================================\n`;
      output += ` * Responsive Media Queries\n`;
      output += ` * ============================================================================= */\n\n`;
    }
    
    const breakpoints = tokens.responsive.breakpoints;
    
    // Generate media queries for each breakpoint
    Object.entries(breakpoints).forEach(([key, value]) => {
      output += `@media (min-width: ${value}) {\n`;
      output += `  /* ${key} breakpoint styles */\n`;
      output += `}\n\n`;
    });
    
    return output;
  }

  private combineAll(
    variables: string, 
    utilities: string, 
    mediaQueries: string,
    options: Required<CSSVariableOptions>
  ): string {
    let output = '';
    
    if (options.includeComments) {
      output += `/**\n`;
      output += ` * Complete CSS output for design token system\n`;
      output += ` * Generated at: ${new Date().toISOString()}\n`;
      output += ` */\n\n`;
    }
    
    output += variables;
    
    if (utilities) {
      output += '\n' + utilities;
    }
    
    if (mediaQueries) {
      output += '\n' + mediaQueries;
    }
    
    return output;
  }
}

// =============================================================================
// FACTORY FUNCTIONS
// =============================================================================

/**
 * Generate CSS variables from theme template
 */
export function generateCSSVariables(
  theme: ThemeTemplate,
  options: CSSVariableOptions = {}
): CSSVariableResult {
  const tokenSystem: TokenSystem = {
    colors: (theme.colors as Record<string, unknown>) || {},
    typography: (theme.typography as Record<string, unknown>) || {},
    spacing: (theme.spacing as Record<string, unknown>) || {},
    branding: (theme.branding as Record<string, unknown>) || {},
    accessibility: (theme.accessibility as Record<string, unknown>) || {},
    responsive: (theme.responsive as Record<string, unknown>) || {},
    metadata: {
      id: theme.id,
      name: theme.name,
      category: theme.category,
      mode: theme.mode,
      version: theme.version,
    },
  };

  const transformer = new CSSVariableTransformer();
  return transformer.transform(tokenSystem, options);
}

/**
 * Generate CSS for multiple themes
 */
export function generateMultiThemeCSS(
  themes: ThemeTemplate[],
  options: CSSVariableOptions = {}
): Record<string, CSSVariableResult> {
  const results: Record<string, CSSVariableResult> = {};
  
  themes.forEach(theme => {
    const themeOptions = {
      ...options,
      selector: `[data-theme="${theme.id}"]`,
    };
    results[theme.id] = generateCSSVariables(theme, themeOptions);
  });
  
  return results;
}

// Export transformer class
export default CSSVariableTransformer;