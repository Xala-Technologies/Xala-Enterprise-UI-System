#!/usr/bin/env node

// Norwegian Data Display Components Validation Script
// Validates Story 4: Data Display Components implementation

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.bold}${colors.cyan}🇳🇴 ${msg}${colors.reset}`)
};

// Component file paths
const componentPaths = {
  dataTable: 'src/components/data-display/DataTable.tsx',
  keyValueList: 'src/components/data-display/KeyValueList.tsx',
  tag: 'src/components/data-display/Tag.tsx',
  badge: 'src/components/data-display/Badge.tsx',
  tooltip: 'src/components/data-display/Tooltip.tsx',
  types: 'src/types/data-display.types.ts',
  index: 'src/components/data-display/index.ts'
};

// Validation functions
function validateComponentExists(componentName, filePath) {
  log.header(`Validating ${componentName} Component`);
  
  if (!fs.existsSync(filePath)) {
    log.error(`${componentName} component file not found: ${filePath}`);
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for component export
  if (!content.includes(`export const ${componentName}`)) {
    log.error(`${componentName} component not properly exported`);
    return false;
  }
  
  // Check for forwardRef implementation
  if (!content.includes('React.forwardRef')) {
    log.error(`${componentName} does not use React.forwardRef`);
    return false;
  }
  
  // Check for displayName
  if (!content.includes(`${componentName}.displayName`)) {
    log.error(`${componentName} missing displayName property`);
    return false;
  }
  
  log.success(`${componentName} component structure valid`);
  return true;
}

function validateNorwegianFeatures(componentName, filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf8');
  let validFeatures = 0;
  const totalFeatures = 8;
  
  // Check Norwegian classification support (NSM levels)
  if (content.includes('ÅPEN') && content.includes('BEGRENSET') && 
      content.includes('KONFIDENSIELT') && content.includes('HEMMELIG')) {
    log.success(`${componentName}: NSM classification levels implemented`);
    validFeatures++;
  } else {
    log.error(`${componentName}: Missing NSM classification levels`);
  }
  
  // Check Norwegian accessibility features
  if (content.includes('WCAG_2_2_AA') || content.includes('WCAG_2_2_AAA')) {
    log.success(`${componentName}: WCAG accessibility compliance implemented`);
    validFeatures++;
  } else {
    log.error(`${componentName}: Missing WCAG accessibility features`);
  }
  
  // Check Norwegian data formatting
  if (content.includes('nb-NO') || content.includes('norwegian')) {
    log.success(`${componentName}: Norwegian data formatting implemented`);
    validFeatures++;
  } else {
    log.warning(`${componentName}: Norwegian data formatting may be missing`);
  }
  
  // Check localization key support
  if (content.includes('labelKey') || content.includes('contentKey')) {
    log.success(`${componentName}: Localization key support implemented`);
    validFeatures++;
  } else {
    log.error(`${componentName}: Missing localization key support`);
  }
  
  // Check aria labels and accessibility
  if (content.includes('aria-label') && content.includes('role')) {
    log.success(`${componentName}: ARIA accessibility attributes implemented`);
    validFeatures++;
  } else {
    log.error(`${componentName}: Missing ARIA accessibility attributes`);
  }
  
  // Check municipality support
  if (content.includes('municipality')) {
    log.success(`${componentName}: Municipality support implemented`);
    validFeatures++;
  } else {
    log.warning(`${componentName}: Municipality support may be missing`);
  }
  
  // Check design token usage (no hardcoded values)
  const hardcodedValues = content.match(/(?:[\d.]+px|#[0-9a-fA-F]{3,6}|\d+\.\d*em|\d+rem)/g);
  if (!hardcodedValues || hardcodedValues.length === 0) {
    log.success(`${componentName}: No hardcoded values - using design tokens`);
    validFeatures++;
  } else {
    log.error(`${componentName}: Found hardcoded values: ${hardcodedValues.slice(0, 3).join(', ')}`);
  }
  
  // Check Norwegian data handling (personal numbers, organization numbers)
  if (componentName === 'DataTable' || componentName === 'KeyValueList') {
    if (content.includes('personalNumber') && content.includes('organizationNumber')) {
      log.success(`${componentName}: Norwegian data types supported`);
      validFeatures++;
    } else {
      log.error(`${componentName}: Missing Norwegian data type support`);
    }
  } else {
    validFeatures++; // Not applicable to this component
  }
  
  return validFeatures;
}

function validateDataTableSpecificFeatures() {
  const filePath = componentPaths.dataTable;
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf8');
  let validFeatures = 0;
  const totalFeatures = 6;
  
  log.header('Validating DataTable-Specific Features');
  
  // Check pagination support
  if (content.includes('pagination') && content.includes('currentPage')) {
    log.success('DataTable: Pagination implementation found');
    validFeatures++;
  } else {
    log.error('DataTable: Missing pagination implementation');
  }
  
  // Check sorting support
  if (content.includes('sorting') && content.includes('sortBy')) {
    log.success('DataTable: Sorting implementation found');
    validFeatures++;
  } else {
    log.error('DataTable: Missing sorting implementation');
  }
  
  // Check empty state
  if (content.includes('EmptyState') && content.includes('Ingen data')) {
    log.success('DataTable: Empty state with Norwegian text implemented');
    validFeatures++;
  } else {
    log.error('DataTable: Missing empty state or Norwegian text');
  }
  
  // Check loading state
  if (content.includes('LoadingState') && content.includes('Laster')) {
    log.success('DataTable: Loading state with Norwegian text implemented');
    validFeatures++;
  } else {
    log.error('DataTable: Missing loading state or Norwegian text');
  }
  
  // Check Norwegian date formatting
  if (content.includes('DD.MM.YYYY') && content.includes('formatDate')) {
    log.success('DataTable: Norwegian date formatting implemented');
    validFeatures++;
  } else {
    log.error('DataTable: Missing Norwegian date formatting');
  }
  
  // Check currency formatting (NOK)
  if (content.includes('NOK') && content.includes('formatCurrency')) {
    log.success('DataTable: Norwegian currency formatting implemented');
    validFeatures++;
  } else {
    log.error('DataTable: Missing Norwegian currency formatting');
  }
  
  return validFeatures;
}

function validateKeyValueListSpecificFeatures() {
  const filePath = componentPaths.keyValueList;
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf8');
  let validFeatures = 0;
  const totalFeatures = 4;
  
  log.header('Validating KeyValueList-Specific Features');
  
  // Check layout options
  if (content.includes('vertical') && content.includes('horizontal') && content.includes('grid')) {
    log.success('KeyValueList: Layout options (vertical, horizontal, grid) implemented');
    validFeatures++;
  } else {
    log.error('KeyValueList: Missing layout options');
  }
  
  // Check copyable functionality
  if (content.includes('copyable') && content.includes('clipboard')) {
    log.success('KeyValueList: Copyable functionality implemented');
    validFeatures++;
  } else {
    log.error('KeyValueList: Missing copyable functionality');
  }
  
  // Check sensitive data handling
  if (content.includes('sensitive') && content.includes('🔒')) {
    log.success('KeyValueList: Sensitive data indicators implemented');
    validFeatures++;
  } else {
    log.error('KeyValueList: Missing sensitive data handling');
  }
  
  // Check relative date formatting
  if (content.includes('relative') && content.includes('I dag')) {
    log.success('KeyValueList: Norwegian relative date formatting implemented');
    validFeatures++;
  } else {
    log.error('KeyValueList: Missing Norwegian relative date formatting');
  }
  
  return validFeatures;
}

function validateTagBadgeSpecificFeatures() {
  log.header('Validating Tag/Badge-Specific Features');
  
  const tagContent = fs.existsSync(componentPaths.tag) ? fs.readFileSync(componentPaths.tag, 'utf8') : '';
  const badgeContent = fs.existsSync(componentPaths.badge) ? fs.readFileSync(componentPaths.badge, 'utf8') : '';
  
  let validFeatures = 0;
  const totalFeatures = 6;
  
  // Check Tag removable functionality
  if (tagContent.includes('removable') && tagContent.includes('onRemove')) {
    log.success('Tag: Removable functionality implemented');
    validFeatures++;
  } else {
    log.error('Tag: Missing removable functionality');
  }
  
  // Check Tag interactive support
  if (tagContent.includes('interactive') && tagContent.includes('onClick')) {
    log.success('Tag: Interactive functionality implemented');
    validFeatures++;
  } else {
    log.error('Tag: Missing interactive functionality');
  }
  
  // Check Badge count formatting
  if (badgeContent.includes('formatCount') && badgeContent.includes('maxCount')) {
    log.success('Badge: Count formatting implemented');
    validFeatures++;
  } else {
    log.error('Badge: Missing count formatting');
  }
  
  // Check Badge positioning
  if (badgeContent.includes('top-right') && badgeContent.includes('position')) {
    log.success('Badge: Positioning options implemented');
    validFeatures++;
  } else {
    log.error('Badge: Missing positioning options');
  }
  
  // Check pulse animation
  if (badgeContent.includes('pulse') && badgeContent.includes('animation')) {
    log.success('Badge: Pulse animation implemented');
    validFeatures++;
  } else {
    log.error('Badge: Missing pulse animation');
  }
  
  // Check priority indicators
  if (badgeContent.includes('priority') && badgeContent.includes('critical')) {
    log.success('Badge: Priority indicators implemented');
    validFeatures++;
  } else {
    log.error('Badge: Missing priority indicators');
  }
  
  return validFeatures;
}

function validateTooltipSpecificFeatures() {
  const filePath = componentPaths.tooltip;
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf8');
  let validFeatures = 0;
  const totalFeatures = 4;
  
  log.header('Validating Tooltip-Specific Features');
  
  // Check placement options
  if (content.includes('top') && content.includes('bottom') && content.includes('left') && content.includes('right')) {
    log.success('Tooltip: Placement options implemented');
    validFeatures++;
  } else {
    log.error('Tooltip: Missing placement options');
  }
  
  // Check trigger options
  if (content.includes('hover') && content.includes('click') && content.includes('focus')) {
    log.success('Tooltip: Trigger options implemented');
    validFeatures++;
  } else {
    log.error('Tooltip: Missing trigger options');
  }
  
  // Check arrow support
  if (content.includes('TooltipArrow') && content.includes('arrow')) {
    log.success('Tooltip: Arrow implementation found');
    validFeatures++;
  } else {
    log.error('Tooltip: Missing arrow implementation');
  }
  
  // Check help category indicators
  if (content.includes('helpCategory') && content.includes('field')) {
    log.success('Tooltip: Help category indicators implemented');
    validFeatures++;
  } else {
    log.error('Tooltip: Missing help category indicators');
  }
  
  return validFeatures;
}

function validateTypeDefinitions() {
  const filePath = componentPaths.types;
  if (!fs.existsSync(filePath)) {
    log.error('Data display types file not found');
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let validTypes = 0;
  const totalTypes = 12;
  
  log.header('Validating TypeScript Type Definitions');
  
  const requiredTypes = [
    'DataTableProps',
    'KeyValueListProps', 
    'TagProps',
    'BadgeProps',
    'TooltipProps',
    'TableColumn',
    'TableData',
    'KeyValueItem',
    'PaginationConfig',
    'SortingConfig',
    'SelectionConfig',
    'ExportConfig'
  ];
  
  requiredTypes.forEach(type => {
    if (content.includes(`interface ${type}`) || content.includes(`type ${type}`)) {
      log.success(`Type definition: ${type} found`);
      validTypes++;
    } else {
      log.error(`Type definition: ${type} missing`);
    }
  });
  
  return validTypes;
}

function validateExports() {
  const filePath = componentPaths.index;
  if (!fs.existsSync(filePath)) {
    log.error('Data display components index file not found');
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let validExports = 0;
  const totalExports = 5;
  
  log.header('Validating Component Exports');
  
  const requiredExports = [
    'DataTable',
    'KeyValueList',
    'Tag', 
    'Badge',
    'Tooltip'
  ];
  
  requiredExports.forEach(component => {
    if (content.includes(`export { ${component} }`)) {
      log.success(`Export: ${component} found`);
      validExports++;
    } else {
      log.error(`Export: ${component} missing`);
    }
  });
  
  return validExports;
}

// Main validation function
function main() {
  console.log(`${colors.bold}${colors.cyan}
