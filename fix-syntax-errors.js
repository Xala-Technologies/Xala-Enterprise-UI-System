#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix syntax errors
function fixSyntaxErrors(content, file) {
  // Fix the incorrect syntax "}/" which should be "}"
  content = content.replace(/\}\//g, '}');
  
  // Fix UISystemProvider debug statements
  if (file.includes('UISystemProvider.tsx')) {
    content = content.replace(
      /logger\.debug\('Config update requested', \{ updates \}\);/g,
      'logger.debug(\'Config update requested\', { _updates });'
    );
    content = content.replace(
      /logger\.debug\('Accessibility update requested', \{ accessibility \}\);/g,
      'logger.debug(\'Accessibility update requested\', { _accessibility });'
    );
  }

  // Fix other parsing issues in various files
  // Fix Toast.tsx duration issue
  if (file.includes('Toast.tsx')) {
    if (!content.includes('const handleClose') && content.includes('handleClose()')) {
      // Add handleClose implementation before its usage
      const insertPos = content.indexOf('useEffect(() => {');
      if (insertPos !== -1) {
        content = content.slice(0, insertPos) + `
  const handleClose = (): void => {
    setIsVisible(false);
    onClose?.();
  };

  ` + content.slice(insertPos);
      }
    }
  }

  // Fix Badge.tsx display name
  if (file.includes('Badge.tsx') && !content.includes('Badge.displayName')) {
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    content += '\nBadge.displayName = \'Badge\';\n';
  }

  // Fix Tag.tsx display name
  if (file.includes('Tag.tsx') && !content.includes('Tag.displayName')) {
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    content += '\nTag.displayName = \'Tag\';\n';
  }

  // Fix KeyValueList.tsx display name
  if (file.includes('KeyValueList.tsx') && !content.includes('KeyValueList.displayName')) {
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    content += '\nKeyValueList.displayName = \'KeyValueList\';\n';
  }

  // Fix DataTable.tsx display name and formatting
  if (file.includes('DataTable.tsx')) {
    if (!content.includes('DataTable.displayName')) {
      if (!content.endsWith('\n')) {
        content += '\n';
      }
      content += '\nDataTable.displayName = \'DataTable\';\n';
    }
  }

  // Fix Tooltip.tsx export
  if (file.includes('Tooltip.tsx') && !content.includes('Tooltip.displayName')) {
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    content += '\nTooltip.displayName = \'Tooltip\';\n';
  }

  // Fix Card components
  if (file.includes('CardComponents.tsx')) {
    // Ensure proper exports
    const componentNames = ['CardAction', 'CardBadge', 'CardBody', 'CardFooter', 'CardHeader', 'CardMedia'];
    componentNames.forEach(name => {
      if (content.includes(`export const ${name}`) && !content.includes(`${name}.displayName`)) {
        content += `\n${name}.displayName = '${name}';\n`;
      }
    });
  }

  // Fix data-table/DataTable.tsx
  if (file.includes('data-table/DataTable.tsx')) {
    // Check for complete structure
    const lines = content.split('\n');
    let openBraces = 0;
    let closeBraces = 0;
    
    lines.forEach(line => {
      openBraces += (line.match(/\{/g) || []).length;
      closeBraces += (line.match(/\}/g) || []).length;
    });
    
    if (openBraces > closeBraces) {
      content += '\n' + '}'.repeat(openBraces - closeBraces);
    }
  }

  // Remove multiple consecutive newlines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  return content;
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  content = fixSyntaxErrors(content, file);

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