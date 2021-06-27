import { findBestAvailableLanguage } from 'react-native-localize';
import { LanguageMap, LanguageTag, Translation } from './types';
/**
 * Resolve a map of available translations to the best available translation.
 *
 * @param languageMap The map of SupportedLanguages to LocaleValues.
 * @returns The string value of the best available translation.
 */
export const localize = (languageMap: LanguageMap): Translation => {
  const languages = Object.keys(languageMap) as LanguageTag[];
  /**
   * Load the languageTag of the best translation available. Fallback to `en`.
   */
  const defaultLanguageTag: LanguageTag = 'en';
  const defaultLanguage = {
    languageTag: defaultLanguageTag,
  };
  /**
   * Load the best available language from the available languages. Fall back to
   * the default language settings if locale data is not detected.
   */
  const languageInfo =
    findBestAvailableLanguage<LanguageTag>(languages) || defaultLanguage;

  const { languageTag } = languageInfo;

  const localeValue = languageMap[languageTag];
  if (!localeValue) {
    const errorInfo = { languageTag, localeMap: languageMap, localeValue };
    throw new Error(
      `Tried to load invalid locale: ${JSON.stringify(errorInfo, null, 2)}`
    );
  }
  return localeValue;
};
