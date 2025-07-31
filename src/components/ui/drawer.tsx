/**
 * @fileoverview SSR-Safe Drawer Component - Production Strategy Implementation
 * @description Drawer/Sheet component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Drawer overlay variant types
 */
export type DrawerOverlayVariant = 'default' | 'dark' | 'light';

/**
 * Drawer side types
 */
export type DrawerSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * Drawer size types
 */
export type DrawerSize = 'sm' | 'default' | 'lg' | 'xl' | 'full';

/**
 * Drawer component props interface
 */
export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
  readonly side?: DrawerSide;
  readonly size?: DrawerSize;
  readonly overlayVariant?: DrawerOverlayVariant;
  readonly closeOnOverlayClick?: boolean;
  readonly closeOnEscape?: boolean;
  readonly showCloseButton?: boolean;
  readonly children: ReactNode;
}

/**
 * Drawer header component props interface
 */
export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  readonly title?: string;
  readonly description?: string;
  readonly size?: 'sm' | 'default' | 'lg';
  readonly children?: ReactNode;
}

/**
 * Drawer body component props interface
 */
export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Drawer footer component props interface
 */
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Close icon component
 */
const CloseIcon = (): React.ReactElement => (
  <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Enhanced Drawer component with token-based styling
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen = false,
      onClose,
      side = 'right',
      size = 'default',
      overlayVariant = 'default',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      children,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, getToken } = useTokens();

    const handleOverlayClick = (): void => {
      if (closeOnOverlayClick && onClose) {
        onClose();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent): void => {
      if (event.key === 'Escape' && closeOnEscape && onClose) {
        onClose();
      }
    };

    if (!isOpen) {
      return <></>;
    }

    // Get shadows
    const shadows = {
      lg: (getToken('shadows.lg') as string) || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    // Overlay styles
    const getOverlayStyles = (): React.CSSProperties => {
      const baseOpacity = overlayVariant === 'dark' ? 0.9 : overlayVariant === 'light' ? 0.6 : 0.8;
      return {
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: `${colors.background?.default || '#ffffff'}${Math.round(baseOpacity * 255).toString(16).padStart(2, '0')}`,
        backdropFilter: 'blur(4px)',
        transition: 'all 150ms ease-in-out',
      };
    };

    // Side positioning styles
    const getSideStyles = (): React.CSSProperties => {
      switch (side) {
        case 'top':
          return {
            top: 0,
            left: 0,
            right: 0,
            borderBottom: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'bottom':
          return {
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'left':
          return {
            top: 0,
            bottom: 0,
            left: 0,
            height: '100%',
            borderRight: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'right':
          return {
            top: 0,
            bottom: 0,
            right: 0,
            height: '100%',
            borderLeft: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        default:
          return {};
      }
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      if (side === 'top' || side === 'bottom') {
        switch (size) {
          case 'sm':
            return { maxHeight: '12rem' }; // 192px
          case 'lg':
            return { maxHeight: '20rem' }; // 320px
          case 'xl':
            return { maxHeight: '24rem' }; // 384px
          case 'full':
            return { maxHeight: '100vh' };
          default:
            return { maxHeight: '16rem' }; // 256px
        }
      } else {
        switch (size) {
          case 'sm':
            return { width: '50%', maxWidth: '20rem' }; // max-w-xs
          case 'lg':
            return { width: '80%', maxWidth: '28rem' }; // max-w-md
          case 'xl':
            return { width: '83.333333%', maxWidth: '32rem' }; // max-w-lg
          case 'full':
            return { width: '100%', maxWidth: 'none' };
          default:
            return { width: '75%', maxWidth: '24rem' }; // max-w-sm
        }
      }
    };

    // Close button positioning
    const getCloseButtonPosition = (): React.CSSProperties => {
      const baseStyles = {
        position: 'absolute' as const,
        zIndex: 10,
      };

      switch (side) {
        case 'top':
        case 'bottom':
          return { ...baseStyles, right: spacing[4], top: spacing[4] };
        case 'left':
          return { ...baseStyles, right: spacing[4], top: spacing[4] };
        case 'right':
          return { ...baseStyles, left: spacing[4], top: spacing[4] };
        default:
          return { ...baseStyles, right: spacing[4], top: spacing[4] };
      }
    };

    // Content styles
    const contentStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[4],
      backgroundColor: colors.background?.default || '#ffffff',
      padding: spacing[6],
      boxShadow: shadows.lg,
      transition: 'all 300ms ease-in-out',
      ...getSideStyles(),
      ...getSizeStyles(),
      ...style,
    };

    // Close button styles
    const closeButtonStyles: React.CSSProperties = {
      ...getCloseButtonPosition(),
      opacity: 0.7,
      cursor: 'pointer',
      transition: 'opacity 150ms ease-in-out',
      outline: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      padding: spacing[1],
      borderRadius: '2px',
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    };

    return (
      <>
        {/* Overlay */}
        <div
          style={getOverlayStyles()}
          data-state={isOpen ? 'open' : 'closed'}
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          aria-hidden="true"
        />

        {/* Drawer content */}
        <div
          ref={ref}
          className={className}
          style={contentStyles}
          data-state={isOpen ? 'open' : 'closed'}
          role="dialog"
          aria-modal="true"
          aria-label="Drawer"
          onKeyDown={handleKeyDown}
          {...props}
        >
          {/* Close button */}
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              style={closeButtonStyles}
              aria-label="Lukk"
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.7';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <CloseIcon />
            </button>
          )}

          {children}
        </div>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';

/**
 * Enhanced DrawerHeader component
 */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  (
    { title, description, size = 'default', children, className, style, ...props },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { paddingBottom: spacing[2] };
        case 'lg':
          return { paddingBottom: spacing[6] };
        default:
          return { paddingBottom: spacing[4] };
      }
    };

    const headerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1.5],
      textAlign: 'center',
      ...getSizeStyles(),
      ...style,
      // Override text alignment for larger screens (simulate sm:text-left)
      '@media (min-width: 640px)': {
        textAlign: 'left',
      },
    };

    const titleStyles: React.CSSProperties = {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.none,
      letterSpacing: typography.letterSpacing?.tight || '-0.025em',
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    };

    const descriptionStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    return (
      <div ref={ref} className={className} style={headerStyles} {...props}>
        {children || (
          <>
            {title && <h2 style={titleStyles}>{title}</h2>}
            {description && <p style={descriptionStyles}>{description}</p>}
          </>
        )}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

/**
 * Enhanced DrawerBody component
 */
export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, style, ...props }, ref): React.ReactElement => {
    const bodyStyles: React.CSSProperties = {
      flex: 1,
      overflow: 'auto',
      ...style,
    };

    return (
      <div ref={ref} className={className} style={bodyStyles} {...props}>
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

/**
 * Enhanced DrawerFooter component
 */
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, style, ...props }, ref): React.ReactElement => {
    const { spacing } = useTokens();

    const footerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column-reverse',
      paddingTop: spacing[4],
      gap: spacing[2],
      ...style,
      // Override for larger screens (simulate sm:flex-row sm:justify-end sm:space-x-2)
      '@media (min-width: 640px)': {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: spacing[2],
      },
    };

    return (
      <div ref={ref} className={className} style={footerStyles} {...props}>
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';
