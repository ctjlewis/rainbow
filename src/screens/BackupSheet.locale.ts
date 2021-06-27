import { localize } from '@rainbow-me/localization';

export const BACK_UP_YOUR_WALLET = localize({
  en: `Back up your wallet`,
  es: `This is where I'd put my Spanish translation, if I had one`,
});

export const BACK_UP_MANUALLY = localize({
  en: '🤓 Back up manually',
});

export const BACK_UP_TO_PLATFORM = (cloudPlatform: string) =>
  localize({
    en: `􀙶 Back up to ${cloudPlatform}`,
  });

export const DONT_LOSE_YOUR_WALLET = (cloudPlatform: string) =>
  localize({
    en: `Don't lose your wallet! Save an encrypted copy to ${cloudPlatform}.`,
  });
