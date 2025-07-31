/**
 * @fileoverview SSR-Safe Accordion Components - Production Strategy Implementation
 * @description Accordion components using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Accordion variant types
 */
export type AccordionVariant = 'default' | 'ghost' | 'separated';

/**
 * Accordion size types
 */
export type AccordionSize = 'sm' | 'md' | 'lg';

/**
 * Accordion content state types
 */
export type AccordionState = 'open' | 'closed';

/**
 * Accordion item data interface
 */
export interface AccordionItemData {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
  readonly disabled?: boolean;
  readonly defaultOpen?: boolean;
  readonly icon?: ReactNode;
}

/**
 * Accordion component props interface
 */
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Accordion styling variant */
  readonly variant?: AccordionVariant;
  /** Accordion size */
  readonly size?: AccordionSize;
  /** Accordion items data */
  readonly items?: AccordionItemData[];
  /** Allow multiple items to be open simultaneously */
  readonly multiple?: boolean;
  /** Collapsible behavior */
  readonly collapsible?: boolean;
  /** Norwegian compliance metadata */
  readonly norwegian?: {
    readonly classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    readonly accessibilityLabel?: string;
  };
}

/**
 * AccordionItem component props interface
 */
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Item styling variant */
  readonly variant?: AccordionVariant;
  /** Unique item identifier */
  readonly value: string;
  /** Item disabled state */
  readonly disabled?: boolean;
  /** Children components (trigger and content) */
  readonly children: ReactNode;
}

/**
 * AccordionTrigger component props interface
 */
export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Trigger styling variant */
  readonly variant?: AccordionVariant;
  /** Trigger size */
  readonly size?: AccordionSize;
  /** Trigger content */
  readonly children: ReactNode;
  /** Open state */
  readonly isOpen?: boolean;
  /** Click handler */
  readonly onToggle?: () => void;
  /** Show expand/collapse icon */
  readonly showIcon?: boolean;
  /** Custom icon */
  readonly icon?: ReactNode;
}

/**
 * AccordionContent component props interface
 */
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Content styling variant */
  readonly variant?: AccordionVariant;
  /** Content size */
  readonly size?: AccordionSize;
  /** Content state */
  readonly state?: AccordionState;
  /** Content to display */
  readonly children: ReactNode;
  /** Open state */
  readonly isOpen?: boolean;
}

/**
 * Accordion component - Pure presentational component
 * @param items - Array of accordion items (optional, can use children instead)
 * @param variant - Accordion styling variant
 * @param size - Accordion size
 * @param multiple - Allow multiple items open
 * @param collapsible - Allow items to be collapsed
 * @param norwegian - Norwegian compliance configuration
 * @param className - Additional CSS classes
 * @param children - Child components (for manual composition)
 * @param props - Additional HTML attributes
 * @returns Accordion JSX element
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      variant = 'default',
      size = 'md',
      multiple: _multiple,
      collapsible: _collapsible,
      norwegian,
      className,
      style,
      children,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, getToken } = useTokens();
    
    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Container styles
    const getContainerStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        borderTopWidth: '1px',
        borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
      };

      switch (variant) {
        case 'default':
          return {
            ...baseStyles,
            border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
            borderRadius: borderRadius.md,
          };
        case 'separated':
          return {
            ...baseStyles,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[2],
          };
        case 'ghost':
        default:
          return baseStyles;
      }
    };

    const containerStyles: React.CSSProperties = {
      ...getContainerStyles(),
      ...style,
    };
    
    // If items are provided, render them automatically
    if (items) {
      return (
        <div
          ref={ref}
          className={className}
          style={containerStyles}
          role="region"
          aria-label={norwegian?.accessibilityLabel || 'Accordion'}
          {...props}
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} variant={variant} disabled={item.disabled}>
              <AccordionTrigger
                variant={variant}
                size={size}
                isOpen={item.defaultOpen}
                showIcon={true}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent variant={variant} size={size} isOpen={item.defaultOpen}>
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      );
    }

    // Manual composition mode
    return (
      <div
        ref={ref}
        className={className}
        style={containerStyles}
        role="region"
        aria-label={norwegian?.accessibilityLabel || 'Accordion'}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

/**
 * AccordionItem component - Pure presentational component
 * @param value - Unique item identifier
 * @param variant - Item styling variant
 * @param disabled - Item disabled state
 * @param children - Trigger and content components
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns AccordionItem JSX element
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    { value, variant = 'default', disabled = false, children, className, style, ...props },
    ref
  ): React.ReactElement => {
    const { colors, getToken } = useTokens();
    
    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Item styles
    const getItemStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'separated':
          return {
            border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
            borderRadius: borderRadius.md,
          };
        case 'ghost':
        case 'default':
        default:
          return {};
      }
    };

    const itemStyles: React.CSSProperties = {
      ...getItemStyles(),
      ...style,
    };

    return (
      <div
        ref={ref}
        data-value={value}
        data-disabled={disabled}
        className={className}
        style={itemStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

/**
 * AccordionTrigger component - Pure presentational component
 * @param children - Trigger content
 * @param variant - Trigger styling variant
 * @param size - Trigger size
 * @param isOpen - Open state
 * @param onToggle - Toggle handler
 * @param showIcon - Show expand/collapse icon
 * @param icon - Custom icon
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns AccordionTrigger JSX element
 */
