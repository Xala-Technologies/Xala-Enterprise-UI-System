/**
 * @fileoverview SSR-Safe CodeBlock Component - Production Strategy Implementation
 * @description Code display component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, type HTMLAttributes } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';
import { cn } from '../../lib/utils/cn';

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
    <Text as="button"
      onClick={handleCopy}
     
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
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </Text>
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
    <Text as="button"
      onClick={handleDownload}
     
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
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Last ned
    </Text>
  );
};

/**
 * Line numbers component
 */
const LineNumbers: React.FC<{
  lines: number;
  highlightLines?: number[];
}> = ({ lines, highlightLines = [] }) => {
    
  return (
    <Box className="flex flex-col text-right pr-4 select-none">
      {Array.from({ length: lines }, (_, i) => (
        <Text as="span"
          key={i + 1}
          className={cn(
            "px-2 leading-relaxed",
            highlightLines.includes(i + 1) && "bg-accent text-accent-foreground"
          )}
        >
          {i + 1}
        </Text>
      ))}
    </Box>
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
      <Box
        ref={ref}
        className={className}
       
        {...props}
      >
        {/* Header */}
        {(showLanguage || showCopy || showDownload || filename || header || collapsible) && (
          <Box>
            <Box>
              {filename && (
                <Text as="span">{filename}</Text>
              )}
              {showLanguage && !filename && (
                <Text as="span">
                  {languageInfo.label}
                </Text>
              )}
              {header}
            </Box>

            <Box>
              {collapsible && (
                <Text as="button"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                 
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
                </Text>
              )}

              {showDownload && (
                <DownloadButton code={code} filename={displayFilename} onDownload={onDownload} />
              )}

              {showCopy && <CopyButton code={code} onCopy={onCopy} />}
            </Box>
          </Box>
        )}

        {/* Code content */}
        {!isCollapsed && (
          <Box className="relative">
            <Box className="overflow-x-auto bg-background">
              <Box className="inline-block min-w-full">
                {/* Line numbers */}
                {showLineNumbers && (
                  <LineNumbers lines={lineCount} highlightLines={highlightLines} />
                )}

                {/* Code */}
                <pre className="whitespace-pre font-mono text-sm">
                  <Text as="code" className="block">
                    {codeLines.map((line, index) => (
                      <Text as="span"
                        key={index}
                        className={cn(
                          "block",
                          highlightLines.includes(index + 1) && "bg-accent/10 px-2 -mx-2 rounded-md"
                        )}
                      >
                        {line || '\n'}
                      </Text>
                    ))}
                  </Text>
                </pre>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';

/**
 * Export language configuration
 */
export { languageConfig };