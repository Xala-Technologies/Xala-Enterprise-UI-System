/**
 * White Label Provider Tests
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WhiteLabelProvider, useWhiteLabel, withWhiteLabel } from '../src/providers/WhiteLabelProvider';
import { WhiteLabelConfig } from '../src/providers/WhiteLabelProvider/WhiteLabelProvider';

// Test component that uses the hook
const TestComponent = () => {
  const {
    config,
    isWhiteLabeled,
    setConfig,
    updateConfig,
    resetConfig,
    getContent,
    isFeatureEnabled,
  } = useWhiteLabel();

  return (
    <div>
      <div data-testid="is-white-labeled">{isWhiteLabeled.toString()}</div>
      <div data-testid="config-name">{config?.name || 'No Config'}</div>
      <div data-testid="content-title">{getContent('title', 'Default Title')}</div>
      <div data-testid="feature-analytics">{isFeatureEnabled('analytics').toString()}</div>
      
      <button onClick={() => setConfig({
        id: 'test',
        name: 'Test Brand',
        content: { title: 'Custom Title' },
        features: { analytics: false },
      })}>
        Set Config
      </button>
      
      <button onClick={() => updateConfig({ name: 'Updated Brand' })}>
        Update Config
      </button>
      
      <button onClick={resetConfig}>Reset Config</button>
    </div>
  );
};

// HOC test component
interface TestHOCProps {
  message: string;
  whiteLabel?: any;
}

const TestHOCComponent = ({ message, whiteLabel }: TestHOCProps) => (
  <div>
    <div data-testid="message">{message}</div>
    <div data-testid="hoc-config">{whiteLabel?.config?.name || 'No HOC Config'}</div>
  </div>
);

const WrappedHOCComponent = withWhiteLabel(TestHOCComponent);

describe('WhiteLabelProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    // Clean up any custom styles
    document.getElementById('white-label-custom-css')?.remove();
    document.getElementById('white-label-custom-js')?.remove();
  });

  it('should provide default context values', () => {
    render(
      <WhiteLabelProvider>
        <TestComponent />
      </WhiteLabelProvider>
    );

    expect(screen.getByTestId('is-white-labeled')).toHaveTextContent('false');
    expect(screen.getByTestId('config-name')).toHaveTextContent('No Config');
    expect(screen.getByTestId('content-title')).toHaveTextContent('Default Title');
    expect(screen.getByTestId('feature-analytics')).toHaveTextContent('true');
  });

  it('should accept initial config', () => {
    const config: WhiteLabelConfig = {
      id: 'initial',
      name: 'Initial Brand',
      content: { title: 'Initial Title' },
      features: { analytics: false },
    };

    render(
      <WhiteLabelProvider config={config}>
        <TestComponent />
      </WhiteLabelProvider>
    );

    expect(screen.getByTestId('is-white-labeled')).toHaveTextContent('true');
    expect(screen.getByTestId('config-name')).toHaveTextContent('Initial Brand');
    expect(screen.getByTestId('content-title')).toHaveTextContent('Initial Title');
    expect(screen.getByTestId('feature-analytics')).toHaveTextContent('false');
  });

  it('should set and update config', async () => {
    render(
      <WhiteLabelProvider>
        <TestComponent />
      </WhiteLabelProvider>
    );

    await userEvent.click(screen.getByText('Set Config'));

    expect(screen.getByTestId('is-white-labeled')).toHaveTextContent('true');
    expect(screen.getByTestId('config-name')).toHaveTextContent('Test Brand');
    expect(screen.getByTestId('content-title')).toHaveTextContent('Custom Title');

    await userEvent.click(screen.getByText('Update Config'));

    expect(screen.getByTestId('config-name')).toHaveTextContent('Updated Brand');
    // Content should remain unchanged
    expect(screen.getByTestId('content-title')).toHaveTextContent('Custom Title');
  });

  it('should reset config', async () => {
    render(
      <WhiteLabelProvider>
        <TestComponent />
      </WhiteLabelProvider>
    );

    await userEvent.click(screen.getByText('Set Config'));
    expect(screen.getByTestId('is-white-labeled')).toHaveTextContent('true');

    await userEvent.click(screen.getByText('Reset Config'));
    expect(screen.getByTestId('is-white-labeled')).toHaveTextContent('false');
    expect(screen.getByTestId('config-name')).toHaveTextContent('No Config');
  });

  it('should persist config to localStorage', async () => {
    render(
      <WhiteLabelProvider enablePersistence={true}>
        <TestComponent />
      </WhiteLabelProvider>
    );

    await userEvent.click(screen.getByText('Set Config'));

    const stored = localStorage.getItem('xala-white-label-config');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.name).toBe('Test Brand');
  });

  it('should load config from localStorage', () => {
    const config: WhiteLabelConfig = {
      id: 'stored',
      name: 'Stored Brand',
    };
    
    localStorage.setItem('xala-white-label-config', JSON.stringify(config));

    render(
      <WhiteLabelProvider enablePersistence={true}>
        <TestComponent />
      </WhiteLabelProvider>
    );

    expect(screen.getByTestId('config-name')).toHaveTextContent('Stored Brand');
  });

  it('should apply custom CSS', () => {
    const config: WhiteLabelConfig = {
      id: 'styled',
      name: 'Styled Brand',
      customCSS: '.test-class { color: red; }',
    };

    render(
      <WhiteLabelProvider config={config}>
        <TestComponent />
      </WhiteLabelProvider>
    );

    const styleEl = document.getElementById('white-label-custom-css');
    expect(styleEl).toBeTruthy();
    expect(styleEl?.textContent).toContain('.test-class { color: red; }');
  });

  it('should apply favicon', () => {
    const config: WhiteLabelConfig = {
      id: 'favicon',
      name: 'Favicon Brand',
      favicon: '/custom-favicon.ico',
    };

    render(
      <WhiteLabelProvider config={config}>
        <TestComponent />
      </WhiteLabelProvider>
    );

    const linkEl = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    expect(linkEl).toBeTruthy();
    expect(linkEl.href).toContain('/custom-favicon.ico');
  });

  it('should handle custom storage key', async () => {
    const customKey = 'custom-white-label-key';
    
    render(
      <WhiteLabelProvider storageKey={customKey} enablePersistence={true}>
        <TestComponent />
      </WhiteLabelProvider>
    );

    await userEvent.click(screen.getByText('Set Config'));

    expect(localStorage.getItem(customKey)).toBeTruthy();
    expect(localStorage.getItem('xala-white-label-config')).toBeFalsy();
  });
});

describe('withWhiteLabel HOC', () => {
  it('should inject white label context as prop', () => {
    const config: WhiteLabelConfig = {
      id: 'hoc',
      name: 'HOC Brand',
    };

    render(
      <WhiteLabelProvider config={config}>
        <WrappedHOCComponent message="Hello" />
      </WhiteLabelProvider>
    );

    expect(screen.getByTestId('message')).toHaveTextContent('Hello');
    expect(screen.getByTestId('hoc-config')).toHaveTextContent('HOC Brand');
  });
});

describe('Error handling', () => {
  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useWhiteLabel must be used within a WhiteLabelProvider'
    );

    spy.mockRestore();
  });

  it('should handle invalid localStorage data', () => {
    localStorage.setItem('xala-white-label-config', 'invalid json');

    render(
      <WhiteLabelProvider enablePersistence={true}>
        <TestComponent />
      </WhiteLabelProvider>
    );

    // Should fallback to no config
    expect(screen.getByTestId('config-name')).toHaveTextContent('No Config');
  });
});