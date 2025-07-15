/**
 * Norwegian Compliance Testing Setup for @xala-mock/ui-system
 * NSM, DigDir, GDPR, and Norwegian government standards validation
 */

// Norwegian testing constants
global.NORWEGIAN_CONSTANTS = {
  // NSM (Norwegian National Security Authority) classification levels
  NSM_LEVELS: {
    ÅPEN: {
      level: 1,
      description: 'Information that can be freely shared',
      color: 'green',
      requirements: ['public_access', 'no_restrictions']
    },
    BEGRENSET: {
      level: 2,
      description: 'Information with limited distribution',
      color: 'orange',
      requirements: ['controlled_access', 'basic_logging']
    },
    KONFIDENSIELT: {
      level: 3,
      description: 'Confidential information requiring protection',
      color: 'red',
      requirements: ['strict_access', 'encryption', 'audit_logging']
    },
    HEMMELIG: {
      level: 4,
      description: 'Secret information requiring highest protection',
      color: 'black',
      requirements: ['maximum_security', 'encryption', 'comprehensive_logging', 'secure_channels']
    }
  },

  // Norwegian municipality codes (sample)
  MUNICIPALITIES: {
    '0301': { name: 'Oslo', region: 'Oslo' },
    '1103': { name: 'Stavanger', region: 'Rogaland' },
    '5001': { name: 'Trondheim', region: 'Trøndelag' },
    '4601': { name: 'Bergen', region: 'Vestland' },
    '3401': { name: 'Hamar', region: 'Innlandet' }
  },

  // Norwegian personal number (fødselsnummer) validation
  PERSONAL_NUMBER: {
    pattern: /^[0-3]\d[01]\d\d{5}$/,
    testNumbers: [
      '12345678901', // Valid format
      '01010112345', // Valid format
      '31129912345'  // Valid format
    ],
    invalidNumbers: [
      '12345678900', // Invalid checksum
      '32129912345', // Invalid day
      '01139912345'  // Invalid month
    ]
  },

  // Norwegian organization number validation
  ORGANIZATION_NUMBER: {
    pattern: /^\d{9}$/,
    testNumbers: [
      '123456789',
      '987654321',
      '555666777'
    ]
  },

  // Norwegian language validation
  LANGUAGE: {
    norwegianChars: /[æøåÆØÅ]/,
    norwegianWords: [
      'og', 'eller', 'med', 'uten', 'til', 'fra', 'av', 'på', 'i', 'for',
      'ikke', 'skal', 'kan', 'må', 'vil', 'være', 'har', 'hadde', 'ville',
      'dette', 'den', 'det', 'de', 'som', 'en', 'et', 'alle', 'noen'
    ],
    supportedLocales: ['nb-NO', 'nn-NO', 'en-NO']
  },

  // GDPR compliance requirements
  GDPR: {
    dataTypes: {
      PERSONAL: ['name', 'email', 'phone', 'address', 'personal_number'],
      SENSITIVE: ['health', 'political', 'religious', 'ethnic'],
      TECHNICAL: ['ip_address', 'cookies', 'session_data']
    },
    processingBasis: [
      'consent', 'contract', 'legal_obligation', 
      'vital_interests', 'public_task', 'legitimate_interests'
    ],
    retentionPeriods: {
      marketing: '2 years',
      contracts: '5 years',
      tax_records: '10 years',
      employment: '2 years after termination'
    }
  },

  // DigDir (Norwegian Digitalisation Directorate) standards
  DIGDIR: {
    designPrinciples: [
      'user_centric', 'inclusive', 'coherent', 'secure', 
      'efficient', 'transparent', 'reliable'
    ],
    accessibilityRequirements: [
      'WCAG_2_1_AA', 'keyboard_navigation', 'screen_reader_support',
      'color_contrast', 'focus_indicators', 'alternative_text'
    ],
    digitalServices: [
      'altinn', 'idporten', 'minid', 'bankid', 'digipost'
    ]
  }
};

