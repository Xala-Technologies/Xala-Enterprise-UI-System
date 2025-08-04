#!/usr/bin/env node

/**
 * Migration script for remaining components with useTokens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Remaining components to migrate
const componentsToMigrate = [
  'src/components/ui/action-bar/ActionBar.tsx',
  'src/components/ui/action-bar/ActionButton.tsx',
  'src/components/airbnb/AirbnbCard.tsx',
  'src/components/platform/tablet/SplitView.tsx',
  'src/components/platform/mobile/SwipeableDrawer.tsx',
  'src/components/layout-preview/LayoutPreview.tsx',
  'src/components/layout-preview/LayoutGallery.tsx',
  'src/components/navigation/WebNavbar.tsx',
  'src/components/ThemeManager/ThemeManagerContainer.tsx',
  'src/components/performance/LazyImage.tsx'
];

function getSemanticImportPath(filePath) {
  // Calculate relative path to semantic components
  const depth = filePath.split('/').filter(p => p && p !== '.').length - 2; // -2 for src/components
  if (depth === 1) return '../semantic';
  if (depth === 2) return '../../semantic';
  if (depth === 3) return '../../../semantic';
  return '../semantic';
}

function migrateComponent(filePath) {
  console.log(`Migrating: ${filePath}`);
  
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  // Remove useTokens hook import and usage
  if (content.includes("import { useTokens }") || content.includes("useTokens()")) {
    content = content.replace(/import\s+{\s*useTokens\s*}\s+from\s+['"].*?['"];?\n?/g, '');
    content = content.replace(/const\s+{[^}]+}\s*=\s*useTokens\(\);?\n?/g, '');
    content = content.replace(/const\s+\w+\s*=\s*useTokens\(\);?\n?/g, '');
    modified = true;
  }
  
  // Get correct import path for semantic components
  const semanticPath = getSemanticImportPath(filePath);
  const SEMANTIC_IMPORT = `import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '${semanticPath}';`;
  
  // Add semantic import if not present and component uses raw HTML
  if (!content.includes("from '../semantic'") && !content.includes('from "../../semantic"') && !content.includes('from "../../../semantic"')) {
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
    
    // Headings
    [/<h1\b/g, '<Heading level={1}'],
    [/<\/h1>/g, '</Heading>'],
    [/<h2\b/g, '<Heading level={2}'],
    [/<\/h2>/g, '</Heading>'],
    [/<h3\b/g, '<Heading level={3}'],
    [/<\/h3>/g, '</Heading>'],
    
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
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Migrated: ${filePath}`);
    return true;
  }
  
  console.log(`ℹ️  No changes needed: ${filePath}`);
  return false;
}

function main() {
  console.log('Starting migration of remaining components...\n');
  
  let migratedCount = 0;
  let failedComponents = [];
  
  componentsToMigrate.forEach(componentFile => {
    try {
      if (migrateComponent(componentFile)) {
        migratedCount++;
      }
    } catch (error) {
      console.error(`❌ Failed to migrate ${componentFile}:`, error.message);
      failedComponents.push(componentFile);
    }
  });
  
  console.log('\n=== Migration Summary ===');
  console.log(`✅ Successfully migrated: ${migratedCount} components`);
  if (failedComponents.length > 0) {
    console.log(`❌ Failed: ${failedComponents.length} components`);
    console.log('Failed components:', failedComponents.join(', '));
  }
}

main();