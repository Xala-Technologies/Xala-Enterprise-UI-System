/**
 * Timeline components - Pure presentational components
 * Displays chronological events with Norwegian compliance
 * No client-side logic or state management
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Timeline container variants
 */
const timelineVariants = cva(['relative'], {
  variants: {
    orientation: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row items-center space-x-4 overflow-x-auto',
    },
    variant: {
      default: '',
      compact: 'space-y-2',
      spacious: 'space-y-6',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    variant: 'default',
  },
});

/**
 * Timeline item variants
 */
const timelineItemVariants = cva(['relative flex'], {
  variants: {
    orientation: {
      vertical: 'pb-8 last:pb-0',
      horizontal: 'flex-shrink-0',
    },
    status: {
      default: '',
      completed: '[&>*]:text-green-600',
      current: '[&>*]:text-primary',
      pending: '[&>*]:text-muted-foreground',
      error: '[&>*]:text-destructive',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    status: 'default',
  },
});

/**
 * Timeline item dot variants
 */
const timelineDotVariants = cva(
  ['absolute rounded-full border-2 bg-background', 'flex items-center justify-center', 'z-10'],
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-6 w-6',
      },
      status: {
        default: 'border-border bg-background',
        completed: 'border-green-600 bg-green-600',
        current: 'border-primary bg-primary',
        pending: 'border-muted bg-muted',
        error: 'border-destructive bg-destructive',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'default',
    },
  }
);

/**
 * Timeline item data interface
 */
export interface TimelineItemData {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly timestamp?: string;
  readonly status?: 'default' | 'completed' | 'current' | 'pending' | 'error';
  readonly icon?: ReactNode;
  readonly metadata?: Record<string, unknown>;
}

/**
 * Timeline component props interface
 */
export interface TimelineProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  /** Timeline items data */
  readonly items: TimelineItemData[];
  /** Show connecting line between items */
  readonly showLine?: boolean;
  /** Timeline item size */
  readonly itemSize?: 'sm' | 'md' | 'lg';
  /** Norwegian compliance metadata */
  readonly norwegian?: {
    readonly classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    readonly dateFormat?: 'norwegian' | 'iso';
  };
}

/**
 * TimelineItem component props interface
 */
export interface TimelineItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {
  /** Timeline item data */
  readonly item: TimelineItemData;
  /** Show connecting line to next item */
  readonly showLine?: boolean;
  /** Item size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Position in timeline (first, middle, last) */
  readonly position?: 'first' | 'middle' | 'last';
}

/**
 * Format timestamp for Norwegian locale
 * @param timestamp - ISO timestamp or Norwegian date string
 * @param format - Date format preference
 * @returns Formatted date string
 */
function formatTimestamp(timestamp: string, format: 'norwegian' | 'iso' = 'norwegian'): string {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return timestamp;

    if (format === 'norwegian') {
      return date.toLocaleDateString('nb-NO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return date.toISOString().slice(0, 16).replace('T', ' ');
  } catch {
    return timestamp;
  }
}

/**
 * Timeline component - Pure presentational component
 * @param items - Array of timeline items
 * @param orientation - Timeline orientation (vertical or horizontal)
 * @param variant - Timeline spacing variant
 * @param showLine - Show connecting line between items
 * @param itemSize - Size of timeline item dots
 * @param norwegian - Norwegian compliance configuration
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns Timeline JSX element
 */
export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      items,
      orientation = 'vertical',
      variant = 'default',
      showLine = true,
      itemSize = 'md',
      norwegian,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ orientation, variant }), className)}
        role="list"
        aria-label="Timeline"
        {...props}
      >
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            orientation={orientation}
            status={item.status}
            showLine={showLine && index < items.length - 1}
            size={itemSize}
            position={index === 0 ? 'first' : index === items.length - 1 ? 'last' : 'middle'}
          />
        ))}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';

/**
 * TimelineItem component - Pure presentational component
 * @param item - Timeline item data
 * @param orientation - Timeline orientation
 * @param status - Item status
 * @param showLine - Show connecting line to next item
 * @param size - Item dot size
 * @param position - Item position in timeline
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns TimelineItem JSX element
 */
export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      item,
      orientation = 'vertical',
      status = 'default',
      showLine = false,
      size = 'md',
      position = 'middle',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const isVertical = orientation === 'vertical';

    return (
      <div
        ref={ref}
        className={cn(timelineItemVariants({ orientation, status }), className)}
        role="listitem"
        {...props}
      >
        {/* Timeline dot and line */}
        <div className="relative flex flex-col items-center">
          {/* Connecting line (before dot) */}
          {isVertical && position !== 'first' && (
            <div className="absolute -top-8 h-8 w-0.5 bg-border" />
          )}

          {/* Timeline dot */}
          <div className={cn(timelineDotVariants({ size, status: item.status || status }))}>
            {item.icon && <span className="text-xs">{item.icon}</span>}
          </div>

          {/* Connecting line (after dot) */}
          {isVertical && showLine && position !== 'last' && (
            <div className="absolute top-6 h-8 w-0.5 bg-border" />
          )}

          {/* Horizontal connecting line */}
          {!isVertical && showLine && position !== 'last' && (
            <div className="absolute left-6 top-1/2 h-0.5 w-8 bg-border -translate-y-1/2" />
          )}
        </div>

        {/* Content */}
        <div className={cn('flex-1', isVertical ? 'ml-6' : 'ml-4')}>
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">{item.title}</h4>

            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}

            {item.timestamp && (
              <time className="text-xs text-muted-foreground">
                {formatTimestamp(item.timestamp)}
              </time>
            )}

            {/* Status indicator */}
            {item.status && item.status !== 'default' && (
              <div
                className={cn(
                  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                  {
                    'bg-green-100 text-green-700': item.status === 'completed',
                    'bg-primary/10 text-primary': item.status === 'current',
                    'bg-muted text-muted-foreground': item.status === 'pending',
                    'bg-destructive/10 text-destructive': item.status === 'error',
                  }
                )}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';
