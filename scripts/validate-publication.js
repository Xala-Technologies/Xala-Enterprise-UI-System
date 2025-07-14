#!/usr/bin/env node

// Package Publication Validation Script for @xala-technologies/ui-system
// Validates package readiness for NPM publication and semantic release

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
  packageJson: { passed: 0, failed: 0, warnings: 0 },
  exports: { passed: 0, failed: 0, warnings: 0 },
  documentation: { passed: 0, failed: 0, warnings: 0 },
  semanticRelease: { passed: 0, failed: 0, warnings: 0 },
  build: { passed: 0, failed: 0, warnings: 0 }
};

// Package.json validation
function validatePackageJson() {
  console.log(`${colors.cyan}${colors.bright}📦 Validating package.json${colors.reset}\n`);

  const packagePath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    console.log(`  ${colors.red}❌ package.json not found${colors.reset}`);
    results.packageJson.failed++;
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // Required fields validation
  const requiredFields = [
    'name',
    'version', 
    'description',
    'main',
    'types',
    'exports',
    'files',
    'scripts',
    'keywords',
    'author',
    'license',
    'repository',
    'publishConfig'
  ];

  requiredFields.forEach(field => {
    if (packageJson[field]) {
      console.log(`  ${colors.green}✅ ${field}${colors.reset}`);
      results.packageJson.passed++;
    } else {
      console.log(`  ${colors.red}❌ Missing required field: ${field}${colors.reset}`);
      results.packageJson.failed++;
    }
  });

  // Validate package name
  if (packageJson.name === '@xala-technologies/ui-system') {
    console.log(`  ${colors.green}✅ Package name correctly updated to @xala-technologies${colors.reset}`);
    results.packageJson.passed++;
  } else {
    console.log(`  ${colors.red}❌ Package name should be @xala-technologies/ui-system${colors.reset}`);
    results.packageJson.failed++;
  }

  // Validate version for semantic release
  if (packageJson.version === '0.0.0-development') {
    console.log(`  ${colors.green}✅ Version set for semantic release${colors.reset}`);
    results.packageJson.passed++;
  } else {
    console.log(`  ${colors.yellow}⚠️  Version should be 0.0.0-development for semantic release${colors.reset}`);
    results.packageJson.warnings++;
  }

  // Validate exports field
  if (packageJson.exports && packageJson.exports['.']) {
    console.log(`  ${colors.green}✅ Modern exports field configured${colors.reset}`);
    results.packageJson.passed++;
  } else {
    console.log(`  ${colors.red}❌ Missing or invalid exports field${colors.reset}`);
    results.packageJson.failed++;
  }

  // Validate scripts
  const requiredScripts = ['build', 'test', 'lint', 'semantic-release'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`  ${colors.green}✅ Script: ${script}${colors.reset}`);
      results.packageJson.passed++;
    } else {
      console.log(`  ${colors.red}❌ Missing script: ${script}${colors.reset}`);
      results.packageJson.failed++;
    }
  });

  console.log('');
}

// Exports validation
function validateExports() {
  console.log(`${colors.magenta}${colors.bright}📂 Validating Package Exports${colors.reset}\n`);

  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  if (!packageJson.exports) {
    console.log(`  ${colors.red}❌ No exports field found${colors.reset}`);
    results.exports.failed++;
    return;
  }

  // Validate main export
  if (packageJson.exports['.']) {
    console.log(`  ${colors.green}✅ Main export configured${colors.reset}`);
    results.exports.passed++;
  } else {
    console.log(`  ${colors.red}❌ Missing main export${colors.reset}`);
    results.exports.failed++;
  }

  // Validate subpath exports
  const expectedSubpaths = ['./localization', './rtl', './components', './tokens'];
  expectedSubpaths.forEach(subpath => {
    if (packageJson.exports[subpath]) {
      console.log(`  ${colors.green}✅ Subpath export: ${subpath}${colors.reset}`);
      results.exports.passed++;
    } else {
      console.log(`  ${colors.yellow}⚠️  Missing subpath export: ${subpath}${colors.reset}`);
      results.exports.warnings++;
    }
  });

  // Validate export types (CommonJS + ESM)
  Object.entries(packageJson.exports).forEach(([path, config]) => {
    if (path === './package.json') return;
    
    if (config.types && config.import && config.require) {
      console.log(`  ${colors.green}✅ Complete export config for ${path}${colors.reset}`);
      results.exports.passed++;
    } else {
      console.log(`  ${colors.yellow}⚠️  Incomplete export config for ${path}${colors.reset}`);
      results.exports.warnings++;
    }
  });

  console.log('');
}

