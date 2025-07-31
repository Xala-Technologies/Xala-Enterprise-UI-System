/**
 * @fileoverview LayoutPreview Component v5.0.0 - Token-Based Design System
 * @description Interactive layout preview system for visualizing and testing layouts
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';
import { 
  useResponsiveLayout, 
  LayoutSwitcher,
  type LayoutType 
} from '../../hooks/useResponsiveLayout';
import { ResponsiveLayoutProvider } from '../../providers/ResponsiveLayoutProvider';
import { MobileLayout } from '../../layouts/mobile/MobileLayout';
import { TabletLayout } from '../../layouts/tablet/TabletLayout';
import { DesktopLayout } from '../../layouts/desktop/DesktopLayout';
import { WebLayout } from '../../layouts/web/WebLayout';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Typography } from '../ui/typography';

// =============================================================================
// LAYOUT PREVIEW VARIANTS
// =============================================================================

const layoutPreviewVariants = cva(
  [
    'w-full h-full',
    'bg-background',
    'border border-border rounded-lg',
    'overflow-hidden',
  ],
  {
    variants: {
      size: {
        sm: 'h-64',
        md: 'h-96',
        lg: 'h-[600px]',
        xl: 'h-[800px]',
        full: 'min-h-screen',
      },
      mode: {
        preview: 'pointer-events-none select-none',
        interactive: 'pointer-events-auto',
      },
    },
    defaultVariants: {
      size: 'lg',
      mode: 'preview',
    },
  }
);

const layoutControlsVariants = cva(
  [
    'flex items-center gap-4 p-4',
    'bg-muted/50 border-b border-border',
  ],
  {
    variants: {
      position: {
        top: 'border-b',
        bottom: 'border-t border-b-0',
      },
    },
    defaultVariants: {
      position: 'top',
    },
  }
);

// =============================================================================
// LAYOUT PREVIEW INTERFACES
// =============================================================================

export interface LayoutPreviewConfig {
  /** Layout type */
  type: LayoutType;
  /** Layout label */
  label: string;
  /** Layout description */
  description?: string;
  /** Layout props */
  props?: Record<string, any>;
  /** Sample content */
  content?: {
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    main?: React.ReactNode;
    footer?: React.ReactNode;
  };
}

export interface LayoutPreviewProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutPreviewVariants> {
  /** Available layouts to preview */
  layouts?: LayoutPreviewConfig[];
  /** Initial layout */
  initialLayout?: LayoutType;
  /** Show layout controls */
  showControls?: boolean;
  /** Controls position */
  controlsPosition?: 'top' | 'bottom';
  /** Allow layout switching */
  allowSwitching?: boolean;
  /** Show layout info */
  showInfo?: boolean;
  /** Custom content */
  children?: React.ReactNode;
  /** Layout change handler */
  onLayoutChange?: (layout: LayoutType) => void;
}

export interface LayoutThumbnailProps {
  /** Layout configuration */
  config: LayoutPreviewConfig;
  /** Is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Thumbnail size */
  size?: 'sm' | 'md' | 'lg';
}

// =============================================================================
// DEFAULT LAYOUT CONFIGURATIONS
// =============================================================================

const defaultSampleContent = {
  header: (
    <div className="bg-primary text-primary-foreground p-4">
      <Typography variant="h3">Header Content</Typography>
    </div>
  ),
  sidebar: (
    <div className="p-4 space-y-2">
      <Typography variant="h4">Navigation</Typography>
      <div className="space-y-1">
        <div className="p-2 bg-accent rounded">Dashboard</div>
        <div className="p-2 hover:bg-accent rounded">Analytics</div>
        <div className="p-2 hover:bg-accent rounded">Settings</div>
      </div>
    </div>
  ),
  main: (
    <div className="p-6 space-y-6">
      <Typography variant="h2">Main Content Area</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4">
            <Typography variant="h4">Card {i}</Typography>
            <Typography className="mt-2 text-muted-foreground">
              Sample content for card {i}
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  ),
  footer: (
    <div className="bg-muted p-4 text-center">
      <Typography variant="bodySmall" className="text-muted-foreground">
        © 2024 Layout Preview System
      </Typography>
    </div>
  ),
};

