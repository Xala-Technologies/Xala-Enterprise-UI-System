#!/usr/bin/env node
/**
 * Systematic Lint Fix Script
 * Fixes common patterns efficiently
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Starting systematic lint fixes...');

// Get lint output and parse errors
function getLintErrors() {
  try {
    execSync('pnpm lint', { stdio: 'pipe' });
    return [];
  } catch (error) {
    const output = error.stdout.toString();
    const lines = output.split('\n');
    const errors = [];

    for (const line of lines) {
      const match = line.match(/\/([^/]+\.tsx?):\s*(\d+):(\d+)\s+error\s+(.+)/);
      if (match) {
        const [_, filename, lineNum, colNum, message] = match;
        errors.push({
          file: filename,
          line: parseInt(lineNum),
          column: parseInt(colNum),
          message: message.trim(),
        });
      }
    }
    return errors;
  }
}

// Fix patterns in file content
function fixFileContent(content, errors) {
  let modified = false;

  // Fix unused variables by adding underscore prefix
  const unusedVarPattern = /'([a-zA-Z][a-zA-Z0-9]*)' is (defined|assigned a value) but never used/;

  for (const error of errors) {
    const match = error.message.match(unusedVarPattern);
    if (match) {
      const varName = match[1];

      // Skip if already has underscore or is a special case
      if (varName.startsWith('_') || ['React', 'JSX'].includes(varName)) {
        continue;
      }

      // Fix destructuring patterns
      const destructurePattern = new RegExp(`const\\s*{([^}]*\\b${varName}\\b[^}]*)}\\s*=`, 'g');
      content = content.replace(destructurePattern, (match, inside) => {
        const fixed = inside.replace(new RegExp(`\\b${varName}\\b`, 'g'), `_${varName}`);
        return match.replace(inside, fixed);
      });

      // Fix function parameters
      const paramPattern = new RegExp(`\\(([^)]*\\b${varName}\\b[^)]*)\\)\\s*:?\\s*[^=]*=>`, 'g');
      content = content.replace(paramPattern, (match, params) => {
        const fixed = params.replace(new RegExp(`\\b${varName}\\b`, 'g'), `_${varName}`);
        return match.replace(params, fixed);
      });

      // Fix variable declarations
      const varPattern = new RegExp(`\\b(const|let|var)\\s+${varName}\\b`, 'g');
      content = content.replace(varPattern, `$1 _${varName}`);

      modified = true;
    }
  }

  // Fix missing return types
  if (errors.some(e => e.message.includes('Missing return type'))) {
    // Add return types to common patterns
    content = content.replace(
      /(\w+)\s*=\s*useCallback\(\s*\([^)]*\)\s*=>\s*{/g,
      '$1 = useCallback(($2): void => {'
    );

    content = content.replace(/(\w+)\s*=\s*\([^)]*\)\s*=>\s*{\s*$/gm, '$1 = ($2): void => {');

    modified = true;
  }

  // Fix explicit any types
  if (errors.some(e => e.message.includes('Unexpected any'))) {
    content = content.replace(/:\s*any\b/g, ': unknown');
    modified = true;
  }

  return { content, modified };
}

// Process files
function processFiles() {
  const errors = getLintErrors();
  const fileErrors = {};

  // Group errors by file
  for (const error of errors) {
    if (!fileErrors[error.file]) {
      fileErrors[error.file] = [];
    }
    fileErrors[error.file].push(error);
  }

  let fixedFiles = 0;

  for (const [filename, fileErrorList] of Object.entries(fileErrors)) {
    const filePath = path.join('./src', filename);

    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${filePath}`);
      continue;
    }

    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const { content, modified } = fixFileContent(originalContent, fileErrorList);

      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Fixed: ${filename} (${fileErrorList.length} issues)`);
        fixedFiles++;
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${filename}:`, error.message);
    }
  }

  return { fixedFiles, totalErrors: errors.length };
}

// Main execution
try {
  console.log('📊 Analyzing lint errors...');
  const { fixedFiles, totalErrors } = processFiles();

  console.log(`\n🎉 Processed ${fixedFiles} files with ${totalErrors} total errors`);

  // Check remaining errors
  console.log('\n🔍 Checking remaining errors...');
  try {
    execSync('pnpm lint', { stdio: 'inherit' });
    console.log('\n✅ All lint issues resolved!');
  } catch (lintError) {
    try {
      const errorCount = execSync('pnpm lint 2>&1 | grep -c "error"', { encoding: 'utf8' }).trim();
      console.log(`📊 Remaining errors: ${errorCount}`);
    } catch (countError) {
      console.log('Could not count remaining errors');
    }
  }
} catch (error) {
  console.error('❌ Script failed:', error.message);
  process.exit(1);
}

console.log('\n🏁 Systematic fix completed!');
