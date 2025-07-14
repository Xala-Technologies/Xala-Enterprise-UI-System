#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fix test file specific issues
function fixTestFile(content, filePath) {
  let fixed = content;
  
  // Add test environment imports if missing
  if (!content.includes("from '@testing-library/react'") && content.includes('render(')) {
    fixed = `import { render, screen } from '@testing-library/react';\n` + fixed;
  }
  
  if (!content.includes("import React") && content.includes('<')) {
    fixed = `import React from 'react';\n` + fixed;
  }
  
  // Fix expect/it/describe globals by adding proper imports
  if ((content.includes('expect(') || content.includes('it(') || content.includes('describe(')) 
      && !content.includes("import { expect")) {
    // These are Jest globals, they should work with proper test environment
  }
  
  // Fix window/document references in tests
  fixed = fixed.replace(/window\./g, 'global.window.');
  fixed = fixed.replace(/document\./g, 'global.document.');
  
  return fixed;
}

// Process test files
function processTestFiles() {
  const srcDir = path.join(__dirname, '..', 'src');
  const testFiles = [];
  
  function findTestFiles(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        findTestFiles(fullPath);
      } else if (stat.isFile() && (item.endsWith('.test.ts') || item.endsWith('.test.tsx'))) {
        testFiles.push(fullPath);
      }
    });
  }
  
  findTestFiles(srcDir);
  
  console.log(`Found ${testFiles.length} test files to process...`);
  
  let totalFixed = 0;
  
  testFiles.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      content = fixTestFile(content, filePath);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed test file: ${path.relative(srcDir, filePath)}`);
        totalFixed++;
      }
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
    }
  });
  
  console.log(`\nFixed ${totalFixed} test files`);
}

processTestFiles();