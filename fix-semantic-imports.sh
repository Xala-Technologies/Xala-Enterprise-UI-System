#!/bin/bash

echo "Adding semantic imports to components that need them..."

# Files that use Box but don't import it
FILES_NEEDING_BOX=(
  "src/components/layout-preview/LayoutGallery.tsx"
  "src/components/layout-preview/LayoutPreview.tsx"
  "src/components/enhanced/ThemeAwareCard.tsx"
  "src/components/enhanced/ThemeAwareButton.tsx"
  "src/components/enhanced/ThemeAwareSearch.tsx"
)

for file in "${FILES_NEEDING_BOX[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    # Check if Box is used but not imported
    if grep -q "Box" "$file" && ! grep -q "import.*Box.*from.*semantic" "$file"; then
      # Add import after the first import line
      sed -i '' '/^import/a\
import { Box, Text, Heading } from "../semantic";
' "$file"
    fi
  fi
done

echo "Fixed semantic imports"