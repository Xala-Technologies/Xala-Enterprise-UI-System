/**
 * Xala Enterprise UI System Tailwind Preset
 * 
 * This preset provides a complete design system configuration that can be
 * extended by consuming applications. It includes:
 * - CSS custom property-based tokens
 * - Professional component sizing
 * - Norwegian compliance utilities
 * - Semantic color system
 * - Accessibility-first defaults
 * 
 * Usage:
 * ```js
 * // tailwind.config.js
 * module.exports = {
 *   presets: [require('@xala-technologies/ui-system/tailwind.preset.js')],
 *   content: ['./src/**\/*.{js,ts,jsx,tsx}'],
 *   // ... your customizations
 * }
 * ```
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    // Base color system using CSS custom properties
    colors: {
      // Semantic colors
      background: 'hsl(var(--color-background) / <alpha-value>)',
      foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
      card: {
        DEFAULT: 'hsl(var(--color-card) / <alpha-value>)',
        foreground: 'hsl(var(--color-card-foreground) / <alpha-value>)',
      },
      popover: {
        DEFAULT: 'hsl(var(--color-popover) / <alpha-value>)',
        foreground: 'hsl(var(--color-popover-foreground) / <alpha-value>)',
      },
      primary: {
        DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
        foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-primary-hover) / <alpha-value>)',
        active: 'hsl(var(--color-primary-active) / <alpha-value>)',
      },
      secondary: {
        DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
        foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-secondary-hover) / <alpha-value>)',
        active: 'hsl(var(--color-secondary-active) / <alpha-value>)',
      },
      muted: {
        DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)',
        foreground: 'hsl(var(--color-muted-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-muted-hover) / <alpha-value>)',
      },
      accent: {
        DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
        foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-accent-hover) / <alpha-value>)',
      },
      destructive: {
        DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
        foreground: 'hsl(var(--color-destructive-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-destructive-hover) / <alpha-value>)',
        active: 'hsl(var(--color-destructive-active) / <alpha-value>)',
      },
      // Status colors
      success: {
        DEFAULT: 'hsl(var(--color-success) / <alpha-value>)',
        foreground: 'hsl(var(--color-success-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-success-hover) / <alpha-value>)',
        muted: 'hsl(var(--color-success-muted) / <alpha-value>)',
      },
      warning: {
        DEFAULT: 'hsl(var(--color-warning) / <alpha-value>)',
        foreground: 'hsl(var(--color-warning-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-warning-hover) / <alpha-value>)',
        muted: 'hsl(var(--color-warning-muted) / <alpha-value>)',
      },
      info: {
        DEFAULT: 'hsl(var(--color-info) / <alpha-value>)',
        foreground: 'hsl(var(--color-info-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-info-hover) / <alpha-value>)',
        muted: 'hsl(var(--color-info-muted) / <alpha-value>)',
      },
      error: {
        DEFAULT: 'hsl(var(--color-error) / <alpha-value>)',
        foreground: 'hsl(var(--color-error-foreground) / <alpha-value>)',
        hover: 'hsl(var(--color-error-hover) / <alpha-value>)',
        muted: 'hsl(var(--color-error-muted) / <alpha-value>)',
      },
      // System colors
      border: 'hsl(var(--color-border) / <alpha-value>)',
      input: 'hsl(var(--color-input) / <alpha-value>)',
      ring: 'hsl(var(--color-ring) / <alpha-value>)',
      // Text colors
      text: {
        primary: 'hsl(var(--color-text-primary) / <alpha-value>)',
        secondary: 'hsl(var(--color-text-secondary) / <alpha-value>)',
        muted: 'hsl(var(--color-text-muted) / <alpha-value>)',
        disabled: 'hsl(var(--color-text-disabled) / <alpha-value>)',
      },
      // Norwegian compliance colors
      nsm: {
        open: 'hsl(var(--color-nsm-open) / <alpha-value>)',
        restricted: 'hsl(var(--color-nsm-restricted) / <alpha-value>)',
        confidential: 'hsl(var(--color-nsm-confidential) / <alpha-value>)',
        secret: 'hsl(var(--color-nsm-secret) / <alpha-value>)',
      },
      // Primitive colors for edge cases
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
    },

    // 8pt Grid Spacing System
    spacing: {
      px: '1px',
      0: 'var(--space-0)',
      0.5: 'var(--space-0-5)',
      1: 'var(--space-1)',
      1.5: 'var(--space-1-5)',
      2: 'var(--space-2)',
      2.5: 'var(--space-2-5)',
      3: 'var(--space-3)',
      3.5: 'var(--space-3-5)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      7: 'var(--space-7)',
      8: 'var(--space-8)',
      9: 'var(--space-9)',
      10: 'var(--space-10)',
      11: 'var(--space-11)',
      12: 'var(--space-12)',
      14: 'var(--space-14)',
      16: 'var(--space-16)',
      18: 'var(--space-18)',
      20: 'var(--space-20)',
      24: 'var(--space-24)',
      28: 'var(--space-28)',
      32: 'var(--space-32)',
      36: 'var(--space-36)',
      40: 'var(--space-40)',
      44: 'var(--space-44)',
      48: 'var(--space-48)',
      52: 'var(--space-52)',
      56: 'var(--space-56)',
      60: 'var(--space-60)',
      64: 'var(--space-64)',
      72: 'var(--space-72)',
      80: 'var(--space-80)',
      96: 'var(--space-96)',
      // Semantic spacing
      xs: 'var(--space-xs)',
      sm: 'var(--space-sm)',
      md: 'var(--space-md)',
      lg: 'var(--space-lg)',
      xl: 'var(--space-xl)',
      '2xl': 'var(--space-2xl)',
      '3xl': 'var(--space-3xl)',
      '4xl': 'var(--space-4xl)',
      '5xl': 'var(--space-5xl)',
      '6xl': 'var(--space-6xl)',
    },

    // Typography system
    fontFamily: {
      sans: 'var(--font-family-sans)',
      serif: 'var(--font-family-serif)',
      mono: 'var(--font-family-mono)',
      heading: 'var(--font-family-heading)',
      body: 'var(--font-family-body)',
    },

    fontSize: {
      xs: ['var(--font-size-xs)', { lineHeight: 'var(--line-height-tight)' }],
      sm: ['var(--font-size-sm)', { lineHeight: 'var(--line-height-snug)' }],
      base: ['var(--font-size-base)', { lineHeight: 'var(--line-height-normal)' }],
      lg: ['var(--font-size-lg)', { lineHeight: 'var(--line-height-normal)' }],
      xl: ['var(--font-size-xl)', { lineHeight: 'var(--line-height-normal)' }],
      '2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--line-height-tight)' }],
      '3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--line-height-tight)' }],
      '4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--line-height-tight)' }],
      '5xl': ['var(--font-size-5xl)', { lineHeight: 'var(--line-height-none)' }],
      '6xl': ['var(--font-size-6xl)', { lineHeight: 'var(--line-height-none)' }],
      '7xl': ['var(--font-size-7xl)', { lineHeight: 'var(--line-height-none)' }],
      '8xl': ['var(--font-size-8xl)', { lineHeight: 'var(--line-height-none)' }],
      '9xl': ['var(--font-size-9xl)', { lineHeight: 'var(--line-height-none)' }],
    },

    fontWeight: {
      thin: 'var(--font-weight-thin)',
      extralight: 'var(--font-weight-extralight)',
      light: 'var(--font-weight-light)',
      normal: 'var(--font-weight-normal)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
      extrabold: 'var(--font-weight-extrabold)',
      black: 'var(--font-weight-black)',
    },

    lineHeight: {
      none: 'var(--line-height-none)',
      tight: 'var(--line-height-tight)',
      snug: 'var(--line-height-snug)',
      normal: 'var(--line-height-normal)',
      relaxed: 'var(--line-height-relaxed)',
      loose: 'var(--line-height-loose)',
    },

    letterSpacing: {
      tighter: 'var(--letter-spacing-tighter)',
      tight: 'var(--letter-spacing-tight)',
      normal: 'var(--letter-spacing-normal)',
      wide: 'var(--letter-spacing-wide)',
      wider: 'var(--letter-spacing-wider)',
      widest: 'var(--letter-spacing-widest)',
    },

    // Border system
    borderRadius: {
      none: 'var(--border-radius-none)',
      xs: 'var(--border-radius-xs)',
      sm: 'var(--border-radius-sm)',
      DEFAULT: 'var(--border-radius-md)',
      md: 'var(--border-radius-md)',
      lg: 'var(--border-radius-lg)',
      xl: 'var(--border-radius-xl)',
      '2xl': 'var(--border-radius-2xl)',
      '3xl': 'var(--border-radius-3xl)',
      full: 'var(--border-radius-full)',
    },

    borderWidth: {
      DEFAULT: 'var(--border-width-1)',
      0: 'var(--border-width-0)',
      1: 'var(--border-width-1)',
      2: 'var(--border-width-2)',
      4: 'var(--border-width-4)',
      8: 'var(--border-width-8)',
    },

    // Shadow system
    boxShadow: {
      xs: 'var(--shadow-xs)',
      sm: 'var(--shadow-sm)',
      DEFAULT: 'var(--shadow-md)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      xl: 'var(--shadow-xl)',
      '2xl': 'var(--shadow-2xl)',
      inner: 'var(--shadow-inner)',
      none: 'none',
    },

    // Animation system
    transitionDuration: {
      instant: 'var(--duration-instant)',
      fast: 'var(--duration-fast)',
      DEFAULT: 'var(--duration-normal)',
      normal: 'var(--duration-normal)',
      slow: 'var(--duration-slow)',
      slower: 'var(--duration-slower)',
      slowest: 'var(--duration-slowest)',
    },

    transitionTimingFunction: {
      linear: 'var(--easing-linear)',
      DEFAULT: 'var(--easing-ease-out)',
      ease: 'var(--easing-ease)',
      'ease-in': 'var(--easing-ease-in)',
      'ease-out': 'var(--easing-ease-out)',
      'ease-in-out': 'var(--easing-ease-in-out)',
      'ease-in-back': 'var(--easing-ease-in-back)',
      'ease-out-back': 'var(--easing-ease-out-back)',
      'ease-in-out-back': 'var(--easing-ease-in-out-back)',
    },

    // Z-index system
    zIndex: {
      hide: 'var(--z-hide)',
      auto: 'auto',
      0: 'var(--z-base)',
      10: 'var(--z-docked)',
      dropdown: 'var(--z-dropdown)',
      sticky: 'var(--z-sticky)',
      banner: 'var(--z-banner)',
      overlay: 'var(--z-overlay)',
      modal: 'var(--z-modal)',
      popover: 'var(--z-popover)',
      'skip-link': 'var(--z-skip-link)',
      toast: 'var(--z-toast)',
      tooltip: 'var(--z-tooltip)',
    },

    // Responsive breakpoints
    screens: {
      xs: 'var(--breakpoint-xs)',
      sm: 'var(--breakpoint-sm)',
      md: 'var(--breakpoint-md)',
      lg: 'var(--breakpoint-lg)',
      xl: 'var(--breakpoint-xl)',
      '2xl': 'var(--breakpoint-2xl)',
    },

    extend: {
      // Professional component heights
      height: {
        'button-sm': 'var(--button-height-sm)',
        'button-md': 'var(--button-height-md)',
        'button-lg': 'var(--button-height-lg)',
        'button-xl': 'var(--button-height-xl)',
        'input-sm': 'var(--input-height-sm)',
        'input-md': 'var(--input-height-md)',
        'input-lg': 'var(--input-height-lg)',
        navbar: 'var(--navbar-height)',
        'navbar-lg': 'var(--navbar-height-lg)',
        'touch-target': 'var(--min-touch-target)',
      },

      // Component-specific padding
      padding: {
        'button-sm-x': 'var(--button-padding-x-sm)',
        'button-md-x': 'var(--button-padding-x-md)',
        'button-lg-x': 'var(--button-padding-x-lg)',
        'button-xl-x': 'var(--button-padding-x-xl)',
        'input-x': 'var(--input-padding-x)',
        'input-y': 'var(--input-padding-y)',
        'card-sm': 'var(--card-padding-sm)',
        'card-md': 'var(--card-padding-md)',
        'card-lg': 'var(--card-padding-lg)',
        'card-xl': 'var(--card-padding-xl)',
        'container-sm': 'var(--container-padding-sm)',
        'container-md': 'var(--container-padding-md)',
        'container-lg': 'var(--container-padding-lg)',
        'container-xl': 'var(--container-padding-xl)',
      },

      // Section spacing
      margin: {
        'section-sm': 'var(--section-spacing-sm)',
        'section-md': 'var(--section-spacing-md)',
        'section-lg': 'var(--section-spacing-lg)',
        'section-xl': 'var(--section-spacing-xl)',
        'section-2xl': 'var(--section-spacing-2xl)',
      },

      // Focus ring system
      ringWidth: {
        DEFAULT: 'var(--focus-ring-width)',
        focus: 'var(--focus-ring-width)',
      },

      ringOffsetWidth: {
        DEFAULT: 'var(--focus-ring-offset)',
        focus: 'var(--focus-ring-offset)',
      },
    },
  },

  plugins: [
    // Design System Plugin
    function ({ addUtilities, addComponents, addBase }) {
      // Semantic utilities
      addUtilities({
        // Background utilities
        '.bg-semantic-primary': {
          backgroundColor: 'hsl(var(--color-primary))',
          color: 'hsl(var(--color-primary-foreground))',
        },
        '.bg-semantic-secondary': {
          backgroundColor: 'hsl(var(--color-secondary))',
          color: 'hsl(var(--color-secondary-foreground))',
        },
        '.bg-semantic-destructive': {
          backgroundColor: 'hsl(var(--color-destructive))',
          color: 'hsl(var(--color-destructive-foreground))',
        },
        '.bg-semantic-success': {
          backgroundColor: 'hsl(var(--color-success))',
          color: 'hsl(var(--color-success-foreground))',
        },
        '.bg-semantic-warning': {
          backgroundColor: 'hsl(var(--color-warning))',
          color: 'hsl(var(--color-warning-foreground))',
        },
        '.bg-semantic-info': {
          backgroundColor: 'hsl(var(--color-info))',
          color: 'hsl(var(--color-info-foreground))',
        },
        '.bg-semantic-error': {
          backgroundColor: 'hsl(var(--color-error))',
          color: 'hsl(var(--color-error-foreground))',
        },

        // Norwegian compliance indicators
        '.nsm-open': {
          borderLeftColor: 'hsl(var(--color-nsm-open))',
          borderLeftWidth: '4px',
        },
        '.nsm-restricted': {
          borderLeftColor: 'hsl(var(--color-nsm-restricted))',
          borderLeftWidth: '4px',
        },
        '.nsm-confidential': {
          borderLeftColor: 'hsl(var(--color-nsm-confidential))',
          borderLeftWidth: '4px',
        },
        '.nsm-secret': {
          borderLeftColor: 'hsl(var(--color-nsm-secret))',
          borderLeftWidth: '4px',
        },

        // State utilities
        '.state-hover:hover': {
          transform: 'translateY(-1px)',
          boxShadow: 'var(--shadow-lg)',
          transition: 'all var(--duration-fast) var(--easing-ease-out)',
        },
        '.state-focus:focus-visible': {
          outline: 'var(--focus-ring-width) solid hsl(var(--color-ring))',
          outlineOffset: 'var(--focus-ring-offset)',
          borderRadius: 'var(--border-radius-sm)',
        },
        '.state-disabled:disabled, .state-disabled[disabled], .state-disabled[aria-disabled="true"]': {
          opacity: '0.6',
          cursor: 'not-allowed',
          pointerEvents: 'none',
        },

        // White label override utilities
        '.white-label-primary': {
          backgroundColor: 'var(--white-label-primary, hsl(var(--color-primary)))',
          color: 'var(--white-label-primary-foreground, hsl(var(--color-primary-foreground)))',
        },
        '.white-label-secondary': {
          backgroundColor: 'var(--white-label-secondary, hsl(var(--color-secondary)))',
          color: 'var(--white-label-secondary-foreground, hsl(var(--color-secondary-foreground)))',
        },
      });

      // Professional component classes
      addComponents({
        // Button component base
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--border-radius-md)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          lineHeight: 'var(--line-height-none)',
          textDecoration: 'none',
          transition: 'all var(--duration-fast) var(--easing-ease-out)',
          cursor: 'pointer',
          border: 'var(--border-width-1) solid transparent',
          minHeight: 'var(--min-touch-target)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          '&:focus-visible': {
            outline: 'var(--focus-ring-width) solid hsl(var(--color-ring))',
            outlineOffset: 'var(--focus-ring-offset)',
          },
          '&:disabled, &[disabled], &[aria-disabled="true"]': {
            opacity: '0.6',
            cursor: 'not-allowed',
            pointerEvents: 'none',
          },
        },

        // Button sizes
        '.btn-sm': {
          height: 'var(--button-height-sm)',
          paddingLeft: 'var(--button-padding-x-sm)',
          paddingRight: 'var(--button-padding-x-sm)',
          fontSize: 'var(--font-size-xs)',
        },
        '.btn-md': {
          height: 'var(--button-height-md)',
          paddingLeft: 'var(--button-padding-x-md)',
          paddingRight: 'var(--button-padding-x-md)',
        },
        '.btn-lg': {
          height: 'var(--button-height-lg)',
          paddingLeft: 'var(--button-padding-x-lg)',
          paddingRight: 'var(--button-padding-x-lg)',
          fontSize: 'var(--font-size-base)',
        },
        '.btn-xl': {
          height: 'var(--button-height-xl)',
          paddingLeft: 'var(--button-padding-x-xl)',
          paddingRight: 'var(--button-padding-x-xl)',
          fontSize: 'var(--font-size-lg)',
        },

        // Input component base
        '.input': {
          display: 'flex',
          width: '100%',
          borderRadius: 'var(--border-radius-md)',
          border: 'var(--border-width-1) solid hsl(var(--color-border))',
          backgroundColor: 'hsl(var(--color-input))',
          paddingLeft: 'var(--input-padding-x)',
          paddingRight: 'var(--input-padding-x)',
          paddingTop: 'var(--input-padding-y)',
          paddingBottom: 'var(--input-padding-y)',
          fontSize: 'var(--font-size-sm)',
          lineHeight: 'var(--line-height-normal)',
          color: 'hsl(var(--color-foreground))',
          transition: 'all var(--duration-fast) var(--easing-ease-out)',
          minHeight: 'var(--min-touch-target)',
          '&:focus': {
            outline: 'none',
            borderColor: 'hsl(var(--color-ring))',
            boxShadow: '0 0 0 var(--focus-ring-width) hsl(var(--color-ring) / 0.2)',
          },
          '&:disabled, &[disabled]': {
            opacity: '0.6',
            cursor: 'not-allowed',
          },
          '&::placeholder': {
            color: 'hsl(var(--color-muted-foreground))',
          },
        },

        // Card component base
        '.card': {
          borderRadius: 'var(--border-radius-lg)',
          border: 'var(--border-width-1) solid hsl(var(--color-border))',
          backgroundColor: 'hsl(var(--color-card))',
          color: 'hsl(var(--color-card-foreground))',
          boxShadow: 'var(--shadow-sm)',
          padding: 'var(--card-padding-md)',
        },

        // Professional container
        '.container-professional': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'var(--container-padding-md)',
          paddingRight: 'var(--container-padding-md)',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
            paddingLeft: 'var(--container-padding-lg)',
            paddingRight: 'var(--container-padding-lg)',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1280px',
            paddingLeft: 'var(--container-padding-xl)',
            paddingRight: 'var(--container-padding-xl)',
          },
          '@screen 2xl': {
            maxWidth: '1400px',
          },
        },
      });
    },
  ],
};