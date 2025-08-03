# Semantic Components v5.0.0

> Complete HTML element abstraction system with design tokens and accessibility

The Semantic Components system provides a comprehensive set of components that replace raw HTML elements with semantic, accessible, and well-designed components that use the CVA pattern and design tokens throughout.

## Features

- ✅ **Complete HTML Abstraction**: Replaces div, span, h1-h6, p, button, input, ul, ol, li, a, img
- ✅ **CVA Pattern**: Class Variance Authority for consistent styling variants
- ✅ **Design Tokens**: Uses enterprise design tokens exclusively
- ✅ **TypeScript Native**: Full TypeScript support with proper interfaces
- ✅ **forwardRef**: Proper ref forwarding for all components
- ✅ **Accessibility**: WCAG AAA compliance with proper ARIA attributes
- ✅ **i18n Ready**: Language and direction support
- ✅ **Norwegian Compliance**: NSM classification support
- ✅ **Touch Friendly**: WCAG minimum 44px touch targets
- ✅ **Performance Optimized**: SSR-safe, framework-agnostic

## Quick Start

```tsx
import { 
  Main, 
  Section, 
  PageTitle, 
  Paragraph, 
  PrimaryButton 
} from '@/components/semantic';

function WelcomePage() {
  return (
    <Main spacing="xl">
      <Section variant="card" spacing="lg">
        <PageTitle>Welcome to Our Platform</PageTitle>
        <Paragraph>
          Get started with our semantic component system.
        </Paragraph>
        <PrimaryButton size="lg">
          Get Started
        </PrimaryButton>
      </Section>
    </Main>
  );
}
```

## Component Categories

### Layout Components
Replace structural HTML elements with semantic meaning:
- `Box` - Replaces div, section, article, main, aside, header, footer, nav
- `Section`, `Article`, `Header`, `Footer`, `Main`, `Nav`, `Aside` - Semantic variants

### Typography Components
Replace text HTML elements with proper typography:
- `Text` - Replaces span, p, label, small, strong, em, code
- `Heading` - Replaces h1-h6 with semantic levels
- `Paragraph`, `Label`, `Small`, `Code`, `Strong`, `Emphasis` - Semantic variants

### Interactive Components
Replace interactive HTML elements with enhanced functionality:
- `Button` - Enhanced button with loading states and icons
- `Link` - Smart link with external detection and accessibility
- Variants: `PrimaryButton`, `SecondaryButton`, `OutlineButton`, etc.

### Form Components
Replace form HTML elements with proper labeling:
- `Input` - Enhanced input with validation and labeling
- Variants: `SearchInput`, `EmailInput`, `PasswordInput`, etc.

### Content Components
Replace content HTML elements:
- `List`, `ListItem` - Replace ul, ol, li with semantic lists
- `Image` - Enhanced image with loading states and optimization
- `DescriptionList` - Replace dl, dt, dd elements

## Core Principles

### 1. Semantic HTML
Every component renders appropriate semantic HTML:

```tsx
<Main> {/* renders <main> */}
  <Section> {/* renders <section> */}
    <PageTitle> {/* renders <h1> */}
      Page Title
    </PageTitle>
    <Paragraph> {/* renders <p> */}
      Content here
    </Paragraph>
  </Section>
</Main>
```

### 2. Intent-Based Configuration
Components auto-configure based on semantic intent:

```tsx
// Automatically becomes h1 with display styling
<Heading intent="page-title">Main Title</Heading>

// Automatically becomes mailto: link
<Link intent="email" href="user@example.com">Email Us</Link>

// Automatically becomes circular avatar
<Image intent="avatar" src="/user.jpg" alt="User" />
```

### 3. Design Token Integration
All styling uses design tokens via CVA:

```tsx
<Box 
  variant="elevated"    // Uses elevation tokens
  spacing="lg"          // Uses spacing tokens
  radius="md"           // Uses border radius tokens
>
  <Text 
    size="lg"           // Uses typography tokens
    weight="semibold"   // Uses font weight tokens
    variant="accent"    // Uses color tokens
  >
    Token-based styling
  </Text>
</Box>
```

### 4. Accessibility First
Proper ARIA attributes and keyboard navigation:

