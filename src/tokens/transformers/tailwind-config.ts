/**
 * Tailwind Config Output Transformer for Design Tokens
 * Generates Tailwind configuration from token system
 */

import type { ThemeTemplate } from '../themes/template-loader';
import type { TokenSystem, TokenTransformer } from './typescript-types';

// =============================================================================
// TAILWIND CONFIG TRANSFORMER INTERFACES
// =============================================================================

export interface TailwindConfigOptions {
  /** Whether to extend or replace default Tailwind config */
  mode?: 'extend' | 'replace';
  /** Whether to include comments in the output */
  includeComments?: boolean;
  /** Whether to generate content paths */
  generateContent?: boolean;
  /** Whether to include plugin configurations */
  includePlugins?: boolean;
  /** Custom prefix for all classes */
  prefix?: string;
  /** Important selector */
  important?: boolean | string;
  /** Whether to generate safelist patterns */
  generateSafelist?: boolean;
}

export interface TailwindConfigResult {
  config: string;
  types?: string;
  full: string;
}

// =============================================================================
// TAILWIND CONFIG TRANSFORMER
// =============================================================================

export class TailwindConfigTransformer implements TokenTransformer<TailwindConfigResult> {
  private defaultOptions: Required<TailwindConfigOptions> = {
    mode: 'extend',
    includeComments: true,
    generateContent: true,
    includePlugins: true,
    prefix: '',
    important: false,
    generateSafelist: true,
  };

  transform(tokens: TokenSystem, options: TailwindConfigOptions = {}): TailwindConfigResult {
    const opts = { ...this.defaultOptions, ...options };
    
    // Generate Tailwind config
    const config = this.generateTailwindConfig(tokens, opts);
    
    // Generate TypeScript types if needed
    const types = opts.includeComments 
      ? this.generateTypeDefinitions(tokens, opts)
      : '';
    
    // Combine all parts
    const full = this.combineAll(config, types, opts);
    
    return {
      config,
      types,
      full,
    };
  }

  private generateTailwindConfig(tokens: TokenSystem, options: Required<TailwindConfigOptions>): string {
    const { mode, includeComments, generateContent, includePlugins, prefix, important, generateSafelist } = options;
    let output = '';

    if (includeComments) {
      output += `/** @type {import('tailwindcss').Config} */\n`;
      output += `/**\n`;
      output += ` * Tailwind Configuration Generated from Design Tokens\n`;
      output += ` * Theme: ${tokens.metadata.name} (${tokens.metadata.mode})\n`;
      output += ` * Version: ${tokens.metadata.version}\n`;
      output += ` * Generated at: ${new Date().toISOString()}\n`;
      output += ` */\n\n`;
    }

    output += `module.exports = {\n`;
    
    // Content paths
    if (generateContent) {
      output += `  content: [\n`;
      output += `    './src/**/*.{js,ts,jsx,tsx,mdx}',\n`;
      output += `    './pages/**/*.{js,ts,jsx,tsx,mdx}',\n`;
      output += `    './components/**/*.{js,ts,jsx,tsx,mdx}',\n`;
      output += `    './app/**/*.{js,ts,jsx,tsx,mdx}',\n`;
      output += `  ],\n`;
    }
    
    // Prefix and important
    if (prefix) {
      output += `  prefix: '${prefix}',\n`;
    }
    if (important !== false) {
      output += `  important: ${typeof important === 'string' ? `'${important}'` : 'true'},\n`;
    }
    
    // Theme configuration
    output += `  theme: {\n`;
    
    if (mode === 'extend') {
      output += `    extend: {\n`;
      output += this.generateThemeConfig(tokens, '      ');
      output += `    },\n`;
    } else {
      output += this.generateThemeConfig(tokens, '    ');
    }
    
    output += `  },\n`;
    
    // Plugins
    if (includePlugins) {
      output += this.generatePlugins(tokens, '  ');
    }
    
    // Safelist
    if (generateSafelist) {
      output += this.generateSafelist(tokens, '  ');
    }
    
    output += `};\n`;
    
    return output;
  }

