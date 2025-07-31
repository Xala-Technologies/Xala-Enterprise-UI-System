/**
 * @fileoverview Sidebar Component v5.0.0 - Token-Based Design System
 * @description Generic Sidebar component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';
import { useMediaQuery, useSSR } from '../../hooks';
import { Typography } from './typography';
import { Button } from './button';
import { IconButton } from './icon-button';

// =============================================================================
// SIDEBAR VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Sidebar variants following CVA pattern
 */
const sidebarVariants = cva(
  [
    'flex flex-col h-full',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background border-r border-border',
        filled: 'bg-card shadow-sm border-r border-border',
        elevated: 'bg-card shadow-lg border border-border',
        ghost: 'bg-transparent',
        floating: 'bg-card shadow-xl rounded-lg border border-border m-4',
      },
      size: {
        xs: 'w-12',
        sm: 'w-16',
        md: 'w-64',
        lg: 'w-72',
        xl: 'w-80',
        '2xl': 'w-96',
      },
      position: {
        static: 'static',
        fixed: 'fixed inset-y-0 z-40',
        absolute: 'absolute inset-y-0 z-30',
        sticky: 'sticky top-0 z-20',
      },
      side: {
        left: 'left-0',
        right: 'right-0',
      },
      collapsible: {
        true: 'overflow-hidden',
        false: '',
      },
    },
    compoundVariants: [
      {
        position: ['fixed', 'absolute'],
        side: 'left',
        className: 'left-0',
      },
      {
        position: ['fixed', 'absolute'],
        side: 'right',
        className: 'right-0',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'static',
      side: 'left',
      collapsible: false,
    },
  }
);

const sidebarOverlayVariants = cva(
  'fixed inset-0 bg-black/50 z-30 transition-opacity duration-300',
  {
    variants: {
      show: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      show: false,
    },
  }
);

const sidebarContentVariants = cva(
  'flex-1 overflow-auto',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

// =============================================================================
// SIDEBAR INTERFACES
// =============================================================================

export interface SidebarProps 
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof sidebarVariants> {
  /** Sidebar title */
  readonly title?: ReactNode;
  /** Header content */
  readonly header?: ReactNode;
  /** Footer content */
  readonly footer?: ReactNode;
  /** Whether sidebar is open (for mobile/overlay) */
  readonly open?: boolean;
  /** Whether sidebar is collapsed */
  readonly collapsed?: boolean;
  /** Content padding */
  readonly contentPadding?: VariantProps<typeof sidebarContentVariants>['padding'];
  /** Show overlay when open (mobile) */
  readonly showOverlay?: boolean;
  /** Resizable sidebar */
  readonly resizable?: boolean;
  /** Min width for resizable */
  readonly minWidth?: number;
  /** Max width for resizable */
  readonly maxWidth?: number;
  /** Close handler */
  readonly onClose?: () => void;
  /** Toggle collapsed state */
  readonly onToggleCollapse?: () => void;
  /** Resize handler */
  readonly onResize?: (width: number) => void;
  /** Custom close button */
  readonly closeButton?: ReactNode;
  /** Responsive behavior */
  readonly responsive?: boolean;
}

export interface SidebarHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly actions?: ReactNode;
  readonly showCloseButton?: boolean;
  readonly onClose?: () => void;
}

export interface SidebarSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly collapsible?: boolean;
  readonly defaultCollapsed?: boolean;
}

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly icon?: ReactNode;
  readonly label: ReactNode;
  readonly active?: boolean;
  readonly disabled?: boolean;
  readonly badge?: ReactNode;
  readonly href?: string;
  readonly onClick?: () => void;
}

// =============================================================================
// SIDEBAR SUB-COMPONENTS
// =============================================================================

/**
 * Sidebar header component
 */
