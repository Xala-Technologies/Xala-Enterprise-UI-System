#!/usr/bin/env node

/**
 * Script to migrate UI components from raw HTML to semantic components
 * This will update all UI components to use Box, Text, Heading, etc.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mapping of HTML elements to semantic components
const elementMapping = {
  // Container elements
  '<div': '<Box',
  '</div>': '</Box>',
  '<section': '<Box as="section"',
  '</section>': '</Box>',
  '<article': '<Box as="article"',
  '</article>': '</Box>',
  '<aside': '<Box as="aside"',
  '</aside>': '</Box>',
  '<header': '<Box as="header"',
  '</header>': '</Box>',
  '<footer': '<Box as="footer"',
  '</footer>': '</Box>',
  '<main': '<Box as="main"',
  '</main>': '</Box>',
  '<nav': '<Box as="nav"',
  '</nav>': '</Box>',
  
  // Text elements
  '<span': '<Text as="span"',
  '</span>': '</Text>',
  '<p': '<Text as="p"',
  '</p>': '</Text>',
  '<label': '<Text as="label"',
  '</label>': '</Text>',
  '<small': '<Text as="small"',
  '</small>': '</Text>',
  '<strong': '<Text as="strong"',
  '</strong>': '</Text>',
  '<em': '<Text as="em"',
  '</em>': '</Text>',
  
  // Heading elements
  '<h1': '<Heading level={1}',
  '</h1>': '</Heading>',
  '<h2': '<Heading level={2}',
  '</h2>': '</Heading>',
  '<h3': '<Heading level={3}',
  '</h3>': '</Heading>',
  '<h4': '<Heading level={4}',
  '</h4>': '</Heading>',
  '<h5': '<Heading level={5}',
  '</h5>': '</Heading>',
  '<h6': '<Heading level={6}',
  '</h6>': '</Heading>',
  
  // List elements
  '<ul': '<List',
  '</ul>': '</List>',
  '<ol': '<List ordered',
  '</ol>': '</List>',
  '<li': '<ListItem',
  '</li>': '</ListItem>',
  
  // Link elements
  '<a': '<Link',
  '</a>': '</Link>',
  
  // Button elements
  '<button': '<Button',
  '</button>': '</Button>',
};

// Function to check if semantic imports are present
function hasSemanticImports(content) {
  return content.includes("from '../semantic'") || content.includes('from "../semantic"');
}

// Function to add semantic imports
function addSemanticImports(content) {
  if (hasSemanticImports(content)) {
    // Check which components are needed but not imported
    const existingImport = content.match(/import\s*{([^}]+)}\s*from\s*['"]\.\.\/semantic['"]/);
    if (existingImport) {
      const imported = existingImport[1].split(',').map(s => s.trim());
      const needed = [];
      
      if (content.includes('<Box') && !imported.includes('Box')) needed.push('Box');
      if (content.includes('<Text') && !imported.includes('Text')) needed.push('Text');
      if (content.includes('<Heading') && !imported.includes('Heading')) needed.push('Heading');
      if (content.includes('<Button') && !imported.includes('Button')) needed.push('Button');
      if (content.includes('<Link') && !imported.includes('Link')) needed.push('Link');
      if (content.includes('<List') && !imported.includes('List')) needed.push('List');
      if (content.includes('<ListItem') && !imported.includes('ListItem')) needed.push('ListItem');
      if (content.includes('<Image') && !imported.includes('Image')) needed.push('Image');
      
      if (needed.length > 0) {
        const allImports = [...imported, ...needed].sort();
        const newImport = `import { ${allImports.join(', ')} } from '../semantic'`;
        content = content.replace(existingImport[0], newImport);
      }
    }
    return content;
  }
  
  // Add new import after React import
  const components = [];
  
  // Check which components will be needed
  if (/<div|<section|<article|<aside|<header|<footer|<main|<nav/.test(content)) {
    components.push('Box');
  }
  if (/<span|<p\s|<p>|<label|<small|<strong|<em/.test(content)) {
    components.push('Text');
  }
  if (/<h[1-6]/.test(content)) {
    components.push('Heading');
  }
  if (/<button/.test(content)) {
    components.push('Button');
  }
  if (/<a\s|<a>/.test(content)) {
    components.push('Link');
  }
  if (/<ul|<ol/.test(content)) {
    components.push('List');
  }
  if (/<li/.test(content)) {
    components.push('ListItem');
  }
  if (/<img/.test(content)) {
    components.push('Image');
  }
  
  if (components.length > 0) {
    const importStatement = `import { ${components.join(', ')} } from '../semantic';`;
    
    // Find the right place to insert
    const reactImportMatch = content.match(/import.*from\s+['"]react['"]/);
    if (reactImportMatch) {
      const insertIndex = content.indexOf(reactImportMatch[0]) + reactImportMatch[0].length;
      content = content.slice(0, insertIndex) + '\n' + importStatement + content.slice(insertIndex);
    }
  }
  
  return content;
}

// Function to migrate a single file
function migrateFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Skip if already migrated (has semantic imports and no raw HTML)
  if (hasSemanticImports(content) && !/<div|<span|<button|<h[1-6]|<p\s|<p>|<a\s|<a>/.test(content)) {
    console.log(`  ✓ Already migrated`);
    return false;
  }
  
  // Apply replacements
  let changed = false;
  for (const [htmlElement, semanticElement] of Object.entries(elementMapping)) {
    if (content.includes(htmlElement)) {
      content = content.replace(new RegExp(escapeRegex(htmlElement), 'g'), semanticElement);
      changed = true;
    }
  }
  
  // Handle special cases
  // Fix img tags
  content = content.replace(/<img/g, '<Image');
  content = content.replace(/\/>/g, ' />'); // Ensure self-closing tags have space
  
  // Add semantic imports if needed
  if (changed) {
    content = addSemanticImports(content);
  }
  
  // Write back if changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Migrated successfully`);
    return true;
  }
  
  console.log(`  - No changes needed`);
  return false;
}

// Helper function to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Main execution
function main() {
  const uiComponentsPath = path.join(__dirname, '..', 'src', 'components', 'ui');
  const files = glob.sync(path.join(uiComponentsPath, '**/*.tsx'));
  
  console.log(`Found ${files.length} component files to process\n`);
  
  let migratedCount = 0;
  for (const file of files) {
    if (migrateFile(file)) {
      migratedCount++;
    }
  }
  
  console.log(`\n✅ Migration complete!`);
  console.log(`   Migrated ${migratedCount} files`);
  console.log(`   Skipped ${files.length - migratedCount} files (already migrated or no changes needed)`);
}

// Run the migration
main();