#!/usr/bin/env node
/**
 * NPM Publish Script - @xala-technologies/ui-system v4.0.0
 * Comprehensive validation and publishing workflow
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Publishing @xala-technologies/ui-system v4.0.0...');

// Pre-publish validation
console.log('\n📋 Pre-publish validation...');

try {
  // 1. Verify build is working
  console.log('1. Verifying build...');
  execSync('pnpm run build', { stdio: 'pipe' });
  console.log('   ✅ Build successful');

  // 2. Check essential files exist
  console.log('2. Checking essential files...');
  const requiredFiles = [
    'dist/index.js',
    'dist/index.d.ts',
    'dist/components/index.js',
    'dist/providers/DesignSystemProvider.js',
    'dist/hooks/useTokens.js',
  ];

  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing required file: ${file}`);
    }
  });
  console.log('   ✅ All essential files present');

  // 3. Verify package.json configuration
  console.log('3. Validating package.json...');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  if (pkg.name !== '@xala-technologies/ui-system') {
    throw new Error('Invalid package name');
  }
  if (pkg.version !== '4.0.0') {
    throw new Error('Invalid version');
  }
  if (!pkg.main || !pkg.types) {
    throw new Error('Missing main or types fields');
  }
  console.log('   ✅ Package.json valid');

  // 4. Check TypeScript declarations
  console.log('4. Checking TypeScript declarations...');
  if (!fs.existsSync('dist/index.d.ts')) {
    throw new Error('Missing TypeScript declarations');
  }
  console.log('   ✅ TypeScript declarations present');

  // 5. Verify ES module configuration
  console.log('5. Verifying ES module configuration...');
  if (pkg.type !== 'module') {
    throw new Error('Package not configured as ES module');
  }
  console.log('   ✅ ES module configuration valid');

  console.log('\n🎉 All pre-publish checks passed!');
} catch (error) {
  console.error('\n❌ Pre-publish validation failed:', error.message);
  console.log('\n🔧 Please fix the issues above before publishing.');
  process.exit(1);
}

// Publish to npm
console.log('\n📦 Publishing to npm...');

try {
  // Check if logged in to npm
  try {
    execSync('npm whoami', { stdio: 'pipe' });
    console.log('✅ NPM authentication verified');
  } catch (error) {
    console.log('⚠️  Please login to npm first:');
    console.log('   npm login');
    process.exit(1);
  }

  // Dry run first
  console.log('\n🧪 Running publish dry-run...');
  execSync('npm publish --dry-run', { stdio: 'inherit' });
  console.log('✅ Dry run successful');

  // Ask for confirmation
  console.log('\n❓ Ready to publish @xala-technologies/ui-system@4.0.0');
  console.log('   This will publish to the public npm registry.');
  console.log('   Continue? (You can stop here and run: npm publish)');

  // For automated publishing, uncomment the line below:
  // execSync('npm publish', { stdio: 'inherit' });

  console.log('\n✅ Package ready for publishing!');
  console.log('\n🚀 To publish, run: npm publish');
  console.log('\n📈 Post-publish verification:');
  console.log('   npm view @xala-technologies/ui-system');
  console.log('   npm install @xala-technologies/ui-system');
} catch (error) {
  console.error('\n❌ Publish failed:', error.message);
  process.exit(1);
}

console.log('\n🎉 Publish process completed!');
