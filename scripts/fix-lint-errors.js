#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration for file patterns to process
const FILE_PATTERNS = {
  typescript: /\.(ts|tsx)$/,
  test: /\.(test|spec)\.(ts|tsx)$/,
  component: /\.tsx$/
};

// Function to get all files recursively
function getAllFiles(dir, pattern) {
  const files = [];
  
  function walk(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        walk(fullPath);
      } else if (stat.isFile() && pattern.test(item)) {
        files.push(fullPath);
      }
    });
  }
  
  walk(dir);
  return files;
}

// Fix React is not defined
function fixReactImports(content, filePath) {
  // Skip if React is already imported
  if (content.includes("import React") || content.includes("import * as React")) {
    return content;
  }
  
  // Check if file uses React (JSX or React types)
  if (content.match(/<[A-Z]|\bReact\.|JSX\.Element|React\.FC|React\.ReactElement/)) {
    // Add React import at the beginning
    const importStatement = "import React from 'react';\n";
    
    // Find the right place to insert (after file comments if any)
    const lines = content.split('\n');
    let insertIndex = 0;
    
    // Skip leading comments and empty lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('//') && !line.startsWith('/*') && !line.startsWith('*')) {
        insertIndex = i;
        break;
      }
    }
    
    lines.splice(insertIndex, 0, importStatement);
    return lines.join('\n');
  }
  
  return content;
}

// Fix unused parameters
function fixUnusedParameters(content, filePath) {
  let fixed = content;
  
  // Fix common unused event parameters
  fixed = fixed.replace(/\b(onChange|onClick|onFocus|onBlur|onSubmit|onMouseEnter|onMouseLeave|onKeyDown)\s*:\s*\(\s*([a-zA-Z_]+)\s*:/g, 
    (match, handler, param) => {
      if (!content.includes(param + '.') && !content.includes(param + '[')) {
        return `${handler}: (_${param}:`;
      }
      return match;
    });
  
  // Fix unused parameters in function definitions
  fixed = fixed.replace(/\(([^)]+)\)\s*=>\s*{/g, (match, params) => {
    const paramList = params.split(',').map(param => {
      const trimmed = param.trim();
      const paramName = trimmed.split(':')[0].trim();
      
      // Check if parameter is used in the function body
      const functionBody = content.substring(content.indexOf(match));
      const endIndex = findMatchingBrace(functionBody, functionBody.indexOf('{'));
      const body = functionBody.substring(0, endIndex);
      
      if (paramName && !paramName.startsWith('_') && !body.includes(paramName)) {
        return trimmed.replace(paramName, '_' + paramName);
      }
      return trimmed;
    });
    
    return `(${paramList.join(', ')}) => {`;
  });
  
  // Fix specific patterns
  fixed = fixed.replace(/\(item: ([^,)]+), index: ([^)]+)\)/g, (match, itemType, indexType) => {
    return `(_item: ${itemType}, _index: ${indexType})`;
  });
  
  fixed = fixed.replace(/\(value: ([^,)]+), event: ([^)]+)\)/g, (match, valueType, eventType) => {
    return `(_value: ${valueType}, _event: ${eventType})`;
  });
  
  return fixed;
}

// Fix any types
function fixAnyTypes(content, filePath) {
  let fixed = content;
  
  // Common any replacements
  const replacements = [
    // Arrays
    [/: any\[\]/g, ': unknown[]'],
    
    // React specific
    [/children: any/g, 'children: React.ReactNode'],
    [/icon: any/g, 'icon: React.ReactNode'],
    [/actions: any\[\]/g, 'actions: Array<{ label: string; handler: () => void; variant?: string }>'],
    
    // Event handlers
    [/\(event: any\)/g, '(event: React.MouseEvent<HTMLElement>)'],
    [/\(e: any\)/g, '(e: React.MouseEvent<HTMLElement>)'],
    
    // Style props
    [/style\?: any/g, 'style?: React.CSSProperties'],
    [/styles: any/g, 'styles: React.CSSProperties'],
    
    // Generic objects
    [/: Record<string, any>/g, ': Record<string, unknown>'],
    [/: { \[key: string\]: any }/g, ': { [key: string]: unknown }'],
    
    // Function parameters
    [/\(([^:)]+): any\)/g, '($1: unknown)'],
    
    // Generic any
    [/: any(?![a-zA-Z])/g, ': unknown']
  ];
  
  replacements.forEach(([pattern, replacement]) => {
    fixed = fixed.replace(pattern, replacement);
  });
  
  return fixed;
}

// Fix missing return types
function fixMissingReturnTypes(content, filePath) {
  let fixed = content;
  
  // Arrow functions returning JSX
  fixed = fixed.replace(/(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*\(/g, (match, name, params) => {
    // Check if it's likely returning JSX
    const afterMatch = content.substring(content.indexOf(match) + match.length);
    if (afterMatch.trim().startsWith('<')) {
      return `${name} = (${params}): React.ReactElement => (`;
    }
    return match;
  });
  
  // Functions with explicit return statements
  fixed = fixed.replace(/(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g, (match, name, params) => {
    // Look for return statement in function body
    const functionStart = content.indexOf(match);
    const functionBody = content.substring(functionStart);
    const bodyStart = functionBody.indexOf('{');
    const bodyEnd = findMatchingBrace(functionBody, bodyStart);
    const body = functionBody.substring(bodyStart, bodyEnd);
    
    if (body.includes('return <')) {
      return `${name} = (${params}): React.ReactElement => {`;
    } else if (body.includes('return null')) {
      return `${name} = (${params}): React.ReactElement | null => {`;
    } else if (!body.includes('return')) {
      return `${name} = (${params}): void => {`;
    }
    
    return match;
  });
  
  // Event handlers and callbacks
  fixed = fixed.replace(/const\s+handle(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g, (match, name, params) => {
    return `const handle${name} = (${params}): void => {`;
  });
  
  return fixed;
}

// Helper function to find matching brace
function findMatchingBrace(str, startIndex) {
  let count = 1;
  let i = startIndex + 1;
  
  while (i < str.length && count > 0) {
    if (str[i] === '{') count++;
    if (str[i] === '}') count--;
    i++;
  }
  
  return i;
}

// Main function to process all files
function processFiles() {
  const srcDir = path.join(__dirname, '..', 'src');
  const files = getAllFiles(srcDir, FILE_PATTERNS.typescript);
  
  console.log(`Found ${files.length} TypeScript files to process...`);
  
  let totalFixed = 0;
  
  files.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Apply fixes
      content = fixReactImports(content, filePath);
      content = fixUnusedParameters(content, filePath);
      content = fixAnyTypes(content, filePath);
      content = fixMissingReturnTypes(content, filePath);
      
      // Only write if changes were made
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${path.relative(srcDir, filePath)}`);
        totalFixed++;
      }
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
    }
  });
  
  console.log(`\nFixed ${totalFixed} files`);
}

// Run the script
processFiles();