#!/usr/bin/env node

/**
 * Tailwind Preset Validation Script
 * Validates that the Tailwind preset is properly configured and working
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

function validatePreset() {
  const presetPath = path.join(__dirname, '..', 'tailwind.preset.js');
  const configPath = path.join(__dirname, '..', 'tailwind.config.js');
  
  console.log('🔍 Validating Tailwind Preset...\n');

  // Check if preset file exists
  if (!fs.existsSync(presetPath)) {
    console.error('❌ tailwind.preset.js not found');
    process.exit(1);
  }
  console.log('✅ tailwind.preset.js exists');

  // Check if main config exists
  if (!fs.existsSync(configPath)) {
    console.error('❌ tailwind.config.js not found');
    process.exit(1);
  }
  console.log('✅ tailwind.config.js exists');

  try {
    // Load and validate preset
    const preset = require(presetPath);
    
    // Validate preset structure
    const requiredProperties = ['theme', 'plugins'];
    for (const prop of requiredProperties) {
      if (!preset[prop]) {
        console.error(`❌ Preset missing required property: ${prop}`);
        process.exit(1);
      }
    }
    console.log('✅ Preset has required properties');

    // Validate theme structure
    const requiredThemeProperties = ['colors', 'spacing', 'fontFamily', 'fontSize'];
    for (const prop of requiredThemeProperties) {
      if (!preset.theme[prop]) {
        console.error(`❌ Preset theme missing required property: ${prop}`);
        process.exit(1);
      }
    }
    console.log('✅ Preset theme has required properties');

    // Validate semantic colors
    const requiredColors = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info', 'error'];
    for (const color of requiredColors) {
      if (!preset.theme.colors[color]) {
        console.error(`❌ Preset missing semantic color: ${color}`);
        process.exit(1);
      }
    }
    console.log('✅ Preset has all semantic colors');

    // Validate Norwegian compliance colors
    const nsmColors = ['open', 'restricted', 'confidential', 'secret'];
    for (const color of nsmColors) {
      if (!preset.theme.colors.nsm || !preset.theme.colors.nsm[color]) {
        console.error(`❌ Preset missing NSM color: nsm.${color}`);
        process.exit(1);
      }
    }
    console.log('✅ Preset has Norwegian compliance colors');

    // Validate 8pt grid spacing
    const requiredSpacing = ['1', '2', '4', '8', '16', '32'];
    for (const space of requiredSpacing) {
      if (!preset.theme.spacing[space]) {
        console.error(`❌ Preset missing 8pt grid spacing: ${space}`);
        process.exit(1);
      }
    }
    console.log('✅ Preset has 8pt grid spacing');

    // Validate professional button heights
    const buttonHeights = ['button-sm', 'button-md', 'button-lg', 'button-xl'];
    for (const height of buttonHeights) {
      if (!preset.theme.extend?.height?.[height]) {
        console.error(`❌ Preset missing button height: ${height}`);
        process.exit(1);
      }
    }
    console.log('✅ Preset has professional button heights');

    // Validate plugins
    if (!Array.isArray(preset.plugins) || preset.plugins.length === 0) {
      console.error('❌ Preset should have at least one plugin');
      process.exit(1);
    }
    console.log('✅ Preset has plugins');

    console.log('\n🎉 Tailwind Preset validation passed!');
    console.log('\n📝 Preset Summary:');
    console.log(`- Colors: ${Object.keys(preset.theme.colors).length}`);
    console.log(`- Spacing tokens: ${Object.keys(preset.theme.spacing).length}`);
    console.log(`- Font families: ${Object.keys(preset.theme.fontFamily).length}`);
    console.log(`- Font sizes: ${Object.keys(preset.theme.fontSize).length}`);
    console.log(`- Plugins: ${preset.plugins.length}`);

  } catch (error) {
    console.error('❌ Error validating preset:', error.message);
    process.exit(1);
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validatePreset();
}

export { validatePreset };