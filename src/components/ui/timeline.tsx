/**
 * @fileoverview SSR-Safe Timeline Components - Production Strategy Implementation
 * @description Timeline components using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Norwegian Enterprise Standards
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';

/**
 * Timeline orientation types
 */
export type TimelineOrientation = 'vertical' | 'horizontal';

/**
 * Timeline variant types
 */
export type TimelineVariant = 'default' | 'compact' | 'spacious';

/**
 * Timeline status types
 */
export type TimelineStatus = 'default' | 'completed' | 'current' | 'pending' | 'error';

/**
 * Timeline size types
 */
export type TimelineSize = 'sm' | 'md' | 'lg';

/**
 * Timeline item data interface
 */
export interface TimelineItemData {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly timestamp?: string;
  readonly status?: TimelineStatus;
  readonly icon?: ReactNode;
  readonly metadata?: Record<string, unknown>;
}

/**
 * Timeline component props interface
 */
export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  /** Timeline items data */
  readonly items: TimelineItemData[];
  /** Show connecting line between items */
  readonly showLine?: boolean;
  /** Timeline item size */
  readonly itemSize?: TimelineSize;
  /** Timeline orientation */
  readonly orientation?: TimelineOrientation;
  /** Timeline variant */
  readonly variant?: TimelineVariant;
  /** Norwegian compliance metadata */
  readonly norwegian?: {
    readonly classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    readonly dateFormat?: 'norwegian' | 'iso';
  };
}

/**
 * TimelineItem component props interface
 */
export interface TimelineItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Timeline item data */
  readonly item: TimelineItemData;
  /** Show connecting line to next item */
  readonly showLine?: boolean;
  /** Item size */
  readonly size?: TimelineSize;
  /** Timeline orientation */
  readonly orientation?: TimelineOrientation;
  /** Item status */
  readonly status?: TimelineStatus;
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
 * Enhanced Timeline component with token-based styling
 */
export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      items,
      orientation = 'vertical',
      variant = 'default',
      showLine = true,
      itemSize = 'md',
      norwegian: _norwegian,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    
    // Container styles
    const getContainerStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        position: 'relative',
      };

      if (orientation === 'horizontal') {
        return {
          ...baseStyles,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing[4],
          overflowX: 'auto',
        };
      }

      // Vertical orientation
      const verticalStyles: React.CSSProperties = {
        ...baseStyles,
        display: 'flex',
        flexDirection: 'column',
      };

      switch (variant) {
        case 'compact':
          return { ...verticalStyles, gap: spacing[2] };
        case 'spacious':
          return { ...verticalStyles, gap: spacing[6] };
        default:
          return { ...verticalStyles, gap: spacing[4] };
      }
    };

    return (
      <Box
        ref={ref}
        className={className}
       
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
      </Box>
    );
  }
);

Timeline.displayName = 'Timeline';

