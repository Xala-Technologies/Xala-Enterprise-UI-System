/**
 * Mock Service Worker Server for @xala-mock/ui-system
 * Norwegian government API mocking for testing
 */

import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Norwegian government API mocks
export const handlers = [
  // BRREG (Brønnøysundregistrene) API mock
  rest.get('https://data.brreg.no/enhetsregisteret/api/enheter/:orgNumber', (req, res, ctx) => {
    const { orgNumber } = req.params;
    
    // Mock validation
    if (!/^\d{9}$/.test(orgNumber)) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Invalid organization number format' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json({
        organisasjonsnummer: orgNumber,
        navn: `Test Organisasjon ${orgNumber}`,
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
        stiftelsesdato: '2020-01-01',
        registrertIMvaregisteret: true
      })
    );
  }),
  
  // ID-porten mock
  rest.post('https://idporten.no/api/auth/authorize', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'mock-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'openid profile',
        id_token: 'mock-id-token'
      })
    );
  }),
  
  rest.get('https://idporten.no/api/user/userinfo', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sub: 'test-user-12345',
        pid: '12345678901',
        given_name: 'Test',
        family_name: 'Testersen',
        locale: 'nb',
        acr: 'Level3'
      })
    );
  }),
  
  // Altinn API mock
  rest.get('https://platform.altinn.no/authorization/api/v1/parties/:partyId/validate', (req, res, ctx) => {
    const { partyId } = req.params;
    
    return res(
      ctx.status(200),
      ctx.json({
        partyId: parseInt(partyId),
        valid: true,
        rights: ['read', 'write', 'sign'],
        roles: ['dagl', 'lede']
      })
    );
  }),
  
  // BankID mock
  rest.post('https://api.bankid.no/rp/v5.1/auth', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        orderRef: 'mock-order-ref-12345',
        autoStartToken: 'mock-auto-start-token',
        qrStartToken: 'mock-qr-start-token',
        qrStartSecret: 'mock-qr-secret'
      })
    );
  }),
  
  rest.post('https://api.bankid.no/rp/v5.1/collect', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        orderRef: 'mock-order-ref-12345',
        status: 'complete',
        hintCode: 'userSign',
        completionData: {
          user: {
            personalNumber: '12345678901',
            name: 'Test Testersen',
            givenName: 'Test',
            surname: 'Testersen'
          },
          device: {
            ipAddress: '192.168.1.1'
          },
          cert: {
            notBefore: '2023-01-01',
            notAfter: '2025-01-01'
          },
          signature: 'mock-signature-data',
          ocspResponse: 'mock-ocsp-response'
        }
      })
    );
  }),
  
  // DigDir API mock
  rest.get('https://api.digdir.no/krr/rest/v1/personer', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        personer: [
          {
            personidentifikator: '12345678901',
            reservasjon: 'NEI',
            status: 'AKTIV',
            kontaktinformasjon: {
              epostadresse: 'test@example.no',
              mobiltelefonnummer: '+4712345678',
              spraak: 'nb'
            }
          }
        ]
      })
    );
  }),
  
  // Norwegian municipality API mock
  rest.get('https://api.kommune.no/municipalities/:code', (req, res, ctx) => {
    const { code } = req.params;
    
    const municipalities = {
      '0301': { name: 'Oslo', region: 'Oslo' },
      '1103': { name: 'Stavanger', region: 'Rogaland' },
      '5001': { name: 'Trondheim', region: 'Trøndelag' },
      '4601': { name: 'Bergen', region: 'Vestland' }
    };
    
    const municipality = municipalities[code];
    
    if (!municipality) {
      return res(
        ctx.status(404),
        ctx.json({ error: 'Municipality not found' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json({
        code: code,
        name: municipality.name,
        region: municipality.region,
        country: 'Norge',
        active: true
      })
    );
  }),
  
  // Norwegian postal code API mock
  rest.get('https://api.bring.com/shippingguide/api/postalCode.json', (req, res, ctx) => {
    const postalCode = req.url.searchParams.get('postalCode');
    
    const postalCodes = {
      '0150': { city: 'OSLO', municipality: 'OSLO', county: 'OSLO' },
      '4006': { city: 'STAVANGER', municipality: 'STAVANGER', county: 'ROGALAND' },
      '7030': { city: 'TRONDHEIM', municipality: 'TRONDHEIM', county: 'TRØNDELAG' }
    };
    
    const location = postalCodes[postalCode];
    
    if (!location) {
      return res(
        ctx.status(404),
        ctx.json({ error: 'Postal code not found' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json({
        valid: true,
        result: {
          postalCode: postalCode,
          city: location.city,
          municipality: location.municipality,
          county: location.county
        }
      })
    );
  })
];

// Setup the server
export const server = setupServer(...handlers); 