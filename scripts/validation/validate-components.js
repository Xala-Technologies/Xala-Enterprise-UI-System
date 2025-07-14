#!/usr/bin/env node

/**
 * Component Validation for @xala-mock/ui-system
 * Ensures semantic HTML usage and Norwegian compliance standards
 * 
 * Validates:
 * - No raw HTML tags in semantic component exports
 * - Proper semantic HTML usage (header, nav, main, section, etc.)
 * - Norwegian localization key usage
 * - WCAG 2.2 AA compliance markers
 * - NSM classification support
 * - Design token integration
 */

const fs = require('fs');
const path = require('path');

class ComponentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
    this.componentsDir = path.join(__dirname, '../../src/components');
    
    // Raw HTML tags that should not appear in semantic components
    this.forbiddenTags = [
      '<div',
      '<span',
      '<p>',
      '<h1>',
      '<h2>',
      '<h3>',
      '<h4>',
      '<h5>',
      '<h6>',
      '<ul>',
      '<ol>',
      '<li>',
      '<table>',
      '<tr>',
      '<td>',
      '<th>'
    ];

    // Required semantic tags for different component types
    this.requiredSemanticTags = {
      layout: ['<main', '<section', '<article', '<aside', '<header', '<footer', '<nav'],
      form: ['<form', '<fieldset', '<label', '<input', '<textarea', '<select', '<button'],
      navigation: ['<nav', '<ul', '<li', '<a'],
      content: ['<article', '<section', '<aside', '<figure', '<figcaption']
    };

    // Norwegian compliance requirements
    this.norwegianRequirements = {
      localization: ['labelKey', 'titleKey', 'messageKey', 'errorKey', 'placeholderKey'],
      classification: ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'],
      accessibility: ['aria-label', 'aria-describedby', 'role=', 'tabIndex'],
      wcag: ['WCAG_2_2_AA', 'WCAG_2_2_AAA', 'accessibility'],
      nsm: ['norwegian', 'classification', 'municipality']
    };

    // Design token patterns that should be used
    this.tokenPatterns = [
      /var\(--[\w-]+\)/g,
      /\$[\w-]+/g // Sass variables as fallback
    ];

    // Hardcoded value patterns that should be avoided
    this.hardcodedPatterns = {
      pixels: /:\s*['"]?\d+px/g,
      colors: /#[0-9a-fA-F]{3,6}/g,
      spacing: /margin:\s*['"]?\d+|padding:\s*['"]?\d+/g,
      zIndex: /z-index:\s*['"]?\d+/g
    };
  }

  async validateAll() {
    console.log('🔍 Validating UI Components for Semantic HTML and Norwegian Compliance...\n');

    try {
      await this.validateComponentStructure();
      await this.validateSemanticHTML();
      await this.validateNorwegianCompliance();
      await this.validateAccessibilityStandards();
      await this.validateDesignTokenUsage();
      await this.validateExportIntegrity();
      await this.validateComponentQuality();

      this.generateDetailedReport();
    } catch (error) {
      this.errors.push(`Critical validation error: ${error.message}`);
      this.generateDetailedReport();
      process.exit(1);
    }
  }

  async validateComponentStructure() {
    console.log('📁 Validating component structure...');

    const requiredDirs = ['layout', 'form', 'data-display', 'action-feedback', 'platform'];
    
    for (const dir of requiredDirs) {
      const dirPath = path.join(this.componentsDir, dir);
      if (!fs.existsSync(dirPath)) {
        this.errors.push(`Missing required component directory: ${dir}`);
      } else {
        this.info.push(`✓ Component directory found: ${dir}`);
      }
    }

    // Check for index files
    const allDirs = fs.readdirSync(this.componentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const dir of allDirs) {
      const indexPath = path.join(this.componentsDir, dir, 'index.ts');
      if (!fs.existsSync(indexPath)) {
        this.warnings.push(`Missing index.ts in component directory: ${dir}`);
      } else {
        this.info.push(`✓ Index file found: ${dir}/index.ts`);
      }
    }
  }

  async validateSemanticHTML() {
    console.log('🏗️ Validating semantic HTML usage...');

    const allTsxFiles = this.getAllTsxFiles(this.componentsDir);

    for (const file of allTsxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const componentName = path.basename(file, '.tsx');
      const relativePath = path.relative(this.componentsDir, file);

      // Check for forbidden raw HTML tags
      this.validateForbiddenTags(content, relativePath);

      // Check for proper semantic tag usage
      this.validateSemanticTagUsage(content, relativePath, componentName);

      // Check for proper HTML structure
      this.validateHTMLStructure(content, relativePath);
    }
  }

  validateForbiddenTags(content, filePath) {
    for (const tag of this.forbiddenTags) {
      if (content.includes(tag)) {
        // Allow certain exceptions for utility components
        if (this.isUtilityComponent(filePath) || this.hasSemanticJustification(content, tag)) {
          this.warnings.push(
            `${filePath}: Contains raw HTML tag '${tag}' - verify semantic necessity`
          );
        } else {
          this.errors.push(
            `${filePath}: Forbidden raw HTML tag '${tag}' found. Use semantic alternatives.`
          );
        }
      }
    }
  }

  validateSemanticTagUsage(content, filePath, componentName) {
    const componentType = this.getComponentType(filePath);
    const requiredTags = this.requiredSemanticTags[componentType];

    if (requiredTags) {
      let hasSemanticTag = false;
      for (const tag of requiredTags) {
        if (content.includes(tag)) {
          hasSemanticTag = true;
          this.info.push(`✓ ${filePath}: Uses semantic tag '${tag}'`);
          break;
        }
      }

      if (!hasSemanticTag) {
        this.warnings.push(
          `${filePath}: No semantic tags found. Expected one of: ${requiredTags.join(', ')}`
        );
      }
    }
  }

  validateHTMLStructure(content, filePath) {
    // Check for proper ARIA usage
    if (!content.includes('aria-') && !content.includes('role=')) {
      this.warnings.push(`${filePath}: Missing ARIA attributes for accessibility`);
    }

    // Check for proper form structure
    if (content.includes('<input') && !content.includes('<label')) {
      this.warnings.push(`${filePath}: Input found without associated label`);
    }

    // Check for proper heading hierarchy
    const headings = content.match(/<h[1-6]/g);
    if (headings && headings.length > 1) {
      this.info.push(`${filePath}: Multiple headings found - verify hierarchy`);
    }
  }

  async validateNorwegianCompliance() {
    console.log('🇳🇴 Validating Norwegian compliance features...');

    const allTsxFiles = this.getAllTsxFiles(this.componentsDir);

    for (const file of allTsxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(this.componentsDir, file);

      // Check for Norwegian localization support
      this.validateLocalizationKeys(content, relativePath);

      // Check for NSM classification support
      this.validateNSMClassification(content, relativePath);

      // Check for accessibility compliance
      this.validateWCAGCompliance(content, relativePath);

      // Check for Norwegian-specific features
      this.validateNorwegianFeatures(content, relativePath);
    }
  }

  validateLocalizationKeys(content, filePath) {
    let hasLocalizationKeys = false;
    
    for (const key of this.norwegianRequirements.localization) {
      if (content.includes(key)) {
        hasLocalizationKeys = true;
        this.info.push(`✓ ${filePath}: Uses localization key '${key}'`);
      }
    }

    // Check for hardcoded Norwegian text
    const norwegianText = content.match(/['"`][^'"`]*[æøåÆØÅ][^'"`]*['"`]/g);
    if (norwegianText && !hasLocalizationKeys) {
      this.warnings.push(
        `${filePath}: Contains Norwegian text but no localization keys: ${norwegianText.slice(0, 2).join(', ')}`
      );
    }

    if (!hasLocalizationKeys && this.requiresLocalization(filePath)) {
      this.warnings.push(`${filePath}: No localization key support found`);
    }
  }

  validateNSMClassification(content, filePath) {
    let hasClassificationSupport = false;

    for (const classification of this.norwegianRequirements.classification) {
      if (content.includes(classification)) {
        hasClassificationSupport = true;
        this.info.push(`✓ ${filePath}: Supports NSM classification '${classification}'`);
      }
    }

    if (this.requiresClassification(filePath) && !hasClassificationSupport) {
      this.warnings.push(`${filePath}: Missing NSM classification support`);
    }
  }

  validateWCAGCompliance(content, filePath) {
    let hasWCAGCompliance = false;

    for (const wcagFeature of this.norwegianRequirements.wcag) {
      if (content.includes(wcagFeature)) {
        hasWCAGCompliance = true;
        this.info.push(`✓ ${filePath}: WCAG compliance marker found`);
        break;
      }
    }

    // Check for accessibility attributes
    let hasAccessibilityFeatures = false;
    for (const accessibilityFeature of this.norwegianRequirements.accessibility) {
      if (content.includes(accessibilityFeature)) {
        hasAccessibilityFeatures = true;
        break;
      }
    }

    if (!hasAccessibilityFeatures) {
      this.warnings.push(`${filePath}: Missing accessibility attributes`);
    }
  }

  validateNorwegianFeatures(content, filePath) {
    let hasNorwegianFeatures = false;

    for (const feature of this.norwegianRequirements.nsm) {
      if (content.includes(feature)) {
        hasNorwegianFeatures = true;
        this.info.push(`✓ ${filePath}: Norwegian feature '${feature}' found`);
      }
    }

    if (this.shouldHaveNorwegianFeatures(filePath) && !hasNorwegianFeatures) {
      this.warnings.push(`${filePath}: Missing Norwegian-specific features`);
    }
  }

  async validateAccessibilityStandards() {
    console.log('♿ Validating accessibility standards...');

    const allTsxFiles = this.getAllTsxFiles(this.componentsDir);

    for (const file of allTsxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(this.componentsDir, file);

      // Check for keyboard navigation
      this.validateKeyboardNavigation(content, relativePath);

      // Check for screen reader support
      this.validateScreenReaderSupport(content, relativePath);

      // Check for color contrast considerations
      this.validateColorContrast(content, relativePath);

      // Check for focus management
      this.validateFocusManagement(content, relativePath);
    }
  }

  validateKeyboardNavigation(content, filePath) {
    const keyboardFeatures = ['onKeyDown', 'onKeyUp', 'onKeyPress', 'tabIndex', 'autoFocus'];
    let hasKeyboardSupport = false;

    for (const feature of keyboardFeatures) {
      if (content.includes(feature)) {
        hasKeyboardSupport = true;
        this.info.push(`✓ ${filePath}: Keyboard navigation feature '${feature}'`);
        break;
      }
    }

    if (this.requiresKeyboardNavigation(filePath) && !hasKeyboardSupport) {
      this.warnings.push(`${filePath}: Missing keyboard navigation support`);
    }
  }

  validateScreenReaderSupport(content, filePath) {
    const srFeatures = ['aria-label', 'aria-describedby', 'aria-live', 'role=', 'sr-only'];
    let hasScreenReaderSupport = false;

    for (const feature of srFeatures) {
      if (content.includes(feature)) {
        hasScreenReaderSupport = true;
        break;
      }
    }

    if (!hasScreenReaderSupport) {
      this.warnings.push(`${filePath}: Limited screen reader support`);
    }
  }

  validateColorContrast(content, filePath) {
    // Check for hardcoded colors that might affect contrast
    const colorMatches = content.match(this.hardcodedPatterns.colors);
    if (colorMatches) {
      this.warnings.push(
        `${filePath}: Hardcoded colors found - verify contrast ratios: ${colorMatches.slice(0, 2).join(', ')}`
      );
    }
  }

  validateFocusManagement(content, filePath) {
    if (content.includes('Modal') || content.includes('Dialog')) {
      if (!content.includes('focus') && !content.includes('autoFocus')) {
        this.warnings.push(`${filePath}: Modal/Dialog without focus management`);
      }
    }
  }

  async validateDesignTokenUsage() {
    console.log('🎨 Validating design token usage...');

    const allTsxFiles = this.getAllTsxFiles(this.componentsDir);

    for (const file of allTsxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(this.componentsDir, file);

      // Check for design token usage
      this.validateTokenUsage(content, relativePath);

      // Check for hardcoded values
      this.validateHardcodedValues(content, relativePath);
    }
  }

  validateTokenUsage(content, filePath) {
    let tokenCount = 0;
    
    for (const pattern of this.tokenPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        tokenCount += matches.length;
      }
    }

    if (tokenCount > 0) {
      this.info.push(`✓ ${filePath}: Uses ${tokenCount} design tokens`);
    } else {
      this.warnings.push(`${filePath}: No design tokens found`);
    }
  }

  validateHardcodedValues(content, filePath) {
    for (const [type, pattern] of Object.entries(this.hardcodedPatterns)) {
      const matches = content.match(pattern);
      if (matches) {
        this.warnings.push(
          `${filePath}: Hardcoded ${type} values found: ${matches.slice(0, 3).join(', ')}`
        );
      }
    }
  }

  async validateExportIntegrity() {
    console.log('📤 Validating export integrity...');

    // Check main component exports
    const mainIndex = path.join(this.componentsDir, 'index.ts');
    if (!fs.existsSync(mainIndex)) {
      this.errors.push('Missing main components/index.ts file');
      return;
    }

    const indexContent = fs.readFileSync(mainIndex, 'utf8');

    // Check for all major component category exports
    const expectedExports = ['layout', 'form', 'data-display', 'action-feedback', 'platform'];
    
    for (const exportName of expectedExports) {
      if (!indexContent.includes(`export * from './${exportName}`)) {
        this.errors.push(`Missing export for '${exportName}' in main index`);
      } else {
        this.info.push(`✓ Export found: ${exportName}`);
      }
    }
  }

  async validateComponentQuality() {
    console.log('⭐ Validating component quality metrics...');

    const allTsxFiles = this.getAllTsxFiles(this.componentsDir);

    for (const file of allTsxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(this.componentsDir, file);

      // Check component size
      const lineCount = content.split('\n').length;
      if (lineCount > 200) {
        this.warnings.push(`${relativePath}: Large component (${lineCount} lines) - consider refactoring`);
      }

      // Check for forwardRef usage
      if (content.includes('export const') && !content.includes('forwardRef')) {
        this.warnings.push(`${relativePath}: Component should use forwardRef for ref forwarding`);
      }

      // Check for TypeScript types
      if (!content.includes('interface') && !content.includes('type ')) {
        this.warnings.push(`${relativePath}: Missing TypeScript type definitions`);
      }

      // Check for proper component naming
      if (!content.includes('displayName')) {
        this.warnings.push(`${relativePath}: Missing displayName for React DevTools`);
      }
    }
  }

  // Helper methods
  isUtilityComponent(filePath) {
    const utilityPatterns = ['/util', '/helper', '/hook', '/provider'];
    return utilityPatterns.some(pattern => filePath.includes(pattern));
  }

  hasSemanticJustification(content, tag) {
    // Allow divs in styled-components or when used with proper roles
    return content.includes('role=') || content.includes('styled.') || content.includes('css`');
  }

  getComponentType(filePath) {
    if (filePath.includes('/layout/')) return 'layout';
    if (filePath.includes('/form/')) return 'form';
    if (filePath.includes('/navigation/')) return 'navigation';
    if (filePath.includes('/platform/')) return 'layout';
    return 'content';
  }

  requiresLocalization(filePath) {
    return !filePath.includes('/types/') && !filePath.includes('/util') && !filePath.includes('/hook');
  }

  requiresClassification(filePath) {
    return filePath.includes('/form/') || filePath.includes('/action-feedback/') || filePath.includes('/platform/');
  }

  shouldHaveNorwegianFeatures(filePath) {
    return !filePath.includes('/types/') && !filePath.includes('/util');
  }

  requiresKeyboardNavigation(filePath) {
    const interactiveComponents = ['/form/', '/action-feedback/', '/platform/', 'Button', 'Input', 'Modal'];
    return interactiveComponents.some(pattern => filePath.includes(pattern));
  }

  getAllTsxFiles(dir) {
    let files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllTsxFiles(fullPath));
      } else if (item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  generateDetailedReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 COMPONENT VALIDATION REPORT');
    console.log('='.repeat(80));

    // Summary
    console.log(`\n📈 VALIDATION SUMMARY:`);
    console.log(`   Components Scanned: ${this.getAllTsxFiles(this.componentsDir).length}`);
    console.log(`   Errors Found: ${this.errors.length}`);
    console.log(`   Warnings: ${this.warnings.length}`);
    console.log(`   Info Items: ${this.info.length}`);

    // Errors
    if (this.errors.length > 0) {
      console.log(`\n❌ ${this.errors.length} ERROR(S) FOUND:`);
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }

    // Warnings
    if (this.warnings.length > 0) {
      console.log(`\n⚠️  ${this.warnings.length} WARNING(S) FOUND:`);
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning}`);
      });
    }

    // Success indicators
    if (this.errors.length === 0) {
      console.log('\n✅ SEMANTIC HTML VALIDATION: PASSED');
      console.log('✅ COMPONENT STRUCTURE: VALID');
      console.log('✅ EXPORT INTEGRITY: MAINTAINED');
    }

    if (this.warnings.length === 0) {
      console.log('✅ NORWEGIAN COMPLIANCE: EXCELLENT');
      console.log('✅ ACCESSIBILITY STANDARDS: OPTIMAL');
      console.log('✅ DESIGN TOKEN INTEGRATION: COMPLETE');
    }

    console.log('\n' + '='.repeat(80));
    
    // Calculate quality score
    const totalIssues = this.errors.length + (this.warnings.length * 0.5);
    const maxPossibleIssues = 100; // Estimated based on validation checks
    const qualityScore = Math.max(0, ((maxPossibleIssues - totalIssues) / maxPossibleIssues) * 100);
    
    console.log(`📊 Component Quality Score: ${qualityScore.toFixed(1)}%`);
    
    if (qualityScore >= 95) {
      console.log('🏆 Status: EXCELLENT - Production ready');
    } else if (qualityScore >= 85) {
      console.log('✅ Status: GOOD - Minor improvements recommended');
    } else if (qualityScore >= 70) {
      console.log('⚠️  Status: ACCEPTABLE - Several improvements needed');
    } else {
      console.log('❌ Status: NEEDS WORK - Major improvements required');
    }

    console.log('='.repeat(80));

    if (this.errors.length > 0) {
      process.exit(1);
    }
  }
}

// Run validation
const validator = new ComponentValidator();
validator.validateAll().catch(console.error); 