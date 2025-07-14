#!/usr/bin/env node
// validate-design-tokens.js - Design token validation for @xala-mock/ui-system
// Ensures Norwegian compliance by detecting hardcoded values

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Hardcoded patterns that should be avoided
const HARDCODED_PATTERNS = [
  // Colors (hex, rgb, rgba, hsl, hsla)
  /#[0-9a-fA-F]{3,8}/g,                    // #000, #000000, #00000000
  /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g, // rgb(255, 0, 0)
  /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g, // rgba(255, 0, 0, 0.5)
  /hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)/g, // hsl(120, 100%, 50%)
  /hsla\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*,\s*[\d.]+\s*\)/g, // hsla(120, 100%, 50%, 0.5)
  
  // Sizes and spacing (px, rem, em, %, vh, vw)
  /\d+px(?!\s*\/)/g,                        // 16px (not part of calc or other expressions)
  /\d+\.?\d*rem(?!\s*\/)/g,                 // 1.5rem
  /\d+\.?\d*em(?!\s*\/)/g,                  // 2em
  
  // Avoid hardcoded breakpoints
  /\d+vw/g,                                 // 100vw
  /\d+vh/g,                                 // 100vh
  
  // Box shadows with hardcoded values
  /box-shadow:\s*[^;]+px/g,                 // box-shadow: 0 2px 4px
  /shadow:\s*[^;]+px/g,                     // shadow: 0 2px 4px
  
  // Border radius with hardcoded values
  /border-radius:\s*\d+px/g,                // border-radius: 8px
  /border.*radius.*\d+px/g,                 // border-top-left-radius: 4px
];

// Allowed patterns (exceptions)
const ALLOWED_PATTERNS = [
  /var\(--[\w-]+\)/g,                       // CSS custom properties: var(--color-primary)
  /calc\(/g,                                // CSS calc() functions
  /0px/g,                                   // Zero values are always allowed
  /100%/g,                                  // 100% is commonly allowed
  /inherit|initial|unset|auto/g,            // CSS keywords
];

// Norwegian compliance color names that should be used instead
const NORWEGIAN_ALTERNATIVES = {
  '#000000': 'var(--color-black)',
  '#ffffff': 'var(--color-white)',
  '#000': 'var(--color-black)',
  '#fff': 'var(--color-white)',
  '16px': 'var(--spacing-4)',
  '24px': 'var(--spacing-6)',
  '32px': 'var(--spacing-8)',
  '8px': 'var(--spacing-2)',
  '4px': 'var(--spacing-1)',
  '2px': 'var(--spacing-0-5)'
};

class DesignTokenValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.totalFiles = 0;
    this.validatedFiles = 0;
  }

  // Check if a line contains allowed patterns
  isAllowedPattern(line) {
    return ALLOWED_PATTERNS.some(pattern => pattern.test(line));
  }

  // Validate a single file
  validateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, lineNumber) => {
        const trimmedLine = line.trim();
        
        // Skip comments and imports
        if (trimmedLine.startsWith('//') || 
            trimmedLine.startsWith('/*') || 
            trimmedLine.startsWith('import') ||
            trimmedLine.startsWith('export') ||
            trimmedLine.includes('node_modules')) {
          return;
        }

        // Check for hardcoded patterns
        HARDCODED_PATTERNS.forEach(pattern => {
          const matches = trimmedLine.match(pattern);
          if (matches && !this.isAllowedPattern(trimmedLine)) {
            matches.forEach(match => {
              const alternative = NORWEGIAN_ALTERNATIVES[match] || 'a design token';
              this.errors.push({
                file: filePath,
                line: lineNumber + 1,
                column: trimmedLine.indexOf(match) + 1,
                hardcodedValue: match,
                suggestion: alternative,
                lineContent: trimmedLine
              });
            });
          }
        });
      });

      this.validatedFiles++;
    } catch (error) {
      this.warnings.push({
        file: filePath,
        message: `Could not read file: ${error.message}`
      });
    }
  }

  // Validate all relevant files
  async validateProject() {
    console.log('🔍 Validating design tokens for Norwegian compliance...\n');

    // File patterns to check
    const patterns = [
      'src/**/*.{ts,tsx,js,jsx}',
      'src/**/*.css',
      'src/**/*.scss',
      'src/**/*.module.css'
    ];

    for (const pattern of patterns) {
      const files = glob.sync(pattern, { 
        cwd: process.cwd(),
        ignore: [
          '**/node_modules/**',
          '**/dist/**', 
          '**/build/**',
          '**/*.test.*',
          '**/*.spec.*',
          '**/tokens/**' // Design token files themselves are allowed to have hardcoded values
        ]
      });

      this.totalFiles += files.length;
      files.forEach(file => this.validateFile(file));
    }
  }

  // Generate validation report
  generateReport() {
    console.log(`📊 Validation Results:`);
    console.log(`   Files checked: ${this.totalFiles}`);
    console.log(`   Files validated: ${this.validatedFiles}`);
    console.log(`   Errors found: ${this.errors.length}`);
    console.log(`   Warnings: ${this.warnings.length}\n`);

    // Show warnings
    if (this.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      this.warnings.forEach(warning => {
        console.log(`   ${warning.file}: ${warning.message}`);
      });
      console.log('');
    }

    // Show errors with Norwegian compliance suggestions
    if (this.errors.length > 0) {
      console.log('❌ Norwegian Compliance Violations:');
      console.log('   Hardcoded values detected - use design tokens instead!\n');
      
      this.errors.forEach(error => {
        console.log(`   File: ${error.file}:${error.line}:${error.column}`);
        console.log(`   Hardcoded: ${error.hardcodedValue}`);
        console.log(`   Use instead: ${error.suggestion}`);
        console.log(`   Line: ${error.lineContent}`);
        console.log('');
      });

      console.log('🇳🇴 Norwegian Design System Requirements:');
      console.log('   • Use CSS custom properties: var(--color-primary-500)');
      console.log('   • Follow WCAG 2.2 AA compliance');
      console.log('   • Support Norwegian municipalities');
      console.log('   • Enable light/dark mode theming');
      console.log('   • Maintain accessibility standards\n');

      return false; // Validation failed
    }

    console.log('✅ All files comply with Norwegian design token standards!');
    console.log('🎨 Design system validation passed');
    console.log('🇳🇴 Norwegian compliance verified\n');
    
    return true; // Validation passed
  }
}

// Main validation function
async function main() {
  const validator = new DesignTokenValidator();
  
  try {
    await validator.validateProject();
    const success = validator.generateReport();
    
    if (!success) {
      console.log('💡 Fix these issues to ensure Norwegian compliance');
      process.exit(1);
    }
    
    console.log('🚀 Ready for Norwegian enterprise deployment!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

// Run validation if called directly
if (require.main === module) {
  main();
}

module.exports = { DesignTokenValidator }; 