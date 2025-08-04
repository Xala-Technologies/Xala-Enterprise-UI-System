/**
 * @fileoverview Header Component v5.0.0 - Token-Based Design System
 * @description Generic Header component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput } from '../semantic';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Typography } from './typography';
import { Button } from './button';

// =============================================================================
// HEADER VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Header variants following CVA pattern
 */
const headerVariants = cva(
  [
    'w-full flex items-center',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background border-b border-border',
        filled: 'bg-card shadow-sm',
        elevated: 'bg-card shadow-md border border-border',
        outlined: 'bg-transparent border border-border',
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'h-12 px-4',
        md: 'h-16 px-6',
        lg: 'h-20 px-8',
        xl: 'h-24 px-10',
      },
      position: {
        static: 'static',
        sticky: 'sticky top-0 z-50 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80',
        fixed: 'fixed top-0 left-0 right-0 z-50 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'static',
      justify: 'between',
    },
  }
);

const headerSectionVariants = cva(
  'flex items-center',
  {
    variants: {
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
    },
    defaultVariants: {
      align: 'start',
      gap: 'md',
    },
  }
);

// =============================================================================
// HEADER INTERFACES
// =============================================================================

export interface HeaderProps 
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof headerVariants> {
  /** Header title */
  readonly title?: ReactNode;
  /** Subtitle or description */
  readonly subtitle?: ReactNode;
  /** Logo or brand element */
  readonly logo?: ReactNode;
  /** Navigation elements */
  readonly navigation?: ReactNode;
  /** Action buttons or elements */
  readonly actions?: ReactNode;
  /** Left section content */
  readonly leftSection?: ReactNode;
  /** Center section content */
  readonly centerSection?: ReactNode;
  /** Right section content */
  readonly rightSection?: ReactNode;
  /** Show divider below header */
  readonly showDivider?: boolean;
  /** Make header responsive */
  readonly responsive?: boolean;
}

export interface HeaderSectionProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerSectionVariants> {
  readonly children: ReactNode;
}

export interface HeaderTitleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title: ReactNode;
  readonly subtitle?: ReactNode;
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface HeaderLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly src?: string;
  readonly alt?: string;
  readonly size?: number | string;
  readonly children?: ReactNode;
}

// =============================================================================
// HEADER SUB-COMPONENTS
// =============================================================================

/**
 * Header section component for organizing content
 */
export const HeaderSection = forwardRef<HTMLDivElement, HeaderSectionProps>(
  ({ children, align, gap, className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(headerSectionVariants({ align, gap }), className)}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

HeaderSection.displayName = 'HeaderSection';

/**
 * Header title component with proper typography
 */
export const HeaderTitle = forwardRef<HTMLDivElement, HeaderTitleProps>(
  ({ title, subtitle, size = 'md', className, ...props }, ref) => {
    const titleSizes = {
      sm: 'h5' as const,
      md: 'h4' as const,
      lg: 'h3' as const,
      xl: 'h2' as const,
    };

    return (
      <Box ref={ref} className={cn('flex flex-col', className)} {...props}>
        <Typography variant={titleSizes[size]} className="font-semibold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="bodySmall" className="text-muted-foreground mt-1">
            {subtitle}
          </Typography>
        )}
      </Box>
    );
  }
);

HeaderTitle.displayName = 'HeaderTitle';

/**
 * Header logo component
 */
export const HeaderLogo = forwardRef<HTMLDivElement, HeaderLogoProps>(
  ({ src, alt, size = 32, children, className, ...props }, ref) => {
    
    const logoStyles = React.useMemo((): React.CSSProperties => ({
      height: typeof size === 'number' ? `${size}px` : size,
      width: 'auto',
    }), [size]);

    return (
      <Box 
        ref={ref} 
        className={cn('flex items-center gap-3', className)} 
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Logo'}
           
            className="object-contain"
          />
        ) : children ? (
          <Box className="flex items-center">
            {children}
          </Box>
        ) : null}
      </Box>
    );
  }
);

HeaderLogo.displayName = 'HeaderLogo';

// =============================================================================
// HEADER COMPONENT
// =============================================================================