```tsx
<Input 
  label="Email Address"
  required
  errorMessage="Please enter a valid email"
  // Automatically generates:
  // - aria-required="true"
  // - aria-invalid="true" (when error)
  // - aria-describedby linking to error message
  // - proper label association
/>
```

## Component Reference

### Box Component
The foundational layout component:

```tsx
<Box
  as="section"              // HTML element to render
  variant="elevated"        // Visual variant
  spacing="lg"             // Internal padding
  radius="md"              // Border radius
  display="flex"           // Display type
  direction="col"          // Flex direction
  justify="center"         // Justify content
  align="center"           // Align items
  gap="md"                 // Gap between children
>
  Content
</Box>
```

**Variants**: `default`, `outline`, `filled`, `ghost`, `elevated`, `surface`, `accent`, `muted`

### Text Component
The foundational text component:

```tsx
<Text
  as="span"                // HTML element
  intent="body"            // Semantic intent
  size="lg"               // Text size
  weight="semibold"       // Font weight
  variant="accent"        // Color variant
  align="center"          // Text alignment
  truncate="ellipsis"     // Truncation behavior
>
  Text content
</Text>
```

**Intents**: `body`, `caption`, `label`, `code`, `emphasis`, `strong`, `muted`, `error`, `success`, `warning`, `info`

### Heading Component
Semantic heading with automatic hierarchy:

```tsx
<Heading
  level={2}                    // Semantic level (h1-h6)
  intent="section-title"       // Auto-configures level and styling
  visualSize="h1"             // Visual size (independent of level)
  align="center"              // Text alignment
  family="display"            // Font family
>
  Section Title
</Heading>
```

**Intents**: `page-title`, `section-title`, `card-title`, `modal-title`, `sidebar-title`, `display`, `subtitle`

### Button Component
Enhanced button with loading and icon support:

```tsx
<Button
  intent="primary"             // Button intent
  size="lg"                   // Touch-friendly sizes
  loadingState="loading"      // Loading state
  loadingText="Saving..."     // Custom loading text
  icon={<SaveIcon />}         // Icon element
  iconPosition="left"         // Icon position
  tooltip="Save document"     // Tooltip for icon-only
  fullWidth                   // Full width button
>
  Save Changes
</Button>
```

**Intents**: `primary`, `secondary`, `outline`, `ghost`, `destructive`, `success`, `warning`, `info`, `link`

### Input Component
Enhanced input with labeling and validation:

```tsx
<Input
  intent="email"                    // Auto-configures type and validation
  label="Email Address"             // Associated label
  required                          // Required field
  helperText="We'll never share"    // Helper text
  errorMessage="Invalid email"      // Error message
  successMessage="Looks good!"      // Success message
  prefix={<EmailIcon />}            // Prefix icon
  suffix={<CheckIcon />}            // Suffix icon
/>
```

**Intents**: `default`, `search`, `email`, `password`, `phone`, `url`, `number`, `date`, `file`

### List Components
Semantic lists with proper markup:

```tsx
<List intent="navigation">
  <ListItem interactive state="active">
    <NavigationLink href="/">Home</NavigationLink>
  </ListItem>
  <ListItem interactive>
    <NavigationLink href="/about">About</NavigationLink>
  </ListItem>
</List>

<List intent="steps">
  <ListItem>First step</ListItem>
  <ListItem>Second step</ListItem>
</List>
```

**List Intents**: `navigation`, `checklist`, `steps`, `features`, `links`, `breadcrumb`, `tags`

### Link Component
Smart link with external detection:

```tsx
<Link
  href="https://external.com"
  intent="external"              // Auto-adds target="_blank"
  // Automatically detects external links
>
  External Link
</Link>

<Link
  href="user@example.com"
  intent="email"                 // Auto-adds mailto:
>
  Email Us
</Link>
```

**Intents**: `navigation`, `breadcrumb`, `external`, `download`, `email`, `phone`, `anchor`, `destructive`

### Image Component
Enhanced image with loading states:

```tsx
<Image
  intent="avatar"                // Auto-configures styling
  src="/user.jpg"
  alt="User Avatar"
  fallbackSrc="/default.jpg"    // Fallback image
  priority                       // Priority loading
  lazy={false}                   // Disable lazy loading
  loading={LoadingComponent}     // Custom loading component
  errorPlaceholder={ErrorComp}   // Custom error component
/>
```

