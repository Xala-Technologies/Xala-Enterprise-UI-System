/**
 * @fileoverview SSR-Safe Dropdown Component - Production Strategy Implementation
 * @description Dropdown component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, useRef, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Dropdown placement types
 */
export type DropdownPlacement = 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

/**
 * Dropdown variant types
 */
export type DropdownVariant = 'default' | 'primary' | 'secondary' | 'ghost' | 'outline';

/**
 * Dropdown size types
 */
export type DropdownSize = 'sm' | 'default' | 'lg';

/**
 * Dropdown trigger component props interface
 */
export interface DropdownTriggerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly asChild?: boolean;
}

/**
 * Dropdown content component props interface
 */
export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly align?: 'start' | 'center' | 'end';
  readonly sideOffset?: number;
  readonly alignOffset?: number;
  readonly avoidCollisions?: boolean;
  readonly collisionPadding?: number;
}

/**
 * Dropdown item component props interface
 */
export interface DropdownItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  readonly children: ReactNode;
  readonly disabled?: boolean;
  readonly onSelect?: (event: Event) => void;
  readonly closeOnSelect?: boolean;
}

/**
 * Dropdown separator component props interface
 */
export interface DropdownSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Dropdown label component props interface
 */
export interface DropdownLabelProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Dropdown component props interface
 */
export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly open?: boolean;
  readonly defaultOpen?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly placement?: DropdownPlacement;
  readonly modal?: boolean;
}

/**
 * Dropdown context interface
 */
interface DropdownContextValue {
  readonly isOpen: boolean;
  readonly setIsOpen: (open: boolean) => void;
  readonly triggerRef: React.RefObject<HTMLDivElement>;
  readonly contentRef: React.RefObject<HTMLDivElement>;
  readonly placement: DropdownPlacement;
}

/**
 * Dropdown context
 */
const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined);

/**
 * useDropdownContext hook
 */
const useDropdownContext = (): DropdownContextValue => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be used within a Dropdown component');
  }
  return context;
};

/**
 * Enhanced Dropdown component
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, open, defaultOpen = false, onOpenChange, placement = 'bottom', modal = true, className, style, ...props }, ref): React.ReactElement => {
    const [isOpen, setIsOpenState] = useState(open ?? defaultOpen);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const setIsOpen = (newOpen: boolean): void => {
      setIsOpenState(newOpen);
      onOpenChange?.(newOpen);
    };

    useEffect(() => {
      if (open !== undefined) {
        setIsOpenState(open);
      }
    }, [open]);

    const contextValue: DropdownContextValue = {
      isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
      placement
    };

    return (
      <DropdownContext.Provider value={contextValue}>
        <div ref={ref} className={className} style={style} {...props}>
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);

Dropdown.displayName = 'Dropdown';

/**
 * Enhanced DropdownTrigger component
 */