export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      isOpen = false,
      onToggle,
      showIcon = true,
      icon,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, getToken } = useTokens();
    
    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            fontSize: '0.875rem',
            paddingTop: spacing[2],
            paddingBottom: spacing[2],
            paddingLeft: spacing[3],
            paddingRight: spacing[3],
          };
        case 'lg':
          return {
            fontSize: '1.125rem',
            paddingTop: spacing[5],
            paddingBottom: spacing[5],
            paddingLeft: spacing[5],
            paddingRight: spacing[5],
          };
        default: // md
          return {
            fontSize: '1rem',
            paddingTop: spacing[4],
            paddingBottom: spacing[4],
            paddingLeft: spacing[4],
            paddingRight: spacing[4],
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'ghost':
          return {
            paddingLeft: 0,
            paddingRight: 0,
          };
        case 'separated':
          return {
            borderRadius: borderRadius.md,
          };
        case 'default':
        default:
          return {
            textAlign: 'left',
          };
      }
    };

    const triggerStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: '500',
      transition: 'all 150ms ease-in-out',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      outline: 'none',
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...style,
    };
    
    return (
      <button
        ref={ref}
        type="button"
        className={className}
        style={triggerStyles}
        data-state={isOpen ? 'open' : 'closed'}
        aria-expanded={isOpen}
        onClick={onToggle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
          e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        {...props}
      >
        <span style={{ flex: 1, textAlign: 'left' }}>{children}</span>
        {showIcon && (
          <span 
            style={{ 
              marginLeft: spacing[2], 
              transition: 'transform 200ms ease-in-out',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            {icon || (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: '16px', width: '16px', flexShrink: 0 }}
              >
                <path
                  d="m4.5 6 3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        )}
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

/**
 * AccordionContent component - Pure presentational component
 * @param children - Content to display
 * @param variant - Content styling variant
 * @param size - Content size
 * @param isOpen - Open state
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns AccordionContent JSX element
 */
export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  (
    { children, variant = 'default', size = 'md', state: _state, isOpen = false, className, style, ...props },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();
    
    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            paddingLeft: spacing[3],
            paddingRight: spacing[3],
            paddingBottom: spacing[2],
          };
        case 'lg':
          return {
            paddingLeft: spacing[5],
            paddingRight: spacing[5],
            paddingBottom: spacing[5],
          };
        default: // md
          return {
            paddingLeft: spacing[4],
            paddingRight: spacing[4],
            paddingBottom: spacing[4],
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'ghost':
          return {
            paddingLeft: 0,
            paddingRight: 0,
          };
        case 'separated':
        case 'default':
        default:
          return {};
      }
    };

    const contentStyles: React.CSSProperties = {
      overflow: 'hidden',
      transition: 'all 200ms ease-in-out',
      display: isOpen ? 'block' : 'none',
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...style,
    };

    const textStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };
    
    return (
      <div
        ref={ref}
        className={className}
        style={contentStyles}
        data-state={isOpen ? 'open' : 'closed'}
        role="region"
        {...props}
      >
        <div style={textStyles}>{children}</div>
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';
