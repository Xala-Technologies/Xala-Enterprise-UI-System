/**
 * Token Migration Definitions
 * Pre-defined migrations for common token system changes
 */

import type { TokenMigration } from './token-versioning';
import type { TokenSystem, ColorTokens } from '../types';
import { get, set } from '../../utils/object';

/**
 * Migration: 1.0.0 -> 2.0.0
 * Breaking change: Restructure color tokens
 */
const migration_1_0_0_to_2_0_0: TokenMigration = {
  fromVersion: '1.0.0',
  toVersion: '2.0.0',
  description: 'Restructure color tokens to use semantic naming',
  breaking: true,
  
  migrate: (tokens: TokenSystem) => {
    const newTokens = { ...tokens };
    
    // Migrate old color structure to new semantic structure
    if (tokens.colors) {
      const oldColors = tokens.colors as any;
      
      // Map old color names to semantic names
      const colorMapping = {
        blue: 'primary',
        green: 'success',
        red: 'danger',
        yellow: 'warning',
        gray: 'neutral',
      };
      
      newTokens.colors = {
        primary: {} as any,
        neutral: {} as any,
      } as ColorTokens;
      
      for (const [oldName, newName] of Object.entries(colorMapping)) {
        if (oldColors[oldName]) {
          (newTokens.colors as any)[newName] = oldColors[oldName];
        }
      }
      
      // Preserve any unmapped colors
      for (const [name, value] of Object.entries(oldColors)) {
        if (!colorMapping[name as keyof typeof colorMapping]) {
          (newTokens.colors as any)[name] = value;
        }
      }
    }
    
    return newTokens;
  },
  
  rollback: (tokens: TokenSystem) => {
    const oldTokens = { ...tokens };
    
    // Reverse the color mapping
    if (tokens.colors) {
      const newColors = tokens.colors as any;
      
      const reverseMapping = {
        primary: 'blue',
        success: 'green',
        danger: 'red',
        warning: 'yellow',
        neutral: 'gray',
      };
      
      oldTokens.colors = {
        primary: {} as any,
        neutral: {} as any,
      } as ColorTokens;
      
      for (const [newName, oldName] of Object.entries(reverseMapping)) {
        if (newColors[newName]) {
          (oldTokens.colors as any)[oldName] = newColors[newName];
        }
      }
      
      // Preserve any unmapped colors
      for (const [name, value] of Object.entries(newColors)) {
        if (!reverseMapping[name as keyof typeof reverseMapping]) {
          (oldTokens.colors as any)[name] = value;
        }
      }
    }
    
    return oldTokens;
  },
};

/**
 * Migration: 2.0.0 -> 2.1.0
 * Non-breaking: Add accessibility tokens
 */
const migration_2_0_0_to_2_1_0: TokenMigration = {
  fromVersion: '2.0.0',
  toVersion: '2.1.0',
  description: 'Add accessibility tokens for WCAG compliance',
  breaking: false,
  
  migrate: (tokens: TokenSystem) => {
    const newTokens = { ...tokens };
    
    // Add default accessibility tokens if not present
    if (!newTokens.accessibility) {
      newTokens.accessibility = {
        wcagLevel: 'AA',
        focusRingWidth: '2px',
        focusRingOffset: '2px',
        focusRingColor: tokens.colors?.primary?.[500] || '#0066cc',
        minimumTouchTarget: '44px',
        contrastRatios: {
          normal: 4.5,
          large: 3,
          nonText: 3,
        },
      };
    }
    
    return newTokens;
  },
};

/**
 * Migration: 2.1.0 -> 3.0.0
 * Breaking: Change spacing scale
 */
const migration_2_1_0_to_3_0_0: TokenMigration = {
  fromVersion: '2.1.0',
  toVersion: '3.0.0',
  description: 'Update spacing scale to use 4px base unit',
  breaking: true,
  
  migrate: (tokens: TokenSystem) => {
    const newTokens = { ...tokens };
    
    if (tokens.spacing) {
      const oldSpacing = tokens.spacing as any;
      newTokens.spacing = {};
      
      // Convert old spacing values to new 4px based scale
      const spacingMap = {
        xs: '0.25rem',   // 4px
        sm: '0.5rem',    // 8px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '3rem',   // 48px
        '3xl': '4rem',   // 64px
      };
      
      // Also handle numeric keys
      for (let i = 0; i <= 20; i++) {
        (newTokens.spacing as any)[i] = `${i * 0.25}rem`;
      }
      
      // Apply mapping for named sizes
      for (const [old, newVal] of Object.entries(spacingMap)) {
        if (oldSpacing[old]) {
          (newTokens.spacing as any)[old] = newVal;
        }
      }
    }
    
    return newTokens;
  },
  
  rollback: (tokens: TokenSystem) => {
    // For simplicity, just return the tokens as-is
    // In a real scenario, you'd implement the reverse mapping
    return tokens;
  },
};

