/**
 * @fileoverview SSR-Safe CodeBlock Component - Production Strategy Implementation
 * @description Code display component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, type HTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * CodeBlock variant types
 */
export type CodeBlockVariant = 'default' | 'filled' | 'outline' | 'ghost';

/**
 * CodeBlock size types
 */
export type CodeBlockSize = 'sm' | 'md' | 'lg';

/**
 * CodeBlock max height types
 */
export type CodeBlockMaxHeight = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Language configuration for syntax highlighting
 */
const languageConfig = {
  javascript: { label: 'JavaScript', extension: '.js' },
  typescript: { label: 'TypeScript', extension: '.ts' },
  jsx: { label: 'React JSX', extension: '.jsx' },
  tsx: { label: 'React TSX', extension: '.tsx' },
  python: { label: 'Python', extension: '.py' },
  bash: { label: 'Bash', extension: '.sh' },
  shell: { label: 'Shell', extension: '.sh' },
  json: { label: 'JSON', extension: '.json' },
  yaml: { label: 'YAML', extension: '.yml' },
  html: { label: 'HTML', extension: '.html' },
  css: { label: 'CSS', extension: '.css' },
  sql: { label: 'SQL', extension: '.sql' },
  markdown: { label: 'Markdown', extension: '.md' },
  xml: { label: 'XML', extension: '.xml' },
  dockerfile: { label: 'Dockerfile', extension: 'Dockerfile' },
  go: { label: 'Go', extension: '.go' },
  rust: { label: 'Rust', extension: '.rs' },
  java: { label: 'Java', extension: '.java' },
  csharp: { label: 'C#', extension: '.cs' },
  php: { label: 'PHP', extension: '.php' },
  ruby: { label: 'Ruby', extension: '.rb' },
  text: { label: 'Plain Text', extension: '.txt' },
} as const;

/**
 * CodeBlock Props interface
 */
export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onCopy'> {
  /** Code content to display */
  readonly code: string;
  /** Programming language for syntax highlighting */
  readonly language?: keyof typeof languageConfig;
  /** Show language label */
  readonly showLanguage?: boolean;
  /** Show copy button */
  readonly showCopy?: boolean;
  /** Show line numbers */
  readonly showLineNumbers?: boolean;
  /** Custom filename */
  readonly filename?: string;
  /** Allow code wrapping */
  readonly wrap?: boolean;
  /** Copy button callback */
  readonly onCopy?: (code: string) => void;
  /** Custom header content */
  readonly header?: React.ReactNode;
  /** Show download button */
  readonly showDownload?: boolean;
  /** Download callback */
  readonly onDownload?: (code: string, filename: string) => void;
  /** Highlight specific lines */
  readonly highlightLines?: number[];
  /** Collapsible code block */
  readonly collapsible?: boolean;
  /** Initially collapsed */
  readonly defaultCollapsed?: boolean;
  /** CodeBlock styling variant */
  readonly variant?: CodeBlockVariant;
  /** CodeBlock size */
  readonly size?: CodeBlockSize;
  /** Maximum height constraint */
  readonly maxHeight?: CodeBlockMaxHeight;
}

/**
 * Copy button component
 */
const CopyButton: React.FC<{
  code: string;
  onCopy?: (code: string) => void;
}> = ({ code, onCopy }) => {
  const { colors, spacing, typography, getToken } = useTokens();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.(code);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Copy failed - handled silently
    }
  };

  const borderRadius = {
    md: (getToken('borderRadius.md') as string) || '0.375rem',
  };

  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    transition: 'all 150ms ease-in-out',
    backgroundColor: colors.background?.default || '#ffffff',
    border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
    borderRadius: borderRadius.md,
    color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <button
      onClick={handleCopy}
      style={buttonStyles}
      aria-label={copied ? 'Kopiert!' : 'Kopier kode'}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.neutral?.[100] || '#f3f4f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.background?.default || '#ffffff';
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
    >
      {copied ? (
        <>
          <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Kopier
        </>
      )}
    </button>
  );
};

/**
 * Download button component
 */
