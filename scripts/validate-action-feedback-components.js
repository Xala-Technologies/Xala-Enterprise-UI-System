#!/usr/bin/env node

/**
 * Validation script for Story 5: Action & Feedback Components
 * Validates Norwegian-compliant interactive components including Button, Alert, Toast, and Modal
 * Tests accessibility, classification support, and interactive features
 */

const fs = require('fs');
const path = require('path');

class ActionFeedbackComponentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validations = [];
    this.baseDir = path.join(__dirname, '..');
  }

  // ANSI color codes for output formatting
  colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
  };

  log(message, color = 'white') {
    console.log(`${this.colors[color]}${message}${this.colors.reset}`);
  }

  error(message) {
    this.errors.push(message);
    this.log(`❌ ${message}`, 'red');
  }

  warning(message) {
    this.warnings.push(message);
    this.log(`⚠️  ${message}`, 'yellow');
  }

  success(message) {
    this.validations.push(message);
    this.log(`✅ ${message}`, 'green');
  }

  info(message) {
    this.log(`ℹ️  ${message}`, 'blue');
  }

  // Test if file exists
  fileExists(filePath) {
    const fullPath = path.join(this.baseDir, filePath);
    return fs.existsSync(fullPath);
  }

  // Read file content
  readFile(filePath) {
    const fullPath = path.join(this.baseDir, filePath);
    try {
      return fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
      return null;
    }
  }

  // Test component file structure
  validateComponentStructure() {
    this.log('\n📁 Testing Component File Structure...', 'cyan');

    const componentFiles = [
      'src/components/action-feedback/Button.tsx',
      'src/components/action-feedback/Alert.tsx',
      'src/components/action-feedback/Toast.tsx',
      'src/components/action-feedback/Modal.tsx',
      'src/components/action-feedback/index.ts'
    ];

    componentFiles.forEach(file => {
      if (this.fileExists(file)) {
        this.success(`Component file exists: ${file}`);
      } else {
        this.error(`Missing component file: ${file}`);
      }
    });

    // Test action feedback directory exists
    if (this.fileExists('src/components/action-feedback/')) {
      this.success('Action feedback components directory exists');
    } else {
      this.error('Action feedback components directory missing');
    }
  }

  // Test TypeScript types
  validateTypeDefinitions() {
    this.log('\n🔧 Testing TypeScript Type Definitions...', 'cyan');

    const typesFile = 'src/types/action-feedback.types.ts';
    if (!this.fileExists(typesFile)) {
      this.error('Action feedback types file missing');
      return;
    }

    const typesContent = this.readFile(typesFile);
    if (!typesContent) {
      this.error('Cannot read action feedback types file');
      return;
    }

    // Test for essential type definitions
    const requiredTypes = [
      'ButtonProps',
      'AlertProps',
      'ToastProps',
      'ModalProps',
      'DrawerProps',
      'ActionFeedbackComponentProps',
      'NorwegianFeedbackConfig',
      'NorwegianActionContext'
    ];

    requiredTypes.forEach(type => {
      if (typesContent.includes(`interface ${type}`) || typesContent.includes(`type ${type}`)) {
        this.success(`Type definition found: ${type}`);
      } else {
        this.error(`Missing type definition: ${type}`);
      }
    });

    // Test Norwegian-specific properties
    const norwegianFeatures = [
      'classification',
      'municipality',
      'confirmationRequired',
      'auditLog',
      'accessibility',
      'WCAG_2_2_AA',
      'WCAG_2_2_AAA'
    ];

    norwegianFeatures.forEach(feature => {
      if (typesContent.includes(feature)) {
        this.success(`Norwegian feature found in types: ${feature}`);
      } else {
        this.warning(`Norwegian feature may be missing: ${feature}`);
      }
    });
  }

  // Test component exports
  validateComponentExports() {
    this.log('\n📤 Testing Component Exports...', 'cyan');

    const indexFile = 'src/components/action-feedback/index.ts';
    if (!this.fileExists(indexFile)) {
      this.error('Action feedback index file missing');
      return;
    }

    const indexContent = this.readFile(indexFile);
    if (!indexContent) {
      this.error('Cannot read action feedback index file');
      return;
    }

    const requiredExports = [
      'Button',
      'Alert',
      'Toast',
      'Modal'
    ];

    requiredExports.forEach(component => {
      if (indexContent.includes(`export { ${component} }`)) {
        this.success(`Component exported: ${component}`);
      } else {
        this.error(`Component not exported: ${component}`);
      }
    });

    // Test type re-exports
    if (indexContent.includes('export type {')) {
      this.success('Component types are re-exported');
    } else {
      this.warning('Component types may not be re-exported');
    }
  }

  // Test Norwegian compliance features
  validateNorwegianCompliance() {
    this.log('\n🇳🇴 Testing Norwegian Compliance Features...', 'cyan');

    const componentFiles = [
      'src/components/action-feedback/Button.tsx',
      'src/components/action-feedback/Alert.tsx',
      'src/components/action-feedback/Toast.tsx',
      'src/components/action-feedback/Modal.tsx'
    ];

    componentFiles.forEach(file => {
      const content = this.readFile(file);
      if (!content) return;

      const componentName = path.basename(file, '.tsx');

      // Test NSM classification support
      const nsmLevels = ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'];
      let hasNSMSupport = false;
      nsmLevels.forEach(level => {
        if (content.includes(level)) {
          hasNSMSupport = true;
        }
      });

      if (hasNSMSupport) {
        this.success(`${componentName}: NSM classification support found`);
      } else {
        this.warning(`${componentName}: NSM classification support may be missing`);
      }

      // Test Norwegian text and localization
      const norwegianFeatures = [
        'Bekreft',
        'Avbryt',
        'Lukk',
        'Klassifisering',
        'labelKey',
        'messageKey',
        'titleKey'
      ];

      let norwegianTextCount = 0;
      norwegianFeatures.forEach(feature => {
        if (content.includes(feature)) {
          norwegianTextCount++;
        }
      });

      if (norwegianTextCount >= 3) {
        this.success(`${componentName}: Norwegian localization features found`);
      } else {
        this.warning(`${componentName}: Limited Norwegian localization features`);
      }

      // Test accessibility features
      const accessibilityFeatures = [
        'aria-label',
        'aria-labelledby',
        'aria-live',
        'role=',
        'aria-modal',
        'aria-hidden',
        'tabindex'
      ];

      let accessibilityCount = 0;
      accessibilityFeatures.forEach(feature => {
        if (content.includes(feature)) {
          accessibilityCount++;
        }
      });

      if (accessibilityCount >= 3) {
        this.success(`${componentName}: Accessibility features implemented`);
      } else {
        this.warning(`${componentName}: Limited accessibility features`);
      }
    });
  }

  // Test design token usage
  validateDesignTokenUsage() {
    this.log('\n🎨 Testing Design Token Usage...', 'cyan');

    const componentFiles = [
      'src/components/action-feedback/Button.tsx',
      'src/components/action-feedback/Alert.tsx',
      'src/components/action-feedback/Toast.tsx',
      'src/components/action-feedback/Modal.tsx'
    ];

    componentFiles.forEach(file => {
      const content = this.readFile(file);
      if (!content) return;

      const componentName = path.basename(file, '.tsx');

      // Test for hardcoded values (should not exist)
      const hardcodedValues = content.match(/(#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|\d+px(?!\))|'[0-9]+px'|"[0-9]+px")/g);
      if (hardcodedValues && hardcodedValues.length > 0) {
        this.error(`${componentName}: Found ${hardcodedValues.length} hardcoded values: ${hardcodedValues.slice(0, 3).join(', ')}`);
      } else {
        this.success(`${componentName}: No hardcoded values found`);
      }

      // Test for design token usage
      const tokenMatches = content.match(/var\(--[\w-]+\)/g);
      if (tokenMatches && tokenMatches.length >= 10) {
        this.success(`${componentName}: Good design token usage (${tokenMatches.length} tokens)`);
      } else if (tokenMatches && tokenMatches.length >= 5) {
        this.warning(`${componentName}: Moderate design token usage (${tokenMatches.length} tokens)`);
      } else {
        this.error(`${componentName}: Insufficient design token usage`);
      }

      // Test for specific token categories
      const tokenCategories = [
        'spacing',
        'color',
        'font-size',
        'border-radius',
        'shadow',
        'transition'
      ];

      tokenCategories.forEach(category => {
        if (content.includes(`--${category}-`) || content.includes(`--${category.replace('-', '_')}-`)) {
          this.success(`${componentName}: Uses ${category} tokens`);
        } else {
          this.warning(`${componentName}: May not use ${category} tokens`);
        }
      });
    });
  }

  // Test component-specific features
  validateComponentFeatures() {
    this.log('\n⚙️ Testing Component-Specific Features...', 'cyan');

    // Test Button component
    const buttonContent = this.readFile('src/components/action-feedback/Button.tsx');
    if (buttonContent) {
      // Test button variants
      const buttonVariants = ['primary', 'secondary', 'tertiary', 'danger', 'success', 'warning'];
      buttonVariants.forEach(variant => {
        if (buttonContent.includes(variant)) {
          this.success(`Button: ${variant} variant found`);
        } else {
          this.warning(`Button: ${variant} variant may be missing`);
        }
      });

      // Test button states
      if (buttonContent.includes('loading') && buttonContent.includes('disabled')) {
        this.success('Button: Loading and disabled states supported');
      } else {
        this.warning('Button: Loading or disabled states may be missing');
      }

      // Test confirmation support
      if (buttonContent.includes('confirmation') || buttonContent.includes('Bekreft')) {
        this.success('Button: Confirmation functionality found');
      } else {
        this.warning('Button: Confirmation functionality may be missing');
      }
    }

    // Test Alert component
    const alertContent = this.readFile('src/components/action-feedback/Alert.tsx');
    if (alertContent) {
      // Test alert variants
      const alertVariants = ['info', 'success', 'warning', 'error'];
      alertVariants.forEach(variant => {
        if (alertContent.includes(variant)) {
          this.success(`Alert: ${variant} variant found`);
        } else {
          this.warning(`Alert: ${variant} variant may be missing`);
        }
      });

      // Test alert severity levels
      if (alertContent.includes('severity') && alertContent.includes('critical')) {
        this.success('Alert: Severity levels supported');
      } else {
        this.warning('Alert: Severity levels may be missing');
      }

      // Test closable alerts
      if (alertContent.includes('closable') && alertContent.includes('onClose')) {
        this.success('Alert: Closable functionality found');
      } else {
        this.warning('Alert: Closable functionality may be missing');
      }
    }

    // Test Toast component
    const toastContent = this.readFile('src/components/action-feedback/Toast.tsx');
    if (toastContent) {
      // Test positioning
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      positions.forEach(position => {
        if (toastContent.includes(position)) {
          this.success(`Toast: ${position} positioning found`);
        } else {
          this.warning(`Toast: ${position} positioning may be missing`);
        }
      });

      // Test auto-dismiss
      if (toastContent.includes('duration') && toastContent.includes('setTimeout')) {
        this.success('Toast: Auto-dismiss functionality found');
      } else {
        this.warning('Toast: Auto-dismiss functionality may be missing');
      }

      // Test pause on hover
      if (toastContent.includes('onMouseEnter') && toastContent.includes('pause')) {
        this.success('Toast: Pause on hover functionality found');
      } else {
        this.warning('Toast: Pause on hover functionality may be missing');
      }
    }

    // Test Modal component
    const modalContent = this.readFile('src/components/action-feedback/Modal.tsx');
    if (modalContent) {
      // Test modal sizes
      const modalSizes = ['sm', 'md', 'lg', 'xl', 'full'];
      modalSizes.forEach(size => {
        if (modalContent.includes(size)) {
          this.success(`Modal: ${size} size found`);
        } else {
          this.warning(`Modal: ${size} size may be missing`);
        }
      });

      // Test focus trap
      if (modalContent.includes('focus') && modalContent.includes('trap')) {
        this.success('Modal: Focus trap functionality found');
      } else {
        this.warning('Modal: Focus trap functionality may be missing');
      }

      // Test escape key handling
      if (modalContent.includes('Escape') && modalContent.includes('keydown')) {
        this.success('Modal: Escape key handling found');
      } else {
        this.warning('Modal: Escape key handling may be missing');
      }

      // Test overlay click handling
      if (modalContent.includes('overlay') && modalContent.includes('onClick')) {
        this.success('Modal: Overlay click handling found');
      } else {
        this.warning('Modal: Overlay click handling may be missing');
      }
    }
  }

  // Test integration with main component exports
  validateIntegration() {
    this.log('\n🔗 Testing Integration with Main Component Exports...', 'cyan');

    const mainIndexFile = 'src/components/index.ts';
    if (!this.fileExists(mainIndexFile)) {
      this.error('Main components index file missing');
      return;
    }

    const mainIndexContent = this.readFile(mainIndexFile);
    if (!mainIndexContent) {
      this.error('Cannot read main components index file');
      return;
    }

    if (mainIndexContent.includes('./action-feedback')) {
      this.success('Action feedback components integrated in main exports');
    } else {
      this.error('Action feedback components not integrated in main exports');
    }

    // Test main types index
    const mainTypesFile = 'src/types/index.ts';
    if (this.fileExists(mainTypesFile)) {
      const mainTypesContent = this.readFile(mainTypesFile);
      if (mainTypesContent && mainTypesContent.includes('./action-feedback.types')) {
        this.success('Action feedback types integrated in main types exports');
      } else {
        this.error('Action feedback types not integrated in main types exports');
      }
    }
  }

  // Run all validations
  async validate() {
    this.log(`${this.colors.bold}${this.colors.magenta}🧪 Action & Feedback Components Validation${this.colors.reset}`);
    this.log(`${this.colors.blue}Story 5: Action & Feedback Components - Norwegian Compliance Validation${this.colors.reset}\n`);

    this.validateComponentStructure();
    this.validateTypeDefinitions();
    this.validateComponentExports();
    this.validateNorwegianCompliance();
    this.validateDesignTokenUsage();
    this.validateComponentFeatures();
    this.validateIntegration();

    // Summary
    this.log('\n📊 Validation Summary', 'cyan');
    this.log(`${this.colors.green}✅ Passed: ${this.validations.length}${this.colors.reset}`);
    this.log(`${this.colors.yellow}⚠️  Warnings: ${this.warnings.length}${this.colors.reset}`);
    this.log(`${this.colors.red}❌ Errors: ${this.errors.length}${this.colors.reset}`);

    const totalTests = this.validations.length + this.warnings.length + this.errors.length;
    const successRate = totalTests > 0 ? Math.round((this.validations.length / totalTests) * 100) : 0;

    this.log(`\n📈 Success Rate: ${successRate}% (${this.validations.length}/${totalTests})`, 
      successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red');

    if (this.errors.length === 0) {
      this.log('\n🎉 All critical validations passed!', 'green');
      this.log('Story 5: Action & Feedback Components is ready for production.', 'green');
    } else {
      this.log('\n🚨 Critical issues found that need to be addressed.', 'red');
    }

    return {
      success: this.errors.length === 0,
      validations: this.validations.length,
      warnings: this.warnings.length,
      errors: this.errors.length,
      successRate
    };
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  const validator = new ActionFeedbackComponentValidator();
  validator.validate().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = ActionFeedbackComponentValidator; 