/**
 * Migration: 3.0.0 -> 3.1.0
 * Non-breaking: Add animation tokens
 */
const migration_3_0_0_to_3_1_0: TokenMigration = {
  fromVersion: '3.0.0',
  toVersion: '3.1.0',
  description: 'Add animation and transition tokens',
  breaking: false,
  
  migrate: (tokens: TokenSystem) => {
    const newTokens = { ...tokens };
    
    if (!newTokens.animation) {
      newTokens.animation = {
        duration: {
          instant: '0ms',
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
          slower: '1000ms',
        },
        easing: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
          bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
      };
    }
    
    return newTokens;
  },
};

/**
 * Migration: 3.1.0 -> 4.0.0
 * Breaking: Flatten typography structure
 */
const migration_3_1_0_to_4_0_0: TokenMigration = {
  fromVersion: '3.1.0',
  toVersion: '4.0.0',
  description: 'Flatten typography structure for better composition',
  breaking: true,
  
  migrate: (tokens: TokenSystem) => {
    const newTokens = { ...tokens };
    
    if (tokens.typography) {
      const oldTypography = tokens.typography as any;
      
      // Flatten nested typography styles
      if (oldTypography.styles) {
        // Move styles to root level
        for (const [styleName, styleValue] of Object.entries(oldTypography.styles)) {
          if (typeof styleValue === 'object') {
            // Create flattened keys
            for (const [prop, val] of Object.entries(styleValue as any)) {
              const flatKey = `${styleName}${prop.charAt(0).toUpperCase()}${prop.slice(1)}`;
              set(newTokens, `typography.${flatKey}`, val);
            }
          }
        }
        
        // Remove the old styles object
        delete (newTokens.typography as any).styles;
      }
    }
    
    return newTokens;
  },
  
  rollback: (tokens: TokenSystem) => {
    const oldTokens = { ...tokens };
    
    // Reconstruct nested structure from flat structure
    // This is a simplified example - real implementation would be more complex
    if (tokens.typography) {
      const typography = tokens.typography as any;
      const styles: any = {};
      
      // Group related typography properties
      const stylePatterns = ['heading', 'body', 'caption', 'label'];
      
      for (const pattern of stylePatterns) {
        styles[pattern] = {};
        
        for (const [key, value] of Object.entries(typography)) {
          if (key.toLowerCase().startsWith(pattern)) {
            const propName = key.substring(pattern.length);
            const prop = propName.charAt(0).toLowerCase() + propName.slice(1);
            styles[pattern][prop] = value;
            delete typography[key];
          }
        }
        
        if (Object.keys(styles[pattern]).length === 0) {
          delete styles[pattern];
        }
      }
      
      if (Object.keys(styles).length > 0) {
        typography.styles = styles;
      }
    }
    
    return oldTokens;
  },
};

/**
 * All available migrations
 */
export const tokenMigrations: TokenMigration[] = [
  migration_1_0_0_to_2_0_0,
  migration_2_0_0_to_2_1_0,
  migration_2_1_0_to_3_0_0,
  migration_3_0_0_to_3_1_0,
  migration_3_1_0_to_4_0_0,
];

/**
 * Get migration path between versions
 */
export function getMigrationPath(
  fromVersion: string,
  toVersion: string
): TokenMigration[] {
  const path: TokenMigration[] = [];
  let currentVersion = fromVersion;
  
  // Find all migrations in the path
  while (currentVersion !== toVersion) {
    const nextMigration = tokenMigrations.find(m => m.fromVersion === currentVersion);
    
    if (!nextMigration) {
      throw new Error(`No migration path found from ${currentVersion} to ${toVersion}`);
    }
    
    path.push(nextMigration);
    currentVersion = nextMigration.toVersion;
    
    // Prevent infinite loops
    if (path.length > tokenMigrations.length) {
      throw new Error('Circular migration detected');
    }
  }
  
  return path;
}

/**
 * Check if migration path exists
 */
export function canMigrate(fromVersion: string, toVersion: string): boolean {
  try {
    getMigrationPath(fromVersion, toVersion);
    return true;
  } catch {
    return false;
  }
}