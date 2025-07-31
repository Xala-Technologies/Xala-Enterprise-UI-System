/**
 * White Label Configuration Templates
 * Pre-configured templates for common white label scenarios
 */

import { WhiteLabelConfig } from '../providers/WhiteLabelProvider';
import { TokenSystem } from '../tokens/types';

/**
 * Healthcare white label template
 */
export const healthcareTemplate: WhiteLabelConfig = {
  id: 'healthcare-template',
  name: 'Healthcare Portal',
  description: 'Professional healthcare application template',
  logo: {
    light: '/assets/healthcare-logo-light.svg',
    dark: '/assets/healthcare-logo-dark.svg',
    alt: 'Healthcare Portal',
  },
  favicon: '/assets/healthcare-favicon.ico',
  themes: [
    {
      metadata: {
        id: 'healthcare-light',
        name: 'Healthcare Light',
        category: 'healthcare',
        mode: 'LIGHT' as const,
        version: '1.0.0',
      },
      colors: {
        primary: {
          50: '#e6f3ff',
          500: '#0066cc',
          900: '#00264d',
        },
        secondary: {
          50: '#e6fff9',
          500: '#00b386',
          900: '#004d39',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
      },
      typography: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
      },
    },
  ],
  defaultTheme: 'healthcare-light',
  features: {
    animations: true,
    advancedThemes: true,
    customFonts: true,
    analytics: true,
    accessibility: true,
    gdprCompliance: true,
    patientPortal: true,
    telemedicine: true,
  },
  content: {
    appName: 'Healthcare Portal',
    tagline: 'Your Health, Our Priority',
    welcomeMessage: 'Welcome to your healthcare portal',
    privacyNotice: 'Your health information is protected by HIPAA regulations',
  },
  analytics: {
    id: 'G-HEALTHCARE123',
    provider: 'google',
  },
  customCSS: `
    /* Healthcare-specific styling */
    .healthcare-badge {
      background-color: var(--color-primary-50);
      color: var(--color-primary-900);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-weight: 500;
    }
    
    .patient-card {
      background: white;
      border: 1px solid var(--color-neutral-200);
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  `,
};

/**
 * FinTech white label template
 */
export const fintechTemplate: WhiteLabelConfig = {
  id: 'fintech-template',
  name: 'FinTech Platform',
  description: 'Modern financial technology platform',
  logo: {
    light: '/assets/fintech-logo-light.svg',
    dark: '/assets/fintech-logo-dark.svg',
    alt: 'FinTech Platform',
  },
  favicon: '/assets/fintech-favicon.ico',
  themes: [
    {
      metadata: {
        id: 'fintech-dark',
        name: 'FinTech Dark',
        category: 'fintech',
        mode: 'DARK' as const,
        version: '1.0.0',
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#faf5ff',
          500: '#a855f7',
          900: '#4c1d95',
        },
        success: {
          50: '#f0fdf4',
          500: '#10b981',
          900: '#064e3b',
        },
        neutral: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          800: '#e2e8f0',
          900: '#f8fafc',
        },
      },
    },
  ],
  defaultTheme: 'fintech-dark',
  features: {
    animations: true,
    advancedThemes: true,
    darkModeDefault: true,
    analytics: true,
    realTimeData: true,
    cryptoSupport: true,
    bankingIntegration: true,
    securityFirst: true,
  },
  content: {
    appName: 'FinTech Pro',
    tagline: 'Smart Financial Solutions',
    welcomeMessage: 'Welcome to the future of finance',
    securityNotice: 'Bank-level security with 256-bit encryption',
  },
  customCSS: `
    /* FinTech-specific styling */
    .price-ticker {
      font-family: var(--font-family-mono);
      font-variant-numeric: tabular-nums;
    }
    
    .trading-card {
      background: var(--color-neutral-100);
      border: 1px solid var(--color-neutral-200);
      border-radius: 0.5rem;
      padding: 1rem;
    }
    
    .profit {
      color: var(--color-success-500);
    }
    
    .loss {
      color: var(--color-danger-500);
    }
  `,
};

/**
 * Education white label template
 */
export const educationTemplate: WhiteLabelConfig = {
  id: 'education-template',
  name: 'EduLearn Platform',
  description: 'Interactive learning management system',
  logo: {
    light: '/assets/edu-logo-light.svg',
    dark: '/assets/edu-logo-dark.svg',
    alt: 'EduLearn Platform',
  },
  themes: [
    {
      metadata: {
        id: 'education-light',
        name: 'Education Light',
        category: 'education',
        mode: 'LIGHT' as const,
        version: '1.0.0',
      },
      colors: {
        primary: {
          50: '#fef3c7',
          500: '#f59e0b',
          900: '#78350f',
        },
        secondary: {
          50: '#ddd6fe',
          500: '#8b5cf6',
          900: '#4c1d95',
        },
      },
    },
  ],
  defaultTheme: 'education-light',
  features: {
    animations: true,
    gamification: true,
    videoSupport: true,
    quizzes: true,
    certificates: true,
    multiLanguage: true,
    offlineMode: true,
  },
  content: {
    appName: 'EduLearn',
    tagline: 'Learn Without Limits',
    welcomeMessage: 'Start your learning journey today',
  },
  customCSS: `
    /* Education-specific styling */
    .course-card {
      background: white;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    
    .course-card:hover {
      transform: translateY(-4px);
    }
    
    .progress-bar {
      background: var(--color-neutral-200);
      border-radius: 9999px;
      height: 0.5rem;
      overflow: hidden;
    }
    
    .progress-fill {
      background: var(--color-primary-500);
      height: 100%;
      transition: width 0.3s ease;
    }
  `,
};

