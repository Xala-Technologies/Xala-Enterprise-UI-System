// Norwegian Bokmål (nb-NO) translations for @xala-mock/ui-system
// Official Norwegian government terminology and standards

import { TranslationKeys } from '../../types/localization.types';

export const nbNO: TranslationKeys = {
  common: {
    save: 'Lagre',
    cancel: 'Avbryt',
    submit: 'Send inn',
    edit: 'Rediger',
    delete: 'Slett',
    confirm: 'Bekreft',
    close: 'Lukk',
    back: 'Tilbake',
    next: 'Neste',
    previous: 'Forrige',
    home: 'Hjem',
    help: 'Hjelp',
    search: 'Søk',
    filter: 'Filtrer',
    sort: 'Sorter',
    loading: 'Laster...',
    error: 'Feil',
    success: 'Suksess',
    warning: 'Advarsel',
    info: 'Informasjon',
    required: 'Påkrevd',
    optional: 'Valgfri',
    yes: 'Ja',
    no: 'Nei',
    ok: 'OK',
  },

  forms: {
    labels: {
      personalNumber: 'Fødselsnummer',
      organizationNumber: 'Organisasjonsnummer',
      firstName: 'Fornavn',
      lastName: 'Etternavn',
      email: 'E-postadresse',
      phone: 'Telefonnummer',
      address: 'Adresse',
      postalCode: 'Postnummer',
      city: 'Poststed',
      municipality: 'Kommune',
      dateOfBirth: 'Fødselsdato',
    },
    validation: {
      required: 'Dette feltet er påkrevd',
      invalidFormat: 'Ugyldig format',
      invalidPersonalNumber: 'Ugyldig fødselsnummer',
      invalidOrganizationNumber: 'Ugyldig organisasjonsnummer',
      invalidEmail: 'Ugyldig e-postadresse',
      invalidPhone: 'Ugyldig telefonnummer',
      invalidDate: 'Ugyldig dato',
      tooShort: 'For kort',
      tooLong: 'For lang',
      notFound: 'Ikke funnet',
    },
    errors: {
      networkError: 'Nettverksfeil',
      validationFailed: 'Validering feilet',
      submissionFailed: 'Innsending feilet',
      unauthorized: 'Ikke autorisert',
      forbidden: 'Ikke tillatt',
      notFound: 'Ikke funnet',
      serverError: 'Serverfeil',
    },
  },

  classification: {
    levels: {
      ÅPEN: 'ÅPEN',
      BEGRENSET: 'BEGRENSET',
      KONFIDENSIELT: 'KONFIDENSIELT',
      HEMMELIG: 'HEMMELIG',
    },
    descriptions: {
      ÅPEN: 'Informasjon som kan deles fritt',
      BEGRENSET: 'Informasjon med begrenset distribusjon',
      KONFIDENSIELT: 'Konfidensiell informasjon som krever beskyttelse',
      HEMMELIG: 'Hemmelig informasjon som krever høyeste beskyttelse',
    },
    labels: {
      securityLevel: 'Sikkerhetsnivå',
      accessLevel: 'Tilgangsnivå',
      clearanceRequired: 'Klarering påkrevd',
    },
  },

  services: {
    altinn: {
      login: 'Logg inn via Altinn',
      authorize: 'Autoriser via Altinn',
      forms: 'Altinn-skjemaer',
      messages: 'Altinn-meldinger',
    },
    idporten: {
      login: 'Logg inn via ID-porten',
      logout: 'Logg ut fra ID-porten',
      profile: 'ID-porten profil',
    },
    bankid: {
      authenticate: 'Autentiser med BankID',
      sign: 'Signer med BankID',
      verify: 'Verifiser med BankID',
    },
    brreg: {
      lookup: 'Slå opp i Brønnøysundregistrene',
      verify: 'Verifiser organisasjon',
      notFound: 'Organisasjon ikke funnet i BRREG',
    },
  },

  accessibility: {
    labels: {
      openMenu: 'Åpne meny',
      closeMenu: 'Lukk meny',
      expandSection: 'Utvid seksjon',
      collapseSection: 'Skjul seksjon',
      sortColumn: 'Sorter kolonne',
      filterData: 'Filtrer data',
      selectPage: 'Velg side',
      selectAll: 'Velg alle',
      clearSelection: 'Fjern valg',
      skipToContent: 'Hopp til innhold',
      skipToNavigation: 'Hopp til navigasjon',
    },
    descriptions: {
      requiredField: 'Påkrevd felt',
      optionalField: 'Valgfritt felt',
      validInput: 'Gyldig inndata',
      invalidInput: 'Ugyldig inndata',
      loadingContent: 'Laster innhold',
      errorOccurred: 'En feil oppstod',
    },
    instructions: {
      keyboardNavigation: 'Bruk Tab for å navigere og Enter for å velge',
      screenReaderUsage: 'Denne siden er optimalisert for skjermlesere',
      formCompletion: 'Fyll ut alle påkrevde felt og trykk Send inn',
    },
  },

  dateTime: {
    formats: {
      short: 'dd.mm.åååå',
      long: 'd. mmmm åååå',
      time: 'TT:mm',
      dateTime: 'dd.mm.åååå TT:mm',
    },
    relative: {
      today: 'I dag',
      yesterday: 'I går',
      tomorrow: 'I morgen',
      lastWeek: 'Forrige uke',
      nextWeek: 'Neste uke',
    },
  },

  navigation: {
    mainMenu: 'Hovedmeny',
    breadcrumbs: 'Brødsmulesti',
    footer: 'Bunntekst',
    sidebar: 'Sidebjælke',
    userMenu: 'Brukermeny',
    settingsMenu: 'Innstillingsmeny',
  },

  dataDisplay: {
    table: {
      noData: 'Ingen data tilgjengelig',
      loading: 'Laster data...',
      errorLoading: 'Feil ved lasting av data',
      rowsPerPage: 'Rader per side',
      page: 'Side',
      of: 'av',
      showing: 'Viser',
      to: 'til',
      entries: 'oppføringer',
    },
    pagination: {
      first: 'Første',
      last: 'Siste',
      next: 'Neste',
      previous: 'Forrige',
      page: 'Side',
      of: 'av',
    },
  },
};
