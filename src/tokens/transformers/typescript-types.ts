/**
 * TypeScript Type Output Generator for Design Tokens
 * Generates TypeScript interfaces and utility types from token system
 */

import type { ThemeTemplate } from '../themes/template-loader';

// =============================================================================
// TRANSFORMER INTERFACES
// =============================================================================

export interface TokenTransformer<T = unknown> {
  transform(tokens: TokenSystem, options?: Record<string, unknown>): T;
}

export interface TokenSystem {
  colors: Record<string, unknown>;
  typography: Record<string, unknown>;
  spacing: Record<string, unknown>;
  branding: Record<string, unknown>;
  accessibility: Record<string, unknown>;
  responsive: Record<string, unknown>;
  metadata: {
    id: string;
    name: string;
    category: string;
    mode: 'LIGHT' | 'DARK';
    version: string;
  };
}

export interface TypeScriptTypeOptions {
  includeJSDoc?: boolean;
  generateLiterals?: boolean;
  includeComments?: boolean;
  moduleName?: string;
  exportType?: 'named' | 'default';
  namespace?: string;
  generateUtilityTypes?: boolean;
}

export interface TypeScriptTypesResult {
  types: string;
  utilities?: string;
  declarations?: string;
}

// =============================================================================
// TYPESCRIPT TYPE TRANSFORMER
// =============================================================================

export class TypeScriptTypeTransformer implements TokenTransformer<TypeScriptTypesResult> {
  transform(tokens: TokenSystem, options: TypeScriptTypeOptions = {}): TypeScriptTypesResult {
    const {
      includeJSDoc = true,
      generateLiterals = true,
      includeComments = true,
      moduleName = '@xala-technologies/ui-system',
      exportType = 'named',
      namespace,
      generateUtilityTypes = true,
    } = options;

    // Generate core types
    const types = this.generateCoreTypes(tokens, { includeJSDoc, generateLiterals, includeComments });
    
    // Generate utility types if requested
    const utilities = generateUtilityTypes ? this.generateUtilityTypes(tokens, { includeJSDoc, includeComments }) : '';
    
    // Generate module declarations
    const declarations = this.generateModuleDeclarations(tokens, { moduleName, exportType, namespace, includeJSDoc });

    return {
      types,
      utilities,
      declarations,
    };
  }

  private generateCoreTypes(tokens: TokenSystem, options: { includeJSDoc: boolean; generateLiterals: boolean; includeComments: boolean }): string {
    const { includeJSDoc, generateLiterals, includeComments } = options;
    
    let output = '';

    if (includeComments) {
      output += `// =============================================================================\n`;
      output += `// GENERATED TOKEN TYPES\n`;
      output += `// Generated from token system: ${tokens.metadata.name}\n`;
      output += `// Category: ${tokens.metadata.category} | Mode: ${tokens.metadata.mode}\n`;
      output += `// Version: ${tokens.metadata.version}\n`;
      output += `// =============================================================================\n\n`;
    }

    // Color types
    output += this.generateColorTypes(tokens.colors, { includeJSDoc, generateLiterals });
    output += '\n';

    // Typography types
    output += this.generateTypographyTypes(tokens.typography, { includeJSDoc, generateLiterals });
    output += '\n';

    // Spacing types
    output += this.generateSpacingTypes(tokens.spacing, { includeJSDoc, generateLiterals });
    output += '\n';

    // Branding types
    output += this.generateBrandingTypes(tokens.branding, { includeJSDoc, generateLiterals });
    output += '\n';

    // Accessibility types
    output += this.generateAccessibilityTypes(tokens.accessibility, { includeJSDoc, generateLiterals });
    output += '\n';

    // Responsive types
    output += this.generateResponsiveTypes(tokens.responsive, { includeJSDoc, generateLiterals });
    output += '\n';

    // Main tokens interface
    output += this.generateMainInterface(tokens, { includeJSDoc });

    return output;
  }