// Norwegian compliance validation utilities
global.norwegianCompliance = {
  // Validate NSM classification level
  validateNSMLevel: (level) => {
    return Object.keys(global.NORWEGIAN_CONSTANTS.NSM_LEVELS).includes(level);
  },

  // Validate municipality code
  validateMunicipalityCode: (code) => {
    return /^\d{4}$/.test(code) && global.NORWEGIAN_CONSTANTS.MUNICIPALITIES[code];
  },

  // Validate Norwegian personal number (simplified MOD11 check)
  validatePersonalNumber: (number) => {
    if (!global.NORWEGIAN_CONSTANTS.PERSONAL_NUMBER.pattern.test(number)) {
      return false;
    }
    
    // Simplified MOD11 validation
    const weights = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
    let sum = 0;
    
    for (let i = 0; i < 10; i++) {
      sum += parseInt(number[i]) * weights[i];
    }
    
    const checksum = 11 - (sum % 11);
    const lastDigit = parseInt(number[10]);
    
    return checksum === lastDigit || (checksum === 11 && lastDigit === 0);
  },

  // Validate Norwegian organization number (simplified MOD11 check)
  validateOrganizationNumber: (number) => {
    if (!global.NORWEGIAN_CONSTANTS.ORGANIZATION_NUMBER.pattern.test(number)) {
      return false;
    }
    
    // Simplified MOD11 validation for organization numbers
    const weights = [3, 2, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    
    for (let i = 0; i < 8; i++) {
      sum += parseInt(number[i]) * weights[i];
    }
    
    const remainder = sum % 11;
    const checkDigit = remainder === 0 ? 0 : 11 - remainder;
    
    return checkDigit === parseInt(number[8]);
  },

  // Validate Norwegian text content
  validateNorwegianText: (text) => {
    if (!text || text.trim() === '') return false;
    
    const hasNorwegianChars = global.NORWEGIAN_CONSTANTS.LANGUAGE.norwegianChars.test(text);
    const hasNorwegianWords = global.NORWEGIAN_CONSTANTS.LANGUAGE.norwegianWords.some(word =>
      text.toLowerCase().includes(word)
    );
    
    return hasNorwegianChars || hasNorwegianWords;
  },

  // Validate GDPR compliance attributes
  validateGDPRCompliance: (element) => {
    const issues = [];
    
    // Check for data collection attributes
    const dataCollected = element.getAttribute('data-gdpr-collect');
    if (dataCollected) {
      const dataTypes = dataCollected.split(',');
      for (const dataType of dataTypes) {
        if (!Object.values(global.NORWEGIAN_CONSTANTS.GDPR.dataTypes).flat().includes(dataType.trim())) {
          issues.push(`Unknown GDPR data type: ${dataType}`);
        }
      }
    }
    
    // Check for processing basis
    const processingBasis = element.getAttribute('data-gdpr-basis');
    if (processingBasis && !global.NORWEGIAN_CONSTANTS.GDPR.processingBasis.includes(processingBasis)) {
      issues.push(`Invalid GDPR processing basis: ${processingBasis}`);
    }
    
    // Check for retention period
    const retention = element.getAttribute('data-gdpr-retention');
    if (dataCollected && !retention) {
      issues.push('GDPR data collection without retention period specification');
    }
    
    return issues;
  },

  // Validate DigDir design principles compliance
  validateDigDirCompliance: (element) => {
    const issues = [];
    
    // Check for accessibility attributes
    const hasAriaLabel = element.getAttribute('aria-label');
    const hasRole = element.getAttribute('role');
    const hasLang = element.getAttribute('lang');
    
    if (!hasAriaLabel && !hasRole) {
      issues.push('Missing accessibility attributes (aria-label or role)');
    }
    
    if (!hasLang && element.textContent && element.textContent.trim()) {
      issues.push('Missing language attribute for text content');
    }
    
    // Check for Norwegian keyboard shortcuts
    const shortcuts = element.getAttribute('data-keyboard-shortcuts');
    if (shortcuts) {
      const shortcutList = shortcuts.split(',');
      const validNorwegianShortcuts = ['Ctrl+L', 'Ctrl+S', 'Ctrl+H', 'Alt+H'];
      
      for (const shortcut of shortcutList) {
        if (!validNorwegianShortcuts.includes(shortcut.trim())) {
          issues.push(`Non-standard Norwegian keyboard shortcut: ${shortcut}`);
        }
      }
    }
    
    return issues;
  }
};

// Mock Norwegian government APIs for testing
global.mockNorwegianAPIs = {
  // Mock BRREG (Brønnøysundregistrene) API
  setupBRREGMock: () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('data.brreg.no/enhetsregisteret')) {
        const orgNumber = url.split('/').pop();
        
        if (global.norwegianCompliance.validateOrganizationNumber(orgNumber)) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({
              organisasjonsnummer: orgNumber,
              navn: `Test Organization ${orgNumber}`,
              organisasjonsform: {
                kode: 'AS',
                beskrivelse: 'Aksjeselskap'
              },
              postadresse: {
                land: 'Norge',
                landkode: 'NO',
                postnummer: '0150',
                poststed: 'OSLO',
                adresse: ['Testgata 1']
              },
              stiftelsesdato: '2020-01-01'
            })
          });
        } else {
          return Promise.resolve({
            ok: false,
            status: 404,
            json: () => Promise.resolve({ error: 'Organization not found' })
          });
        }
      }
      
      return Promise.reject(new Error('Unmocked API endpoint'));
    });
  },

  // Mock ID-porten authentication
  setupIDPortenMock: () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('idporten.no')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            sub: 'test-user-123',
            pid: '12345678901',
            given_name: 'Test',
            family_name: 'Testersen',
            locale: 'nb',
            acr: 'Level3'
          })
        });
      }
      
      return Promise.reject(new Error('Unmocked ID-porten endpoint'));
    });
  },

  // Mock Altinn API
  setupAltinnMock: () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('altinn.no')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            party: {
              partyId: 123456,
              name: 'Test Testersen',
              ssn: '12345678901'
            },
            rights: ['read', 'write', 'sign']
          })
        });
      }
      
      return Promise.reject(new Error('Unmocked Altinn endpoint'));
    });
  }
};