/**
 * E-commerce white label template
 */
export const ecommerceTemplate: WhiteLabelConfig = {
  id: 'ecommerce-template',
  name: 'ShopHub',
  description: 'Modern e-commerce platform',
  logo: {
    light: '/assets/shop-logo-light.svg',
    dark: '/assets/shop-logo-dark.svg',
    alt: 'ShopHub',
  },
  themes: [
    {
      metadata: {
        id: 'ecommerce-vibrant',
        name: 'Vibrant Commerce',
        category: 'ecommerce',
        mode: 'LIGHT' as const,
        version: '1.0.0',
      },
      colors: {
        primary: {
          50: '#fce7f3',
          500: '#ec4899',
          900: '#831843',
        },
        secondary: {
          50: '#e0e7ff',
          500: '#6366f1',
          900: '#312e81',
        },
      },
    },
  ],
  features: {
    animations: true,
    productReviews: true,
    wishlist: true,
    recommendations: true,
    shoppingCart: true,
    checkoutFlow: true,
    inventory: true,
    multiCurrency: true,
  },
  content: {
    appName: 'ShopHub',
    tagline: 'Shop Smart, Live Better',
    welcomeMessage: 'Welcome to your favorite shopping destination',
  },
  customCSS: `
    /* E-commerce-specific styling */
    .product-card {
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      transition: all 0.2s;
    }
    
    .product-card:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .price-tag {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary-500);
    }
    
    .discount-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: var(--color-danger-500);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
    }
  `,
};

/**
 * Government/Public Sector template
 */
export const governmentTemplate: WhiteLabelConfig = {
  id: 'government-template',
  name: 'GovPortal',
  description: 'Official government services portal',
  logo: {
    light: '/assets/gov-logo-light.svg',
    dark: '/assets/gov-logo-dark.svg',
    alt: 'Government Portal',
  },
  themes: [
    {
      metadata: {
        id: 'government-official',
        name: 'Official Government',
        category: 'government',
        mode: 'LIGHT' as const,
        version: '1.0.0',
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f3f4f6',
          500: '#6b7280',
          900: '#111827',
        },
      },
      typography: {
        fontFamily: {
          sans: ['Public Sans', 'system-ui', 'sans-serif'],
        },
      },
    },
  ],
  features: {
    animations: false, // Minimal animations for accessibility
    accessibility: true,
    wcagCompliance: true,
    multiLanguage: true,
    formBuilder: true,
    documentManagement: true,
    citizenPortal: true,
    secureMessaging: true,
  },
  content: {
    appName: 'Official Government Portal',
    tagline: 'Serving Citizens Digitally',
    welcomeMessage: 'Welcome to the official government services portal',
    accessibilityNotice: 'This website is WCAG 2.1 AA compliant',
  },
  customCSS: `
    /* Government-specific styling */
    .gov-header {
      background: var(--color-primary-900);
      color: white;
      padding: 1rem 0;
    }
    
    .service-card {
      border: 2px solid var(--color-neutral-200);
      border-radius: 0.5rem;
      padding: 1.5rem;
      background: white;
    }
    
    .service-card:focus-within {
      outline: 3px solid var(--color-primary-500);
      outline-offset: 2px;
    }
    
    .official-notice {
      background: var(--color-primary-50);
      border-left: 4px solid var(--color-primary-500);
      padding: 1rem;
      margin: 1rem 0;
    }
  `,
};

/**
 * Template registry
 */
export const whiteLabelTemplates = {
  healthcare: healthcareTemplate,
  fintech: fintechTemplate,
  education: educationTemplate,
  ecommerce: ecommerceTemplate,
  government: governmentTemplate,
} as const;

/**
 * Get template by industry
 */
export function getWhiteLabelTemplate(
  industry: keyof typeof whiteLabelTemplates
): WhiteLabelConfig {
  return whiteLabelTemplates[industry];
}

/**
 * Create custom template from base
 */
export function createCustomTemplate(
  baseTemplate: keyof typeof whiteLabelTemplates,
  overrides: Partial<WhiteLabelConfig>
): WhiteLabelConfig {
  const base = whiteLabelTemplates[baseTemplate];
  return {
    ...base,
    ...overrides,
    id: overrides.id || `${base.id}-custom`,
    name: overrides.name || `${base.name} (Custom)`,
    features: {
      ...base.features,
      ...overrides.features,
    },
    content: {
      ...base.content,
      ...overrides.content,
    },
  };
}