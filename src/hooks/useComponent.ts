/**
 * @fileoverview useComponent Hook - Component Customization System
 * @description Provides component-level customization capabilities with token overrides and white-label support
 * @version 5.0.0
 * @compliance Enterprise Standards, Type-safe, SSR-Safe
 */

import { useMemo } from 'react';
import { useTokens } from '../providers/UiProvider/UiProvider';
import { useWhiteLabel } from '../providers/UiProvider/UiProvider';
import type { ComponentTokens } from '@/types/theme';

/**
 * Hook for accessing component-specific tokens with white-label overrides
 * @param componentName - Name of the component to get tokens for
 * @returns Component tokens with white-label overrides applied
 */
export function useComponent<T extends keyof ComponentTokens>(
  componentName: T
): ComponentTokens[T] {
  const tokens = useTokens();
  const { config } = useWhiteLabel();

  return useMemo(() => {
    const baseComponentTokens = tokens.components[componentName];
    
    if (!config?.tokens?.components?.[componentName]) {
      return baseComponentTokens;
    }

    // Merge white-label component overrides
    return {
      ...baseComponentTokens,
      ...config.tokens.components[componentName],
    };
  }, [tokens, config, componentName]);
}

/**
 * Hook for accessing component variants with type safety
 * @param componentName - Name of the component
 * @param variant - Variant name to get specific styling
 * @returns Component tokens filtered by variant
 */
export function useComponentVariant<T extends keyof ComponentTokens>(
  componentName: T,
  variant?: string
): ComponentTokens[T] {
  const componentTokens = useComponent(componentName);

  return useMemo(() => {
    if (!variant) {
      return componentTokens;
    }

    // Handle variant-specific overrides if they exist
    const variantKey = variant as keyof typeof componentTokens;
    if (typeof componentTokens === 'object' && componentTokens !== null && variantKey in componentTokens) {
      return componentTokens[variantKey] as ComponentTokens[T];
    }

    return componentTokens;
  }, [componentTokens, variant]);
}