export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ title, actions, showCloseButton, onClose, className, children, ...props }, ref) => {
    const { colors, spacing } = useTokens();

    const headerStyles = React.useMemo((): React.CSSProperties => ({
      borderBottom: `1px solid ${colors.border?.default || '#e2e8f0'}`,
      padding: spacing?.[4] || '1rem',
    }), [colors.border, spacing]);

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between flex-shrink-0', className)}
        style={headerStyles}
        {...props}
      >
        <div className="flex items-center min-w-0 flex-1">
          {title && (
            <Typography variant="h4" className="font-semibold truncate">
              {title}
            </Typography>
          )}
          {children}
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          {actions}
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-accent transition-colors"
              aria-label="Close sidebar"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';

/**
 * Sidebar section component with optional collapsible behavior
 */
export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ title, collapsible, defaultCollapsed = false, className, children, ...props }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const { spacing } = useTokens();

    const sectionStyles = React.useMemo((): React.CSSProperties => ({
      marginBottom: spacing?.[4] || '1rem',
    }), [spacing]);

    const toggleCollapsed = useCallback(() => {
      setIsCollapsed(prev => !prev);
    }, []);

    return (
      <div ref={ref} className={cn('sidebar-section', className)} style={sectionStyles} {...props}>
        {title && (
          <div className="flex items-center justify-between mb-2 px-2">
            <Typography variant="bodySmall" className="font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </Typography>
            {collapsible && (
              <button
                onClick={toggleCollapsed}
                aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
                className="h-6 w-6 p-1 rounded hover:bg-accent transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
                  className="transition-transform duration-200"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        )}
        {(!collapsible || !isCollapsed) && (
          <div className="space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  }
);

SidebarSection.displayName = 'SidebarSection';

/**
 * Sidebar item component for navigation or actions
 */
export const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ icon, label, active, disabled, badge, href, onClick, className, ...props }, ref) => {
    const { colors } = useTokens();

    const itemStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: active ? colors.accent?.default || '#f1f5f9' : 'transparent',
      color: active ? colors.accent?.foreground || '#0f172a' : colors.text?.primary || '#111827',
    }), [colors, active]);

      if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150',
            'hover:bg-accent hover:text-accent-foreground',
            active && 'bg-accent text-accent-foreground',
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && 'cursor-pointer',
            className
          )}
          style={itemStyles}
          onClick={disabled ? undefined : onClick}
          {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
        >
          {icon && (
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="truncate font-medium">
              {label}
            </div>
          </div>
          {badge && (
            <div className="flex-shrink-0">
              {badge}
            </div>
          )}
        </a>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150',
          'hover:bg-accent hover:text-accent-foreground',
          active && 'bg-accent text-accent-foreground',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer',
          className
        )}
        style={itemStyles}
        onClick={disabled ? undefined : onClick}
        {...props as React.HTMLAttributes<HTMLDivElement>}
      >
        {icon && (
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="truncate font-medium">
            {label}
          </div>
        </div>
        {badge && (
          <div className="flex-shrink-0">
            {badge}
          </div>
        )}
      </div>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

// =============================================================================
// SIDEBAR HOOKS
// =============================================================================

/**
 * Hook for managing sidebar resize
 */
const useSidebarResize = (
  resizable: boolean,
  initialWidth: number,
  minWidth: number,
  maxWidth: number,
  onResize?: (width: number) => void
) => {
  const [width, setWidth] = React.useState(initialWidth);
  const [isResizing, setIsResizing] = React.useState(false);
  const sidebarRef = React.useRef<HTMLElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!resizable) return;
    e.preventDefault();
    setIsResizing(true);
  }, [resizable]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !sidebarRef.current) return;

    const rect = sidebarRef.current.getBoundingClientRect();
    const newWidth = e.clientX - rect.left;
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
    
    setWidth(clampedWidth);
    onResize?.(clampedWidth);
  }, [isResizing, minWidth, maxWidth, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    width,
    isResizing,
    sidebarRef,
    handleMouseDown,
  };
};

// =============================================================================
// SIDEBAR COMPONENT
// =============================================================================

