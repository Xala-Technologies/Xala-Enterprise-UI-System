import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils/logger.js';
import { TemplateEngine } from './template-engine.js';

export interface ThemeConfig {
  readonly name: string;
  readonly brand?: string;
  readonly industry: string;
  readonly colors: Record<string, string>;
  readonly accessibility: 'AA' | 'AAA';
  readonly features: ReadonlyArray<string>;
  readonly locales: ReadonlyArray<string>;
}

export interface GenerationOptions {
  readonly outputDir: string;
  readonly preview: boolean;
}

export interface ThemeInfo {
  readonly name: string;
  readonly description: string;
  readonly industry: string;
  readonly accessibility: string;
  readonly isActive: boolean;
}

export class ThemeGenerator {
  private readonly templateEngine: TemplateEngine;

  constructor() {
    this.templateEngine = new TemplateEngine();
  }

  async createTheme(config: ThemeConfig, options: GenerationOptions): Promise<void> {
    logger.info(`Creating theme: ${config.name}`);

    // Ensure output directory exists
    if (!existsSync(options.outputDir)) {
      mkdirSync(options.outputDir, { recursive: true });
    }

    // Generate theme definition file
    await this.generateThemeDefinition(config, options);
    
    // Generate design tokens
    await this.generateDesignTokens(config, options);
    
    // Generate CSS variables
    await this.generateCSSVariables(config, options);
    
    // Generate Tailwind configuration
    await this.generateTailwindConfig(config, options);
    
    // Generate TypeScript types
    await this.generateTypeDefinitions(config, options);
    
    // Generate theme documentation
    await this.generateDocumentation(config, options);
    
    logger.success(`Theme "${config.name}" created successfully`);
  }

  async applyTheme(themeName: string, options: {
    updateConfig: boolean;
    generateCSS: boolean;
    updateTailwind: boolean;
  }): Promise<void> {
    logger.info(`Applying theme: ${themeName}`);

    const themeConfig = await this.loadThemeConfig(themeName);
    
    if (options.updateConfig) {
      await this.updateXalaConfig(themeConfig);
    }
    
    if (options.generateCSS) {
      await this.generateGlobalCSS(themeConfig);
    }
    
    if (options.updateTailwind) {
      await this.updateTailwindConfig(themeConfig);
    }
    
    logger.success(`Theme "${themeName}" applied successfully`);
  }

  async customizeTheme(themeName: string, customizations: any): Promise<void> {
    const themeConfig = await this.loadThemeConfig(themeName);
    const updatedConfig = this.mergeCustomizations(themeConfig, customizations);
    
    await this.saveThemeConfig(updatedConfig);
    logger.success(`Theme "${themeName}" customized successfully`);
  }

  async listAvailableThemes(): Promise<ReadonlyArray<ThemeInfo>> {
    const themesDir = './src/themes';
    
    if (!existsSync(themesDir)) {
      return [];
    }

    // Mock implementation - in production, scan directory for theme files
    return [
      {
        name: 'base-light',
        description: 'Default light theme with modern design',
        industry: 'general',
        accessibility: 'AAA',
        isActive: true
      },
      {
        name: 'base-dark',
        description: 'Default dark theme with modern design',
        industry: 'general',
        accessibility: 'AAA',
        isActive: false
      },
      {
        name: 'healthcare',
        description: 'Medical and healthcare focused theme',
        industry: 'healthcare',
        accessibility: 'AAA',
        isActive: false
      }
    ];
  }

  async generatePreview(themeName: string, options: {
    port: number;
    openBrowser: boolean;
  }): Promise<string> {
    logger.info(`Generating preview for theme: ${themeName}`);
    
    const previewUrl = `http://localhost:${options.port}`;
    
    // Mock implementation - in production, start preview server
    if (options.openBrowser) {
      // await open(previewUrl);
    }
    
    return previewUrl;
  }

