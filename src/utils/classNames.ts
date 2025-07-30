/**
 * Class name composition utility
 * Replaces tailwind-merge dependency with custom implementation
 * Provides type-safe class name composition and deduplication
 */

/**
 * Configuration for class name handling
 */
interface ClassNameConfig {
  /** Whether to deduplicate conflicting classes */
  deduplicate: boolean;
  /** Whether to preserve order of classes */
  preserveOrder: boolean;
  /** Custom conflict resolution rules */
  conflictRules?: Record<string, string[]>;
}

const defaultConfig: ClassNameConfig = {
  deduplicate: true,
  preserveOrder: false,
};

/**
 * Compose class names with intelligent deduplication
 * @param classes - Array of class names, objects, or conditional values
 * @param config - Configuration options
 * @returns Composed class name string
 */
export function classNames(
  ...classes: Array<string | Record<string, boolean> | undefined | null | false>
): string {
  const classMap = new Map<string, number>();
  const classOrder: string[] = [];

  function processClassName(
    className: string | Record<string, boolean> | undefined | null | false,
    index: number
  ): void {
    if (!className) return;

    if (typeof className === 'string') {
      const trimmed = className.trim();
      if (trimmed) {
        const individualClasses = trimmed.split(/\s+/);
        individualClasses.forEach(cls => {
          if (!classMap.has(cls) || index > (classMap.get(cls) || 0)) {
            classMap.set(cls, index);
            if (!classOrder.includes(cls)) {
              classOrder.push(cls);
            }
          }
        });
      }
    } else if (typeof className === 'object') {
      Object.entries(className).forEach(([cls, condition]) => {
        if (condition) {
          processClassName(cls, index);
        }
      });
    }
  }

  classes.forEach((cls, index) => {
    processClassName(cls, index);
  });

  // Resolve conflicts based on Tailwind-like rules
  const resolvedClasses = resolveConflicts(classOrder);

  return resolvedClasses.join(' ');
}

/**
 * Resolve conflicts between similar utility classes
 * @param classes - Array of class names
 * @returns Resolved class names array
 */
function resolveConflicts(classes: string[]): string[] {
  const conflictGroups = {
    // Layout
    'display': ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'contents', 'hidden'],
    'position': ['static', 'fixed', 'absolute', 'relative', 'sticky'],
    
    // Sizing
    'width': ['w-', 'min-w-', 'max-w-'],
    'height': ['h-', 'min-h-', 'max-h-'],
    
    // Spacing
    'margin': ['m-', 'mt-', 'mr-', 'mb-', 'ml-', 'mx-', 'my-'],
    'padding': ['p-', 'pt-', 'pr-', 'pb-', 'pl-', 'px-', 'py-'],
    
    // Typography
    'font-size': ['text-'],
    'font-weight': ['font-', 'font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black'],
    
    // Colors
    'text-color': ['text-'],
    'background-color': ['bg-'],
    'border-color': ['border-'],
    
    // Flexbox
    'flex-direction': ['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'],
    'flex-wrap': ['flex-wrap', 'flex-wrap-reverse', 'flex-nowrap'],
    'justify-content': ['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'],
    'align-items': ['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch'],
    
    // Grid
    'grid-cols': ['grid-cols-'],
    'col-span': ['col-span-', 'col-start-', 'col-end-'],
    'grid-rows': ['grid-rows-'],
    'row-span': ['row-span-', 'row-start-', 'row-end-'],
  };

  const resolved = new Set<string>();
  const seenGroups = new Map<string, string>();

  for (const cls of classes) {
    let added = false;
    
    for (const [group, patterns] of Object.entries(conflictGroups)) {
      for (const pattern of patterns) {
        if (cls.startsWith(pattern) || cls === pattern) {
          if (seenGroups.has(group)) {
            // Remove the previous class from this group
            const previousClass = seenGroups.get(group);
            if (previousClass) {
              resolved.delete(previousClass);
            }
          }
          resolved.add(cls);
          seenGroups.set(group, cls);
          added = true;
          break;
        }
      }
      if (added) break;
    }
    
    if (!added) {
      resolved.add(cls);
    }
  }

  return Array.from(resolved);
}

/**
 * Variant-based class name composition
 * @param base - Base class name
 * @param variants - Object of variant classes
 * @param props - Props object to determine variants
 * @returns Composed class name
 */
export function composeClassName(
  base: string,
  variants: Record<string, Record<string, string>>,
  props: Record<string, string | boolean | undefined>
): string {
  const classes = [base];

  for (const [variant, options] of Object.entries(variants)) {
    const value = props[variant];
    if (value !== undefined && value !== false && typeof value === 'string' && options[value]) {
      classes.push(options[value]);
    }
  }

  return classNames(...classes);
}

/**
 * Conditional class name utility
 * @param conditions - Object of class names and their conditions
 * @returns Composed class name string
 */
export function conditionalClassNames(
  conditions: Record<string, boolean | undefined | null>
): string {
  const classes = Object.entries(conditions)
    .filter(([, condition]) => Boolean(condition))
    .map(([className]) => className);

  return classNames(...classes);
}

/**
 * Utility to validate class names
 * @param className - The class name to validate
 * @returns Validation result
 */
export function validateClassName(className: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (typeof className !== 'string') {
    issues.push('Class name must be a string');
    return { valid: false, issues };
  }

  if (className.trim() === '') {
    issues.push('Class name cannot be empty');
    return { valid: false, issues };
  }

  // Check for invalid characters
  const invalidChars = /[^\w\s\-_:]/g;
  const matches = className.match(invalidChars);
  if (matches) {
    issues.push(`Invalid characters found: ${matches.join(', ')}`);
  }

  return { valid: issues.length === 0, issues };
}
