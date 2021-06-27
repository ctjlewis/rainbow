import { SUPPORTED_LANGUAGES } from '.';

/**
 * All supported localization languages as a union type.
 */
export type LanguageTag = typeof SUPPORTED_LANGUAGES[number];
/**
 * The translation of a message in a given language.
 */
export type Translation = string;
/**
 * An object mapping a SupportedLanguage to its LocalizationValue.
 */
export type LanguageMap = {
  [key in LanguageTag]?: Translation;
};
