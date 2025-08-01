/**
 * SSR-specific test setup
 */

// Mock CSS modules for SSR tests
global.CSS = {
  supports: () => false,
  escape: (str) => str,
};

// Mock requestAnimationFrame for SSR
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// Ensure we're in SSR mode for these tests
process.env.NODE_ENV = 'test';

// Mock window for SSR context
if (typeof window !== 'undefined') {
  // Store original window
  global._originalWindow = global.window;
  
  // Some SSR tests need window to be undefined
  delete global.window;
}

// Export helper to restore window
global.restoreWindow = () => {
  if (global._originalWindow) {
    global.window = global._originalWindow;
  }
};