  private generateThemeConfig(tokens: TokenSystem, indent: string): string {
    let output = '';
    
    // Colors
    if (tokens.colors) {
      output += `${indent}colors: {\n`;
      output += this.generateColorConfig(tokens.colors, `${indent}  `);
      output += `${indent}},\n`;
    }
    
    // Typography
    if (tokens.typography) {
      // Font families
      if (tokens.typography.fontFamily) {
        output += `${indent}fontFamily: {\n`;
        const families = tokens.typography.fontFamily as Record<string, string[]>;
        Object.entries(families).forEach(([key, value]) => {
          output += `${indent}  '${key}': ${JSON.stringify(value)},\n`;
        });
        output += `${indent}},\n`;
      }
      
      // Font sizes
      if (tokens.typography.fontSize) {
        output += `${indent}fontSize: {\n`;
        const sizes = tokens.typography.fontSize as Record<string, string>;
        Object.entries(sizes).forEach(([key, value]) => {
          output += `${indent}  '${key}': '${value}',\n`;
        });
        output += `${indent}},\n`;
      }
      
      // Font weights
      if (tokens.typography.fontWeight) {
        output += `${indent}fontWeight: {\n`;
        const weights = tokens.typography.fontWeight as Record<string, number>;
        Object.entries(weights).forEach(([key, value]) => {
          output += `${indent}  '${key}': '${value}',\n`;
        });
        output += `${indent}},\n`;
      }
      
      // Line heights
      if (tokens.typography.lineHeight) {
        output += `${indent}lineHeight: {\n`;
        const heights = tokens.typography.lineHeight as Record<string, number>;
        Object.entries(heights).forEach(([key, value]) => {
          output += `${indent}  '${key}': '${value}',\n`;
        });
        output += `${indent}},\n`;
      }
    }
    
    // Spacing
    if (tokens.spacing) {
      output += `${indent}spacing: {\n`;
      Object.entries(tokens.spacing).forEach(([key, value]) => {
        output += `${indent}  '${key}': '${value}',\n`;
      });
      output += `${indent}},\n`;
    }
    
    // Breakpoints
    if (tokens.responsive?.breakpoints) {
      output += `${indent}screens: {\n`;
      Object.entries(tokens.responsive.breakpoints).forEach(([key, value]) => {
        output += `${indent}  '${key}': '${value}',\n`;
      });
      output += `${indent}},\n`;
    }
    
    // Additional token categories
    output += this.generateAdditionalTokens(tokens, indent);
    
    return output;
  }

