/**
 * @fileoverview SSR-Safe DropdownMenu Component - Production Strategy Implementation
 * @description Dropdown menu component using useTokens hook for action menus
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { Box, Text } from '../semantic';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  type DropdownProps,
  type DropdownContentProps,
  type DropdownItemProps
} from './dropdown';

/**
 * Dropdown menu item with icon interface
 */
export interface DropdownMenuItemData {
  readonly id: string;
  readonly label: string;
  readonly icon?: ReactNode;
  readonly shortcut?: string;
  readonly disabled?: boolean;
  readonly destructive?: boolean;
  readonly onSelect?: () => void;
  readonly items?: DropdownMenuItemData[]; // For nested menus
}

/**
 * Dropdown menu group interface
 */
export interface DropdownMenuGroup {
  readonly id: string;
  readonly label?: string;
  readonly items: DropdownMenuItemData[];
}

/**
 * Dropdown menu component props interface
 */
export interface DropdownMenuProps extends Omit<DropdownProps, 'children'> {
  readonly trigger: ReactNode;
  readonly items?: DropdownMenuItemData[];
  readonly groups?: DropdownMenuGroup[];
  readonly align?: DropdownContentProps['align'];
  readonly sideOffset?: number;
  readonly width?: string | number;
}

/**
 * Dropdown menu item component props interface
 */
export interface DropdownMenuItemProps extends Omit<DropdownItemProps, 'children'> {
  readonly icon?: ReactNode;
  readonly shortcut?: string;
  readonly destructive?: boolean;
  readonly children: ReactNode;
}

/**
 * Dropdown menu checkbox item component props interface
 */
export interface DropdownMenuCheckboxItemProps extends DropdownMenuItemProps {
  readonly checked?: boolean;
  readonly onCheckedChange?: (checked: boolean) => void;
}

/**
 * Dropdown menu radio group component props interface
 */
export interface DropdownMenuRadioGroupProps {
  readonly value?: string;
  readonly onValueChange?: (value: string) => void;
  readonly children: ReactNode;
}

/**
 * Dropdown menu radio item component props interface
 */
export interface DropdownMenuRadioItemProps extends DropdownMenuItemProps {
  readonly value: string;
}

/**
 * Dropdown menu sub trigger component props interface
 */
export interface DropdownMenuSubTriggerProps extends DropdownMenuItemProps {
  readonly children: ReactNode;
}

/**
 * Enhanced DropdownMenu component
 */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ trigger, items, groups, align = 'start', sideOffset = 4, width, ...dropdownProps }, ref): React.ReactElement => {
    const { spacing } = useTokens();

    const renderItems = (menuItems: DropdownMenuItemData[]): ReactNode[] => {
      return menuItems.map((item) => (
        <DropdownMenuItem
          key={item.id}
          icon={item.icon}
          shortcut={item.shortcut}
          disabled={item.disabled}
          destructive={item.destructive}
          onSelect={item.onSelect}
        >
          {item.label}
        </DropdownMenuItem>
      ));
    };

    const contentStyle: React.CSSProperties = width ? { width } : {};

    return (
      <Dropdown ref={ref} {...dropdownProps}>
        <DropdownTrigger>{trigger}</DropdownTrigger>
        <DropdownContent align={align} sideOffset={sideOffset} style={contentStyle}>
          {items && renderItems(items)}
          {groups && groups.map((group, index) => (
            <React.Fragment key={group.id}>
              {index > 0 && <DropdownSeparator />}
              {group.label && <DropdownLabel>{group.label}</DropdownLabel>}
              {renderItems(group.items)}
            </React.Fragment>
          ))}
        </DropdownContent>
      </Dropdown>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

/**
 * Enhanced DropdownMenuItem component with icon and shortcut support
 */
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ icon, shortcut, destructive = false, children, className, style, ...props }, ref): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();

    const itemStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing[2],
      ...(destructive && {
        color: colors.danger?.[500] || '#ef4444',
      }),
      ...style,
    };

    const contentStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      flex: 1,
    };

    const iconStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      flexShrink: 0,
    };

    const shortcutStyles: React.CSSProperties = {
      marginLeft: 'auto',
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    return (
      <DropdownItem
        ref={ref}
        className={className}
        style={itemStyles}
        {...props}
      >
        <Text as="span" style={contentStyles}>
          {icon && <Text as="span" style={iconStyles}>{icon}</Text>}
          <Text as="span">{children}</Text>
        </Text>
        {shortcut && <Text as="span" style={shortcutStyles}>{shortcut}</Text>}
      </DropdownItem>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

/**
 * Enhanced DropdownMenuCheckboxItem component
 */
export const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ checked = false, onCheckedChange, children, className, style, onSelect, ...props }, ref): React.ReactElement => {
    const { colors, spacing } = useTokens();

    const handleSelect = (event: Event): void => {
      onCheckedChange?.(!checked);
      onSelect?.(event);
    };

    const checkIconStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      marginRight: spacing[2],
    };

    const CheckIcon = (): React.ReactElement => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 8 7 11 12 5" />
      </svg>
    );

    return (
      <DropdownItem
        ref={ref}
        className={className}
        style={style}
        onSelect={handleSelect}
        role="menuitemcheckbox"
        aria-checked={checked}
        {...props}
      >
        <Text as="span" style={checkIconStyles}>
          {checked && <CheckIcon />}
        </Text>
        {children}
      </DropdownItem>
    );
  }
);

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

/**
 * Radio group context
 */
const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

/**
 * Enhanced DropdownMenuRadioGroup component
 */
export const DropdownMenuRadioGroup: React.FC<DropdownMenuRadioGroupProps> = ({ value, onValueChange, children }) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <Box role="group">{children}</Box>
    </RadioGroupContext.Provider>
  );
};

DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

/**
 * Enhanced DropdownMenuRadioItem component
 */
export const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ value, children, className, style, onSelect, ...props }, ref): React.ReactElement => {
    const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext);
    const { spacing } = useTokens();
    const isChecked = groupValue === value;

    const handleSelect = (event: Event): void => {
      onValueChange?.(value);
      onSelect?.(event);
    };

    const radioIconStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      marginRight: spacing[2],
    };

    const RadioIcon = (): React.ReactElement => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        {isChecked && <circle cx="8" cy="8" r="3" fill="currentColor" />}
      </svg>
    );

    return (
      <DropdownItem
        ref={ref}
        className={className}
        style={style}
        onSelect={handleSelect}
        role="menuitemradio"
        aria-checked={isChecked}
        {...props}
      >
        <Text as="span" style={radioIconStyles}>
          <RadioIcon />
        </Text>
        {children}
      </DropdownItem>
    );
  }
);

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

/**
 * Enhanced DropdownMenuSubTrigger component for nested menus
 */
export const DropdownMenuSubTrigger = forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  ({ children, className, style, ...props }, ref): React.ReactElement => {
    const { colors, spacing } = useTokens();

    const chevronStyles: React.CSSProperties = {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
    };

    const ChevronRightIcon = (): React.ReactElement => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 4 10 8 6 12" />
      </svg>
    );

    return (
      <DropdownMenuItem
        ref={ref}
        className={className}
        style={style}
        closeOnSelect={false}
        {...props}
      >
        {children}
        <Text as="span" style={chevronStyles}>
          <ChevronRightIcon />
        </Text>
      </DropdownMenuItem>
    );
  }
);

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

// Export all dropdown menu components for compound component pattern
export { DropdownLabel as DropdownMenuLabel, DropdownSeparator as DropdownMenuSeparator } from './dropdown';