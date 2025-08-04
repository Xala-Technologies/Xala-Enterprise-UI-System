#!/usr/bin/env node

/**
 * Fix ES Module imports by adding .js extensions
 * This is required for proper ES module resolution in Node.js
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const DIST_DIR = './dist';

async function fixImportsInFile(filePath) {
  try {
    let content = await readFile(filePath, 'utf-8');
    let modified = false;

    // Fix relative imports to add .js extension
    const relativeImportRegex = /from\s+['"](\.[^'"]+)(?<!\.js)(?<!\.css)(?<!\.json)['"]/g;
    content = content.replace(relativeImportRegex, (match, importPath) => {
      modified = true;
      return `from '${importPath}.js'`;
    });

    // Fix @/ imports to relative paths
    const aliasImportRegex = /from\s+['"]@\/([^'"]+)['"]/g;
    content = content.replace(aliasImportRegex, (match, importPath) => {
      modified = true;
      // Calculate relative path based on file location
      const depth = filePath.split('/').length - 2; // Subtract 'dist' and filename
      const prefix = '../'.repeat(Math.max(0, depth - 1));
      return `from '${prefix}${importPath}.js'`;
    });

    if (modified) {
      await writeFile(filePath, content, 'utf-8');
      console.log(`Fixed imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && (extname(entry.name) === '.js' || extname(entry.name) === '.mjs')) {
      await fixImportsInFile(fullPath);
    }
  }
}

async function main() {
  try {
    console.log('Fixing ES module imports...');
    await processDirectory(DIST_DIR);
    console.log('Import fixing complete!');
  } catch (error) {
    console.error('Error fixing imports:', error);
    process.exit(1);
  }
}

main();