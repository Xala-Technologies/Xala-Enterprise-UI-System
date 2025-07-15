/**
 * TreeView components with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Tree view variants
 */
const treeViewVariants = cva('space-y-1');

/**
 * Tree view item variants
 */
const treeViewItemVariants = cva(
  [
    'flex items-center space-x-2 rounded-md px-2 py-1 text-sm',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:bg-accent focus:text-accent-foreground focus:outline-none',
    'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
  ],
  {
    variants: {
      variant: {
        default: '',
        ghost: 'hover:bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

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
export interface TreeViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof treeViewVariants> {
  readonly data: TreeViewData[];
  readonly selectedId?: string;
  readonly expandedIds?: string[];
  readonly onSelect?: (_id: string, _item: TreeViewData) => void;
  readonly onExpand?: (_id: string, _expanded: boolean) => void;
}

/**
 * TreeViewItem component props interface
 */
export interface TreeViewItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof treeViewItemVariants> {
  readonly item: TreeViewData;
  readonly level?: number;
  readonly selected?: boolean;
  readonly expanded?: boolean;
  readonly onSelect?: (_id: string, _item: TreeViewData) => void;
  readonly onToggle?: (_id: string) => void;
}

/**
 * Enhanced TreeView component
 * @param data - Tree data structure
 * @param selectedId - Currently selected item ID
 * @param expandedIds - Array of expanded item IDs
 * @param onSelect - Selection handler
 * @param onExpand - Expand handler
 * @param className - Additional CSS classes
 * @returns TreeView JSX element
 */
export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    { data, selectedId, expandedIds = [], onSelect, onExpand, className, ...props },
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

    return (
      <div ref={ref} role="tree" className={cn(treeViewVariants(), className)} {...props}>
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
      </div>
    );
  }
);

TreeView.displayName = 'TreeView';

/**
 * Enhanced TreeViewItem component
 * @param item - Tree item data
 * @param level - Nesting level
 * @param selected - Selection state
 * @param expanded - Expansion state
 * @param onSelect - Selection handler
 * @param onToggle - Toggle handler
 * @param className - Additional CSS classes
 * @returns TreeViewItem JSX element
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
      ...props
    },
    ref
  ): React.ReactElement => {
    const hasChildren = item.children && item.children.length > 0;
    const paddingLeft = level * 16 + 8;

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

    return (
      <div ref={ref}>
        <div
          role="treeitem"
          tabIndex={item.disabled ? -1 : 0}
          aria-selected={selected}
          aria-expanded={hasChildren ? expanded : undefined}
          data-selected={selected}
          data-disabled={item.disabled}
          className={cn(treeViewItemVariants({ variant }), className)}
          style={{ paddingLeft }}
          onClick={handleClick}
          {...props}
        >
          {hasChildren && (
            <button
              type="button"
              onClick={handleToggleClick}
              className="flex items-center justify-center w-4 h-4 hover:bg-accent rounded"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? '▼' : '▶'}
            </button>
          )}

          {!hasChildren && <div className="w-4" />}

          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}

          <span className="flex-1 truncate">{item.label}</span>
        </div>

        {hasChildren && expanded && (
          <div className="ml-4">
            {item.children?.map(child => (
              <TreeViewItem
                key={child.id}
                item={child}
                level={level + 1}
                selected={child.id === item.id}
                expanded={expanded}
                onSelect={onSelect}
                onToggle={onToggle}
                variant={variant}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

TreeViewItem.displayName = 'TreeViewItem';
