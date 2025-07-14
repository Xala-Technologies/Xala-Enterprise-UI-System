#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix malformed helper functions
function fixHelperFunctions(content, file) {
  // Fix inline helper function definitions inside JSX
  const patterns = [
    {
      // Fix getVariantIcon inline definition
      search: /\{\/\/ Helper function\s*\nconst getVariantIcon = \(variant: string\): string => \{[\s\S]*?\};\s*\n\s*\n\s*getVariantIcon\(/g,
      replace: (match) => {
        return '{getVariantIcon(';
      }
    },
    {
      // Fix getClassificationIcon inline definition  
      search: /\{\/\/ Helper function\s*\nconst getClassificationIcon = \(level: string\): string => \{[\s\S]*?\};\s*\n\s*\n\s*getClassificationIcon\(/g,
      replace: (match) => {
        return '{getClassificationIcon(';
      }
    },
    {
      // Fix getSeverityIcon inline definition
      search: /\{\/\/ Helper function\s*\nconst getSeverityIcon = \(severity: string\): string => \{[\s\S]*?\};\s*\n\s*\n\s*getSeverityIcon\(/g,
      replace: (match) => {
        return '{getSeverityIcon(';
      }
    },
    {
      // Fix getCategoryIcon inline definition
      search: /\{\/\/ Helper function\s*\nconst getCategoryIcon = \(category: string\): string => \{[\s\S]*?\};\s*\n\s*\n\s*getCategoryIcon\(/g,
      replace: (match) => {
        return '{getCategoryIcon(';
      }
    }
  ];

  let modified = false;
  patterns.forEach(pattern => {
    if (pattern.search.test(content)) {
      content = content.replace(pattern.search, pattern.replace);
      modified = true;
    }
  });

  // Add helper functions at the top of components if missing
  if (file.includes('Alert.tsx') && !content.includes('const getVariantIcon =')) {
    const helperFunctions = `
// Helper functions
const getVariantIcon = (variant: string): string => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };
  return icons[variant as keyof typeof icons] || 'ℹ️';
};

const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

const getSeverityIcon = (severity: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[severity as keyof typeof icons] || '■';
};

const getCategoryIcon = (category: string): string => {
  const icons = {
    system: '⚙️',
    validation: '✅',
    security: '🔒',
    process: '🔄',
    user: '👤',
  };
  return icons[category as keyof typeof icons] || '📋';
};

`;
    // Insert after imports
    const importEnd = content.lastIndexOf('import ');
    const lineEnd = content.indexOf('\n', importEnd);
    content = content.slice(0, lineEnd + 1) + helperFunctions + content.slice(lineEnd + 1);
    modified = true;
  }

  if (file.includes('Button.tsx') && !content.includes('const getClassificationIcon =')) {
    const helperFunction = `
// Helper function
const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

`;
    // Insert after imports
    const importEnd = content.lastIndexOf('import ');
    const lineEnd = content.indexOf('\n', importEnd);
    content = content.slice(0, lineEnd + 1) + helperFunction + content.slice(lineEnd + 1);
    modified = true;
  }

  if (file.includes('Modal.tsx')) {
    // Fix duplicate helper functions in Modal
    if (!content.includes('const getClassificationIcon =') || content.includes('{// Helper function')) {
      const helperFunctions = `
// Helper functions
const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

const getCategoryIcon = (category: string): string => {
  const icons = {
    system: '⚙️',
    validation: '✅',
    security: '🔒',
    process: '🔄',
    user: '👤',
  };
  return icons[category as keyof typeof icons] || '📋';
};

`;
      // Insert after imports
      const importEnd = content.lastIndexOf('import ');
      const lineEnd = content.indexOf('\n', importEnd);
      content = content.slice(0, lineEnd + 1) + helperFunctions + content.slice(lineEnd + 1);
      modified = true;
    }
  }

  // Fix the Modal component's useFocusTrap and export
  if (file.includes('Modal.tsx') && content.includes('export const Modal')) {
    // Fix the incomplete Modal implementation
    if (!content.includes('// Focus trap hook')) {
      const focusTrapImpl = `
// Focus trap hook
const useFocusTrap = (
  isOpen: boolean,
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement>
): void => {
  React.useEffect(() => {
    if (!isOpen || !enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  }, [isOpen, enabled, containerRef]);
};

`;
      // Insert before Modal export
      const modalExportPos = content.indexOf('export const Modal');
      content = content.slice(0, modalExportPos) + focusTrapImpl + content.slice(modalExportPos);
      modified = true;
    }
  }

  return { content, modified };
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  const result = fixHelperFunctions(content, file);
  
  if (result.modified) {
    fs.writeFileSync(file, result.content);
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
  if (processFile(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files`);