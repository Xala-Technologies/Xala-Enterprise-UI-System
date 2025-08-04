/**
 * @fileoverview UISystemProvider Component v6.0.0
 * @description Main provider wrapper for the Xala UI System
 * Combines all necessary providers for complete UI system functionality
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { DesignSystemProvider, type DesignSystemProviderProps } from './DesignSystemProvider';
import { ThemeProvider } from './ThemeProvider';
import { ResponsiveLayoutProvider } from './ResponsiveLayoutProvider';
import { SSRProvider } from './SSRProvider';
import { HydrationProvider } from './HydrationProvider';

export interface UISystemProviderProps extends DesignSystemProviderProps {
  readonly children: React.ReactNode;
  readonly theme?: 'light' | 'dark' | 'system';
  readonly locale?: 'nb-NO' | 'en-US' | 'fr-FR' | 'ar-SA';
  readonly compliance?: {
    norwegian?: boolean;
    wcagLevel?: 'A' | 'AA' | 'AAA' | 'WCAG_2_2_AAA';
    gdprCompliant?: boolean;
    nsmClassification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  };
  readonly enableSSR?: boolean;
  readonly enableHydration?: boolean;
  readonly responsive?: boolean;
}

/**
 * UISystemProvider - Main provider for the Xala UI System
 * 
 * @example
 * ```tsx
 * import { UISystemProvider } from '@xala-technologies/ui-system';
 * 
 * function App() {
 *   return (
 *     <UISystemProvider
 *       theme="light"
 *       locale="nb-NO"
 *       compliance={{ norwegian: true, wcagLevel: 'WCAG_2_2_AAA' }}
 *     >
 *       <YourApp />
 *     </UISystemProvider>
 *   );
 * }
 * ```
 */
export const UISystemProvider = forwardRef<HTMLDivElement, UISystemProviderProps>(
  ({ 
    children, 
    theme = 'light',
    locale = 'en-US',
    compliance,
    enableSSR = true,
    enableHydration = true,
    responsive = true,
    ...designSystemProps 
  }, ref) => {
    // Build the provider tree based on configuration
    let content = children;

    // Wrap with HydrationProvider if enabled
    if (enableHydration) {
      content = (
        <HydrationProvider>
          {content}
        </HydrationProvider>
      );
    }

    // Wrap with SSRProvider if enabled
    if (enableSSR) {
      content = (
        <SSRProvider>
          {content}
        </SSRProvider>
      );
    }

    // Wrap with ResponsiveLayoutProvider if enabled
    if (responsive) {
      content = (
        <ResponsiveLayoutProvider>
          {content}
        </ResponsiveLayoutProvider>
      );
    }

    // Wrap with ThemeProvider
    content = (
      <ThemeProvider 
        defaultTheme={theme}
        storageKey="xala-ui-theme"
      >
        {content}
      </ThemeProvider>
    );

    // Wrap with DesignSystemProvider (outermost)
    return (
      <DesignSystemProvider
        templateId={theme === 'dark' ? 'base-dark' : 'base-light'}
        initialDarkMode={theme === 'dark'}
        autoDetectDarkMode={theme === 'system'}
      >
        {content}
      </DesignSystemProvider>
    );
  }
);

UISystemProvider.displayName = 'UISystemProvider';

// Export a convenience hook for accessing UI system context
export { useDesignSystem as useUISystem } from './DesignSystemProvider';