  private async generateThemeDefinition(config: ThemeConfig, options: GenerationOptions): Promise<void> {
    const themeDefinition = this.buildThemeDefinition(config);
    const filename = join(options.outputDir, `${config.name}.theme.ts`);
    
    writeFileSync(filename, themeDefinition);
  }

  private buildThemeDefinition(config: ThemeConfig): string {
    const colorPalette = this.generateColorPalette(config.colors);
    const spacing = this.generateSpacingScale();
    const typography = this.generateTypographyScale(config.industry);
    
    return `// Generated theme: ${config.name}
// Industry: ${config.industry}
// Accessibility: ${config.accessibility}
// Generated on: ${new Date().toISOString()}

import { Theme } from '@xala-technologies/ui-system';

export const ${this.toCamelCase(config.name)}Theme: Theme = {
  name: '${config.name}',
  brand: '${config.brand || config.name}',
  industry: '${config.industry}',
  accessibility: '${config.accessibility}',
  
  colors: ${JSON.stringify(colorPalette, null, 2)},
  
  spacing: ${JSON.stringify(spacing, null, 2)},
  
  typography: ${JSON.stringify(typography, null, 2)},
  
  borderRadius: {
    none: '0px',
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
    round: '9999px'
  },
  
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xlarge: '0 20px 25px rgba(0, 0, 0, 0.1)'
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    medium: '300ms ease-in-out',
    slow: '500ms ease-in-out'
  },
  
  features: ${JSON.stringify(config.features, null, 2)},
  locales: ${JSON.stringify(config.locales, null, 2)}
};

export default ${this.toCamelCase(config.name)}Theme;`;
  }

  private generateColorPalette(colors: Record<string, string>): Record<string, any> {
    const palette: Record<string, any> = {
      primary: this.generateColorScale(colors.primary || '#0891b2'),
      secondary: this.generateColorScale(colors.secondary || '#0f766e'),
      neutral: this.generateColorScale('#64748b'),
      success: this.generateColorScale('#059669'),
      warning: this.generateColorScale('#d97706'),
      error: this.generateColorScale('#dc2626'),
      info: this.generateColorScale('#2563eb')
    };

    // Add semantic color mappings
    palette.text = {
      primary: palette.neutral[900],
      secondary: palette.neutral[600],
      tertiary: palette.neutral[400],
      inverse: '#ffffff',
      link: palette.primary[600],
      linkHover: palette.primary[700]
    };

    palette.background = {
      primary: '#ffffff',
      secondary: palette.neutral[50],
      tertiary: palette.neutral[100],
      inverse: palette.neutral[900],
      overlay: 'rgba(0, 0, 0, 0.5)'
    };

    palette.surface = {
      primary: '#ffffff',
      secondary: palette.neutral[50],
      tertiary: palette.neutral[100],
      elevated: '#ffffff',
      sunken: palette.neutral[25]
    };

    palette.border = {
      primary: palette.neutral[200],
      secondary: palette.neutral[100],
      focus: palette.primary[500],
      error: palette.error[500],
      success: palette.success[500]
    };

    return palette;
  }

  private generateColorScale(baseColor: string): Record<string, string> {
    // Mock color scale generation - in production, use a proper color scale generator
    return {
      25: this.lighten(baseColor, 95),
      50: this.lighten(baseColor, 90),
      100: this.lighten(baseColor, 80),
      200: this.lighten(baseColor, 60),
      300: this.lighten(baseColor, 40),
      400: this.lighten(baseColor, 20),
      500: baseColor,
      600: this.darken(baseColor, 20),
      700: this.darken(baseColor, 40),
      800: this.darken(baseColor, 60),
      900: this.darken(baseColor, 80),
      950: this.darken(baseColor, 90)
    };
  }

