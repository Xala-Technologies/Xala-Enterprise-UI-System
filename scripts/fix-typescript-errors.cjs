/* eslint-disable */
const fs = require('fs');
const path = require('path');

// Files with TypeScript errors
const filesToFix = {
  'src/components/action-feedback/Modal.tsx': [
    { search: /React\.useEffect\(\(\) => : void => \{/g, replace: 'React.useEffect(() => {' },
    { search: /const handleTab = \(_e: KeyboardEvent\): void => \{/g, replace: 'const handleTab = (_e: KeyboardEvent): void => {' },
    { search: /const handleEscape = \(_event: KeyboardEvent\): void => \{/g, replace: 'const handleEscape = (_event: KeyboardEvent): void => {' },
    { search: /\): void => \{/g, replace: '): void => {' },
    { search: /=> : void => /g, replace: '=> ' },
  ],
  
  'src/components/data-display/KeyValueList.tsx': [
    { search: /const listClasses = React\.useMemo\(\(\) => : void => \{/g, replace: 'const listClasses = React.useMemo(() => {' },
    { search: /const displayItems = React\.useMemo\(\(\) => : void => \{/g, replace: 'const displayItems = React.useMemo(() => {' },
    { search: /const itemClasses = React\.useMemo\(\(\) => : void => \{/g, replace: 'const itemClasses = React.useMemo(() => {' },
    { search: /\(\) => : void => \{/g, replace: '() => {' },
  ],
  
  'src/components/data-table/DataTable.tsx': [
    { search: /onChange=\{\(\) => : void => \{/g, replace: 'onChange={() => {' },
    { search: /\(\) => : void => /g, replace: '() => ' },
  ],
  
  'src/components/form/Select.tsx': [
    { search: /const renderOptions = useCallback\(\(\) => : void => \{/g, replace: 'const renderOptions = useCallback(() => {' },
    { search: /Object\.entries\(_groupedOptions\)\.forEach\(\(\[group, groupOptions\]\) => : void => \{/g, replace: 'Object.entries(_groupedOptions).forEach(([group, groupOptions]) => {' },
  ],
  
  'src/components/global-search/GlobalSearch.tsx': [
    { search: /setTimeout\(\(\) => : void => \{/g, replace: 'setTimeout(() => {' },
  ],
  
  'src/components/performance/LazyImage.tsx': [
    { search: /\}\) => : void => \{/g, replace: '}) => {' },
    { search: /const handleLoad = useCallback\(\(_event: any\) => : void => \{/g, replace: 'const handleLoad = useCallback((_event: any) => {' },
    { search: /const handleError = useCallback\(\(_event: any\) => : void => \{/g, replace: 'const handleError = useCallback((_event: any) => {' },
    { search: /useEffect\(\(\) => : void => \{/g, replace: 'useEffect(() => {' },
    { search: /\(_entries\) => : void => \{/g, replace: '(_entries) => {' },
    { search: /entries\.forEach\(\(_entry\) => : void => \{/g, replace: 'entries.forEach((_entry) => {' },
    { search: /return \(\) => : void => \{/g, replace: 'return () => {' },
    { search: /\}, _ref\) => : void => \{/g, replace: '}, _ref) => {' },
    { search: /\(_source, _index\) => \(/g, replace: '(_source, _index) => (' },
    { search: /\}, _ref\) => : void => \{/g, replace: '}, _ref) => {' },
  ],
  
  'src/components/ThemeManager/ThemeManager.tsx': [
    { search: /const allThemes = useMemo\(\(\) => : void => \{/g, replace: 'const allThemes = useMemo(() => {' },
    { search: /const handleThemeChange = useCallback\(async \(_themeId: string\) => : void => \{/g, replace: 'const handleThemeChange = useCallback(async (_themeId: string) => {' },
    { search: /const toggleTheme = useCallback\(async \(\) => : void => \{/g, replace: 'const toggleTheme = useCallback(async () => {' },
    { search: /const handleToggle = useCallback\(async \(\) => : void => \{/g, replace: 'const handleToggle = useCallback(async () => {' },
  ],
};

// Additional global fixes
function globalFixes(content) {
  // Fix malformed arrow functions
  content = content.replace(/\) => : void => \{/g, ') => {');
  content = content.replace(/=> : void => /g, '=> ');
  content = content.replace(/: void => void/g, ': void');
  
  // Fix malformed variables
  content = content.replace(/_false/g, 'false');
  content = content.replace(/_true/g, 'true');
  content = content.replace(/_null/g, 'null');
  
  // Fix double underscores
  content = content.replace(/__(\w+)/g, '_$1');
  
  return content;
}

// Process each file
Object.entries(filesToFix).forEach(([file, fixes]) => {
  const filePath = path.join(__dirname, '..', file);
  
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Apply specific fixes
      fixes.forEach(fix => {
        content = content.replace(fix.search, fix.replace);
      });
      
      // Apply global fixes
      content = globalFixes(content);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed TypeScript errors in: ${file}`);
    } catch (error) {
      console.error(`Error fixing ${file}:`, error.message);
    }
  }
});

console.log('\nTypeScript error fixes completed.');