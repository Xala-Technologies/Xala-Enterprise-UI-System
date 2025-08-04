/**
 * @fileoverview Modal Component v6.0.0
 * @description Modal dialog overlay component (wrapper around Dialog)
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  type DialogProps,
  type DialogContentProps,
} from './dialog';
import { cn } from '../../lib/utils/cn';
import { X } from 'lucide-react';
import { Button } from './button';

export interface ModalProps extends DialogProps {
  readonly size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly closeButton?: boolean;
  readonly closeOnEscape?: boolean;
  readonly closeOnOverlay?: boolean;
  readonly centered?: boolean;
}

export interface ModalContentProps extends DialogContentProps {
  readonly size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly closeButton?: boolean;
  readonly centered?: boolean;
}

/**
 * Modal Component
 * A more convenient wrapper around Dialog for common modal use cases
 * 
 * @example
 * ```tsx
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <ModalContent size="md">
 *     <ModalHeader>
 *       <ModalTitle>Confirm Action</ModalTitle>
 *       <ModalDescription>
 *         Are you sure you want to proceed?
 *       </ModalDescription>
 *     </ModalHeader>
 *     <ModalBody>
 *       Content goes here
 *     </ModalBody>
 *     <ModalFooter>
 *       <Button variant="outline" onClick={() => setIsOpen(false)}>
 *         Cancel
 *       </Button>
 *       <Button variant="primary">Confirm</Button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    children,
    size = 'md',
    closeButton = true,
    closeOnEscape = true,
    closeOnOverlay = true,
    centered = true,
    ...dialogProps
  }, ref) => {
    return (
      <Dialog {...dialogProps}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === ModalContent) {
            return React.cloneElement(child as React.ReactElement<ModalContentProps>, {
              size,
              closeButton,
              centered,
            });
          }
          return child;
        })}
      </Dialog>
    );
  }
);

Modal.displayName = 'Modal';

/**
 * ModalContent Component
 * Content wrapper for Modal with size variants
 */
export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ 
    className,
    children,
    size = 'md',
    closeButton = true,
    centered = true,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-[90vw]',
    };

    return (
      <DialogContent
        ref={ref}
        className={cn(
          sizeClasses[size],
          centered && 'sm:rounded-lg',
          className
        )}
        {...props}
      >
        {closeButton && (
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
        {children}
      </DialogContent>
    );
  }
);

ModalContent.displayName = 'ModalContent';

/**
 * ModalHeader Component
 * Header section for Modal
 */
export const ModalHeader = DialogHeader;
ModalHeader.displayName = 'ModalHeader';

/**
 * ModalTitle Component
 * Title for Modal
 */
export const ModalTitle = DialogTitle;
ModalTitle.displayName = 'ModalTitle';

/**
 * ModalDescription Component
 * Description text for Modal
 */
export const ModalDescription = DialogDescription;
ModalDescription.displayName = 'ModalDescription';

/**
 * ModalBody Component
 * Main content area for Modal
 */
export const ModalBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 overflow-auto py-4', className)}
      {...props}
    />
  )
);

ModalBody.displayName = 'ModalBody';

/**
 * ModalFooter Component
 * Footer section for Modal with action buttons
 */
export const ModalFooter = DialogFooter;
ModalFooter.displayName = 'ModalFooter';

/**
 * ModalTrigger Component
 * Trigger element for opening Modal
 */
export const ModalTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
  </button>
));

ModalTrigger.displayName = 'ModalTrigger';

/**
 * ConfirmModal Component
 * Pre-configured modal for confirmation dialogs
 */
export interface ConfirmModalProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly title: string;
  readonly description?: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly onConfirm: () => void;
  readonly onCancel?: () => void;
  readonly variant?: 'default' | 'destructive' | 'warning';
  readonly loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  loading = false,
}) => {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
    if (!loading) {
      onOpenChange(false);
    }
  };

  const confirmVariant = variant === 'destructive' ? 'destructive' : 
                         variant === 'warning' ? 'warning' : 
                         'primary';

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && (
            <ModalDescription>{description}</ModalDescription>
          )}
        </ModalHeader>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};