  private generateSpacingScale(): Record<string, string> {
    // 8pt grid system
    return {
      none: '0px',
      xs: '4px',    // 0.5 * 8
      sm: '8px',    // 1 * 8
      md: '16px',   // 2 * 8
      lg: '24px',   // 3 * 8
      xl: '32px',   // 4 * 8
      '2xl': '40px', // 5 * 8
      '3xl': '48px', // 6 * 8
      '4xl': '64px', // 8 * 8
      '5xl': '80px', // 10 * 8
      '6xl': '96px'  // 12 * 8
    };
  }

  private generateTypographyScale(industry: string): Record<string, any> {
    const baseScale = {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      },
      fontSize: {
        xs: { size: '12px', lineHeight: '16px' },
        sm: { size: '14px', lineHeight: '20px' },
        base: { size: '16px', lineHeight: '24px' },
        lg: { size: '18px', lineHeight: '28px' },
        xl: { size: '20px', lineHeight: '28px' },
        '2xl': { size: '24px', lineHeight: '32px' },
        '3xl': { size: '30px', lineHeight: '36px' },
        '4xl': { size: '36px', lineHeight: '40px' },
        '5xl': { size: '48px', lineHeight: '1' },
        '6xl': { size: '60px', lineHeight: '1' }
      },
      fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900
      }
    };

    // Industry-specific typography adjustments
    switch (industry) {
      case 'healthcare':
        baseScale.fontFamily.sans = ['Source Sans Pro', 'system-ui', 'sans-serif'];
        break;
      case 'finance':
        baseScale.fontFamily.sans = ['IBM Plex Sans', 'system-ui', 'sans-serif'];
        break;
      case 'education':
        baseScale.fontFamily.sans = ['Open Sans', 'system-ui', 'sans-serif'];
        break;
    }

    return baseScale;
  }

  private async generateDesignTokens(config: ThemeConfig, options: GenerationOptions): Promise<void> {
    const tokens = {
      $schema: 'https://schemas.xala.dev/design-tokens.json',
      $version: '1.0.0',
      $description: `Design tokens for ${config.name} theme`,
      ...this.buildTokenStructure(config)
    };

    const filename = join(options.outputDir, `${config.name}.tokens.json`);
    writeFileSync(filename, JSON.stringify(tokens, null, 2));
  }

  private buildTokenStructure(config: ThemeConfig): any {
    return {
      color: this.generateColorPalette(config.colors),
      space: this.generateSpacingScale(),
      font: this.generateTypographyScale(config.industry),
      radius: {
        none: { value: '0px' },
        sm: { value: '4px' },
        md: { value: '8px' },
        lg: { value: '12px' },
        xl: { value: '16px' },
        full: { value: '9999px' }
      }
    };
  }

  private async generateCSSVariables(config: ThemeConfig, options: GenerationOptions): Promise<void> {
    const cssVariables = this.buildCSSVariables(config);
    const filename = join(options.outputDir, `${config.name}.css`);
    
    writeFileSync(filename, cssVariables);
  }

  private buildCSSVariables(config: ThemeConfig): string {
    const colorPalette = this.generateColorPalette(config.colors);
    const spacing = this.generateSpacingScale();
    
    let css = `/* ${config.name} theme CSS variables */\n`;
    css += `/* Generated on: ${new Date().toISOString()} */\n\n`;
    css += `:root {\n`;
    
    // Color variables
    css += `  /* Colors */\n`;
    Object.entries(colorPalette).forEach(([category, colors]) => {
      if (typeof colors === 'object') {
        Object.entries(colors).forEach(([shade, value]) => {
          css += `  --color-${category}-${shade}: ${value};\n`;
        });
      } else {
        css += `  --color-${category}: ${colors};\n`;
      }
    });
    
    // Spacing variables
    css += `\n  /* Spacing */\n`;
    Object.entries(spacing).forEach(([key, value]) => {
      css += `  --space-${key}: ${value};\n`;
    });
    
    css += `}\n`;
    
    // Dark mode overrides if supported
    if (config.features.includes('darkMode')) {
      css += `\n@media (prefers-color-scheme: dark) {\n`;
      css += `  :root {\n`;
      css += `    --color-text-primary: #ffffff;\n`;
      css += `    --color-background-primary: #0f172a;\n`;
      css += `    --color-surface-primary: #1e293b;\n`;
      css += `  }\n`;
      css += `}\n`;
    }
    
    return css;
  }

  private async generateTailwindConfig(config: ThemeConfig, options: GenerationOptions): Promise<void> {
    const tailwindConfig = this.buildTailwindConfig(config);
    const filename = join(options.outputDir, `${config.name}.tailwind.js`);
    
    writeFileSync(filename, tailwindConfig);
  }

  private buildTailwindConfig(config: ThemeConfig): string {
    const colorPalette = this.generateColorPalette(config.colors);
    const spacing = this.generateSpacingScale();
    
    return `// Tailwind config for ${config.name} theme
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colorPalette, null, 6)},
      spacing: ${JSON.stringify(spacing, null, 6)},
      fontFamily: {
        sans: ${JSON.stringify(this.generateTypographyScale(config.industry).fontFamily.sans)},
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      }
    }
  }
};`;
  }

  private async generateTypeDefinitions(config: ThemeConfig, options: GenerationOptions): Promise<void> {
    const typeDefinitions = this.buildTypeDefinitions(config);
    const filename = join(options.outputDir, `${config.name}.types.ts`);
    
    writeFileSync(filename, typeDefinitions);
  }

  private buildTypeDefinitions(config: ThemeConfig): string {
    return `// Type definitions for ${config.name} theme

export interface ${this.toPascalCase(config.name)}Theme {
  readonly name: '${config.name}';
  readonly brand: string;
  readonly industry: '${config.industry}';
  readonly accessibility: '${config.accessibility}';
  readonly colors: ThemeColors;
  readonly spacing: ThemeSpacing;
  readonly typography: ThemeTypography;
  readonly features: ReadonlyArray<string>;
  readonly locales: ReadonlyArray<string>;
}

export interface ThemeColors {
  readonly primary: ColorScale;
  readonly secondary: ColorScale;
  readonly neutral: ColorScale;
  readonly success: ColorScale;
  readonly warning: ColorScale;
  readonly error: ColorScale;
  readonly info: ColorScale;
  readonly text: TextColors;
  readonly background: BackgroundColors;
  readonly surface: SurfaceColors;
  readonly border: BorderColors;
}

export interface ColorScale {
  readonly 25: string;
  readonly 50: string;
  readonly 100: string;
  readonly 200: string;
  readonly 300: string;
  readonly 400: string;
  readonly 500: string;
  readonly 600: string;
  readonly 700: string;
  readonly 800: string;
  readonly 900: string;
  readonly 950: string;
}

export interface TextColors {
  readonly primary: string;
  readonly secondary: string;
  readonly tertiary: string;
  readonly inverse: string;
  readonly link: string;
  readonly linkHover: string;
}

export interface BackgroundColors {
  readonly primary: string;
  readonly secondary: string;
  readonly tertiary: string;
  readonly inverse: string;
  readonly overlay: string;
}

export interface SurfaceColors {
  readonly primary: string;
  readonly secondary: string;
  readonly tertiary: string;
  readonly elevated: string;
  readonly sunken: string;
}

export interface BorderColors {
  readonly primary: string;
  readonly secondary: string;
  readonly focus: string;
  readonly error: string;
  readonly success: string;
}

export interface ThemeSpacing {
  readonly none: string;
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
  readonly '2xl': string;
  readonly '3xl': string;
  readonly '4xl': string;
  readonly '5xl': string;
  readonly '6xl': string;
}

export interface ThemeTypography {
  readonly fontFamily: {
    readonly sans: ReadonlyArray<string>;
    readonly serif: ReadonlyArray<string>;
    readonly mono: ReadonlyArray<string>;
  };
  readonly fontSize: Record<string, { readonly size: string; readonly lineHeight: string }>;
  readonly fontWeight: Record<string, number>;
}`;
  }

  private async generateDocumentation(config: ThemeConfig, options: GenerationOptions): Promise<void> {
    const documentation = this.buildDocumentation(config);
    const filename = join(options.outputDir, `${config.name}.md`);
    
    writeFileSync(filename, documentation);
  }

  private buildDocumentation(config: ThemeConfig): string {
    return `# ${this.toTitleCase(config.name)} Theme

${config.brand ? `**Brand:** ${config.brand}` : ''}
**Industry:** ${this.toTitleCase(config.industry)}  
**Accessibility:** WCAG ${config.accessibility}  
**Generated:** ${new Date().toLocaleDateString()}

## Overview

This theme was generated for ${config.industry} applications with ${config.accessibility} accessibility compliance.

## Colors

### Primary Colors
- Primary: ${config.colors.primary || '#0891b2'}
- Secondary: ${config.colors.secondary || '#0f766e'}

### Usage Guidelines
- Use primary colors for main actions and branding
- Use secondary colors for supporting elements
- Maintain contrast ratios for ${config.accessibility} compliance

## Features

${config.features.map(feature => `- ${this.toTitleCase(feature)}`).join('\n')}

## Supported Locales

${config.locales.map(locale => `- ${locale}`).join('\n')}

## Implementation

\`\`\`typescript
import { ${this.toCamelCase(config.name)}Theme } from './themes/${config.name}.theme';

// Apply theme in your app
<UISystemProvider theme={${this.toCamelCase(config.name)}Theme}>
  <App />
</UISystemProvider>
\`\`\`

## Files Generated

- \`${config.name}.theme.ts\` - Theme definition
- \`${config.name}.tokens.json\` - Design tokens
- \`${config.name}.css\` - CSS variables
- \`${config.name}.tailwind.js\` - Tailwind configuration
- \`${config.name}.types.ts\` - TypeScript definitions

## Customization

To customize this theme, use:

\`\`\`bash
xala themes customize ${config.name}
\`\`\`

## Preview

To preview this theme, use:

\`\`\`bash
xala themes preview ${config.name}
\`\`\`
`;
  }

  private async loadThemeConfig(themeName: string): Promise<ThemeConfig> {
    // Mock implementation - load from file system
    return {
      name: themeName,
      industry: 'general',
      colors: { primary: '#0891b2', secondary: '#0f766e' },
      accessibility: 'AAA',
      features: [],
      locales: ['en-US']
    };
  }

  private async saveThemeConfig(config: ThemeConfig): Promise<void> {
    // Mock implementation - save to file system
    logger.debug(`Saving theme config: ${config.name}`);
  }

  private mergeCustomizations(config: ThemeConfig, customizations: any): ThemeConfig {
    return {
      ...config,
      ...customizations,
      colors: { ...config.colors, ...customizations.colors }
    };
  }

  private async updateXalaConfig(themeConfig: ThemeConfig): Promise<void> {
    const configPath = './xala.config.js';
    // Implementation would update the config file
  }

  private async generateGlobalCSS(themeConfig: ThemeConfig): Promise<void> {
    // Implementation would generate global CSS
  }

  private async updateTailwindConfig(themeConfig: ThemeConfig): Promise<void> {
    // Implementation would update tailwind.config.js
  }

  // Utility methods
  private toCamelCase(str: string): string {
    return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
  }

  private toPascalCase(str: string): string {
    return this.toCamelCase(str).replace(/^./, c => c.toUpperCase());
  }

  private toTitleCase(str: string): string {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  }

  private lighten(color: string, percentage: number): string {
    // Mock implementation - use proper color manipulation library
    return color;
  }

  private darken(color: string, percentage: number): string {
    // Mock implementation - use proper color manipulation library
    return color;
  }
}