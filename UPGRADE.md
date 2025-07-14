# Upgrade Guide

This document provides guidance for upgrading between different versions of `@xala-technologies/ui-system`.

## Table of Contents

- [General Upgrade Guidelines](#general-upgrade-guidelines)
- [Version Compatibility](#version-compatibility)
- [Migration from @xala-mock/ui-system](#migration-from-xala-mockui-system)
- [Breaking Changes by Version](#breaking-changes-by-version)
- [Norwegian Government Compliance](#norwegian-government-compliance)
- [TypeScript Support](#typescript-support)

## General Upgrade Guidelines

### Before Upgrading

1. **Review the [CHANGELOG.md](CHANGELOG.md)** for detailed changes
2. **Check TypeScript compatibility** if using TypeScript
3. **Test in a development environment** before production deployment
4. **Verify Norwegian government compliance** requirements
5. **Update related dependencies** if necessary

### Semantic Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version changes include breaking changes
- **MINOR** version changes add functionality in a backwards compatible manner  
- **PATCH** version changes include backwards compatible bug fixes

### Recommended Upgrade Process

```bash
# 1. Check current version
npm list @xala-technologies/ui-system

# 2. Check available versions
npm info @xala-technologies/ui-system versions --json

# 3. Update to specific version
npm install @xala-technologies/ui-system@^2.0.0

# 4. Run tests to verify compatibility
npm test

# 5. Validate Norwegian compliance (if applicable)
npm run validate:norwegian
```

---

## Version Compatibility

### Node.js Support

| Package Version | Node.js Version | Status |
|-----------------|-----------------|--------|
| 1.x.x | >=16.0.0 | ✅ Supported |
| 2.x.x | >=18.0.0 | ✅ Supported |

### React Support

| Package Version | React Version | TypeScript Version |
|-----------------|---------------|--------------------|
| 1.x.x | >=16.8.0 | >=4.5.0 |
| 2.x.x | >=17.0.0 | >=5.0.0 |

### Norwegian Government Standards

| Package Version | NSM Compliance | GDPR Support | DigDir Standards | WCAG Level |
|-----------------|----------------|--------------|------------------|------------|
| 1.x.x | ✅ Full | ✅ Complete | ✅ 2024 | AA |
| 2.x.x | ✅ Enhanced | ✅ Enhanced | ✅ 2024+ | AAA |

---

## Migration from @xala-mock/ui-system

If you're migrating from the previous `@xala-mock/ui-system` package:

### 1. Update Package Name

```bash
# Remove old package
npm uninstall @xala-mock/ui-system

# Install new package
npm install @xala-technologies/ui-system
```

### 2. Update Import Statements

```typescript
// Before (v0.x with @xala-mock)
import { Button, Input } from '@xala-mock/ui-system';
import { useLocalization } from '@xala-mock/ui-system/localization';

// After (v1.x with @xala-technologies)
import { Button, Input } from '@xala-technologies/ui-system';
import { useLocalization } from '@xala-technologies/ui-system/localization';
```

### 3. Update Configuration Files

```json
// tsconfig.json - update path mappings
{
  "compilerOptions": {
    "paths": {
      "@xala-technologies/ui-system/*": ["node_modules/@xala-technologies/ui-system/dist/*"]
    }
  }
}
```

### 4. Norwegian Configuration Migration

```typescript
// Before (v0.x)
import { LocalizationProvider } from '@xala-mock/ui-system/localization';

// After (v1.x) - Enhanced Norwegian features
import { LocalizationProvider } from '@xala-technologies/ui-system/localization';

// Configuration remains compatible
<LocalizationProvider 
  locale="nb-NO"
  norwegianConfig={{
    municipality: "0301", // Oslo
    classification: "ÅPEN"
  }}
>
  {children}
</LocalizationProvider>
```

---

## Breaking Changes by Version

### Version 2.0.0 (Future)

**Coming Soon - These are planned breaking changes:**

#### Component API Changes
- `<Button>` prop `variant` renamed to `appearance`
- `<Input>` validation props restructured
- Norwegian classification props standardized

#### TypeScript Changes
- Stricter type definitions for Norwegian compliance
- Required props for government classification
- Enhanced RTL type safety

#### Migration Steps for v2.0.0
```typescript
// Before v2.0.0
<Button variant="primary" />
<Input validationState="error" />

// After v2.0.0  
<Button appearance="primary" />
<Input validation={{ state: "error" }} />
```

### Version 1.0.0 (Current)

**Initial stable release** - No breaking changes from development versions.

---

## Norwegian Government Compliance

### NSM Classification Upgrades

When upgrading, ensure your NSM classifications remain valid:

```typescript
// Always valid across versions
const classifications = [
  'ÅPEN',       // Open information
  'BEGRENSET',  // Restricted distribution
  'KONFIDENSIELT', // Confidential
  'HEMMELIG'    // Secret
] as const;
```

### GDPR Compliance Updates

```typescript
// Enhanced GDPR features in newer versions
import { useGDPRCompliance } from '@xala-technologies/ui-system/compliance';

const { 
  validatePersonalData, 
  getDataProcessingBasis,
  checkUserConsent 
} = useGDPRCompliance();
```

### DigDir Standards

Keep up with evolving Norwegian government design standards:

```typescript
// Automatic updates with newer versions
import { useDigDirCompliance } from '@xala-technologies/ui-system/standards';
```

---

## TypeScript Support

### Type Definition Updates

```typescript
// v1.x enhanced types
import type { 
  NorwegianComponent,
  NSMClassificationLevel,
  WCAGComplianceLevel 
} from '@xala-technologies/ui-system/types';
```

### Strict Mode Compatibility

```json
// tsconfig.json for optimal compatibility
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## Troubleshooting Common Upgrade Issues

### Import Resolution Issues

```bash
# Clear package cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Compilation Errors

```bash
# Update TypeScript and related packages
npm update typescript @types/react @types/react-dom

# Regenerate type declarations
npm run build
```

### Norwegian Compliance Validation

```bash
# Run compliance checks after upgrade
npm run validate:norwegian
npm run test:accessibility
npm run validate:components
```

### Version-Specific Issues

If you encounter issues, check:

1. **[GitHub Issues](https://github.com/xala-technologies/ui-system/issues)** for known problems
2. **[Discussion Forum](https://github.com/xala-technologies/ui-system/discussions)** for community help
3. **Version-specific documentation** in the changelog

---

## Support and Resources

- **Documentation**: [README.md](README.md)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)  
- **Issues**: [GitHub Issues](https://github.com/xala-technologies/ui-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/xala-technologies/ui-system/discussions)
- **Norwegian Government Standards**: [Norwegian Digitalisation Agency](https://www.digdir.no/)

---

## Emergency Downgrade

If you need to quickly downgrade due to breaking changes:

```bash
# Downgrade to previous major version
npm install @xala-technologies/ui-system@^1.0.0

# Lock to specific version
npm install @xala-technologies/ui-system@1.2.3 --save-exact
```

Always test thoroughly after any version change and ensure Norwegian government compliance requirements are still met. 