// Semantic Release Configuration for @xala-technologies/ui-system
// Norwegian government-compliant package publication

module.exports = {
  branches: [
    'main',
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'alpha',
      prerelease: true
    }
  ],
  plugins: [
    // Analyze commits to determine release type
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          // Norwegian government compliance changes are major
          { type: 'compliance', release: 'major' },
          { type: 'nsm', release: 'major' },
          { type: 'gdpr', release: 'major' },
          { type: 'digdir', release: 'major' },
          { type: 'wcag', release: 'major' },
          
          // Standard semantic versioning
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'revert', release: 'patch' },
          { type: 'docs', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'test', release: 'patch' },
          { type: 'build', release: 'patch' },
          { type: 'ci', release: 'patch' },
          { type: 'chore', release: 'patch' },
          
          // Norwegian language updates
          { type: 'i18n', release: 'minor' },
          { type: 'locale', release: 'minor' },
          { type: 'rtl', release: 'minor' },
          
          // Breaking changes
          { breaking: true, release: 'major' },
          
          // No release for certain types
          { type: 'no-release', release: false },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'NSM COMPLIANCE', 'GDPR COMPLIANCE']
        }
      }
    ],

    // Generate release notes
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: '🚀 Features' },
            { type: 'fix', section: '🐛 Bug Fixes' },
            { type: 'perf', section: '⚡ Performance Improvements' },
            { type: 'revert', section: '⏪ Reverts' },
            { type: 'docs', section: '📚 Documentation' },
            { type: 'style', section: '💄 Styles' },
            { type: 'refactor', section: '♻️ Code Refactoring' },
            { type: 'test', section: '✅ Tests' },
            { type: 'build', section: '👷 Build System' },
            { type: 'ci', section: '🔧 Continuous Integration' },
            { type: 'chore', section: '🎯 Chores' },
            
            // Norwegian government compliance
            { type: 'compliance', section: '🏛️ Norwegian Government Compliance' },
            { type: 'nsm', section: '🔒 NSM Security Compliance' },
            { type: 'gdpr', section: '🛡️ GDPR Data Protection' },
            { type: 'digdir', section: '🇳🇴 DigDir Standards' },
            { type: 'wcag', section: '♿ WCAG Accessibility' },
            
            // Internationalization
            { type: 'i18n', section: '🌍 Internationalization' },
            { type: 'locale', section: '🗣️ Localization' },
            { type: 'rtl', section: '🔄 RTL Language Support' }
          ]
        },
        writerOpts: {
          commitGroupsSort: [
            '🏛️ Norwegian Government Compliance',
            '🔒 NSM Security Compliance', 
            '🛡️ GDPR Data Protection',
            '🇳🇴 DigDir Standards',
            '♿ WCAG Accessibility',
            '🚀 Features',
            '🐛 Bug Fixes',
            '🌍 Internationalization',
            '🔄 RTL Language Support',
            '⚡ Performance Improvements'
          ]
        }
      }
    ],

    // Update CHANGELOG.md
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Changelog\n\nAll notable changes to `@xala-technologies/ui-system` will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n## Norwegian Government Compliance\n\nThis package maintains strict compliance with:\n- **NSM** (Nasjonal sikkerhetsmyndighet) security standards\n- **GDPR** (General Data Protection Regulation) requirements  \n- **DigDir** (Digitaliseringsdirektoratet) design principles\n- **WCAG 2.2 AA** accessibility standards\n'
      }
    ],

    // Publish to npm
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: 'dist'
      }
    ],

    // Commit updated files back to repository
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
          'README.md'
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],

    // Create GitHub release
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/*.tgz',
            label: 'Distribution package'
          },
          {
            path: 'CHANGELOG.md',
            label: 'Changelog'
          },
          {
            path: 'UPGRADE.md',
            label: 'Upgrade Guide'
          }
        ],
        discussionCategoryName: 'Releases',
        addReleases: 'bottom'
      }
    ]
  ],
  
  // Environment-specific configuration
  ci: true,
  debug: false,
  dryRun: false,
  
  // Norwegian government compliance verification
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github'
  ]
}; 