const defaultLayoutConfigs: LayoutPreviewConfig[] = [
  {
    type: 'mobile',
    label: 'Mobile Layout',
    description: 'Optimized for mobile devices with touch interactions',
    content: defaultSampleContent,
  },
  {
    type: 'tablet',
    label: 'Tablet Layout',
    description: 'Responsive layout for tablet screens',
    content: defaultSampleContent,
  },
  {
    type: 'desktop',
    label: 'Desktop Layout',
    description: 'Professional desktop application layout',
    content: defaultSampleContent,
  },
  {
    type: 'web',
    label: 'Web Layout',
    description: 'Website and web application layout',
    content: defaultSampleContent,
  },
  {
    type: 'admin',
    label: 'Admin Layout',
    description: 'Dashboard layout for administrative interfaces',
    content: defaultSampleContent,
  },
];

// =============================================================================
// LAYOUT PREVIEW COMPONENTS
// =============================================================================

/**
 * Layout thumbnail component
 */
export const LayoutThumbnail: React.FC<LayoutThumbnailProps> = ({
  config,
  selected = false,
  onClick,
  size = 'md',
}) => {
  const { colors, spacing } = useTokens();

  const sizeClasses = {
    sm: 'w-24 h-16',
    md: 'w-32 h-20',
    lg: 'w-40 h-24',
  };

  const thumbnailStyles = React.useMemo((): React.CSSProperties => ({
    backgroundColor: colors.background?.default || '#ffffff',
    borderColor: selected ? colors.primary?.[500] || '#3b82f6' : colors.border?.default || '#e2e8f0',
    borderWidth: selected ? '2px' : '1px',
  }), [colors, selected]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'border rounded-md cursor-pointer transition-all duration-200',
          'hover:shadow-md',
          sizeClasses[size]
        )}
        style={thumbnailStyles}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`Select ${config.label}`}
      >
        <div className="w-full h-full p-1 relative overflow-hidden">
          {/* Simplified layout representation */}
          <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="h-2 bg-primary/20 rounded-sm mb-1" />
            
            <div className="flex flex-1 gap-1">
              {/* Sidebar */}
              {(config.type === 'desktop' || config.type === 'admin') && (
                <div className="w-3 bg-accent/30 rounded-sm" />
              )}
              
              {/* Main content */}
              <div className="flex-1 bg-muted/50 rounded-sm" />
            </div>
            
            {/* Footer */}
            {config.type === 'web' && (
              <div className="h-1 bg-muted/70 rounded-sm mt-1" />
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Typography variant="bodySmall" className="font-medium">
          {config.label}
        </Typography>
        {config.description && (
          <Typography variant="small" className="text-muted-foreground mt-1">
            {config.description}
          </Typography>
        )}
      </div>
    </div>
  );
};

/**
 * Layout preview controls
 */
const LayoutPreviewControls: React.FC<{
  layouts: LayoutPreviewConfig[];
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  showInfo: boolean;
  onToggleInfo: () => void;
  mode: 'preview' | 'interactive';
  onToggleMode: () => void;
}> = ({
  layouts,
  currentLayout,
  onLayoutChange,
  showInfo,
  onToggleInfo,
  mode,
  onToggleMode,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <Typography variant="bodySmall" className="font-medium">
          Layout:
        </Typography>
        <LayoutSwitcher
          currentLayout={currentLayout}
          layouts={layouts.map(l => l.type)}
          onChange={onLayoutChange}
          showLabels
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleInfo}
          aria-pressed={showInfo}
        >
          Info
        </Button>
        
        <Button
          variant={mode === 'interactive' ? 'primary' : 'outline'}
          size="sm"
          onClick={onToggleMode}
          aria-pressed={mode === 'interactive'}
        >
          {mode === 'interactive' ? 'Interactive' : 'Preview'}
        </Button>
      </div>
    </div>
  );
};

/**
 * Layout information panel
 */
