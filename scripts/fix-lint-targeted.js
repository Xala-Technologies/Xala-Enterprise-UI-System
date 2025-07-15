#!/usr/bin/env node

/**
 * Targeted Lint Error Resolution Script
 *
 * This script addresses specific TypeScript compilation and lint errors
 * using precise fixes rather than broad pattern matching.
 *
 * Focus areas:
 * - Variable reference fixes in DesktopSidebar
 * - Prop destructuring issues in form components
 * - Return type annotations for event handlers
 */

const fs = require('fs');
const path = require('path');

// Define the specific fixes needed
const fixes = [
  {
    file: 'src/components/platform/desktop/DesktopSidebar.tsx',
    replacements: [
      {
        search: /const { position, persistent } = props;/g,
        replace: 'const { position, persistent, ...otherProps } = props;',
      },
    ],
  },
  {
    file: 'src/components/ui/radio.tsx',
    replacements: [
      {
        search: /const { className, ...props } = componentProps;/g,
        replace: 'const { className, value, ...props } = componentProps;',
      },
    ],
  },
  {
    file: 'src/components/ui/slider.tsx',
    replacements: [
      {
        search: /const { className, ...props } = componentProps;/g,
        replace: 'const { className, value, ...props } = componentProps;',
      },
    ],
  },
  {
    file: 'src/components/xala/Button.tsx',
    replacements: [
      {
        search: /const handleClick = \(e: React\.MouseEvent\) => {/g,
        replace: 'const handleClick = (e: React.MouseEvent): void => {',
      },
    ],
  },
  {
    file: 'src/components/xala/Input.tsx',
    replacements: [
      {
        search: /export const inputVariants = cva\(/g,
        replace: 'export const inputVariants: (props: any) => string = cva(',
      },
    ],
  },
];

function applyFixes() {
  let totalFixesApplied = 0;

  console.log('Starting targeted lint error resolution...\n');

  fixes.forEach(({ file, replacements }) => {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let fileFixesApplied = 0;

    replacements.forEach(({ search, replace }) => {
      const matches = content.match(search);
      if (matches) {
        content = content.replace(search, replace);
        fileFixesApplied += matches.length;
        totalFixesApplied += matches.length;
      }
    });

    if (fileFixesApplied > 0) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${fileFixesApplied} issues in ${file}`);
    } else {
      console.log(`ℹ️  No issues found in ${file}`);
    }
  });

  console.log(`\n🎯 Total fixes applied: ${totalFixesApplied}`);
  console.log('\nRecommended next steps:');
  console.log('1. Run: pnpm build');
  console.log('2. Run: pnpm lint');
  console.log('3. Review any remaining errors individually');
}

if (require.main === module) {
  applyFixes();
}
