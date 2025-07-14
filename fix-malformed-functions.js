#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix malformed function definitions
function fixMalformedFunctions(content, file) {
  // Fix Tooltip.tsx
  if (file.includes('Tooltip.tsx')) {
    // Fix incomplete getClassificationIcon
    content = content.replace(
      /const getClassificationIcon = \(level: string\): string => \{\s*$/m,
      `const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};`
    );
    
    // Add getCategoryIcon if missing
    if (!content.includes('const getCategoryIcon')) {
      const insertPos = content.indexOf('const getTooltipStyles');
      if (insertPos !== -1) {
        content = content.slice(0, insertPos) + `
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

` + content.slice(insertPos);
      }
    }
  }

  // Fix Tag.tsx
  if (file.includes('Tag.tsx')) {
    // Fix incomplete getClassificationIcon
    content = content.replace(
      /const getClassificationIcon = \(level: string\): string => \{\s*$/m,
      `const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};`
    );
    
    // Add getCategoryIcon if missing
    if (!content.includes('const getCategoryIcon')) {
      const insertPos = content.indexOf('export function Tag');
      if (insertPos !== -1) {
        content = content.slice(0, insertPos) + `
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

` + content.slice(insertPos);
      }
    }
  }

  // Fix KeyValueList.tsx
  if (file.includes('KeyValueList.tsx')) {
    // Fix malformed getStatusIcon
    const malformedPattern = /const getStatusIcon = \(status: string\): string => \{[\s\S]*?\};\s*\nconst StatusIndicator/;
    if (malformedPattern.test(content)) {
      content = content.replace(malformedPattern, `const getStatusIcon = (status: string): string => {
  const icons = {
    active: '✅',
    inactive: '⏸️',
    pending: '⏳',
    error: '❌',
  };
  return icons[status as keyof typeof icons] || '📊';
};

const StatusIndicator`);
    }
    
    // Remove duplicate return statement
    content = content.replace(/\n\s*return icons\[status as keyof typeof icons\] \|\| '📊';\s*\};\s*\n/g, '\n');
  }

  // Fix DataTable.tsx
  if (file.includes('DataTable.tsx')) {
    // Fix malformed getStatusIcon
    const malformedPattern = /const getStatusIcon = \(status: string\): string => \{[\s\S]*?\};\s*\nconst StatusIndicator/;
    if (malformedPattern.test(content)) {
      content = content.replace(malformedPattern, `const getStatusIcon = (status: string): string => {
  const icons = {
    active: '✅',
    inactive: '⏸️',
    pending: '⏳',
    error: '❌',
  };
  return icons[status as keyof typeof icons] || '📊';
};

const StatusIndicator`);
    }
    
    // Remove duplicate return statement
    content = content.replace(/\n\s*return icons\[status as keyof typeof icons\] \|\| '📊';\s*\};\s*\n/g, '\n');
  }

  // Fix Badge.tsx
  if (file.includes('Badge.tsx')) {
    // Fix malformed getPriorityIcon
    const malformedPattern = /const getPriorityIcon = \(priority: string\): string => \{[\s\S]*?\};\s*\nconst PriorityIndicator/;
    if (malformedPattern.test(content)) {
      content = content.replace(malformedPattern, `const getPriorityIcon = (priority: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[priority as keyof typeof icons] || '■';
};

const PriorityIndicator`);
    }
    
    // Remove duplicate return statement
    content = content.replace(/\n\s*return icons\[priority as keyof typeof icons\] \|\| '■';\s*\};\s*\n/g, '\n');
  }

  // Fix Toast.tsx
  if (file.includes('action-feedback/Toast.tsx')) {
    // Fix malformed getPriorityIcon
    const malformedPattern = /const getPriorityIcon = \(priority: string\): string => \{[\s\S]*?\};\s*\nconst PriorityIndicator/;
    if (malformedPattern.test(content)) {
      content = content.replace(malformedPattern, `const getPriorityIcon = (priority: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[priority as keyof typeof icons] || '■';
};

const PriorityIndicator`);
    }
    
    // Remove duplicate return statement and fix structure
    content = content.replace(/\n\s*return icons\[priority as keyof typeof icons\] \|\| '■';\s*\};\s*\n/g, '\n');
    
    // Fix duplicate function parameter list
    content = content.replace(/\}: \{ priority: string \}\): React\.ReactElement => \{[\s\S]*?\}: \{ priority\?: string \}\): React\.ReactElement => \{/g, '}: { priority?: string }): React.ReactElement => {');
  }

  // Remove extra newlines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  return content;
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  content = fixMalformedFunctions(content, file);

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