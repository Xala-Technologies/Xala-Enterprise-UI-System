#!/usr/bin/env node

/**
 * Migration script to convert UI components to use semantic components
 * Removes useTokens() hooks and replaces raw HTML with semantic components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Components that need migration
const componentsToMigrate = [
  'dropdown-menu.tsx',
  'textarea.tsx', 
  'divider.tsx',
  'separator.tsx',
  'skeleton.tsx',
  'drawer.tsx',
  'footer.tsx',
  'sidebar.tsx',
  'multi-select.tsx',
  'dropdown.tsx',
  'combobox.tsx',
  'spacing.tsx',
  'main-content.tsx',
  'header.tsx',
  'grid.tsx',
  'container.tsx',
  'command-palette.tsx',
  'code-block.tsx',
  'calendar.tsx',
  'typography.tsx',
  'tree-view.tsx',
  'context-menu.tsx',
  'tooltip-old.tsx',
  'timeline.tsx',
  'time-picker.tsx',
  'scroll-area.tsx',
  'pagination.tsx',
  'message-bubble.tsx',
  'icon-button.tsx',
  'date-picker.tsx',
  'box.tsx'
];

const SEMANTIC_IMPORT = `import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';`;

function migrateComponent(filePath) {
  console.log(`Migrating: ${path.basename(filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Remove useTokens hook import and usage
  if (content.includes("import { useTokens }") || content.includes("useTokens()")) {
    content = content.replace(/import\s+{\s*useTokens\s*}\s+from\s+['"].*?['"];?\n?/g, '');
    content = content.replace(/const\s+{[^}]+}\s*=\s*useTokens\(\);?\n?/g, '');
    content = content.replace(/const\s+\w+\s*=\s*useTokens\(\);?\n?/g, '');
    modified = true;
  }
  
  // Add semantic import if not present and component uses raw HTML
  if (!content.includes("from '../semantic'") && !content.includes('from "../semantic"')) {
    if (content.match(/<(div|span|p|h[1-6]|button|input|ul|ol|li|a|section|article|header|footer|nav|aside|main)\b/)) {
      // Add import after the last import statement
      const importMatches = content.match(/^import.*$/gm);
      if (importMatches && importMatches.length > 0) {
        const lastImport = importMatches[importMatches.length - 1];
        const lastImportIndex = content.lastIndexOf(lastImport);
        content = content.slice(0, lastImportIndex + lastImport.length) + 
                  '\n' + SEMANTIC_IMPORT + 
                  content.slice(lastImportIndex + lastImport.length);
        modified = true;
      }
    }
  }
  
  // Replace HTML elements with semantic components
  const replacements = [
    // Container elements
    [/<div\b/g, '<Box'],
    [/<\/div>/g, '</Box>'],
    [/<section\b/g, '<Box as="section"'],
    [/<\/section>/g, '</Box>'],
    [/<article\b/g, '<Box as="article"'],
    [/<\/article>/g, '</Box>'],
    [/<header\b/g, '<Box as="header"'],
    [/<\/header>/g, '</Box>'],
    [/<footer\b/g, '<Box as="footer"'],
    [/<\/footer>/g, '</Box>'],
    [/<nav\b/g, '<Box as="nav"'],
    [/<\/nav>/g, '</Box>'],
    [/<aside\b/g, '<Box as="aside"'],
    [/<\/aside>/g, '</Box>'],
    [/<main\b/g, '<Box as="main"'],
    [/<\/main>/g, '</Box>'],
    
    // Text elements
    [/<span\b/g, '<Text as="span"'],
    [/<\/span>/g, '</Text>'],
    [/<p\b/g, '<Text'],
    [/<\/p>/g, '</Text>'],
    [/<label\b/g, '<Text as="label"'],
    [/<\/label>/g, '</Text>'],
    [/<small\b/g, '<Text as="small"'],
    [/<\/small>/g, '</Text>'],
    [/<strong\b/g, '<Text as="strong"'],
    [/<\/strong>/g, '</Text>'],
    [/<em\b/g, '<Text as="em"'],
    [/<\/em>/g, '</Text>'],
    [/<mark\b/g, '<Text as="mark"'],
    [/<\/mark>/g, '</Text>'],
    [/<code\b/g, '<Text as="code"'],
    [/<\/code>/g, '</Text>'],
    [/<kbd\b/g, '<Text as="kbd"'],
    [/<\/kbd>/g, '</Text>'],
    
    // Headings
    [/<h1\b/g, '<Heading level={1}'],
    [/<\/h1>/g, '</Heading>'],
    [/<h2\b/g, '<Heading level={2}'],
    [/<\/h2>/g, '</Heading>'],
    [/<h3\b/g, '<Heading level={3}'],
    [/<\/h3>/g, '</Heading>'],
    [/<h4\b/g, '<Heading level={4}'],
    [/<\/h4>/g, '</Heading>'],
    [/<h5\b/g, '<Heading level={5}'],
    [/<\/h5>/g, '</Heading>'],
    [/<h6\b/g, '<Heading level={6}'],
    [/<\/h6>/g, '</Heading>'],
    
    // Lists
    [/<ul\b/g, '<List variant="unordered"'],
    [/<\/ul>/g, '</List>'],
    [/<ol\b/g, '<List variant="ordered"'],
    [/<\/ol>/g, '</List>'],
    [/<li\b/g, '<ListItem'],
    [/<\/li>/g, '</ListItem>'],
    
    // Links
    [/<a\b/g, '<Link'],
    [/<\/a>/g, '</Link>'],
    
    // Form elements (avoid conflicts with existing Button/Input components)
    [/<button\b(?![^>]*type=)/g, '<Text as="button"'],
    [/<\/button>/g, '</Text>'],
    [/<input\b(?![^>]*type=)/g, '<SemanticInput'],
  ];
  
  replacements.forEach(([pattern, replacement]) => {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });
  
  // Remove inline styles
  if (content.includes('style={') || content.includes('style={{')) {
    content = content.replace(/\sstyle={{[^}]*}}/g, '');
    content = content.replace(/\sstyle={[^}]*}/g, '');
    modified = true;
  }
  
  // Fix any broken imports
  content = content.replace(/import\s+React,\s*{\s*}/g, 'import React from');
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Migrated: ${path.basename(filePath)}`);
    return true;
  }
  
  return false;
}

function main() {
  console.log('Starting semantic component migration...\n');
  
  const componentsDir = path.join(__dirname, '..', 'src', 'components', 'ui');
  let migratedCount = 0;
  let failedComponents = [];
  
  componentsToMigrate.forEach(componentFile => {
    const filePath = path.join(componentsDir, componentFile);
    if (fs.existsSync(filePath)) {
      try {
        if (migrateComponent(filePath)) {
          migratedCount++;
        }
      } catch (error) {
        console.error(`❌ Failed to migrate ${componentFile}:`, error.message);
        failedComponents.push(componentFile);
      }
    } else {
      console.log(`⚠️  File not found: ${componentFile}`);
    }
  });
  
  console.log('\n=== Migration Summary ===');
  console.log(`✅ Successfully migrated: ${migratedCount} components`);
  if (failedComponents.length > 0) {
    console.log(`❌ Failed: ${failedComponents.length} components`);
    console.log('Failed components:', failedComponents.join(', '));
  }
  
  console.log('\n🎯 Next steps:');
  console.log('1. Run: pnpm run type-check');
  console.log('2. Fix any TypeScript errors');
  console.log('3. Run: pnpm run test');
  console.log('4. Run: pnpm run build');
}

main();