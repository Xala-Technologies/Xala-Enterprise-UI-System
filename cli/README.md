# Xala CLI - Universal Design System CLI

The comprehensive command-line interface for the Xala Universal Design System. Build beautiful, accessible, and compliant applications across all platforms with AI-powered generation and enterprise-grade features.

## Installation

```bash
npm install -g @xala-technologies/xala-cli
```

## Quick Start

```bash
# Initialize a new project
xala init my-app --platform react --template saas

# Generate component with AI
xala ai generate "user dashboard with data table and filters"

# Create custom theme
xala themes create healthcare --brand "Medical Corp"

# Start development server
xala dev --port 3001 --platform react

# Build for production
xala build react --optimize

# Analyze project
xala analyze --performance --accessibility --compliance
```

## Commands

### Project Management
- `xala init [name]` - Initialize design system in new project
- `xala create [type] [name]` - Create components, pages, layouts

### Design System Management
- `xala tokens generate|validate|sync` - Manage design tokens
- `xala themes create|apply|customize` - Theme management
- `xala components scaffold|update|validate` - Component management

### AI-Powered Generation
- `xala ai generate [description]` - Generate from natural language
- `xala ai suggest [context]` - Get AI suggestions
- `xala ai validate [file]` - Validate code compliance
- `xala ai explain [concept]` - Explain design concepts

### Multi-Platform Build
- `xala build [platform]` - Build for target platform
- `xala deploy [target]` - Deploy to environment
- `xala sync [platform]` - Sync between platforms

### Developer Tools
- `xala dev` - Development server with hot-reload
- `xala preview [component]` - Component preview
- `xala analyze` - Performance and compliance analysis

### Documentation & Help
- `xala docs [topic]` - Interactive documentation
- `xala examples [pattern]` - Code examples
- `xala help [command]` - Detailed help

## Features

### 🎨 **Universal Design System**
- Multi-platform support (React, Vue, Angular, Flutter, iOS, Android)
- Consistent design tokens across all platforms
- Industry-specific themes and templates
- Norwegian design standards compliance

### 🤖 **AI-Powered Development**
- Generate components from natural language descriptions
- Intelligent code suggestions and patterns
- Automated compliance validation
- Context-aware recommendations

### 🏢 **Enterprise Ready**
- WCAG 2.2 AAA accessibility compliance
- Norwegian government standards (NSM)
- GDPR compliance and data protection
- Multi-language support (EN, NO, FR, AR)

### 🛠️ **Developer Experience**
- Interactive project scaffolding
- Real-time development server
- Hot-reload and live preview
- Comprehensive analysis tools

### 📊 **Quality Assurance**
- Performance monitoring and optimization
- Accessibility testing and validation
- Code quality and compliance checks
- Bundle analysis and optimization

## Supported Platforms

### Web Platforms
- **React** - Next.js, Create React App, Vite
- **Vue** - Nuxt.js, Vue CLI, Vite
- **Angular** - Angular CLI, Standalone

### Mobile Platforms
- **Flutter** - Cross-platform mobile
- **React Native** - iOS and Android
- **iOS** - Native Swift/SwiftUI
- **Android** - Native Kotlin/Compose

### Desktop Platforms
- **Electron** - Cross-platform desktop
- **Tauri** - Rust-based desktop
- **PWA** - Progressive Web Apps

## Templates

### Industry-Specific Templates
- **Healthcare** - Medical applications with specialized compliance
- **Finance** - Banking and financial services
- **Education** - Learning management systems
- **E-commerce** - Online retail and marketplaces
- **Government** - Public sector applications
- **Enterprise** - Business and productivity tools

### Application Types
- **SaaS Dashboard** - Multi-tenant business applications
- **Mobile App** - Native mobile experiences
- **Website** - Marketing and content sites
- **Admin Panel** - Management interfaces
- **E-learning** - Educational platforms
- **Portfolio** - Personal and professional portfolios

## Configuration

Create a `xala.config.js` file in your project root:

```javascript
module.exports = {
  name: 'my-app',
  platform: 'react',
  industry: 'healthcare',
  theme: {
    default: 'healthcare-light',
    darkMode: true
  },
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'nb-NO', 'fr-FR', 'ar-SA']
  },
  accessibility: {
    level: 'AAA',
    enforceContrastRatios: true
  },
  enterprise: {
    nsmCompliance: true,
    auditTrail: true
  }
};
```

## Compliance Rules

All generated code follows mandatory compliance rules:

### ❌ Forbidden
- Raw HTML elements (div, span, p, button, etc.)
- Hardcoded styling or colors
- Hardcoded user-facing text
- 'any' TypeScript types
- Files over 200 lines or functions over 20 lines

### ✅ Required
- Semantic components from `@xala-technologies/ui-system`
- Design tokens for all styling
- Localization with `t()` function
- Explicit TypeScript return types
- WCAG 2.2 AAA accessibility
- 8pt grid system (8px increments)

## API Integration

### OpenAI Integration
```bash
export OPENAI_API_KEY="your-api-key"
xala ai generate "responsive dashboard with charts"
```

### Anthropic Integration
```bash
export ANTHROPIC_API_KEY="your-api-key"
xala ai generate --provider anthropic "user profile form"
```

## Examples

### Generate a Complete Feature
```bash
xala ai generate "user management system with CRUD operations, data table, search, and filters"
```

### Create Industry Theme
```bash
xala themes create finance \
  --brand "Bank Corp" \
  --colors primary=#003d7a,secondary=#005eb8 \
  --industry finance \
  --accessibility AAA
```

### Multi-Platform Build
```bash
# Build for all platforms
xala build all --optimize

# Platform-specific builds
xala build react --analyze
xala build flutter --env production
xala build ios --output ./dist/ios
```

### Development Workflow
```bash
# Start development server
xala dev --port 3001 --theme healthcare-dark

# Generate component while developing
xala ai generate "patient appointment card with status indicators"

# Analyze project health
xala analyze --performance --accessibility --compliance
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://xala.dev/docs)
- 💬 [Discord Community](https://discord.gg/xala)
- 🐛 [Issue Tracker](https://github.com/xala-technologies/xala-cli/issues)
- 📧 [Email Support](mailto:support@xala.dev)

---

Built with ❤️ by the Xala Technologies team for the global development community.