  private generateColorTypes(colors: Record<string, unknown>, options: { includeJSDoc: boolean; generateLiterals: boolean }): string {
    const { includeJSDoc, generateLiterals } = options;
    let output = '';

    if (includeJSDoc) {
      output += `/**\n * Color token definitions\n */\n`;
    }

    output += `export interface ColorTokens {\n`;
    
    // Generate base color interfaces
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        if (includeJSDoc) {
          output += `  /** ${key} color scale */\n`;
        }
        
        if (generateLiterals && this.isColorScale(value)) {
          // Generate literal types for color scales
          const scales = Object.keys(value as Record<string, unknown>).join(' | ');
          output += `  ${key}: Record<${scales}, string>;\n`;
        } else {
          output += `  ${key}: Record<string, string>;\n`;
        }
      }
    });

    output += `}\n`;
    return output;
  }

  private generateTypographyTypes(typography: Record<string, unknown>, options: { includeJSDoc: boolean; generateLiterals: boolean }): string {
    const { includeJSDoc } = options;
    let output = '';

    if (includeJSDoc) {
      output += `/**\n * Typography token definitions\n */\n`;
    }

    output += `export interface TypographyTokens {\n`;
    
    if (typography.fontFamily) {
      output += `  fontFamily: {\n`;
      Object.keys(typography.fontFamily as Record<string, unknown>).forEach(key => {
        output += `    ${key}: string[];\n`;
      });
      output += `  };\n`;
    }

    if (typography.fontSize) {
      output += `  fontSize: Record<string, string>;\n`;
    }

    if (typography.fontWeight) {
      output += `  fontWeight: Record<string, number>;\n`;
    }

    if (typography.lineHeight) {
      output += `  lineHeight: Record<string, number>;\n`;
    }

    output += `}\n`;
    return output;
  }

  private generateSpacingTypes(spacing: Record<string, unknown>, options: { includeJSDoc: boolean; generateLiterals: boolean }): string {
    const { includeJSDoc, generateLiterals } = options;
    let output = '';

    if (includeJSDoc) {
      output += `/**\n * Spacing token definitions\n */\n`;
    }

    if (generateLiterals) {
      const spacingKeys = Object.keys(spacing).map(k => `'${k}'`).join(' | ');
      output += `export interface SpacingTokens extends Record<${spacingKeys}, string> {\n`;
      
      Object.keys(spacing).forEach(key => {
        output += `  ${key}: string;\n`;
      });
      
      output += `}\n`;
    } else {
      output += `export interface SpacingTokens extends Record<string, string> {}\n`;
    }

    return output;
  }

  private generateBrandingTypes(branding: Record<string, unknown>, options: { includeJSDoc: boolean; generateLiterals: boolean }): string {
    const { includeJSDoc } = options;
    let output = '';

    if (includeJSDoc) {
      output += `/**\n * Branding token definitions\n */\n`;
    }

    output += `export interface BrandingTokens {\n`;
    
    Object.entries(branding).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        output += `  ${key}: Record<string, string>;\n`;
      } else {
        output += `  ${key}: string;\n`;
      }
    });
    
    // Allow for dynamic branding properties
    output += `  [key: string]: unknown;\n`;
    output += `}\n`;

    return output;
  }

  private generateAccessibilityTypes(accessibility: Record<string, unknown>, options: { includeJSDoc: boolean; generateLiterals: boolean }): string {
    const { includeJSDoc } = options;
    let output = '';

    if (includeJSDoc) {
      output += `/**\n * Accessibility token definitions\n */\n`;
    }

    output += `export interface AccessibilityTokens {\n`;
    
    Object.entries(accessibility).forEach(([key, value]) => {
      const type = typeof value === 'boolean' ? 'boolean' : 'string';
      output += `  ${key}: ${type};\n`;
    });
    
    output += `}\n`;
    return output;
  }

  private generateResponsiveTypes(responsive: Record<string, unknown>, options: { includeJSDoc: boolean; generateLiterals: boolean }): string {
    const { includeJSDoc } = options;
    let output = '';

    if (includeJSDoc) {
      output += `/**\n * Responsive token definitions\n */\n`;
    }

    output += `export interface ResponsiveTokens {\n`;
    
    if (responsive.breakpoints) {
      output += `  breakpoints: {\n`;
      Object.keys(responsive.breakpoints as Record<string, unknown>).forEach(key => {
        output += `    ${key}: string;\n`;
      });
      output += `  };\n`;
    }
    
    output += `}\n`;
    return output;
  }

  private generateMainInterface(tokens: TokenSystem, options: { includeJSDoc: boolean }): string {
    const { includeJSDoc } = options;
    let output = '';

    if (includeJSDoc) {
      output += `/**\n * Complete design token system interface\n */\n`;
    }

    output += `export interface DesignTokens {\n`;
    output += `  colors: ColorTokens;\n`;
    output += `  typography: TypographyTokens;\n`;
    output += `  spacing: SpacingTokens;\n`;
    output += `  branding: BrandingTokens;\n`;
    output += `  accessibility: AccessibilityTokens;\n`;
    output += `  responsive: ResponsiveTokens;\n`;
    output += `  \n`;
    output += `  /** Theme metadata */\n`;
    output += `  theme: {\n`;
    output += `    id: string;\n`;
    output += `    name: string;\n`;
    output += `    category: string;\n`;
    output += `    mode: 'LIGHT' | 'DARK';\n`;
    output += `    version: string;\n`;
    output += `  };\n`;
    output += `}\n`;

    return output;
  }

  private generateUtilityTypes(tokens: TokenSystem, options: { includeJSDoc: boolean; includeComments: boolean }): string {
    const { includeJSDoc, includeComments } = options;
    let output = '';

    if (includeComments) {
      output += `// =============================================================================\n`;
      output += `// UTILITY TYPES\n`;
      output += `// =============================================================================\n\n`;
    }

    // Color utility types
    if (includeJSDoc) {
      output += `/**\n * Extract color scale keys\n */\n`;
    }
    output += `export type ColorScale<T extends keyof ColorTokens> = keyof ColorTokens[T];\n\n`;

    // Spacing utility types
    if (includeJSDoc) {
      output += `/**\n * Extract spacing keys\n */\n`;
    }
    output += `export type SpacingScale = keyof SpacingTokens;\n\n`;

    // Token path utility
    if (includeJSDoc) {
      output += `/**\n * Deep token path type\n */\n`;
    }
    output += `export type TokenPath = \n`;
    output += `  | \`colors.\${keyof ColorTokens}.\${string}\`\n`;
    output += `  | \`typography.\${keyof TypographyTokens}\`\n`;
    output += `  | \`spacing.\${keyof SpacingTokens}\`\n`;
    output += `  | \`branding.\${keyof BrandingTokens}\`\n`;
    output += `  | \`accessibility.\${keyof AccessibilityTokens}\`\n`;
    output += `  | \`responsive.\${keyof ResponsiveTokens}\`;\n\n`;

    return output;
  }

  private generateModuleDeclarations(tokens: TokenSystem, options: { moduleName: string; exportType: string; namespace?: string; includeJSDoc: boolean }): string {
    const { moduleName, exportType, namespace, includeJSDoc } = options;
    let output = '';

    if (includeJSDoc) {
      output += `/**\n * Module declarations for ${moduleName}\n */\n`;
    }

    if (namespace) {
      output += `declare namespace ${namespace} {\n`;
    }

    output += `declare module '${moduleName}' {\n`;
    
    if (exportType === 'named') {
      output += `  export {\n`;
      output += `    DesignTokens,\n`;
      output += `    ColorTokens,\n`;
      output += `    TypographyTokens,\n`;
      output += `    SpacingTokens,\n`;
      output += `    BrandingTokens,\n`;
      output += `    AccessibilityTokens,\n`;
      output += `    ResponsiveTokens,\n`;
      output += `    TokenPath,\n`;
      output += `    ColorScale,\n`;
      output += `    SpacingScale,\n`;
      output += `  };\n`;
    } else {
      output += `  const tokens: DesignTokens;\n`;
      output += `  export default tokens;\n`;
    }
    
    output += `}\n`;

    if (namespace) {
      output += `}\n`;
    }

    return output;
  }

  private isColorScale(value: unknown): boolean {
    if (typeof value !== 'object' || value === null) return false;
    
    const keys = Object.keys(value as Record<string, unknown>);
    // Check if keys are numeric (50, 100, 200, etc.) which indicates a color scale
    return keys.some(key => /^\d+$/.test(key));
  }
}

// =============================================================================
// FACTORY FUNCTION
// =============================================================================

/**
 * Create TypeScript types from theme template
 */
export function generateTypeScriptTypes(
  theme: ThemeTemplate,
  options: TypeScriptTypeOptions = {}
): TypeScriptTypesResult {
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

  const transformer = new TypeScriptTypeTransformer();
  return transformer.transform(tokenSystem, options);
}

/**
 * Generate TypeScript types for multiple themes
 */
export function generateMultiThemeTypes(
  themes: ThemeTemplate[],
  options: TypeScriptTypeOptions = {}
): Record<string, TypeScriptTypesResult> {
  const results: Record<string, TypeScriptTypesResult> = {};
  
  themes.forEach(theme => {
    results[theme.id] = generateTypeScriptTypes(theme, options);
  });
  
  return results;
}

// Export transformer class and utilities
export default TypeScriptTypeTransformer;