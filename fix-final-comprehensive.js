#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix test file parsing errors
function fixTestFiles(content, file) {
  if (file.includes('.test.') || file.includes('.spec.')) {
    // Fix unused React import
    content = content.replace(/import React from 'react';\n/g, '');
    
    // Fix unused parameter prefixes  
    content = content.replace(/\(\): void => \{/g, '(): void => {');
    content = content.replace(/\(\): Promise<void> => \{/g, '(): Promise<void> => {');
    
    // Fix async functions
    content = content.replace(/async \(\): Promise<void> => \{/g, 'async (): Promise<void> => {');
  }
  return content;
}

// Fix type files
function fixTypeFiles(content, file) {
  if (file.includes('/types/')) {
    // Remove unused React imports from type files
    if (!content.includes('React.') && !content.includes('ReactNode') && !content.includes('ReactElement')) {
      content = content.replace(/import React from 'react';\n/g, '');
      content = content.replace(/import \* as React from 'react';\n/g, '');
    }
    
    // Fix unused parameters with underscore prefix
    content = content.replace(/\(event: /g, '(_event: ');
    content = content.replace(/\(value: /g, '(_value: ');
    content = content.replace(/\(checked: /g, '(_checked: ');
    content = content.replace(/\(isValid: /g, '(_isValid: ');
    content = content.replace(/\(errors: /g, '(_errors: ');
    content = content.replace(/\(orgData: /g, '(_orgData: ');
    content = content.replace(/\(row: /g, '(_row: ');
    content = content.replace(/\(column: /g, '(_column: ');
    content = content.replace(/\(index: /g, '(_index: ');
    content = content.replace(/\(item: /g, '(_item: ');
    content = content.replace(/\(action: /g, '(_action: ');
    content = content.replace(/\(sortBy: /g, '(_sortBy: ');
    content = content.replace(/\(sortOrder: /g, '(_sortOrder: ');
    content = content.replace(/\(page: /g, '(_page: ');
    content = content.replace(/\(pageSize: /g, '(_pageSize: ');
    content = content.replace(/\(selectedRows: /g, '(_selectedRows: ');
    
    // Fix already prefixed with underscore
    content = content.replace(/\(_event: /g, '(_event: ');
    content = content.replace(/\(_value: /g, '(_value: ');
    
    // Fix t function
    content = content.replace(/const t = \(key: string\) => key;\n/g, '');
    content = content.replace(/const t = \(key: string\): string => key;\n/g, '');
    
    // Fix unused format in data-display.types.ts
    content = content.replace(/(\s+)format =([^,]*),/g, '$1_format =$2,');
  }
  return content;
}

// Fix component files
function fixComponentFiles(content, file) {
  // Fix parsing errors in semantic-token-system.ts
  if (file.includes('semantic-token-system.ts')) {
    // Find and fix missing closing braces
    const lines = content.split('\n');
    let braceCount = 0;
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        const prevChar = j > 0 ? line[j - 1] : '';
        
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

  // Fix Modal component specific issues
  if (file.includes('Modal.tsx')) {
    // Fix incomplete function definitions
    const modalExportRegex = /export const Modal = React\.forwardRef<HTMLDivElement, ModalProps>\(\(props, ref\): React\.ReactElement => \{[\s\S]*$/;
    if (modalExportRegex.test(content) && !content.includes('Modal.displayName')) {
      // Check if the implementation is incomplete
      const lastBraceIndex = content.lastIndexOf('}');
      const secondLastBraceIndex = content.lastIndexOf('}', lastBraceIndex - 1);
      
      if (secondLastBraceIndex === -1 || !content.substring(secondLastBraceIndex).includes('});')) {
        content = content.substring(0, lastBraceIndex + 1) + '\n});\n\nModal.displayName = \'Modal\';\n';
      }
    }
  }

  // Fix Toast component
  if (file.includes('Toast.tsx')) {
    // Similar fix for Toast
    const toastExportRegex = /export const Toast = React\.forwardRef<HTMLDivElement, ToastProps>\(\(props, ref\): React\.ReactElement => \{[\s\S]*$/;
    if (toastExportRegex.test(content) && !content.includes('Toast.displayName')) {
      const lastBraceIndex = content.lastIndexOf('}');
      const secondLastBraceIndex = content.lastIndexOf('}', lastBraceIndex - 1);
      
      if (secondLastBraceIndex === -1 || !content.substring(secondLastBraceIndex).includes('});')) {
        content = content.substring(0, lastBraceIndex + 1) + '\n});\n\nToast.displayName = \'Toast\';\n';
      }
    }
  }

  // Fix missing helper functions
  if (file.includes('platform/mobile/MobileHeader.tsx') || file.includes('layout/Card.tsx') || 
      file.includes('data-display/') || file.includes('action-feedback/Toast.tsx')) {
    // Add getClassificationIcon if used but not defined
    if (content.includes('getClassificationIcon(') && !content.includes('const getClassificationIcon')) {
      const helperFunction = `
// Helper function
const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

`;
      // Insert after imports
      const importEnd = content.lastIndexOf('import ');
      const lineEnd = content.indexOf('\n', importEnd);
      content = content.slice(0, lineEnd + 1) + helperFunction + content.slice(lineEnd + 1);
    }

    // Add getCategoryIcon if used but not defined
    if (content.includes('getCategoryIcon(') && !content.includes('const getCategoryIcon')) {
      const helperFunction = `
// Helper function
const getCategoryIcon = (category: string): string => {
  const icons = {
    system: '⚙️',
    validation: '✅',
    security: '🔒',
    process: '🔄',
    user: '👤',
  };
  return icons[category as keyof typeof icons] || '📋';
};

`;
      // Insert after imports or after getClassificationIcon
      if (content.includes('const getClassificationIcon')) {
        const insertPos = content.indexOf('};', content.indexOf('const getClassificationIcon')) + 3;
        content = content.slice(0, insertPos) + helperFunction + content.slice(insertPos);
      } else {
        const importEnd = content.lastIndexOf('import ');
        const lineEnd = content.indexOf('\n', importEnd);
        content = content.slice(0, lineEnd + 1) + helperFunction + content.slice(lineEnd + 1);
      }
    }

    // Add getStatusIcon if used but not defined
    if (content.includes('getStatusIcon(') && !content.includes('const getStatusIcon')) {
      const helperFunction = `
// Helper function
const getStatusIcon = (status: string): string => {
  const icons = {
    active: '✅',
    inactive: '⏸️',
    pending: '⏳',
    error: '❌',
  };
  return icons[status as keyof typeof icons] || '📊';
};

`;
      // Insert after other helper functions
      const insertPos = content.lastIndexOf('};') + 3;
      content = content.slice(0, insertPos) + helperFunction + content.slice(insertPos);
    }

    // Add getPriorityIcon if used but not defined
    if (content.includes('getPriorityIcon(') && !content.includes('const getPriorityIcon')) {
      const helperFunction = `
// Helper function
const getPriorityIcon = (priority: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[priority as keyof typeof icons] || '■';
};

`;
      // Insert after other helper functions
      const insertPos = content.lastIndexOf('};') + 3;
      content = content.slice(0, insertPos) + helperFunction + content.slice(insertPos);
    }
  }

  // Fix t function usage
  if (content.includes('const t = (key: string) => key;')) {
    content = content.replace(/const t = \(key: string\) => key;\n/g, '');
    content = content.replace(/const t = \(key: string\): string => key;\n/g, '');
    // Replace t() calls with the string directly
    content = content.replace(/t\('([^']+)'\)/g, "'$1'");
    content = content.replace(/t\("([^"]+)"\)/g, '"$1"');
  }

  // Fix missing getClassificationText
  if (content.includes('getClassificationText(') && !content.includes('const getClassificationText')) {
    const helperFunction = `
// Helper function
const getClassificationText = (level: string): string => {
  const texts = {
    'ÅPEN': 'Open',
    'BEGRENSET': 'Restricted',
    'KONFIDENSIELT': 'Confidential',
    'HEMMELIG': 'Secret',
  };
  return texts[level as keyof typeof texts] || level;
};

`;
    const insertPos = content.indexOf('const ') || content.indexOf('export ');
    content = content.slice(0, insertPos) + helperFunction + content.slice(insertPos);
  }

  // Fix unused _size parameter
  content = content.replace(/size: string } = \({ onRemove, _size }\)/g, 'size: string } = ({ onRemove, size: _size })');

  return content;
}

// Main processing function
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  // Apply fixes based on file type
  content = fixTestFiles(content, file);
  content = fixTypeFiles(content, file);
  content = fixComponentFiles(content, file);

  // Write if changed
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