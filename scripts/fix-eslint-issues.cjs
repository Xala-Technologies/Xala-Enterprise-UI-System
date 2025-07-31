#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing common ESLint issues...\n');

// Get all TypeScript files
const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('dist')) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (file.match(/\.(ts|tsx)$/)) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};

const srcFiles = getAllFiles(path.join(__dirname, '..', 'src'));
const testFiles = getAllFiles(path.join(__dirname, '..', 'tests'));

let totalFixed = 0;

// Fix common patterns
const fixFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = false;
  
  // Remove empty eslint-disable comments
  const emptyEslintRegex = /^\s*\/\/ eslint-disable-next-line.*\n\s*$/gm;
  if (emptyEslintRegex.test(content)) {
    content = content.replace(emptyEslintRegex, '');
    fixed = true;
  }
  
  // Fix console statements in non-test files
  if (!filePath.includes('.test.') && !filePath.includes('.spec.')) {
    // Comment out console.log statements
    const consoleLogRegex = /^(\s*)(console\.log\()/gm;
    if (consoleLogRegex.test(content)) {
      content = content.replace(consoleLogRegex, '$1// $2');
      fixed = true;
    }
  }
  
  // Fix unused imports (common ones)
  const unusedImportPatterns = [
    { pattern: /import\s+{\s*act\s*}\s+from\s+['"]@testing-library\/react['"];?\n/g, replacement: '' },
    { pattern: /import\s+{\s*waitFor\s*}\s+from\s+['"]@testing-library\/react['"];?\n/g, replacement: '' },
  ];
  
  unusedImportPatterns.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      fixed = true;
    }
  });
  
  if (fixed) {
    fs.writeFileSync(filePath, content);
    totalFixed++;
    console.log(`✅ Fixed ${filePath}`);
  }
};

// Process all files
[...srcFiles, ...testFiles].forEach(fixFile);

console.log(`\n🎉 Fixed ${totalFixed} files!`);

// Run ESLint fix
console.log('\n🔧 Running ESLint auto-fix...\n');
try {
  execSync('pnpm run lint:fix', { stdio: 'inherit' });
} catch (e) {
  console.log('ESLint fix completed with some remaining issues.');
}

console.log('\n✅ ESLint cleanup complete!');