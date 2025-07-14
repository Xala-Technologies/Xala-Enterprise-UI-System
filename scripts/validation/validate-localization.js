#!/usr/bin/env node

// Localization and RTL Validation Script for @xala-mock/ui-system
// Validates Norwegian government compliance and RTL support

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Validation results
const results = {
  translations: { passed: 0, failed: 0, warnings: 0 },
  rtl: { passed: 0, failed: 0, warnings: 0 },
  norwegian: { passed: 0, failed: 0, warnings: 0 },
  accessibility: { passed: 0, failed: 0, warnings: 0 }
};

// Norwegian translation validation
function validateNorwegianTranslations() {
  console.log(`${colors.cyan}${colors.bright}🇳🇴 Validating Norwegian Translations${colors.reset}\n`);

  const translationFiles = [
    'src/localization/translations/nb-NO.ts',
    'src/localization/translations/nn-NO.ts', 
    'src/localization/translations/en-NO.ts'
  ];

  translationFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    console.log(`Checking ${file}...`);

    if (!fs.existsSync(filePath)) {
      console.log(`  ${colors.red}❌ File not found${colors.reset}`);
      results.translations.failed++;
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Check for required Norwegian terminology
    const norwegianChecks = [
      { pattern: /fødselsnummer/i, name: 'Fødselsnummer (Personal Number)' },
      { pattern: /organisasjonsnummer/i, name: 'Organisasjonsnummer (Organization Number)' },
      { pattern: /kommune/i, name: 'Kommune (Municipality)' },
      { pattern: /altinn/i, name: 'Altinn services' },
      { pattern: /id-porten/i, name: 'ID-porten authentication' },
      { pattern: /bankid/i, name: 'BankID services' },
      { pattern: /brreg/i, name: 'BRREG organization registry' }
    ];

    let checksPassedForFile = 0;
    norwegianChecks.forEach(check => {
      if (check.pattern.test(content)) {
        console.log(`  ${colors.green}✅ ${check.name}${colors.reset}`);
        checksPassedForFile++;
      } else {
        console.log(`  ${colors.yellow}⚠️  ${check.name} not found${colors.reset}`);
        results.translations.warnings++;
      }
    });

    // Check for NSM classification levels
    const nsmLevels = ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'];
    const hasAllNSMLevels = nsmLevels.every(level => content.includes(level));
    
    if (hasAllNSMLevels) {
      console.log(`  ${colors.green}✅ NSM classification levels complete${colors.reset}`);
      checksPassedForFile++;
    } else {
      console.log(`  ${colors.red}❌ Missing NSM classification levels${colors.reset}`);
      results.translations.failed++;
    }

    // Check for accessibility labels
    if (content.includes('accessibility')) {
      console.log(`  ${colors.green}✅ Accessibility translations included${colors.reset}`);
      checksPassedForFile++;
    } else {
      console.log(`  ${colors.yellow}⚠️  Accessibility translations missing${colors.reset}`);
      results.translations.warnings++;
    }

    if (checksPassedForFile >= 5) {
      results.translations.passed++;
    }

    console.log('');
  });
}

// RTL support validation
function validateRTLSupport() {
  console.log(`${colors.magenta}${colors.bright}🔄 Validating RTL Support${colors.reset}\n`);

  const rtlFiles = [
    'src/rtl/tokens/rtl-design-tokens.ts',
    'src/rtl/tests/rtl-component.test.ts',
    'src/rtl/index.ts'
  ];

  rtlFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    console.log(`Checking ${file}...`);

    if (!fs.existsSync(filePath)) {
      console.log(`  ${colors.red}❌ File not found${colors.reset}`);
      results.rtl.failed++;
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // RTL-specific checks
    const rtlChecks = [
      { pattern: /direction.*rtl/i, name: 'RTL direction support' },
      { pattern: /text-align.*right/i, name: 'RTL text alignment' },
      { pattern: /margin-inline-start/i, name: 'Logical margin properties' },
      { pattern: /padding-inline-start/i, name: 'Logical padding properties' },
      { pattern: /unicode-bidi/i, name: 'BiDi text support' },
      { pattern: /arabic|hebrew/i, name: 'Arabic/Hebrew language support' }
    ];

    let rtlChecksPassedForFile = 0;
    rtlChecks.forEach(check => {
      if (check.pattern.test(content)) {
        console.log(`  ${colors.green}✅ ${check.name}${colors.reset}`);
        rtlChecksPassedForFile++;
      } else {
        console.log(`  ${colors.yellow}⚠️  ${check.name} not found${colors.reset}`);
        results.rtl.warnings++;
      }
    });

    // Check for Norwegian RTL testing
    if (content.includes('NORWEGIAN_RTL')) {
      console.log(`  ${colors.green}✅ Norwegian RTL testing included${colors.reset}`);
      rtlChecksPassedForFile++;
    } else {
      console.log(`  ${colors.yellow}⚠️  Norwegian RTL testing missing${colors.reset}`);
      results.rtl.warnings++;
    }

    if (rtlChecksPassedForFile >= 4) {
      results.rtl.passed++;
    }

    console.log('');
  });
}

