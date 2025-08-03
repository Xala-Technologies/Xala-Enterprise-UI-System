'use client';

/**
 * @fileoverview BrandingProvider - Industry Standard Branding System
 * @description Centralized branding provider for enterprise SaaS products
 * @version 5.0.0
 * @compliance SSR-Safe, Industry Standards, Enterprise-ready
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Logger } from '../lib/utils/multiplatform-logger';
import { designTokens } from '../tokens/design-tokens';

const logger = Logger.create({
  serviceName: 'ui-system-branding-provider',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// BRANDING INTERFACES
// =============================================================================

export interface BrandConfig {
  // Company Identity
  companyName: string;
  productName: string;
  tagline?: string;
  
  // Visual Assets
  logo: {
    primary: string;
    secondary?: string;
    icon?: string;
    wordmark?: string;
  };
  
  // Brand Colors (extends design tokens)
  brandColors: {
    primary: string;
    secondary: string;
    accent?: string;
    neutral: string;
  };
  
  // Typography
  typography: {
    primaryFont: string[];
    secondaryFont?: string[];
    displayFont?: string[];
  };
  
  // Brand Voice
  voice: {
    tone: 'professional' | 'friendly' | 'technical' | 'casual' | 'authoritative';
    personality: string[];
  };
  
  // Industry Context
  industry: 'saas' | 'fintech' | 'healthcare' | 'ecommerce' | 'education' | 'enterprise' | 'other';
  
  // Customization
  customProperties?: Record<string, string>;
}

export interface BrandingContextValue {
  brandConfig: BrandConfig | null;
  isLoading: boolean;
  
  // Brand Management
  setBrandConfig: (config: BrandConfig) => void;
  updateBrandConfig: (updates: Partial<BrandConfig>) => void;
  resetToDefault: () => void;
  
  // Utilities
  getBrandColor: (colorKey: keyof BrandConfig['brandColors']) => string;
  getBrandAsset: (assetKey: keyof BrandConfig['logo']) => string;
  applyBrandToElement: (element: HTMLElement) => void;
}

// =============================================================================
// CONTEXT CREATION
// =============================================================================

let BrandingContext: React.Context<BrandingContextValue | null> | null = null;

if (typeof window !== 'undefined') {
  BrandingContext = createContext<BrandingContextValue | null>(null);
} else {
  // SSR fallback
  BrandingContext = {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: BrandingContextValue | null) => React.ReactNode;
    }) => children(null),
    displayName: 'BrandingContext',
  } as unknown as React.Context<BrandingContextValue | null>;
}

// =============================================================================
// DEFAULT BRAND CONFIGURATIONS
// =============================================================================

const getDefaultBrandConfig = (industry: BrandConfig['industry'] = 'saas'): BrandConfig => {
  const baseConfig: BrandConfig = {
    companyName: 'Your Company',
    productName: 'Your Product',
    tagline: 'Building the future',
    logo: {
      primary: '/assets/logo-primary.svg',
      secondary: '/assets/logo-secondary.svg',
      icon: '/assets/logo-icon.svg',
    },
    brandColors: {
      primary: designTokens.colors.primary[600],
      secondary: designTokens.colors.secondary[600],
      accent: designTokens.colors.primary[500],
      neutral: designTokens.colors.neutral[600],
    },
    typography: {
      primaryFont: [...designTokens.typography.fontFamily.sans],
      secondaryFont: [...designTokens.typography.fontFamily.sans], // Use sans as fallback
    },
    voice: {
      tone: 'professional',
      personality: ['reliable', 'innovative', 'user-focused'],
    },
    industry,
  };

  // Industry-specific customizations
  switch (industry) {
    case 'fintech':
      return {
        ...baseConfig,
        brandColors: {
          ...baseConfig.brandColors,
          primary: '#1e40af', // Trust-building blue
          secondary: '#059669', // Success green
        },
        voice: {
          tone: 'authoritative',
          personality: ['secure', 'transparent', 'trustworthy'],
        },
      };
      
    case 'healthcare':
      return {
        ...baseConfig,
        brandColors: {
          ...baseConfig.brandColors,
          primary: '#0891b2', // Medical teal
          secondary: '#7c3aed', // Healthcare purple
        },
        voice: {
          tone: 'professional',
          personality: ['caring', 'reliable', 'precise'],
        },
      };
      
    case 'ecommerce':
      return {
        ...baseConfig,
        brandColors: {
          ...baseConfig.brandColors,
          primary: '#dc2626', // Action red
          secondary: '#f59e0b', // Warning orange
        },
        voice: {
          tone: 'friendly',
          personality: ['energetic', 'helpful', 'accessible'],
        },
      };
      
    case 'education':
      return {
        ...baseConfig,
        brandColors: {
          ...baseConfig.brandColors,
          primary: '#7c2d12', // Academic brown
          secondary: '#0369a1', // Knowledge blue
        },
        voice: {
          tone: 'friendly',
          personality: ['encouraging', 'knowledgeable', 'supportive'],
        },
      };
      
    default:
      return baseConfig;
  }
};

// =============================================================================
// BRANDING PROVIDER
// =============================================================================

export interface BrandingProviderProps {
  children: React.ReactNode;
  defaultBrandConfig?: BrandConfig;
  industry?: BrandConfig['industry'];
}

export function BrandingProvider({
  children,
  defaultBrandConfig,
  industry = 'saas',
}: BrandingProviderProps): JSX.Element {
  // SSR safety
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  const [brandConfig, setBrandConfigState] = useState<BrandConfig | null>(
    defaultBrandConfig || getDefaultBrandConfig(industry)
  );
  const [isLoading, setIsLoading] = useState(false);

  // Apply brand configuration to CSS custom properties
  useEffect(() => {
    if (brandConfig && typeof document !== 'undefined') {
      const root = document.documentElement;

      try {
        // Apply brand colors
        Object.entries(brandConfig.brandColors).forEach(([key, value]) => {
          root.style.setProperty(`--brand-color-${key}`, value);
        });

        // Apply typography
        if (brandConfig.typography.primaryFont) {
          root.style.setProperty(
            '--brand-font-primary',
            brandConfig.typography.primaryFont.join(', ')
          );
        }
        
        if (brandConfig.typography.secondaryFont) {
          root.style.setProperty(
            '--brand-font-secondary',
            brandConfig.typography.secondaryFont.join(', ')
          );
        }
        
        if (brandConfig.typography.displayFont) {
          root.style.setProperty(
            '--brand-font-display',
            brandConfig.typography.displayFont.join(', ')
          );
        }

        // Apply custom properties
        if (brandConfig.customProperties) {
          Object.entries(brandConfig.customProperties).forEach(([key, value]) => {
            root.style.setProperty(`--brand-${key}`, value);
          });
        }

        logger.info('Brand configuration applied', {
          companyName: brandConfig.companyName,
          industry: brandConfig.industry,
        });
      } catch (error) {
        logger.error('Failed to apply brand configuration', { error });
      }
    }
  }, [brandConfig]);

  const setBrandConfig = (config: BrandConfig): void => {
    logger.info('Setting brand configuration', { companyName: config.companyName });
    setBrandConfigState(config);
  };

  const updateBrandConfig = (updates: Partial<BrandConfig>): void => {
    if (!brandConfig) return;
    
    const updatedConfig = { ...brandConfig, ...updates };
    logger.info('Updating brand configuration', { updates: Object.keys(updates) });
    setBrandConfigState(updatedConfig);
  };

  const resetToDefault = (): void => {
    const defaultConfig = getDefaultBrandConfig(brandConfig?.industry || industry);
    logger.info('Resetting to default brand configuration');
    setBrandConfigState(defaultConfig);
  };

  const getBrandColor = (colorKey: keyof BrandConfig['brandColors']): string => {
    return brandConfig?.brandColors[colorKey] || designTokens.colors.primary[600];
  };

  const getBrandAsset = (assetKey: keyof BrandConfig['logo']): string => {
    return brandConfig?.logo[assetKey] || '/assets/logo-primary.svg';
  };

  const applyBrandToElement = (element: HTMLElement): void => {
    if (!brandConfig) return;

    element.style.setProperty('color', brandConfig.brandColors.primary);
    element.style.setProperty('font-family', brandConfig.typography.primaryFont.join(', '));
  };

  const value: BrandingContextValue = {
    brandConfig,
    isLoading,
    setBrandConfig,
    updateBrandConfig,
    resetToDefault,
    getBrandColor,
    getBrandAsset,
    applyBrandToElement,
  };

  if (!BrandingContext) {
    return <>{children}</>;
  }

  return <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>;
}

// =============================================================================
// BRANDING HOOKS
// =============================================================================

export const useBranding = (): BrandingContextValue => {
  const defaultValue: BrandingContextValue = {
    brandConfig: getDefaultBrandConfig(),
    isLoading: false,
    setBrandConfig: () => {},
    updateBrandConfig: () => {},
    resetToDefault: () => {},
    getBrandColor: () => designTokens.colors.primary[600],
    getBrandAsset: () => '/assets/logo-primary.svg',
    applyBrandToElement: () => {},
  };

  if (typeof window === 'undefined') {
    return defaultValue;
  }

  if (!BrandingContext) {
    return defaultValue;
  }

  try {
    const context = useContext(BrandingContext);
    return context || defaultValue;
  } catch (error) {
    logger.warn('useBranding failed, using defaults:', error);
    return defaultValue;
  }
};

/**
 * Hook for accessing brand colors
 */
