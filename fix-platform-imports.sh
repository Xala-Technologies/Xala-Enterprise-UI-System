#!/bin/bash

echo "Fixing imports in platform components..."

# Platform components that need semantic imports
PLATFORM_FILES=(
  "src/components/platform/tablet/SplitView.tsx"
  "src/components/platform/mobile/SwipeableDrawer.tsx"
  "src/components/layout-preview/LayoutPreview.tsx"
  "src/components/navigation/WebNavbar.tsx"
  "src/components/performance/LazyImage.tsx"
)

for file in "${PLATFORM_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    if ! grep -q "from.*semantic" "$file"; then
      # Add import after first import line
      awk '/^import/ {print; if (!done) {print "import { Box, Text, Heading } from '\''../../semantic'\'';"; done=1}} 1' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
  fi
done

echo "Done fixing platform imports"