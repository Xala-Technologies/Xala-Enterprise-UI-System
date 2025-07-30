/**
 * Tum Tum Sahour Theme
 * A theme inspired by pre-dawn ritual of sahour and viral rhythmic celebration
 * 
 * This theme demonstrates the flexibility of the Xala UI System v5.0.0
 * token architecture for white-labeling and theme customization
 */

import { baseTokens, type TokenSystem } from '../base';
import { mergeDeep } from '@/utils/objects';

/**
 * Dawn Colors palette from Tum Tum Sahour theme
 */
const dawnColors = {
  fajrBlue: '#1e3a5f',     // Deep pre-dawn sky
  dawnBlush: '#ff6b9d',    // First light on horizon
  morningGold: '#ffa726',  // Rising sun warmth
  twilightPurple: '#7e57c2', // Mystical early hours
  skyWhisper: '#e3f2fd',   // Gentle morning light
};

/**
 * Warmth & Community palette
 */
const warmthColors = {
  hearthOrange: '#ff8a50',   // Gathering warmth
  comfortAmber: '#ffb74d',   // Nourishing meal tones
  familyTerracotta: '#a1887f', // Earthen stability
  sacredCream: '#fff8e1',    // Pure intentions
  unityBeige: '#efebe9',     // Communal harmony
};

/**
 * Spiritual Depths palette
 */
const spiritualColors = {
  devotionIndigo: '#3f51b5',  // Deep contemplation
  prayerGreen: '#2e7d32',     // Growing faith
  reflectionNavy: '#1a237e',  // Quiet meditation
  blessingSilver: '#90a4ae',  // Divine grace
  peaceIvory: '#fafafa',      // Serene preparation
};

/**
 * Tum Tum Sahour theme tokens
 * Extends and overrides the base tokens
 */
export const tumTumSahourTheme: TokenSystem = mergeDeep({}, baseTokens, {
  colors: {
    // Override primary colors with Dawn palette
    primary: {
      50: '#e3f2fd',  // skyWhisper
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#ff6b9d',  // dawnBlush as primary default
      600: '#e91e63',
      700: '#d81b60',
      800: '#c2185b',
      900: '#1e3a5f',  // fajrBlue
      1000: '#0f1e2f',  // deepFajr
    },
    
    // Override secondary colors with Spiritual palette
    secondary: {
      50: '#e8eaf6',
      100: '#c5cae9',
      200: '#9fa8da',
      300: '#7986cb',
      400: '#5c6bc0',
      500: '#3f51b5',  // devotionIndigo as secondary default
      600: '#3949ab',
      700: '#303f9f',
      800: '#283593',
      900: '#1a237e',  // reflectionNavy
      1000: '#0a0f2a',  // deepReflection
    },
    
    // Override success with Spiritual
    success: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#2e7d32',  // prayerGreen
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20',
      1000: '#0a1a0a',  // deepPrayer
    },
    
    // Override warning with Warmth
    warning: {
      50: '#fff8e1',  // sacredCream
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffa726',  // morningGold
      600: '#ff8a50',  // hearthOrange
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00',
      1000: '#331800',
    },
    
    // Semantic color assignments
    background: {
      light: spiritualColors.peaceIvory,
      dark: dawnColors.fajrBlue,
    },
    foreground: {
      light: spiritualColors.devotionIndigo,
      dark: warmthColors.sacredCream,
    },
    border: {
      light: warmthColors.unityBeige,
      dark: dawnColors.twilightPurple,
    },
    surface: {
      light: warmthColors.sacredCream,
      dark: '#2a3c52', // Darker variant of fajrBlue
    },
    surfaceAlt: {
      light: warmthColors.unityBeige,
      dark: '#243447', // Even darker variant of fajrBlue
    }
  },

  /**
   * Typography
   */
  typography: {
    // Font families
    families: {
      primary: '"Amiri", "Times New Roman", serif', // Arabic-inspired elegance
      secondary: '"Nunito", "Helvetica Neue", sans-serif', // Modern, friendly
      mono: '"Fira Code", "Consolas", monospace', // Technical precision
    },
    // Font weights
    weights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '900',
    },
  },

  /**
   * Border radius - more organic curves
   */
  radius: {
    none: '0',
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
    organic: '0.25rem 0.75rem 0.25rem 0.75rem', // Asymmetric flow
  },

  /**
   * Shadows - more mystical and warm
   */
  shadows: {
    none: 'none',
    xs: `0 1px 2px rgba(${dawnColors.fajrBlue}, 0.05)`,
    sm: `0 1px 3px rgba(${dawnColors.fajrBlue}, 0.1), 0 1px 2px rgba(${dawnColors.fajrBlue}, 0.06)`,
    md: `0 4px 6px rgba(${dawnColors.fajrBlue}, 0.07), 0 2px 4px rgba(${dawnColors.fajrBlue}, 0.06)`,
    lg: `0 10px 15px rgba(${dawnColors.fajrBlue}, 0.1), 0 4px 6px rgba(${dawnColors.fajrBlue}, 0.05)`,
    xl: `0 20px 25px rgba(${dawnColors.fajrBlue}, 0.1), 0 10px 10px rgba(${dawnColors.fajrBlue}, 0.04)`,
    '2xl': `0 25px 50px rgba(${spiritualColors.devotionIndigo}, 0.15), 0 0 30px rgba(${dawnColors.dawnBlush}, 0.1)`,
    inner: `inset 0 2px 4px rgba(${dawnColors.fajrBlue}, 0.06)`,
  },

  /**
   * Motion - more rhythmic
   */
  motion: {
    ease: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',     // Gentle awakening
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth flow
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy beat
      sacred: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Divine movement
    },
    duration: {
      instant: '150ms',
      fast: '250ms',
      normal: '350ms',
      slow: '500ms',
      sacred: '750ms',
      prayer: '1200ms',
    },
  },

  /**
   * Component tokens
   */
  components: {
    button: {
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
      },
      borderRadius: {
        sm: 'radius.sm',
        md: 'radius.md',
        lg: 'radius.lg',
        organic: 'radius.organic',
      },
    },
    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      radius: '0.75rem', // More generous curves
      borderWidth: '1px',
      gradients: {
        dawn: `linear-gradient(135deg, ${dawnColors.skyWhisper}, ${dawnColors.dawnBlush})`,
        sacred: `linear-gradient(135deg, ${spiritualColors.devotionIndigo}, ${spiritualColors.prayerGreen})`,
        warmth: `linear-gradient(135deg, ${warmthColors.hearthOrange}, ${warmthColors.comfortAmber})`,
      }
    }
  },
}) as any as TokenSystem;

/**
 * Export as default
 */
export default tumTumSahourTheme;
