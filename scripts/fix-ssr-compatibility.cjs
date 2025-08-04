#!/usr/bin/env node

/**
 * Fix SSR compatibility issues in the built distribution
 * This ensures components work correctly with server-side rendering
 */

const fs = require('fs').promises;
const path = require('path');

const DIST_DIR = './dist';

async function fixSSRInFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let modified = false;

    // Remove any remaining 'use client' directives (these should be in separate client files)
    if (content.includes("'use client'") || content.includes('"use client"')) {
      content = content.replace(/['"]use client['"];?\s*/g, '');
      modified = true;
    }

    // Fix window/document references to be SSR-safe
    const windowRegex = /(?<!typeof )window\./g;
    const documentRegex = /(?<!typeof )document\./g;
    
    if (windowRegex.test(content) || documentRegex.test(content)) {
      // Wrap in typeof checks
      content = content.replace(windowRegex, "typeof window !== 'undefined' && window.");
      content = content.replace(documentRegex, "typeof document !== 'undefined' && document.");
      modified = true;
    }

    // Ensure hooks are not called at module level
    const hookRegex = /^(const|let|var)\s+\w+\s*=\s*use[A-Z]/gm;
    if (hookRegex.test(content)) {
      console.warn(`Warning: Potential SSR issue in ${filePath} - hooks at module level`);
    }

    if (modified) {
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`Fixed SSR compatibility in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && path.extname(entry.name) === '.js') {
      await fixSSRInFile(fullPath);
    }
  }
}

async function createSSREntryPoint() {
  // Create a server-safe entry point
  const serverEntry = `/**
 * Server-side entry point for SSR applications
 * This file ensures all exports are SSR-compatible
 */

// Re-export all components and utilities
export * from './index.js';

// SSR-specific utilities
export const isServer = typeof window === 'undefined';
export const isClient = typeof window !== 'undefined';

// Safe window/document access helpers
export const safeWindow = typeof window !== 'undefined' ? window : undefined;
export const safeDocument = typeof document !== 'undefined' ? document : undefined;
`;

  await fs.writeFile(path.join(DIST_DIR, 'server.js'), serverEntry, 'utf-8');
  console.log('Created SSR entry point: dist/server.js');
}

async function main() {
  try {
    console.log('Fixing SSR compatibility...');
    
    // Check if dist directory exists
    try {
      await fs.access(DIST_DIR);
    } catch {
      console.log('No dist directory found, skipping SSR fixes');
      return;
    }

    await processDirectory(DIST_DIR);
    await createSSREntryPoint();
    
    console.log('SSR compatibility fixes complete!');
  } catch (error) {
    console.error('Error fixing SSR compatibility:', error);
    process.exit(1);
  }
}

main();