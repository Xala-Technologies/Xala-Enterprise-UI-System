#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing syntax issues caused by improper commenting...\n');

const syntaxFixes = [
  {
    file: 'src/components/form/OrganizationNumberInput.tsx',
    search: `// Logger for future implementation
// const logger =
  serviceName: 'ui-system-org-number-input',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});`,
    replace: `// Logger implementation planned for future use
// const logger = Logger.create({
//   serviceName: 'ui-system-org-number-input',
//   logLevel: 'info',
//   enableConsoleLogging: true,
//   enableFileLogging: false,
// });`,
  },
  {
    file: 'src/platform/mobile/components/BottomNavigation.tsx',
    search: `// Logger planned
// const logger =
  serviceName: 'ui-system-bottom-navigation',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});`,
    replace: `// Logger implementation planned for future use
// const logger = Logger.create({
//   serviceName: 'ui-system-bottom-navigation',
//   logLevel: 'info',
//   enableConsoleLogging: true,
//   enableFileLogging: false,
// });`,
  },
  {
    file: 'src/platform/mobile/components/MobileHeaderButton.tsx',
    search: `// Classification icon helper planned
// const getClassificationIcon = (classification?: string): string => {
  const icons = {
    ÅPEN: '🟢',
    BEGRENSET: '🟡',
    KONFIDENSIELT: '🔴',
    HEMMELIG: '⚫',
  };
  return icons[classification as keyof typeof icons] || '📱';
};`,
    replace: `// Classification icon helper planned for future implementation
// const getClassificationIcon = (classification?: string): string => {
//   const icons = {
//     ÅPEN: '🟢',
//     BEGRENSET: '🟡',
//     KONFIDENSIELT: '🔴',
//     HEMMELIG: '⚫',
//   };
//   return icons[classification as keyof typeof icons] || '📱';
// };`,
  },
  {
    file: 'src/layouts/mobile/MobileLayout.tsx',
    search: `    // Refresh handler planned
    // const handleRefresh = useCallback((): void => {
      // Implement pull-to-refresh logic
    }, []);`,
    replace: `    // Refresh handler planned for future implementation
    // const handleRefresh = useCallback((): void => {
    //   // Implement pull-to-refresh logic
    // }, []);`,
  },
];

let totalFixed = 0;

syntaxFixes.forEach(({ file, search, replace }) => {
  try {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${file}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes(search)) {
      content = content.replace(search, replace);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed syntax in ${file}`);
      totalFixed++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n📊 Fixed ${totalFixed} syntax issues`);
console.log('🏗️ Testing build...');

// Test build
const { execSync } = require('child_process');
try {
  execSync('pnpm run build', { stdio: 'pipe' });
  console.log('✅ Build successful!');
} catch (error) {
  console.log('❌ Build still has issues');
  console.log(error.stdout?.toString() || error.message);
}