const DownloadButton: React.FC<{
  code: string;
  filename: string;
  onDownload?: (code: string, filename: string) => void;
}> = ({ code, filename, onDownload }) => {
  const { colors, spacing, typography, getToken } = useTokens();

  const handleDownload = (): void => {
    try {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onDownload?.(code, filename);
    } catch (error) {
      // Download failed - handled silently
    }
  };

  const borderRadius = {
    md: (getToken('borderRadius.md') as string) || '0.375rem',
  };

  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    transition: 'all 150ms ease-in-out',
    backgroundColor: colors.background?.default || '#ffffff',
    border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
    borderRadius: borderRadius.md,
    color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <button
      onClick={handleDownload}
      style={buttonStyles}
      aria-label={`Last ned ${filename}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.neutral?.[100] || '#f3f4f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.background?.default || '#ffffff';
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
    >
      <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Last ned
    </button>
  );
};

/**
 * Line numbers component
 */
const LineNumbers: React.FC<{
  lines: number;
  highlightLines?: number[];
}> = ({ lines, highlightLines = [] }) => {
  const { colors, spacing, typography } = useTokens();
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
      userSelect: 'none',
      paddingRight: spacing[4],
      borderRight: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
    }}>
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i + 1}
          style={{
            minHeight: '1.25rem',
            lineHeight: '1.25',
            paddingLeft: spacing[2],
            paddingRight: spacing[2],
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: highlightLines.includes(i + 1) 
              ? `${colors.accent?.default || colors.neutral?.[100] || '#f3f4f6'}33` 
              : 'transparent',
            color: highlightLines.includes(i + 1) 
              ? (colors.accent?.foreground || colors.text?.primary || '#111827')
              : 'inherit',
          }}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
};

/**
 * CodeBlock component for displaying code with syntax highlighting
 */
export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      style,
      code,
      language = 'text',
      showLanguage = true,
      showCopy = true,
      showLineNumbers = false,
      filename,
      wrap = false,
      onCopy,
      header,
      showDownload = false,
      onDownload,
      highlightLines = [],
      collapsible = false,
      defaultCollapsed = false,
      variant = 'default',
      size = 'md',
      maxHeight = 'lg',
      ...props
    },
    ref
  ) => {
    const { colors, spacing, typography, getToken } = useTokens();
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    
    const languageInfo = languageConfig[language] || languageConfig.text;
    const displayFilename = filename || `code${languageInfo.extension}`;
    const codeLines = code.split('\n');
    const lineCount = codeLines.length;

    // Get border radius
    const borderRadius = {
      lg: (getToken('borderRadius.lg') as string) || '0.5rem',
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { fontSize: typography.fontSize.xs };
        case 'lg':
          return { fontSize: typography.fontSize.base };
        default:
          return { fontSize: typography.fontSize.sm };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'filled':
          return {
            backgroundColor: colors.neutral?.[100] || '#f3f4f6',
            border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'outline':
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            border: `2px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
          };
        default:
          return {
            backgroundColor: `${colors.neutral?.[100] || '#f3f4f6'}4D`, // 30% opacity
            border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
      }
    };

    // Max height styles
    const getMaxHeightStyles = (): React.CSSProperties => {
      switch (maxHeight) {
        case 'sm':
          return { maxHeight: '8rem' };
        case 'md':
          return { maxHeight: '16rem' };
        case 'lg':
          return { maxHeight: '24rem' };
        case 'xl':
          return { maxHeight: '600px' };
        default:
          return {};
      }
    };

    // Container styles
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: borderRadius.lg,
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...getMaxHeightStyles(),
      ...style,
    };

    // Header styles
    const headerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${spacing[2]} ${spacing[4]}`,
      borderBottom: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
      backgroundColor: `${colors.neutral?.[100] || '#f3f4f6'}80`, // 50% opacity
    };

    const collapsibleButtonStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[1],
      padding: `${spacing[1]} ${spacing[2]}`,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
      transition: 'all 150ms ease-in-out',
      backgroundColor: colors.background?.default || '#ffffff',
      border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
      borderRadius: borderRadius.md,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      cursor: 'pointer',
      outline: 'none',
    };

    return (
      <div
        ref={ref}
        className={className}
        style={containerStyles}
        {...props}
      >
        {/* Header */}
        {(showLanguage || showCopy || showDownload || filename || header || collapsible) && (
          <div style={headerStyles}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
              {filename && (
                <span style={{
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.text?.primary || colors.neutral?.[900] || '#111827',
                }}>{filename}</span>
              )}
              {showLanguage && !filename && (
                <span style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                }}>
                  {languageInfo.label}
                </span>
              )}
              {header}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
              {collapsible && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  style={collapsibleButtonStyles}
                  aria-label={isCollapsed ? 'Vis kode' : 'Skjul kode'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.neutral?.[100] || '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.background?.default || '#ffffff';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <svg
                    style={{
                      width: '12px',
                      height: '12px',
                      transition: 'transform 150ms ease-in-out',
                      transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  {isCollapsed ? 'Vis' : 'Skjul'}
                </button>
              )}

              {showDownload && (
                <DownloadButton code={code} filename={displayFilename} onDownload={onDownload} />
              )}

              {showCopy && <CopyButton code={code} onCopy={onCopy} />}
            </div>
          </div>
        )}

        {/* Code content */}
        {!isCollapsed && (
          <div style={{ position: 'relative' }}>
            <div style={{
              overflow: 'auto',
              ...(maxHeight !== 'none' && {
                scrollbarWidth: 'thin',
                scrollbarColor: `${colors.border?.default || '#e5e7eb'} ${colors.background?.default || '#ffffff'}`,
              }),
            }}>
              <div style={{ display: 'flex' }}>
                {/* Line numbers */}
                {showLineNumbers && (
                  <LineNumbers lines={lineCount} highlightLines={highlightLines} />
                )}

                {/* Code */}
                <pre style={{
                  flex: 1,
                  padding: spacing[4],
                  margin: 0,
                  backgroundColor: 'transparent',
                  color: colors.text?.primary || colors.neutral?.[900] || '#111827',
                  fontFamily: typography.fontFamily.mono?.join(', ') || 'ui-monospace, SFMono-Regular, Consolas, monospace',
                  lineHeight: typography.lineHeight.relaxed,
                  overflow: wrap ? 'visible' : 'auto',
                  whiteSpace: wrap ? 'pre-wrap' : 'pre',
                  wordBreak: wrap ? 'break-word' : 'normal',
                }}>
                  <code style={{ display: 'block' }}>
                    {codeLines.map((line, index) => (
                      <span
                        key={index}
                        style={{
                          display: 'block',
                          minHeight: '1.25rem',
                          backgroundColor: highlightLines.includes(index + 1) 
                            ? `${colors.accent?.default || colors.neutral?.[100] || '#f3f4f6'}1A` // 10% opacity
                            : 'transparent',
                          padding: highlightLines.includes(index + 1) 
                            ? `0 ${spacing[2]}` 
                            : '0',
                          margin: highlightLines.includes(index + 1) 
                            ? `0 -${spacing[2]}` 
                            : '0',
                          borderRadius: highlightLines.includes(index + 1) 
                            ? borderRadius.md 
                            : '0',
                        }}
                      >
                        {line || '\n'}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';

/**
 * Export language configuration
 */
export { languageConfig };