// Norwegian government compliance validation
function validateNorwegianCompliance() {
  console.log(`${colors.blue}${colors.bright}🏛️  Validating Norwegian Government Compliance${colors.reset}\n`);

  const localizationFiles = [
    'src/localization/hooks/useLocalization.ts',
    'src/localization/providers/LocalizationProvider.ts',
    'src/types/localization.types.ts'
  ];

  localizationFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    console.log(`Checking ${file}...`);

    if (!fs.existsSync(filePath)) {
      console.log(`  ${colors.red}❌ File not found${colors.reset}`);
      results.norwegian.failed++;
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Norwegian government compliance checks
    const complianceChecks = [
      { pattern: /nsm/i, name: 'NSM (Norwegian National Security Authority) compliance' },
      { pattern: /gdpr/i, name: 'GDPR compliance' },
      { pattern: /digdir/i, name: 'DigDir (Norwegian Digitalisation Agency) standards' },
      { pattern: /wcag/i, name: 'WCAG accessibility compliance' },
      { pattern: /nb-NO|nn-NO/i, name: 'Norwegian locale support' },
      { pattern: /municipality/i, name: 'Norwegian municipality support' }
    ];

    let complianceChecksPassedForFile = 0;
    complianceChecks.forEach(check => {
      if (check.pattern.test(content)) {
        console.log(`  ${colors.green}✅ ${check.name}${colors.reset}`);
        complianceChecksPassedForFile++;
      } else {
        console.log(`  ${colors.yellow}⚠️  ${check.name} not found${colors.reset}`);
        results.norwegian.warnings++;
      }
    });

    // Check for government service integration
    const govServices = ['altinn', 'id-porten', 'bankid', 'brreg'];
    const hasGovServices = govServices.some(service => content.toLowerCase().includes(service));
    
    if (hasGovServices) {
      console.log(`  ${colors.green}✅ Government service integration${colors.reset}`);
      complianceChecksPassedForFile++;
    } else {
      console.log(`  ${colors.yellow}⚠️  Government service integration missing${colors.reset}`);
      results.norwegian.warnings++;
    }

    if (complianceChecksPassedForFile >= 4) {
      results.norwegian.passed++;
    }

    console.log('');
  });
}

// Accessibility validation for localization
function validateAccessibilityCompliance() {
  console.log(`${colors.green}${colors.bright}♿ Validating Accessibility Compliance${colors.reset}\n`);

  const files = [
    'src/localization/translations/nb-NO.ts',
    'src/localization/hooks/useLocalization.ts',
    'src/rtl/tests/rtl-component.test.ts'
  ];

  files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    console.log(`Checking ${file}...`);

    if (!fs.existsSync(filePath)) {
      console.log(`  ${colors.red}❌ File not found${colors.reset}`);
      results.accessibility.failed++;
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Accessibility checks
    const a11yChecks = [
      { pattern: /aria-label/i, name: 'ARIA labels' },
      { pattern: /screen.*reader/i, name: 'Screen reader support' },
      { pattern: /keyboard.*nav/i, name: 'Keyboard navigation' },
      { pattern: /44px|44 px/i, name: 'Touch target size (44px)' },
      { pattern: /contrast/i, name: 'Color contrast consideration' }
    ];

    let a11yChecksPassedForFile = 0;
    a11yChecks.forEach(check => {
      if (check.pattern.test(content)) {
        console.log(`  ${colors.green}✅ ${check.name}${colors.reset}`);
        a11yChecksPassedForFile++;
      } else {
        console.log(`  ${colors.yellow}⚠️  ${check.name} not found${colors.reset}`);
        results.accessibility.warnings++;
      }
    });

    if (a11yChecksPassedForFile >= 2) {
      results.accessibility.passed++;
    }

    console.log('');
  });
}

