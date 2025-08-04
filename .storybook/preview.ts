/**
 * @fileoverview Storybook Preview Configuration - Enterprise UI System v6.3.0
 * @description Global Storybook setup with design tokens, themes, and accessibility
 * @version 6.3.0
 * @compliance WCAG AAA, Norwegian Standards, SSR-Safe
 */

import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-styling';

// Import enterprise styles and tokens
import '../src/styles/index.css';

/**
 * Enterprise viewport configurations for Norwegian compliance
 * Includes mobile-first responsive design and accessibility requirements
 */
const customViewports = {
  mobile: {
    name: 'Mobile (Norwegian Standard)',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  tablet: {
    name: 'Tablet (Norwegian Standard)',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  desktop: {
    name: 'Desktop (Norwegian Standard)',
    styles: {
      width: '1440px',
      height: '900px',
    },
  },
  desktopLarge: {
    name: 'Desktop Large (Enterprise)',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  // WCAG AAA compliance viewport for testing
  wcagTest: {
    name: 'WCAG Test (320px min)',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
};

/**
 * Enterprise background configurations for theme testing
 */
const customBackgrounds = {
  light: {
    name: 'Light Theme',
    value: '#ffffff',
  },
  dark: {
    name: 'Dark Theme',
    value: '#0a0a0a',
  },
  highContrast: {
    name: 'High Contrast',
    value: '#000000',
  },
  enterprise: {
    name: 'Enterprise Gray',
    value: '#fafafa',
  },
  norwegian: {
    name: 'Norwegian Blue',
    value: '#e6f3ff',
  },
};

/**
 * Accessibility configuration for WCAG AAA compliance
 */
const a11yConfig = {
  // Enhanced accessibility rules for enterprise compliance
  rules: [
    {
      id: 'color-contrast',
      enabled: true,
      options: {
        // WCAG AAA requires 7:1 contrast ratio for normal text
        normal: 7,
        // WCAG AAA requires 4.5:1 contrast ratio for large text
        large: 4.5,
      },
    },
    {
      id: 'focus-visible',
      enabled: true,
    },
    {
      id: 'keyboard-navigation',
      enabled: true,
    },
    {
      id: 'aria-labels',
      enabled: true,
    },
    {
      id: 'semantic-structure',
      enabled: true,
    },
  ],
  // Disable rules that conflict with design system patterns
  disableOtherRules: false,
  // Manual testing guidelines for Norwegian compliance
  manual: true,
};

/**
 * Global story parameters for enterprise compliance
 */
const preview: Preview = {
  parameters: {
    // Actions configuration for event handling
    actions: { 
      argTypesRegex: '^on[A-Z].*',
      // Capture all interaction events for accessibility testing
      handles: ['mouseover', 'click', 'focus', 'blur', 'keydown'],
    },

    // Enhanced controls for comprehensive testing
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      // Expanded controls for enterprise component testing
      expanded: true,
      sort: 'requiredFirst',
    },

    // Viewport configuration for responsive testing
    viewport: {
      viewports: {
        ...customViewports,
      },
      defaultViewport: 'desktop',
    },

    // Background configuration for theme testing
    backgrounds: {
      default: 'light',
      values: Object.values(customBackgrounds),
      // Grid overlay for layout precision
      grid: {
        cellSize: 8, // 8pt grid system
        opacity: 0.3,
        cellAmount: 5,
      },
    },

    // Accessibility configuration (WCAG AAA)
    a11y: a11yConfig,

    // Documentation configuration
    docs: {
      // Enhanced documentation with design system context
      theme: {
        base: 'light',
        brandTitle: 'Xala Enterprise UI System',
        brandUrl: 'https://github.com/xala-technologies/ui-system',
        brandImage: undefined,
        // Norwegian compliance branding
        fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        fontCode: '"JetBrains Mono", "Monaco", monospace',
      },
      // Story sorting for logical navigation
      transformSource: (src) => {
        // Clean up source code display
        return src.replace(/^.*?import.*?from.*?['"]\.\.\/.*/gm, '');
      },
    },

    // Layout configuration for story presentation
    layout: 'centered',

    // Enhanced story sorting for enterprise organization
    options: {
      storySort: {
        order: [
          'Foundation',
          ['Design Tokens', 'Colors', 'Typography', 'Spacing', 'Accessibility'],
          'UI Components',
          ['Button', 'Input', 'Card', 'Alert', '*'],
          'Semantic Components',
          ['Container', 'Box', 'Heading', 'Text', '*'],
          'Layout Components',
          ['Grid', 'Stack', 'Dashboard', '*'],
          'Patterns',
          'Templates',
          'Examples',
        ],
      },
    },
  },

  // Global decorators for consistent story presentation
  decorators: [
    // Theme decorator for enterprise theme switching
    withThemeByClassName({
      themes: {
        light: 'theme-light',
        dark: 'theme-dark',
        'high-contrast': 'theme-high-contrast',
        enterprise: 'theme-enterprise',
        municipal: 'theme-municipal',
        oslo: 'theme-oslo',
        bergen: 'theme-bergen',
      },
      defaultTheme: 'light',
    }),

    // Container decorator for consistent spacing
    (Story) => (
      <div 
        style={{
          padding: '1rem',
          minHeight: '100vh',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
        className="storybook-container"
      >
        <Story />
      </div>
    ),
  ],

  // Global argument types for consistent prop controls
  argTypes: {
    // Common design system props
    intent: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'destructive', 'success', 'warning', 'info'],
      description: 'Semantic intent of the component',
      table: {
        category: 'Design System',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant following 8pt grid system',
      table: {
        category: 'Design System',
        defaultValue: { summary: 'md' },
      },
    },
    // Norwegian compliance props
    nsmLevel: {
      control: { type: 'select' },
      options: ['OPEN', 'RESTRICTED', 'CONFIDENTIAL', 'SECRET'],
      description: 'Norwegian NSM security classification',
      table: {
        category: 'Norwegian Compliance',
        defaultValue: { summary: 'OPEN' },
      },
    },
    lang: {
      control: { type: 'select' },
      options: ['nb-NO', 'en-US', 'fr-FR', 'ar-SA'],
      description: 'Language code for internationalization',
      table: {
        category: 'Localization',
        defaultValue: { summary: 'nb-NO' },
      },
    },
    // Accessibility props
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for screen readers',
      table: {
        category: 'Accessibility',
      },
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'ID of element that describes this component',
      table: {
        category: 'Accessibility',
      },
    },
    // Disable problematic props
    children: {
      control: false,
      table: {
        category: 'Content',
      },
    },
    className: {
      control: false,
      table: {
        category: 'Styling',
      },
    },
    style: {
      control: false,
      table: {
        disable: true,
      },
    },
  },

  // Global args for consistent defaults
  args: {
    intent: 'primary',
    size: 'md',
    nsmLevel: 'OPEN',
    lang: 'nb-NO',
  },

  // Tags for documentation organization
  tags: ['autodocs'],
};

export default preview;