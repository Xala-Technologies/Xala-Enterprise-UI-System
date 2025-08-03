/**
 * @fileoverview Table Component v5.0.0 - CVA Pattern Implementation
 * @description Modern Table component using CVA patterns with semantic Tailwind classes
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, CVA-based
 */

import React, { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Box } from '../semantic';

// =============================================================================
// TABLE VARIANTS USING CVA PATTERN
// =============================================================================

const tableVariants = cva(
  'w-full caption-bottom text-sm border-collapse',
  {
    variants: {
      variant: {
        default: 'border-separate border-spacing-0',
        bordered: 'border border-border rounded-lg overflow-hidden',
        minimal: 'border-0',
      },
      striped: {
        true: '[&_tbody_tr:nth-child(odd)]:bg-muted/50',
        false: '',
      },
      hover: {
        true: '[&_tbody_tr:hover]:bg-muted/50',
        false: '',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      striped: false,
      hover: false,
      size: 'md',
    },
  }
);

const tableHeaderVariants = cva(
  'border-b bg-muted/50 font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      variant: {
        default: 'border-b border-border',
        bordered: 'border-b border-border bg-muted/30',
        minimal: 'border-b border-border/50 bg-transparent',
      },
      size: {
        sm: 'h-10',
        md: 'h-12',
        lg: 'h-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const tableBodyVariants = cva(
  '[&_tr:last-child]:border-0',
  {
    variants: {
      variant: {
        default: '',
        bordered: '',
        minimal: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tableRowVariants = cva(
  'border-b transition-colors data-[state=selected]:bg-muted',
  {
    variants: {
      variant: {
        default: 'border-b border-border',
        bordered: 'border-b border-border',
        minimal: 'border-b border-border/30',
      },
      size: {
        sm: 'h-10',
        md: 'h-12',
        lg: 'h-16',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const tableCellVariants = cva(
  'p-4 align-middle [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      variant: {
        default: '',
        bordered: '',
        minimal: '',
      },
      size: {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const tableHeadVariants = cva(
  'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      variant: {
        default: '',
        bordered: '',
        minimal: '',
      },
      size: {
        sm: 'h-10 px-2',
        md: 'h-12 px-4',
        lg: 'h-14 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const tableCaptionVariants = cva(
  'mt-4 text-sm text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// =============================================================================
// TYPES
// =============================================================================

export interface TableProps
  extends HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableHeaderVariants> {}

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableBodyVariants> {}

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

export interface TableHeadProps
  extends ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadVariants> {}

export interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants> {}

export interface TableCaptionProps
  extends HTMLAttributes<HTMLTableCaptionElement>,
    VariantProps<typeof tableCaptionVariants> {}

// =============================================================================
// COMPONENTS
// =============================================================================

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, striped, hover, size, ...props }, ref) => (
    <Box className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ variant, striped, hover, size }), className)}
        {...props}
      />
    </Box>
  )
);
Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, variant, size, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants({ variant, size }), className)}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, variant, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(tableBodyVariants({ variant }), className)}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, size, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ variant, size }), className)}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, variant, size, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableHeadVariants({ variant, size }), className)}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, variant, size, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ variant, size }), className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, size, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn(tableCaptionVariants({ size }), className)}
      {...props}
    />
  )
);
TableCaption.displayName = 'TableCaption';

// =============================================================================
// EXPORTS
// =============================================================================

// Export CVA variants for external use
export {
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
  tableCaptionVariants,
};

export default Table;