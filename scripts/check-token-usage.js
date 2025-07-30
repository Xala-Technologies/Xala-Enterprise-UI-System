#!/usr/bin/env node

/**
 * Token Usage Checker
 * Analyzes how components are using the design token system
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Token usage patterns
const patterns = {
  useTokensHook: /useTokens\(\)/g,
  cssVariables: /var\(--[\w-]+\)/g,
  tailwindClasses: /className\s*=\s*["'`][^"'`]*\b(?:text-|bg-|border-|p-|m-|w-|h-|flex|grid|rounded|shadow)[\w-]*[^"'`]*["'`]/g,
  cvaUsage: /cva\s*\(/g,
  hardcodedColors: /#[0-9A-Fa-f]{3,6}\b|rgb\([^)]+\)|rgba\([^)]+\)/g,
  hardcodedSpacing: /(?:padding|margin|gap|space):\s*["'`]?\d+(?:px|rem|em)/g,
  themeContext: /useTheme\(\)/g,
  designSystemProvider: /DesignSystemProvider/g,
};

// Statistics collector
const stats = {
  totalFiles: 0,
  byPattern: {},
  byComponent: {},
  summary: {
    fullyMigrated: 0,
    partiallyMigrated: 0,
    notMigrated: 0,
    usingTokens: 0,
    usingTailwind: 0,
    usingCssVars: 0,
    hasHardcodedValues: 0,
  },
};

// Initialize pattern stats
Object.keys(patterns).forEach(key => {
  stats.byPattern[key] = {
    count: 0,
    files: [],
  };
});

/**
 * Analyze a single file for token usage
 */
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const relativePath = path.relative(process.cwd(), filePath);
  
  const analysis = {
    file: relativePath,
    patterns: {},
    score: 0,
    status: 'not-migrated',
  };

  // Check each pattern
  Object.entries(patterns).forEach(([key, pattern]) => {
    const matches = content.match(pattern) || [];
    analysis.patterns[key] = matches.length;
    
    if (matches.length > 0) {
      stats.byPattern[key].count += matches.length;
      stats.byPattern[key].files.push(relativePath);
    }
  });

  // Calculate migration score
  const hasTokenSystem = 
    analysis.patterns.useTokensHook > 0 ||
    analysis.patterns.cssVariables > 0 ||
    analysis.patterns.cvaUsage > 0 ||
    analysis.patterns.tailwindClasses > 0;

  const hasHardcodedValues = 
    analysis.patterns.hardcodedColors > 0 ||
    analysis.patterns.hardcodedSpacing > 0;

  // Determine status
  if (hasTokenSystem && !hasHardcodedValues) {
    analysis.status = 'fully-migrated';
    analysis.score = 100;
    stats.summary.fullyMigrated++;
  } else if (hasTokenSystem && hasHardcodedValues) {
    analysis.status = 'partially-migrated';
    analysis.score = 50;
    stats.summary.partiallyMigrated++;
  } else {
    analysis.status = 'not-migrated';
    analysis.score = 0;
    stats.summary.notMigrated++;
  }

  // Update usage stats
  if (analysis.patterns.useTokensHook > 0) stats.summary.usingTokens++;
  if (analysis.patterns.tailwindClasses > 0 || analysis.patterns.cvaUsage > 0) stats.summary.usingTailwind++;
  if (analysis.patterns.cssVariables > 0) stats.summary.usingCssVars++;
  if (hasHardcodedValues) stats.summary.hasHardcodedValues++;

  stats.byComponent[fileName] = analysis;

  return analysis;
}

/**
 * Generate detailed report
 */
function generateReport() {
  console.log('\n📊 Token Usage Analysis Report\n');
  console.log('=' .repeat(60));
  
  // Summary
  console.log('\n📈 Summary:');
  console.log(`Total Components: ${stats.totalFiles}`);
  console.log(`Fully Migrated: ${stats.summary.fullyMigrated} (${(stats.summary.fullyMigrated / stats.totalFiles * 100).toFixed(1)}%)`);
  console.log(`Partially Migrated: ${stats.summary.partiallyMigrated} (${(stats.summary.partiallyMigrated / stats.totalFiles * 100).toFixed(1)}%)`);
  console.log(`Not Migrated: ${stats.summary.notMigrated} (${(stats.summary.notMigrated / stats.totalFiles * 100).toFixed(1)}%)`);

  // Token System Usage
  console.log('\n🎨 Token System Usage:');
  console.log(`Using useTokens Hook: ${stats.summary.usingTokens} components`);
  console.log(`Using Tailwind/CVA: ${stats.summary.usingTailwind} components`);
  console.log(`Using CSS Variables: ${stats.summary.usingCssVars} components`);
  console.log(`Has Hardcoded Values: ${stats.summary.hasHardcodedValues} components`);

  // Pattern Statistics
  console.log('\n🔍 Pattern Detection:');
  Object.entries(stats.byPattern).forEach(([pattern, data]) => {
    if (data.count > 0) {
      console.log(`${pattern}: ${data.count} occurrences in ${data.files.length} files`);
    }
  });

  // Components by Status
  console.log('\n📁 Components by Migration Status:');
  
  const componentsByStatus = {
    'fully-migrated': [],
    'partially-migrated': [],
    'not-migrated': [],
  };

  Object.entries(stats.byComponent).forEach(([file, analysis]) => {
    componentsByStatus[analysis.status].push(file);
  });

  console.log('\n✅ Fully Migrated:');
  componentsByStatus['fully-migrated'].forEach(file => {
    console.log(`  - ${file}`);
  });

  console.log('\n⚠️  Partially Migrated:');
  componentsByStatus['partially-migrated'].forEach(file => {
    const analysis = stats.byComponent[file];
    console.log(`  - ${file} (${analysis.patterns.hardcodedColors} colors, ${analysis.patterns.hardcodedSpacing} spacing)`);
  });

  console.log('\n❌ Not Migrated:');
  componentsByStatus['not-migrated'].forEach(file => {
    console.log(`  - ${file}`);
  });

  // Recommendations
  console.log('\n💡 Recommendations:');
  if (stats.summary.hasHardcodedValues > 0) {
    console.log('- Remove hardcoded color values and use design tokens');
    console.log('- Replace fixed spacing values with token-based spacing');
  }
  if (stats.summary.notMigrated > 0) {
    console.log('- Migrate remaining components to use the token system');
    console.log('- Consider using CVA for variant-based components');
  }

  // Write JSON report
  const jsonReport = {
    timestamp: new Date().toISOString(),
    summary: stats.summary,
    patterns: stats.byPattern,
    components: stats.byComponent,
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'token-usage-report.json'),
    JSON.stringify(jsonReport, null, 2)
  );

  console.log('\n📄 Detailed report saved to token-usage-report.json');
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Analyzing token usage in components...\n');

  try {
    // Find all component files
    const files = await glob('src/components/**/*.{ts,tsx}', {
      ignore: ['**/*.test.*', '**/*.stories.*', '**/index.ts'],
    });

    stats.totalFiles = files.length;

    // Analyze each file
    files.forEach(file => {
      console.log(`Analyzing: ${file}`);
      analyzeFile(file);
    });

    // Generate report
    generateReport();

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the analysis
main();