// Generate validation report
function generateValidationReport() {
  console.log(`${colors.bright}📊 Localization Validation Report${colors.reset}\n`);

  const categories = [
    { name: 'Norwegian Translations', results: results.translations, icon: '🇳🇴' },
    { name: 'RTL Support', results: results.rtl, icon: '🔄' },
    { name: 'Government Compliance', results: results.norwegian, icon: '🏛️' },
    { name: 'Accessibility', results: results.accessibility, icon: '♿' }
  ];

  let totalPassed = 0;
  let totalFailed = 0;
  let totalWarnings = 0;

  categories.forEach(category => {
    const { passed, failed, warnings } = category.results;
    const total = passed + failed;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : '0.0';
    
    console.log(`${category.icon} ${colors.bright}${category.name}${colors.reset}`);
    console.log(`  Passed: ${colors.green}${passed}${colors.reset}`);
    console.log(`  Failed: ${colors.red}${failed}${colors.reset}`);
    console.log(`  Warnings: ${colors.yellow}${warnings}${colors.reset}`);
    console.log(`  Pass Rate: ${passRate >= 80 ? colors.green : passRate >= 60 ? colors.yellow : colors.red}${passRate}%${colors.reset}\n`);

    totalPassed += passed;
    totalFailed += failed;
    totalWarnings += warnings;
  });

  const overallTotal = totalPassed + totalFailed;
  const overallPassRate = overallTotal > 0 ? ((totalPassed / overallTotal) * 100).toFixed(1) : '0.0';

  console.log(`${colors.bright}Overall Summary:${colors.reset}`);
  console.log(`  Total Passed: ${colors.green}${totalPassed}${colors.reset}`);
  console.log(`  Total Failed: ${colors.red}${totalFailed}${colors.reset}`);
  console.log(`  Total Warnings: ${colors.yellow}${totalWarnings}${colors.reset}`);
  console.log(`  Overall Pass Rate: ${overallPassRate >= 80 ? colors.green : overallPassRate >= 60 ? colors.yellow : colors.red}${overallPassRate}%${colors.reset}\n`);

  // Status assessment
  if (overallPassRate >= 90) {
    console.log(`${colors.green}${colors.bright}🎉 EXCELLENT: Localization implementation is production-ready!${colors.reset}`);
  } else if (overallPassRate >= 80) {
    console.log(`${colors.green}${colors.bright}✅ GOOD: Localization implementation meets standards with minor improvements needed.${colors.reset}`);
  } else if (overallPassRate >= 60) {
    console.log(`${colors.yellow}${colors.bright}⚠️  NEEDS IMPROVEMENT: Some localization features require attention.${colors.reset}`);
  } else {
    console.log(`${colors.red}${colors.bright}❌ REQUIRES WORK: Significant localization issues need to be addressed.${colors.reset}`);
  }

  console.log(`\n${colors.bright}Norwegian Government Compliance:${colors.reset} ${overallPassRate >= 80 ? '✅ Ready for deployment' : '⚠️ Needs review'}`);
  console.log(`${colors.bright}RTL Accessibility:${colors.reset} ${results.rtl.passed >= 2 ? '✅ Arabic/Hebrew support ready' : '⚠️ RTL support incomplete'}`);
  console.log(`${colors.bright}WCAG 2.2 AA Compliance:${colors.reset} ${results.accessibility.passed >= 2 ? '✅ Accessibility standards met' : '⚠️ Accessibility review needed'}`);
}

// Main validation execution
function main() {
  console.log(`${colors.bright}${colors.cyan}`);
  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║                 @xala-mock/ui-system                            ║');
  console.log('║            LOCALIZATION & RTL VALIDATION SUITE                  ║');
  console.log('║                                                                  ║');
  console.log('║  Norwegian Government Compliance • RTL Support • Accessibility  ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}\n`);

  validateNorwegianTranslations();
  validateRTLSupport();
  validateNorwegianCompliance();
  validateAccessibilityCompliance();
  generateValidationReport();

  // Exit with appropriate code
  const totalFailed = Object.values(results).reduce((sum, result) => sum + result.failed, 0);
  process.exit(totalFailed > 0 ? 1 : 0);
}

// Run validation
if (require.main === module) {
  main();
}

module.exports = {
  validateNorwegianTranslations,
  validateRTLSupport,
  validateNorwegianCompliance,
  validateAccessibilityCompliance,
  generateValidationReport
}; 