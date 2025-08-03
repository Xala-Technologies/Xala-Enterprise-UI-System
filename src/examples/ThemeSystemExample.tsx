/**
 * Theme System Example
 * 
 * Demonstrates the new industry-standard theme system without hooks in components.
 * Shows SSR-safe theme switching, flash prevention, and how components work
 * purely with CSS variables without JavaScript in styling.
 */

import React from 'react';
import { ThemeProvider, ThemeScript, themeUtils } from '../providers/ThemeProvider';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

/**
 * Theme Switcher Component
 * 
 * Demonstrates imperative theme switching without hooks.
 * Components don't need to know about themes - they use CSS variables.
 */
const ThemeSwitcher = (): JSX.Element => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => themeUtils.setTheme('light')}
        className="min-w-[80px]"
      >
        Light
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => themeUtils.setTheme('dark')}
        className="min-w-[80px]"
      >
        Dark
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => themeUtils.setTheme('high-contrast')}
        className="min-w-[80px]"
      >
        High Contrast
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => themeUtils.setTheme('system')}
        className="min-w-[80px]"
      >
        System
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={themeUtils.toggleTheme}
        className="min-w-[80px]"
      >
        Toggle
      </Button>
    </div>
  );
};

/**
 * Theme Demo Component
 * 
 * Shows how components work with CSS variables without needing theme hooks.
 * All styling is done through CSS custom properties that change with data-theme.
 */
const ThemeDemo = (): JSX.Element => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme System Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This demo shows the new industry-standard theme system. Components use only CSS variables
            and don't require any JavaScript hooks for styling. Theme switching happens via data
            attributes on the document element.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium">Switch Theme:</h4>
            <ThemeSwitcher />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Primary Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full">
              Primary Button
            </Button>
            <Button variant="secondary" className="w-full">
              Secondary Button
            </Button>
            <Button variant="outline" className="w-full">
              Outline Button
            </Button>
            <div className="p-3 bg-primary text-primary-foreground rounded-md">
              Primary Background
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Status Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="destructive" className="w-full">
              Destructive Button
            </Button>
            <div className="p-2 bg-success text-success-foreground rounded text-sm">
              Success Message
            </div>
            <div className="p-2 bg-warning text-warning-foreground rounded text-sm">
              Warning Message
            </div>
            <div className="p-2 bg-destructive text-destructive-foreground rounded text-sm">
              Error Message
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Norwegian Compliance Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div className="p-3 bg-nsm-open text-white rounded text-center text-sm font-medium">
              NSM Open
            </div>
            <div className="p-3 bg-nsm-restricted text-white rounded text-center text-sm font-medium">
              NSM Restricted
            </div>
            <div className="p-3 bg-nsm-confidential text-white rounded text-center text-sm font-medium">
              NSM Confidential
            </div>
            <div className="p-3 bg-nsm-secret text-white rounded text-center text-sm font-medium">
              NSM Secret
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Complete App Example with SSR-safe Theme System
 * 
 * Shows how to set up the theme system in a real application.
 */
export const ThemeSystemExample = (): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Theme System Example</title>
        
        {/* CRITICAL: Theme script must be in head before CSS */}
        <ThemeScript defaultTheme="system" storageKey="ui-theme" />
        
        {/* Your CSS files come after the theme script */}
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <ThemeProvider
          defaultTheme="system"
          storageKey="ui-theme"
          enableTransitions={true}
          transitionDuration={200}
        >
          <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto p-6">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">UI System Theme Demo</h1>
                <p className="text-muted-foreground">
                  Industry-standard theme system with SSR support and no JavaScript in component styling.
                </p>
              </div>
              
              <ThemeDemo />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

/**
 * Next.js Usage Example
 */
export const NextJSExample = (): JSX.Element => {
  return (
    <>
      {/* In your _document.tsx or app layout */}
      <ThemeScript />
      
      {/* In your app root */}
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <ThemeDemo />
        </div>
      </ThemeProvider>
    </>
  );
};

/**
 * Component Without Theme Hooks Example
 * 
 * Shows how components work purely with CSS variables.
 * No useTheme hook needed - styling is handled by CSS.
 */
export const ComponentWithoutHooks = (): JSX.Element => {
  return (
    <div className="p-4 bg-card text-card-foreground border border-border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">No Hooks Needed!</h3>
      <p className="text-muted-foreground mb-4">
        This component works with all themes automatically through CSS variables.
        No JavaScript hooks required in components.
      </p>
      
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-hover">
          Primary Action
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary-hover">
          Secondary Action
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-muted rounded">
        <p className="text-sm text-muted-foreground">
          All colors automatically adapt to the current theme via CSS custom properties.
          Theme switching happens at the document level via data-theme attribute.
        </p>
      </div>
    </div>
  );
};

export default ThemeSystemExample;