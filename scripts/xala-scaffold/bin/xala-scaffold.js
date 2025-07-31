#!/usr/bin/env node

// Main CLI entry point that will load the compiled dist files
import('../dist/cli.js').catch((error) => {
  console.error('Failed to load xala-scaffold CLI:', error.message);
  console.error('Please ensure the project is built by running: npm run build');
  process.exit(1);
});