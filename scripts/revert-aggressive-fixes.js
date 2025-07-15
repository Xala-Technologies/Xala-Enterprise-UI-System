#!/usr/bin/env node

/**
 * Revert Aggressive Changes Script
 *
 * This script reverts overly aggressive changes from the comprehensive
 * lint fix that broke functionality in UI components
 */

const fs = require('fs');
const path = require('path');

function revertAggressiveChanges() {
  console.log('Reverting overly aggressive lint fixes...\n');

  const reverts = [
    {
      file: 'src/components/platform/mobile/MobileHeader.tsx',
      fixes: [
        {
          search: /_sticky/g,
          replace: 'sticky',
          description: 'Revert sticky variable - it is actually used',
        },
      ],
    },
    {
      file: 'src/components/ui/radio.tsx',
      fixes: [
        {
          search: /_value/g,
          replace: 'value',
          description: 'Revert value prop - it is actually used',
        },
      ],
    },
    {
      file: 'src/components/ui/slider.tsx',
      fixes: [
        {
          search: /_value/g,
          replace: 'value',
          description: 'Revert value prop - it is actually used',
        },
      ],
    },
    {
      file: 'src/components/ui/switch.tsx',
      fixes: [
        {
          search: /_checked/g,
          replace: 'checked',
          description: 'Revert checked prop - it is actually used',
        },
      ],
    },
    {
      file: 'src/tokens/validation/token-validator.ts',
      fixes: [
        {
          search: /_value/g,
          replace: 'value',
          description: 'Revert value parameter - function signature should not change',
        },
      ],
    },
  ];

  let totalReverts = 0;

  reverts.forEach(({ file, fixes }) => {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let fileChanges = 0;

    fixes.forEach(({ search, replace, description }) => {
      const matches = content.match(search);
      if (matches) {
        content = content.replace(search, replace);
        fileChanges += matches.length;
        totalReverts += matches.length;
        console.log(`✅ ${description} (${matches.length} revert${matches.length > 1 ? 's' : ''})`);
      }
    });

    if (fileChanges > 0) {
      fs.writeFileSync(filePath, content);
      console.log(`📝 Applied ${fileChanges} reverts to ${path.basename(file)}`);
    } else {
      console.log(`ℹ️  No reverts needed in ${path.basename(file)}`);
    }
  });

  console.log(`\n🔄 Revert completed!`);
  console.log(`📊 Total reverts applied: ${totalReverts}`);

  return totalReverts;
}

if (require.main === module) {
  const revertsApplied = revertAggressiveChanges();

  if (revertsApplied > 0) {
    console.log('\n✅ Build should now work correctly');
    console.log('💡 Next: Create targeted fixes for actual unused variables');
  }
}
