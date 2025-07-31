/**
 * @fileoverview useKeyboardShortcuts Hook v5.0.0 - Token-Based Design System
 * @description Hook for handling keyboard shortcuts on desktop platforms
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { useEffect, useCallback, useRef } from 'react';
import { usePlatform } from '../hooks';

export interface KeyboardShortcut {
  /** Unique identifier */
  id: string;
  /** Key combination (e.g., 'cmd+k', 'ctrl+shift+p') */
  keys: string;
  /** Handler function */
  handler: (event: KeyboardEvent) => void;
  /** Description for UI display */
  description?: string;
  /** Category for grouping */
  category?: string;
  /** Enabled state */
  enabled?: boolean;
  /** Prevent default behavior */
  preventDefault?: boolean;
  /** Stop propagation */
  stopPropagation?: boolean;
  /** Scope (global or specific component) */
  scope?: 'global' | 'local';
}

export interface UseKeyboardShortcutsOptions {
  /** Enable shortcuts */
  enabled?: boolean;
  /** Target element (defaults to document) */
  target?: HTMLElement | null;
  /** Ignore shortcuts in input elements */
  ignoreInputs?: boolean;
  /** Debug mode */
  debug?: boolean;
}

export interface UseKeyboardShortcutsReturn {
  /** Register a shortcut */
  register: (shortcut: KeyboardShortcut) => void;
  /** Unregister a shortcut */
  unregister: (id: string) => void;
  /** Unregister all shortcuts */
  unregisterAll: () => void;
  /** Get all registered shortcuts */
  getShortcuts: () => KeyboardShortcut[];
  /** Check if a shortcut is registered */
  isRegistered: (id: string) => boolean;
  /** Enable/disable a shortcut */
  setEnabled: (id: string, enabled: boolean) => void;
}

/**
 * Parse key combination string into normalized format
 */
const parseKeys = (keys: string): string[] => {
  return keys
    .toLowerCase()
    .split('+')
    .map(key => key.trim())
    .map(key => {
      // Normalize key names
      switch (key) {
        case 'cmd':
        case 'command':
        case 'meta':
          return 'meta';
        case 'ctrl':
        case 'control':
          return 'ctrl';
        case 'alt':
        case 'option':
          return 'alt';
        case 'shift':
          return 'shift';
        case 'esc':
        case 'escape':
          return 'escape';
        case 'space':
        case 'spacebar':
          return ' ';
        case 'enter':
        case 'return':
          return 'enter';
        case 'del':
        case 'delete':
          return 'delete';
        case 'backspace':
          return 'backspace';
        case 'tab':
          return 'tab';
        case 'up':
          return 'arrowup';
        case 'down':
          return 'arrowdown';
        case 'left':
          return 'arrowleft';
        case 'right':
          return 'arrowright';
        default:
          return key;
      }
    })
    .sort();
};

/**
 * Check if keyboard event matches shortcut
 */
const matchesShortcut = (event: KeyboardEvent, keys: string[]): boolean => {
  const pressedKeys: string[] = [];

  if (event.metaKey) pressedKeys.push('meta');
  if (event.ctrlKey) pressedKeys.push('ctrl');
  if (event.altKey) pressedKeys.push('alt');
  if (event.shiftKey) pressedKeys.push('shift');

  const key = event.key.toLowerCase();
  if (!['meta', 'ctrl', 'alt', 'shift'].includes(key)) {
    pressedKeys.push(key);
  }

  pressedKeys.sort();

  return (
    pressedKeys.length === keys.length &&
    pressedKeys.every((key, index) => key === keys[index])
  );
};

/**
 * Hook for managing keyboard shortcuts
 */
