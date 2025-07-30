/**
 * Example: Using all token transformers together
 * This demonstrates how to generate TypeScript types, CSS variables, and Tailwind config
 * from a single token system
 */

const path = require('path');
const fs = require('fs');

async function demonstrateTokenTransformations() {
  try {
    // Import all transformers
    const { generateTypeScriptTypes } = await import('../dist/tokens/transformers/typescript-types.js');
    const { generateCSSVariables } = await import('../dist/tokens/transformers/css-variables.js');
    const { generateTailwindConfig } = await import('../dist/tokens/transformers/tailwind-config.js');
    
    console.log('🎨 Token System Transformation Demo\n');
    console.log('This example shows how to transform design tokens into multiple formats:\n');
    
    // Define a sample theme template
    const sampleTheme = {
      id: 'norwegian-gov',
      name: 'Norwegian Government Theme',
      mode: 'LIGHT',
      category: 'government',
      version: '1.0.0',
      description: 'Theme compliant with Norwegian government design standards',
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#b3d4ff',
          200: '#80b8ff',
          300: '#4d9bff',
          400: '#1a7eff',
          500: '#0062ba', // Norway blue
          600: '#004d93',
          700: '#00396d',
          800: '#002546',
          900: '#001220'
        },
        secondary: {
          50: '#ffebe6',
          100: '#ffc2b3',
          200: '#ff9980',
          300: '#ff704d',
          400: '#ff471a',
          500: '#e63900', // Norwegian red
          600: '#b32d00',
          700: '#802000',
          800: '#4d1300',
          900: '#1a0600'
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        },
        success: {
          500: '#10b981',
          600: '#059669'
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706'
        },
        error: {
          500: '#ef4444',
          600: '#dc2626'
        }
      },
      typography: {
        fontFamily: {
          sans: ['Source Sans Pro', 'system-ui', '-apple-system', 'sans-serif'],
          serif: ['Georgia', 'serif'],
          mono: ['Source Code Pro', 'monospace']
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem'
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        },
        lineHeight: {
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75
        }
      },
      spacing: {
        0: '0px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem'
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      accessibility: {
        wcagLevel: 'AAA',
        focusOutlineWidth: '3px',
        focusOutlineColor: '#0062ba',
        minimumTouchTarget: '44px'
      },
      responsive: {
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px'
        }
      },
      branding: {
        logo: '/assets/norwegian-gov-logo.svg',
        favicon: '/assets/favicon.ico'
      }
    };
    
    console.log('📊 Theme Details:');
    console.log(`- Name: ${sampleTheme.name}`);
    console.log(`- ID: ${sampleTheme.id}`);
    console.log(`- Mode: ${sampleTheme.mode}`);
    console.log(`- Category: ${sampleTheme.category}`);
    console.log(`- Description: ${sampleTheme.description}\n`);
    
    // 1. Generate TypeScript Types
    console.log('1️⃣ Generating TypeScript Types...');
    const tsResult = generateTypeScriptTypes(sampleTheme, {
      includeJSDoc: true,
      generateLiterals: true,
      generateUtilityTypes: true,
      moduleName: 'norwegian-gov-theme',
      namespace: 'NorwegianGovTheme'
    });
    console.log('✅ TypeScript types generated\n');
    
    // 2. Generate CSS Variables
    console.log('2️⃣ Generating CSS Variables...');
    const cssResult = generateCSSVariables(sampleTheme, {
      prefix: 'ngov-',
      selector: ':root',
      includeComments: true,
      generateUtilityClasses: true,
      generateMediaQueries: true
    });
    console.log('✅ CSS variables generated\n');
    
    // 3. Generate Tailwind Config
    console.log('3️⃣ Generating Tailwind Configuration...');
    const tailwindResult = generateTailwindConfig(sampleTheme, {
      mode: 'extend',
      includeComments: true,
      prefix: 'ngov-',
      generateSafelist: true
    });
    console.log('✅ Tailwind config generated\n');
    
    // Create output directory
    const outputDir = path.join(process.cwd(), 'dist', 'token-transformation-examples');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save all outputs
    // TypeScript result structure might be different
    const tsContent = tsResult.full || 
      (tsResult.types + (tsResult.utilities || '') + (tsResult.declarations || ''));
    
    fs.writeFileSync(
      path.join(outputDir, 'norwegian-gov-theme.types.ts'),
      tsContent
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'norwegian-gov-theme.css'),
      cssResult.full
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'tailwind.config.norwegian-gov.js'),
      tailwindResult.full
    );
    
    console.log('📁 All files saved to:', outputDir);
    
    // Display samples of each output
    console.log('\n📋 Sample Outputs:\n');
    
    console.log('═══ TypeScript Types (first 40 lines) ═══');
    console.log(tsResult.types.split('\n').slice(0, 40).join('\n'));
    console.log('\n');
    
    console.log('═══ CSS Variables (first 40 lines) ═══');
    console.log(cssResult.variables.split('\n').slice(0, 40).join('\n'));
    console.log('\n');
    
    console.log('═══ Tailwind Config (first 40 lines) ═══');
    console.log(tailwindResult.config.split('\n').slice(0, 40).join('\n'));
    console.log('\n');
    
    // Show usage examples
    console.log('📚 Usage Examples:\n');
    
    console.log('TypeScript:');
    console.log('```typescript');
    console.log('import { NorwegianGovTheme } from "./norwegian-gov-theme.types";');
    console.log('const primaryColor: NorwegianGovTheme.Colors["primary"]["500"] = "#0062ba";');
    console.log('```\n');
    
    console.log('CSS:');
    console.log('```css');
    console.log('@import "./norwegian-gov-theme.css";');
    console.log('.gov-button {');
    console.log('  background-color: var(--ngov-color-primary-500);');
    console.log('  padding: var(--ngov-spacing-4);');
    console.log('}');
    console.log('```\n');
    
    console.log('Tailwind:');
    console.log('```javascript');
    console.log('// tailwind.config.js');
    console.log('module.exports = require("./tailwind.config.norwegian-gov");');
    console.log('```\n');
    
    console.log('✨ Token transformation demonstration completed successfully!');
    console.log('\nThese transformations enable:');
    console.log('- Type-safe token usage in TypeScript');
    console.log('- Dynamic theming with CSS variables');
    console.log('- Utility-first styling with Tailwind');
    console.log('- Consistent design system across all formats');
    
  } catch (error) {
    console.error('❌ Demonstration failed:', error);
    process.exit(1);
  }
}

// Run the demonstration
demonstrateTokenTransformations();