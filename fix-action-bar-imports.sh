#!/bin/bash

echo "Fixing imports in action-bar components..."

# Fix ActionBar.tsx
file="src/components/ui/action-bar/ActionBar.tsx"
if [ -f "$file" ]; then
  echo "Processing $file..."
  if ! grep -q "from '../../semantic'" "$file"; then
    awk '/^import/ {print; if (!done) {print "import { Box, Text } from '\''../../semantic'\'';"; done=1}} 1' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  fi
fi

# Fix ActionButton.tsx
file="src/components/ui/action-bar/ActionButton.tsx"
if [ -f "$file" ]; then
  echo "Processing $file..."
  if ! grep -q "from '../../semantic'" "$file"; then
    awk '/^import/ {print; if (!done) {print "import { Box, Text } from '\''../../semantic'\'';"; done=1}} 1' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  fi
fi

echo "Done fixing action-bar imports"