// Custom Jest matchers for Norwegian compliance
expect.extend({
  toComplyCNSMClassification(received, expectedLevel) {
    const actualLevel = received.getAttribute('data-classification');
    const isValid = global.norwegianCompliance.validateNSMLevel(actualLevel);
    const isExpected = actualLevel === expectedLevel;
    
    return {
      message: () => {
        if (!isValid) {
          return `Expected element to have valid NSM classification, but got: ${actualLevel}`;
        }
        if (!isExpected) {
          return `Expected NSM classification to be ${expectedLevel}, but got: ${actualLevel}`;
        }
        return `Expected element not to have NSM classification ${expectedLevel}`;
      },
      pass: isValid && isExpected
    };
  },

  toComplyWithGDPR(received) {
    const issues = global.norwegianCompliance.validateGDPRCompliance(received);
    const isCompliant = issues.length === 0;
    
    return {
      message: () => {
        if (!isCompliant) {
          return `Expected element to comply with GDPR, but found issues:\n${issues.join('\n')}`;
        }
        return 'Expected element not to comply with GDPR';
      },
      pass: isCompliant
    };
  },

  toComplyWithDigDir(received) {
    const issues = global.norwegianCompliance.validateDigDirCompliance(received);
    const isCompliant = issues.length === 0;
    
    return {
      message: () => {
        if (!isCompliant) {
          return `Expected element to comply with DigDir standards, but found issues:\n${issues.join('\n')}`;
        }
        return 'Expected element not to comply with DigDir standards';
      },
      pass: isCompliant
    };
  },

  toHaveValidNorwegianPersonalNumber(received) {
    const personalNumber = received.value || received.textContent || received.getAttribute('value');
    const isValid = global.norwegianCompliance.validatePersonalNumber(personalNumber);
    
    return {
      message: () => `Expected ${personalNumber} to be a valid Norwegian personal number`,
      pass: isValid
    };
  },

  toHaveValidNorwegianOrganizationNumber(received) {
    const orgNumber = received.value || received.textContent || received.getAttribute('value');
    const isValid = global.norwegianCompliance.validateOrganizationNumber(orgNumber);
    
    return {
      message: () => `Expected ${orgNumber} to be a valid Norwegian organization number`,
      pass: isValid
    };
  },

  toHaveNorwegianLanguageSupport(received) {
    const lang = received.getAttribute('lang');
    const textContent = received.textContent || received.getAttribute('aria-label') || '';
    
    const hasValidLang = global.NORWEGIAN_CONSTANTS.LANGUAGE.supportedLocales.includes(lang);
    const hasNorwegianText = global.norwegianCompliance.validateNorwegianText(textContent);
    
    return {
      message: () => {
        if (!hasValidLang && !hasNorwegianText) {
          return 'Expected element to have Norwegian language support (lang attribute or Norwegian text)';
        }
        return 'Expected element not to have Norwegian language support';
      },
      pass: hasValidLang || hasNorwegianText
    };
  }
});

// Initialize Norwegian testing environment
beforeAll(() => {
  // Set up Norwegian locale
  process.env.TZ = 'Europe/Oslo';
  process.env.LANG = 'nb_NO.UTF-8';
  
  // Mock Norwegian APIs
  global.mockNorwegianAPIs.setupBRREGMock();
  global.mockNorwegianAPIs.setupIDPortenMock();
  global.mockNorwegianAPIs.setupAltinnMock();
  
  // Using console.log in test setup is acceptable for initialization messages
  console.log('🇳🇴 Norwegian compliance testing environment initialized');
}); 