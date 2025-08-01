/**
 * Debug script to test component rendering
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Test simple rendering
const TestComponent = () => React.createElement('div', {}, 'Hello World');

async function testRender() {
  try {
    const html = renderToStaticMarkup(React.createElement(TestComponent));
    console.log('Simple test HTML:', html);
    
    // Now test with actual components  
    const { Button } = await import('./src/components/action-feedback/Button.tsx');
    const { UiProvider } = await import('./src/providers/UiProvider/UiProvider.tsx');
    
    console.log('Button imported:', typeof Button);
    console.log('UiProvider imported:', typeof UiProvider);
    
    const App = React.createElement(
      UiProvider,
      { defaultTheme: 'light' },
      React.createElement(Button, { variant: 'primary' }, 'Test Button')
    );
    
    const componentHtml = renderToStaticMarkup(App);
    console.log('Component HTML:', componentHtml);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testRender();