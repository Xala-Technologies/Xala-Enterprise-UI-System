/**
 * @fileoverview CodeBlock Component - Norwegian Compliance
 * @description Code display component with syntax highlighting for AI-generated code
 * @version 1.0.0
 * @compliance WCAG 2.2 AAA, Norwegian Enterprise Standards
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';

/**
 * CodeBlock component variants using semantic design tokens
 */
const codeBlockVariants = cva('relative overflow-hidden rounded-lg border bg-muted/30', {
  variants: {
    variant: {
      default: 'bg-muted/30 border-border',
      filled: 'bg-muted border-border',
      outline: 'bg-background border-2 border-border',
      ghost: 'bg-transparent border-transparent',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    maxHeight: {
      none: '',
      sm: 'max-h-32',
      md: 'max-h-64',
      lg: 'max-h-96',
      xl: 'max-h-[600px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    maxHeight: 'lg',
  },
});

/**
 * CodeBlock header variants
 */
const codeBlockHeaderVariants = cva(
  'flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50',
  {
    variants: {
      variant: {
        default: 'bg-muted/50 border-border',
        filled: 'bg-muted border-border',
        minimal: 'bg-transparent border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

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
export interface CodeBlockProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onCopy'>,
    VariantProps<typeof codeBlockVariants> {
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
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 px-2 py-1 text-xs font-medium transition-colors',
        'bg-background hover:bg-muted border border-border rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      )}
      aria-label={copied ? 'Kopiert!' : 'Kopier kode'}
    >
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      console.error('Failed to download code:', error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={cn(
        'inline-flex items-center gap-2 px-2 py-1 text-xs font-medium transition-colors',
        'bg-background hover:bg-muted border border-border rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      )}
      aria-label={`Last ned ${filename}`}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
}> = ({ lines, highlightLines = [] }) => (
  <div className="flex flex-col text-xs text-muted-foreground select-none pr-4 border-r border-border">
    {Array.from({ length: lines }, (_, i) => (
      <span
        key={i + 1}
        className={cn(
          'min-h-[1.25rem] leading-5 px-2 py-0',
          highlightLines.includes(i + 1) && 'bg-accent/20 text-accent-foreground'
        )}
      >
        {i + 1}
      </span>
    ))}
  </div>
);

/**
 * CodeBlock component for displaying code with syntax highlighting
 *
 * @example
 * ```tsx
 * // Basic code block
 * <CodeBlock
 *   code={`function hello() {
 *   console.log("Hello, world!");
 * }`}
 *   language="javascript"
 *   showCopy
 * />
 *
 * // Code block with filename and line numbers
 * <CodeBlock
 *   code={codeContent}
 *   language="typescript"
 *   filename="example.ts"
 *   showLineNumbers
 *   showCopy
 *   showDownload
 * />
 *
 * // Collapsible code block
 * <CodeBlock
 *   code={longCode}
 *   language="python"
 *   collapsible
 *   defaultCollapsed
 * />
 * ```
 */
export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      variant,
      size,
      maxHeight,
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
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const languageInfo = languageConfig[language] || languageConfig.text;
    const displayFilename = filename || `code${languageInfo.extension}`;
    const codeLines = code.split('\n');
    const lineCount = codeLines.length;

    return (
      <div
        ref={ref}
        className={cn(codeBlockVariants({ variant, size, maxHeight }), className)}
        {...props}
      >
        {/* Header */}
        {(showLanguage || showCopy || showDownload || filename || header || collapsible) && (
          <div className={cn(codeBlockHeaderVariants({ variant: 'default' }))}>
            <div className="flex items-center gap-3">
              {filename && <span className="text-sm font-medium text-foreground">{filename}</span>}
              {showLanguage && !filename && (
                <span className="text-xs font-medium text-muted-foreground">
                  {languageInfo.label}
                </span>
              )}
              {header}
            </div>

            <div className="flex items-center gap-2">
              {collapsible && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium transition-colors',
                    'bg-background hover:bg-muted border border-border rounded-md',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                  )}
                  aria-label={isCollapsed ? 'Vis kode' : 'Skjul kode'}
                >
                  <svg
                    className={cn('w-3 h-3 transition-transform', isCollapsed && 'rotate-180')}
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
          <div className="relative">
            <div
              className={cn(
                'overflow-auto',
                maxHeight && 'scrollbar-thin scrollbar-thumb-border scrollbar-track-background'
              )}
            >
              <div className="flex">
                {/* Line numbers */}
                {showLineNumbers && (
                  <LineNumbers lines={lineCount} highlightLines={highlightLines} />
                )}

                {/* Code */}
                <pre
                  className={cn(
                    'flex-1 p-4 m-0 bg-transparent text-foreground font-mono leading-relaxed',
                    !wrap && 'overflow-x-auto',
                    wrap && 'whitespace-pre-wrap break-words'
                  )}
                >
                  <code className={cn('block', `language-${language}`)}>
                    {codeLines.map((line, index) => (
                      <span
                        key={index}
                        className={cn(
                          'block min-h-[1.25rem]',
                          highlightLines.includes(index + 1) && 'bg-accent/10 px-2 -mx-2 rounded'
                        )}
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
 * CodeBlock component variants export
 */
export { codeBlockHeaderVariants, codeBlockVariants, languageConfig };
