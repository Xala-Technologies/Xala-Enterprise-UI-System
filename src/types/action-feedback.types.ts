/**
 * @fileoverview Action feedback component type definitions
 * @module ActionFeedbackTypes
 */

import type React from 'react';

import type { ComponentProps } from '../lib/types/core.types';

// Base action feedback component props
export interface ActionFeedbackComponentProps extends ComponentProps { disabled?: boolean;
  loading?: boolean;
  accessibility?: { level?: 'WCAG_2_1_AA' | 'WCAG_2_1_AAA' | 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    announceChanges?: boolean;
    highContrast?: boolean;
    reduceMotion?: boolean;
    confirmationRequired?: boolean;
    auditLog?: boolean; }; }

// Button component props
export interface ButtonProps extends ActionFeedbackComponentProps { label?: string; // Button text
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
  features?: { actionType?: 'safe' | 'destructive' | 'neutral';
    requiresConfirmation?: boolean;
    confirmationMessage?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical'; };
  onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm?: () => void;
  onCancel?: () => void; }

// Modal component props
export interface ModalProps extends ActionFeedbackComponentProps { isOpen: boolean;
  title?: string; // Modal title text
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  closable?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  showOverlay?: boolean;
  features?: { scrollable?: boolean;
    autoFocus?: boolean;
    trapFocus?: boolean;
    lockScroll?: boolean; };
  onOpen?: () => void;
  onClose?: () => void;
  onEscapeKey?: () => void;
  onOverlayClick?: () => void; }

// Drawer component props
export interface DrawerProps extends ActionFeedbackComponentProps { isOpen: boolean;
  title?: string; // Drawer title text
  children: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  showOverlay?: boolean;
  features?: { resizable?: boolean;
    collapsible?: boolean;
    autoFocus?: boolean;
    trapFocus?: boolean;
    lockScroll?: boolean; };
  onOpen?: () => void;
  onClose?: () => void;
  onEscapeKey?: () => void;
  onOverlayClick?: () => void; }

// Toast component props
export interface ToastProps extends ActionFeedbackComponentProps { message?: string; // Toast message text
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number; // Auto-dismiss duration in milliseconds
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  closable?: boolean;
  persistent?: boolean;
  action?: ToastAction;
  features?: { showProgress?: boolean;
    pauseOnHover?: boolean;
    stackable?: boolean;
    priority?: 'low' | 'medium' | 'high' | 'critical'; };
  onClose?: () => void;
  onAction?: () => void; }

// Toast action configuration
export interface ToastAction { label: string; // Action button text
  handler: () => void;
  variant?: 'default' | 'primary' | 'secondary'; }

// Alert component props
export interface AlertProps extends ActionFeedbackComponentProps { title?: string; // Alert title text
  message?: string; // Alert message text
  children?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  closable?: boolean;
  actions?: AlertAction[];
  features?: { showIcon?: boolean;
    showTimestamp?: boolean;
    collapsible?: boolean;
    persistent?: boolean;
    requiresAcknowledgment?: boolean; };
  onClose?: () => void;
  onAction?: (_action: AlertAction) => void; }

// Alert action configuration
export interface AlertAction { label: string; // Action button text
  handler: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  features?: { actionType?: 'safe' | 'destructive' | 'neutral';
    requiresConfirmation?: boolean; }; }

// Confirmation modal props (specialized modal)
export interface ConfirmationModalProps extends Omit<ModalProps, 'children' | 'features'> { message?: string; // Confirmation message text
  confirmButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
  variant?: 'default' | 'danger' | 'warning';
  features?: ModalProps['features'] & { actionDescription?: string;
    consequenceWarning?: string;
    typedConfirmation?: boolean;
    confirmationText?: string; };
  onConfirm: () => void;
  onCancel: () => void; }

// Loading overlay props
export interface LoadingOverlayProps extends ComponentProps { visible: boolean;
  message?: string; // Loading message text
  progress?: number; // Progress percentage (0-100)
  size?: 'sm' | 'md' | 'lg';
  blur?: boolean; // Blur background content
  features?: { announceProgress?: boolean;
    progressMessage?: string;
    category?: 'data' | 'form' | 'navigation' | 'system';
    showSpinner?: boolean;
    showProgress?: boolean; }; }

// Status indicator props
export interface StatusBannerProps extends ComponentProps { status: 'online' | 'offline' | 'maintenance' | 'degraded' | 'operational';
  message?: string; // Status message text
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  showIcon?: boolean;
  features?: { serviceLevel?: 'critical' | 'important' | 'standard' | 'low';
    estimatedResolution?: string;
    contactInformation?: string;
    showStatusHistory?: boolean; };
  onDismiss?: () => void; }

// Notification component props
export interface NotificationProps extends ActionFeedbackComponentProps { title?: string;
  message?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  closable?: boolean;
  actions?: NotificationAction[];
  features?: { showTimestamp?: boolean;
    showAvatar?: boolean;
    showProgress?: boolean;
    persistent?: boolean;
    groupable?: boolean;
    priority?: 'low' | 'medium' | 'high' | 'critical'; };
  onClose?: () => void;
  onAction?: (_action: NotificationAction) => void; }

// Notification action configuration
export interface NotificationAction { id: string;
  label: string;
  handler: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  features?: { actionGroup?: 'primary' | 'secondary' | 'destructive';
    requiresConfirmation?: boolean; }; }

// Progress indicator for long-running actions
export interface ProgressIndicatorProps extends ComponentProps { value?: number; // Progress value (0-100)
  indeterminate?: boolean; // Indeterminate progress
  label?: string; // Progress label text
  size?: 'sm' | 'md' | 'lg';
  variant?: 'linear' | 'circular';
  showPercentage?: boolean;
  features?: { announceProgress?: boolean;
    progressFormat?: 'percentage' | 'fraction' | 'time';
    category?: 'upload' | 'download' | 'processing' | 'validation';
    showTimeRemaining?: boolean;
    showSpeed?: boolean; }; }
