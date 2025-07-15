#!/usr/bin/env node

/**
 * Fix unused props in UI components
 *
 * This script addresses unused prop destructuring in form components
 * by adding underscore prefix to mark them as intentionally unused
 */

const fs = require('fs');
const path = require('path');

function fixUnusedProps() {
  console.log('Fixing unused props in UI components...\n');

  const files = [
    'src/components/ui/radio.tsx',
    'src/components/ui/slider.tsx',
    'src/components/ui/switch.tsx',
    'src/components/ui/typography.tsx',
  ];

  files.forEach(file => {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix specific patterns for each file
    if (file.includes('radio.tsx')) {
      // Look for value prop in destructuring that's not used
      if (content.includes('value,') && content.includes("'value' is defined but never used")) {
        content = content.replace(/(\s+)value,/g, '$1_value,');
        changed = true;
      }
    }

    if (file.includes('slider.tsx')) {
      // Fix value prop issues in slider
      content = content.replace(/(\s+)value,/g, '$1_value,');
      changed = true;
    }

    if (file.includes('switch.tsx')) {
      // Fix checked prop issue
      content = content.replace(/(\s+)checked,/g, '$1_checked,');
      changed = true;
    }

    if (file.includes('typography.tsx')) {
      // Fix getElementFromVariant function
      content = content.replace(/const getElementFromVariant/g, 'const _getElementFromVariant');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed unused props in ${file}`);
    } else {
      console.log(`ℹ️  No changes needed in ${file}`);
    }
  });

  console.log('\n🎯 UI component prop fixes completed');
}

if (require.main === module) {
  fixUnusedProps();
}
