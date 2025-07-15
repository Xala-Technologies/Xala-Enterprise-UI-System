/**
 * Command Palette component with enterprise compliance
 * Search and shortcuts interface using semantic design tokens
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Command palette text configuration interface
 */
export interface CommandPaletteTexts {
  readonly searchPlaceholder: string;
  readonly emptyMessage: string;
  readonly ariaLabel: string;
  readonly keyboardHint: {
    readonly pressText: string;
    readonly selectText: string;
    readonly closeText: string;
  };
}

/**
 * Default text configuration for command palette
 */
const defaultTexts: CommandPaletteTexts = {
  searchPlaceholder: 'Search commands...',
  emptyMessage: 'No results found.',
  ariaLabel: 'Command palette',
  keyboardHint: {
    pressText: 'Press',
    selectText: 'to select,',
    closeText: 'to close',
  },
};

/**
 * Command palette variants using semantic design tokens
 */
const commandPaletteVariants = cva(
  [
    'fixed inset-0 z-50 flex items-start justify-center',
    'bg-background/80 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ],
  {
    variants: {
      variant: {
        default: 'pt-[20vh]',
        center: 'items-center pt-0',
        top: 'pt-16',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Command dialog variants using semantic design tokens
 */
const commandDialogVariants = cva(
  [
    'w-full max-w-lg bg-background rounded-lg border border-border shadow-lg',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-xl',
        xl: 'max-w-2xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Command input variants using semantic design tokens
 */
const commandInputVariants = cva(
  [
    'flex h-12 w-full rounded-md bg-transparent px-3 py-3 text-sm',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-b border-border',
        ghost: 'border-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Command item variants using semantic design tokens
 */
const commandItemVariants = cva(
  [
    'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2',
    'text-sm outline-none transition-colors',
    'data-[selected]:bg-accent data-[selected]:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: '',
        destructive:
          'text-destructive data-[selected]:bg-destructive data-[selected]:text-destructive-foreground',
        success: 'text-success data-[selected]:bg-success data-[selected]:text-success-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Command item interface
 */
export interface CommandItem {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly icon?: ReactNode;
  readonly shortcut?: string[];
  readonly onSelect?: () => void;
  readonly disabled?: boolean;
  readonly variant?: 'default' | 'destructive' | 'success';
  readonly group?: string;
}

/**
 * Command group interface
 */
export interface CommandGroup {
  readonly id: string;
  readonly label: string;
  readonly items: CommandItem[];
}

/**
 * Command palette component props interface
 */
export interface CommandPaletteProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandPaletteVariants> {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
  readonly searchValue?: string;
  readonly onSearchChange?: (value: string) => void;
  readonly items?: CommandItem[];
  readonly groups?: CommandGroup[];
  readonly placeholder?: string;
  readonly emptyMessage?: string;
  readonly maxResults?: number;
  readonly showShortcuts?: boolean;
  readonly size?: 'sm' | 'default' | 'lg' | 'xl';
  readonly texts?: Partial<CommandPaletteTexts>;
}

/**
 * Filter items based on search - pure function
 */
const filterItems = (
  items: CommandItem[],
  searchValue: string,
  maxResults: number
): CommandItem[] => {
  if (!searchValue.trim()) return items.slice(0, maxResults);

  const searchLower = searchValue.toLowerCase();
  return items
    .filter(
      item =>
        item.label.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
    )
    .slice(0, maxResults);
};

/**
 * Filter groups based on search - pure function
 */
const filterGroups = (
  groups: CommandGroup[],
  searchValue: string,
  maxResults: number
): CommandGroup[] => {
  if (!searchValue.trim()) {
    return groups.map(group => ({
      ...group,
      items: group.items.slice(0, Math.floor(maxResults / groups.length)),
    }));
  }

  const searchLower = searchValue.toLowerCase();
  return groups
    .map(group => ({
      ...group,
      items: group.items.filter(
        item =>
          item.label.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
      ),
    }))
    .filter(group => group.items.length > 0)
    .map(group => ({
      ...group,
      items: group.items.slice(0, Math.floor(maxResults / groups.length)),
    }));
};

/**
 * Search icon component
 */
const SearchIcon = (): React.ReactElement => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Keyboard shortcut component
 */
const KeyboardShortcut: React.FC<{ keys: string[] }> = ({ keys }): React.ReactElement => (
  <div className="ml-auto flex gap-1">
    {keys.map((key, index) => (
      <kbd
        key={index}
        className="pointer-events-none h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground"
      >
        {key}
      </kbd>
    ))}
  </div>
);

/**
 * Enhanced Command Palette component
 * @param isOpen - Whether palette is open
 * @param onClose - Close handler
 * @param searchValue - Current search value
 * @param onSearchChange - Search change handler
 * @param items - Flat list of command items
 * @param groups - Grouped command items
 * @param placeholder - Search input placeholder (deprecated, use texts.searchPlaceholder)
 * @param emptyMessage - Message when no results (deprecated, use texts.emptyMessage)
 * @param maxResults - Maximum results to show
 * @param showShortcuts - Show keyboard shortcuts
 * @param variant - Palette positioning variant
 * @param size - Dialog size
 * @param texts - Text configuration for localization
 * @param className - Additional CSS classes
 * @returns Enhanced Command Palette JSX element
 */
export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      isOpen = false,
      onClose,
      searchValue = '',
      onSearchChange,
      items = [],
      groups = [],
      placeholder,
      emptyMessage,
      maxResults = 10,
      showShortcuts = true,
      variant = 'default',
      size = 'default',
      texts: userTexts,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Merge default texts with user provided texts
    const texts: CommandPaletteTexts = {
      ...defaultTexts,
      ...userTexts,
      keyboardHint: {
        ...defaultTexts.keyboardHint,
        ...userTexts?.keyboardHint,
      },
    };

    // Support legacy props with new text system as fallback
    const searchPlaceholder = placeholder ?? texts.searchPlaceholder;
    const noResultsMessage = emptyMessage ?? texts.emptyMessage;

    const hasGroups = groups.length > 0;
    const hasItems = items.length > 0;

    const filteredItems = hasItems ? filterItems(items, searchValue, maxResults) : [];
    const filteredGroups = hasGroups ? filterGroups(groups, searchValue, maxResults) : [];

    const totalResults = hasGroups
      ? filteredGroups.reduce((acc, group) => acc + group.items.length, 0)
      : filteredItems.length;

    const handleOverlayClick = (): void => {
      if (onClose) {
        onClose();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent): void => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    const handleItemSelect = (item: CommandItem): void => {
      if (!item.disabled && item.onSelect) {
        item.onSelect();
        onClose?.();
      }
    };

    if (!isOpen) {
      return <></>;
    }

    return (
      <div
        className={cn(commandPaletteVariants({ variant }), className)}
        data-state={isOpen ? 'open' : 'closed'}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Overlay */}
        <div className="fixed inset-0" onClick={handleOverlayClick} aria-hidden="true" />

        {/* Command dialog */}
        <div
          ref={ref}
          className={cn(commandDialogVariants({ size }))}
          data-state={isOpen ? 'open' : 'closed'}
          role="dialog"
          aria-modal="true"
          aria-label={texts.ariaLabel}
        >
          {/* Search input */}
          <div className="flex items-center px-3">
            <SearchIcon />
            <input
              className={cn(commandInputVariants({ variant: 'ghost' }))}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={e => onSearchChange?.(e.target.value)}
              autoFocus
            />
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {totalResults === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {noResultsMessage}
              </div>
            ) : (
              <>
                {/* Grouped items */}
                {hasGroups &&
                  filteredGroups.map(group => (
                    <div key={group.id} className="mb-2">
                      <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        {group.label}
                      </div>
                      <div className="space-y-1">
                        {group.items.map(item => (
                          <div
                            key={item.id}
                            className={cn(commandItemVariants({ variant: item.variant }))}
                            data-selected={false}
                            data-disabled={item.disabled}
                            onClick={() => handleItemSelect(item)}
                          >
                            {item.icon && (
                              <span className="mr-2 h-4 w-4 flex-shrink-0">{item.icon}</span>
                            )}
                            <div className="flex-1">
                              <div className="font-medium">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-muted-foreground">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {showShortcuts && item.shortcut && (
                              <KeyboardShortcut keys={item.shortcut} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                {/* Flat items */}
                {hasItems && !hasGroups && (
                  <div className="space-y-1">
                    {filteredItems.map(item => (
                      <div
                        key={item.id}
                        className={cn(commandItemVariants({ variant: item.variant }))}
                        data-selected={false}
                        data-disabled={item.disabled}
                        onClick={() => handleItemSelect(item)}
                      >
                        {item.icon && (
                          <span className="mr-2 h-4 w-4 flex-shrink-0">{item.icon}</span>
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{item.label}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          )}
                        </div>
                        {showShortcuts && item.shortcut && (
                          <KeyboardShortcut keys={item.shortcut} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-3 py-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{texts.keyboardHint.pressText}</span>
              <kbd className="mx-1 h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono font-medium">
                Enter
              </kbd>
              <span>{texts.keyboardHint.selectText}</span>
              <kbd className="mx-1 h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono font-medium">
                Esc
              </kbd>
              <span>{texts.keyboardHint.closeText}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CommandPalette.displayName = 'CommandPalette';

/**
 * Command palette variants type exports
 */
export type CommandPaletteVariant = VariantProps<typeof commandPaletteVariants>['variant'];
export type CommandPaletteSize = VariantProps<typeof commandDialogVariants>['size'];
