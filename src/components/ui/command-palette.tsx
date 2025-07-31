/**
 * @fileoverview SSR-Safe Command Palette Component - Production Strategy Implementation
 * @description Command palette component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Command palette variant types
 */
export type CommandPaletteVariant = 'default' | 'center' | 'top';

/**
 * Command palette size types
 */
export type CommandPaletteSize = 'sm' | 'default' | 'lg' | 'xl';

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
export interface CommandPaletteProps extends HTMLAttributes<HTMLDivElement> {
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
  readonly variant?: CommandPaletteVariant;
  readonly size?: CommandPaletteSize;
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
  <svg viewBox="0 0 20 20" fill="currentColor" style={{ height: '16px', width: '16px' }}>
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
const KeyboardShortcut: React.FC<{ keys: string[] }> = ({ keys }): React.ReactElement => {
  const { colors, spacing, typography } = useTokens();
  
  return (
    <div style={{ 
      marginLeft: 'auto',
      display: 'flex',
      gap: spacing[1],
    }}>
      {keys.map((key, index) => (
        <kbd
          key={index}
          style={{
            pointerEvents: 'none',
            height: '20px',
            userSelect: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: spacing[1],
            borderRadius: '4px',
            backgroundColor: colors.neutral?.[100] || '#f3f4f6',
            padding: `0 ${spacing[1.5]}`,
            fontFamily: typography.fontFamily.mono?.join(', ') || 'ui-monospace, SFMono-Regular, Consolas, monospace',
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
          }}
        >
          {key}
        </kbd>
      ))}
    </div>
  );
};

/**
 * Enhanced Command Palette component
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
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    
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

    // Get border radius
    const borderRadius = {
      lg: (getToken('borderRadius.lg') as string) || '0.5rem',
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Get shadows
    const shadows = {
      lg: (getToken('shadows.lg') as string) || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    // Variant positioning styles
    const getVariantPositioning = (): React.CSSProperties => {
      switch (variant) {
        case 'center':
          return {
            alignItems: 'center',
            paddingTop: 0,
          };
        case 'top':
          return {
            paddingTop: '4rem',
          };
        default:
          return {
            paddingTop: '20vh',
          };
      }
    };

    // Size styles for dialog
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { maxWidth: '24rem' };
        case 'lg':
          return { maxWidth: '36rem' };
        case 'xl':
          return { maxWidth: '42rem' };
        default:
          return { maxWidth: '32rem' };
      }
    };

    // Overlay styles
    const overlayStyles: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: `${colors.background?.default || '#ffffff'}CC`, // 80% opacity
      backdropFilter: 'blur(4px)',
      ...getVariantPositioning(),
      ...style,
    };

    // Dialog styles
    const dialogStyles: React.CSSProperties = {
      width: '100%',
      backgroundColor: colors.background?.default || '#ffffff',
      borderRadius: borderRadius.lg,
      border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
      boxShadow: shadows.lg,
      ...getSizeStyles(),
    };

    // Input styles
    const inputStyles: React.CSSProperties = {
      display: 'flex',
      height: '48px',
      width: '100%',
      borderRadius: borderRadius.md,
      backgroundColor: 'transparent',
      padding: `${spacing[3]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      outline: 'none',
      border: 'none',
      borderBottom: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
    };

    // Command item styles
    const getItemStyles = (item: CommandItem, isSelected: boolean): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        alignItems: 'center',
        borderRadius: borderRadius.sm,
        padding: `${spacing[2]} ${spacing[3]}`,
        fontSize: typography.fontSize.sm,
        outline: 'none',
        transition: 'all 150ms ease-in-out',
        pointerEvents: item.disabled ? 'none' : 'auto',
        opacity: item.disabled ? 0.5 : 1,
      };

      if (isSelected) {
        switch (item.variant) {
          case 'destructive':
            return {
              ...baseStyles,
              backgroundColor: colors.danger?.[500] || '#ef4444',
              color: colors.background?.default || '#ffffff',
            };
          case 'success':
            return {
              ...baseStyles,
              backgroundColor: colors.success?.[500] || '#22c55e',
              color: colors.background?.default || '#ffffff',
            };
          default:
            return {
              ...baseStyles,
              backgroundColor: colors.accent?.default || colors.neutral?.[100] || '#f3f4f6',
              color: colors.accent?.foreground || colors.text?.primary || '#111827',
            };
        }
      }

      switch (item.variant) {
        case 'destructive':
          return {
            ...baseStyles,
            color: colors.danger?.[500] || '#ef4444',
          };
        case 'success':
          return {
            ...baseStyles,
            color: colors.success?.[500] || '#22c55e',
          };
        default:
          return {
            ...baseStyles,
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
      }
    };

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
        className={className}
        style={overlayStyles}
        data-state={isOpen ? 'open' : 'closed'}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Overlay */}
        <div 
          style={{ position: 'fixed', inset: 0 }} 
          onClick={handleOverlayClick} 
          aria-hidden="true" 
        />

        {/* Command dialog */}
        <div
          ref={ref}
          style={dialogStyles}
          data-state={isOpen ? 'open' : 'closed'}
          role="dialog"
          aria-modal="true"
          aria-label={texts.ariaLabel}
        >
          {/* Search input */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: `0 ${spacing[3]}`,
          }}>
            <SearchIcon />
            <input
              style={inputStyles}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={e => onSearchChange?.(e.target.value)}
              autoFocus
            />
          </div>

          {/* Results */}
          <div style={{
            maxHeight: '20rem',
            overflowY: 'auto',
            padding: spacing[2],
          }}>
            {totalResults === 0 ? (
              <div style={{
                paddingTop: spacing[6],
                paddingBottom: spacing[6],
                textAlign: 'center',
                fontSize: typography.fontSize.sm,
                color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
              }}>
                {noResultsMessage}
              </div>
            ) : (
              <>
                {/* Grouped items */}
                {hasGroups &&
                  filteredGroups.map(group => (
                    <div key={group.id} style={{ marginBottom: spacing[2] }}>
                      <div style={{
                        padding: `${spacing[1.5]} ${spacing[3]}`,
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.medium,
                        color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                      }}>
                        {group.label}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
                        {group.items.map(item => (
                          <div
                            key={item.id}
                            style={getItemStyles(item, false)}
                            data-selected={false}
                            data-disabled={item.disabled}
                            onClick={() => handleItemSelect(item)}
                            onMouseEnter={(e) => {
                              if (!item.disabled) {
                                const hoverStyles = getItemStyles(item, true);
                                e.currentTarget.style.backgroundColor = hoverStyles.backgroundColor || 'transparent';
                                e.currentTarget.style.color = hoverStyles.color || 'inherit';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!item.disabled) {
                                const normalStyles = getItemStyles(item, false);
                                e.currentTarget.style.backgroundColor = normalStyles.backgroundColor || 'transparent';
                                e.currentTarget.style.color = normalStyles.color || 'inherit';
                              }
                            }}
                          >
                            {item.icon && (
                              <span style={{
                                marginRight: spacing[2],
                                height: '16px',
                                width: '16px',
                                flexShrink: 0,
                              }}>{item.icon}</span>
                            )}
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: typography.fontWeight.medium }}>
                                {item.label}
                              </div>
                              {item.description && (
                                <div style={{
                                  fontSize: typography.fontSize.xs,
                                  color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                                }}>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
                    {filteredItems.map(item => (
                      <div
                        key={item.id}
                        style={getItemStyles(item, false)}
                        data-selected={false}
                        data-disabled={item.disabled}
                        onClick={() => handleItemSelect(item)}
                        onMouseEnter={(e) => {
                          if (!item.disabled) {
                            const hoverStyles = getItemStyles(item, true);
                            e.currentTarget.style.backgroundColor = hoverStyles.backgroundColor || 'transparent';
                            e.currentTarget.style.color = hoverStyles.color || 'inherit';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!item.disabled) {
                            const normalStyles = getItemStyles(item, false);
                            e.currentTarget.style.backgroundColor = normalStyles.backgroundColor || 'transparent';
                            e.currentTarget.style.color = normalStyles.color || 'inherit';
                          }
                        }}
                      >
                        {item.icon && (
                          <span style={{
                            marginRight: spacing[2],
                            height: '16px',
                            width: '16px',
                            flexShrink: 0,
                          }}>{item.icon}</span>
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: typography.fontWeight.medium }}>
                            {item.label}
                          </div>
                          {item.description && (
                            <div style={{
                              fontSize: typography.fontSize.xs,
                              color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                            }}>
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
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
            padding: `${spacing[2]} ${spacing[3]}`,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: typography.fontSize.xs,
              color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
            }}>
              <span>{texts.keyboardHint.pressText}</span>
              <kbd style={{
                margin: `0 ${spacing[1]}`,
                height: '20px',
                userSelect: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing[1],
                borderRadius: '4px',
                backgroundColor: colors.neutral?.[100] || '#f3f4f6',
                padding: `0 ${spacing[1.5]}`,
                fontFamily: typography.fontFamily.mono?.join(', ') || 'ui-monospace, SFMono-Regular, Consolas, monospace',
                fontWeight: typography.fontWeight.medium,
              }}>
                Enter
              </kbd>
              <span>{texts.keyboardHint.selectText}</span>
              <kbd style={{
                margin: `0 ${spacing[1]}`,
                height: '20px',
                userSelect: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing[1],
                borderRadius: '4px',
                backgroundColor: colors.neutral?.[100] || '#f3f4f6',
                padding: `0 ${spacing[1.5]}`,
                fontFamily: typography.fontFamily.mono?.join(', ') || 'ui-monospace, SFMono-Regular, Consolas, monospace',
                fontWeight: typography.fontWeight.medium,
              }}>
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