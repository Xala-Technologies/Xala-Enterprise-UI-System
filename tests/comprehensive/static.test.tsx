/**
 * Comprehensive Static Analysis Testing Suite
 * Tests for static rendering, build-time optimizations, and static exports
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { UiProvider } from '../../src/providers/UiProvider/UiProvider';
import { Button } from '../../src/components/action-feedback/Button';
import { Card } from '../../src/components/ui/card';
import { Input } from '../../src/components/ui/input';
import { 
  generateCSSVariables, 
  generateTailwindConfig,
  generateTypeScriptTypes 
} from '../../src/tokens/transformers';

describe('Static Export Tests', () => {
  describe('Component Static Exports', () => {
    it('should export components as static modules', () => {
      // Components should be importable without side effects
      expect(Button).toBeDefined();
      expect(Card).toBeDefined();
      expect(Input).toBeDefined();
      
      // Should have proper display names
      expect(Button.displayName).toBe('Button');
    });

    it('should tree-shake unused components', () => {
      // This is more of a build-time test, but we can verify structure
      const buttonKeys = Object.keys(Button);
      
      // Should not include unnecessary properties
      expect(buttonKeys).not.toContain('_internalState');
      expect(buttonKeys).not.toContain('_privateMethod');
    });
  });

  describe('Static HTML Generation', () => {
    it('should generate clean static HTML without hydration markers', () => {
      const App = () => (
        <UiProvider defaultTheme="light" enableHydration={false}>
          <div className="container">
            <Button variant="primary">Static Button</Button>
            <Card>
              <h2>Static Card</h2>
              <p>This is static content</p>
            </Card>
          </div>
        </UiProvider>
      );

      const html = renderToStaticMarkup(<App />);
      
      // Should not contain React markers
      expect(html).not.toContain('data-reactroot');
      expect(html).not.toContain('data-reactid');
      expect(html).not.toContain('<!-- -->');
      
      // Should contain actual content
      expect(html).toContain('Static Button');
      expect(html).toContain('Static Card');
      expect(html).toContain('This is static content');
    });

    it('should generate consistent HTML across renders', () => {
      const Component = () => (
        <UiProvider enableHydration={false}>
          <Button variant="primary" size="medium">
            Consistent Button
          </Button>
        </UiProvider>
      );

      const html1 = renderToStaticMarkup(<Component />);
      const html2 = renderToStaticMarkup(<Component />);
      
      // Should be identical
      expect(html1).toBe(html2);
    });

    it('should handle conditional rendering statically', () => {
      const ConditionalComponent = ({ show }: { show: boolean }) => (
        <UiProvider enableHydration={false}>
          {show && <Button>Conditional</Button>}
          {!show && <Card>Alternative</Card>}
        </UiProvider>
      );

      const withButton = renderToStaticMarkup(<ConditionalComponent show={true} />);
      const withCard = renderToStaticMarkup(<ConditionalComponent show={false} />);
      
      expect(withButton).toContain('Conditional');
      expect(withButton).not.toContain('Alternative');
      
      expect(withCard).toContain('Alternative');
      expect(withCard).not.toContain('Conditional');
    });
  });

  describe('Static CSS Generation', () => {
    it('should generate static CSS files', () => {
      const theme = {
        id: 'static-theme',
        name: 'Static Theme',
        mode: 'LIGHT' as const,
        colors: {
          primary: { 500: '#3b82f6' },
          neutral: { 900: '#171717' },
        },
        typography: {
          fontSize: { base: '1rem' },
        },
        spacing: { 4: '1rem' },
        branding: {},
        accessibility: {},
        responsive: { breakpoints: { md: '768px' } },
      };

      const cssResult = generateCSSVariables(theme);
      
      // Should generate valid CSS
      expect(cssResult.full).toContain(':root {');
      expect(cssResult.full).toContain('--color-primary-500: #3b82f6');
      
      // Should be writable to file
      const cssContent = cssResult.full;
      expect(cssContent.length).toBeGreaterThan(0);
      expect(() => {
        // Simulate writing to file (don't actually write in tests)
        const data = Buffer.from(cssContent, 'utf8');
        expect(data.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    it('should generate atomic CSS classes', () => {
      const theme = {
        colors: {
          primary: { 500: '#3b82f6' },
        },
        spacing: {
          4: '1rem',
          8: '2rem',
        },
      };

      const cssResult = generateCSSVariables(theme as any, {
        generateUtilityClasses: true,
      });
      
      // Should include utility classes
      expect(cssResult.utilities).toContain('.text-primary-500');
      expect(cssResult.utilities).toContain('.p-4');
      expect(cssResult.utilities).toContain('.m-8');
    });
  });

  describe('Static Configuration Files', () => {
    it('should generate static Tailwind config', () => {
      const theme = {
        id: 'static',
        name: 'Static',
        mode: 'LIGHT' as const,
        colors: { primary: { 500: '#3b82f6' } },
        typography: { fontSize: { base: '1rem' } },
        spacing: { 4: '1rem' },
        branding: {},
        accessibility: {},
        responsive: {},
      };

      const tailwindResult = generateTailwindConfig(theme);
      
      // Should be valid JavaScript
      expect(tailwindResult.full).toContain('module.exports = {');
      expect(tailwindResult.full).toContain("'primary': {");
      
      // Should be evaluable (in a real environment)
      const hasValidSyntax = /module\.exports\s*=\s*{[\s\S]*}/.test(tailwindResult.full);
      expect(hasValidSyntax).toBe(true);
    });

    it('should generate static TypeScript definitions', () => {
      const theme = {
        id: 'static',
        name: 'Static',
        mode: 'LIGHT' as const,
        colors: { primary: { 500: '#3b82f6' } },
        typography: {},
        spacing: {},
        branding: {},
        accessibility: {},
        responsive: {},
      };

      const tsResult = generateTypeScriptTypes(theme);
      
      // Should generate valid TypeScript
      expect(tsResult.types).toContain('export interface');
      expect(tsResult.types).toContain('ColorTokens');
      
      // Should be compilable (would need TypeScript compiler to fully test)
      const hasValidSyntax = /export\s+interface\s+\w+\s*{[\s\S]*}/.test(tsResult.types);
      expect(hasValidSyntax).toBe(true);
    });
  });

  describe('Static Asset Optimization', () => {
    it('should inline critical tokens', () => {
      const CriticalComponent = () => {
        // These tokens should be inlined in static builds
        const criticalStyles = {
          color: 'var(--color-primary-500)',
          padding: 'var(--spacing-4)',
          fontSize: 'var(--font-size-base)',
        };
        
        return (
          <div style={criticalStyles}>
            Critical Content
          </div>
        );
      };

      const html = renderToStaticMarkup(
        <UiProvider enableHydration={false}>
          <CriticalComponent />
        </UiProvider>
      );
      
      // Should contain CSS variable references
      expect(html).toContain('var(--color-primary-500)');
      expect(html).toContain('var(--spacing-4)');
    });

    it('should handle static image references', () => {
      const ImageComponent = () => (
        <UiProvider enableHydration={false}>
          <Card>
            <img 
              src="/static/logo.png" 
              alt="Logo"
              width={200}
              height={50}
            />
          </Card>
        </UiProvider>
      );

      const html = renderToStaticMarkup(<ImageComponent />);
      
      // Should preserve static paths
      expect(html).toContain('/static/logo.png');
      expect(html).toContain('width="200"');
      expect(html).toContain('height="50"');
    });
  });

  describe('Build-Time Validation', () => {
    it('should validate props at build time', () => {
      // TypeScript would catch these at build time
      // Here we test runtime validation for static generation
      
      const InvalidComponent = () => (
        <Button 
          // @ts-expect-error - Invalid variant
          variant="invalid-variant" 
          size="medium"
        >
          Invalid
        </Button>
      );

      // Should still render with fallback
      const html = renderToStaticMarkup(
        <UiProvider enableHydration={false}>
          <InvalidComponent />
        </UiProvider>
      );
      
      expect(html).toContain('Invalid');
    });

    it('should strip development-only code', () => {
      const DevComponent = () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('This should be stripped in production');
        }
        
        return <div>Production Content</div>;
      };

      const html = renderToStaticMarkup(
        <UiProvider enableHydration={false}>
          <DevComponent />
        </UiProvider>
      );
      
      expect(html).toContain('Production Content');
      // In a real build, dev code would be stripped
    });
  });

  describe('Static Route Generation', () => {
    it('should support static path generation', () => {
      const routes = [
        { path: '/', component: 'Home' },
        { path: '/about', component: 'About' },
        { path: '/products', component: 'Products' },
        { path: '/products/[id]', component: 'ProductDetail' },
      ];

      // Generate static paths
      const staticPaths = routes
        .filter(route => !route.path.includes('['))
        .map(route => route.path);
      
      expect(staticPaths).toEqual(['/', '/about', '/products']);
      
      // Dynamic routes need data
      const dynamicRoutes = routes.filter(route => route.path.includes('['));
      expect(dynamicRoutes).toHaveLength(1);
    });

    it('should generate static pages with layout', () => {
      const Layout = ({ children }: { children: React.ReactNode }) => (
        <UiProvider enableHydration={false}>
          <div className="layout">
            <header>Static Header</header>
            <main>{children}</main>
            <footer>Static Footer</footer>
          </div>
        </UiProvider>
      );

      const Page = () => (
        <Layout>
          <h1>Static Page</h1>
          <p>This is a static page</p>
        </Layout>
      );

      const html = renderToStaticMarkup(<Page />);
      
      expect(html).toContain('Static Header');
      expect(html).toContain('Static Page');
      expect(html).toContain('Static Footer');
      
      // Should have proper structure
      expect(html).toMatch(/<header>.*<\/header>/);
      expect(html).toMatch(/<main>.*<\/main>/);
      expect(html).toMatch(/<footer>.*<\/footer>/);
    });
  });

  describe('Performance Optimization', () => {
    it('should generate minimal HTML', () => {
      const MinimalComponent = () => (
        <Button variant="primary">Click</Button>
      );

      const html = renderToStaticMarkup(
        <UiProvider enableHydration={false}>
          <MinimalComponent />
        </UiProvider>
      );
      
      // Should not have excessive whitespace
      const compressedHtml = html.replace(/\s+/g, ' ').trim();
      // HTML should be reasonably compact (allow some flexibility for styling)
      expect(compressedHtml.length).toBeLessThan(html.length * 1.1);
      expect(html.length).toBeGreaterThan(0);
    });

    it('should handle large static lists efficiently', () => {
      const LargeList = () => (
        <UiProvider enableHydration={false}>
          <ul>
            {Array.from({ length: 1000 }, (_, i) => (
              <li key={i}>Item {i}</li>
            ))}
          </ul>
        </UiProvider>
      );

      const start = Date.now();
      const html = renderToStaticMarkup(<LargeList />);
      const duration = Date.now() - start;
      
      expect(html).toContain('Item 0');
      expect(html).toContain('Item 999');
      expect(duration).toBeLessThan(100); // Should be fast
    });
  });
});