/**
 * Sidebar Component with token-based styling
 * Provides flexible navigation and content organization
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      title,
      header,
      footer,
      open = false,
      collapsed = false,
      contentPadding = 'md',
      showOverlay = true,
      resizable = false,
      minWidth = 200,
      maxWidth = 400,
      onClose,
      onToggleCollapse,
      onResize,
      closeButton,
      responsive = true,
      variant,
      size,
      position,
      side,
      collapsible,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { colors, spacing } = useTokens();
    const { isServer } = useSSR();
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    // Determine if we should show mobile behavior
    const showMobileBehavior = responsive && !isServer && isMobile;
    const shouldShowOverlay = showMobileBehavior && showOverlay && open;

    // Handle resize functionality
    const { width, isResizing, sidebarRef, handleMouseDown } = useSidebarResize(
      resizable && !collapsed,
      size === 'xs' ? 48 : size === 'sm' ? 64 : size === 'md' ? 256 : size === 'lg' ? 288 : size === 'xl' ? 320 : 384,
      minWidth,
      maxWidth,
      onResize
    );

    // Custom styles for token-based theming
    const sidebarStyles = React.useMemo((): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        transform: showMobileBehavior ? (open ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        width: resizable && !collapsed ? `${width}px` : undefined,
      };

      return { ...baseStyles, ...style };
    }, [showMobileBehavior, open, resizable, collapsed, width, style]);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open && onClose) {
          onClose();
        }
      };

      if (open) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [open, onClose]);

    // Prevent body scroll when mobile sidebar is open
    useEffect(() => {
      if (shouldShowOverlay) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
    }, [shouldShowOverlay]);

    return (
      <>
        {/* Overlay */}
        {shouldShowOverlay && (
          <div
            className={sidebarOverlayVariants({ show: true })}
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          ref={(node) => {
            // Forward ref to parent component
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref && 'current' in ref) {
              (ref as React.MutableRefObject<HTMLElement | null>).current = node;
            }
            // Set internal ref for resize functionality
            (sidebarRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }}
          role="complementary"
          aria-label={typeof title === 'string' ? title : 'Sidebar navigation'}
          className={cn(
            sidebarVariants({ variant, size, position, side, collapsible }),
            showMobileBehavior && position !== 'fixed' && 'fixed',
            className
          )}
          style={sidebarStyles}
          {...props}
        >
          {/* Header */}
          {(header || title) && (
            <SidebarHeader
              title={title}
              showCloseButton={showMobileBehavior}
              onClose={onClose}
            >
              {header}
            </SidebarHeader>
          )}

          {/* Content */}
          <div className={sidebarContentVariants({ padding: contentPadding })}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div 
              className="flex-shrink-0 border-t border-border p-4"
              style={{ borderColor: colors.border?.default || '#e2e8f0' }}
            >
              {footer}
            </div>
          )}

          {/* Resize handle */}
          {resizable && !collapsed && (
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-border hover:bg-primary/20 transition-colors"
              onMouseDown={handleMouseDown}
              aria-hidden="true"
              style={{
                backgroundColor: isResizing ? colors.primary?.[200] || '#dbeafe' : colors.border?.default || '#e2e8f0',
              }}
            />
          )}
        </aside>
      </>
    );
  }
);

Sidebar.displayName = 'Sidebar';

// =============================================================================
// SIDEBAR COMPOSITIONS
// =============================================================================

/**
 * Pre-built sidebar compositions for common use cases
 */
export const SidebarComposition = {
  /**
   * Navigation sidebar with sections
   */
  Navigation: ({ 
    title, 
    sections, 
    ...props 
  }: Omit<SidebarProps, 'children'> & { 
    sections: Array<{ title?: string; items: Array<Omit<SidebarItemProps, 'ref'>> }> 
  }) => (
    <Sidebar title={title} {...props}>
      {sections.map((section, index) => (
        <SidebarSection key={index} title={section.title}>
          {section.items.map((item, itemIndex) => (
            <SidebarItem key={itemIndex} {...item} />
          ))}
        </SidebarSection>
      ))}
    </Sidebar>
  ),

  /**
   * Dashboard sidebar with user info
   */
  Dashboard: ({ 
    user, 
    sections, 
    ...props 
  }: Omit<SidebarProps, 'children' | 'header' | 'footer'> & {
    user?: { name: string; avatar?: string; role?: string };
    sections: Array<{ title?: string; items: Array<Omit<SidebarItemProps, 'ref'>> }>;
  }) => (
    <Sidebar
      header={
        user && (
          <div className="flex items-center gap-3 p-4">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">{user.name}</div>
              {user.role && (
                <div className="text-sm text-muted-foreground truncate">{user.role}</div>
              )}
            </div>
          </div>
        )
      }
      {...props}
    >
      {sections.map((section, index) => (
        <SidebarSection key={index} title={section.title}>
          {section.items.map((item, itemIndex) => (
            <SidebarItem key={itemIndex} {...item} />
          ))}
        </SidebarSection>
      ))}
    </Sidebar>
  ),

  /**
   * Mobile-optimized sidebar
   */
  Mobile: ({ ...props }: SidebarProps) => (
    <Sidebar
      position="fixed"
      variant="filled"
      responsive
      showOverlay
      {...props}
    />
  ),
};

// Export variants for external usage
export { sidebarVariants, sidebarOverlayVariants, sidebarContentVariants };
export type SidebarVariant = VariantProps<typeof sidebarVariants>;
export type SidebarOverlayVariant = VariantProps<typeof sidebarOverlayVariants>;
export type SidebarContentVariant = VariantProps<typeof sidebarContentVariants>;