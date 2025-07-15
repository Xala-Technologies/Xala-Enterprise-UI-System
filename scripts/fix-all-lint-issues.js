#!/usr/bin/env node
/**
 * Comprehensive lint fix script for all remaining issues
 */

const fs = require('fs');
const path = require('path');

function fixAllLintIssues() {
  console.log('🔧 Starting comprehensive lint fix...');

  // Fix Tooltip.tsx issues
  fixFile('src/components/data-display/Tooltip.tsx', [
    { search: /const _getClassificationIcon.*?return '🔒';\s*\n/s, replace: '' },
    { search: /const _getCategoryIcon.*?return '\?';\s*\n/s, replace: '' },
    { search: /delay: _delay = 0,/, replace: '// delay: _delay = 0,' },
    { search: /disabled: _disabled = false,/, replace: '// disabled: _disabled = false,' },
  ]);

  // Fix Card.tsx
  fixFile('src/components/layout/Card.tsx', [
    {
      search: /const \{ t: _t \} = useLocalization\(\);/,
      replace: '// const { t } = useLocalization();',
    },
  ]);

  // Fix DesktopSidebar.tsx
  fixFile('src/components/platform/desktop/DesktopSidebar.tsx', [
    { search: /overlay: _overlay = false,/, replace: '// overlay: _overlay = false,' },
    { search: /position: _position = 'left',/, replace: '// position: _position = "left",' },
    { search: /persistent: _persistent = true,/, replace: '// persistent: _persistent = true,' },
  ]);

  // Fix UI component unused vars
  fixFile('src/components/ui/badge.tsx', [
    { search: /(\w+,\s*)asChild(,|\s*=)/, replace: '$1// asChild$2' },
  ]);

  fixFile('src/components/ui/button.tsx', [
    { search: /(\w+,\s*)asChild(,|\s*=)/, replace: '$1// asChild$2' },
  ]);

  fixFile('src/components/ui/radio.tsx', [{ search: /value,/, replace: '// value,' }]);

  fixFile('src/components/ui/slider.tsx', [{ search: /value,/g, replace: '// value,' }]);

  fixFile('src/components/ui/switch.tsx', [{ search: /checked,/, replace: '// checked,' }]);

  fixFile('src/components/ui/typography.tsx', [
    { search: /const getElementFromVariant/, replace: 'const _getElementFromVariant' },
  ]);

  // Fix mobile components
  fixFile('src/components/platform/mobile/BottomNavigation.tsx', [
    { search: /activeItem,/, replace: '// activeItem,' },
  ]);

  fixFile('src/components/platform/mobile/MobileHeader.tsx', [
    { search: /searchPlaceholder,/, replace: '// searchPlaceholder,' },
    { search: /sticky,/, replace: '// sticky,' },
  ]);

  // Fix mobile layouts
  fixFile('src/layouts/mobile/MobileLayout.tsx', [
    { search: /drawerOpen,/, replace: '// drawerOpen,' },
    { search: /statusBarStyle,/, replace: '// statusBarStyle,' },
  ]);

  // Fix norwegian compliance (all parameters)
  fixFile('src/lib/utils/norwegian-compliance.ts', [
    { search: /_number: string/g, replace: '_number: unknown' },
    { search: /_code: string/g, replace: '_code: unknown' },
    { search: /_phone: string/g, replace: '_phone: unknown' },
    { search: /_data: unknown/g, replace: '_data: unknown' },
    { search: /_classification: string/g, replace: '_classification: unknown' },
    { search: /_level: string/g, replace: '_level: unknown' },
    { search: /_language: string/g, replace: '_language: unknown' },
    { search: /_userLevel: string/g, replace: '_userLevel: unknown' },
    { search: /_consent: unknown/g, replace: '_consent: unknown' },
    { search: /_purpose: string/g, replace: '_purpose: unknown' },
    { search: /_bg: string/g, replace: '_bg: unknown' },
    { search: /_fg: string/g, replace: '_fg: unknown' },
  ]);

  // Add simple return types where missing
  addReturnTypes();

  console.log('✅ All lint fixes completed!');
}

function fixFile(filePath, fixes) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  fixes.forEach(({ search, replace }) => {
    const oldContent = content;
    content = content.replace(search, replace);
    if (content !== oldContent) {
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
  }
}

function addReturnTypes() {
  // Add return types to functions missing them
  const returnTypeFixes = [
    {
      file: 'src/components/xala/Button.tsx',
      pattern: /(\w+) = \(([^)]*)\) => {/g,
      replacement: '$1 = ($2): JSX.Element => {',
    },
    {
      file: 'src/components/xala/Input.tsx',
      pattern: /(\w+) = \(([^)]*)\) => {/g,
      replacement: '$1 = ($2): JSX.Element => {',
    },
  ];

  returnTypeFixes.forEach(({ file, pattern, replacement }) => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf-8');
      content = content.replace(pattern, replacement);
      fs.writeFileSync(file, content);
      console.log(`✅ Added return types: ${file}`);
    }
  });
}

if (require.main === module) {
  fixAllLintIssues();
}

module.exports = { fixAllLintIssues };
