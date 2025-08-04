/**
 * @fileoverview I18n Types v6.0.0
 * @description Minimal i18n type definitions
 * @version 6.0.0
 */

export type SupportedLocale = 'en-US' | 'nb-NO' | 'fr-FR' | 'ar-SA';
export const DEFAULT_LOCALE: SupportedLocale = 'en-US';

export interface InterpolationValues {
  readonly [key: string]: string | number | boolean;
}

export interface PluralizationOptions {
  readonly count: number;
  readonly values?: InterpolationValues;
}