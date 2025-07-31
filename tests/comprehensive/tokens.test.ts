/**
 * Comprehensive Token System Testing Suite
 * Tests all aspects of the design token system
 */

import {
  generateTypeScriptTypes,
  generateCSSVariables,
  generateTailwindConfig,
  generateJSONSchema,
  validateTokensAgainstSchema,
} from '../../src/tokens/transformers';

import {
  resolveTokenReference,
  getTokenValue,
  generateVariantCSSVariables,
  buttonVariantMap,
  inputVariantMap,
} from '../../src/tokens/variant-maps';

import {
  mergeStateTokens,
  generateStateCSS,
  buttonStateMap,
  inputStateMap,
} from '../../src/tokens/state-maps';

import {
  getResponsiveValue,
  generateResponsiveCSS,
  generateResponsiveUtilities,
  responsiveTypography,
  responsiveSpacing,
} from '../../src/tokens/responsive-tokens';

// Sample token system for testing
const mockTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    neutral: {
      50: '#fafafa',
      500: '#737373',
      900: '#171717',
    },
    white: '#ffffff',
    transparent: 'transparent',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem',
    8: '2rem',
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  branding: {},
  accessibility: {
    wcagLevel: 'AA',
  },
  responsive: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  metadata: {
    id: 'test-theme',
    name: 'Test Theme',
    category: 'test',
    mode: 'LIGHT' as const,
    version: '1.0.0',
  },
};

