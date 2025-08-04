#!/bin/bash

echo "Batch fixing semantic imports in UI components..."

# List of UI component files that need semantic imports
UI_FILES=(
  "src/components/ui/tree-view.tsx"
  "src/components/ui/date-picker.tsx"
  "src/components/ui/container.tsx"
  "src/components/ui/spacing.tsx"
  "src/components/ui/grid.tsx"
  "src/components/ui/scroll-area.tsx"
  "src/components/ui/combobox.tsx"
  "src/components/ui/footer.tsx"
  "src/components/ui/calendar.tsx"
  "src/components/ui/timeline.tsx"
  "src/components/ui/icon-button.tsx"
  "src/components/ui/dropdown.tsx"
  "src/components/ui/multi-select.tsx"
  "src/components/ui/header.tsx"
  "src/components/ui/main-content.tsx"
  "src/components/ui/code-block.tsx"
  "src/components/ui/sidebar.tsx"
  "src/components/ui/button.tsx"
  "src/components/ui/tooltip-old.tsx"
  "src/components/ui/input.tsx"
  "src/components/ui/context-menu.tsx"
)

for file in "${UI_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    # Check if semantic import already exists
    if ! grep -q "from '../semantic'" "$file"; then
      # Add import after the first line with 'import React'
      awk '/^import React/ {print; print "import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput } from '\''../semantic'\'';"; next} 1' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
  fi
done

echo "Done adding semantic imports to UI components"