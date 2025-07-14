#!/usr/bin/env node

/**
 * PASEPAGE Validation for @xala-mock/ui-system
 * Ensures proper separation of concerns following the PASEPAGE architecture
 * 
 * PASEPAGE Principles:
 * P - Pages: Data orchestration and routing only
 * A - API: Data fetching and business logic
 * S - Services: Business domain logic
 * E - Entities: Data models and types
 * P - Presentation: UI components (this package)
 * A - Actions: User interactions and state
 * G - Guards: Authorization and validation
 * E - Events: System events and notifications
 * 
 * Validates:
 * - Pages contain only data orchestration
 * - No UI components in pages (should use semantic components)
 * - Proper import/export patterns
 * - Norwegian compliance in page structure
 */

const fs = require('fs');
const path = require('path');

class PASSEPAGEValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
    this.violations = [];
    
    // PASEPAGE architecture boundaries
    this.pagePatterns = {
      allowed: [
        // Data orchestration
        'useEffect',
        'useState',
        'useMemo',
        'useCallback',
        'useQuery',
        'useMutation',
        'useParams',
        'useNavigate',
        'useLocation',
        
        // API and data
        'fetch',
        'axios',
        'api.',
        'service.',
        'repository.',
        
        // Norwegian compliance
        'norwegian',
        'classification',
        'municipality',
        'i18n',
        't(',
        'useTranslation',
        
        // Layout and semantic components (allowed)
        'PageLayout',
        'Section',
        'Container',
        'Grid',
        'Stack',
        'Card'
      ],
      
      forbidden: [
        // Raw HTML (should use semantic components)
        '<div',
        '<span',
        '<p>',
        '<button>',
        '<input',
        '<form>',
        '<table>',
        
        // Business logic (should be in services)
        'class ',
        'function calculate',
        'function validate',
        'function process',
        
        // Direct styling (should use design tokens in components)
        'style=',
        'className=',
        'css`',
        'styled.',
        
        // Low-level UI logic (should be in components)
        'onClick',
        'onChange',
        'onSubmit',
        'onBlur',
        'onFocus'
      ]
    };

    // Norwegian PASEPAGE requirements
    this.norwegianPASSEPAGERequirements = {
      dataOrchestration: [
        'useNorwegianData',
        'useMunicipality',
        'useClassification',
        'useCompliance'
      ],
      
      routing: [
        'useNorwegianRouting',
        'useSecureNavigation',
        'useClassifiedRoutes'
      ],
      
      integration: [
        'useBRREG',
        'useAltinn',
        'useIDPorten',
        'useBankID'
      ]
    };

    // File patterns that should follow PASEPAGE
    this.pageFilePatterns = [
      /pages?\/.*\.(tsx?|jsx?)$/,
      /routes?\/.*\.(tsx?|jsx?)$/,
      /views?\/.*\.(tsx?|jsx?)$/,
      /screens?\/.*\.(tsx?|jsx?)$/
    ];

    // Component vs Page distinction
    this.componentIndicators = [
      'export const',
      'export default function',
      'forwardRef',
      'Props extends',
      'interface.*Props'
    ];
  }

  async validateAll() {
    console.log('🔍 Validating PASEPAGE Architecture Compliance...\n');

    try {
      await this.validatePASSEPAGEStructure();
      await this.validatePageCompliance();
      await this.validateNorwegianPASSEPAGE();
      await this.validateArchitecturalBoundaries();
      await this.validateImportExportPatterns();
      await this.validateDataOrchestration();

      this.generatePASSEPAGEReport();
    } catch (error) {
      this.errors.push(`Critical PASEPAGE validation error: ${error.message}`);
      this.generatePASSEPAGEReport();
      process.exit(1);
    }
  }

  async validatePASSEPAGEStructure() {
    console.log('🏗️ Validating PASEPAGE structure...');

    const projectRoot = path.join(__dirname, '../../../..');
    
    // Check for PASEPAGE directories
    const expectedDirs = {
      'pages': 'Page components and routing',
      'api': 'API integration and data fetching',
      'services': 'Business domain logic',
      'entities': 'Data models and types',
      'presentation': 'UI components (this package)',
      'actions': 'User interactions and state',
      'guards': 'Authorization and validation',
      'events': 'System events and notifications'
    };

    for (const [dir, description] of Object.entries(expectedDirs)) {
      const dirPath = path.join(projectRoot, dir);
      if (fs.existsSync(dirPath)) {
        this.info.push(`✓ PASEPAGE layer found: ${dir} (${description})`);
      } else {
        this.warnings.push(`PASEPAGE layer missing: ${dir} - ${description}`);
      }
    }

    // Validate this package is properly positioned as Presentation layer
    const packagePath = path.join(__dirname, '../../');
    if (packagePath.includes('ui-system') || packagePath.includes('presentation')) {
      this.info.push('✓ Package correctly positioned as Presentation layer');
    } else {
      this.warnings.push('Package positioning unclear in PASEPAGE architecture');
    }
  }

  async validatePageCompliance() {
    console.log('📄 Validating page-level compliance...');

    const allFiles = this.getAllFiles(path.join(__dirname, '../../../..'));
    const pageFiles = this.identifyPageFiles(allFiles);

    if (pageFiles.length === 0) {
      this.warnings.push('No page files found to validate PASEPAGE compliance');
      return;
    }

    for (const file of pageFiles) {
      await this.validateSinglePage(file);
    }
  }

  async validateSinglePage(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '../../../..'), filePath);

    // Check if this is actually a page (vs component)
    if (!this.isActualPage(content, relativePath)) {
      this.info.push(`${relativePath}: Appears to be a component, not a page`);
      return;
    }

    this.info.push(`📄 Validating page: ${relativePath}`);

    // Validate forbidden patterns
    this.validateForbiddenPatterns(content, relativePath);

    // Validate allowed patterns
    this.validateAllowedPatterns(content, relativePath);

    // Validate data orchestration focus
    this.validateDataOrchestrationFocus(content, relativePath);

    // Validate Norwegian page compliance
    this.validateNorwegianPageCompliance(content, relativePath);
  }

  validateForbiddenPatterns(content, filePath) {
    for (const pattern of this.pagePatterns.forbidden) {
      if (content.includes(pattern)) {
        this.violations.push({
          type: 'forbidden_pattern',
          file: filePath,
          pattern: pattern,
          severity: 'error',
          message: `Page contains forbidden pattern '${pattern}' - violates PASEPAGE architecture`
        });
      }
    }
  }

  validateAllowedPatterns(content, filePath) {
    let hasDataOrchestration = false;
    let hasSemanticComponents = false;

    for (const pattern of this.pagePatterns.allowed) {
      if (content.includes(pattern)) {
        if (['useEffect', 'useState', 'useQuery', 'useMutation'].includes(pattern)) {
          hasDataOrchestration = true;
        }
        if (['PageLayout', 'Section', 'Container', 'Grid'].includes(pattern)) {
          hasSemanticComponents = true;
        }
      }
    }

    if (!hasDataOrchestration) {
      this.warnings.push(`${filePath}: No data orchestration patterns found`);
    } else {
      this.info.push(`✓ ${filePath}: Contains proper data orchestration`);
    }

    if (!hasSemanticComponents) {
      this.warnings.push(`${filePath}: No semantic components found - should use PageLayout, Section, etc.`);
    } else {
      this.info.push(`✓ ${filePath}: Uses semantic components`);
    }
  }

  validateDataOrchestrationFocus(content, filePath) {
    // Count different types of code
    const dataLines = this.countPatterns(content, [
      'useEffect', 'useState', 'useMemo', 'useCallback',
      'useQuery', 'useMutation', 'fetch', 'api.', 'service.'
    ]);

    const uiLines = this.countPatterns(content, [
      'onClick', 'onChange', 'style=', 'className=', '<div', '<span'
    ]);

    const businessLogicLines = this.countPatterns(content, [
      'function calculate', 'function validate', 'function process',
      'class ', 'switch(', 'if.*&&.*||'
    ]);

    const totalLines = content.split('\n').length;

    // PASEPAGE compliance: Pages should be 70%+ data orchestration
    const dataOrchestrationRatio = dataLines / totalLines;
    const uiRatio = uiLines / totalLines;
    const businessLogicRatio = businessLogicLines / totalLines;

    if (dataOrchestrationRatio >= 0.7) {
      this.info.push(`✓ ${filePath}: Excellent data orchestration focus (${Math.round(dataOrchestrationRatio * 100)}%)`);
    } else if (dataOrchestrationRatio >= 0.5) {
      this.warnings.push(`${filePath}: Moderate data orchestration (${Math.round(dataOrchestrationRatio * 100)}%) - consider refactoring`);
    } else {
      this.violations.push({
        type: 'poor_data_orchestration',
        file: filePath,
        ratio: dataOrchestrationRatio,
        severity: 'warning',
        message: `Low data orchestration ratio (${Math.round(dataOrchestrationRatio * 100)}%) - violates PASEPAGE principles`
      });
    }

    if (uiRatio > 0.3) {
      this.violations.push({
        type: 'excessive_ui_logic',
        file: filePath,
        ratio: uiRatio,
        severity: 'error',
        message: `Excessive UI logic in page (${Math.round(uiRatio * 100)}%) - move to components`
      });
    }

    if (businessLogicRatio > 0.2) {
      this.violations.push({
        type: 'business_logic_in_page',
        file: filePath,
        ratio: businessLogicRatio,
        severity: 'error',
        message: `Business logic in page (${Math.round(businessLogicRatio * 100)}%) - move to services layer`
      });
    }
  }

  validateNorwegianPageCompliance(content, filePath) {
    // Check for Norwegian data orchestration patterns
    let hasNorwegianOrchestration = false;

    for (const orchestrationPattern of this.norwegianPASSEPAGERequirements.dataOrchestration) {
      if (content.includes(orchestrationPattern)) {
        hasNorwegianOrchestration = true;
        this.info.push(`✓ ${filePath}: Norwegian data orchestration '${orchestrationPattern}'`);
      }
    }

    // Check for classification handling at page level
    if (content.includes('classification') || content.includes('KONFIDENSIELT')) {
      if (!content.includes('useClassification') && !content.includes('useCompliance')) {
        this.warnings.push(`${filePath}: Handles classification without proper hooks`);
      } else {
        this.info.push(`✓ ${filePath}: Proper classification handling`);
      }
    }

    // Check for municipality integration
    if (content.includes('municipality') && !content.includes('useMunicipality')) {
      this.warnings.push(`${filePath}: Municipality data without proper orchestration`);
    }
  }

  async validateNorwegianPASSEPAGE() {
    console.log('🇳🇴 Validating Norwegian PASEPAGE compliance...');

    // This UI system package should not contain pages, but let's validate
    // the PASEPAGE principles are understood and documented

    const readmePath = path.join(__dirname, '../../README.md');
    if (fs.existsSync(readmePath)) {
      const readmeContent = fs.readFileSync(readmePath, 'utf8');
      
      if (readmeContent.includes('PASEPAGE') || readmeContent.includes('Presentation layer')) {
        this.info.push('✓ README documents PASEPAGE positioning');
      } else {
        this.warnings.push('README should document PASEPAGE architecture positioning');
      }

      if (readmeContent.includes('Norwegian') && readmeContent.includes('compliance')) {
        this.info.push('✓ README documents Norwegian compliance');
      } else {
        this.warnings.push('README should document Norwegian compliance features');
      }
    }
  }

  async validateArchitecturalBoundaries() {
    console.log('🏛️ Validating architectural boundaries...');

    // This package should only export Presentation layer components
    const mainIndexPath = path.join(__dirname, '../../src/index.ts');
    if (fs.existsSync(mainIndexPath)) {
      const indexContent = fs.readFileSync(mainIndexPath, 'utf8');

      // Should not export business logic
      const businessLogicExports = [
        'service', 'Service', 'repository', 'Repository',
        'validator', 'Validator', 'calculator', 'Calculator'
      ];

      for (const businessExport of businessLogicExports) {
        if (indexContent.includes(businessExport)) {
          this.violations.push({
            type: 'boundary_violation',
            file: 'src/index.ts',
            pattern: businessExport,
            severity: 'error',
            message: `Exports business logic '${businessExport}' - violates Presentation layer boundary`
          });
        }
      }

      // Should export UI components
      if (indexContent.includes('components') || indexContent.includes('Button') || indexContent.includes('Input')) {
        this.info.push('✓ Main index properly exports UI components');
      } else {
        this.warnings.push('Main index should export UI components');
      }
    }
  }

  async validateImportExportPatterns() {
    console.log('📦 Validating import/export patterns...');

    const allTsFiles = this.getAllTsFiles(path.join(__dirname, '../../src'));

    for (const file of allTsFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(path.join(__dirname, '../../'), file);

      // Check for proper import patterns
      this.validateImportPatterns(content, relativePath);

      // Check for proper export patterns
      this.validateExportPatterns(content, relativePath);
    }
  }

  validateImportPatterns(content, filePath) {
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.trim().startsWith('import')) {
        // Should not import business logic
        if (line.includes('service') || line.includes('repository') || line.includes('validator')) {
          if (!line.includes('mock-') && !line.includes('types')) {
            this.violations.push({
              type: 'invalid_import',
              file: filePath,
              line: line.trim(),
              severity: 'warning',
              message: `Imports business logic - consider abstraction: ${line.trim()}`
            });
          }
        }

        // Should import Norwegian types from proper locations
        if (line.includes('norwegian') || line.includes('classification')) {
          if (!line.includes('./types') && !line.includes('../types')) {
            this.info.push(`✓ ${filePath}: Norwegian imports from external types`);
          }
        }
      }
    }
  }

  validateExportPatterns(content, filePath) {
    // Components should use proper export patterns
    if (content.includes('export const') || content.includes('export default')) {
      if (content.includes('forwardRef')) {
        this.info.push(`✓ ${filePath}: Uses forwardRef pattern`);
      }

      if (content.includes('displayName')) {
        this.info.push(`✓ ${filePath}: Sets displayName`);
      }
    }
  }

  async validateDataOrchestration() {
    console.log('🔄 Validating data orchestration patterns...');

    // In a UI component library, data orchestration should be minimal
    // and focused on component state management

    const allTsxFiles = this.getAllTsxFiles(path.join(__dirname, '../../src/components'));

    for (const file of allTsxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(path.join(__dirname, '../../'), file);

      // Check for appropriate data patterns in components
      this.validateComponentDataPatterns(content, relativePath);
    }
  }

  validateComponentDataPatterns(content, filePath) {
    // Components should have minimal data logic
    const dataPatterns = ['useEffect', 'useState', 'useMemo', 'useCallback'];
    let dataPatternCount = 0;

    for (const pattern of dataPatterns) {
      const matches = (content.match(new RegExp(pattern, 'g')) || []).length;
      dataPatternCount += matches;
    }

    if (dataPatternCount > 5) {
      this.warnings.push(
        `${filePath}: High data pattern usage (${dataPatternCount}) - consider extracting to hooks`
      );
    } else if (dataPatternCount > 0) {
      this.info.push(`✓ ${filePath}: Appropriate data pattern usage (${dataPatternCount})`);
    }

    // Check for business logic in components
    const businessPatterns = ['calculate', 'validate', 'process', 'transform'];
    for (const pattern of businessPatterns) {
      if (content.includes(`function ${pattern}`) || content.includes(`const ${pattern}`)) {
        this.warnings.push(
          `${filePath}: Contains business logic '${pattern}' - consider moving to services`
        );
      }
    }
  }

  // Helper methods
  identifyPageFiles(allFiles) {
    return allFiles.filter(file => {
      return this.pageFilePatterns.some(pattern => pattern.test(file));
    });
  }

  isActualPage(content, filePath) {
    // Check if file contains component indicators (making it a component, not a page)
    const hasComponentIndicators = this.componentIndicators.some(indicator => 
      content.includes(indicator)
    );

    // Check for page indicators
    const hasPageIndicators = [
      'useParams', 'useNavigate', 'useLocation',
      'getServerSideProps', 'getStaticProps',
      'export default function.*Page'
    ].some(indicator => content.includes(indicator));

    // If it has component indicators but no page indicators, it's probably a component
    return hasPageIndicators || !hasComponentIndicators;
  }

  countPatterns(content, patterns) {
    let count = 0;
    for (const pattern of patterns) {
      const regex = new RegExp(pattern, 'g');
      const matches = content.match(regex);
      if (matches) {
        count += matches.length;
      }
    }
    return count;
  }

  getAllFiles(dir) {
    let files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      if (item.startsWith('.') || item === 'node_modules') {
        continue;
      }

      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllFiles(fullPath));
      } else if (item.match(/\.(tsx?|jsx?)$/)) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  getAllTsFiles(dir) {
    let files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllTsFiles(fullPath));
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
    
    return files;
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

  generatePASSEPAGEReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 PASEPAGE ARCHITECTURE VALIDATION REPORT');
    console.log('='.repeat(80));

    // Summary
    console.log(`\n📈 PASEPAGE VALIDATION SUMMARY:`);
    console.log(`   Architecture Violations: ${this.violations.length}`);
    console.log(`   Errors Found: ${this.errors.length}`);
    console.log(`   Warnings: ${this.warnings.length}`);
    console.log(`   Info Items: ${this.info.length}`);

    // Violations
    if (this.violations.length > 0) {
      console.log(`\n🚨 ${this.violations.length} PASEPAGE VIOLATION(S) FOUND:`);
      this.violations.forEach((violation, index) => {
        const icon = violation.severity === 'error' ? '❌' : '⚠️';
        console.log(`   ${index + 1}. ${icon} ${violation.file}: ${violation.message}`);
      });
    }

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
    if (this.violations.length === 0 && this.errors.length === 0) {
      console.log('\n✅ PASEPAGE ARCHITECTURE: COMPLIANT');
      console.log('✅ PRESENTATION LAYER: PROPERLY BOUNDED');
      console.log('✅ SEPARATION OF CONCERNS: MAINTAINED');
    }

    if (this.warnings.length === 0) {
      console.log('✅ ARCHITECTURAL PATTERNS: EXCELLENT');
      console.log('✅ NORWEGIAN PASEPAGE: OPTIMAL');
      console.log('✅ IMPORT/EXPORT BOUNDARIES: CLEAN');
    }

    console.log('\n' + '='.repeat(80));
    
    // Calculate PASEPAGE compliance score
    const severityWeights = { error: 1, warning: 0.5 };
    const totalViolations = this.violations.reduce((sum, v) => sum + severityWeights[v.severity], 0);
    const totalIssues = this.errors.length + (this.warnings.length * 0.3) + totalViolations;
    const maxPossibleIssues = 50; // Estimated based on validation checks
    const complianceScore = Math.max(0, ((maxPossibleIssues - totalIssues) / maxPossibleIssues) * 100);
    
    console.log(`📊 PASEPAGE Compliance Score: ${complianceScore.toFixed(1)}%`);
    
    if (complianceScore >= 95) {
      console.log('🏆 Status: EXCELLENT - Architecture exemplary');
    } else if (complianceScore >= 85) {
      console.log('✅ Status: GOOD - Minor architectural improvements recommended');
    } else if (complianceScore >= 70) {
      console.log('⚠️  Status: ACCEPTABLE - Several architectural improvements needed');
    } else {
      console.log('❌ Status: NEEDS WORK - Major architectural refactoring required');
    }

    console.log('='.repeat(80));

    if (this.errors.length > 0) {
      process.exit(1);
    }
  }
}

// Run validation
const validator = new PASSEPAGEValidator();
validator.validateAll().catch(console.error); 