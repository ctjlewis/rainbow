/**
 * All supported languages, as a const export.
 *
 * @notes
 * The const type assertion is necessary for type-checking.
 */
export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'] as const;

export * from './localize';
export * from './types';
