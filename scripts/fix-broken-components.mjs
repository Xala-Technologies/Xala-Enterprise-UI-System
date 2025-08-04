#!/usr/bin/env node

/**
 * Fix broken components with malformed JSX
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentsWithErrors = [
  'src/components/ui/combobox.tsx',
  'src/components/ui/command-palette.tsx',
  'src/components/ui/dropdown-menu.tsx',
  'src/components/ui/dropdown.tsx',
  'src/components/ui/multi-select.tsx',
  'src/components/ui/calendar.tsx',
  'src/components/ui/date-picker.tsx',
  'src/components/ui/time-picker.tsx',
  'src/components/ui/context-menu.tsx',
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
  
  // Fix common broken patterns
  const fixes = [
    // Fix broken Box tags
    [/<Box\s*`[^>]*\}>/g, '<Box>'],
    [/<Box\s*\$\{[^}]*\}\s*`>/g, '<Box>'],
    [/<Box\s*\$\{[^}]*\}`\s*\}>/g, '<Box>'],
    [/<Box`,/g, '<Box className="'],
    
    // Fix broken Text tags
    [/<Text\s*as="span"\s*[^>]*\d+`[^>]*>/g, '<Text as="span">'],
    [/<Text\s*[^>]*\d+A`[^>]*>/g, '<Text>'],
    
    // Fix style props
    [/style=\{\{[^}]*\}\}/g, ''],
    [/style=\{[^}]*\}/g, ''],
    
    // Fix broken className props
    [/className=\{`[^`]*`\}/g, match => {
      // Try to extract the classes
      const classes = match.match(/className=\{`([^`]*)`\}/)?.[1];
      return classes ? `className="${classes}"` : 'className=""';
    }],
    
    // Fix trailing }}> patterns
    [/\}\}>/g, '>'],
    [/\s+\}\}$/gm, ''],
    
    // Fix broken JSX closing tags
    [/<\/Box>>/g, '</Box>'],
    [/<\/Text>>/g, '</Text>'],
    
    // Remove any remaining inline styles
    [/\sstyle=\{\{[^}]*\}\}/g, ''],
    
    // Fix broken attribute patterns
    [/\s+\d+`/g, ''],
    [/\s+\d+A`/g, ''],
    
    // Fix template literal remnants
    [/\$\{[^}]*\}/g, ''],
    [/`\s*}/g, '}'],
    [/{`\s*/g, '{'],
  ];
  
  fixes.forEach(([pattern, replacement]) => {
    if (content.match(pattern)) {
      if (typeof replacement === 'function') {
        content = content.replace(pattern, replacement);
      } else {
        content = content.replace(pattern, replacement);
      }
      modified = true;
    }
  });
  
  // Ensure cn import is present if needed
  if (content.includes('cn(') && !content.includes("from '../../lib/utils/cn'")) {
    const importMatches = content.match(/^import.*$/gm);
    if (importMatches && importMatches.length > 0) {
      const lastImport = importMatches[importMatches.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      content = content.slice(0, lastImportIndex + lastImport.length) + 
                "\nimport { cn } from '../../lib/utils/cn';" + 
                content.slice(lastImportIndex + lastImport.length);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  
  console.log(`ℹ️  No fixes needed: ${filePath}`);
  return false;
}

function main() {
  console.log('Fixing broken components...\n');
  
  let fixedCount = 0;
  let failedComponents = [];
  
  componentsWithErrors.forEach(componentFile => {
    try {
      if (fixComponent(componentFile)) {
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Failed to fix ${componentFile}:`, error.message);
      failedComponents.push(componentFile);
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