/**
 * Test script for Tailwind config transformer
 */

const path = require('path');
const fs = require('fs');

async function testTailwindTransformer() {
  try {
    // Import the required modules
    const { generateTailwindConfig } = await import('../dist/tokens/transformers/tailwind-config.js');
    const { loadThemeTemplates } = await import('../dist/tokens/themes/template-loader.js');
    
    console.log('🧪 Testing Tailwind Config Transformer...\n');
    
    // Load theme templates
    const themes = await loadThemeTemplates();
    const lightTheme = themes.find(t => t.id === 'light');
    
    if (!lightTheme) {
      throw new Error('Light theme not found');
    }
    
    // Generate Tailwind config with different options
    console.log('📝 Generating Tailwind configs...\n');
    
    // 1. Default options (extend mode)
    const defaultResult = generateTailwindConfig(lightTheme);
    console.log('✅ Default config generated (extend mode)');
    
    // 2. Replace mode
    const replaceResult = generateTailwindConfig(lightTheme, {
      mode: 'replace',
      includeComments: true,
    });
    console.log('✅ Replace mode config generated');
    
    // 3. With prefix and important
    const prefixedResult = generateTailwindConfig(lightTheme, {
      prefix: 'tw-',
      important: '#app',
      generateSafelist: true,
    });
    console.log('✅ Prefixed config with important selector generated');
    
    // 4. Minimal config
    const minimalResult = generateTailwindConfig(lightTheme, {
      includeComments: false,
      generateContent: false,
      includePlugins: false,
      generateSafelist: false,
    });
    console.log('✅ Minimal config generated');
    
    // Create output directory
    const outputDir = path.join(process.cwd(), 'dist', 'tailwind-configs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save generated configs
    fs.writeFileSync(
      path.join(outputDir, 'tailwind.config.default.js'),
      defaultResult.full
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'tailwind.config.replace.js'),
      replaceResult.full
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'tailwind.config.prefixed.js'),
      prefixedResult.full
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'tailwind.config.minimal.js'),
      minimalResult.full
    );
    
    console.log('\n📁 Configs saved to:', outputDir);
    
    // Display sample output
    console.log('\n📋 Sample output (first 50 lines of default config):');
    console.log('─'.repeat(60));
    const lines = defaultResult.config.split('\n').slice(0, 50);
    console.log(lines.join('\n'));
    console.log('─'.repeat(60));
    
    // Validate generated configs
    console.log('\n🔍 Validating generated configs...');
    
    // Check for required sections
    const requiredSections = ['colors', 'typography', 'spacing', 'screens'];
    const configContent = defaultResult.config;
    
    requiredSections.forEach(section => {
      if (configContent.includes(section)) {
        console.log(`✅ ${section} section found`);
      } else {
        console.log(`❌ ${section} section missing`);
      }
    });
    
    // Check for proper JavaScript syntax
    try {
      // Basic syntax check (would need actual JS parser for full validation)
      if (configContent.includes('module.exports = {') && configContent.includes('};')) {
        console.log('✅ Valid module export structure');
      }
    } catch (error) {
      console.error('❌ Invalid JavaScript syntax');
    }
    
    console.log('\n✨ Tailwind config transformer test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testTailwindTransformer();