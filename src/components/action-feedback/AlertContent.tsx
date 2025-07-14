/**
 * Alert Content Component
 * Content rendering for Alert component
 */

import React from 'react';

import {
  getCategoryIcon,
  getClassificationIcon,
  getSeverityIcon,
} from '../../utils/norwegian-compliance';
import type { AlertPropsWithNorwegian } from './AlertHelpers';

/**
 * Classification indicator component
 */
export const ClassificationIndicator: React.FC<{ level: string }> = ({ level }) => {
  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginLeft: 'var(--spacing-2)',
        opacity: '0.8',
      }}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
      data-testid="classification-indicator"
    >
      {getClassificationIcon(level)}
    </span>
  );
};

/**
 * Severity indicator component
 */
export const SeverityIndicator: React.FC<{ severity: string }> = ({ severity }) => {
  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginLeft: 'var(--spacing-1)',
        opacity: '0.8',
      }}
      aria-label={`Severity: ${severity}`}
      title={`Alvorlighetsgrad: ${severity}`}
      data-testid="severity-indicator"
    >
      {getSeverityIcon(severity)}
    </span>
  );
};

/**
 * Category indicator component
 */
export const CategoryIndicator: React.FC<{ category?: string }> = ({ category }) => {
  if (!category) {
    return null;
  }

  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginLeft: 'var(--spacing-2)',
        opacity: '0.8',
      }}
      aria-label={`Category: ${category}`}
      title={`Kategori: ${category}`}
      data-testid="category-indicator"
    >
      {getCategoryIcon(category)}
    </span>
  );
};

/**
 * Alert title component
 */
export const AlertTitle: React.FC<{
  title?: string;
  titleKey?: string;
  severity: string;
  norwegian?: AlertPropsWithNorwegian['norwegian'];
}> = ({ title, titleKey, severity, norwegian }) => {
  if (!title && !titleKey) {
    return null;
  }

  return (
    <div
      style={{
        fontSize: 'var(--font-size-base)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--spacing-1)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-1)',
      }}
      data-testid="alert-title"
    >
      {/* TODO: Replace with actual localization */}
      <span>{title || titleKey}</span>

      {/* Classification indicator */}
      {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}

      {/* Severity indicator */}
      <SeverityIndicator severity={severity} />

      {/* Category indicator */}
      {norwegian?.category && <CategoryIndicator category={norwegian.category} />}
    </div>
  );
};

/**
 * Alert message component
 */
export const AlertMessage: React.FC<{
  message?: string;
  messageKey?: string;
  children?: React.ReactNode;
}> = ({ message, messageKey, children }) => {
  if (!message && !messageKey && !children) {
    return null;
  }

  return (
    <div
      style={{
        fontSize: 'var(--font-size-sm)',
        lineHeight: 'var(--line-height-relaxed)',
        color: 'inherit',
      }}
      data-testid="alert-message"
    >
      {children ||
        message ||
        (messageKey ? /* TODO: Replace with actual localization */ messageKey : '')}
    </div>
  );
};

/**
 * Alert acknowledgment component
 */
export const AlertAcknowledgment: React.FC<{
  norwegian?: AlertPropsWithNorwegian['norwegian'];
}> = ({ norwegian }) => {
  if (!norwegian?.requiresAcknowledgment) {
    return null;
  }

  const handleAcknowledge = (): void => {
    if (norwegian?.onAcknowledgment) {
      norwegian.onAcknowledgment();
    }
  };

  return (
    <div style={{ marginTop: 'var(--spacing-3)' }} data-testid="alert-acknowledgment">
      <button
        style={{
          padding: 'var(--spacing-2) var(--spacing-4)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          backgroundColor: 'currentColor',
          color: 'var(--color-white)',
          border: 'none',
          borderRadius: 'var(--border-radius-base)',
          cursor: 'pointer',
        }}
        onClick={handleAcknowledge}
      >
        {/* TODO: Replace with actual localization */}
        {norwegian.acknowledgmentMessageKey || 'Bekreft lesing'}
      </button>
    </div>
  );
};

/**
 * Alert documentation link component
 */
export const AlertDocumentationLink: React.FC<{
  norwegian?: AlertPropsWithNorwegian['norwegian'];
}> = ({ norwegian }) => {
  if (!norwegian?.relatedDocumentationKey) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: 'var(--spacing-2)',
        fontSize: 'var(--font-size-xs)',
      }}
      data-testid="alert-documentation-link"
    >
      <a
        href="#"
        style={{
          color: 'currentColor',
          textDecoration: 'underline',
        }}
      >
        {/* TODO: Replace with actual localization */}
        📖 {norwegian.relatedDocumentationKey}
      </a>
    </div>
  );
};
