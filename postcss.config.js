/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    // Import CSS files
    'postcss-import': {},
    
    // Process Tailwind CSS
    tailwindcss: {},
    
    // Add autoprefixer for better browser support
    autoprefixer: {},
    
    // Optimize CSS custom properties
    'postcss-custom-properties': {
      // Don't preserve custom properties for better fallback support
      preserve: true,
      // Add fallbacks for older browsers
      fallbacks: true,
    },
    
    // Add CSS nesting support
    'postcss-nesting': {},
    
    // Minify CSS in production
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          // Don't remove comments with design system info
          discardComments: { removeAll: false },
          // Preserve CSS custom properties
          reduceIdents: false,
          // Don't merge rules that might break CSS layers
          mergeRules: false,
        }],
      },
    }),
  },
};