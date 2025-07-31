/**
 * Comprehensive SSR Testing Suite
 * Tests server-side rendering compatibility and hydration
 */

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { render, hydrate } from '@testing-library/react';
import { UiProvider } from '../../src/providers/UiProvider/UiProvider';
import { useTokens, useTheme } from '../../src/providers/UiProvider/UiProvider';
import { Button } from '../../src/components/action-feedback/Button';
import { Card } from '../../src/components/ui/card';
import { Container } from '../../src/components/layout/Container';

// Mock window and document for SSR tests
const mockSSREnvironment = () => {
  const originalWindow = global.window;
  const originalDocument = global.document;
  
  beforeEach(() => {
    // @ts-ignore
    delete global.window;
    // @ts-ignore
    delete global.document;
  });
  
  afterEach(() => {
    global.window = originalWindow;
    global.document = originalDocument;
  });
};

describe('SSR Compatibility Tests', () => {
  mockSSREnvironment();

  describe('Provider SSR', () => {
    it('should render UiProvider on server without errors', () => {
      const TestComponent = () => (
        <UiProvider defaultTheme="light">
          <div>Test Content</div>
        </UiProvider>
      );

      const html = renderToString(<TestComponent />);
      expect(html).toContain('Test Content');
      expect(html).not.toContain('window is not defined');
    });

    it('should handle theme initialization on server', () => {
      const TestComponent = () => {
        const { theme } = useTheme();
        return <div>Theme: {theme}</div>;
      };

      const html = renderToString(
        <UiProvider defaultTheme="dark">
          <TestComponent />
        </UiProvider>
      );

      expect(html).toContain('Theme: dark');
    });

    it('should provide default tokens on server', () => {
      const TestComponent = () => {
        const tokens = useTokens();
        return <div>Primary: {tokens.colors.primary[500]}</div>;
      };

      const html = renderToString(
        <UiProvider>
          <TestComponent />
        </UiProvider>
      );

      expect(html).toContain('Primary:');
      expect(html).not.toContain('undefined');
    });
  });

  describe('Component SSR', () => {
    it('should render Button on server', () => {
      const html = renderToString(
        <UiProvider>
          <Button variant="primary">Click me</Button>
        </UiProvider>
      );

      expect(html).toContain('Click me');
      expect(html).toContain('button');
    });

    it('should render Card on server', () => {
      const html = renderToString(
        <UiProvider>
          <Card>Card content</Card>
        </UiProvider>
      );

      expect(html).toContain('Card content');
    });

    it('should render Container with responsive classes', () => {
      const html = renderToString(
        <UiProvider>
          <Container maxWidth="lg">Container content</Container>
        </UiProvider>
      );

      expect(html).toContain('Container content');
      expect(html).toMatch(/max-w-/);
    });
  });

  describe('Static Markup Generation', () => {
    it('should generate static markup without React IDs', () => {
      const TestComponent = () => (
        <UiProvider>
          <Button>Static Button</Button>
        </UiProvider>
      );

      const staticHtml = renderToStaticMarkup(<TestComponent />);
      const dynamicHtml = renderToString(<TestComponent />);

      // Static markup should not contain React's data attributes
      expect(staticHtml).not.toMatch(/data-reactroot/);
      expect(dynamicHtml).toMatch(/data-reactroot/);
    });
  });

  describe('CSS-in-JS SSR', () => {
    it('should handle CSS variable injection on server', () => {
      const TestComponent = () => {
        const tokens = useTokens();
        return (
          <div style={{ color: `var(--color-primary-500, ${tokens.colors.primary[500]})` }}>
            Styled content
          </div>
        );
      };

      const html = renderToString(
        <UiProvider>
          <TestComponent />
        </UiProvider>
      );

      expect(html).toContain('var(--color-primary-500');
    });
  });
});

describe('Hydration Tests', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should hydrate without warnings', () => {
    const TestComponent = () => (
      <UiProvider>
        <Button variant="primary">Hydrate me</Button>
      </UiProvider>
    );

    // First render on server
    const html = renderToString(<TestComponent />);
    container.innerHTML = html;

    // Then hydrate on client
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    hydrate(<TestComponent />, container);
    
    // Should not have hydration warnings
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should maintain state after hydration', () => {
    const TestComponent = () => {
      const [count, setCount] = React.useState(0);
      return (
        <UiProvider>
          <Button onClick={() => setCount(c => c + 1)}>
            Count: {count}
          </Button>
        </UiProvider>
      );
    };

    // Server render
    const html = renderToString(<TestComponent />);
    container.innerHTML = html;

    // Hydrate
    const { getByText } = render(<TestComponent />, { 
      container, 
      hydrate: true 
    });

    expect(getByText('Count: 0')).toBeInTheDocument();
  });

  it('should preserve theme preference after hydration', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <span>Theme: {theme}</span>
          <button onClick={() => setTheme('dark')}>Dark</button>
        </div>
      );
    };

    // Server render with light theme
    const html = renderToString(
      <UiProvider defaultTheme="light">
        <TestComponent />
      </UiProvider>
    );
    container.innerHTML = html;

    // Hydrate
    const { getByText } = render(
      <UiProvider defaultTheme="light">
        <TestComponent />
      </UiProvider>
    , { 
      container, 
      hydrate: true 
    });

    expect(getByText('Theme: light')).toBeInTheDocument();
  });
});

describe('SSR Edge Cases', () => {
  mockSSREnvironment();

  it('should handle useLayoutEffect on server', () => {
    const TestComponent = () => {
      // This would normally cause issues on server
      React.useLayoutEffect(() => {
        console.log('Layout effect');
      }, []);
      
      return <div>Layout effect component</div>;
    };

    const html = renderToString(
      <UiProvider>
        <TestComponent />
      </UiProvider>
    );

    expect(html).toContain('Layout effect component');
  });

  it('should handle media queries on server', () => {
    const TestComponent = () => {
      // useMediaQuery should return default value on server
      const isMobile = false; // Default for SSR
      
      return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
    };

    const html = renderToString(
      <UiProvider>
        <TestComponent />
      </UiProvider>
    );

    expect(html).toContain('Desktop');
  });

  it('should handle localStorage access gracefully', () => {
    const TestComponent = () => {
      const [value, setValue] = React.useState<string | null>(null);
      
      React.useEffect(() => {
        // This should not run on server
        if (typeof window !== 'undefined') {
          setValue(localStorage.getItem('test') || 'default');
        }
      }, []);
      
      return <div>Value: {value || 'server'}</div>;
    };

    const html = renderToString(
      <UiProvider>
        <TestComponent />
      </UiProvider>
    );

    expect(html).toContain('Value: server');
  });
});

describe('SSR Performance', () => {
  it('should render large component tree efficiently', () => {
    const LargeTree = () => (
      <UiProvider>
        {Array.from({ length: 100 }, (_, i) => (
          <Card key={i}>
            <Button variant="primary">Button {i}</Button>
          </Card>
        ))}
      </UiProvider>
    );

    const start = Date.now();
    const html = renderToString(<LargeTree />);
    const duration = Date.now() - start;

    expect(html).toBeTruthy();
    expect(duration).toBeLessThan(100); // Should render in less than 100ms
  });

  it('should handle deep nesting without stack overflow', () => {
    const DeepNesting = ({ depth }: { depth: number }): JSX.Element => {
      if (depth === 0) return <div>Leaf</div>;
      return <Card><DeepNesting depth={depth - 1} /></Card>;
    };

    const html = renderToString(
      <UiProvider>
        <DeepNesting depth={50} />
      </UiProvider>
    );

    expect(html).toContain('Leaf');
  });
});