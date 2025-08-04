#!/usr/bin/env node

/**
 * Final fix for remaining component issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const problematicFiles = [
  'src/components/ui/footer.tsx',
  'src/components/ui/calendar.tsx',
  'src/components/ui/dropdown.tsx',
  'src/components/ui/context-menu.tsx',
  'src/components/ui/date-picker.tsx',
  'src/components/ui/dropdown-menu.tsx',
];

function fixComponent(filePath) {
  console.log(`Fixing: ${filePath}`);
  
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  // Fix patterns
  const patterns = [
    // Fix unclosed event handlers
    [/onMouseEnter=\{[^}]*\}\s*onMouseLeave/g, (match) => {
      // Check if there's a missing closing brace
      const braceCount = (match.match(/\{/g) || []).length - (match.match(/\}/g) || []).length;
      if (braceCount > 0) {
        return match.replace(/onMouseLeave/, '}}\n            onMouseLeave');
      }
      return match;
    }],
    
    // Fix onMouseLeave missing closing braces
    [/onMouseLeave=\{[^}]*\}\s*>/g, (match) => {
      const braceCount = (match.match(/\{/g) || []).length - (match.match(/\}/g) || []).length;
      if (braceCount > 0) {
        return match.replace(/>/, '}}\n          >');
      }
      return match;
    }],
    
    // Fix onFocus missing closing braces
    [/onFocus=\{[^}]*\}\s*onBlur/g, (match) => {
      const braceCount = (match.match(/\{/g) || []).length - (match.match(/\}/g) || []).length;
      if (braceCount > 0) {
        return match.replace(/onBlur/, '}}\n            onBlur');
      }
      return match;
    }],
    
    // Remove all inline styles with template literals
    [/style=\{[^}]*`[^}]*\}/g, ''],
    [/\sstyle=\{\{[^}]*`[^}]*\}\}/g, ''],
    
    // Fix broken template literals in attributes
    [/\s+`[^`]*`\s*,/g, ''],
    [/\s+`[^`]*`\s*}/g, '}'],
    
    // Fix broken className with template literals
    [/className=\{`[^`]*`\}/g, (match) => {
      const classes = match.match(/className=\{`([^`]*)`\}/)?.[1];
      return classes ? `className="${classes}"` : 'className=""';
    }],
    
    // Remove style props completely
    [/\sstyle=\{[^}]*\}/g, ''],
    [/\sstyle=\{\{[^}]*\}\}/g, ''],
    
    // Fix aria-label with template literals
    [/aria-label=\{[^}]*`[^}]*\}/g, (match) => {
      // Try to extract meaningful label
      return 'aria-label="Action"';
    }],
    
    // Fix broken Box/Text tags
    [/<Box\s*`[^>]*>/g, '<Box>'],
    [/<Text\s*`[^>]*>/g, '<Text>'],
    [/<Box\s*,/g, '<Box className="'],
    [/<Text\s*,/g, '<Text className="'],
    
    // Remove dangling template literal markers
    [/\s+`\s*}/g, '}'],
    [/\s+`\s*>/g, '>'],
    [/\s+`\s*,/g, ','],
    
    // Fix button/Text mismatch
    [/<button([^>]*)>([\s\S]*?)<\/Text>/g, '<button$1>$2</button>'],
    [/<Text\s+as="button"([^>]*)>([\s\S]*?)<\/button>/g, '<Text as="button"$1>$2</Text>'],
  ];
  
  patterns.forEach(([pattern, replacement]) => {
    if (typeof replacement === 'function') {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    } else {
      if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    }
  });
  
  // Ensure cn is imported if used
  if (content.includes('cn(') && !content.includes("from '../../lib/utils/cn'")) {
    const importMatches = content.match(/^import.*$/gm);
    if (importMatches && importMatches.length > 0) {
      const semanticImportIndex = content.indexOf("from '../semantic'");
      if (semanticImportIndex > -1) {
        const endOfLine = content.indexOf('\n', semanticImportIndex);
        content = content.slice(0, endOfLine) + 
                  "\nimport { cn } from '../../lib/utils/cn';" + 
                  content.slice(endOfLine);
        modified = true;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  
  console.log(`ℹ️  No changes needed: ${filePath}`);
  return false;
}

function main() {
  console.log('Running final fixes for problematic components...\n');
  
  let fixedCount = 0;
  let failedComponents = [];
  
  problematicFiles.forEach(file => {
    try {
      if (fixComponent(file)) {
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Failed to fix ${file}:`, error.message);
      failedComponents.push(file);
    }
  });
  
  console.log('\n=== Fix Summary ===');
  console.log(`✅ Successfully fixed: ${fixedCount} components`);
  if (failedComponents.length > 0) {
    console.log(`❌ Failed: ${failedComponents.length} components`);
    console.log('Failed components:', failedComponents.join(', '));
  }
}

main();