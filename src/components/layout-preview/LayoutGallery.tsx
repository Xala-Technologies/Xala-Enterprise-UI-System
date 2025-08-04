/**
 * @fileoverview LayoutGallery Component v5.0.0 - Token-Based Design System
 * @description Gallery view for browsing and comparing different layout types
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { LayoutPreview, LayoutThumbnail, type LayoutPreviewConfig } from './LayoutPreview';
import { type LayoutType } from '../../hooks/useResponsiveLayout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Typography } from '../ui/typography';
import { Badge } from '../ui/badge';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../../semantic';

// =============================================================================
// LAYOUT GALLERY VARIANTS
// =============================================================================

const layoutGalleryVariants = cva(
  [
    'w-full',
    'bg-background',
  ],
  {
    variants: {
      view: {
        grid: 'space-y-6',
        list: 'space-y-4',
        comparison: 'flex flex-col',
      },
    },
    defaultVariants: {
      view: 'grid',
    },
  }
);

const layoutGridVariants = cva(
  [
    'grid gap-6',
  ],
  {
    variants: {
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 lg:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
);

// =============================================================================
// LAYOUT GALLERY INTERFACES
// =============================================================================

export interface LayoutGalleryProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutGalleryVariants> {
  /** Available layouts */
  layouts?: LayoutPreviewConfig[];
  /** View mode */
  view?: 'grid' | 'list' | 'comparison';
  /** Grid columns */
  columns?: 1 | 2 | 3 | 4;
  /** Show filters */
  showFilters?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Enable layout selection */
  selectable?: boolean;
  /** Selected layouts */
  selectedLayouts?: LayoutType[];
  /** Selection change handler */
  onSelectionChange?: (layouts: LayoutType[]) => void;
  /** Layout click handler */
  onLayoutClick?: (config: LayoutPreviewConfig) => void;
}

export interface LayoutCardProps {
  /** Layout configuration */
  config: LayoutPreviewConfig;
  /** Is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Show preview */
  showPreview?: boolean;
  /** Preview size */
  previewSize?: 'sm' | 'md' | 'lg';
}

export interface LayoutComparisonProps {
  /** Layouts to compare */
  layouts: LayoutPreviewConfig[];
  /** Comparison view */
  view?: 'side-by-side' | 'stacked';
}

// =============================================================================
// LAYOUT GALLERY COMPONENTS
// =============================================================================

/**
 * Individual layout card component
 */