// Documentation validation
function validateDocumentation() {
  console.log(`${colors.blue}${colors.bright}📚 Validating Documentation${colors.reset}\n`);

  const requiredDocs = [
    { file: 'README.md', description: 'Package documentation' },
    { file: 'CHANGELOG.md', description: 'Change log' },
    { file: 'LICENSE', description: 'License file' },
    { file: 'UPGRADE.md', description: 'Upgrade guide' }
  ];

  requiredDocs.forEach(doc => {
    const docPath = path.join(process.cwd(), doc.file);
    if (fs.existsSync(docPath)) {
      const content = fs.readFileSync(docPath, 'utf8');
      if (content.length > 100) {
        console.log(`  ${colors.green}✅ ${doc.description} (${doc.file})${colors.reset}`);
        results.documentation.passed++;
      } else {
        console.log(`  ${colors.yellow}⚠️  ${doc.description} exists but seems incomplete (${doc.file})${colors.reset}`);
        results.documentation.warnings++;
      }
    } else {
      console.log(`  ${colors.red}❌ Missing ${doc.description} (${doc.file})${colors.reset}`);
      results.documentation.failed++;
    }
  });

  // Check README for Norwegian compliance mentions
  const readmePath = path.join(process.cwd(), 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf8');
    const norwegianTerms = ['norwegian', 'nsm', 'gdpr', 'digdir', 'wcag'];
    const hasNorwegianContent = norwegianTerms.some(term => 
      readme.toLowerCase().includes(term)
    );
    
    if (hasNorwegianContent) {
      console.log(`  ${colors.green}✅ README includes Norwegian compliance information${colors.reset}`);
      results.documentation.passed++;
    } else {
      console.log(`  ${colors.yellow}⚠️  README should mention Norwegian government compliance${colors.reset}`);
      results.documentation.warnings++;
    }
  }

  console.log('');
}

// Semantic release validation
function validateSemanticRelease() {
  console.log(`${colors.green}${colors.bright}🚀 Validating Semantic Release Configuration${colors.reset}\n`);

  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // Check for semantic release dependencies
  const semanticReleaseDeps = [
    'semantic-release',
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/github',
    '@semantic-release/npm'
  ];

  semanticReleaseDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`  ${colors.green}✅ Dependency: ${dep}${colors.reset}`);
      results.semanticRelease.passed++;
    } else {
      console.log(`  ${colors.red}❌ Missing dependency: ${dep}${colors.reset}`);
      results.semanticRelease.failed++;
    }
  });

  // Check for release configuration
  const releaseConfigPath = path.join(process.cwd(), '.releaserc.js');
  if (fs.existsSync(releaseConfigPath)) {
    console.log(`  ${colors.green}✅ Semantic release configuration file exists${colors.reset}`);
    results.semanticRelease.passed++;
  } else if (packageJson.release) {
    console.log(`  ${colors.green}✅ Semantic release configuration in package.json${colors.reset}`);
    results.semanticRelease.passed++;
  } else {
    console.log(`  ${colors.red}❌ No semantic release configuration found${colors.reset}`);
    results.semanticRelease.failed++;
  }

  // Check for commitizen
  if (packageJson.devDependencies && packageJson.devDependencies['commitizen']) {
    console.log(`  ${colors.green}✅ Commitizen configured for conventional commits${colors.reset}`);
    results.semanticRelease.passed++;
  } else {
    console.log(`  ${colors.yellow}⚠️  Commitizen recommended for conventional commits${colors.reset}`);
    results.semanticRelease.warnings++;
  }

  console.log('');
}

