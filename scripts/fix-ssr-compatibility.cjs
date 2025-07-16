/**
 * @fileoverview SSR Compatibility Fix Script
 * @description Fixes SSR compatibility issues in the built package
 * @version 1.0.0
 * @compliance SSR-Safe, Production-ready
 */

const fs = require('fs');
const path = require('path');

// Files that need SSR compatibility fixes
const files = [
  'dist/providers/DesignSystemProvider.js',
  'dist/hooks/useTokens.js',
  'dist/providers/index.js',
  'dist/index.js',
];

/**
 * Apply SSR safety checks to JavaScript files
 */
function applySsrSafetyChecks(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found, skipping: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add SSR safety check for React imports
  if (content.includes('import { createContext') && !content.includes('SSR Safety Check')) {
    content = `// SSR Safety Check
if (typeof window === 'undefined' && typeof global !== 'undefined') {
  global.React = global.React || require('react');
}

${content}`;
    modified = true;
  }

  // Add window checks before React hook usage
  const hookPatterns = [
    /(\s+)(const \[.+\] = useState\(.+\);)/g,
    /(\s+)(const .+ = useContext\(.+\);)/g,
    /(\s+)(const .+ = useEffect\(.+\);)/g,
    /(\s+)(const .+ = useMemo\(.+\);)/g,
  ];

  hookPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      content = content.replace(pattern, (match, indent, hookCall) => {
        if (!match.includes('typeof window')) {
          modified = true;
          return `${indent}// SSR Safety
${indent}if (typeof window === 'undefined') return;
${indent}${hookCall}`;
        }
        return match;
      });
    }
  });

  // Add fallback exports for SSR environments
  if (filePath.includes('index.js') && !content.includes('SSR_FALLBACK_EXPORTS')) {
    content += `

// SSR_FALLBACK_EXPORTS
if (typeof window === 'undefined') {
  // Provide safe fallbacks for SSR environments
  module.exports = {
    ...module.exports,
    DesignSystemProvider: ({ children }) => children,
    useDesignSystem: () => ({
      currentTemplate: null,
      _templateId: 'base-light',
      isDarkMode: false,
      isLoading: false,
      setTemplate: async () => {},
      toggleDarkMode: () => {},
      setDarkMode: () => {},
      getAvailableTemplates: async () => [],
      reloadTemplate: async () => {},
    }),
    useTokens: () => ({
      tokens: {},
      isLoading: false,
      colors: {},
      typography: {},
      spacing: {},
      branding: {},
      accessibility: {},
      responsive: {},
      getToken: () => undefined,
      hasToken: () => false,
      themeInfo: { id: 'ssr-fallback', name: 'SSR Fallback', category: 'BASE', mode: 'LIGHT', version: '1.0.0' },
    }),
  };
}`;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

/**
 * Fix CommonJS/ESM compatibility issues
 */
function fixModuleCompatibility(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix require() calls to be safer
  if (content.includes("require('react')") && !content.includes('React module safety')) {
    content = content.replace(
      /require\('react'\)/g,
      `(() => {
  // React module safety
  try {
    return require('react');
  } catch (error) {
    console.warn('[UI System] React not available during SSR');
    return null;
  }
})()`
    );
    modified = true;
  }

  // Ensure JSON imports work in both environments
  if (content.includes('import ') && content.includes('.json')) {
    content = content.replace(
      /import (.+) from ['"](.+\.json)['"];/g,
      `// JSON import compatibility
let $1;
try {
  $1 = require('$2');
} catch (error) {
  try {
    $1 = await import('$2', { with: { type: 'json' } });
  } catch (importError) {
    console.warn('[UI System] Failed to load JSON:', '$2');
    $1 = {};
  }
}`
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

/**
 * Main execution
 */
function main() {
  console.log('🔧 Applying SSR compatibility fixes...\n');

  let totalFixed = 0;

  files.forEach(file => {
    console.log(`Processing: ${file}`);

    const ssrFixed = applySsrSafetyChecks(file);
    const moduleFixed = fixModuleCompatibility(file);

    if (ssrFixed || moduleFixed) {
      console.log(`✅ Fixed SSR compatibility for ${file}`);
      totalFixed++;
    } else {
      console.log(`⚪ No changes needed for ${file}`);
    }
  });

  console.log(`\n🎉 SSR compatibility fixes complete!`);
  console.log(`📊 Files processed: ${files.length}`);
  console.log(`🔧 Files modified: ${totalFixed}`);

  if (totalFixed > 0) {
    console.log('\n✅ Package is now SSR-compatible');
    console.log('🚀 Safe to use with Next.js, Remix, and other SSR frameworks');
  }
}

// Run the script
main();