export const LayoutCard: React.FC<LayoutCardProps> = ({
  config,
  selected = false,
  onClick,
  showPreview = true,
  previewSize = 'md',
}) => {
    const [isHovered, setIsHovered] = useState(false);

  const cardStyles = React.useMemo((): React.CSSProperties => ({
    borderColor: selected ? colors.primary?.[500] || '#3b82f6' : undefined,
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'all 200ms ease-in-out',
  }), [colors, selected, isHovered]);

  const getLayoutFeatures = (type: LayoutType): string[] => {
    switch (type) {
      case 'mobile':
        return ['Touch Gestures', 'Swipe Navigation', 'Bottom Nav'];
      case 'tablet':
        return ['Split View', 'Resizable Panes', 'Master-Detail'];
      case 'desktop':
        return ['Keyboard Shortcuts', 'Multi-Window', 'Resizable Sidebar'];
      case 'web':
        return ['SEO Optimized', 'Performance', 'Responsive'];
      case 'admin':
        return ['Dashboard', 'Data Viz', 'User Management'];
      default:
        return [];
    }
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200',
        'hover:shadow-lg',
        selected && 'ring-2 ring-primary'
      )}
     
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preview */}
      {showPreview && (
        <Box className="p-4 pb-0">
          <LayoutThumbnail
            config={config}
            selected={selected}
            size={previewSize}
          />
        </Box>
      )}

      {/* Content */}
      <Box className="p-4">
        <Box className="flex items-start justify-between mb-2">
          <Typography variant="h4">{config.label}</Typography>
          <Badge variant="secondary" className="text-xs">
            {config.type}
          </Badge>
        </Box>

        {config.description && (
          <Typography variant="bodySmall" className="text-muted-foreground mb-3">
            {config.description}
          </Typography>
        )}

        {/* Features */}
        <Box className="space-y-2">
          <Typography variant="small" className="font-medium text-muted-foreground uppercase tracking-wide">
            Features
          </Typography>
          <Box className="flex flex-wrap gap-1">
            {getLayoutFeatures(config.type).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </Box>
        </Box>

        {/* Action button */}
        <Box className="mt-4 pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Layout
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

/**
 * Layout comparison component
 */
export const LayoutComparison: React.FC<LayoutComparisonProps> = ({
  layouts,
  view = 'side-by-side',
}) => {
  return (
    <Box className={cn(
      'space-y-6',
      view === 'side-by-side' && 'lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0'
    )}>
      {layouts.map((config) => (
        <Box key={config.type} className="space-y-4">
          <Box className="flex items-center justify-between">
            <Typography variant="h3">{config.label}</Typography>
            <Badge variant="secondary">{config.type}</Badge>
          </Box>
          
          <LayoutPreview
            layouts={[config]}
            initialLayout={config.type}
            showControls={false}
            size="md"
            mode="preview"
          />
          
          {config.description && (
            <Typography variant="bodySmall" className="text-muted-foreground">
              {config.description}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

/**
 * Layout gallery filters
 */
const LayoutGalleryFilters: React.FC<{
  layouts: LayoutPreviewConfig[];
  selectedTypes: LayoutType[];
  onFilterChange: (types: LayoutType[]) => void;
}> = ({ layouts, selectedTypes, onFilterChange }) => {
  const allTypes = layouts.map(l => l.type);
  const uniqueTypes = Array.from(new Set(allTypes));

  const toggleType = (type: LayoutType): void => {
    if (selectedTypes.includes(type)) {
      onFilterChange(selectedTypes.filter(t => t !== type));
    } else {
      onFilterChange([...selectedTypes, type]);
    }
  };

  return (
    <Box className="flex flex-wrap gap-2">
      <Typography variant="bodySmall" className="font-medium mr-2">
        Filter by type:
      </Typography>
      {uniqueTypes.map((type) => (
        <Button
          key={type}
          variant={selectedTypes.includes(type) ? 'primary' : 'outline'}
          size="sm"
          onClick={() => toggleType(type)}
          className="capitalize"
        >
          {type}
        </Button>
      ))}
      {selectedTypes.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange([])}
        >
          Clear
        </Button>
      )}
    </Box>
  );
};

/**
 * Main layout gallery component
 */
export const LayoutGallery = React.forwardRef<HTMLDivElement, LayoutGalleryProps>(
  (
    {
      layouts = [],
      view = 'grid',
      columns = 3,
      showFilters = true,
      showSearch = false,
      selectable = false,
      selectedLayouts = [],
      onSelectionChange,
      onLayoutClick,
      className,
      ...props
    },
    ref
  ) => {
    const [currentView, setCurrentView] = useState<'grid' | 'list' | 'comparison'>(view);
    const [filteredTypes, setFilteredTypes] = useState<LayoutType[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedForComparison, setSelectedForComparison] = useState<LayoutType[]>([]);

    // Filter layouts
    const filteredLayouts = layouts.filter(layout => {
      const matchesType = filteredTypes.length === 0 || filteredTypes.includes(layout.type);
      const matchesSearch = !searchQuery || 
        layout.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        layout.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });

    // Handle layout selection
    const handleLayoutSelect = (type: LayoutType): void => {
      if (selectable) {
        const newSelection = selectedLayouts.includes(type)
          ? selectedLayouts.filter(t => t !== type)
          : [...selectedLayouts, type];
        onSelectionChange?.(newSelection);
      }
    };

    // Handle comparison selection
    const handleComparisonSelect = (type: LayoutType): void => {
      if (selectedForComparison.includes(type)) {
        setSelectedForComparison(prev => prev.filter(t => t !== type));
      } else if (selectedForComparison.length < 4) {
        setSelectedForComparison(prev => [...prev, type]);
      }
    };

    return (
      <Box ref={ref} className={cn(layoutGalleryVariants({ view: currentView }), className)} {...props}>
        {/* Header */}
        <Box className="flex flex-col gap-4 mb-6">
          <Box className="flex items-center justify-between">
            <Typography variant="h2">Layout Gallery</Typography>
            
            <Box className="flex items-center gap-2">
              {/* View switcher */}
              <Box className="flex items-center border border-border rounded-md">
                <Button
                  variant={currentView === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('grid')}
                  className="rounded-r-none"
                >
                  Grid
                </Button>
                <Button
                  variant={currentView === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('list')}
                  className="rounded-none border-x"
                >
                  List
                </Button>
                <Button
                  variant={currentView === 'comparison' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('comparison')}
                  className="rounded-l-none"
                >
                  Compare
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Search */}
          {showSearch && (
            <Box className="max-w-md">
              <input
                type="text"
                placeholder="Search layouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </Box>
          )}

          {/* Filters */}
          {showFilters && (
            <LayoutGalleryFilters
              layouts={layouts}
              selectedTypes={filteredTypes}
              onFilterChange={setFilteredTypes}
            />
          )}

          {/* Comparison controls */}
          {currentView === 'comparison' && (
            <Box className="flex items-center gap-4 p-4 bg-muted/50 rounded-md">
              <Typography variant="bodySmall" className="font-medium">
                Select layouts to compare ({selectedForComparison.length}/4):
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {layouts.map((config) => (
                  <Button
                    key={config.type}
                    variant={selectedForComparison.includes(config.type) ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleComparisonSelect(config.type)}
                    disabled={!selectedForComparison.includes(config.type) && selectedForComparison.length >= 4}
                    className="capitalize"
                  >
                    {config.label}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Content */}
        {currentView === 'comparison' ? (
          <LayoutComparison
            layouts={layouts.filter(l => selectedForComparison.includes(l.type))}
            view="side-by-side"
          />
        ) : (
          <Box className={cn(
            currentView === 'grid' && layoutGridVariants({ columns }),
            currentView === 'list' && 'space-y-4'
          )}>
            {filteredLayouts.map((config) => (
              <LayoutCard
                key={config.type}
                config={config}
                selected={selectable ? selectedLayouts.includes(config.type) : false}
                onClick={() => {
                  handleLayoutSelect(config.type);
                  onLayoutClick?.(config);
                }}
                showPreview={currentView === 'grid'}
                previewSize={columns > 3 ? 'sm' : 'md'}
              />
            ))}
          </Box>
        )}

        {/* Empty state */}
        {filteredLayouts.length === 0 && (
          <Box className="text-center py-12">
            <Typography variant="h3" className="mb-2 text-muted-foreground">
              No layouts found
            </Typography>
            <Typography variant="bodySmall" className="text-muted-foreground">
              Try adjusting your filters or search query.
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
);

LayoutGallery.displayName = 'LayoutGallery';

// Export variants for external use
export { layoutGalleryVariants, layoutGridVariants };
export type LayoutGalleryVariant = VariantProps<typeof layoutGalleryVariants>;