// Build validation
function validateBuild() {
  console.log(`${colors.yellow}${colors.bright}🔨 Validating Build Configuration${colors.reset}\n`);

  // Check TypeScript configuration
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  if (fs.existsSync(tsconfigPath)) {
    console.log(`  ${colors.green}✅ TypeScript configuration exists${colors.reset}`);
    results.build.passed++;
  } else {
    console.log(`  ${colors.red}❌ Missing tsconfig.json${colors.reset}`);
    results.build.failed++;
  }

  // Check for build script
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log(`  ${colors.green}✅ Build script configured${colors.reset}`);
    results.build.passed++;
  } else {
    console.log(`  ${colors.red}❌ Missing build script${colors.reset}`);
    results.build.failed++;
  }

  // Check for files field
  if (packageJson.files && packageJson.files.includes('dist/')) {
    console.log(`  ${colors.green}✅ Distribution files configured${colors.reset}`);
    results.build.passed++;
  } else {
    console.log(`  ${colors.red}❌ Missing or incorrect files field${colors.reset}`);
    results.build.failed++;
  }

  // Check dist directory (if exists)
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    console.log(`  ${colors.green}✅ Distribution directory exists${colors.reset}`);
    results.build.passed++;
  } else {
    console.log(`  ${colors.yellow}⚠️  Distribution directory not found (run build first)${colors.reset}`);
    results.build.warnings++;
  }

  console.log('');
}

// Generate validation report
function generateValidationReport() {
  console.log(`${colors.bright}📊 Publication Validation Report${colors.reset}\n`);

  const categories = [
    { name: 'Package Configuration', results: results.packageJson, icon: '📦' },
    { name: 'Package Exports', results: results.exports, icon: '📂' },
    { name: 'Documentation', results: results.documentation, icon: '📚' },
    { name: 'Semantic Release', results: results.semanticRelease, icon: '🚀' },
    { name: 'Build System', results: results.build, icon: '🔨' }
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

  // Publication readiness assessment
  if (totalFailed === 0 && overallPassRate >= 90) {
    console.log(`${colors.green}${colors.bright}🎉 READY FOR PUBLICATION: Package is fully configured for NPM publication!${colors.reset}`);
  } else if (totalFailed === 0 && overallPassRate >= 80) {
    console.log(`${colors.green}${colors.bright}✅ PUBLICATION READY: Package meets requirements with minor improvements recommended.${colors.reset}`);
  } else if (totalFailed <= 2) {
    console.log(`${colors.yellow}${colors.bright}⚠️  NEEDS ATTENTION: Some issues need to be resolved before publication.${colors.reset}`);
  } else {
    console.log(`${colors.red}${colors.bright}❌ NOT READY: Significant issues must be addressed before publication.${colors.reset}`);
  }

  console.log(`\n${colors.bright}Next Steps:${colors.reset}`);
  if (totalFailed === 0) {
    console.log(`1. Run ${colors.cyan}pnpm build${colors.reset} to generate distribution files`);
    console.log(`2. Run ${colors.cyan}pnpm test${colors.reset} to ensure all tests pass`);
    console.log(`3. Run ${colors.cyan}pnpm run semantic-release --dry-run${colors.reset} to test release process`);
    console.log(`4. Commit changes and push to trigger automatic release`);
  } else {
    console.log(`1. Fix the ${totalFailed} failed validation${totalFailed > 1 ? 's' : ''} listed above`);
    console.log(`2. Re-run this validation script`);
    console.log(`3. Proceed with build and testing once validation passes`);
  }
}

// Main validation execution
function main() {
  console.log(`${colors.bright}${colors.cyan}`);
  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║                 @xala-technologies/ui-system                    ║');
  console.log('║                 PUBLICATION VALIDATION SUITE                    ║');
  console.log('║                                                                  ║');
  console.log('║        Package Publication • Semantic Release • NPM Ready       ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}\n`);

  validatePackageJson();
  validateExports();
  validateDocumentation();
  validateSemanticRelease();
  validateBuild();
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
  validatePackageJson,
  validateExports,
  validateDocumentation,
  validateSemanticRelease,
  validateBuild,
  generateValidationReport
}; 