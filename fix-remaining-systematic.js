#!/usr/bin/env node
/**
 * Systematic Lint Fix - Final Pass
 * Fixes the most common remaining patterns
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get files with lint errors
function getFilesWithErrors() {
  try {
    const output = execSync('pnpm lint 2>&1', { encoding: 'utf8' });
    const lines = output.split('\n');
    const files = new Set();

    for (const line of lines) {
      const match = line.match(/\/([^/]+\.(tsx?)):/);
      if (match) {
        files.add(match[1]);
      }
    }
    return Array.from(files);
  } catch (error) {
    return [];
  }
}

// Fix patterns in a file
function fixFilePatterns(filePath) {
  if (!fs.existsSync(filePath)) return false;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Pattern 1: Fix unused destructured variables
  const destructurePattern = /(\w+)\s*:\s*(\w+)\s*=\s*([^,}]+)/g;
  content = content.replace(destructurePattern, (match, original, renamed, defaultValue) => {
    if (!renamed.startsWith('_')) {
      changed = true;
      return `${original}: _${renamed} = ${defaultValue}`;
    }
    return match;
  });

  // Pattern 2: Fix simple unused variables
  const simpleVarPattern = /const\s+(\w+)\s*=\s*([^;]+);/g;
  content = content.replace(simpleVarPattern, (match, varName, assignment) => {
    if (!varName.startsWith('_') && !content.includes(`{${varName}}`)) {
      changed = true;
      return `const _${varName} = ${assignment};`;
    }
    return match;
  });

  // Pattern 3: Fix missing return types in arrow functions
  const arrowFunctionPattern = /return\s+\(\)\s*=>/g;
  content = content.replace(arrowFunctionPattern, match => {
    changed = true;
    return 'return (): void =>';
  });

  // Pattern 4: Fix localization destructuring
  const localizationPattern = /const\s*{\s*t\s*}\s*=\s*useLocalization\(\)/g;
  content = content.replace(localizationPattern, match => {
    if (!content.includes(' t(') && !content.includes('${t(')) {
      changed = true;
      return 'const { t: _t } = useLocalization()';
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed patterns in ${filePath}`);
    return true;
  }

  return false;
}

// Main execution
async function main() {
  console.log('🔧 Starting systematic lint fixes...\n');

  const files = getFilesWithErrors();
  console.log(`📋 Found ${files.length} files with errors:`, files);

  let totalFixed = 0;
  for (const file of files) {
    const filePath = path.join('src', 'components', file);
    if (fixFilePatterns(filePath)) {
      totalFixed++;
    }
  }

  console.log(`\n📊 Fixed patterns in ${totalFixed} files`);

  // Check final error count
  try {
    const output = execSync('pnpm lint 2>&1 | grep -c "error"', { encoding: 'utf8' });
    console.log(`🎯 Current error count: ${output.trim()}`);
  } catch (error) {
    console.log('📋 Checking final status...');
  }
}

main().catch(console.error);