/**
 * Header Component with token-based styling
 * Provides flexible layout options for application headers
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      title,
      subtitle,
      logo,
      navigation,
      actions,
      leftSection,
      centerSection,
      rightSection,
      showDivider = false,
      responsive = true,
      variant,
      size,
      position,
      justify,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    
    // Custom styles for token-based theming
    const headerStyles = React.useMemo((): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        borderColor: colors.border?.default || '#e2e8f0',
        backgroundColor: variant === 'ghost' ? 'transparent' : colors.background?.default || '#ffffff',
      };

      if (position === 'sticky' || position === 'fixed') {
        baseStyles.backdropFilter = 'blur(8px)';
        baseStyles.WebkitBackdropFilter = 'blur(8px)';
      }

      return { ...baseStyles, ...style };
    }, [colors, variant, position, style]);

    // Render left section content
    const renderLeftSection = () => {
      if (leftSection) return leftSection;
      
      return (
        <HeaderSection align="start" gap="md">
          {logo}
          {(title || subtitle) && (
            <HeaderTitle 
              title={title} 
              subtitle={subtitle}
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : size === 'xl' ? 'xl' : 'md'}
            />
          )}
        </HeaderSection>
      );
    };

    // Render center section content
    const renderCenterSection = () => {
      if (centerSection) return centerSection;
      return navigation;
    };

    // Render right section content
    const renderRightSection = () => {
      if (rightSection) return rightSection;
      return actions;
    };

    return (
      <>
        <Box as="header"
          ref={ref}
          role="banner"
          className={cn(
            headerVariants({ variant, size, position, justify }),
            responsive && 'min-w-0', // Allow shrinking
            className
          )}
         
          {...props}
        >
          {children ? (
            children
          ) : (
            <>
              {/* Left Section */}
              <Box className="flex items-center min-w-0 flex-shrink-0">
                {renderLeftSection()}
              </Box>

              {/* Center Section */}
              {renderCenterSection() && (
                <Box className="flex items-center justify-center flex-1 min-w-0">
                  <HeaderSection align="center" gap="md">
                    {renderCenterSection()}
                  </HeaderSection>
                </Box>
              )}

              {/* Right Section */}
              {renderRightSection() && (
                <Box className="flex items-center min-w-0 flex-shrink-0 ml-auto">
                  <HeaderSection align="end" gap="sm">
                    {renderRightSection()}
                  </HeaderSection>
                </Box>
              )}
            </>
          )}
        </Box>

        {/* Divider */}
        {showDivider && (
          <Box 
            className="w-full border-b border-border"
           
          />
        )}
      </>
    );
  }
);

Header.displayName = 'Header';

// =============================================================================
// HEADER COMPOSITIONS
// =============================================================================

/**
 * Pre-built header compositions for common use cases
 */
export const HeaderComposition = {
  /**
   * Simple header with title and actions
   */
  Simple: ({ title, actions, ...props }: Omit<HeaderProps, 'children'>) => (
    <Header
      title={title}
      actions={actions}
      variant="default"
      size="md"
      {...props}
    />
  ),

  /**
   * Brand header with logo and navigation
   */
  Brand: ({ 
    logo, 
    title, 
    navigation, 
    actions, 
    ...props 
  }: Omit<HeaderProps, 'children'>) => (
    <Header
      logo={logo}
      title={title}
      navigation={navigation}
      actions={actions}
      variant="default"
      size="md"
      position="sticky"
      {...props}
    />
  ),

  /**
   * Dashboard header with breadcrumbs and user actions
   */
  Dashboard: ({ 
    title, 
    subtitle, 
    actions, 
    ...props 
  }: Omit<HeaderProps, 'children'>) => (
    <Header
      title={title}
      subtitle={subtitle}
      actions={actions}
      variant="filled"
      size="lg"
      showDivider
      {...props}
    />
  ),

  /**
   * Mobile-optimized header
   */
  Mobile: ({ 
    title, 
    leftSection, 
    rightSection, 
    ...props 
  }: Omit<HeaderProps, 'children'>) => (
    <Header
      title={title}
      leftSection={leftSection}
      rightSection={rightSection}
      variant="default"
      size="sm"
      position="sticky"
      {...props}
    />
  ),
};

// Export variants for external usage
export { headerVariants, headerSectionVariants };
export type HeaderVariant = VariantProps<typeof headerVariants>;
export type HeaderSectionVariant = VariantProps<typeof headerSectionVariants>;
