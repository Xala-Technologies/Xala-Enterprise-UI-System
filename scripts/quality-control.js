#!/usr/bin/env node

/**
 * Quality Control Script for Xala UI System
 * Performs comprehensive checks on components, tokens, and build quality
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// ANSI color codes for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

// Quality control checks
const checks = {
  totalFiles: 0,
  passedFiles: 0,
  errors: [],
  warnings: [],
};

/**
 * Check if a component uses design tokens properly
 */
async function checkTokenUsage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const issues = [];

  // Check for useTokens hook usage
  const hasUseTokens = content.includes('useTokens');
  const importsUseTokens = content.includes("from '../hooks/useTokens'") || 
                           content.includes("from '../../hooks/useTokens'") ||
                           content.includes("from '@/hooks/useTokens'");

  // Check for CSS variable usage
  const cssVarPattern = /var\(--[\w-]+\)/g;
  const cssVarMatches = content.match(cssVarPattern) || [];

  // Check for inline styles
  const inlineStylePattern = /style\s*=\s*\{\{[^}]+\}\}/g;
  const inlineStyleMatches = content.match(inlineStylePattern) || [];

  // Check for Tailwind classes with CVA
  const hasCVA = content.includes('class-variance-authority') || content.includes('cva');
  const hasTailwindClasses = /className\s*=\s*["'`][\w\s-]+["'`]/g.test(content);

  // Check for hardcoded colors
  const hardcodedColorPattern = /#[0-9A-Fa-f]{3,6}|rgb\(|rgba\(/g;
  const hardcodedColors = content.match(hardcodedColorPattern) || [];

  // Report findings
  const report = {
    fileName,
    hasUseTokens,
    importsUseTokens,
    cssVarCount: cssVarMatches.length,
    inlineStyleCount: inlineStyleMatches.length,
    hasCVA,
    hasTailwindClasses,
    hardcodedColorCount: hardcodedColors.length,
    issues,
  };

  // Determine issues
  if (!hasCVA && !hasUseTokens && cssVarMatches.length === 0 && !hasTailwindClasses) {
    issues.push('Component does not use any token system');
  }

  if (hardcodedColors.length > 0) {
    issues.push(`Found ${hardcodedColors.length} hardcoded colors`);
  }

  if (inlineStyleMatches.length > 5) {
    issues.push(`Excessive inline styles (${inlineStyleMatches.length})`);
  }

  return report;
}

/**
 * Check TypeScript quality
 */
async function checkTypeScriptQuality(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const issues = [];

  // Check for 'any' types
  const anyTypePattern = /:\s*any\b/g;
  const anyTypes = content.match(anyTypePattern) || [];

  // Check for missing return types
  const functionPattern = /(?:export\s+)?(?:const|function)\s+\w+\s*=?\s*\([^)]*\)\s*(?:=>|{)/g;
  const functions = content.match(functionPattern) || [];
  const missingReturnTypes = functions.filter(fn => !fn.includes(':'));

  // Check for proper interface definitions
  const interfacePattern = /interface\s+\w+Props/g;
  const hasPropsInterface = interfacePattern.test(content);

  // Check for proper error handling
  const hasTryCatch = content.includes('try {');
  const hasErrorBoundary = content.includes('ErrorBoundary');

  return {
    fileName,
    anyTypeCount: anyTypes.length,
    missingReturnTypeCount: missingReturnTypes.length,
    hasPropsInterface,
    hasErrorHandling: hasTryCatch || hasErrorBoundary,
    issues,
  };
}

/**
 * Check component structure and patterns
 */
async function checkComponentStructure(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const issues = [];

  // Check for proper React patterns
  const hasDisplayName = content.includes('.displayName');
  const hasForwardRef = content.includes('forwardRef');
  const hasMemo = content.includes('React.memo') || content.includes('memo(');
  
  // Check for accessibility
  const hasAriaLabels = content.includes('aria-label');
  const hasAriaDescribedBy = content.includes('aria-describedby');
  const hasRole = content.includes('role=');

  // Check for Norwegian compliance
  const hasNorwegianProps = content.includes('norwegian');
  const hasClassification = content.includes('classification');

  return {
    fileName,
    hasDisplayName,
    hasForwardRef,
    hasMemo,
    accessibility: {
      hasAriaLabels,
      hasAriaDescribedBy,
      hasRole,
    },
    norwegianCompliance: {
      hasNorwegianProps,
      hasClassification,
    },
    issues,
  };
}

/**
 * Main quality control runner
 */
async function runQualityControl() {
  console.log(`${colors.blue}🔍 Running Quality Control Checks...${colors.reset}\n`);

  // Find all component files
  const componentFiles = await glob('src/components/**/*.{ts,tsx}', {
    ignore: ['**/*.test.*', '**/*.stories.*', '**/index.ts'],
  });

  checks.totalFiles = componentFiles.length;

  // Run checks on each file
  for (const file of componentFiles) {
    console.log(`Checking: ${file}`);
    
    try {
      const tokenReport = await checkTokenUsage(file);
      const tsReport = await checkTypeScriptQuality(file);
      const structureReport = await checkComponentStructure(file);

      // Consolidate issues
      const allIssues = [
        ...tokenReport.issues,
        ...tsReport.issues,
        ...structureReport.issues,
      ];

      if (tsReport.anyTypeCount > 0) {
        allIssues.push(`Found ${tsReport.anyTypeCount} 'any' types`);
      }

      if (!structureReport.hasDisplayName && structureReport.hasForwardRef) {
        allIssues.push('Missing displayName for forwardRef component');
      }

      if (allIssues.length === 0) {
        checks.passedFiles++;
        console.log(`  ${colors.green}✓ Passed all checks${colors.reset}`);
      } else {
        console.log(`  ${colors.yellow}⚠ Issues found:${colors.reset}`);
        allIssues.forEach(issue => {
          console.log(`    - ${issue}`);
          checks.warnings.push({ file, issue });
        });
      }

      // Log token usage summary
      console.log(`  Token Usage: ${
        tokenReport.hasCVA ? 'CVA/Tailwind' : 
        tokenReport.cssVarCount > 0 ? `CSS Variables (${tokenReport.cssVarCount})` :
        tokenReport.hasUseTokens ? 'useTokens Hook' :
        'None'
      }`);

    } catch (error) {
      console.log(`  ${colors.red}✗ Error: ${error.message}${colors.reset}`);
      checks.errors.push({ file, error: error.message });
    }

    console.log('');
  }

  // Print summary
  console.log(`${colors.blue}📊 Quality Control Summary${colors.reset}`);
  console.log(`Total Files: ${checks.totalFiles}`);
  console.log(`Passed: ${colors.green}${checks.passedFiles}${colors.reset}`);
  console.log(`Warnings: ${colors.yellow}${checks.warnings.length}${colors.reset}`);
  console.log(`Errors: ${colors.red}${checks.errors.length}${colors.reset}`);
  console.log(`Success Rate: ${((checks.passedFiles / checks.totalFiles) * 100).toFixed(1)}%`);

  // Write detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: checks.totalFiles,
      passedFiles: checks.passedFiles,
      warningCount: checks.warnings.length,
      errorCount: checks.errors.length,
      successRate: ((checks.passedFiles / checks.totalFiles) * 100).toFixed(1) + '%',
    },
    warnings: checks.warnings,
    errors: checks.errors,
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'quality-control-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log(`\n${colors.blue}📄 Detailed report saved to quality-control-report.json${colors.reset}`);

  // Exit with appropriate code
  process.exit(checks.errors.length > 0 ? 1 : 0);
}

// Run the quality control
runQualityControl().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});