/**
 * @fileoverview ResponsiveLayoutExample v5.0.0
 * @description Example showcasing responsive layout switching
 * @version 5.0.0
 */

import React, { useState } from 'react';
import {
  ResponsiveLayoutProvider,
  ResponsiveLayoutWrapper,
  LayoutSwitcher,
  ResponsiveLayout,
  LayoutTransition,
  useResponsiveLayout,
  type LayoutType,
} from '../';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Typography } from '../components/ui/typography';

/**
 * Basic responsive layout example
 */
export const BasicResponsiveLayoutExample = () => {
  return (
    <ResponsiveLayoutProvider>
      <div className="p-8">
        <Typography variant="h1" className="mb-6">
          Responsive Layout Example
        </Typography>
        
        <ResponsiveLayout only="mobile">
          <Card className="p-4 bg-blue-50">
            <Typography variant="h3">Mobile Layout</Typography>
            <Typography className="mt-2">
              This content is only visible on mobile devices.
            </Typography>
          </Card>
        </ResponsiveLayout>

        <ResponsiveLayout only="tablet">
          <Card className="p-6 bg-green-50">
            <Typography variant="h3">Tablet Layout</Typography>
            <Typography className="mt-2">
              This content is only visible on tablets.
            </Typography>
          </Card>
        </ResponsiveLayout>

        <ResponsiveLayout only={['desktop', 'web']}>
          <Card className="p-8 bg-purple-50">
            <Typography variant="h3">Desktop/Web Layout</Typography>
            <Typography className="mt-2">
              This content is visible on desktop and web layouts.
            </Typography>
          </Card>
        </ResponsiveLayout>

        <ResponsiveLayout except="mobile">
          <Card className="mt-6 p-6">
            <Typography variant="h3">Non-Mobile Content</Typography>
            <Typography className="mt-2">
              This content is hidden on mobile devices.
            </Typography>
          </Card>
        </ResponsiveLayout>
      </div>
    </ResponsiveLayoutProvider>
  );
};

/**
 * Manual layout switching example
 */
export const ManualLayoutSwitchingExample = () => {
  const [forcedLayout, setForcedLayout] = useState<LayoutType | undefined>();

  return (
    <ResponsiveLayoutProvider forceLayout={forcedLayout}>
      <div className="p-8">
        <Typography variant="h1" className="mb-6">
          Manual Layout Switching
        </Typography>

        <div className="mb-8">
          <Typography variant="h3" className="mb-4">
            Layout Controls
          </Typography>
          <div className="flex flex-wrap gap-4">
            <LayoutSwitcher
              currentLayout={forcedLayout}
              onChange={setForcedLayout}
              showLabels
            />
            <Button
              variant="outline"
              onClick={() => setForcedLayout(undefined)}
            >
              Auto Mode
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <LayoutInfo />
        </Card>
      </div>
    </ResponsiveLayoutProvider>
  );
};

/**
 * Component that displays current layout info
 */
const LayoutInfo = () => {
  const { layout, isResponsive } = useResponsiveLayout();

  return (
    <div>
      <Typography variant="h3" className="mb-4">
        Current Layout Information
      </Typography>
      <div className="space-y-2">
        <Typography>
          <strong>Current Layout:</strong> <span className="capitalize">{layout}</span>
        </Typography>
        <Typography>
          <strong>Responsive Mode:</strong> {isResponsive ? 'Enabled' : 'Disabled'}
        </Typography>
        <Typography>
          <strong>Window Width:</strong> {typeof window !== 'undefined' ? window.innerWidth : 'SSR'}px
        </Typography>
      </div>
    </div>
  );
};

/**
 * Layout transition example
 */
