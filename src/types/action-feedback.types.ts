// Action & Feedback types for @xala-mock/ui-system
// Norwegian-compliant interactive component types

import { ComponentProps } from './index';

// Base action feedback component props
export interface ActionFeedbackComponentProps extends ComponentProps {
  disabled?: boolean;
  loading?: boolean;
  norwegian?: {
    accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    municipality?: string;
    confirmationRequired?: boolean;
    auditLog?: boolean;
  };
}

// Button component props with Norwegian features
export interface ButtonProps extends ActionFeedbackComponentProps {
  labelKey?: string; // Localization key for button text
  children?: any;
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
  icon?: any;
  iconPosition?: 'left' | 'right';
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset';
  norwegian?: ActionFeedbackComponentProps['norwegian'] & {
    actionType?: 'safe' | 'destructive' | 'neutral';
    requiresConfirmation?: boolean;
    confirmationMessageKey?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
  onClick?: (event: any) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Modal component props
export interface ModalProps extends ActionFeedbackComponentProps {
  isOpen: boolean;
  titleKey?: string; // Localization key for modal title
  title?: string;
  children: any;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  closable?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  showOverlay?: boolean;
  persistent?: boolean;
  scrollable?: boolean;
  norwegian?: ActionFeedbackComponentProps['norwegian'] & {
    category?: 'form' | 'confirmation' | 'information' | 'warning' | 'error';
    closeConfirmationRequired?: boolean;
    closeConfirmationMessageKey?: string;
    focusTrap?: boolean;
    announceOnOpen?: boolean;
    announceMessageKey?: string;
  };
  onOpen?: () => void;
  onClose?: () => void;
  onEscapeKey?: () => void;
  onOverlayClick?: () => void;
}

// Drawer component props
export interface DrawerProps extends ActionFeedbackComponentProps {
  isOpen: boolean;
  titleKey?: string; // Localization key for drawer title
  title?: string;
  children: any;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  showOverlay?: boolean;
  persistent?: boolean;
  push?: boolean; // Push content instead of overlay
  norwegian?: ActionFeedbackComponentProps['norwegian'] & {
    navigationRole?: 'primary' | 'secondary' | 'contextual';
    mobileOptimized?: boolean;
    swipeToClose?: boolean;
    announceOnOpen?: boolean;
    announceMessageKey?: string;
  };
  onOpen?: () => void;
  onClose?: () => void;
  onEscapeKey?: () => void;
  onOverlayClick?: () => void;
}

// Toast component props
export interface ToastProps extends ActionFeedbackComponentProps {
  messageKey?: string; // Localization key for toast message
  message?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number; // Auto-dismiss duration in milliseconds
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  persistent?: boolean; // Don't auto-dismiss
  closable?: boolean;
  icon?: any;
  action?: ToastAction;
  norwegian?: ActionFeedbackComponentProps['norwegian'] & {
    priority?: 'low' | 'medium' | 'high' | 'critical';
    announceToScreenReader?: boolean;
    category?: 'system' | 'user' | 'process' | 'security' | 'validation';
    retryAction?: boolean;
    undoAction?: boolean;
  };
  onClose?: () => void;
  onAction?: () => void;
}

// Toast action configuration
export interface ToastAction {
  labelKey: string; // Localization key for action button
  handler: () => void;
  variant?: 'default' | 'primary' | 'secondary';
}

// Alert component props
export interface AlertProps extends ActionFeedbackComponentProps {
  titleKey?: string; // Localization key for alert title
  messageKey?: string; // Localization key for alert message
  title?: string;
  message?: string;
  children?: any;
  variant?: 'info' | 'success' | 'warning' | 'error';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  closable?: boolean;
  icon?: any;
  actions?: AlertAction[];
  norwegian?: ActionFeedbackComponentProps['norwegian'] & {
    category?: 'system' | 'validation' | 'security' | 'process' | 'user';
    requiresAcknowledgment?: boolean;
    acknowledgmentMessageKey?: string;
    escalationLevel?: 'info' | 'warning' | 'critical' | 'emergency';
    relatedDocumentationKey?: string;
  };
  onClose?: () => void;
  onAcknowledge?: () => void;
}

// Alert action configuration
export interface AlertAction {
  labelKey: string; // Localization key for action button
  handler: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  norwegian?: {
    actionType?: 'safe' | 'destructive' | 'neutral';
    requiresConfirmation?: boolean;
  };
}

// Confirmation modal props (specialized modal)
export interface ConfirmationModalProps extends Omit<ModalProps, 'children'> {
  messageKey?: string; // Localization key for confirmation message
  message?: string;
  confirmButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
  variant?: 'default' | 'danger' | 'warning';
  norwegian?: ModalProps['norwegian'] & {
    actionDescription?: string;
    consequenceWarningKey?: string;
    requiresTypedConfirmation?: boolean;
    confirmationText?: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

// Loading overlay props
export interface LoadingOverlayProps extends ComponentProps {
  visible: boolean;
  messageKey?: string; // Localization key for loading message
  message?: string;
  progress?: number; // Progress percentage (0-100)
  size?: 'sm' | 'md' | 'lg';
  blur?: boolean; // Blur background content
  norwegian?: {
    accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    announceProgress?: boolean;
    progressMessageKey?: string;
    category?: 'data' | 'form' | 'navigation' | 'system';
  };
}

// Status indicator props for Norwegian compliance
export interface StatusBannerProps extends ComponentProps {
  status: 'online' | 'offline' | 'maintenance' | 'degraded' | 'operational';
  messageKey?: string; // Localization key for status message
  message?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  showIcon?: boolean;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    serviceLevel?: 'critical' | 'important' | 'standard' | 'low';
    municipality?: string;
    estimatedResolutionKey?: string;
    contactInformationKey?: string;
  };
  onDismiss?: () => void;
}

// Norwegian feedback types
export interface NorwegianFeedbackConfig {
  enableAuditLogging: boolean;
  requireConfirmationFor: ('destructive' | 'sensitive' | 'financial')[];
  classificationLevels: ('ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG')[];
  accessibilityLevel: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
  municipality?: string;
  defaultLanguage: 'nb-NO' | 'nn-NO' | 'en-NO';
}

// Button group component for related actions
export interface ButtonGroupProps extends ComponentProps {
  children: any;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  connected?: boolean; // Visually connected buttons
  size?: 'sm' | 'md' | 'lg';
  norwegian?: {
    accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    actionGroup?: 'primary' | 'secondary' | 'destructive';
    requiresConfirmation?: boolean;
  };
}

// Progress indicator for long-running actions
export interface ProgressIndicatorProps extends ComponentProps {
  value?: number; // Progress value (0-100)
  indeterminate?: boolean; // Indeterminate progress
  labelKey?: string; // Localization key for progress label
  size?: 'sm' | 'md' | 'lg';
  variant?: 'linear' | 'circular';
  showPercentage?: boolean;
  norwegian?: {
    accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    announceProgress?: boolean;
    progressFormat?: 'percentage' | 'fraction' | 'time';
    category?: 'upload' | 'download' | 'processing' | 'validation';
  };
}

// Feedback sound configuration for Norwegian accessibility
export interface NorwegianSoundConfig {
  enabled: boolean;
  volume: number; // 0-1
  sounds: {
    success: string;
    error: string;
    warning: string;
    info: string;
    button: string;
    notification: string;
  };
  respectSystemSettings: boolean;
}

// Norwegian action context for audit logging
export interface NorwegianActionContext {
  userId?: string;
  sessionId?: string;
  municipality?: string;
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  timestamp: Date;
  actionType: string;
  actionDetails?: Record<string, any>;
  userAgent?: string;
  ipAddress?: string;
}

// Export type for all action feedback types
export type ActionFeedbackTypes =
  | ButtonProps
  | ModalProps
  | DrawerProps
  | ToastProps
  | AlertProps
  | ConfirmationModalProps
  | LoadingOverlayProps
  | StatusBannerProps
  | ButtonGroupProps
  | ProgressIndicatorProps;
