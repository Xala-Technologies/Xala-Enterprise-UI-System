#!/usr/bin/env node

/**
 * Platform Components Validation for @xala-mock/ui-system
 * Validates Norwegian-compliant platform-specific components
 * 
 * Ensures:
 * - Complete design token integration
 * - Norwegian accessibility standards (WCAG 2.2 AA)
 * - NSM classification support
 * - Platform-specific optimizations
 * - No hardcoded values
 * - Proper semantic HTML usage
 */

const fs = require('fs');
const path = require('path');

class PlatformComponentsValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.componentsDir = path.join(__dirname, '../src/components/platform');
    this.typeDefinitions = path.join(__dirname, '../src/types/platform.types.ts');
    
    // Norwegian platform requirements
    this.norwegianRequirements = [
      'WCAG_2_2_AA',
      'WCAG_2_2_AAA',
      'NSM classification',
      'municipality support',
      'accessibility compliance',
      'touch optimization',
      'keyboard navigation',
      'safe area handling',
      'government branding'
    ];

    // Required design tokens for platform components
    this.requiredTokens = [
      '--touch-target-min-height',
      '--mobile-header-height-standard',
      '--mobile-navigation-height-standard',
      '--sidebar-collapsed-width',
      '--z-index-header',
      '--z-index-navigation',
      '--z-index-sidebar',
      '--color-primary-600',
      '--color-red-500',
      '--color-orange-500',
      '--color-green-500',
      '--spacing-4',
      '--border-radius-base',
      '--transition-duration-fast',
      '--font-family-sans',
      '--font-weight-semibold'
    ];

    // Platform-specific validation rules
    this.platformRules = {
      mobile: {
        minTouchTarget: 44, // Norwegian accessibility standard
        maxComponents: 5, // Bottom navigation limit
        requiredFeatures: ['safe-area', 'touch-optimized', 'swipe-gestures']
      },
      desktop: {
        minSidebarWidth: 200,
        maxSidebarWidth: 600,
        requiredFeatures: ['keyboard-shortcuts', 'resizable', 'hover-effects']
      }
    };
  }

  async validateAll() {
    console.log('🔍 Validating Platform Components for Norwegian Compliance...\n');

    try {
      await this.validateDirectoryStructure();
      await this.validateTypeDefinitions();
      await this.validateMobileComponents();
      await this.validateDesktopComponents();
      await this.validateDesignTokenUsage();
      await this.validateNorwegianCompliance();
      await this.validateAccessibilityFeatures();
      await this.validateExportIntegrity();

      this.generateReport();
    } catch (error) {
      this.errors.push(`Critical validation error: ${error.message}`);
      this.generateReport();
      process.exit(1);
    }
  }

  async validateDirectoryStructure() {
    console.log('📁 Validating directory structure...');

    const requiredDirs = [
      'mobile',
      'desktop'
    ];

    for (const dir of requiredDirs) {
      const dirPath = path.join(this.componentsDir, dir);
      if (!fs.existsSync(dirPath)) {
        this.errors.push(`Missing platform directory: ${dir}`);
      }
    }

    // Check for mobile components
    const mobileDir = path.join(this.componentsDir, 'mobile');
    if (fs.existsSync(mobileDir)) {
      const mobileComponents = ['MobileHeader.tsx', 'BottomNavigation.tsx'];
      for (const component of mobileComponents) {
        const componentPath = path.join(mobileDir, component);
        if (!fs.existsSync(componentPath)) {
          this.errors.push(`Missing mobile component: ${component}`);
        }
      }
    }

    // Check for desktop components
    const desktopDir = path.join(this.componentsDir, 'desktop');
    if (fs.existsSync(desktopDir)) {
      const desktopComponents = ['DesktopSidebar.tsx'];
      for (const component of desktopComponents) {
        const componentPath = path.join(desktopDir, component);
        if (!fs.existsSync(componentPath)) {
          this.errors.push(`Missing desktop component: ${component}`);
        }
      }
    }
  }

  async validateTypeDefinitions() {
    console.log('📝 Validating TypeScript type definitions...');

    if (!fs.existsSync(this.typeDefinitions)) {
      this.errors.push('Missing platform.types.ts file');
      return;
    }

    const typeContent = fs.readFileSync(this.typeDefinitions, 'utf8');

    // Check for required type interfaces
    const requiredTypes = [
      'PlatformComponentProps',
      'MobileHeaderProps',
      'BottomNavigationProps',
      'DesktopSidebarProps',
      'TouchFriendlyProps',
      'HoverFriendlyProps',
      'NorwegianPlatformConfig'
    ];

    for (const type of requiredTypes) {
      if (!typeContent.includes(`interface ${type}`) && !typeContent.includes(`type ${type}`)) {
        this.errors.push(`Missing type definition: ${type}`);
      }
    }

    // Check for Norwegian compliance properties
    const norwegianProps = [
      'classification',
      'municipality',
      'accessibility',
      'touchOptimized',
      'governmentWorkflow'
    ];

    for (const prop of norwegianProps) {
      if (!typeContent.includes(prop)) {
        this.warnings.push(`Norwegian property '${prop}' not found in type definitions`);
      }
    }
  }

  async validateMobileComponents() {
    console.log('📱 Validating mobile components...');

    const mobileDir = path.join(this.componentsDir, 'mobile');
    if (!fs.existsSync(mobileDir)) {
      return;
    }

    const components = fs.readdirSync(mobileDir)
      .filter(file => file.endsWith('.tsx'));

    for (const component of components) {
      const filePath = path.join(mobileDir, component);
      const content = fs.readFileSync(filePath, 'utf8');

      // Validate mobile-specific features
      this.validateTouchOptimization(content, component);
      this.validateSafeAreaHandling(content, component);
      this.validateMobileAccessibility(content, component);
      this.validateHardcodedValues(content, component);
    }
  }

  async validateDesktopComponents() {
    console.log('🖥️ Validating desktop components...');

    const desktopDir = path.join(this.componentsDir, 'desktop');
    if (!fs.existsSync(desktopDir)) {
      return;
    }

    const components = fs.readdirSync(desktopDir)
      .filter(file => file.endsWith('.tsx'));

    for (const component of components) {
      const filePath = path.join(desktopDir, component);
      const content = fs.readFileSync(filePath, 'utf8');

      // Validate desktop-specific features
      this.validateKeyboardShortcuts(content, component);
      this.validateHoverInteractions(content, component);
      this.validateResizability(content, component);
      this.validateHardcodedValues(content, component);
    }
  }

  validateTouchOptimization(content, component) {
    // Check for minimum touch target size (44px Norwegian standard)
    if (!content.includes('--touch-target-min-height')) {
      this.errors.push(`${component}: Missing touch target size optimization`);
    }

    // Check for haptic feedback support
    if (content.includes('hapticFeedback') && !content.includes('navigator.vibrate')) {
      this.warnings.push(`${component}: Haptic feedback declared but not implemented`);
    }
  }

  validateSafeAreaHandling(content, component) {
    // Check for safe area inset handling
    if (content.includes('safeArea') && !content.includes('env(safe-area-inset')) {
      this.warnings.push(`${component}: Safe area mentioned but CSS env() not used`);
    }
  }

  validateMobileAccessibility(content, component) {
    // Check for ARIA labels
    if (!content.includes('aria-label')) {
      this.warnings.push(`${component}: Missing ARIA labels for accessibility`);
    }

    // Check for screen reader support
    if (!content.includes('role=')) {
      this.warnings.push(`${component}: Missing semantic roles`);
    }
  }

  validateKeyboardShortcuts(content, component) {
    if (content.includes('keyboardShortcuts') && !content.includes('useEffect')) {
      this.warnings.push(`${component}: Keyboard shortcuts declared but no event listeners found`);
    }
  }

  validateHoverInteractions(content, component) {
    if (!content.includes('onMouseEnter') && !content.includes('onMouseLeave')) {
      this.warnings.push(`${component}: Desktop component missing hover interactions`);
    }
  }

  validateResizability(content, component) {
    if (content.includes('isResizable') && !content.includes('handleMouseDown')) {
      this.warnings.push(`${component}: Resizable feature declared but resize handlers not found`);
    }
  }

  async validateDesignTokenUsage() {
    console.log('🎨 Validating design token usage...');

    const platformDir = this.componentsDir;
    const allFiles = this.getAllTsxFiles(platformDir);

    for (const file of allFiles) {
      const content = fs.readFileSync(file, 'utf8');
      this.validateHardcodedValues(content, path.basename(file));
      this.validateTokenUsage(content, path.basename(file));
    }
  }

  validateTokenUsage(content, component) {
    let tokenCount = 0;
    
    for (const token of this.requiredTokens) {
      if (content.includes(token)) {
        tokenCount++;
      }
    }

    const tokenUsagePercent = (tokenCount / this.requiredTokens.length) * 100;
    
    if (tokenUsagePercent < 80) {
      this.warnings.push(
        `${component}: Low design token usage (${tokenUsagePercent.toFixed(1)}%). ` +
        `Expected 80%+ for platform components.`
      );
    }
  }

  validateHardcodedValues(content, component) {
    // Check for hardcoded pixel values
    const hardcodedPixels = content.match(/:\s*['"]?\d+px/g);
    if (hardcodedPixels && hardcodedPixels.length > 0) {
      this.errors.push(
        `${component}: Found hardcoded pixel values: ${hardcodedPixels.join(', ')}`
      );
    }

    // Check for hardcoded colors
    const hardcodedColors = content.match(/#[0-9a-fA-F]{3,6}/g);
    if (hardcodedColors && hardcodedColors.length > 0) {
      this.errors.push(
        `${component}: Found hardcoded color values: ${hardcodedColors.join(', ')}`
      );
    }

    // Check for hardcoded spacing
    const hardcodedSpacing = content.match(/margin:\s*['"]?\d+/g);
    if (hardcodedSpacing && hardcodedSpacing.length > 0) {
      this.warnings.push(
        `${component}: Potential hardcoded spacing: ${hardcodedSpacing.join(', ')}`
      );
    }
  }

  async validateNorwegianCompliance() {
    console.log('🇳🇴 Validating Norwegian compliance features...');

    const allFiles = this.getAllTsxFiles(this.componentsDir);

    for (const file of allFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const component = path.basename(file);

      // Check for NSM classification support
      if (!content.includes('ÅPEN') || !content.includes('KONFIDENSIELT')) {
        this.warnings.push(`${component}: Missing NSM classification support`);
      }

      // Check for municipality integration
      if (!content.includes('municipality')) {
        this.warnings.push(`${component}: Missing municipality integration`);
      }

      // Check for Norwegian localization keys
      if (!content.includes('labelKey') && !content.includes('titleKey')) {
        this.warnings.push(`${component}: Missing localization key support`);
      }
    }
  }

  async validateAccessibilityFeatures() {
    console.log('♿ Validating accessibility features...');

    const allFiles = this.getAllTsxFiles(this.componentsDir);

    for (const file of allFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const component = path.basename(file);

      // Check for WCAG compliance markers
      if (!content.includes('WCAG') && !content.includes('accessibility')) {
        this.warnings.push(`${component}: No WCAG compliance indicators found`);
      }

      // Check for keyboard navigation
      if (!content.includes('keydown') && !content.includes('onKeyDown')) {
        this.warnings.push(`${component}: Missing keyboard navigation support`);
      }

      // Check for screen reader support
      if (!content.includes('aria-') && !content.includes('role=')) {
        this.errors.push(`${component}: Missing ARIA attributes for screen readers`);
      }
    }
  }

  async validateExportIntegrity() {
    console.log('📤 Validating export integrity...');

    // Check platform index file
    const platformIndex = path.join(this.componentsDir, 'index.ts');
    if (!fs.existsSync(platformIndex)) {
      this.errors.push('Missing platform/index.ts file');
      return;
    }

    const indexContent = fs.readFileSync(platformIndex, 'utf8');

    // Check mobile and desktop exports
    if (!indexContent.includes("export * from './mobile'")) {
      this.errors.push('Platform index missing mobile exports');
    }

    if (!indexContent.includes("export * from './desktop'")) {
      this.errors.push('Platform index missing desktop exports');
    }

    // Check type exports
    if (!indexContent.includes('PlatformComponentProps')) {
      this.warnings.push('Platform index missing type exports');
    }
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

  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 PLATFORM COMPONENTS VALIDATION REPORT');
    console.log('='.repeat(80));

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All platform components validation checks passed!');
      console.log('\n🎉 Norwegian compliance: EXCELLENT');
      console.log('🎨 Design token integration: COMPLETE');
      console.log('♿ Accessibility standards: COMPLIANT');
      console.log('📱 Mobile optimization: OPTIMAL');
      console.log('🖥️ Desktop optimization: OPTIMAL');
    } else {
      if (this.errors.length > 0) {
        console.log(`❌ ${this.errors.length} ERROR(S) FOUND:`);
        this.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      }

      if (this.warnings.length > 0) {
        console.log(`\n⚠️  ${this.warnings.length} WARNING(S) FOUND:`);
        this.warnings.forEach((warning, index) => {
          console.log(`   ${index + 1}. ${warning}`);
        });
      }
    }

    console.log('\n' + '='.repeat(80));
    
    // Calculate compliance score
    const totalIssues = this.errors.length + this.warnings.length;
    const maxPossibleIssues = 50; // Estimated based on validation checks
    const complianceScore = Math.max(0, ((maxPossibleIssues - totalIssues) / maxPossibleIssues) * 100);
    
    console.log(`📊 Platform Components Compliance Score: ${complianceScore.toFixed(1)}%`);
    
    if (complianceScore >= 95) {
      console.log('🏆 Status: EXCELLENT - Ready for production');
    } else if (complianceScore >= 85) {
      console.log('✅ Status: GOOD - Minor improvements recommended');
    } else if (complianceScore >= 70) {
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
const validator = new PlatformComponentsValidator();
validator.validateAll().catch(console.error); 