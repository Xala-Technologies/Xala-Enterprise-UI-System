#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix type files and cleanup
function fixTypeFilesAndCleanup(content, file) {
  // Fix layout.types.ts and platform.types.ts - remove unused React imports
  if ((file.includes('layout.types.ts') || file.includes('platform.types.ts')) && 
      !content.includes('React.') && !content.includes('ReactNode') && !content.includes('ReactElement')) {
    content = content.replace(/import React from 'react';\n/g, '');
    content = content.replace(/import \* as React from 'react';\n/g, '');
  }

  // Fix form.types.ts - already prefixed parameters need to stay consistent
  if (file.includes('form.types.ts')) {
    // Ensure all callback parameters are properly prefixed
    content = content.replace(/onChange\?: \(event: /g, 'onChange?: (_event: ');
    content = content.replace(/onBlur\?: \(event: /g, 'onBlur?: (_event: ');
    content = content.replace(/onFocus\?: \(event: /g, 'onFocus?: (_event: ');
    content = content.replace(/onSubmit\?: \(event: /g, 'onSubmit?: (_event: ');
    content = content.replace(/onChange\?: \(checked: /g, 'onChange?: (_checked: ');
    content = content.replace(/onChange\?: \(value: /g, 'onChange?: (_value: ');
    content = content.replace(/onValidate\?: \(value: /g, 'onValidate?: (_value: ');
    content = content.replace(/onValidate\?: \(isValid: /g, 'onValidate?: (_isValid: ');
    content = content.replace(/onValidate\?: \(errors: /g, 'onValidate?: (_errors: ');
    content = content.replace(/onValidate\?: \(orgData: /g, 'onValidate?: (_orgData: ');
  }

  // Fix action-feedback.types.ts
  if (file.includes('action-feedback.types.ts')) {
    content = content.replace(/onClick\?: \(event: /g, 'onClick?: (_event: ');
    content = content.replace(/handler: \(action: /g, 'handler: (_action: ');
  }

  // Fix data-display.types.ts  
  if (file.includes('data-display.types.ts')) {
    // Fix value parameter references
    content = content.replace(/\(value\)/g, '(_value)');
    content = content.replace(/format\?: \{/g, '_format?: {');
    
    // Fix the actual function implementations that use value
    content = content.replace(/return value\.toString\(\)/g, 'return _value.toString()');
    content = content.replace(/return String\(value\)/g, 'return String(_value)');
    content = content.replace(/return value \? /g, 'return _value ? ');
    content = content.replace(/typeof value === /g, 'typeof _value === ');
    content = content.replace(/return `NOK \${value\.toFixed/g, 'return `NOK ${_value.toFixed');
  }

  // Fix UISystemProvider.tsx
  if (file.includes('UISystemProvider.tsx')) {
    // Fix unused parameters in callbacks
    content = content.replace(
      /updateConfig: \(updates: Partial<UISystemConfig>\) => \{/g,
      'updateConfig: (_updates: Partial<UISystemConfig>) => {'
    );
    content = content.replace(
      /updateAccessibility: \(accessibility: AccessibilityConfig \| AccessibilityPreset\) => \{/g,
      'updateAccessibility: (_accessibility: AccessibilityConfig | AccessibilityPreset) => {'
    );
    
    // Add explicit return types
    content = content.replace(
      /updateConfig: \(_updates: Partial<UISystemConfig>\) => \{/g,
      'updateConfig: (_updates: Partial<UISystemConfig>): void => {'
    );
    content = content.replace(
      /updateAccessibility: \(_accessibility: AccessibilityConfig \| AccessibilityPreset\) => \{/g,
      'updateAccessibility: (_accessibility: AccessibilityConfig | AccessibilityPreset): void => {'
    );
  }

  // Fix Alert.tsx - remove unused getCategoryIcon
  if (file.includes('Alert.tsx')) {
    if (!content.includes('getCategoryIcon(') && content.includes('const getCategoryIcon')) {
      const start = content.indexOf('const getCategoryIcon');
      const end = content.indexOf('};', start) + 2;
      if (start !== -1 && end > start) {
        content = content.slice(0, start) + content.slice(end + 1);
      }
    }
    
    // Remove unused showOverlay
    content = content.replace(/showOverlay = false,/, '');
    content = content.replace(/showOverlay,/, '');
  }

  // Fix unused label parameter in various components
  content = content.replace(/, label \}/g, ' }/');
  content = content.replace(/norwegian\s*,\s*label/g, 'norwegian');

  // Fix test configuration
  if (file.includes('.test.tsx') || file.includes('.test.ts')) {
    // Test files may need different handling
    // For now, ensure they have proper syntax
  }

  // Remove extra newlines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  return content;
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  content = fixTypeFilesAndCleanup(content, file);

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