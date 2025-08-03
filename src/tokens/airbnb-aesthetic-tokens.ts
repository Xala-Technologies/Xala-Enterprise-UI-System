/**
 * @fileoverview Airbnb-Inspired Aesthetic Token System
 * @description Professional, sleek tokens inspired by Airbnb's design language
 * @version 5.0.0
 * @aesthetic Clean, modern, sophisticated with subtle animations
 */

// =============================================================================
// AIRBNB-INSPIRED SHADOW SYSTEM
// =============================================================================

/**
 * Airbnb-style elevation shadows - subtle, sophisticated, professional
 */
export const airbnbShadowTokens = {
  // Card shadows with subtle depth
  card: {
    rest: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    hover: '0 8px 25px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.18)',
    active: '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.20)',
  },
  
  // Search bar shadows
  search: {
    rest: '0 2px 8px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.15)',
    focus: '0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.20)',
    floating: '0 16px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16)',
  },
  
  // Navigation shadows
  navbar: {
    default: '0 1px 0 rgba(0, 0, 0, 0.08)',
    scrolled: '0 1px 8px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.16)',
    floating: '0 8px 28px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.16)',
  },
  
  // Modal and drawer shadows
  modal: {
    backdrop: '0 0 0 1px rgba(0, 0, 0, 0.04), 0 4px 80px rgba(0, 0, 0, 0.30)',
    content: '0 16px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16)',
    drawer: '0 0 20px rgba(0, 0, 0, 0.20)',
  },
  
  // Button shadows
  button: {
    primary: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    primaryHover: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.20)',
    secondary: '0 1px 2px rgba(0, 0, 0, 0.08)',
    secondaryHover: '0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.16)',
  },
} as const;

// =============================================================================
// AIRBNB-INSPIRED BORDER RADIUS SYSTEM
// =============================================================================

/**
 * Airbnb-style border radius - modern, clean, consistent
 */
export const airbnbBorderRadiusTokens = {
  // Standard border radius scale
  none: '0px',
  xs: '4px',      // Small elements
  sm: '8px',      // Buttons, inputs
  md: '12px',     // Cards, containers
  lg: '16px',     // Large cards, modals
  xl: '20px',     // Hero elements
  '2xl': '24px',  // Special containers
  '3xl': '32px',  // Extra large elements
  full: '9999px', // Pills, avatars
  
  // Component-specific radius
  component: {
    button: '8px',      // Clean, professional buttons
    input: '8px',       // Consistent with buttons
    card: '12px',       // Signature Airbnb card radius
    modal: '16px',      // Modern modal radius
    avatar: '50%',      // Perfect circles
    badge: '16px',      // Pill-shaped badges
    search: '40px',     // Airbnb's signature search bar
    image: '8px',       // Image containers
  },
} as const;

// =============================================================================
// AIRBNB-INSPIRED SPACING SYSTEM
// =============================================================================

/**
 * Airbnb-style spacing - generous, breathing room, professional
 */
export const airbnbSpacingTokens = {
  // Base 8pt grid system with Airbnb proportions
  0: '0px',
  1: '4px',       // Micro spacing
  2: '8px',       // Base unit
  3: '12px',      // Small spacing
  4: '16px',      // Standard spacing
  5: '20px',      // Medium spacing
  6: '24px',      // Large spacing
  7: '28px',      // Extra spacing
  8: '32px',      // Section spacing
  9: '36px',      // Large section spacing
  10: '40px',     // Card padding
  11: '44px',     // Touch target minimum
  12: '48px',     // Button height
  14: '56px',     // Input height
  16: '64px',     // Large components
  20: '80px',     // Section breaks
  24: '96px',     // Large sections
  32: '128px',    // Hero spacing
  40: '160px',    // Extra large spacing
  48: '192px',    // Massive spacing
  
  // Semantic spacing for Airbnb components
  component: {
    cardPadding: '24px',      // Standard card internal padding
    cardGap: '16px',          // Gap between card elements
    sectionGap: '40px',       // Gap between sections
    listItemGap: '12px',      // Gap between list items
    buttonPadding: '16px 24px', // Button internal padding
    inputPadding: '16px 20px',  // Input internal padding
    modalPadding: '32px',     // Modal internal padding
    navbarPadding: '16px 24px', // Navbar padding
  },
} as const;

// =============================================================================
// AIRBNB-INSPIRED ANIMATION TOKENS
// =============================================================================

/**
 * Airbnb-style animations - smooth, delightful, purposeful
 */
