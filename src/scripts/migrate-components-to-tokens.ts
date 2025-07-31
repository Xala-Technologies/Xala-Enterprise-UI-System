#!/usr/bin/env node

/**
 * Script to help identify which components need migration to useTokens
 */

import * as fs from 'fs';
import * as path from 'path';

const componentsDir = path.join(__dirname, '..', 'components', 'ui');

function checkComponentForTokens(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.includes('useTokens');
}

function getComponentsStatus(): void {
  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
  
  const status = {
    migrated: [] as string[],
    needsMigration: [] as string[],
  };
  
  files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    if (checkComponentForTokens(filePath)) {
      status.migrated.push(file);
    } else {
      status.needsMigration.push(file);
    }
  });
  
  console.log('=== Component Migration Status ===');
  console.log(`\nTotal components: ${files.length}`);
  console.log(`Migrated: ${status.migrated.length}`);
  console.log(`Needs migration: ${status.needsMigration.length}`);
  
  console.log('\n✅ Migrated components:');
  status.migrated.forEach(f => console.log(`  - ${f}`));
  
  console.log('\n❌ Components needing migration:');
  status.needsMigration.forEach(f => console.log(`  - ${f}`));
  
  console.log('\n=== Priority Components (simpler ones) ===');
  const priority = ['box.tsx', 'divider.tsx', 'separator.tsx', 'skeleton.tsx', 'typography.tsx'];
  priority.forEach(f => {
    if (status.needsMigration.includes(f)) {
      console.log(`  - ${f}`);
    }
  });
}

// Run the check
getComponentsStatus();