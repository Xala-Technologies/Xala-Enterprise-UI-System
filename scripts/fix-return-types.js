#!/usr/bin/env node

/**
 * Fix missing return types in components and utilities
 *
 * This script adds explicit return types to functions that are missing them
 * based on ESLint explicit-function-return-type rule violations
 */

const fs = require('fs');
const path = require('path');

function fixReturnTypes() {
  console.log('Adding missing return types...\n');

  // Define files and their specific fixes
  const fixes = [
    {
      file: 'src/localization/hooks/useLocalization.ts',
      patterns: [
        {
          search: /(\s+)([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*\(\) => \{/g,
          replace: '$1$2: () => void => {',
        },
        {
          search: /const ([a-zA-Z_][a-zA-Z0-9_]*) = \(\) => \{/g,
          replace: 'const $1 = (): void => {',
        },
      ],
    },
    {
      file: 'src/platform/mobile/index.ts',
      patterns: [
        {
          search: /(\s+)([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*\(\) => \{/g,
          replace: '$1$2: () => void => {',
        },
      ],
    },
    {
      file: 'src/rtl/tokens/rtl-design-tokens.ts',
      patterns: [
        {
          search: /(\s+)([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*\(\) => \{/g,
          replace: '$1$2: () => void => {',
        },
      ],
    },
  ];

  fixes.forEach(({ file, patterns }) => {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    patterns.forEach(({ search, replace }) => {
      if (search.test(content)) {
        content = content.replace(search, replace);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed return types in ${file}`);
    } else {
      console.log(`ℹ️  No return type issues found in ${file}`);
    }
  });

  console.log('\n🎯 Return type fixes completed');
  console.log('Note: Layout files may need manual review due to complex React component patterns');
}

if (require.main === module) {
  fixReturnTypes();
}