export const airbnbAnimationTokens = {
  // Duration scale
  duration: {
    instant: '0ms',         // No animation
    micro: '100ms',         // Micro-interactions
    fast: '200ms',          // Quick transitions
    normal: '300ms',        // Standard transitions
    slow: '400ms',          // Deliberate transitions
    slower: '600ms',        // Emphasis transitions
    slowest: '800ms',       // Special effects
  },
  
  // Easing curves - natural, sophisticated
  easing: {
    // Standard easing
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    
    // Custom Airbnb-style easing curves
    airbnb: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',      // Signature smooth curve
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',    // Playful bounce
    sharp: 'cubic-bezier(0.4, 0.0, 0.2, 1)',             // Sharp, precise
    gentle: 'cubic-bezier(0.25, 0.8, 0.25, 1)',          // Gentle, natural
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',  // Subtle elastic
  },
  
  // Component-specific animations
  component: {
    card: {
      hover: {
        duration: '300ms',
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: 'translateY(-2px)',
      },
      press: {
        duration: '150ms',
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        transform: 'translateY(1px)',
      },
    },
    
    button: {
      hover: {
        duration: '200ms',
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: 'translateY(-1px)',
      },
      press: {
        duration: '100ms',
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        transform: 'translateY(0px)',
      },
    },
    
    search: {
      focus: {
        duration: '300ms',
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: 'scale(1.02)',
      },
      float: {
        duration: '400ms',
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: 'translateY(-8px)',
      },
    },
    
    modal: {
      enter: {
        duration: '400ms',
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: 'scale(1) translateY(0px)',
      },
      exit: {
        duration: '300ms',
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        transform: 'scale(0.95) translateY(20px)',
      },
    },
  },
} as const;

// =============================================================================
// AIRBNB-INSPIRED COLOR PALETTE
// =============================================================================

/**
 * Airbnb-style color palette - warm, welcoming, professional
 */
export const airbnbColorTokens = {
  // Signature Airbnb colors
  brand: {
    // Airbnb's signature pink/coral
    rausch: '#FF5A5F',        // Primary brand color
    kazan: '#00A699',         // Secondary teal
    lima: '#FC642D',          // Accent orange
    foggy: '#484848',         // Dark gray
    
    // Brand variations
    rauschLight: '#FF8E91',
    rauschDark: '#E00007',
    kazanLight: '#4ECDC4',
    kazanDark: '#00837A',
  },
  
  // Professional neutrals
  neutral: {
    50: '#FAFAFA',           // Lightest background
    100: '#F7F7F7',          // Light background
    200: '#EBEBEB',          // Border light
    300: '#DDDDDD',          // Border
    400: '#CCCCCC',          // Border dark
    500: '#999999',          // Text light
    600: '#717171',          // Text medium
    700: '#484848',          // Text dark (Airbnb foggy)
    800: '#222222',          // Text darker
    900: '#191919',          // Text darkest
  },
  
  // Semantic colors with Airbnb warmth
  semantic: {
    success: '#00A699',       // Kazan teal for success
    warning: '#FC642D',       // Lima orange for warnings
    error: '#FF5A5F',         // Rausch for errors
    info: '#007A87',          // Deep teal for info
  },
} as const;

// =============================================================================
// AIRBNB-INSPIRED TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Airbnb-style typography - clean, readable, hierarchical
 */
export const airbnbTypographyTokens = {
  // Font family stack (Airbnb uses Circular)
  fontFamily: {
    sans: ['Circular', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'sans-serif'],
    mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
  },
  
  // Font size scale
  fontSize: {
    xs: '12px',      // Captions, labels
    sm: '14px',      // Body small
    base: '16px',    // Body text
    lg: '18px',      // Body large
    xl: '20px',      // Small headings
    '2xl': '24px',   // Headings
    '3xl': '30px',   // Large headings
    '4xl': '36px',   // Display small
    '5xl': '48px',   // Display medium
    '6xl': '60px',   // Display large
    '7xl': '72px',   // Display extra large
  },
  
  // Font weights
  fontWeight: {
    light: 300,      // Light text
    normal: 400,     // Body text
    medium: 500,     // Emphasis
    semibold: 600,   // Strong emphasis
    bold: 700,       // Headings
    extrabold: 800,  // Display text
  },
  
  // Line heights for readability
  lineHeight: {
    tight: 1.2,      // Headings
    snug: 1.4,       // Large text
    normal: 1.5,     // Body text
    relaxed: 1.6,    // Reading text
    loose: 1.8,      // Loose text
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// =============================================================================
// COMPLETE AIRBNB AESTHETIC TOKEN SYSTEM
// =============================================================================

/**
 * Complete Airbnb-inspired aesthetic token system
 */
export const airbnbAestheticTokens = {
  shadows: airbnbShadowTokens,
  borderRadius: airbnbBorderRadiusTokens,
  spacing: airbnbSpacingTokens,
  animation: airbnbAnimationTokens,
  colors: airbnbColorTokens,
  typography: airbnbTypographyTokens,
} as const;

export type AirbnbAestheticTokens = typeof airbnbAestheticTokens;