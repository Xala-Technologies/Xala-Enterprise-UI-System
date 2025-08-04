#!/bin/bash

echo "Fixing all semantic imports..."

# Find all files that use Box but don't import it
find src -type f \( -name "*.tsx" -o -name "*.ts" \) | while read -r file; do
  # Skip semantic directory itself
  if [[ "$file" == *"/semantic/"* ]]; then
    continue
  fi
  
  # Check if file uses Box/Text/Heading but doesn't import from semantic
  if grep -q "<Box\|<Text\|<Heading" "$file" 2>/dev/null; then
    if ! grep -q "import.*{.*Box.*}.*from.*['\"].*semantic" "$file" 2>/dev/null; then
      echo "Adding semantic imports to $file"
      
      # Determine relative path to semantic
      depth=$(echo "$file" | tr -cd '/' | wc -c)
      depth=$((depth - 1))  # Subtract 1 for src/
      
      if [ $depth -eq 1 ]; then
        import_path="./semantic"
      elif [ $depth -eq 2 ]; then
        import_path="../semantic"
      elif [ $depth -eq 3 ]; then
        import_path="../../semantic"
      else
        import_path="../../../semantic"
      fi
      
      # Add import after the first import or at the beginning
      if grep -q "^import" "$file"; then
        # Add after first import
        sed -i '' "0,/^import/{s/^import/import { Box, Text, Heading } from '$import_path';\nimport/}" "$file"
      else
        # Add at beginning
        sed -i '' "1s/^/import { Box, Text, Heading } from '$import_path';\n/" "$file"
      fi
    fi
  fi
done

echo "Fixed all semantic imports"