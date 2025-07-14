#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Pattern replacements
const fixes = [
  // Add missing functions and variables
  {
    pattern: /getVariantIcon\(/g,
    replacement: (match) => {
      return `// Helper function
const getVariantIcon = (variant: string): string => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };
  return icons[variant as keyof typeof icons] || 'ℹ️';
};
getVariantIcon(`;
    },
    addBefore: /const getVariantIcon = /,
  },
  {
    pattern: /getClassificationIcon\(/g,
    replacement: (match) => {
      return `// Helper function
const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};
getClassificationIcon(`;
    },
    addBefore: /const getClassificationIcon = /,
  },
  {
    pattern: /getSeverityIcon\(/g,
    replacement: (match) => {
      return `// Helper function
const getSeverityIcon = (severity: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[severity as keyof typeof icons] || '■';
};
getSeverityIcon(`;
    },
    addBefore: /const getSeverityIcon = /,
  },
  {
    pattern: /getCategoryIcon\(/g,
    replacement: (match) => {
      return `// Helper function
const getCategoryIcon = (category: string): string => {
  const icons = {
    system: '⚙️',
    validation: '✅',
    security: '🔒',
    process: '🔄',
    user: '👤',
  };
  return icons[category as keyof typeof icons] || '📋';
};
getCategoryIcon(`;
    },
    addBefore: /const getCategoryIcon = /,
  },
];

// Fix UISystemProvider specific issues
function fixUISystemProvider(content, file) {
  // Fix missing variables in UISystemProvider
  if (file.includes('UISystemProvider.tsx') && !file.includes('__tests__')) {
    // Add missing accessibilityConfig
    content = content.replace(
      /export const UISystemProvider: React.FC<UISystemProviderProps> = \(\{/,
      `export const UISystemProvider: React.FC<UISystemProviderProps> = ({`
    );
    
    // Add proper implementation
    const providerImpl = `export const UISystemProvider: React.FC<UISystemProviderProps> = ({
  children,
  config: initialConfig = {},
  accessibility: initialAccessibility = 'basic',
}): React.ReactElement => {
  // Initialize accessibility config
  const accessibilityConfig = useMemo(() => {
    return typeof initialAccessibility === 'string'
      ? accessibilityPresets[initialAccessibility] || accessibilityPresets.basic
      : initialAccessibility;
  }, [initialAccessibility]);

  // Generate CSS variables
  const cssVariables = useMemo(() => {
    const tokens = generateAccessibilityTokens(accessibilityConfig);
    return Object.entries(tokens)
      .map(([key, value]) => \`--\${key}: \${value};\`)
      .join(' ');
  }, [accessibilityConfig]);

  // Create context value
  const contextValue = useMemo<UISystemContext>(() => ({
    config: { ...defaultConfig, ...initialConfig },
    accessibility: accessibilityConfig,
    accessibilityTokens: generateAccessibilityTokens(accessibilityConfig),
    updateConfig: (updates: Partial<UISystemConfig>) => {
      logger.debug('Config update requested', { updates });
    },
    updateAccessibility: (accessibility: AccessibilityConfig | AccessibilityPreset) => {
      logger.debug('Accessibility update requested', { accessibility });
    },
  }), [initialConfig, accessibilityConfig]);

  return (`;
    
    content = content.replace(
      /export const UISystemProvider: React\.FC<UISystemProviderProps> = \(\{[\s\S]*?\): React\.ReactElement => \{[\s\S]*?return \(/,
      providerImpl
    );

    // Remove unused t function
    content = content.replace(/const t = \(key: string\) => key;\n/g, '');
  }
  
  return content;
}

// Fix Alert component specific issues
function fixAlertComponent(content, file) {
  if (file.includes('Alert.tsx') && !file.includes('__tests__')) {
    // Extract all the props properly
    const alertImpl = `export const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref): React.ReactElement => {
  const {
    variant = 'info',
    severity = 'medium',
    title,
    titleKey,
    message,
    messageKey,
    icon,
    closable = false,
    showOverlay = false,
    children,
    className = '',
    style,
    actions,
    norwegian,
    ariaLabel,
    testId = 'alert',
    onClose,
    ...divProps
  } = props;

  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = (): void => {
    setIsVisible(false);
    onClose?.();
  };

  const handleAcknowledge = (): void => {
    // Handle acknowledgment
    if (norwegian?.onAcknowledgment) {
      norwegian.onAcknowledgment();
    }
  };

  const combinedStyles = {
    ...getAlertStyles(props),
    ...style,
  };

  const getAlertRole = (): string => {
    return severity === 'critical' || severity === 'high' ? 'alert' : 'status';
  };

  const getAriaLive = (): 'polite' | 'assertive' | 'off' => {
    if (severity === 'critical') return 'assertive';
    if (severity === 'high') return 'assertive';
    return 'polite';
  };

  if (!isVisible) {
    return <></>;
  }

  return (`;
    
    content = content.replace(
      /export const Alert = React\.forwardRef<HTMLDivElement, AlertProps>\(\(props, ref\): React\.ReactElement => \{[\s\S]*?return \(/,
      alertImpl
    );
  }
  
  return content;
}

// Fix Button component specific issues
function fixButtonComponent(content, file) {
  if (file.includes('Button.tsx') && !file.includes('__tests__')) {
    // Add missing spinnerSize calculation
    content = content.replace(
      /const LoadingSpinner = \(\{ size \}: \{ size: string \}\): React\.ReactElement => \{/,
      `const LoadingSpinner = ({ size }: { size: string }): React.ReactElement => {
  const spinnerSize = size === 'sm' ? '12px' : size === 'lg' ? '20px' : '16px';`
    );

    // Fix Button implementation
    const buttonImpl = `export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref): React.ReactElement => {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    type = 'button',
    fullWidth = false,
    disabled = false,
    loading = false,
    children,
    labelKey,
    icon,
    iconPosition = 'start',
    className = '',
    style,
    norwegian,
    ariaLabel,
    testId = 'button',
    onClick,
    ...buttonProps
  } = props;

  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const isDisabled = disabled || loading;
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (norwegian?.requiresConfirmation) {
      setShowConfirmation(true);
    } else {
      onClick?.(event);
    }
  };
  
  const handleConfirm = (): void => {
    setShowConfirmation(false);
    onClick?.({} as React.MouseEvent<HTMLButtonElement>);
  };
  
  const handleCancel = (): void => {
    setShowConfirmation(false);
  };

  const combinedStyles = {
    ...getButtonStyles(props),
    ...style,
  };

  const buttonContent = (
    <>
      {loading && <LoadingSpinner size={size} />}
      {icon && iconPosition === 'start' && !loading && icon}
      {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}
      {children || labelKey}
      {icon && iconPosition === 'end' && !loading && icon}
    </>
  );

  return (`;

    content = content.replace(
      /export const Button = React\.forwardRef<HTMLButtonElement, ButtonProps>\(\(props, ref\): React\.ReactElement => \{[\s\S]*?return \(/,
      buttonImpl
    );
  }
  
  return content;
}

// Fix Modal component specific issues
function fixModalComponent(content, file) {
  if (file.includes('Modal.tsx') && !file.includes('__tests__')) {
    // Remove duplicate t function
    content = content.replace(/const t = \(key: string\) => key;\n/g, '');

    // Add missing helper functions
    if (!content.includes('getClassificationIcon')) {
      const helperFunctions = `
// Helper function
const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

// Helper function
const getCategoryIcon = (category: string): string => {
  const icons = {
    system: '⚙️',
    validation: '✅',
    security: '🔒',
    process: '🔄',
    user: '👤',
  };
  return icons[category as keyof typeof icons] || '📋';
};

`;
      content = content.replace(
        /const getModalStyles = /,
        helperFunctions + 'const getModalStyles = '
      );
    }

    // Fix Modal implementation
    const modalImpl = `export const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref): React.ReactElement => {
  const {
    isOpen,
    title,
    titleKey,
    size = 'md',
    centered = true,
    closable = true,
    closeOnEscape = true,
    closeOnOverlay = true,
    showOverlay = true,
    scrollable = false,
    persistent = false,
    children,
    className = '',
    style,
    norwegian,
    ariaLabel,
    testId = 'modal',
    onClose,
    onEscapeKey,
    onOverlayClick,
    ...divProps
  } = props;

  const modalRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && closeOnEscape && !persistent) {
        onEscapeKey?.();
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, persistent, onEscapeKey, onClose]);

  const handleClose = (): void => {
    if (!persistent) {
      onClose?.();
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (closeOnOverlay && !persistent && event.target === event.currentTarget) {
      onOverlayClick?.();
      onClose?.();
    }
  };

  if (!isOpen) {
    return <></>;
  }

  const overlayStyles = getModalStyles(props);
  const contentStyles = getModalContentStyles(props);
  const combinedOverlayStyles = { ...overlayStyles, ...style };

  return (`;

    content = content.replace(
      /export const Modal = React\.forwardRef<HTMLDivElement, ModalProps>\(\(props, ref\): React\.ReactElement => \{[\s\S]*?return \(/,
      modalImpl
    );

    // Fix useFocusTrap
    content = content.replace(
      /const useFocusTrap = \([\s\S]*?\): React\.ReactElement => \{[\s\S]*?\};/,
      `const useFocusTrap = (
  isOpen: boolean,
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement>
): void => {
  React.useEffect(() => {
    if (!isOpen || !enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  }, [isOpen, enabled, containerRef]);
};`
    );
  }
  
  return content;
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Apply pattern-based fixes
  fixes.forEach(fix => {
    if (fix.addBefore && !fix.addBefore.test(content) && fix.pattern.test(content)) {
      const match = content.match(fix.pattern);
      if (match) {
        const replacement = typeof fix.replacement === 'function' ? fix.replacement(match[0]) : fix.replacement;
        const insertPosition = content.indexOf(match[0]);
        content = content.slice(0, insertPosition) + replacement.split(fix.pattern.source.replace(/\\/g, ''))[0] + '\n\n' + content.slice(insertPosition);
        modified = true;
      }
    }
  });

  // Apply component-specific fixes
  content = fixUISystemProvider(content, file);
  content = fixAlertComponent(content, file);
  content = fixButtonComponent(content, file);
  content = fixModalComponent(content, file);

  // Check if content changed
  if (content !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
    return true;
  }
  
  return false;
}

// Main
const srcDir = path.join(__dirname, 'src');
const files = glob.sync('**/*.{ts,tsx}', { cwd: srcDir, absolute: true });

let fixedCount = 0;
files.forEach(file => {
  if (processFile(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files`);