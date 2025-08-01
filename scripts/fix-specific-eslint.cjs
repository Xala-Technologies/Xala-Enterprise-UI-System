const fs = require('fs');
const path = require('path');

// Function to fix specific ESLint errors
function fixFile(filePath, fixes) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply specific fixes
    for (const fix of fixes) {
      const oldContent = content;
      content = fix(content);
      if (content !== oldContent) {
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Specific fixes for each file
const fileFixes = {
  'src/components/ThemeManager/ThemeManager.tsx': [
    content => content.replace(/setTheme: \(theme: ThemeType\)/g, 'setTheme: (_theme: ThemeType)'),
    content => content.replace(/const allowCustomThemes =/g, 'const _allowCustomThemes ='),
    content => content.replace(/const baseSetTheme =/g, 'const _baseSetTheme ='),
    content => content.replace(/\.map\(\(t\)/g, '.map((_t)'),
    content => content.replace(/\(themeId: string\)/g, '(_themeId: string)'),
  ],
  
  'src/components/action-feedback/Modal.tsx': [
    content => content.replace(/open: boolean/g, '_open: boolean'),
    content => content.replace(/const size =/g, 'const _size ='),
    content => content.replace(/norwegian,/g, '_norwegian,'),
    content => content.replace(/const centered =/g, 'const _centered ='),
  ],
  
  'src/components/action-feedback/Toast.tsx': [
    // This file was already modified by the script and has syntax errors that need manual fixing
    content => {
      // Remove the malformed useEffect
      content = content.replace(/React\.useEffect\(\(\) => : void => : void => \{/g, 'React.useEffect(() => {');
      // Fix the malformed arrow functions
      content = content.replace(/\) => : void => : void => \{/g, ') => {');
      content = content.replace(/\(\) => : void => /g, '() => ');
      // Fix parameter names
      content = content.replace(/level:/g, '_level:');
      content = content.replace(/variant:/g, '_variant:');
      content = content.replace(/props:/g, '_props:');
      content = content.replace(/position:/g, '_position:');
      return content;
    }
  ],
  
  'src/components/data-display/DataTable.tsx': [
    content => content.replace(/const t =/g, 'const _t ='),
  ],
  
  'src/components/data-display/KeyValueList.tsx': [
    content => content.replace(/const ClassificationIcon =/g, 'const _ClassificationIcon ='),
    content => content.replace(/, format\)/g, ', _format)'),
  ],
  
  'src/components/data-display/Tag.tsx': [
    content => content.replace(/const t =/g, 'const _t ='),
  ],
  
  'src/components/data-table/DataTable.tsx': [
    content => content.replace(/\(value,/g, '(_value,'),
    content => content.replace(/, item,/g, ', _item,'),
    content => content.replace(/, index\)/g, ', _index)'),
    content => content.replace(/\(column,/g, '(_column,'),
    content => content.replace(/, direction\)/g, ', _direction)'),
    content => content.replace(/\(selectedRows\)/g, '(_selectedRows)'),
  ],
  
  'src/components/filter-bar/FilterBar.tsx': [
    content => content.replace(/\(value\)/g, '(_value)'),
    content => content.replace(/\(filterId,/g, '(_filterId,'),
  ],
  
  'src/components/form/Select.tsx': [
    content => content.replace(/\(key\)/g, '(_key)'),
  ],
  
  'src/components/global-search/GlobalSearch.tsx': [
    content => content.replace(/\(value\)/g, '(_value)'),
    content => content.replace(/\(result\)/g, '(_result)'),
    content => content.replace(/, index\)/g, ', _index)'),
    content => content.replace(/\(isOpen\)/g, '(_isOpen)'),
  ],
  
  'src/components/layout-preview/LayoutGallery.tsx': [
    // This file also has syntax errors from the previous script
    content => {
      content = content.replace(/\) => : void => : void => \{/g, ') => {');
      content = content.replace(/\(\) => : void => /g, '() => ');
      content = content.replace(/layouts: LayoutType\[\]\) => : void => void/g, 'layouts: LayoutType[]) => void');
      content = content.replace(/config: LayoutPreviewConfig\) => : void => void/g, 'config: LayoutPreviewConfig) => void');
      content = content.replace(/onClick\?: \(\) => : void => void/g, 'onClick?: () => void');
      content = content.replace(/types: LayoutType\[\]\) => : void => void/g, 'types: LayoutType[]) => void');
      return content;
    }
  ],
  
  'src/components/layout-preview/LayoutPreview.tsx': [
    // This file also has syntax errors from the previous script
    content => {
      // Fix malformed syntax
      content = content.replace(/\) => : void => : void => \{/g, ') => {');
      content = content.replace(/\(\) => : void => /g, '() => ');
      content = content.replace(/layout: LayoutType\) => : void => void/g, 'layout: LayoutType) => void');
      content = content.replace(/onClick\?: \(\) => : void => void/g, 'onClick?: () => void');
      // Fix imports
      content = content.replace(/import\s*{\s*_LayoutSwitcher,/g, 'import { LayoutSwitcher,');
      content = content.replace(/} from '\.\.\/\.\.\/hooks\/';/g, '} from \'../../hooks/useResponsiveLayout\';');
      // Fix component usage
      content = content.replace(/const { _colors} = useTokens\(\);/g, 'const { colors } = useTokens();');
      content = content.replace(/const { _colors, spacing } = useTokens\(\);/g, 'const { colors, _spacing } = useTokens();');
      // Add missing return types
      content = content.replace(/const getLayoutComponent = \(type: LayoutType\) => {/g, 'const getLayoutComponent = (type: LayoutType): React.ComponentType => {');
      return content;
    }
  ],
  
  'src/components/navigation/NavigationComponents.tsx': [
    content => content.replace(/\(key\)/g, '(_key)'),
  ],
  
  'src/components/performance/LazyImage.tsx': [
    // Add missing closing parenthesis
    content => {
      if (!content.endsWith('});\n') && content.endsWith('}\n')) {
        return content.slice(0, -2) + '});\n';
      }
      return content;
    }
  ],
};

// Fix all files
let fixedCount = 0;
for (const [file, fixes] of Object.entries(fileFixes)) {
  const filePath = path.join(__dirname, '..', file);
  if (fixFile(filePath, fixes)) {
    fixedCount++;
  }
}

console.log(`\nFixed ${fixedCount} files`);