/**
 * Enhanced TimelineItem component with token-based styling
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
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
        const isVertical = orientation === 'vertical';
    const itemStatus = item.status || status;

    // Get border radius
    const borderRadius = {
      full: (getToken('borderRadius.full') as string) || '9999px',
    };

    // Item container styles
    const itemStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      paddingBottom: isVertical && position !== 'last' ? spacing[8] : 0,
      flexShrink: orientation === 'horizontal' ? 0 : undefined,
      ...style,
    };

    // Dot container styles
    const dotContainerStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };

    // Dot size styles
    const getDotSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { height: '12px', width: '12px' };
        case 'lg':
          return { height: '24px', width: '24px' };
        default: // md
          return { height: '16px', width: '16px' };
      }
    };

    // Dot status styles
    const getDotStatusStyles = (): React.CSSProperties => {
      switch (itemStatus) {
        case 'completed':
          return {
            borderColor: colors.success?.[600] || '#16a34a',
            backgroundColor: colors.success?.[600] || '#16a34a',
            color: colors.background?.default || '#ffffff',
          };
        case 'current':
          return {
            borderColor: colors.primary?.[500] || '#3b82f6',
            backgroundColor: colors.primary?.[500] || '#3b82f6',
            color: colors.background?.default || '#ffffff',
          };
        case 'pending':
          return {
            borderColor: colors.neutral?.[300] || '#d1d5db',
            backgroundColor: colors.neutral?.[100] || '#f3f4f6',
            color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
          };
        case 'error':
          return {
            borderColor: colors.danger?.[500] || '#ef4444',
            backgroundColor: colors.danger?.[500] || '#ef4444',
            color: colors.background?.default || '#ffffff',
          };
        default:
          return {
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
            backgroundColor: colors.background?.default || '#ffffff',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
      }
    };

    const dotSizeStyles = getDotSizeStyles();
    const dotStatusStyles = getDotStatusStyles();

    // Timeline dot styles
    const dotStyles: React.CSSProperties = {
      position: 'absolute',
      borderRadius: borderRadius.full,
      border: '2px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      ...dotSizeStyles,
      ...dotStatusStyles,
    };

    // Connecting line styles
    const lineStyles: React.CSSProperties = {
      backgroundColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
    };

    // Content styles
    const contentStyles: React.CSSProperties = {
      flex: 1,
      marginLeft: isVertical ? spacing[6] : spacing[4],
    };

    // Content container styles
    const contentContainerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
    };

    // Title styles
    const titleStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    };

    // Description styles
    const descriptionStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    // Timestamp styles
    const timestampStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    // Status badge styles
    const getStatusBadgeStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: borderRadius.full,
        paddingLeft: spacing[2],
        paddingRight: spacing[2],
        paddingTop: spacing[1],
        paddingBottom: spacing[1],
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
      };

      switch (itemStatus) {
        case 'completed':
          return {
            ...baseStyles,
            backgroundColor: `${colors.success?.[500] || '#22c55e'}1A`, // 10% opacity
            color: colors.success?.[700] || '#15803d',
          };
        case 'current':
          return {
            ...baseStyles,
            backgroundColor: `${colors.primary?.[500] || '#3b82f6'}1A`, // 10% opacity
            color: colors.primary?.[600] || '#2563eb',
          };
        case 'pending':
          return {
            ...baseStyles,
            backgroundColor: colors.neutral?.[100] || '#f3f4f6',
            color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
          };
        case 'error':
          return {
            ...baseStyles,
            backgroundColor: `${colors.danger?.[500] || '#ef4444'}1A`, // 10% opacity
            color: colors.danger?.[600] || '#dc2626',
          };
        default:
          return baseStyles;
      }
    };

    return (
      <Box
        ref={ref}
        className={className}
       
        role="listitem"
        {...props}
      >
        {/* Timeline dot and line */}
        <Box>
          {/* Connecting line (before dot) */}
          {isVertical && position !== 'first' && (
            <Box 
             
            />
          )}

          {/* Timeline dot */}
          <Box>
            {item.icon && (
              <Text as="span">
                {item.icon}
              </Text>
            )}
          </Box>

          {/* Connecting line (after dot) */}
          {isVertical && showLine && position !== 'last' && (
            <Box 
             
            />
          )}

          {/* Horizontal connecting line */}
          {!isVertical && showLine && position !== 'last' && (
            <Box 
             
            />
          )}
        </Box>

        {/* Content */}
        <Box>
          <Box>
            <Heading level={4}>{item.title}</Heading>

            {item.description && (
              <Text>{item.description}</Text>
            )}

            {item.timestamp && (
              <time>
                {formatTimestamp(item.timestamp)}
              </time>
            )}

            {/* Status indicator */}
            {itemStatus && itemStatus !== 'default' && (
              <Box>
                {itemStatus.charAt(0).toUpperCase() + itemStatus.slice(1)}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';
