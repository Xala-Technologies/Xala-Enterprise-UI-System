#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix remaining function issues
function fixRemainingFunctions(content, file) {
  // Fix incomplete function definitions with missing return statements
  content = content.replace(
    /const getStatusIcon = \(status: string\): string => \{\s*const icons = \{[\s\S]*?\};\s*const StatusIndicator/g,
    `const getStatusIcon = (status: string): string => {
  const icons = {
    active: '✅',
    inactive: '⏸️',
    pending: '⏳',
    error: '❌',
  };
  return icons[status as keyof typeof icons] || '📊';
};

const StatusIndicator`
  );

  content = content.replace(
    /const getPriorityIcon = \(priority: string\): string => \{\s*const icons = \{[\s\S]*?\};\s*const PriorityIndicator/g,
    `const getPriorityIcon = (priority: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[priority as keyof typeof icons] || '■';
};

const PriorityIndicator`
  );

  // Fix duplicate parameter declaration in Toast
  if (file.includes('Toast.tsx')) {
    content = content.replace(
      /\}: \{ priority: string \}\): React\.ReactElement => \{[\s\S]*?\}: \{ priority\?: string \}\): React\.ReactElement => \{/,
      '}: { priority?: string }): React.ReactElement => {'
    );
  }

  // Remove empty comment lines
  content = content.replace(/\/\/ Helper function\n\/\//g, '//');
  content = content.replace(/\/\/ Helper function\n\n/g, '\n');

  // Clean up extra newlines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  return content;
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  content = fixRemainingFunctions(content, file);

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