export const useBrandColors = (): {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  getBrandColor: (key: keyof BrandConfig['brandColors']) => string;
} => {
  const { brandConfig, getBrandColor } = useBranding();

  return {
    primary: brandConfig?.brandColors.primary || designTokens.colors.primary[600],
    secondary: brandConfig?.brandColors.secondary || designTokens.colors.secondary[600],
    accent: brandConfig?.brandColors.accent || designTokens.colors.primary[500],
    neutral: brandConfig?.brandColors.neutral || designTokens.colors.neutral[600],
    getBrandColor,
  };
};

/**
 * Hook for accessing brand assets
 */
export const useBrandAssets = (): {
  logo: BrandConfig['logo'];
  getBrandAsset: (key: keyof BrandConfig['logo']) => string;
} => {
  const { brandConfig, getBrandAsset } = useBranding();

  return {
    logo: brandConfig?.logo || {
      primary: '/assets/logo-primary.svg',
      secondary: '/assets/logo-secondary.svg',
      icon: '/assets/logo-icon.svg',
    },
    getBrandAsset,
  };
};

/**
 * Hook for industry-specific branding
 */
export const useIndustryBranding = (industry: BrandConfig['industry']) => {
  const { setBrandConfig } = useBranding();

  const applyIndustryBranding = (): void => {
    const industryConfig = getDefaultBrandConfig(industry);
    setBrandConfig(industryConfig);
  };

  return {
    applyIndustryBranding,
    industryDefaults: getDefaultBrandConfig(industry),
  };
};

logger.info('BrandingProvider initialized with industry standard configurations');