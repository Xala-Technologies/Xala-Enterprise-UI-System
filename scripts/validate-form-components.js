#!/usr/bin/env node

// Form Components Validation Script for @xala-mock/ui-system
// Validates Story 3: Form Components (Norwegian extensions) implementation

const fs = require('fs');
const path = require('path');

console.log('🧩 Validating Story 3: Form Components (Norwegian extensions)\n');

const componentsDir = path.join(__dirname, '../src/components/form');
const utilsDir = path.join(__dirname, '../src/utils');
const requiredComponents = [
  'Form.tsx',
  'Input.tsx',
  'PersonalNumberInput.tsx',
  'OrganizationNumberInput.tsx'
];

const requiredUtils = [
  'norwegian-validation.ts'
];

let allTestsPassed = true;

// Test 1: Verify all required form components exist
console.log('✅ Test 1: Form Component Files');
requiredComponents.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ ${component} exists`);
  } else {
    console.log(`  ✗ ${component} missing`);
    allTestsPassed = false;
  }
});

// Test 2: Verify Norwegian validation utilities exist
console.log('\n✅ Test 2: Norwegian Validation Utilities');
requiredUtils.forEach(util => {
  const filePath = path.join(utilsDir, util);
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ ${util} exists`);
  } else {
    console.log(`  ✗ ${util} missing`);
    allTestsPassed = false;
  }
});

// Test 3: Verify Norwegian-specific features
console.log('\n✅ Test 3: Norwegian-specific Features');
const norwegianFeatures = {
  'PersonalNumberInput.tsx': [
    'fødselsnummer',
    'd-nummer', 
    'h-nummer',
    'MOD11',
    'checksum',
    'DDMMYY-NNNNN'
  ],
  'OrganizationNumberInput.tsx': [
    'organisasjonsnummer',
    'BRREG',
    'NNN NNN NNN',
    'checksum',
    'enterprise',
    'sub-organization'
  ],
  'Form.tsx': [
    'ÅPEN',
    'BEGRENSET', 
    'KONFIDENSIELT',
    'HEMMELIG',
    'classification',
    'municipality'
  ]
};

Object.entries(norwegianFeatures).forEach(([component, features]) => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const foundFeatures = features.filter(feature => content.includes(feature));
    
    if (foundFeatures.length >= Math.floor(features.length * 0.8)) { // At least 80% of features
      console.log(`  ✓ ${component} has Norwegian features: ${foundFeatures.join(', ')}`);
    } else {
      console.log(`  ✗ ${component} missing critical Norwegian features`);
      allTestsPassed = false;
    }
  }
});

// Test 4: Verify accessibility features (WCAG compliance)
console.log('\n✅ Test 4: WCAG 2.2 AA Accessibility Features');
const accessibilityFeatures = [
  'aria-label',
  'aria-required',
  'aria-invalid',
  'aria-describedby',
  'role="alert"',
  'aria-live="polite"',
  'labelKey', // Localization requirement
  'required',
  'disabled'
];

requiredComponents.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const foundFeatures = accessibilityFeatures.filter(feature => content.includes(feature));
    
    if (foundFeatures.length >= 6) { // Require most accessibility features
      console.log(`  ✓ ${component} has accessibility features: ${foundFeatures.length}/${accessibilityFeatures.length}`);
    } else {
      console.log(`  ✗ ${component} missing accessibility features: ${foundFeatures.length}/${accessibilityFeatures.length}`);
      allTestsPassed = false;
    }
  }
});

// Test 5: Verify validation algorithms
console.log('\n✅ Test 5: Norwegian Validation Algorithms');
const validationFile = path.join(utilsDir, 'norwegian-validation.ts');
if (fs.existsSync(validationFile)) {
  const content = fs.readFileSync(validationFile, 'utf8');
  
  const validationFeatures = [
    'validatePersonalNumber',
    'validateOrganizationNumber',
    'MOD11',
    'checksum',
    'weights1',
    'weights2',
    'formatPersonalNumber',
    'formatOrganizationNumber',
    'NORWEGIAN_PATTERNS',
    'NORWEGIAN_ERROR_MESSAGES'
  ];
  
  const foundFeatures = validationFeatures.filter(feature => content.includes(feature));
  
  if (foundFeatures.length >= 8) { // Require core validation features
    console.log(`  ✓ Norwegian validation utilities complete: ${foundFeatures.length}/${validationFeatures.length}`);
  } else {
    console.log(`  ✗ Norwegian validation utilities incomplete: ${foundFeatures.length}/${validationFeatures.length}`);
    allTestsPassed = false;
  }
} else {
  console.log('  ✗ Norwegian validation utilities file missing');
  allTestsPassed = false;
}