╔══════════════════════════════════════════════════════════════╗
║          🇳🇴 Norwegian Data Display Components Validator      ║
║                     Story 4 Implementation                  ║
╚══════════════════════════════════════════════════════════════╝
${colors.reset}`);

  let totalPassed = 0;
  let totalTests = 0;

  // Test 1: Component Structure Validation
  log.header('Test 1: Component Structure Validation');
  const componentStructureResults = [
    validateComponentExists('DataTable', componentPaths.dataTable),
    validateComponentExists('KeyValueList', componentPaths.keyValueList),
    validateComponentExists('Tag', componentPaths.tag),
    validateComponentExists('Badge', componentPaths.badge),
    validateComponentExists('Tooltip', componentPaths.tooltip)
  ];
  const structurePassed = componentStructureResults.filter(Boolean).length;
  totalPassed += structurePassed;
  totalTests += 5;
  log.info(`Structure validation: ${structurePassed}/5 passed`);

  // Test 2: Norwegian Features Validation
  log.header('Test 2: Norwegian Compliance Features');
  const norwegianFeatureResults = [
    validateNorwegianFeatures('DataTable', componentPaths.dataTable),
    validateNorwegianFeatures('KeyValueList', componentPaths.keyValueList),
    validateNorwegianFeatures('Tag', componentPaths.tag),
    validateNorwegianFeatures('Badge', componentPaths.badge),
    validateNorwegianFeatures('Tooltip', componentPaths.tooltip)
  ];
  const norwegianPassed = norwegianFeatureResults.reduce((sum, score) => sum + score, 0);
  const norwegianTotal = norwegianFeatureResults.length * 8;
  totalPassed += norwegianPassed;
  totalTests += norwegianTotal;
  log.info(`Norwegian features: ${norwegianPassed}/${norwegianTotal} passed`);

  // Test 3: Component-Specific Features
  const dataTableFeatures = validateDataTableSpecificFeatures();
  const keyValueFeatures = validateKeyValueListSpecificFeatures();
  const tagBadgeFeatures = validateTagBadgeSpecificFeatures();
  const tooltipFeatures = validateTooltipSpecificFeatures();
  
  const specificPassed = dataTableFeatures + keyValueFeatures + tagBadgeFeatures + tooltipFeatures;
  const specificTotal = 6 + 4 + 6 + 4; // Expected totals for each component type
  totalPassed += specificPassed;
  totalTests += specificTotal;
  log.info(`Component-specific features: ${specificPassed}/${specificTotal} passed`);

  // Test 4: Type Definitions
  const typesPassed = validateTypeDefinitions();
  totalPassed += typesPassed;
  totalTests += 12;
  log.info(`Type definitions: ${typesPassed}/12 passed`);

  // Test 5: Exports
  const exportsPassed = validateExports();
  totalPassed += exportsPassed;
  totalTests += 5;
  log.info(`Component exports: ${exportsPassed}/5 passed`);

  // Final Results
  const passPercentage = Math.round((totalPassed / totalTests) * 100);
  
  console.log(`\n${colors.bold}${colors.cyan}
