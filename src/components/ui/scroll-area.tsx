/**
 * @fileoverview SSR-Safe ScrollArea Component - Production Strategy Implementation
 * @description ScrollArea component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Norwegian Enterprise Standards
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput } from '../semantic';

/**
 * ScrollArea variant types
 */
export type ScrollAreaVariant = 'default' | 'ghost' | 'outline';

/**
 * ScrollArea size types
 */
export type ScrollAreaSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * ScrollArea orientation types
 */
export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

/**
 * ScrollArea Props interface
 */
export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Child content to be scrolled */
  readonly children: React.ReactNode;
  /** Hide scrollbars */
  readonly hideScrollbars?: boolean;
  /** Custom scrollbar style */
  readonly scrollbarStyle?: 'auto' | 'overlay' | 'none';
  /** Smooth scrolling behavior */
  readonly smoothScroll?: boolean;
  /** ScrollArea variant */
  readonly variant?: ScrollAreaVariant;
  /** ScrollArea size */
  readonly size?: ScrollAreaSize;
  /** ScrollArea orientation */
  readonly orientation?: ScrollAreaOrientation;
}

/**
 * Enhanced ScrollArea component with token-based styling
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'md',
      orientation = 'vertical',
      children,
      hideScrollbars = false,
      scrollbarStyle = 'auto',
      smoothScroll = true,
      ...props
    },
    ref
  ): React.ReactElement => {
    
    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { height: '8rem' }; // 128px
        case 'lg':
          return { height: '24rem' }; // 384px
        case 'xl':
          return { height: '600px' };
        case 'full':
          return { height: '100%' };
        default:
          return { height: '16rem' }; // 256px
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
          };
        case 'outline':
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        default:
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
      }
    };

    // Orientation styles
    const getOrientationStyles = (): React.CSSProperties => {
      switch (orientation) {
        case 'horizontal':
          return {
            overflowX: 'auto',
            overflowY: 'hidden',
          };
        case 'both':
          return {
            overflow: 'auto',
          };
        default: // vertical
          return {
            overflowY: 'auto',
            overflowX: 'hidden',
          };
      }
    };

    // Container styles
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: borderRadius.md,
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...(hideScrollbars && {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }),
      ...(smoothScroll && {
        scrollBehavior: 'smooth',
      }),
      ...(scrollbarStyle === 'none' && {
        scrollbarWidth: 'none',
      }),
      ...(scrollbarStyle === 'auto' && {
        scrollbarWidth: 'thin',
      }),
      ...style,
    };

    // Viewport styles
    const viewportStyles: React.CSSProperties = {
      height: '100%',
      width: '100%',
      borderRadius: 'inherit',
      ...getOrientationStyles(),
      // Custom scrollbar styling for WebKit browsers
      scrollbarWidth: scrollbarStyle === 'none' ? 'none' : 'thin',
      scrollbarColor: `${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'} ${colors.background?.default || '#ffffff'}`,
    };

    // Create CSS for WebKit scrollbars
    const scrollbarCSS = `
      .scroll-area-webkit::-webkit-scrollbar {
        width: ${scrollbarStyle === 'none' ? '0px' : '10px'};
        height: ${scrollbarStyle === 'none' ? '0px' : '10px'};
      }
      .scroll-area-webkit::-webkit-scrollbar-track {
        background: ${colors.background?.default || '#ffffff'};
        border-radius: 9999px;
      }
      .scroll-area-webkit::-webkit-scrollbar-thumb {
        background: ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'};
        border-radius: 9999px;
      }
      .scroll-area-webkit::-webkit-scrollbar-thumb:hover {
        background: ${colors.text?.secondary || colors.neutral?.[500] || '#6b7280'};
      }
      ${hideScrollbars ? `
      .scroll-area-webkit::-webkit-scrollbar {
        display: none;
      }
      ` : ''}
    `;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: scrollbarCSS }} />
        <Box
          ref={ref}
          className={`scroll-area-webkit ${className || ''}`}
         
          {...props}
        >
          <Box>
            {children}
          </Box>
        </Box>
      </>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

/**
 * Legacy variant exports for backward compatibility
 */
export const scrollAreaVariants = {};
export const scrollAreaViewportVariants = {};
export const scrollAreaScrollbarVariants = {};
export const scrollAreaThumbVariants = {};