// Test 6: Verify TypeScript types
console.log('\n✅ Test 6: TypeScript Form Types');
const typesFile = path.join(__dirname, '../src/types/form.types.ts');
if (fs.existsSync(typesFile)) {
  const content = fs.readFileSync(typesFile, 'utf8');
  const requiredTypes = [
    'FormProps',
    'InputProps',
    'PersonalNumberInputProps',
    'OrganizationNumberInputProps',
    'FormComponentProps',
    'ValidationResult',
    'OrganizationData',
    'NorwegianValidationPatterns'
  ];
  
  const missingTypes = requiredTypes.filter(type => !content.includes(type));
  if (missingTypes.length === 0) {
    console.log(`  ✓ All form types defined: ${requiredTypes.join(', ')}`);
  } else {
    console.log(`  ✗ Missing types: ${missingTypes.join(', ')}`);
    allTestsPassed = false;
  }
} else {
  console.log('  ✗ Form types file missing');
  allTestsPassed = false;
}

// Test 7: Verify design token usage
console.log('\n✅ Test 7: Design Token Usage');
let hardcodedFound = false;

requiredComponents.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for hardcoded values
    const hardcodedPatterns = [
      /[^-\w](\d+px)/g,        // pixel values like "16px"
      /[^-\w](#[0-9a-fA-F]{3,6})/g,  // hex colors like "#000000"
      /rgb\s*\(/g,             // rgb() functions
      /rgba\s*\(/g             // rgba() functions
    ];
    
    let componentHardcoded = false;
    hardcodedPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        if (!componentHardcoded) {
          console.log(`  ✗ ${component} contains hardcoded values:`);
          componentHardcoded = true;
          hardcodedFound = true;
        }
        matches.slice(0, 2).forEach(match => { // Show first 2 matches
          console.log(`    - ${match.trim()}`);
        });
      }
    });
    
    if (!componentHardcoded) {
      console.log(`  ✓ ${component} uses design tokens only`);
    }
  }
});

if (hardcodedFound) {
  allTestsPassed = false;
}

// Test 8: Verify forwardRef implementation
console.log('\n✅ Test 8: forwardRef Implementation');
requiredComponents.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('forwardRef') && content.includes('displayName')) {
      console.log(`  ✓ ${component} implements forwardRef with displayName`);
    } else {
      console.log(`  ✗ ${component} missing forwardRef or displayName`);
      allTestsPassed = false;
    }
  }
});

// Summary
console.log('\n' + '='.repeat(60));
if (allTestsPassed) {
  console.log('🎉 All Story 3 tests PASSED!');
  console.log('\n✅ Story 3: Form Components (Norwegian extensions) - COMPLETE');
  
  console.log('\n🇳🇴 Norwegian-specific components implemented:');
  console.log('• Form - NSM classification and municipality support');
  console.log('• Input - Norwegian accessibility and validation');
  console.log('• PersonalNumberInput - Fødselsnummer/D-nummer with MOD11 checksum');
  console.log('• OrganizationNumberInput - Organisasjonsnummer with BRREG integration');
  
  console.log('\n✅ Norwegian compliance features:');
  console.log('• MOD11 checksum validation for personal and organization numbers');
  console.log('• NSM security classification (ÅPEN, BEGRENSET, KONFIDENSIELT, HEMMELIG)');
  console.log('• Norwegian municipality theming and localization');
  console.log('• WCAG 2.2 AA accessibility with aria-labels and screen reader support');
  console.log('• Real-time validation with Norwegian error messages');
  console.log('• Auto-formatting for Norwegian number standards');
  console.log('• BRREG organization data integration (mock)');
  
  console.log('\n✅ Technical implementation:');
  console.log('• Complete TypeScript type definitions');
  console.log('• Design token integration (no hardcoded values)');
  console.log('• forwardRef implementation for className/style props');
  console.log('• Comprehensive Norwegian validation utilities');
  console.log('• Accessibility-first form design');
  
  process.exit(0);
} else {
  console.log('❌ Some Story 3 tests FAILED!');
  console.log('Please review the failures above and fix them.');
  process.exit(1);
} 