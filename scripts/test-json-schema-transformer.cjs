/**
 * Test script for JSON Schema transformer
 * Demonstrates schema generation and token validation
 */

const path = require('path');
const fs = require('fs');

async function testJSONSchemaTransformer() {
  try {
    // Import the required modules
    const { generateJSONSchema, validateTokensAgainstSchema } = await import('../dist/tokens/transformers/json-schema.js');
    
    console.log('🧪 Testing JSON Schema Transformer...\n');
    
    // Define a sample theme
    const validTheme = {
      id: 'test-theme',
      name: 'Test Theme',
      mode: 'LIGHT',
      category: 'test',
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
          500: '#737373',
          900: '#171717'
        }
      },
      typography: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['Fira Code', 'monospace']
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem'
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
        px: '1px',
        0.5: '0.125rem',
        1: '0.25rem',
        2: '0.5rem',
        4: '1rem',
        8: '2rem'
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      },
      accessibility: {
        wcagLevel: 'AA',
        focusOutlineWidth: '2px',
        focusOutlineColor: '#3b82f6',
        minimumTouchTarget: '44px'
      },
      responsive: {
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px'
        }
      },
      branding: {
        logo: '/assets/logo.svg',
        favicon: '/assets/favicon.ico'
      }
    };
    
    // Test 1: Generate basic schema
    console.log('1️⃣ Generating basic JSON Schema...');
    const basicResult = generateJSONSchema(validTheme, {
      includeExamples: false,
      includeDescriptions: false
    });
    console.log('✅ Basic schema generated');
    
    // Test 2: Generate detailed schema with examples
    console.log('\n2️⃣ Generating detailed JSON Schema with examples...');
    const detailedResult = generateJSONSchema(validTheme, {
      includeExamples: true,
      includeDescriptions: true,
      draft: '2020-12'
    });
    console.log('✅ Detailed schema generated');
    
    // Test 3: Generate split schemas
    console.log('\n3️⃣ Generating split schemas for each category...');
    const splitResult = generateJSONSchema(validTheme, {
      splitSchemas: true,
      includeDescriptions: true
    });
    console.log('✅ Split schemas generated');
    console.log('   Categories:', Object.keys(splitResult.schemas || {}));
    
    // Test 4: Validate valid tokens
    console.log('\n4️⃣ Validating valid tokens against schema...');
    const validationResult = validateTokensAgainstSchema(validTheme, basicResult.schema);
    console.log(`✅ Validation result: ${validationResult.valid ? 'VALID' : 'INVALID'}`);
    if (!validationResult.valid) {
      console.log('   Errors:', validationResult.errors);
    }
    
    // Test 5: Validate invalid tokens
    console.log('\n5️⃣ Testing validation with invalid tokens...');
    const invalidTheme = {
      // Missing required metadata
      colors: {
        primary: {
          // Invalid color format
          500: 'blue'
        }
      },
      typography: {
        fontSize: {
          // Invalid size format
          base: '16'
        }
      }
    };
    
    const invalidValidation = validateTokensAgainstSchema(invalidTheme, basicResult.schema);
    console.log(`✅ Invalid token validation: ${invalidValidation.valid ? 'VALID' : 'INVALID'}`);
    console.log('   Expected errors:', invalidValidation.errors.slice(0, 3));
    
    // Create output directory
    const outputDir = path.join(process.cwd(), 'dist', 'json-schemas');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save generated schemas
    fs.writeFileSync(
      path.join(outputDir, 'token-schema.json'),
      detailedResult.full
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'token-schema-basic.json'),
      basicResult.full
    );
    
    if (splitResult.schemas) {
      fs.writeFileSync(
        path.join(outputDir, 'token-schemas-split.json'),
        splitResult.full
      );
    }
    
    console.log('\n📁 Schemas saved to:', outputDir);
    
    // Display sample schema
    console.log('\n📋 Sample schema structure:');
    console.log('─'.repeat(60));
    const schemaPreview = JSON.stringify(basicResult.schema, null, 2);
    console.log(schemaPreview.split('\n').slice(0, 40).join('\n'));
    console.log('...');
    console.log('─'.repeat(60));
    
    // Show usage examples
    console.log('\n📚 Usage Examples:\n');
    
    console.log('1. Validate tokens with ajv:');
    console.log('```javascript');
    console.log('import Ajv from "ajv";');
    console.log('import schema from "./token-schema.json";');
    console.log('import tokens from "./my-theme.json";');
    console.log('');
    console.log('const ajv = new Ajv();');
    console.log('const validate = ajv.compile(schema);');
    console.log('const valid = validate(tokens);');
    console.log('');
    console.log('if (!valid) {');
    console.log('  console.error(validate.errors);');
    console.log('}');
    console.log('```\n');
    
    console.log('2. Use in VS Code for IntelliSense:');
    console.log('```json');
    console.log('// In your theme.json file');
    console.log('{');
    console.log('  "$schema": "./token-schema.json",');
    console.log('  "id": "my-theme",');
    console.log('  "colors": {');
    console.log('    // VS Code will provide autocomplete!');
    console.log('  }');
    console.log('}');
    console.log('```\n');
    
    console.log('3. Validate in CI/CD:');
    console.log('```bash');
    console.log('# Install ajv-cli');
    console.log('npm install -g ajv-cli');
    console.log('');
    console.log('# Validate theme files');
    console.log('ajv validate -s token-schema.json -d "themes/*.json"');
    console.log('```\n');
    
    console.log('✨ JSON Schema transformer test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testJSONSchemaTransformer();