const LayoutInfo: React.FC<{
  config: LayoutPreviewConfig;
  show: boolean;
}> = ({ config, show }) => {
  if (!show) return null;

  return (
    <div className="absolute top-4 right-4 z-10 max-w-xs">
      <Card className="p-4 shadow-lg">
        <Typography variant="h4" className="mb-2">
          {config.label}
        </Typography>
        {config.description && (
          <Typography variant="bodySmall" className="text-muted-foreground">
            {config.description}
          </Typography>
        )}
        
        <div className="mt-3 space-y-1">
          <Typography variant="small" className="font-medium">
            Features:
          </Typography>
          <ul className="text-xs text-muted-foreground space-y-1">
            {config.type === 'mobile' && (
              <>
                <li>• Touch gestures</li>
                <li>• Swipeable drawer</li>
                <li>• Bottom navigation</li>
              </>
            )}
            {config.type === 'tablet' && (
              <>
                <li>• Split view layouts</li>
                <li>• Resizable panes</li>
                <li>• Master-detail patterns</li>
              </>
            )}
            {config.type === 'desktop' && (
              <>
                <li>• Keyboard shortcuts</li>
                <li>• Resizable sidebar</li>
                <li>• Multi-window support</li>
              </>
            )}
            {config.type === 'web' && (
              <>
                <li>• SEO optimization</li>
                <li>• Performance features</li>
                <li>• Responsive design</li>
              </>
            )}
            {config.type === 'admin' && (
              <>
                <li>• Dashboard widgets</li>
                <li>• Data visualization</li>
                <li>• User management</li>
              </>
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
};

/**
 * Main layout preview component
 */
export const LayoutPreview = React.forwardRef<HTMLDivElement, LayoutPreviewProps>(
  (
    {
      layouts = defaultLayoutConfigs,
      initialLayout = 'desktop',
      showControls = true,
      controlsPosition = 'top',
      allowSwitching = true,
      showInfo = false,
      size = 'lg',
      mode: modeProp = 'preview',
      children,
      onLayoutChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [currentLayout, setCurrentLayout] = useState<LayoutType>(initialLayout);
    const [showLayoutInfo, setShowLayoutInfo] = useState(showInfo);
    const [previewMode, setPreviewMode] = useState<'preview' | 'interactive'>(modeProp || 'preview');
    const { colors } = useTokens();

    // Find current layout config
    const currentConfig = layouts.find(l => l.type === currentLayout) || layouts[0];

    // Handle layout change
    const handleLayoutChange = useCallback((layout: LayoutType) => {
      setCurrentLayout(layout);
      onLayoutChange?.(layout);
    }, [onLayoutChange]);

    // Get layout component
    const getLayoutComponent = (type: LayoutType) => {
      switch (type) {
        case 'mobile': return MobileLayout;
        case 'tablet': return TabletLayout;
        case 'desktop': return DesktopLayout;
        case 'web': return WebLayout;
        case 'admin': return AdminLayout;
        default: return DesktopLayout;
      }
    };

    const LayoutComponent = getLayoutComponent(currentLayout);
    const layoutContent = children || currentConfig.content;
    
    // Type-safe layout content rendering
    const renderLayoutContent = (): React.ReactNode => {
      if (children) return children;
      
      if (currentConfig.content && typeof currentConfig.content === 'object' && 'header' in currentConfig.content) {
        const content = currentConfig.content;
        return (
          <>
            {content.header}
            {content.sidebar}
            {content.main}
            {content.footer}
          </>
        );
      }
      
      return null;
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-col', className)}
        style={style}
        {...props}
      >
        {/* Controls */}
        {showControls && controlsPosition === 'top' && (
          <div className={layoutControlsVariants({ position: 'top' })}>
            <LayoutPreviewControls
              layouts={layouts}
              currentLayout={currentLayout}
              onLayoutChange={allowSwitching ? handleLayoutChange : () => {}}
              showInfo={showLayoutInfo}
              onToggleInfo={() => setShowLayoutInfo(!showLayoutInfo)}
              mode={previewMode}
              onToggleMode={() => setPreviewMode(prev => prev === 'preview' ? 'interactive' : 'preview')}
            />
          </div>
        )}

        {/* Preview Area */}
        <div className="flex-1 relative">
          <div className={cn(layoutPreviewVariants({ size, mode: previewMode }))}>
            <ResponsiveLayoutProvider forceLayout={currentLayout}>
              <LayoutComponent {...(currentConfig.props || {})}>
                {renderLayoutContent()}
              </LayoutComponent>
            </ResponsiveLayoutProvider>
          </div>

          {/* Layout info overlay */}
          <LayoutInfo config={currentConfig} show={showLayoutInfo} />
        </div>

        {/* Bottom controls */}
        {showControls && controlsPosition === 'bottom' && (
          <div className={layoutControlsVariants({ position: 'bottom' })}>
            <LayoutPreviewControls
              layouts={layouts}
              currentLayout={currentLayout}
              onLayoutChange={allowSwitching ? handleLayoutChange : () => {}}
              showInfo={showLayoutInfo}
              onToggleInfo={() => setShowLayoutInfo(!showLayoutInfo)}
              mode={previewMode}
              onToggleMode={() => setPreviewMode(prev => prev === 'preview' ? 'interactive' : 'preview')}
            />
          </div>
        )}
      </div>
    );
  }
);

LayoutPreview.displayName = 'LayoutPreview';

// Export variants for external use
export { layoutPreviewVariants, layoutControlsVariants };
export type LayoutPreviewVariant = VariantProps<typeof layoutPreviewVariants>;