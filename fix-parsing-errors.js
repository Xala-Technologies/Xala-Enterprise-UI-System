#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix parsing errors in files
function fixParsingErrors(content, file) {
  // Fix Button.tsx - extra comma in destructuring
  if (file.includes('Button.tsx')) {
    content = content.replace(/norwegian,\s*,\s*label/, 'norwegian');
  }

  // Fix Modal.tsx - missing closing parenthesis
  if (file.includes('Modal.tsx')) {
    // Check for useEffect without proper closing
    const useEffectPattern = /useEffect\(\(\): React\.ReactElement => \{[\s\S]*?return \(\) => document\.removeEventListener\('keydown', handleEscape\);\s*\}, \[[\s\S]*?\]\);/;
    if (useEffectPattern.test(content)) {
      content = content.replace(
        /useEffect\(\(\): React\.ReactElement => \{/g,
        'useEffect(() => {'
      );
    }
    
    // Fix incomplete Modal component export
    if (content.includes('export const Modal') && !content.includes('Modal.displayName')) {
      const modalEnd = content.lastIndexOf('});');
      if (modalEnd !== -1) {
        content = content.substring(0, modalEnd + 3) + '\n\nModal.displayName = \'Modal\';\n';
      }
    }
  }

  // Fix Toast.tsx - parsing issues
  if (file.includes('Toast.tsx')) {
    // Fix handleClose return type
    content = content.replace(
      /const handleClose = \(\): React\.ReactElement => \{/g,
      'const handleClose = (): void => {'
    );
  }

  // Fix CardComponents.tsx
  if (file.includes('CardComponents.tsx')) {
    // Check for incomplete function or component
    const lines = content.split('\n');
    let braceCount = 0;
    let inString = false;
    let stringChar = '';
    
    for (const line of lines) {
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const prevChar = i > 0 ? line[i - 1] : '';
        
        if (!inString && (char === '"' || char === "'" || char === '`')) {
          inString = true;
          stringChar = char;
        } else if (inString && char === stringChar && prevChar !== '\\') {
          inString = false;
        } else if (!inString) {
          if (char === '{') braceCount++;
          else if (char === '}') braceCount--;
        }
      }
    }
    
    // Add missing closing braces
    if (braceCount > 0) {
      content += '\n' + '}'.repeat(braceCount);
    }
  }

  // Fix Badge.tsx
  if (file.includes('Badge.tsx')) {
    // Ensure Badge export is complete
    if (!content.includes('Badge.displayName') && content.includes('export function Badge')) {
      content += '\n\nBadge.displayName = \'Badge\';\n';
    }
  }

  // Fix DataTable.tsx
  if (file.includes('DataTable.tsx') && !file.includes('data-table/')) {
    // Check for missing closing braces
    const lines = content.split('\n');
    let braceCount = 0;
    let parenCount = 0;
    
    for (const line of lines) {
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
      parenCount += (line.match(/\(/g) || []).length;
      parenCount -= (line.match(/\)/g) || []).length;
    }
    
    if (braceCount > 0) {
      content += '\n' + '}'.repeat(braceCount);
    }
    if (parenCount > 0) {
      content += ')'.repeat(parenCount);
    }
  }

  // Fix KeyValueList.tsx
  if (file.includes('KeyValueList.tsx')) {
    // Ensure component export is complete
    if (!content.includes('KeyValueList.displayName') && content.includes('export function KeyValueList')) {
      content += '\n\nKeyValueList.displayName = \'KeyValueList\';\n';
    }
  }

  // Fix Tag.tsx
  if (file.includes('Tag.tsx')) {
    // Ensure component export is complete
    if (!content.includes('Tag.displayName') && content.includes('export function Tag')) {
      content += '\n\nTag.displayName = \'Tag\';\n';
    }
  }

  // Fix Tooltip.tsx
  if (file.includes('Tooltip.tsx')) {
    // Check for incomplete component
    if (content.includes('export const Tooltip') && !content.includes('Tooltip.displayName')) {
      const tooltipEnd = content.lastIndexOf('});');
      if (tooltipEnd !== -1) {
        content = content.substring(0, tooltipEnd + 3) + '\n\nTooltip.displayName = \'Tooltip\';\n';
      }
    }
  }

  // Fix data-table/DataTable.tsx
  if (file.includes('data-table/DataTable.tsx')) {
    // Check for missing braces
    const lines = content.split('\n');
    let braceCount = 0;
    
    for (const line of lines) {
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
    }
    
    if (braceCount > 0) {
      content += '\n' + '}'.repeat(braceCount);
    }
  }

  // Fix Form.tsx
  if (file.includes('Form.tsx')) {
    // Add missing variables
    if (content.includes('formClasses') && !content.includes('const formClasses')) {
      const formComponentStart = content.indexOf('export const Form');
      if (formComponentStart !== -1) {
        const insertPos = content.indexOf('{', formComponentStart) + 1;
        content = content.slice(0, insertPos) + `
  const formClasses = className || '';
  const handleSubmit = onSubmit || (() => {});
  const accessibility = {};
` + content.slice(insertPos);
      }
    }
  }

  // Fix unused getCategoryIcon in Alert.tsx
  if (file.includes('Alert.tsx')) {
    // Remove unused getCategoryIcon if it exists but isn't used
    if (content.includes('const getCategoryIcon') && !content.includes('getCategoryIcon(')) {
      const start = content.indexOf('const getCategoryIcon');
      const end = content.indexOf('};', start) + 2;
      content = content.slice(0, start) + content.slice(end);
    }
  }

  return content;
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  content = fixParsingErrors(content, file);

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