export const useKeyboardShortcuts = (
  options: UseKeyboardShortcutsOptions = {}
): UseKeyboardShortcutsReturn => {
  const {
    enabled = true,
    target,
    ignoreInputs = true,
    debug = false,
  } = options;

  const { platform } = usePlatform();
  const shortcutsRef = useRef<Map<string, KeyboardShortcut>>(new Map());

  // Handle keyboard event
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Ignore if in input element
    if (ignoreInputs) {
      const target = event.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        target.contentEditable === 'true'
      ) {
        return;
      }
    }

    // Check each shortcut
    shortcutsRef.current.forEach((shortcut) => {
      if (!shortcut.enabled) return;

      const keys = parseKeys(shortcut.keys);
      if (matchesShortcut(event, keys)) {
        if (debug) {
          // console.log(`Keyboard shortcut triggered: ${shortcut.id} (${shortcut.keys})`);
        }

        if (shortcut.preventDefault) {
          event.preventDefault();
        }

        if (shortcut.stopPropagation) {
          event.stopPropagation();
        }

        shortcut.handler(event);
      }
    });
  }, [enabled, ignoreInputs, debug]);

  // Attach event listeners
  useEffect(() => {
    // Only enable on desktop platforms
    if (platform !== 'desktop' && platform !== 'web') return;

    const targetElement = target || document;
    targetElement.addEventListener('keydown', handleKeyDown as any);

    return () => {
      targetElement.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [platform, target, handleKeyDown]);

  // Register shortcut
  const register = useCallback((shortcut: KeyboardShortcut) => {
    shortcutsRef.current.set(shortcut.id, {
      ...shortcut,
      enabled: shortcut.enabled !== false,
      preventDefault: shortcut.preventDefault !== false,
      stopPropagation: shortcut.stopPropagation !== false,
      scope: shortcut.scope || 'local',
    });

    if (debug) {
      // console.log(`Registered keyboard shortcut: ${shortcut.id} (${shortcut.keys})`);
    }
  }, [debug]);

  // Unregister shortcut
  const unregister = useCallback((id: string) => {
    shortcutsRef.current.delete(id);

    if (debug) {
      // console.log(`Unregistered keyboard shortcut: ${id}`);
    }
  }, [debug]);

  // Unregister all shortcuts
  const unregisterAll = useCallback(() => {
    shortcutsRef.current.clear();

    if (debug) {
      // console.log('Unregistered all keyboard shortcuts');
    }
  }, [debug]);

  // Get all shortcuts
  const getShortcuts = useCallback((): KeyboardShortcut[] => {
    return Array.from(shortcutsRef.current.values());
  }, []);

  // Check if registered
  const isRegistered = useCallback((id: string): boolean => {
    return shortcutsRef.current.has(id);
  }, []);

  // Enable/disable shortcut
  const setEnabled = useCallback((id: string, enabled: boolean) => {
    const shortcut = shortcutsRef.current.get(id);
    if (shortcut) {
      shortcut.enabled = enabled;
      shortcutsRef.current.set(id, shortcut);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unregisterAll();
    };
  }, [unregisterAll]);

  return {
    register,
    unregister,
    unregisterAll,
    getShortcuts,
    isRegistered,
    setEnabled,
  };
};

/**
 * Common keyboard shortcuts
 */
export const commonShortcuts = {
  // Application
  search: 'cmd+k,ctrl+k',
  commandPalette: 'cmd+shift+p,ctrl+shift+p',
  quickOpen: 'cmd+p,ctrl+p',
  
  // Navigation
  back: 'alt+left',
  forward: 'alt+right',
  home: 'cmd+shift+h,ctrl+shift+h',
  
  // Editing
  save: 'cmd+s,ctrl+s',
  undo: 'cmd+z,ctrl+z',
  redo: 'cmd+shift+z,ctrl+shift+z',
  cut: 'cmd+x,ctrl+x',
  copy: 'cmd+c,ctrl+c',
  paste: 'cmd+v,ctrl+v',
  selectAll: 'cmd+a,ctrl+a',
  
  // View
  zoomIn: 'cmd+plus,ctrl+plus',
  zoomOut: 'cmd+minus,ctrl+minus',
  zoomReset: 'cmd+0,ctrl+0',
  fullscreen: 'f11',
  
  // Window
  newWindow: 'cmd+n,ctrl+n',
  closeWindow: 'cmd+w,ctrl+w',
  minimizeWindow: 'cmd+m,ctrl+m',
};

/**
 * Keyboard shortcut display component
 */
export interface KeyboardShortcutDisplayProps {
  /** Shortcut keys */
  keys: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
}

export const KeyboardShortcutDisplay: React.FC<KeyboardShortcutDisplayProps> = ({
  keys,
  size = 'md',
  className,
}) => {
  const { platform } = usePlatform();
  
  // Replace cmd with ⌘ on Mac
  const displayKeys = keys.replace(/cmd/gi, platform === 'desktop' ? '⌘' : 'Ctrl');
  
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <kbd
      className={cn(
        'inline-flex items-center gap-1',
        'font-mono font-medium',
        'bg-muted text-muted-foreground',
        'border border-border rounded',
        sizeClasses[size],
        className
      )}
    >
      {displayKeys.split('+').map((key, index) => (
        <span key={index}>
          {index > 0 && <span className="opacity-50">+</span>}
          {key}
        </span>
      ))}
    </kbd>
  );
};

// Utility function for class names (temporary until we have proper import)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}