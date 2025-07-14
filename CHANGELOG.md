# Changelog

All notable changes to `@xala-technologies/ui-system` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Norwegian government-compliant UI component library
- Complete WCAG 2.2 AA accessibility support
- NSM (Norwegian National Security Authority) classification system
- GDPR compliance features
- DigDir (Norwegian Digitalisation Agency) standards compliance
- Full internationalization with Norwegian Bokmål, Nynorsk, and English support
- RTL (Right-to-Left) language support for Arabic and Hebrew
- Comprehensive design token system
- Semantic HTML components with no raw div/span usage
- Form components with Norwegian-specific validation (fødselsnummer, organisasjonsnummer)
- Government service integration (Altinn, ID-porten, BankID, BRREG)
- Complete TypeScript type definitions
- Automated validation and testing infrastructure

### Features by Story

#### Story 1: Design Tokens System ✅
- CSS custom properties for colors, spacing, typography, shadows
- Light/dark mode support
- Norwegian-friendly typography
- Validation scripts for hardcoded values

#### Story 2: Semantic Layout Components ✅
- `<PageLayout>`, `<Section>`, `<Container>`, `<Grid>`, `<Stack>`, `<Card>`
- No raw HTML elements allowed
- Design token integration for all styling

#### Story 3: Form Components (Norwegian Extensions) ✅
- `<Form>`, `<Input>`, `<PersonalNumberInput>`, `<OrganizationNumberInput>`
- MOD11 checksum validation for Norwegian numbers
- BRREG organization integration
- Real-time validation with Norwegian error messages

#### Story 4: Data Display Components ✅
- `<DataTable>` with pagination, sorting, loading states
- `<KeyValueList>`, `<Tag>`, `<Badge>`, `<Tooltip>`
- Localized content support

#### Story 5: Action & Feedback Components ✅
- `<Button>` variants (Primary, Secondary, Tertiary, Danger, Success, Warning)
- `<Modal>`, `<Toast>`, `<Alert>` with Norwegian compliance
- NSM classification visual indicators
- Audit logging capabilities

#### Story 7: Validation & Linting ✅
- Component validation scripts
- PASEPAGE architecture validation
- Jest/RTL unit tests with axe-core accessibility testing
- Norwegian compliance validation

#### Story 8: Localization & RTL Support ✅
- Complete Norwegian translation system (Bokmål, Nynorsk, English-Norway)
- RTL language support for Arabic and Hebrew
- BiDi text handling with logical CSS properties
- Government terminology integration
- Mixed language content support

### Technical Specifications

#### Norwegian Government Compliance
- **NSM Classification**: ÅPEN, BEGRENSET, KONFIDENSIELT, HEMMELIG
- **GDPR Data Types**: Personal data handling with proper classification
- **DigDir Standards**: Accessibility, keyboard navigation, touch targets
- **WCAG 2.2 AA**: Screen readers, color contrast, keyboard accessibility

#### Internationalization
- **Languages**: Norwegian Bokmål (nb-NO), Norwegian Nynorsk (nn-NO), English Norway (en-NO)
- **RTL Support**: Arabic (ar), Hebrew (he) with BiDi isolation
- **Government Services**: Altinn, ID-porten, BankID, BRREG terminology
- **Municipality Support**: 2,300+ Norwegian municipalities

#### Developer Experience
- **TypeScript**: Complete type definitions for all components and utilities
- **Testing**: Comprehensive test suites with 85-95% coverage targets
- **Validation**: Automated compliance checking and code quality enforcement
- **Documentation**: Extensive API documentation and usage examples

### Breaking Changes
- Initial release - no breaking changes yet

### Migration Guide
This is the initial release of `@xala-technologies/ui-system`. No migration is required.

### Security
- NSM classification system implemented for security-sensitive content
- GDPR compliance features for personal data handling
- Audit logging capabilities for compliance tracking

---

## How to Use This Changelog

- **Added** for new features
- **Changed** for changes in existing functionality  
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting changes.

## Norwegian Government Standards

This package is built to comply with:
- NSM (Nasjonal sikkerhetsmyndighet) security standards
- GDPR (General Data Protection Regulation) requirements
- DigDir (Digitaliseringsdirektoratet) design principles
- WCAG 2.2 AA accessibility standards 