/**
 * @fileoverview Layout component type definitions
 * @module LayoutTypes
 */

import type { ReactNode } from 'react';
import type { ComponentProps } from '../lib/types/core.types';

// Base layout component props
export interface LayoutComponentProps extends ComponentProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  background?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
}

// PageLayout props - top-level page structure
export interface PageLayoutProps extends LayoutComponentProps {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  variant?: 'government' | 'municipal' | 'modern';
  municipality?: 'drammen' | 'oslo' | 'bergen' | 'trondheim' | 'stavanger';
  fullWidth?: boolean;
}

// Section props - semantic page sections
export interface SectionProps extends LayoutComponentProps {
  children?: ReactNode;
  as?: 'section' | 'article' | 'aside' | 'nav' | 'header' | 'footer' | 'main';
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// Container props - content containers with Norwegian standards
export interface ContainerProps extends LayoutComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
  maxWidth?: string | number;
  centerContent?: boolean;
  responsive?: boolean;
  accessibilityMode?: boolean;
  norwegianMaxWidth?: boolean;
  norwegian?: {
    maxWidth?: boolean; // Follow Norwegian content width guidelines
    accessibility?: boolean; // WCAG 2.2 AA spacing
  };
}

// Grid props - CSS Grid layout
export interface GridProps extends LayoutComponentProps {
  columns?: number | 'auto' | 'fit';
  rows?: number | 'auto';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around';
}

// Stack props - Flexbox vertical/horizontal stacking
export interface StackProps extends LayoutComponentProps {
  direction?: 'row' | 'column';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  reverse?: boolean;
}

// Card props - content cards with Norwegian metadata
export interface CardProps extends LayoutComponentProps {
  children?: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'government' | 'municipal';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'official' | 'municipal';
  header?: ReactNode;
  footer?: ReactNode;
  metadata?: {
    lastUpdated?: string;
    municipality?: string;
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    compliance?: string[];
  };
  interactive?: boolean; // For hover effects
}

// Norwegian-specific layout enhancements
export interface NorwegianLayoutProps {
  language?: 'nb' | 'nn' | 'en';
  municipality?: 'drammen' | 'oslo' | 'bergen' | 'trondheim' | 'stavanger';
  accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
}

// Responsive breakpoint types
export interface ResponsiveProps<T = unknown> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
}

// CSS-in-JS style object type for design tokens
export interface TokenizedStyles {
  [key: string]: string | number | TokenizedStyles;
}
