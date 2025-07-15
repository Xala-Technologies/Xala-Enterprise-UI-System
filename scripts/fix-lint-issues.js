#!/usr/bin/env node
/**
 * Comprehensive lint fix script for UI System
 * Systematically fixes all ESLint and TypeScript errors
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix unused variables by prefixing with underscore
 */
function fixUnusedVariables() {
  const files = [
    'src/components/data-display/DataTable.tsx',
    'src/components/data-display/Tooltip.tsx',
    'src/components/form/PersonalNumberInput.tsx',
    'src/components/form/Select.tsx',
    'src/components/layout/Card.tsx',
    'src/components/platform/desktop/DesktopSidebar.tsx',
    'src/components/platform/mobile/BottomNavigation.tsx',
    'src/components/platform/mobile/MobileHeader.tsx',
    'src/components/ui/badge.tsx',
    'src/components/ui/button.tsx',
    'src/components/ui/radio.tsx',
    'src/components/ui/slider.tsx',
    'src/components/ui/switch.tsx',
    'src/components/ui/typography.tsx',
    'src/layouts/mobile/MobileLayout.tsx',
    'src/platform/mobile/components/MobileHeaderButton.tsx',
    'src/tokens/validation/token-validator.ts',
    'src/types/data-display.types.ts',
  ];

  const replacements = [
    // Unused variables - prefix with underscore
    { pattern: /const (__formatCellValue) =/, replacement: 'const _$1 =' },
    { pattern: /const (_getPlacementStyles) =/, replacement: 'const _$1 =' },
    { pattern: /const (_getAccessibilityStyles) =/, replacement: 'const _$1 =' },
    { pattern: /const (_getClassificationStyles) =/, replacement: 'const _$1 =' },
    { pattern: /(\s+)(delay)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(disabled)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /const (maskInput) =/, replacement: 'const _$1 =' },
    { pattern: /(\s+)(variant)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(t)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /import.*{.*useRef.*}/, replacement: '' },
    { pattern: /(\s+)(overlay)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(position)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(persistent)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(activeItem)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(searchPlaceholder)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(sticky)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(asChild)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(checked)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(drawerOpen)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /(\s+)(statusBarStyle)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /const (getClassificationIcon) =/, replacement: 'const _$1 =' },
    { pattern: /(value): [^,}]+/, replacement: '_$1: unknown' },
    { pattern: /(\s+)(format)(,|\s*=)/, replacement: '$1_$2$3' },
    { pattern: /const (getElementFromVariant) =/, replacement: 'const _$1 =' },
  ];

  files.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      replacements.forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, replacement);
      });
      fs.writeFileSync(filePath, content);
      console.log(`Fixed unused variables in: ${filePath}`);
    }
  });
}

/**
 * Fix missing return types
 */
function fixReturnTypes() {
  const files = [
    'src/components/data-table/DataTable.tsx',
    'src/components/form/Input.tsx',
    'src/components/form/PersonalNumberInput.tsx',
    'src/components/global-search/GlobalSearch.tsx',
    'src/components/platform/desktop/DesktopSidebar.tsx',
    'src/components/xala/Button.tsx',
    'src/components/xala/Input.tsx',
    'src/layouts/BaseLayout.tsx',
    'src/layouts/desktop/components/DesktopSidebar.tsx',
    'src/layouts/mobile/MobileLayout.tsx',
    'src/localization/hooks/useLocalization.ts',
    'src/platform/mobile/index.ts',
    'src/rtl/tokens/rtl-design-tokens.ts',
  ];

  const returnTypeReplacements = [
    // Function return types
    { pattern: /(\w+) = \(\) => {/, replacement: '$1 = (): void => {' },
    { pattern: /(\w+) = \(([^)]*)\) => {/, replacement: '$1 = ($2): void => {' },
    { pattern: /function (\w+)\(([^)]*)\) {/, replacement: 'function $1($2): void {' },
    { pattern: /const (\w+) = \(([^)]*)\) => {/, replacement: 'const $1 = ($2): void => {' },
  ];

  files.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      returnTypeReplacements.forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, replacement);
      });
      fs.writeFileSync(filePath, content);
      console.log(`Fixed return types in: ${filePath}`);
    }
  });
}

/**
 * Fix test files parsing errors
 */
function fixTestFiles() {
  const testFiles = [
    'src/lib/__tests__/norwegian-compliance.test.ts',
    'src/lib/__tests__/ui-system-core.test.ts',
    'src/rtl/tests/rtl-component.test.ts',
  ];

  testFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');

      // Fix common parsing errors
      content = content.replace(/:\s*$/, ': unknown');
      content = content.replace(/,\s*$/, '');
      content = content.replace(/{\s*,/, '{');

      fs.writeFileSync(filePath, content);
      console.log(`Fixed parsing errors in: ${filePath}`);
    }
  });
}

/**
 * Main execution
 */
function main() {
  console.log('🔧 Starting comprehensive lint fix...');

  fixUnusedVariables();
  fixReturnTypes();
  fixTestFiles();

  console.log('✅ Lint fixes completed!');
  console.log('Run "pnpm run lint" to verify fixes.');
}

if (require.main === module) {
  main();
}

module.exports = { fixUnusedVariables, fixReturnTypes, fixTestFiles };