**Intents**: `avatar`, `logo`, `hero`, `thumbnail`, `gallery`, `product`, `background`, `icon`, `decorative`

## Norwegian Compliance

All components support Norwegian compliance attributes:

```tsx
<Box nsmLevel="RESTRICTED">
  <Text lang="nb-NO" dir="ltr">
    Klassifisert innhold
  </Text>
</Box>
```

## Responsive Design

Components work with responsive design tokens:

```tsx
<Box
  spacing={{ base: 'sm', md: 'lg', xl: 'xl' }}
  display={{ base: 'block', md: 'flex' }}
>
  <Text size={{ base: 'sm', md: 'base', lg: 'lg' }}>
    Responsive text
  </Text>
</Box>
```

## Performance

- **SSR Safe**: All components work in server-side rendering
- **Tree Shakeable**: Import only what you need
- **No Runtime CSS**: All styles are compile-time with Tailwind
- **Optimized Bundle**: Components are optimized for bundle size

## Migration Guide

### From Raw HTML

```tsx
// Before
<div className="p-8 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4">Title</h2>
  <p className="text-gray-600">Content</p>
  <button className="bg-blue-600 text-white px-6 py-2 rounded">
    Action
  </button>
</div>

// After
<Box variant="elevated" spacing="lg">
  <SectionTitle>Title</SectionTitle>
  <Paragraph variant="muted">Content</Paragraph>
  <PrimaryButton>Action</PrimaryButton>
</Box>
```

### From Other Component Libraries

```tsx
// From Material-UI/Chakra UI
<Typography variant="h2">Title</Typography>
<Button variant="contained" color="primary">Action</Button>

// To Semantic Components
<SectionTitle>Title</SectionTitle>
<PrimaryButton>Action</PrimaryButton>
```

## Best Practices

### 1. Use Semantic Intents
Prefer semantic intents over manual configuration:

```tsx
// Good
<Heading intent="page-title">Main Title</Heading>
<Image intent="avatar" src="/user.jpg" alt="User" />

// Avoid
<Heading level={1} size="display-lg" family="display">Main Title</Heading>
<Image variant="circular" aspectRatio="square" size="md" src="/user.jpg" />
```

### 2. Proper HTML Hierarchy
Maintain proper HTML structure:

```tsx
// Good - Proper heading hierarchy
<Main>
  <PageTitle>Page Title</PageTitle>        {/* h1 */}
  <Section>
    <SectionTitle>Section</SectionTitle>   {/* h2 */}
    <CardTitle>Card Title</CardTitle>      {/* h3 */}
  </Section>
</Main>

// Avoid - Skipping heading levels
<Main>
  <PageTitle>Page Title</PageTitle>        {/* h1 */}
  <Heading level={4}>Subsection</Heading> {/* h4 - skips h2, h3 */}
</Main>
```

### 3. Accessibility Labels
Always provide proper labels and descriptions:

```tsx
// Good
<Input 
  label="Email Address"
  required
  aria-describedby="email-help"
/>
<Small id="email-help">We'll never share your email</Small>

// Good - Icon button with tooltip
<IconButton 
  tooltip="Save document"
  icon={<SaveIcon />}
  aria-label="Save document"
/>
```

### 4. Performance Optimization
Optimize for performance:

```tsx
// Good - Priority loading for above-the-fold images
<HeroImage 
  src="/hero.jpg" 
  alt="Hero image"
  priority 
  lazy={false}
/>

// Good - Lazy loading for below-the-fold images
<GalleryImage 
  src="/gallery.jpg" 
  alt="Gallery image"
  lazy 
/>
```

## API Reference

See individual component files for complete TypeScript interfaces and props documentation.

## Contributing

When adding new semantic components:

1. Follow the established patterns (CVA + design tokens)
2. Include proper TypeScript interfaces
3. Add accessibility attributes
4. Support Norwegian compliance
5. Include comprehensive tests
6. Update this documentation

## Version History

- **v5.0.0** - Initial semantic components system
- Complete HTML element abstraction
- CVA pattern with design tokens
- WCAG AAA compliance
- Norwegian compliance support
- i18n ready
- Performance optimized