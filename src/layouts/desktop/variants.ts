/**
 * Desktop Layout Variants
 * Centralized variant definitions for desktop layout components
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Desktop header variants
 */
export const desktopHeaderVariants = cva(
  [
    'sticky top-0 z-50 w-full',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-b border-border',
    'h-20 px-8',
    'flex items-center',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        transparent: 'bg-transparent border-transparent',
        elevated: 'shadow-lg',
      },
      size: {
        sm: 'h-16 px-6',
        md: 'h-20 px-8',
        lg: 'h-24 px-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Desktop sidebar variants
 */
export const desktopSidebarVariants = cva(
  [
    'flex h-full flex-col',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-r border-border',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        transparent: 'bg-transparent border-transparent',
        elevated: 'shadow-lg',
      },
      size: {
        sm: 'w-48',
        md: 'w-56',
        lg: 'w-64',
      },
      collapsed: {
        true: 'w-16',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      collapsed: false,
    },
  }
);

/**
 * Desktop main content variants
 */
export const desktopMainContentVariants = cva(
  [
    'flex flex-1 flex-col',
    'bg-background',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        transparent: 'bg-transparent',
        elevated: 'shadow-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

/**
 * Desktop toolbar variants
 */
export const desktopToolbarVariants = cva(
  [
    'flex items-center gap-2',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-b border-border',
    'h-12 px-4',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        transparent: 'bg-transparent border-transparent',
        elevated: 'shadow-lg',
      },
      size: {
        sm: 'h-10 px-3',
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

/**
 * Desktop status bar variants
 */
export const desktopStatusBarVariants = cva(
  [
    'flex items-center justify-between',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-t border-border',
    'h-8 px-4',
    'text-xs text-muted-foreground',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        transparent: 'bg-transparent border-transparent',
        elevated: 'shadow-lg',
      },
      size: {
        sm: 'h-6 px-3',
        md: 'h-8 px-4',
        lg: 'h-10 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Export variant prop types
export type DesktopHeaderVariant = VariantProps<typeof desktopHeaderVariants>;
export type DesktopSidebarVariant = VariantProps<typeof desktopSidebarVariants>;
export type DesktopMainContentVariant = VariantProps<typeof desktopMainContentVariants>;
export type DesktopToolbarVariant = VariantProps<typeof desktopToolbarVariants>;
export type DesktopStatusBarVariant = VariantProps<typeof desktopStatusBarVariants>;
