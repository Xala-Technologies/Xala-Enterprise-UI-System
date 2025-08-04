/**
 * @fileoverview Action feedback component type definitions
 * @module ActionFeedbackTypes
 */

import type React from 'react';

import type { ComponentProps } from '../lib/types/core.types';

// Base action feedback component props
export interface ActionFeedbackComponentProps extends ComponentProps {
  disabled?: boolean;
  loading?: boolean;
  accessibility?: {
    level?: 'WCAG_2_1_AA' | 'WCAG_2_1_AAA' | 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    announceChanges?: boolean;
    highContrast?: boolean;
    reduceMotion?: boolean;
    confirmationRequired?: boolean;
    auditLog?: boolean;
  };
}

// Button component props
export interface ButtonProps extends ActionFeedbackComponentProps {
  label?: string; // Button text
  children?: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'ghost'
    | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'pill' | 'square';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset';
  features?: {
    actionType?: 'safe' | 'destructive' | 'neutral';
    requiresConfirmation?: boolean;
    confirmationMessage?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
   
  onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Modal component props
export interface ModalProps extends ActionFeedbackComponentProps {
  isOpen: boolean;
  title?: string; // Modal title text
  titleKey?: string; // Translation key for title
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  closable?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  showOverlay?: boolean;
  scrollable?: boolean; // Allow modal content to scroll
  persistent?: boolean; // Prevent closing by clicking outside
  norwegian?: NorwegianFeedbackConfig; // Norwegian compliance configuration
  ariaLabel?: string; // Accessibility label
  features?: {
    scrollable?: boolean;
    autoFocus?: boolean;
    trapFocus?: boolean;
    lockScroll?: boolean;
  };
  onOpen?: () => void;
  onClose?: () => void;
  onEscapeKey?: () => void;
  onOverlayClick?: () => void;
}

// Drawer component props
export interface DrawerProps extends ActionFeedbackComponentProps {
  isOpen: boolean;
  title?: string; // Drawer title text
  children: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  showOverlay?: boolean;
  features?: {
    resizable?: boolean;
    collapsible?: boolean;
    autoFocus?: boolean;
    trapFocus?: boolean;
    lockScroll?: boolean;
  };
  onOpen?: () => void;
  onClose?: () => void;
  onEscapeKey?: () => void;
  onOverlayClick?: () => void;
}

// Toast component props
export interface ToastProps extends ActionFeedbackComponentProps {
  /** Controls toast visibility (for pure component state management) */
  isVisible?: boolean;
  /** Controls pause state (for pure component state management) */
  isPaused?: boolean;
  /** Callback when visibility changes */
  onVisibilityChange?: (_visible: boolean) => void;
  /** Callback when pause state changes */
  onPauseChange?: (_paused: boolean) => void;
  /** Toast message text */
  message?: string;
  /** Toast title text */
  title?: string;
  /** i18n key for toast title */
  titleKey?: string;
  /** i18n key for toast message */
  messageKey?: string;
  /** Custom icon for the toast */
  icon?: React.ReactNode;
  /** Toast variant */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Auto-dismiss duration in milliseconds */
  duration?: number;
  /** Toast open/close state */
  isOpen?: boolean;
  /** Toast position on screen */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  /** Show close button */
  closable?: boolean;
  /** Prevent auto-dismiss */
  persistent?: boolean;
  /** Pause auto-dismiss on hover */
  pauseOnHover?: boolean;
  /** Toast children (custom content) */
  children?: React.ReactNode;
  /** Action buttons for the toast */
  actions?: Array<{ labelKey: string; handler: () => void }>;
  /** Norwegian compliance metadata */
  norwegian?: {
    priority?: 'low' | 'medium' | 'high' | 'critical';
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  };
  /** Test id for testing */
  testId?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Called when toast closes */
  onClose?: () => void;
  /** Called when toast opens */
  onOpen?: () => void;
  /** Called when an action button is clicked */
   
  onActionClick?: (_action: { labelKey: string; handler: () => void }) => void;
}

// Toast action configuration
export interface ToastAction {
  label: string; // Action button text
  handler: () => void;
  variant?: 'default' | 'primary' | 'secondary';
}

// Alert component props
export interface AlertProps extends ActionFeedbackComponentProps {
  title?: string; // Alert title text
  message?: string; // Alert message text
  children?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  closable?: boolean;
  actions?: AlertAction[];
  features?: {
    showIcon?: boolean;
    showTimestamp?: boolean;
    collapsible?: boolean;
    persistent?: boolean;
    requiresAcknowledgment?: boolean;
  };
  onClose?: () => void;
   
  onAction?: (_action: AlertAction) => void;
}

// Alert action configuration
export interface AlertAction {
  label: string; // Action button text
  handler: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  features?: {
    actionType?: 'safe' | 'destructive' | 'neutral';
    requiresConfirmation?: boolean;
  };
}

// Confirmation modal props (specialized modal)
export interface ConfirmationModalProps extends Omit<ModalProps, 'children' | 'features'> {
  message?: string; // Confirmation message text
  confirmButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
  variant?: 'default' | 'danger' | 'warning';
  features?: ModalProps['features'] & {
    actionDescription?: string;
    consequenceWarning?: string;
    typedConfirmation?: boolean;
    confirmationText?: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

// Loading overlay props
export interface LoadingOverlayProps extends ComponentProps {
  _visible: boolean;
  message?: string; // Loading message text
  progress?: number; // Progress percentage (0-100)
  size?: 'sm' | 'md' | 'lg';
  blur?: boolean; // Blur background content
  features?: {
    announceProgress?: boolean;
    progressMessage?: string;
    category?: 'data' | 'form' | 'navigation' | 'system';
    showSpinner?: boolean;
    showProgress?: boolean;
  };
}

// Status indicator props
export interface StatusBannerProps extends ComponentProps {
  status: 'online' | 'offline' | 'maintenance' | 'degraded' | 'operational';
  message?: string; // Status message text
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  showIcon?: boolean;
  features?: {
    serviceLevel?: 'critical' | 'important' | 'standard' | 'low';
    estimatedResolution?: string;
    contactInformation?: string;
    showStatusHistory?: boolean;
  };
  onDismiss?: () => void;
}

// Notification component props
export interface NotificationProps extends ActionFeedbackComponentProps {
  title?: string;
  message?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  closable?: boolean;
  actions?: NotificationAction[];
  features?: {
    showTimestamp?: boolean;
    showAvatar?: boolean;
    showProgress?: boolean;
    persistent?: boolean;
    groupable?: boolean;
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
  onClose?: () => void;
   
  onAction?: (_action: NotificationAction) => void;
}

// Notification action configuration
export interface NotificationAction {
  id: string;
  label: string;
  handler: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  features?: {
    actionGroup?: 'primary' | 'secondary' | 'destructive';
    requiresConfirmation?: boolean;
  };
}

// Progress indicator for long-running actions
export interface ProgressIndicatorProps extends ComponentProps {
  value?: number; // Progress value (0-100)
  indeterminate?: boolean; // Indeterminate progress
  label?: string; // Progress label text
  size?: 'sm' | 'md' | 'lg';
  variant?: 'linear' | 'circular';
  showPercentage?: boolean;
  features?: {
    announceProgress?: boolean;
    progressFormat?: 'percentage' | 'fraction' | 'time';
    category?: 'upload' | 'download' | 'processing' | 'validation';
    showTimeRemaining?: boolean;
    showSpeed?: boolean;
  };
}

// Button group props
export interface ButtonGroupProps extends ComponentProps {
  buttons: ButtonProps[];
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

// Norwegian feedback configuration
export interface NorwegianFeedbackConfig {
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  category?: string;
  municipality?: string; // Norwegian municipality context
  complianceLevel?: 'NSM' | 'DigDir' | 'WCAG_2_2_AAA';
  auditRequired?: boolean;
  auditLog?: boolean; // Audit logging enabled
  language?: 'no' | 'nb' | 'nn' | 'en';
  showClassification?: boolean; // Show classification indicator
  dateFormat?: string; // Date format for Norwegian locale
  exportFormat?: string; // Export format for Norwegian data
  includeClassificationHeader?: boolean; // Include classification in export headers
  paginationLanguage?: string; // Language for pagination text
  
  // Data masking and privacy
  maskPersonalNumbers?: boolean; // Mask Norwegian personal numbers
  showRowClassification?: boolean; // Show classification on table rows
  inheritMaxClassification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  
  // Column-level data properties
  personalData?: boolean; // Mark column as containing personal data
  publicData?: boolean; // Mark column as containing public data
  nsmLevel?: boolean; // Mark column as NSM classification level
  masking?: boolean; // Enable masking for this column
  
  // GDPR compliance
  gdprCompliance?: {
    personalDataColumns?: string[];
    processingBasis?: string;
    retentionPeriod?: string;
    showDataSubjectRights?: boolean;
    contactDPO?: string;
  };
  
  // Sorting and interaction
  sortingLocale?: string;
  norwegianCollation?: boolean;
  
  // Row editing
  editableRows?: boolean;
  editPermissions?: string[];
}

// Norwegian action context
export interface NorwegianActionContext {
  classification: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  category: string;
  userRole?: string;
  permissions?: string[];
  auditLog?: boolean;
}

// Action feedback types union
export type ActionFeedbackTypes = 
  | 'button'
  | 'modal'
  | 'toast'
  | 'alert'
  | 'progress'
  | 'buttonGroup';