export const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ children, asChild = false, className, style, onClick, ...props }, ref): React.ReactElement => {
    const { isOpen, setIsOpen, triggerRef } = useDropdownContext();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
      event.preventDefault();
      setIsOpen(!isOpen);
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const triggerStyles: React.CSSProperties = {
      cursor: 'pointer',
      ...style,
    };

    return (
      <div
        ref={triggerRef}
        className={className}
        style={triggerStyles}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownTrigger.displayName = 'DropdownTrigger';

/**
 * Enhanced DropdownContent component
 */
export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, align = 'center', sideOffset = 4, alignOffset = 0, avoidCollisions = true, collisionPadding = 8, className, style, ...props }, ref): React.ReactElement => {
    const { isOpen, setIsOpen, triggerRef, contentRef, placement } = useDropdownContext();
    const { colors, spacing, typography, getToken } = useTokens();
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (!isOpen || !triggerRef.current) return;

      const updatePosition = (): void => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const triggerRect = trigger.getBoundingClientRect();
        let top = 0;
        let left = 0;

        // Basic placement logic (can be enhanced with collision detection)
        switch (placement) {
          case 'bottom':
          case 'bottom-start':
          case 'bottom-end':
            top = triggerRect.bottom + sideOffset;
            break;
          case 'top':
          case 'top-start':
          case 'top-end':
            top = triggerRect.top - sideOffset;
            break;
          case 'left':
          case 'left-start':
          case 'left-end':
            left = triggerRect.left - sideOffset;
            break;
          case 'right':
          case 'right-start':
          case 'right-end':
            left = triggerRect.right + sideOffset;
            break;
        }

        // Align adjustments
        if (placement.includes('bottom') || placement.includes('top')) {
          if (align === 'start' || placement.includes('start')) {
            left = triggerRect.left + alignOffset;
          } else if (align === 'end' || placement.includes('end')) {
            left = triggerRect.right + alignOffset;
          } else {
            left = triggerRect.left + triggerRect.width / 2 + alignOffset;
          }
        } else {
          if (align === 'start' || placement.includes('start')) {
            top = triggerRect.top + alignOffset;
          } else if (align === 'end' || placement.includes('end')) {
            top = triggerRect.bottom + alignOffset;
          } else {
            top = triggerRect.top + triggerRect.height / 2 + alignOffset;
          }
        }

        setPosition({ top, left });
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isOpen, placement, align, sideOffset, alignOffset, triggerRef]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent): void => {
        if (
          contentRef.current && 
          !contentRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, setIsOpen, contentRef, triggerRef]);

    if (!isOpen) return <></>;

    // Get design tokens
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };
    
    const shadows = {
      lg: (getToken('shadows.lg') as string) || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    const contentStyles: React.CSSProperties = {
      position: 'fixed',
      top: position.top,
      left: position.left,
      zIndex: 50,
      minWidth: '12rem',
      overflow: 'hidden',
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
      backgroundColor: colors.background?.paper || colors.background?.default || '#ffffff',
      padding: spacing[1],
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      boxShadow: shadows.lg,
      transform: align === 'center' ? 'translateX(-50%)' : undefined,
      ...style,
    };

    return (
      <>
        <div
          ref={contentRef}
          className={className}
          style={contentStyles}
          role="menu"
          aria-orientation="vertical"
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

DropdownContent.displayName = 'DropdownContent';

/**
 * Enhanced DropdownItem component
 */
export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, disabled = false, onSelect, closeOnSelect = true, className, style, onClick, ...props }, ref): React.ReactElement => {
    const { setIsOpen } = useDropdownContext();
    const { colors, spacing, typography, getToken } = useTokens();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
      if (disabled) return;
      
      onClick?.(event);
      onSelect?.(event as unknown as Event);
      
      if (closeOnSelect) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (disabled) return;
      
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    // Get border radius
    const borderRadius = {
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
    };

    const itemStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: borderRadius.sm,
      padding: `${spacing[1.5]} ${spacing[2]}`,
      fontSize: typography.fontSize.sm,
      outline: 'none',
      transition: 'all 150ms ease-in-out',
      opacity: disabled ? 0.5 : 1,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      ...style,
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        className={className}
        style={itemStyles}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
            e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
          }
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
            e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
            e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
            e.currentTarget.style.outlineOffset = '-2px';
          }
        }}
        onBlur={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
            e.currentTarget.style.outline = 'none';
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

/**
 * Enhanced DropdownSeparator component
 */
export const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, style, ...props }, ref): React.ReactElement => {
    const { colors, spacing } = useTokens();

    const separatorStyles: React.CSSProperties = {
      height: '1px',
      margin: `${spacing[1]} -${spacing[1]}`,
      backgroundColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
      ...style,
    };

    return (
      <div
        ref={ref}
        role="separator"
        className={className}
        style={separatorStyles}
        {...props}
      />
    );
  }
);

DropdownSeparator.displayName = 'DropdownSeparator';

/**
 * Enhanced DropdownLabel component
 */
export const DropdownLabel = forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ children, className, style, ...props }, ref): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();

    const labelStyles: React.CSSProperties = {
      padding: `${spacing[1.5]} ${spacing[2]}`,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={labelStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownLabel.displayName = 'DropdownLabel';