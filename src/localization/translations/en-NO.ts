// English (Norway) translations for @xala-mock/ui-system
// English translations with Norwegian context and terminology

import { TranslationKeys } from '../../types/localization.types';

export const enNO: TranslationKeys = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    home: 'Home',
    help: 'Help',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    required: 'Required',
    optional: 'Optional',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
  },

  forms: {
    labels: {
      personalNumber: 'Personal Number (Fødselsnummer)',
      organizationNumber: 'Organization Number',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Address',
      postalCode: 'Postal Code',
      city: 'City',
      municipality: 'Municipality',
      dateOfBirth: 'Date of Birth',
    },
    validation: {
      required: 'This field is required',
      invalidFormat: 'Invalid format',
      invalidPersonalNumber: 'Invalid personal number',
      invalidOrganizationNumber: 'Invalid organization number',
      invalidEmail: 'Invalid email address',
      invalidPhone: 'Invalid phone number',
      invalidDate: 'Invalid date',
      tooShort: 'Too short',
      tooLong: 'Too long',
      notFound: 'Not found',
    },
    errors: {
      networkError: 'Network error',
      validationFailed: 'Validation failed',
      submissionFailed: 'Submission failed',
      unauthorized: 'Unauthorized',
      forbidden: 'Forbidden',
      notFound: 'Not found',
      serverError: 'Server error',
    },
  },

  classification: {
    levels: {
      ÅPEN: 'OPEN',
      BEGRENSET: 'RESTRICTED',
      KONFIDENSIELT: 'CONFIDENTIAL',
      HEMMELIG: 'SECRET',
    },
    descriptions: {
      ÅPEN: 'Information that can be shared freely',
      BEGRENSET: 'Information with limited distribution',
      KONFIDENSIELT: 'Confidential information requiring protection',
      HEMMELIG: 'Secret information requiring highest protection',
    },
    labels: {
      securityLevel: 'Security Level',
      accessLevel: 'Access Level',
      clearanceRequired: 'Clearance Required',
    },
  },

  services: {
    altinn: {
      login: 'Login via Altinn',
      authorize: 'Authorize via Altinn',
      forms: 'Altinn Forms',
      messages: 'Altinn Messages',
    },
    idporten: {
      login: 'Login via ID-porten',
      logout: 'Logout from ID-porten',
      profile: 'ID-porten Profile',
    },
    bankid: {
      authenticate: 'Authenticate with BankID',
      sign: 'Sign with BankID',
      verify: 'Verify with BankID',
    },
    brreg: {
      lookup: 'Look up in Brønnøysund Register Centre',
      verify: 'Verify organization',
      notFound: 'Organization not found in BRREG',
    },
  },

  accessibility: {
    labels: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      expandSection: 'Expand section',
      collapseSection: 'Collapse section',
      sortColumn: 'Sort column',
      filterData: 'Filter data',
      selectPage: 'Select page',
      selectAll: 'Select all',
      clearSelection: 'Clear selection',
      skipToContent: 'Skip to content',
      skipToNavigation: 'Skip to navigation',
    },
    descriptions: {
      requiredField: 'Required field',
      optionalField: 'Optional field',
      validInput: 'Valid input',
      invalidInput: 'Invalid input',
      loadingContent: 'Loading content',
      errorOccurred: 'An error occurred',
    },
    instructions: {
      keyboardNavigation: 'Use Tab to navigate and Enter to select',
      screenReaderUsage: 'This page is optimized for screen readers',
      formCompletion: 'Fill out all required fields and press Submit',
    },
  },

  dateTime: {
    formats: {
      short: 'dd.mm.yyyy',
      long: 'd. mmmm yyyy',
      time: 'HH:mm',
      dateTime: 'dd.mm.yyyy HH:mm',
    },
    relative: {
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      lastWeek: 'Last week',
      nextWeek: 'Next week',
    },
  },

  navigation: {
    mainMenu: 'Main Menu',
    breadcrumbs: 'Breadcrumbs',
    footer: 'Footer',
    sidebar: 'Sidebar',
    userMenu: 'User Menu',
    settingsMenu: 'Settings Menu',
  },

  dataDisplay: {
    table: {
      noData: 'No data available',
      loading: 'Loading data...',
      errorLoading: 'Error loading data',
      rowsPerPage: 'Rows per page',
      page: 'Page',
      of: 'of',
      showing: 'Showing',
      to: 'to',
      entries: 'entries',
    },
    pagination: {
      first: 'First',
      last: 'Last',
      next: 'Next',
      previous: 'Previous',
      page: 'Page',
      of: 'of',
    },
  },
};
