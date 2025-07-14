/**
 * @fileoverview Form Component - Enterprise Standards Compliant
 * @module Form
 * @description Form container component using design tokens (no inline styles)
 */

import React, { forwardRef } from 'react';
import type { FormProps } from '../../types/form.types';
import { useLocalization } from '../../localization/hooks/useLocalization';

/**
 * Form component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const {
    children,
    padding = 'md',
    margin = 'none',
    background = 'transparent',
    norwegian,
    accessibility,
    onSubmit,
    className = '',
    testId,
    ...formProps
  } = props;

  const { t } = useLocalization();

  // Build CSS classes using design tokens
  const formClasses = React.useMemo(() => {
    const classes = ['form'];
    
    // Layout classes
    classes.push(`form--padding-${padding}`);
    classes.push(`form--margin-${margin}`);
    classes.push(`form--background-${background}`);
    
    // Norwegian compliance classes
    if (norwegian?.classification) {
      classes.push(`form--classification-${norwegian.classification}`);
    }
    
    if (norwegian?.municipality) {
      classes.push(`form--municipality-${norwegian.municipality.toLowerCase().replace(/\s+/g, '-')}`);
    }
    
    if (norwegian?.submitBehavior) {
      classes.push(`form--submit-${norwegian.submitBehavior}`);
    }
    
    // Accessibility classes
    if (accessibility?.announceErrors) {
      classes.push('form--announce-errors');
    }
    
    if (accessibility?.landmark) {
      classes.push('form--landmark');
    }
    
    // Custom classes
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [padding, margin, background, norwegian, accessibility, className]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Enhanced validation for forms with error announcements
    if (accessibility?.announceErrors) {
      const form = event.currentTarget;
      const firstError = form.querySelector('[aria-invalid="true"]') as HTMLElement;
      if (firstError) {
        firstError.focus();
        return;
      }
    }
    
    onSubmit?.(event);
  };

  return (
    <form
      ref={ref}
      className={formClasses}
      onSubmit={handleSubmit}
      noValidate={accessibility?.announceErrors} // Use custom validation when announcing errors
      aria-label={accessibility?.landmark ? t('form.accessibleForm') : undefined}
      data-testid={testId}
      data-classification={norwegian?.classification}
      data-municipality={norwegian?.municipality}
      {...formProps}
    >
      {/* Classification header */}
      {norwegian?.classification && (
        <div className="form__classification-header">
          <ClassificationIndicator
            classification={norwegian.classification}
            municipality={norwegian.municipality}
          />
        </div>
      )}
      
      {/* Form content */}
      <div className="form__content">
        {children}
      </div>
      
      {/* Norwegian compliance footer */}
      {norwegian && norwegian.submitBehavior === 'confirm' && (
        <div className="form__compliance-footer">
          <div className="form__privacy-notice">
            <span className="form__privacy-icon" aria-hidden="true">🔒</span>
            <span className="form__privacy-text">
              {t('form.privacyNotice')}
            </span>
          </div>
          
          <div className="form__data-processing">
            <span className="form__data-icon" aria-hidden="true">📋</span>
            <span className="form__data-text">
              {t('form.dataProcessing')}
            </span>
          </div>
        </div>
      )}
    </form>
  );
});

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{
  classification?: string;
  municipality?: string;
}> = ({ classification, municipality }) => {
  const { t } = useLocalization();

  const getClassificationText = (level: string): string => {
    const texts = {
      'ÅPEN': 'Åpen',
      'BEGRENSET': 'Begrenset',
      'KONFIDENSIELT': 'Konfidensielt',
      'HEMMELIG': 'Hemmelig',
    };
    return texts[level as keyof typeof texts] || level;
  };

  const getClassificationIcon = (level: string): string => {
    const icons = {
      'ÅPEN': '🔓',
      'BEGRENSET': '🔒',
      'KONFIDENSIELT': '🔐',
      'HEMMELIG': '🔴',
    };
    return icons[level as keyof typeof icons] || '🔓';
  };

  if (!classification) return null;

  return (
    <div className="form__classification-indicator">
      <span className="form__classification-icon" aria-hidden="true">
        {getClassificationIcon(classification)}
      </span>
      
      <div className="form__classification-content">
        <span className="form__classification-level">
          {t('form.classification.label')}: {getClassificationText(classification)}
        </span>
        
        {municipality && (
          <span className="form__municipality">
            {t('form.municipality.label')}: {municipality}
          </span>
        )}
      </div>
    </div>
  );
};

Form.displayName = 'Form';