  private generateColorConfig(colors: Record<string, unknown>, indent: string): string {
    let output = '';
    
    const processColorObject = (obj: Record<string, unknown>, currentIndent: string): string => {
      let result = '';
      
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          result += `${currentIndent}'${key}': {\n`;
          result += processColorObject(value as Record<string, unknown>, `${currentIndent}  `);
          result += `${currentIndent}},\n`;
        } else if (typeof value === 'string') {
          result += `${currentIndent}'${key}': '${value}',\n`;
        }
      });
      
      return result;
    };
    
    output = processColorObject(colors, indent);
    return output;
  }

  private generateAdditionalTokens(tokens: TokenSystem, indent: string): string {
    let output = '';
    
    // Border radius
    if (tokens.borderRadius) {
      output += `${indent}borderRadius: {\n`;
      Object.entries(tokens.borderRadius).forEach(([key, value]) => {
        output += `${indent}  '${key}': '${value}',\n`;
      });
      output += `${indent}},\n`;
    }
    
    // Box shadow
    if (tokens.shadows) {
      output += `${indent}boxShadow: {\n`;
      Object.entries(tokens.shadows).forEach(([key, value]) => {
        output += `${indent}  '${key}': '${value}',\n`;
      });
      output += `${indent}},\n`;
    }
    
    // Z-index
    if (tokens.zIndex) {
      output += `${indent}zIndex: {\n`;
      Object.entries(tokens.zIndex).forEach(([key, value]) => {
        output += `${indent}  '${key}': '${value}',\n`;
      });
      output += `${indent}},\n`;
    }
    
    // Animation
    if (tokens.animation) {
      // Keyframes
      if (tokens.animation.keyframes) {
        output += `${indent}keyframes: {\n`;
        Object.entries(tokens.animation.keyframes).forEach(([key, value]) => {
          output += `${indent}  '${key}': ${JSON.stringify(value, null, 2).replace(/\n/g, `\n${indent}  `)},\n`;
        });
        output += `${indent}},\n`;
      }
      
      // Animation presets
      if (tokens.animation.presets) {
        output += `${indent}animation: {\n`;
        Object.entries(tokens.animation.presets).forEach(([key, value]) => {
          output += `${indent}  '${key}': '${value}',\n`;
        });
        output += `${indent}},\n`;
      }
    }
    
    // Transitions
    if (tokens.transitions) {
      // Transition property
      if (tokens.transitions.property) {
        output += `${indent}transitionProperty: {\n`;
        Object.entries(tokens.transitions.property).forEach(([key, value]) => {
          output += `${indent}  '${key}': '${value}',\n`;
        });
        output += `${indent}},\n`;
      }
      
      // Transition duration
      if (tokens.transitions.duration) {
        output += `${indent}transitionDuration: {\n`;
        Object.entries(tokens.transitions.duration).forEach(([key, value]) => {
          output += `${indent}  '${key}': '${value}',\n`;
        });
        output += `${indent}},\n`;
      }
      
      // Transition timing function
      if (tokens.transitions.timingFunction) {
        output += `${indent}transitionTimingFunction: {\n`;
        Object.entries(tokens.transitions.timingFunction).forEach(([key, value]) => {
          output += `${indent}  '${key}': '${value}',\n`;
        });
        output += `${indent}},\n`;
      }
    }
    
    return output;
  }

  private generatePlugins(tokens: TokenSystem, indent: string): string {
    let output = `${indent}plugins: [\n`;
    
    // Typography plugin if typography tokens exist
    if (tokens.typography) {
      output += `${indent}  require('@tailwindcss/typography'),\n`;
    }
    
    // Forms plugin if form tokens exist
    if (tokens.forms || tokens.components?.forms) {
      output += `${indent}  require('@tailwindcss/forms'),\n`;
    }
    
    // Aspect ratio plugin
    output += `${indent}  require('@tailwindcss/aspect-ratio'),\n`;
    
    // Custom plugins for token system
    output += `${indent}  // Custom plugin for design token utilities\n`;
    output += `${indent}  function({ addUtilities, theme }) {\n`;
    output += `${indent}    const tokenUtilities = {\n`;
    output += `${indent}      // Add custom utilities based on design tokens\n`;
    output += `${indent}    };\n`;
    output += `${indent}    addUtilities(tokenUtilities);\n`;
    output += `${indent}  },\n`;
    
    output += `${indent}],\n`;
    
    return output;
  }

  private generateSafelist(tokens: TokenSystem, indent: string): string {
    let output = `${indent}safelist: [\n`;
    
    // Dynamic color classes
    output += `${indent}  // Dynamic color classes\n`;
    output += `${indent}  {\n`;
    output += `${indent}    pattern: /^(bg|text|border)-(primary|secondary|success|warning|error|neutral)-(50|100|200|300|400|500|600|700|800|900|950)$/,\n`;
    output += `${indent}  },\n`;
    
    // Dynamic spacing classes
    output += `${indent}  // Dynamic spacing classes\n`;
    output += `${indent}  {\n`;
    output += `${indent}    pattern: /^(p|m|gap)-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,\n`;
    output += `${indent}  },\n`;
    
    // Component-specific classes
    if (tokens.components) {
      output += `${indent}  // Component variant classes\n`;
      output += `${indent}  ...[\n`;
      output += `${indent}    'btn-primary', 'btn-secondary', 'btn-success', 'btn-error',\n`;
      output += `${indent}    'card-default', 'card-elevated', 'card-outlined',\n`;
      output += `${indent}    'input-default', 'input-error', 'input-success',\n`;
      output += `${indent}  ],\n`;
    }
    
    output += `${indent}],\n`;
    
    return output;
  }

  private generateTypeDefinitions(tokens: TokenSystem, options: Required<TailwindConfigOptions>): string {
    let output = '';
    
    output += `\n// TypeScript type definitions for Tailwind config\n`;
    output += `export interface GeneratedTailwindTheme {\n`;
    
    // Color types
    if (tokens.colors) {
      output += `  colors: {\n`;
      output += this.generateColorTypes(tokens.colors, '    ');
      output += `  };\n`;
    }
    
    // Typography types
    if (tokens.typography) {
      output += `  typography: {\n`;
      if (tokens.typography.fontFamily) {
        output += `    fontFamily: Record<string, string[]>;\n`;
      }
      if (tokens.typography.fontSize) {
        output += `    fontSize: Record<string, string>;\n`;
      }
      if (tokens.typography.fontWeight) {
        output += `    fontWeight: Record<string, number>;\n`;
      }
      if (tokens.typography.lineHeight) {
        output += `    lineHeight: Record<string, number>;\n`;
      }
      output += `  };\n`;
    }
    
    // Spacing types
    if (tokens.spacing) {
      output += `  spacing: Record<string, string>;\n`;
    }
    
    // Screens types
    if (tokens.responsive?.breakpoints) {
      output += `  screens: Record<string, string>;\n`;
    }
    
    output += `}\n`;
    
    return output;
  }

  private generateColorTypes(colors: Record<string, unknown>, indent: string): string {
    let output = '';
    
    const processColorObject = (obj: Record<string, unknown>, currentIndent: string): string => {
      let result = '';
      
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          result += `${currentIndent}${key}: {\n`;
          result += processColorObject(value as Record<string, unknown>, `${currentIndent}  `);
          result += `${currentIndent}};\n`;
        } else if (typeof value === 'string') {
          result += `${currentIndent}${key}: string;\n`;
        }
      });
      
      return result;
    };
    
    output = processColorObject(colors, indent);
    return output;
  }

  private combineAll(
    config: string,
    types: string | undefined,
    options: Required<TailwindConfigOptions>
  ): string {
    let output = '';
    
    if (options.includeComments) {
      output += `/**\n`;
      output += ` * Complete Tailwind configuration with design tokens\n`;
      output += ` * This file is auto-generated - do not edit directly\n`;
      output += ` */\n\n`;
    }
    
    output += config;
    
    if (types) {
      output += '\n' + types;
    }
    
    return output;
  }
}

