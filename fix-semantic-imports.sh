#!/bin/bash

# Fix imports in layout-preview
sed -i '' "s|from '../../semantic'|from '../semantic'|g" src/components/layout-preview/*.tsx

# Fix imports in navigation
sed -i '' "s|from '../../semantic'|from '../semantic'|g" src/components/navigation/*.tsx

# Fix imports in performance
sed -i '' "s|from '../../semantic'|from '../semantic'|g" src/components/performance/*.tsx

# Fix imports in platform subdirectories
sed -i '' "s|from '../../../semantic'|from '../../semantic'|g" src/components/platform/mobile/*.tsx
sed -i '' "s|from '../../../semantic'|from '../../semantic'|g" src/components/platform/tablet/*.tsx

# Fix imports in ui/action-bar
sed -i '' "s|from '../../../semantic'|from '../../semantic'|g" src/components/ui/action-bar/*.tsx

echo "Fixed semantic import paths"