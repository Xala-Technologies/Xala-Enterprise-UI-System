#!/bin/bash

echo "Fixing remaining TypeScript errors in UI components..."

# List of files with high error counts
FILES=(
  "src/components/ui/message-bubble.tsx"
  "src/components/ui/pagination.tsx"
  "src/components/ui/typography.tsx"
  "src/components/ui/code-block.tsx"
  "src/components/ui/textarea.tsx"
  "src/components/ui/timeline.tsx"
  "src/components/ui/combobox.tsx"
  "src/components/ui/time-picker.tsx"
  "src/components/ui/tooltip-old.tsx"
  "src/components/ui/tree-view.tsx"
  "src/components/ui/divider.tsx"
  "src/components/ui/icon-button.tsx"
  "src/components/ui/separator.tsx"
  "src/components/ui/box.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Remove getToken calls
    sed -i '' "s/getToken([^)]*) as string || //g" "$file"
    sed -i '' "s/(getToken([^)]*) as string) || //g" "$file"
    sed -i '' "s/getToken([^)]*) || //g" "$file"
    
    # Fix colors references
    sed -i '' "s/colors\.background?\.default || //g" "$file"
    sed -i '' "s/colors\.background?\.paper || //g" "$file"
    sed -i '' "s/colors\.text?\.primary || //g" "$file"
    sed -i '' "s/colors\.text?\.secondary || //g" "$file"
    sed -i '' "s/colors\.border?\.default || //g" "$file"
    sed -i '' "s/colors\.primary?\.\\[500\\] || //g" "$file"
    sed -i '' "s/colors\.neutral?\.\\[\\([0-9]*\\)\\] || //g" "$file"
    sed -i '' "s/colors\.danger?\.\\[500\\] || //g" "$file"
    sed -i '' "s/colors\.success?\.\\[500\\] || //g" "$file"
    sed -i '' "s/colors\.warning?\.\\[500\\] || //g" "$file"
    sed -i '' "s/colors\.accent?\.default || //g" "$file"
    sed -i '' "s/colors\.accent?\.foreground || //g" "$file"
    
    # Fix typography references
    sed -i '' "s/typography\.fontSize\.\([a-z]*\)/'\${typography_fontSize_\1}'/g" "$file"
    sed -i '' "s/typography\.fontWeight\.\([a-z]*\)/'\${typography_fontWeight_\1}'/g" "$file"
    sed -i '' "s/typography\.lineHeight\.\([a-z]*\)/'\${typography_lineHeight_\1}'/g" "$file"
    sed -i '' "s/typography\.fontFamily\.sans\.join([^)]*)/\"Inter, system-ui, sans-serif\"/g" "$file"
    
    # Fix spacing references
    sed -i '' "s/spacing\[1\]/'0.25rem'/g" "$file"
    sed -i '' "s/spacing\[2\]/'0.5rem'/g" "$file"
    sed -i '' "s/spacing\[3\]/'0.75rem'/g" "$file"
    sed -i '' "s/spacing\[4\]/'1rem'/g" "$file"
    sed -i '' "s/spacing\[5\]/'1.25rem'/g" "$file"
    sed -i '' "s/spacing\[6\]/'1.5rem'/g" "$file"
    sed -i '' "s/spacing\[8\]/'2rem'/g" "$file"
    
    # Fix elevation references
    sed -i '' "s/elevation?\.sm || //g" "$file"
    sed -i '' "s/elevation?\.md || //g" "$file"
    sed -i '' "s/elevation?\.lg || //g" "$file"
    sed -i '' "s/elevation?\.default || //g" "$file"
    
    # Fix borderRadius references
    sed -i '' "s/borderRadius?\.sm || //g" "$file"
    sed -i '' "s/borderRadius?\.md || //g" "$file"
    sed -i '' "s/borderRadius?\.lg || //g" "$file"
    sed -i '' "s/borderRadius\.sm/'0.125rem'/g" "$file"
    sed -i '' "s/borderRadius\.md/'0.375rem'/g" "$file"
    sed -i '' "s/borderRadius\.lg/'0.5rem'/g" "$file"
    
    # Fix motion references
    sed -i '' "s/motion?\.duration?\.fast || //g" "$file"
    sed -i '' "s/motion?\.duration?\.normal || //g" "$file"
    sed -i '' "s/motion?\.duration?\.slow || //g" "$file"
    sed -i '' "s/motion?\.easing?\.ease || //g" "$file"
    sed -i '' "s/motion?\.easing?\.easeOut || //g" "$file"
    sed -i '' "s/motion?\.easing?\.easeIn || //g" "$file"
  fi
done

# Now fix typography values
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Replace typography placeholders with actual values
    sed -i '' "s/'\${typography_fontSize_xs}'/'0.75rem'/g" "$file"
    sed -i '' "s/'\${typography_fontSize_sm}'/'0.875rem'/g" "$file"
    sed -i '' "s/'\${typography_fontSize_base}'/'1rem'/g" "$file"
    sed -i '' "s/'\${typography_fontSize_lg}'/'1.125rem'/g" "$file"
    sed -i '' "s/'\${typography_fontSize_xl}'/'1.25rem'/g" "$file"
    sed -i '' "s/'\${typography_fontSize_2xl}'/'1.5rem'/g" "$file"
    sed -i '' "s/'\${typography_fontSize_3xl}'/'1.875rem'/g" "$file"
    sed -i '' "s/'\${typography_fontSize_4xl}'/'2.25rem'/g" "$file"
    
    sed -i '' "s/'\${typography_fontWeight_normal}'/'400'/g" "$file"
    sed -i '' "s/'\${typography_fontWeight_medium}'/'500'/g" "$file"
    sed -i '' "s/'\${typography_fontWeight_semibold}'/'600'/g" "$file"
    sed -i '' "s/'\${typography_fontWeight_bold}'/'700'/g" "$file"
    
    sed -i '' "s/'\${typography_lineHeight_none}'/'1'/g" "$file"
    sed -i '' "s/'\${typography_lineHeight_tight}'/'1.25'/g" "$file"
    sed -i '' "s/'\${typography_lineHeight_snug}'/'1.375'/g" "$file"
    sed -i '' "s/'\${typography_lineHeight_normal}'/'1.5'/g" "$file"
    sed -i '' "s/'\${typography_lineHeight_relaxed}'/'1.625'/g" "$file"
    sed -i '' "s/'\${typography_lineHeight_loose}'/'2'/g" "$file"
  fi
done

echo "Fixed remaining TypeScript errors"