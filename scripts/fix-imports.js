const fs = require('fs');
const path = require('path');

/**
 * Recursively process all .js files in dist directory to fix @/* imports
 */
function fixImports(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixImports(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Fix @/lib/utils/cn imports
      if (content.includes(`require("@/lib/utils/cn")`)) {
        const relativePath = getRelativePath(filePath, 'dist/lib/utils/cn');
        content = content.replace(/require\("@\/lib\/utils\/cn"\)/g, `require("${relativePath}")`);
        modified = true;
      }

      // Fix other @/* imports as needed
      const atImports = content.match(/require\("@\/[^"]+"\)/g);
      if (atImports) {
        for (const atImport of atImports) {
          const importPath = atImport.match(/require\("(@\/[^"]+)"\)/)[1];
          const targetPath = importPath.replace('@/', 'dist/');
          const relativePath = getRelativePath(filePath, targetPath);
          content = content.replace(atImport, `require("${relativePath}")`);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed imports in: ${filePath}`);
      }
    }
  }
}

/**
 * Get relative path from source file to target file
 */
function getRelativePath(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  const relativePath = path.relative(fromDir, toFile);

  // Ensure relative paths start with ./ or ../
  if (!relativePath.startsWith('.')) {
    return './' + relativePath;
  }
  return relativePath;
}

// Run the fix
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  console.log('Fixing import paths in compiled files...');
  fixImports(distPath);
  console.log('✅ Import paths fixed!');
} else {
  console.error('❌ dist directory not found');
  process.exit(1);
}
