#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Cleaning up OrganizationNumberInput component...\n');

const filePath = path.join(process.cwd(), 'src/components/form/OrganizationNumberInput.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove all the unused destructured variables
content = content.replace(
  /    hasError = false,\s*\n\s*validation,\s*\n\s*displayFormat = 'nnn nnn nnn',\s*\n\s*maskInput = false,\s*\n\s*autoFormat = true,\s*\n\s*fetchOrganizationData = false,/,
  '    hasError = false,\n    autoFormat = true,'
);

// Remove unused state variables
content = content.replace(
  /  const \[_isValidating, _setIsValidating\] = useState\(false\);\s*\n\s*const \[_isFetchingData, _setIsFetchingData\] = useState\(false\);\s*\n\s*const \[_orgData, _setOrgData\] = useState<OrganizationData \| null>\(null\);/,
  '  // Future state variables for validation and data fetching will be added here'
);

// Remove unused variable references in onValidationChange
content = content.replace(
  /onValidationChange\(result\.isValid, result\.errors, _orgData \|\| undefined\);/,
  'onValidationChange(result.isValid, result.errors, undefined);'
);

// Fix other references to _isValidating
content = content.replace(/!_isValidating/g, 'true');

// Fix orgData references
content = content.replace(/_orgData/g, 'null');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Cleaned up OrganizationNumberInput component');

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
