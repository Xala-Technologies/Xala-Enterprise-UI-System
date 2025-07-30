/**
 * Generate Tailwind configs from theme templates
 */

const path = require('path');
const fs = require('fs');

async function generateTailwindConfigs() {
  try {
    // Import the required modules
    const { generateTailwindConfig } = await import('../dist/tokens/transformers/tailwind-config.js');
    
    console.log('🎨 Generating Tailwind Configs from Theme Templates...\n');
    
    // Load theme templates manually (since we know their structure)
    const themes = [
      {
        id: 'light',
        name: 'Light Theme',
        mode: 'LIGHT',
        category: 'base',
        version: '1.0.0',
        colors: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            900: '#1e3a8a'
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
          }
        },
        typography: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
            mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace']
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
            thin: 100,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800,
            black: 900
          },
          lineHeight: {
            none: 1,
            tight: 1.25,
            snug: 1.375,
            normal: 1.5,
            relaxed: 1.625,
            loose: 2
          }
        },
        spacing: {
          0: '0px',
          px: '1px',
          0.5: '0.125rem',
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
          24: '6rem',
          32: '8rem',
          40: '10rem',
          48: '12rem',
          56: '14rem',
          64: '16rem'
        },
        borderRadius: {
          none: '0px',
          sm: '0.125rem',
          DEFAULT: '0.25rem',
          md: '0.375rem',
          lg: '0.5rem',
          xl: '0.75rem',
          '2xl': '1rem',
          '3xl': '1.5rem',
          full: '9999px'
        },
        shadows: {
          sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          none: 'none'
        },
        responsive: {
          breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
          }
        }
      },
      {
        id: 'dark',
        name: 'Dark Theme',
        mode: 'DARK',
        category: 'base',
        version: '1.0.0',
        colors: {
          primary: {
            50: '#1e3a8a',
            100: '#1e40af',
            500: '#60a5fa',
            600: '#3b82f6',
            700: '#2563eb',
            900: '#dbeafe'
          },
          neutral: {
            50: '#0a0a0a',
            100: '#171717',
            200: '#262626',
            300: '#404040',
            400: '#525252',
            500: '#737373',
            600: '#a3a3a3',
            700: '#d4d4d4',
            800: '#e5e5e5',
            900: '#f5f5f5',
            950: '#fafafa'
          }
        },
        // Use same typography, spacing, etc. as light theme
        typography: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
            mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace']
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
            thin: 100,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800,
            black: 900
          },
          lineHeight: {
            none: 1,
            tight: 1.25,
            snug: 1.375,
            normal: 1.5,
            relaxed: 1.625,
            loose: 2
          }
        },
        spacing: {
          0: '0px',
          px: '1px',
          0.5: '0.125rem',
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
          24: '6rem',
          32: '8rem',
          40: '10rem',
          48: '12rem',
          56: '14rem',
          64: '16rem'
        },
        borderRadius: {
          none: '0px',
          sm: '0.125rem',
          DEFAULT: '0.25rem',
          md: '0.375rem',
          lg: '0.5rem',
          xl: '0.75rem',
          '2xl': '1rem',
          '3xl': '1.5rem',
          full: '9999px'
        },
        shadows: {
          sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          none: 'none'
        },
        responsive: {
          breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
          }
        }
      }
    ];
    
    // Generate Tailwind configs for each theme
    console.log('📝 Generating Tailwind configs...\n');
    
    const results = {};
    for (const theme of themes) {
      console.log(`Processing ${theme.name}...`);
      
      // Generate different configurations
      results[`${theme.id}-extend`] = generateTailwindConfig(theme, {
        mode: 'extend',
        includeComments: true,
      });
      
      results[`${theme.id}-replace`] = generateTailwindConfig(theme, {
        mode: 'replace',
        includeComments: true,
      });
      
      console.log(`✅ Generated configs for ${theme.name}`);
    }
    
    // Create output directory
    const outputDir = path.join(process.cwd(), 'dist', 'tailwind-configs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save generated configs
    Object.entries(results).forEach(([name, result]) => {
      const filename = `tailwind.config.${name}.js`;
      fs.writeFileSync(
        path.join(outputDir, filename),
        result.full
      );
      console.log(`💾 Saved: ${filename}`);
    });
    
    console.log('\n📁 All configs saved to:', outputDir);
    
    // Display sample output
    console.log('\n📋 Sample output (first 80 lines of light-extend config):');
    console.log('─'.repeat(80));
    const sampleLines = results['light-extend'].config.split('\n').slice(0, 80);
    console.log(sampleLines.join('\n'));
    console.log('─'.repeat(80));
    
    // Display statistics
    console.log('\n📊 Generation Statistics:');
    console.log(`- Themes processed: ${themes.length}`);
    console.log(`- Configs generated: ${Object.keys(results).length}`);
    console.log(`- Output directory: ${outputDir}`);
    
    console.log('\n✨ Tailwind config generation completed successfully!');
    
  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

// Run the generator
generateTailwindConfigs();