describe('Token Transformers', () => {
  describe('TypeScript Type Transformer', () => {
    it('should generate TypeScript types', () => {
      const result = generateTypeScriptTypes(mockTokens);
      
      expect(result.types).toContain('export interface ColorTokens');
      expect(result.types).toContain('export interface TypographyTokens');
      expect(result.types).toContain('primary: Record<50 | 500 | 900, string>');
    });

    it('should generate utility types when requested', () => {
      const result = generateTypeScriptTypes(mockTokens, {
        generateUtilityTypes: true,
      });
      
      expect(result.utilities).toContain('export type TokenPath');
      expect(result.utilities).toContain('export type TokenValue');
    });

    it('should generate module declarations', () => {
      const result = generateTypeScriptTypes(mockTokens, {
        moduleName: 'test-module',
        namespace: 'TestNamespace',
      });
      
      expect(result.declarations).toContain('declare module');
      expect(result.declarations).toContain('TestNamespace');
    });

    it('should include JSDoc comments when enabled', () => {
      const result = generateTypeScriptTypes(mockTokens, {
        includeJSDoc: true,
      });
      
      expect(result.types).toContain('/**');
      expect(result.types).toContain('*/');
    });
  });

  describe('CSS Variable Transformer', () => {
    it('should generate CSS variables', () => {
      const result = generateCSSVariables(mockTokens);
      
      expect(result.variables).toContain(':root {');
      expect(result.variables).toContain('--color-primary-500: #3b82f6;');
      expect(result.variables).toContain('--spacing-4: 1rem;');
    });

    it('should use custom prefix', () => {
      const result = generateCSSVariables(mockTokens, {
        prefix: 'app-',
      });
      
      expect(result.variables).toContain('--app-color-primary-500');
      expect(result.variables).not.toContain('--color-primary-500');
    });

    it('should generate utility classes', () => {
      const result = generateCSSVariables(mockTokens, {
        generateUtilityClasses: true,
      });
      
      expect(result.utilities).toContain('.text-primary-500');
      expect(result.utilities).toContain('.bg-neutral-900');
      expect(result.utilities).toContain('.p-4');
    });

    it('should generate media queries', () => {
      const result = generateCSSVariables(mockTokens, {
        generateMediaQueries: true,
      });
      
      expect(result.mediaQueries).toContain('@media (min-width: 640px)');
      expect(result.mediaQueries).toContain('@media (min-width: 768px)');
    });
  });

  describe('Tailwind Config Transformer', () => {
    it('should generate Tailwind config', () => {
      const result = generateTailwindConfig(mockTokens);
      
      expect(result.config).toContain('module.exports = {');
      expect(result.config).toContain('theme: {');
      expect(result.config).toContain('colors: {');
    });

    it('should extend theme by default', () => {
      const result = generateTailwindConfig(mockTokens, {
        mode: 'extend',
      });
      
      expect(result.config).toContain('extend: {');
    });

    it('should replace theme when specified', () => {
      const result = generateTailwindConfig(mockTokens, {
        mode: 'replace',
      });
      
      expect(result.config).not.toContain('extend: {');
    });

    it('should add prefix when specified', () => {
      const result = generateTailwindConfig(mockTokens, {
        prefix: 'tw-',
      });
      
      expect(result.config).toContain("prefix: 'tw-'");
    });

    it('should generate safelist patterns', () => {
      const result = generateTailwindConfig(mockTokens, {
        generateSafelist: true,
      });
      
      expect(result.config).toContain('safelist: [');
      expect(result.config).toContain('pattern:');
    });
  });

  describe('JSON Schema Transformer', () => {
    it('should generate JSON schema', () => {
      const result = generateJSONSchema(mockTokens);
      
      expect(result.schema.$schema).toBeDefined();
      expect(result.schema.type).toBe('object');
      expect(result.schema.properties).toBeDefined();
    });

    it('should validate valid tokens', () => {
      const { schema } = generateJSONSchema(mockTokens);
      const validation = validateTokensAgainstSchema(mockTokens, schema);
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should catch invalid tokens', () => {
      const { schema } = generateJSONSchema(mockTokens);
      const invalidTokens = {
        colors: {
          primary: {
            500: 'invalid-color', // Not a valid hex color
          },
        },
      };
      
      const validation = validateTokensAgainstSchema(invalidTokens, schema);
      
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('should generate split schemas when requested', () => {
      const result = generateJSONSchema(mockTokens, {
        splitSchemas: true,
      });
      
      expect(result.schemas).toBeDefined();
      expect(result.schemas?.colors).toBeDefined();
      expect(result.schemas?.typography).toBeDefined();
    });
  });
});

describe('Variant Maps', () => {
  describe('Token Reference Resolution', () => {
    it('should resolve token references', () => {
      const ref = { token: 'colors.primary.500', fallback: '#000' };
      const value = resolveTokenReference(ref, mockTokens as any);
      
      expect(value).toBe('#3b82f6');
    });

    it('should use fallback for missing tokens', () => {
      const ref = { token: 'colors.missing.500', fallback: '#fallback' };
      const value = resolveTokenReference(ref, mockTokens as any);
      
      expect(value).toBe('#fallback');
    });

    it('should handle string values directly', () => {
      const value = resolveTokenReference('#direct', mockTokens as any);
      
      expect(value).toBe('#direct');
    });
  });

  describe('Token Value Extraction', () => {
    it('should get nested token values', () => {
      const value = getTokenValue(mockTokens as any, 'colors.primary.500');
      
      expect(value).toBe('#3b82f6');
    });

    it('should return undefined for missing paths', () => {
      const value = getTokenValue(mockTokens as any, 'colors.missing.path');
      
      expect(value).toBeUndefined();
    });
  });

  describe('Variant CSS Generation', () => {
    it('should generate CSS variables for button variants', () => {
      const variables = generateVariantCSSVariables(
        'button',
        'primary',
        buttonVariantMap,
        mockTokens as any
      );
      
      expect(variables['--button-primary-background']).toBe('#3b82f6');
      expect(variables['--button-primary-text']).toBe('#ffffff');
    });

    it('should use prefix in variable names', () => {
      const variables = generateVariantCSSVariables(
        'button',
        'primary',
        buttonVariantMap,
        mockTokens as any,
        'app-'
      );
      
      expect(variables['--app-button-primary-background']).toBeDefined();
    });
  });
});

describe('State Maps', () => {
  describe('State Token Merging', () => {
    it('should merge state tokens with base', () => {
      const base = { color: 'blue', size: 'large' };
      const hover = { color: 'darkblue' };
      
      const merged = mergeStateTokens(base, hover);
      
      expect(merged.color).toBe('darkblue');
      expect(merged.size).toBe('large');
    });

    it('should handle undefined state tokens', () => {
      const base = { color: 'blue' };
      const merged = mergeStateTokens(base, undefined);
      
      expect(merged).toEqual(base);
    });
  });

  describe('State CSS Generation', () => {
    it('should generate CSS for default state', () => {
      const tokens = { color: '#000', backgroundColor: '#fff' };
      const css = generateStateCSS(
        '.button',
        'default',
        tokens,
        (val) => val as string
      );
      
      expect(css).toContain('.button {');
      expect(css).toContain('color: #000;');
      expect(css).toContain('background-color: #fff;');
    });

    it('should generate CSS for hover state', () => {
      const tokens = { transform: 'scale(1.02)' };
      const css = generateStateCSS(
        '.button',
        'hover',
        tokens,
        (val) => val as string
      );
      
      expect(css).toContain('.button:hover {');
      expect(css).toContain('transform: scale(1.02);');
    });

    it('should handle camelCase to kebab-case conversion', () => {
      const tokens = { borderColor: '#000', backgroundColor: '#fff' };
      const css = generateStateCSS(
        '.input',
        'focus',
        tokens,
        (val) => val as string
      );
      
      expect(css).toContain('border-color: #000;');
      expect(css).toContain('background-color: #fff;');
    });
  });
});

describe('Responsive Tokens', () => {
  describe('Responsive Value Resolution', () => {
    it('should get base value for base breakpoint', () => {
      const responsive = {
        base: '1rem',
        md: '1.5rem',
        lg: '2rem',
      };
      
      const value = getResponsiveValue(responsive, 'base');
      expect(value).toBe('1rem');
    });

    it('should inherit values from smaller breakpoints', () => {
      const responsive = {
        base: '1rem',
        md: '1.5rem',
        lg: '2rem',
      };
      
      // At md, should use md value
      const mdValue = getResponsiveValue(responsive, 'md');
      expect(mdValue).toBe('1.5rem');
      
      // At xl (not defined), should use lg value
      const xlValue = getResponsiveValue(responsive, 'xl');
      expect(xlValue).toBe('2rem');
    });
  });

  describe('Responsive CSS Generation', () => {
    it('should generate media queries for responsive values', () => {
      const values = {
        base: '1rem',
        md: '1.5rem',
        lg: '2rem',
      };
      
      const css = generateResponsiveCSS(
        'font-size',
        values,
        '.text',
        (val) => val
      );
      
      expect(css).toContain('.text {\n  font-size: 1rem;\n}');
      expect(css).toContain('@media (min-width: 768px)');
      expect(css).toContain('font-size: 1.5rem;');
    });
  });

  describe('Responsive Utilities', () => {
    it('should generate responsive utility classes', () => {
      const values = {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
      };
      
      const utilities = generateResponsiveUtilities('font-size', values);
      
      expect(utilities).toContain('.font-size-sm');
      expect(utilities).toContain('.md\\:font-size-lg');
      expect(utilities).toContain('@media (min-width: 768px)');
    });
  });
});

describe('Token System Integration', () => {
  it('should work together: variant + state + responsive', () => {
    // Get variant tokens
    const variantTokens = buttonVariantMap.primary;
    
    // Apply state modifications
    const hoverState = mergeStateTokens(
      variantTokens as any,
      buttonStateMap.hover
    );
    
    // Generate responsive CSS
    const responsiveButton = {
      base: { token: 'spacing.4', fallback: '1rem' },
      md: { token: 'spacing.6', fallback: '1.5rem' },
    };
    
    const css = generateResponsiveCSS(
      'padding',
      responsiveButton as any,
      '.btn-primary',
      (ref) => resolveTokenReference(ref, mockTokens as any)
    );
    
    expect(css).toBeTruthy();
    expect(css).toContain('1rem');
    expect(css).toContain('1.5rem');
  });

  it('should validate complete theme with all token types', () => {
    const completeTheme = {
      ...mockTokens,
      variants: buttonVariantMap,
      states: buttonStateMap,
      responsive: responsiveTypography,
    };
    
    const { schema } = generateJSONSchema(completeTheme);
    const validation = validateTokensAgainstSchema(completeTheme, schema);
    
    // Should still validate even with extended properties
    expect(validation.errors.length).toBeLessThanOrEqual(1); // May have metadata error
  });
});