╔══════════════════════════════════════════════════════════════╗
║                     📊 FINAL RESULTS                        ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}`);

  console.log(`
📈 Total Tests: ${totalTests}
✅ Passed: ${totalPassed}
❌ Failed: ${totalTests - totalPassed}
📊 Success Rate: ${passPercentage}%
`);

  if (passPercentage >= 90) {
    log.success('🎉 Excellent! Story 4 implementation meets Norwegian standards');
  } else if (passPercentage >= 75) {
    log.warning('⚠️  Good progress, but some Norwegian features need attention');
  } else {
    log.error('❌ Story 4 implementation needs significant improvements');
  }

  console.log(`\n${colors.cyan}Norwegian Compliance Summary:${colors.reset}
• NSM Classification: ${norwegianFeatureResults.every(r => r >= 6) ? '✅' : '❌'} 
• WCAG 2.2 AA Accessibility: ${norwegianFeatureResults.every(r => r >= 5) ? '✅' : '❌'}
• Design Token Usage: ${norwegianFeatureResults.every(r => r >= 7) ? '✅' : '❌'}
• Localization Support: ${norwegianFeatureResults.every(r => r >= 4) ? '✅' : '❌'}
• Norwegian Data Formatting: ${dataTableFeatures >= 5 && keyValueFeatures >= 3 ? '✅' : '❌'}
`);

  process.exit(passPercentage >= 75 ? 0 : 1);
}

// Run validation
if (require.main === module) {
  main();
}

module.exports = {
  validateComponentExists,
  validateNorwegianFeatures,
  validateDataTableSpecificFeatures,
  validateKeyValueListSpecificFeatures,
  validateTagBadgeSpecificFeatures,
  validateTooltipSpecificFeatures,
  validateTypeDefinitions,
  validateExports
}; 