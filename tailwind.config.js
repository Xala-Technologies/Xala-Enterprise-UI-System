/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './docs/**/*.{js,ts,jsx,tsx,md,mdx}',
    './examples/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    // Remove default Tailwind colors and use CSS custom properties
    colors: {
      // Semantic colors using CSS custom properties
      background: 'hsl(var(--color-background))',
      foreground: 'hsl(var(--color-foreground))',
      card: {
        DEFAULT: 'hsl(var(--color-card))',
        foreground: 'hsl(var(--color-card-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--color-popover))',
        foreground: 'hsl(var(--color-popover-foreground))',
      },
      primary: {
        DEFAULT: 'hsl(var(--color-primary))',
        foreground: 'hsl(var(--color-primary-foreground))',
        hover: 'hsl(var(--color-primary-hover))',
        active: 'hsl(var(--color-primary-active))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--color-secondary))',
        foreground: 'hsl(var(--color-secondary-foreground))',
        hover: 'hsl(var(--color-secondary-hover))',
        active: 'hsl(var(--color-secondary-active))',
      },
      muted: {
        DEFAULT: 'hsl(var(--color-muted))',
        foreground: 'hsl(var(--color-muted-foreground))',
        hover: 'hsl(var(--color-muted-hover))',
      },
      accent: {
        DEFAULT: 'hsl(var(--color-accent))',
        foreground: 'hsl(var(--color-accent-foreground))',
        hover: 'hsl(var(--color-accent-hover))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--color-destructive))',
        foreground: 'hsl(var(--color-destructive-foreground))',
        hover: 'hsl(var(--color-destructive-hover))',
        active: 'hsl(var(--color-destructive-active))',
      },
      success: {
        DEFAULT: 'hsl(var(--color-success))',
        foreground: 'hsl(var(--color-success-foreground))',
        hover: 'hsl(var(--color-success-hover))',
        muted: 'hsl(var(--color-success-muted))',
      },
      warning: {
        DEFAULT: 'hsl(var(--color-warning))',
        foreground: 'hsl(var(--color-warning-foreground))',
        hover: 'hsl(var(--color-warning-hover))',
        muted: 'hsl(var(--color-warning-muted))',
      },
      info: {
        DEFAULT: 'hsl(var(--color-info))',
        foreground: 'hsl(var(--color-info-foreground))',
        hover: 'hsl(var(--color-info-hover))',
        muted: 'hsl(var(--color-info-muted))',
      },
      error: {
        DEFAULT: 'hsl(var(--color-error))',
        foreground: 'hsl(var(--color-error-foreground))',
        hover: 'hsl(var(--color-error-hover))',
        muted: 'hsl(var(--color-error-muted))',
      },
      border: 'hsl(var(--color-border))',
      input: 'hsl(var(--color-input))',
      ring: 'hsl(var(--color-ring))',
      // Text colors
      text: {
        primary: 'hsl(var(--color-text-primary))',
        secondary: 'hsl(var(--color-text-secondary))',
        muted: 'hsl(var(--color-text-muted))',
        disabled: 'hsl(var(--color-text-disabled))',
      },
      // Norwegian compliance colors
      nsm: {
        open: 'hsl(var(--color-nsm-open))',
        restricted: 'hsl(var(--color-nsm-restricted))',
        confidential: 'hsl(var(--color-nsm-confidential))',
        secret: 'hsl(var(--color-nsm-secret))',
      },
      // Primitive colors (for advanced use cases)
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
    },
    // Spacing using CSS custom properties (8pt grid)
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
    // Typography using CSS custom properties
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
    // Border radius using CSS custom properties
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
    // Border width using CSS custom properties
    borderWidth: {
      DEFAULT: 'var(--border-width-1)',
      0: 'var(--border-width-0)',
      1: 'var(--border-width-1)',
      2: 'var(--border-width-2)',
      4: 'var(--border-width-4)',
      8: 'var(--border-width-8)',
    },
    // Box shadow using CSS custom properties
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
    // Animation duration using CSS custom properties
    transitionDuration: {
      instant: 'var(--duration-instant)',
      fast: 'var(--duration-fast)',
      DEFAULT: 'var(--duration-normal)',
      normal: 'var(--duration-normal)',
      slow: 'var(--duration-slow)',
      slower: 'var(--duration-slower)',
      slowest: 'var(--duration-slowest)',
    },
    // Animation timing functions
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
    // Z-index using CSS custom properties
    zIndex: {
      hide: 'var(--z-hide)',
      auto: 'auto',
      0: 'var(--z-base)',
      10: 'var(--z-docked)',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
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
    // Breakpoints using CSS custom properties
    screens: {
      xs: 'var(--breakpoint-xs)',
      sm: 'var(--breakpoint-sm)',
      md: 'var(--breakpoint-md)',
      lg: 'var(--breakpoint-lg)',
      xl: 'var(--breakpoint-xl)',
      '2xl': 'var(--breakpoint-2xl)',
    },
    // Component-specific sizing
    height: {
      auto: 'auto',
      // Button heights
      'button-sm': 'var(--button-height-sm)',
      'button-md': 'var(--button-height-md)',
      'button-lg': 'var(--button-height-lg)',
      'button-xl': 'var(--button-height-xl)',
      // Input heights
      'input-sm': 'var(--input-height-sm)',
      'input-md': 'var(--input-height-md)',
      'input-lg': 'var(--input-height-lg)',
      // Navbar heights
      navbar: 'var(--navbar-height)',
      'navbar-lg': 'var(--navbar-height-lg)',
      // Minimum touch target
      'touch-target': 'var(--min-touch-target)',
    },
    extend: {
      // Extend with component-specific utilities
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
      margin: {
        'section-sm': 'var(--section-spacing-sm)',
        'section-md': 'var(--section-spacing-md)',
        'section-lg': 'var(--section-spacing-lg)',
        'section-xl': 'var(--section-spacing-xl)',
        'section-2xl': 'var(--section-spacing-2xl)',
      },
      // Ring utilities for focus states
      ringWidth: {
        DEFAULT: 'var(--focus-ring-width)',
        focus: 'var(--focus-ring-width)',
      },
      ringOffsetWidth: {
        DEFAULT: 'var(--focus-ring-offset)',
        focus: 'var(--focus-ring-offset)',
      },
      // Animation keyframes
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-down': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      animation: {
        spin: 'spin 1s var(--easing-linear) infinite',
        ping: 'ping 1s var(--easing-ease-in-out) infinite',
        pulse: 'pulse 2s var(--easing-ease-in-out) infinite',
        bounce: 'bounce 1s infinite',
        'fade-in': 'fade-in var(--duration-normal) var(--easing-ease-out)',
        'fade-out': 'fade-out var(--duration-normal) var(--easing-ease-in)',
        'slide-in-down': 'slide-in-down var(--duration-normal) var(--easing-ease-out)',
        'slide-in-up': 'slide-in-up var(--duration-normal) var(--easing-ease-out)',
        'slide-in-left': 'slide-in-left var(--duration-normal) var(--easing-ease-out)',
        'slide-in-right': 'slide-in-right var(--duration-normal) var(--easing-ease-out)',
        'scale-in': 'scale-in var(--duration-fast) var(--easing-ease-out)',
        'scale-out': 'scale-out var(--duration-fast) var(--easing-ease-in)',
      },
    },
  },
  plugins: [
    // Custom plugin for semantic utilities
    function ({ addUtilities, addComponents, addBase, theme }) {
      // Add semantic color utilities
      addUtilities({
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
      });

      // Add Norwegian compliance utilities
      addUtilities({
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
      });

      // Add component state utilities
      addUtilities({
        '.state-hover': {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all var(--duration-fast) var(--easing-ease-out)',
          },
        },
        '.state-focus': {
          '&:focus-visible': {
            outline: 'var(--focus-ring-width) solid hsl(var(--color-ring))',
            outlineOffset: 'var(--focus-ring-offset)',
            borderRadius: 'var(--border-radius-sm)',
          },
        },
        '.state-disabled': {
          '&:disabled, &[disabled], &[aria-disabled="true"]': {
            opacity: '0.6',
            cursor: 'not-allowed',
            pointerEvents: 'none',
          },
        },
        '.state-loading': {
          position: 'relative',
          color: 'transparent',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'inherit',
            color: 'currentColor',
            animation: 'spin 1s var(--easing-linear) infinite',
          },
        },
      });

      // Add professional component base styles
      addComponents({
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
          '&:focus-visible': {
            outline: 'var(--focus-ring-width) solid hsl(var(--color-ring))',
            outlineOffset: 'var(--focus-ring-offset)',
          },
          '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed',
            pointerEvents: 'none',
          },
        },
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
          '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed',
          },
          '&::placeholder': {
            color: 'hsl(var(--color-muted-foreground))',
          },
        },
        '.card': {
          borderRadius: 'var(--border-radius-lg)',
          border: 'var(--border-width-1) solid hsl(var(--color-border))',
          backgroundColor: 'hsl(var(--color-card))',
          color: 'hsl(var(--color-card-foreground))',
          boxShadow: 'var(--shadow-sm)',
          padding: 'var(--card-padding-md)',
        },
      });
    },
  ],
};