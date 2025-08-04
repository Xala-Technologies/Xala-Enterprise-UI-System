/**
 * @fileoverview SSR-Safe TreeView Components - Production Strategy Implementation
 * @description TreeView components using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';

/**
 * TreeView variant types
 */
export type TreeViewVariant = 'default' | 'ghost';

/**
 * TreeView data interface
 */
export interface TreeViewData {
  readonly id: string;
  readonly label: string;
  readonly icon?: ReactNode;
  readonly children?: TreeViewData[];
  readonly disabled?: boolean;
}

/**
 * TreeView component props interface
 */
export interface TreeViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  readonly data: TreeViewData[];
  readonly selectedId?: string;
  readonly expandedIds?: string[];
  readonly onSelect?: (_id: string, _item: TreeViewData) => void;
  readonly onExpand?: (_id: string, _expanded: boolean) => void;
}

/**
 * TreeViewItem component props interface
 */
export interface TreeViewItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  readonly item: TreeViewData;
  readonly level?: number;
  readonly selected?: boolean;
  readonly expanded?: boolean;
  readonly variant?: TreeViewVariant;
  readonly onSelect?: (_id: string, _item: TreeViewData) => void;
  readonly onToggle?: (_id: string) => void;
}

/**
 * Enhanced TreeView component with token-based styling
 */
export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    { data, selectedId, expandedIds = [], onSelect, onExpand, className, style, ...props },
    ref
  ): React.ReactElement => {
        const [internalExpanded, setInternalExpanded] = useState<string[]>(expandedIds);

    const handleToggle = (id: string): void => {
      const newExpanded = internalExpanded.includes(id)
        ? internalExpanded.filter(item => item !== id)
        : [...internalExpanded, id];

      setInternalExpanded(newExpanded);
      onExpand?.(id, !internalExpanded.includes(id));
    };

    const handleSelect = (id: string, item: TreeViewData): void => {
      onSelect?.(id, item);
    };

    // Container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
      ...style,
    };

    return (
      <Box ref={ref} role="tree" className={className} {...props}>
        {data.map(item => (
          <TreeViewItem
            key={item.id}
            item={item}
            level={0}
            selected={selectedId === item.id}
            expanded={internalExpanded.includes(item.id)}
            onSelect={handleSelect}
            onToggle={handleToggle}
          />
        ))}
      </Box>
    );
  }
);

TreeView.displayName = 'TreeView';

/**
 * Enhanced TreeViewItem component with token-based styling
 */
export const TreeViewItem = forwardRef<HTMLDivElement, TreeViewItemProps>(
  (
    {
      item,
      level = 0,
      selected = false,
      expanded = false,
      onSelect,
      onToggle,
      variant = 'default',
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
        const hasChildren = item.children && item.children.length > 0;
    const paddingLeft = level * 16 + 8;

    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    const handleClick = (): void => {
      if (!item.disabled) {
        onSelect?.(item.id, item);
      }
    };

    const handleToggleClick = (e: React.MouseEvent): void => {
      e.stopPropagation();
      if (hasChildren) {
        onToggle?.(item.id);
      }
    };

    // Item styles
    const getItemStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        borderRadius: borderRadius.md,
        paddingLeft,
        paddingRight: spacing[2],
        paddingTop: spacing[1],
        paddingBottom: spacing[1],
        fontSize: typography.fontSize.sm,
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        transition: 'all 150ms ease-in-out',
      };

      if (item.disabled) {
        return {
          ...baseStyles,
          opacity: 0.5,
          pointerEvents: 'none',
        };
      }

      if (selected) {
        return {
          ...baseStyles,
          backgroundColor: colors.accent?.default || colors.neutral?.[100] || '#f3f4f6',
          color: colors.accent?.foreground || colors.text?.primary || '#111827',
        };
      }

      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      };
    };

    // Toggle button styles
    const toggleButtonStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      borderRadius: borderRadius.md,
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
      transition: 'all 150ms ease-in-out',
    };

    // Spacer styles
    const spacerStyles: React.CSSProperties = {
      width: '16px',
      height: '16px',
      flexShrink: 0,
    };

    // Icon styles
    const iconStyles: React.CSSProperties = {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    // Children container styles
    const childrenContainerStyles: React.CSSProperties = {
      marginLeft: spacing[4],
    };

    return (
      <Box ref={ref}>
        <Box
          role="treeitem"
          tabIndex={item.disabled ? -1 : 0}
          aria-selected={selected}
          aria-expanded={hasChildren ? expanded : undefined}
          data-selected={selected}
          data-disabled={item.disabled}
          className={className}
         
          onClick={handleClick}
          onMouseEnter={(e) => {
            if (!item.disabled && !selected && variant !== 'ghost') {
              e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
              e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
            }
          }}
          onMouseLeave={(e) => {
            if (!item.disabled && !selected) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
            }
          }}
          onFocus={(e) => {
            if (!item.disabled) {
              e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
              e.currentTarget.style.outlineOffset = '2px';
              if (!selected) {
                e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
              }
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
            if (!item.disabled && !selected) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
            }
          }}
          {...props}
        >
          {hasChildren ? (
            <button
              type="button"
              onClick={handleToggleClick}
             
              aria-label={expanded ? 'Collapse' : 'Expand'}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {expanded ? '▼' : '▶'}
            </button>
          ) : (
            <Box />
          )}

          {item.icon && <Text as="span">{item.icon}</Text>}

          <Text as="span">{item.label}</Text>
        </Box>

        {hasChildren && expanded && (
          <Box>
            {item.children?.map(child => (
              <TreeViewItem
                key={child.id}
                item={child}
                level={level + 1}
                selected={selected && child.id === item.id}
                expanded={expanded}
                onSelect={onSelect}
                onToggle={onToggle}
                variant={variant}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  }
);

TreeViewItem.displayName = 'TreeViewItem';