// =============================================================================
// FACTORY FUNCTIONS
// =============================================================================

/**
 * Generate Tailwind config from theme template
 */
export function generateTailwindConfig(
  theme: ThemeTemplate,
  options: TailwindConfigOptions = {}
): TailwindConfigResult {
  const tokenSystem: TokenSystem = {
    colors: (theme.colors as Record<string, unknown>) || {},
    typography: (theme.typography as Record<string, unknown>) || {},
    spacing: (theme.spacing as Record<string, unknown>) || {},
    borderRadius: (theme.borderRadius as Record<string, unknown>) || {},
    shadows: (theme.shadows as Record<string, unknown>) || {},
    zIndex: (theme.zIndex as Record<string, unknown>) || {},
    animation: (theme.animation as Record<string, unknown>) || {},
    transitions: (theme.transitions as Record<string, unknown>) || {},
    components: (theme.components as Record<string, unknown>) || {},
    forms: (theme.forms as Record<string, unknown>) || {},
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

  const transformer = new TailwindConfigTransformer();
  return transformer.transform(tokenSystem, options);
}

/**
 * Generate Tailwind configs for multiple themes
 */
export function generateMultiThemeTailwindConfig(
  themes: ThemeTemplate[],
  options: TailwindConfigOptions = {}
): Record<string, TailwindConfigResult> {
  const results: Record<string, TailwindConfigResult> = {};
  
  themes.forEach(theme => {
    results[theme.id] = generateTailwindConfig(theme, options);
  });
  
  return results;
}

// Export transformer class
export default TailwindConfigTransformer;