// Norwegian Nynorsk (nn-NO) translations for @xala-mock/ui-system
// Official Norwegian government terminology in Nynorsk

import type { TranslationKeys } from '../../types/localization.types';

export const nnNO: TranslationKeys = {
  common: {
    save: 'Lagre',
    cancel: 'Avbryt',
    submit: 'Send inn',
    edit: 'Rediger',
    delete: 'Slett',
    confirm: 'Stadfest',
    close: 'Lukk',
    back: 'Tilbake',
    next: 'Neste',
    previous: 'Førre',
    home: 'Heim',
    help: 'Hjelp',
    search: 'Søk',
    filter: 'Filtrer',
    sort: 'Sorter',
    loading: 'Lastar...',
    error: 'Feil',
    success: 'Suksess',
    warning: 'Åtvaring',
    info: 'Informasjon',
    required: 'Påkravd',
    optional: 'Valfri',
    yes: 'Ja',
    no: 'Nei',
    ok: 'OK',
  },

  forms: {
    labels: {
      personalNumber: 'Fødselsnummer',
      organizationNumber: 'Organisasjonsnummer',
      firstName: 'Førenamn',
      lastName: 'Etternamn',
      email: 'E-postadresse',
      phone: 'Telefonnummer',
      address: 'Adresse',
      postalCode: 'Postnummer',
      city: 'Poststad',
      municipality: 'Kommune',
      dateOfBirth: 'Fødselsdato',
    },
    validation: {
      required: 'Dette feltet er påkravd',
      invalidFormat: 'Ugyldig format',
      invalidPersonalNumber: 'Ugyldig fødselsnummer',
      invalidOrganizationNumber: 'Ugyldig organisasjonsnummer',
      invalidEmail: 'Ugyldig e-postadresse',
      invalidPhone: 'Ugyldig telefonnummer',
      invalidDate: 'Ugyldig dato',
      tooShort: 'For kort',
      tooLong: 'For lang',
      notFound: 'Ikkje funne',
    },
    errors: {
      networkError: 'Nettverksfeil',
      validationFailed: 'Validering feila',
      submissionFailed: 'Innsending feila',
      unauthorized: 'Ikkje autorisert',
      forbidden: 'Ikkje tillate',
      notFound: 'Ikkje funne',
      serverError: 'Serverfeil',
    },
  },

  classification: {
    levels: {
      ÅPEN: 'OPEN',
      BEGRENSET: 'AVGRENSA',
      KONFIDENSIELT: 'KONFIDENSIELT',
      HEMMELIG: 'HEMMELEG',
    },
    descriptions: {
      ÅPEN: 'Informasjon som kan delast fritt',
      BEGRENSET: 'Informasjon med avgrensa distribusjon',
      KONFIDENSIELT: 'Konfidensiell informasjon som krev vern',
      HEMMELIG: 'Hemmeleg informasjon som krev høgaste vern',
    },
    labels: {
      securityLevel: 'Sikkerheitsnivå',
      accessLevel: 'Tilgangsnivå',
      clearanceRequired: 'Klaring påkravd',
    },
  },

  services: {
    altinn: {
      login: 'Logg inn via Altinn',
      authorize: 'Autoriser via Altinn',
      forms: 'Altinn-skjema',
      messages: 'Altinn-meldingar',
    },
    idporten: {
      login: 'Logg inn via ID-porten',
      logout: 'Logg ut frå ID-porten',
      profile: 'ID-porten profil',
    },
    bankid: {
      authenticate: 'Autentiser med BankID',
      sign: 'Signer med BankID',
      verify: 'Verifiser med BankID',
    },
    brreg: {
      lookup: 'Slå opp i Brønnøysundregistra',
      verify: 'Verifiser organisasjon',
      notFound: 'Organisasjon ikkje funne i BRREG',
    },
  },

  accessibility: {
    labels: {
      openMenu: 'Opne meny',
      closeMenu: 'Lukk meny',
      expandSection: 'Utvid seksjon',
      collapseSection: 'Skjul seksjon',
      sortColumn: 'Sorter kolonne',
      filterData: 'Filtrer data',
      selectPage: 'Vel side',
      selectAll: 'Vel alle',
      clearSelection: 'Fjern val',
      skipToContent: 'Hopp til innhald',
      skipToNavigation: 'Hopp til navigasjon',
    },
    descriptions: {
      requiredField: 'Påkravd felt',
      optionalField: 'Valfritt felt',
      validInput: 'Gyldig inndata',
      invalidInput: 'Ugyldig inndata',
      loadingContent: 'Lastar innhald',
      errorOccurred: 'Ein feil oppstod',
    },
    instructions: {
      keyboardNavigation: 'Bruk Tab for å navigere og Enter for å velje',
      screenReaderUsage: 'Denne sida er optimalisert for skjermlesarar',
      formCompletion: 'Fyll ut alle påkravde felt og trykk Send inn',
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
      tomorrow: 'I morgon',
      lastWeek: 'Føregåande veke',
      nextWeek: 'Neste veke',
    },
  },

  navigation: {
    mainMenu: 'Hovudmeny',
    breadcrumbs: 'Brødsmulesti',
    footer: 'Botntekst',
    sidebar: 'Sidebjølke',
    userMenu: 'Brukarmeny',
    settingsMenu: 'Innstillingsmeny',
  },

  dataDisplay: {
    table: {
      noData: 'Ingen data tilgjengeleg',
      loading: 'Lastar data...',
      errorLoading: 'Feil ved lasting av data',
      rowsPerPage: 'Rader per side',
      page: 'Side',
      of: 'av',
      showing: 'Viser',
      to: 'til',
      entries: 'oppføringar',
    },
    pagination: {
      first: 'Første',
      last: 'Siste',
      next: 'Neste',
      previous: 'Føregåande',
      page: 'Side',
      of: 'av',
    },
  },
};