export const LayoutTransitionExample = () => {
  const [transition, setTransition] = useState<'fade' | 'slide' | 'scale' | 'none'>('fade');

  return (
    <ResponsiveLayoutProvider>
      <div className="p-8">
        <Typography variant="h1" className="mb-6">
          Layout Transitions
        </Typography>

        <div className="mb-8">
          <Typography variant="h3" className="mb-4">
            Transition Type
          </Typography>
          <div className="flex gap-2">
            {(['fade', 'slide', 'scale', 'none'] as const).map((type) => (
              <Button
                key={type}
                variant={transition === type ? 'primary' : 'outline'}
                onClick={() => setTransition(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <LayoutTransition transition={transition} duration={500}>
          <Card className="p-8">
            <Typography variant="h2" className="mb-4">
              Resize your window to see transitions
            </Typography>
            <LayoutInfo />
          </Card>
        </LayoutTransition>
      </div>
    </ResponsiveLayoutProvider>
  );
};

/**
 * Layout-specific content example
 */
export const LayoutSpecificContentExample = () => {
  return (
    <ResponsiveLayoutProvider>
      <div className="p-8">
        <Typography variant="h1" className="mb-6">
          Layout-Specific Content
        </Typography>

        <ResponsiveLayout>
          {(layout: LayoutType) => (
            <Card className="p-6">
              <Typography variant="h2" className="mb-4">
                Content for {layout} layout
              </Typography>
              
              {layout === 'mobile' && (
                <div className="space-y-4">
                  <Typography>Optimized for touch interactions</Typography>
                  <Button size="lg" className="w-full">
                    Mobile Action
                  </Button>
                </div>
              )}

              {layout === 'tablet' && (
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <Typography variant="h3">Feature 1</Typography>
                  </Card>
                  <Card className="p-4">
                    <Typography variant="h3">Feature 2</Typography>
                  </Card>
                </div>
              )}

              {(layout === 'desktop' || layout === 'web') && (
                <div className="grid grid-cols-3 gap-6">
                  <Card className="p-6">
                    <Typography variant="h3">Advanced Feature 1</Typography>
                    <Typography className="mt-2 text-sm text-muted-foreground">
                      Desktop-optimized functionality
                    </Typography>
                  </Card>
                  <Card className="p-6">
                    <Typography variant="h3">Advanced Feature 2</Typography>
                    <Typography className="mt-2 text-sm text-muted-foreground">
                      Enhanced productivity tools
                    </Typography>
                  </Card>
                  <Card className="p-6">
                    <Typography variant="h3">Advanced Feature 3</Typography>
                    <Typography className="mt-2 text-sm text-muted-foreground">
                      Multi-window support
                    </Typography>
                  </Card>
                </div>
              )}
            </Card>
          )}
        </ResponsiveLayout>
      </div>
    </ResponsiveLayoutProvider>
  );
};

/**
 * Complex responsive layout example
 */
export const ComplexResponsiveLayoutExample = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ResponsiveLayoutWrapper
      layoutProps={{
        navbar: (
          <div className="bg-primary text-primary-foreground p-4">
            <Typography variant="h2">Responsive App</Typography>
          </div>
        ),
        sidebar: sidebarOpen && (
          <ResponsiveLayout except="mobile">
            <div className="bg-gray-100 p-4 h-full">
              <Typography variant="h3">Sidebar</Typography>
              <nav className="mt-4 space-y-2">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Dashboard
                </a>
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Analytics
                </a>
                <a href="#" className="block p-2 hover:bg-gray-200 rounded">
                  Settings
                </a>
              </nav>
            </div>
          </ResponsiveLayout>
        ),
        footer: (
          <div className="bg-gray-800 text-white p-4 text-center">
            <Typography>© 2024 Responsive App</Typography>
          </div>
        ),
      }}
    >
      <div className="p-8">
        <div className="mb-6">
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            Toggle Sidebar
          </Button>
        </div>

        <ResponsiveLayout>
          {(layout: LayoutType) => (
            <div>
              <Typography variant="h1" className="mb-6">
                Complex {layout} Layout
              </Typography>
              
              <div className={`
                grid gap-6
                ${layout === 'mobile' ? 'grid-cols-1' : ''}
                ${layout === 'tablet' ? 'grid-cols-2' : ''}
                ${layout === 'desktop' || layout === 'web' ? 'grid-cols-3' : ''}
              `}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="p-6">
                    <Typography variant="h3">Card {i}</Typography>
                    <Typography className="mt-2">
                      Content optimized for {layout} layout
                    </Typography>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </ResponsiveLayout>
      </div>
    </ResponsiveLayoutWrapper>
  );
};

/**
 * Export all examples
 */
export const ResponsiveLayoutExamples = {
  Basic: BasicResponsiveLayoutExample,
  ManualSwitching: ManualLayoutSwitchingExample,
  Transitions: LayoutTransitionExample,
  LayoutSpecific: LayoutSpecificContentExample,
  Complex: ComplexResponsiveLayoutExample,
};