#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix final type issues
function fixFinalTypeIssues(content, file) {
  // Remove React imports from type files that don't use them
  if ((file.includes('layout.types.ts') || file.includes('platform.types.ts'))) {
    // Check if React is actually used
    const reactUsagePattern = /React\.|ReactNode|ReactElement|React\.FC|React\.Component/;
    if (!reactUsagePattern.test(content.replace(/import.*React.*from.*'react'.*\n/g, ''))) {
      content = content.replace(/import React from 'react';\n/g, '');
      content = content.replace(/import \* as React from 'react';\n/g, '');
    }
  }

  // Fix form.types.ts parameters that are already prefixed but still showing errors
  if (file.includes('form.types.ts')) {
    // Fix mixed parameter issues - some are prefixed, some aren't
    content = content.replace(/onValidate\?: \(value: /g, 'onValidate?: (_value: ');
    content = content.replace(/, isValid: /g, ', _isValid: ');
    content = content.replace(/, event: /g, ', _event: ');
    content = content.replace(/, errors: /g, ', _errors: ');
    content = content.replace(/, orgData: /g, ', _orgData: ');
  }

  // Fix platform.types.ts
  if (file.includes('platform.types.ts')) {
    content = content.replace(/renderItem: \(item: /g, 'renderItem: (_item: ');
    content = content.replace(/, index: /g, ', _index: ');
    content = content.replace(/onAction\?: \(action: /g, 'onAction?: (_action: ');
  }

  // Fix action-feedback.types.ts
  if (file.includes('action-feedback.types.ts')) {
    content = content.replace(/onClick\?: \(event: /g, 'onClick?: (_event: ');
    content = content.replace(/handler: \(action: /g, 'handler: (_action: ');
    content = content.replace(/onActionClick\?: \(action: /g, 'onActionClick?: (_action: ');
  }

  // Fix data-display.types.ts
  if (file.includes('data-display.types.ts')) {
    // Fix the implementation that needs the value
    content = content.replace(/formatter\?: \(_value: unknown\) => string;/g, 'formatter?: (value: unknown) => string;');
    
    // But keep unused params in callbacks prefixed
    content = content.replace(/onRowClick\?: \(row: /g, 'onRowClick?: (_row: ');
    content = content.replace(/onSelectionChange\?: \(selectedRows: /g, 'onSelectionChange?: (_selectedRows: ');
    content = content.replace(/onSort\?: \(sortBy: /g, 'onSort?: (_sortBy: ');
    content = content.replace(/, sortOrder: /g, ', _sortOrder: ');
    content = content.replace(/onPageChange\?: \(page: /g, 'onPageChange?: (_page: ');
    content = content.replace(/, pageSize: /g, ', _pageSize: ');
    content = content.replace(/renderCell\?: \(value: /g, 'renderCell?: (_value: ');
    content = content.replace(/, row: /g, ', _row: ');
    content = content.replace(/, column: /g, ', _column: ');
  }

  // Fix filter-bar issues
  if (file.includes('FilterBar.tsx')) {
    // Remove unused props from destructuring
    content = content.replace(/onSearchChange,\s*\n/g, '');
    content = content.replace(/onFilterChange,\s*\n/g, '');
    content = content.replace(/onViewChange,\s*\n/g, '');
    
    // Fix callbacks that use incorrect parameter names
    content = content.replace(/onChange: \(value\) => /g, 'onChange: (_value) => ');
    content = content.replace(/onApply: \(filterId, value\) => /g, 'onApply: (_filterId, _value) => ');
    content = content.replace(/onChange: \(value: string\) => /g, 'onChange: (_value: string) => ');
  }

  // Clean up extra spaces
  content = content.replace(/\s+\}/g, ' }');
  content = content.replace(/\{\s+/g, '{ ');

  return content;
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  content = fixFinalTypeIssues(content, file);

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
    return true;
  }

  return false;
}

// Main
const srcDir = path.join(__dirname, 'src');
const files = glob.sync('**/*.{ts,tsx}', { cwd: srcDir, absolute: true });

let fixedCount = 0;
files.forEach(file => {
  try {
    if (processFile(file)) {
      fixedCount++;
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log(`\nFixed ${fixedCount} files`);