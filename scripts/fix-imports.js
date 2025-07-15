/**
 * Fix import paths in compiled JavaScript files
 * ES Module compatible version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');

function fixImportsInFile(filePath) {
  if (!fs.existsSync(filePath) || !filePath.endsWith('.js')) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Fix relative imports without .js extension
    const importRegex = /from ['"](\..+?)['"];?/g;
    content = content.replace(importRegex, (match, importPath) => {
      if (!importPath.endsWith('.js') && !importPath.includes('.json')) {
        hasChanges = true;
        return match.replace(importPath, importPath + '.js');
      }
      return match;
    });

    // Fix require statements if any remain
    const requireRegex = /require\(['"](\..+?)['"]\)/g;
    content = content.replace(requireRegex, (match, requirePath) => {
      if (!requirePath.endsWith('.js') && !requirePath.includes('.json')) {
        hasChanges = true;
        return match.replace(requirePath, requirePath + '.js');
      }
      return match;
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed imports in: ${filePath}`);
    }
  } catch (error) {
    console.warn(`Warning: Could not fix imports in ${filePath}:`, error.message);
  }
}

function walkDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log('Dist directory not found, skipping import fixes.');
    return;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDirectory(fullPath);
    } else if (stat.isFile() && file.endsWith('.js')) {
      fixImportsInFile(fullPath);
    }
  }
}

console.log('Fixing import paths in compiled files...');
walkDirectory(distDir);
console.log('✅ Import paths fixed!');
