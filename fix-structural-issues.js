#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix structural issues in files
function fixStructuralIssues(content, file) {
  // Fix Tooltip component double icon definitions
  if (file.includes('Tooltip.tsx')) {
    // Remove duplicate helper function definitions
    content = content.replace(/const icons = \{[\s\S]*?\};\s*\n\s*\/\/ Helper function\s*\nconst getCategoryIcon[\s\S]*?\};\s*\n\s*return icons\[level as keyof typeof icons\] \|\| '📋';\s*\};\n/g, '');
  }

  // Fix Tag component issues
  if (file.includes('Tag.tsx')) {
    // Fix duplicate icon definitions
    content = content.replace(/const icons = \{[\s\S]*?\};\s*\n\s*\/\/ Helper function\s*\nconst getCategoryIcon[\s\S]*?\};\s*\n\s*return icons\[level as keyof typeof icons\] \|\| '📋';\s*\};\n/g, '');
  }

  // Fix Toast component issues
  if (file.includes('Toast.tsx')) {
    // Fix incomplete export
    const toastExportStart = content.indexOf('export const Toast = React.forwardRef');
    if (toastExportStart !== -1) {
      // Find the proper Toast implementation
      const implementationEnd = content.lastIndexOf('});');
      if (implementationEnd > toastExportStart) {
        // Extract everything before the export
        const beforeExport = content.substring(0, toastExportStart);
        // Create proper Toast implementation
        const toastImpl = `export const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, ref): React.ReactElement => {
  const {
    isOpen = true,
    variant = 'info',
    title,
    titleKey,
    message,
    messageKey,
    icon,
    duration = 5000,
    position = 'bottom-right',
    persistent = false,
    closable = true,
    pauseOnHover = true,
    children,
    className = '',
    style,
    actions,
    norwegian,
    ariaLabel,
    testId = 'toast',
    onClose,
    onOpen,
    onActionClick,
    ...divProps
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      onOpen?.();
    } else {
      setIsVisible(false);
    }
  }, [isOpen, onOpen]);

  useEffect(() => {
    if (!isVisible || persistent || isPaused) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, persistent, isPaused]);

  const handleClose = (): void => {
    setIsVisible(false);
    onClose?.();
  };

  const handleMouseEnter = (): void => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = (): void => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const combinedStyles = {
    ...getToastStyles(props),
    ...style,
  };

  const getToastRole = (): string => {
    return variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  };

  const getAriaLive = (): 'polite' | 'assertive' | 'off' => {
    if (variant === 'error') return 'assertive';
    if (variant === 'warning') return 'assertive';
    return 'polite';
  };

  const getVariantIcon = (variant: string): string => {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };
    return icons[variant as keyof typeof icons] || 'ℹ️';
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <div
      ref={ref}
      role={getToastRole()}
      aria-live={getAriaLive()}
      aria-atomic="true"
      className={className}
      style={combinedStyles}
      data-testid={testId}
      data-variant={variant}
      data-position={position}
      data-classification={norwegian?.classification}
      data-priority={norwegian?.priority}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...divProps}
    >
      {/* Toast icon */}
      <div style={{ flexShrink: 0 }}>
        {icon || <span aria-hidden="true">{getVariantIcon(variant)}</span>}
      </div>

      {/* Toast content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Toast title */}
        {(title || titleKey) && (
          <div
            style={{
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--spacing-1)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
            }}
          >
            <span>{title || titleKey}</span>

            {/* Classification indicator */}
            {norwegian?.classification && (
              <ClassificationIndicator level={norwegian.classification} />
            )}

            {/* Priority indicator */}
            {norwegian?.priority && (
              <PriorityIndicator priority={norwegian.priority} />
            )}
          </div>
        )}

        {/* Toast message */}
        {(message || messageKey || children) && (
          <div
            style={{
              fontSize: 'var(--font-size-sm)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'inherit',
            }}
          >
            {children || message || messageKey}
          </div>
        )}

        {/* Action buttons */}
        {actions && actions.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              marginTop: 'var(--spacing-3)',
            }}
          >
            {actions.map((action, index) => (
              <button
                key={index}
                style={{
                  padding: 'var(--spacing-1) var(--spacing-2)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: 'transparent',
                  color: 'currentColor',
                  border: 'var(--border-width) solid currentColor',
                  borderRadius: 'var(--border-radius-sm)',
                  cursor: 'pointer',
                }}
                onClick={() => onActionClick?.(action)}
              >
                {action.labelKey}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Close button */}
      {closable && <CloseButton onClose={handleClose} />}
    </div>
  );
});

Toast.displayName = 'Toast';
`;
        content = beforeExport + toastImpl;
      }
    }
  }

  // Fix Button.tsx xala component
  if (file.includes('xala/Button.tsx')) {
    // Remove incomplete JSDoc block
    content = content.replace(/\};\n\n\n \*\n \* function MyComponent[\s\S]*?\}$/g, '};\n');
  }

  // Fix KeyValueList getStatusIcon placement
  if (file.includes('KeyValueList.tsx')) {
    // Move getStatusIcon before StatusIndicator
    const statusIndicatorPos = content.indexOf('const StatusIndicator');
    const getStatusIconPos = content.indexOf('const getStatusIcon');
    
    if (statusIndicatorPos !== -1 && getStatusIconPos > statusIndicatorPos) {
      // Extract getStatusIcon
      const getStatusIconEnd = content.indexOf('};', getStatusIconPos) + 2;
      const getStatusIconDef = content.substring(getStatusIconPos, getStatusIconEnd);
      
      // Remove from current position
      content = content.substring(0, getStatusIconPos) + content.substring(getStatusIconEnd);
      
      // Insert before StatusIndicator
      content = content.substring(0, statusIndicatorPos) + getStatusIconDef + '\n\n' + content.substring(statusIndicatorPos);
    }
  }

  // Fix DataTable getStatusIcon placement
  if (file.includes('DataTable.tsx')) {
    // Move getStatusIcon before StatusIndicator
    const statusIndicatorPos = content.indexOf('const StatusIndicator');
    const getStatusIconPos = content.indexOf('const getStatusIcon');
    
    if (statusIndicatorPos !== -1 && getStatusIconPos > statusIndicatorPos) {
      // Extract getStatusIcon
      const getStatusIconEnd = content.indexOf('};', getStatusIconPos) + 2;
      const getStatusIconDef = content.substring(getStatusIconPos, getStatusIconEnd);
      
      // Remove from current position
      content = content.substring(0, getStatusIconPos) + content.substring(getStatusIconEnd);
      
      // Insert before StatusIndicator
      content = content.substring(0, statusIndicatorPos) + getStatusIconDef + '\n\n' + content.substring(statusIndicatorPos);
    }
  }

  // Fix Badge getPriorityIcon placement
  if (file.includes('Badge.tsx')) {
    // Move getPriorityIcon before PriorityIndicator
    const priorityIndicatorPos = content.indexOf('const PriorityIndicator');
    const getPriorityIconPos = content.indexOf('const getPriorityIcon');
    
    if (priorityIndicatorPos !== -1 && getPriorityIconPos > priorityIndicatorPos) {
      // Extract getPriorityIcon
      const getPriorityIconEnd = content.indexOf('};', getPriorityIconPos) + 2;
      const getPriorityIconDef = content.substring(getPriorityIconPos, getPriorityIconEnd);
      
      // Remove from current position
      content = content.substring(0, getPriorityIconPos) + content.substring(getPriorityIconEnd);
      
      // Insert before PriorityIndicator
      content = content.substring(0, priorityIndicatorPos) + getPriorityIconDef + '\n\n' + content.substring(priorityIndicatorPos);
    }
  }

  // Fix Toast getPriorityIcon placement
  if (file.includes('action-feedback/Toast.tsx')) {
    // Move getPriorityIcon before PriorityIndicator
    const priorityIndicatorPos = content.indexOf('const PriorityIndicator');
    const getPriorityIconPos = content.indexOf('const getPriorityIcon');
    
    if (priorityIndicatorPos !== -1 && getPriorityIconPos > priorityIndicatorPos) {
      // Extract getPriorityIcon
      const getPriorityIconEnd = content.indexOf('};', getPriorityIconPos) + 2;
      const getPriorityIconDef = content.substring(getPriorityIconPos, getPriorityIconEnd);
      
      // Remove from current position
      content = content.substring(0, getPriorityIconPos) + content.substring(getPriorityIconEnd);
      
      // Insert before PriorityIndicator
      content = content.substring(0, priorityIndicatorPos) + getPriorityIconDef + '\n\n' + content.substring(priorityIndicatorPos);
    }
  }

  // Remove duplicate React imports  
  const reactImportCount = (content.match(/import React/g) || []).length;
  if (reactImportCount > 1) {
    // Keep only the first React import
    let firstImportFound = false;
    content = content.split('\n').filter(line => {
      if (line.includes('import React')) {
        if (!firstImportFound) {
          firstImportFound = true;
          return true;
        }
        return false;
      }
      return true;
    }).join('\n');
  }

  return content;
}

// Process file
function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  content = fixStructuralIssues(content, file);

  if (content !== originalContent) {
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
  try {
    if (processFile(file)) {
      fixedCount++;
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log(`\nFixed ${fixedCount} files`);