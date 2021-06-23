import OFFLINE_TOKEN_METADATA from '../rainbow-token-list.json';
import { REMOTE_TOKEN_LIST_ENDPOINT } from './constants';
import { tokenListFromData } from './ops';
import { RainbowToken } from '@rainbow-me/entities';
import logger from 'logger';

/**
 * Get the raw Token List data.
 *
 * @param offline Whether or not to force-load the offline version.
 * @returns The Token List dataset.
 */
export const loadTokenData = async (offline = false) => {
  if (!offline) {
    try {
      const result = await fetch(REMOTE_TOKEN_LIST_ENDPOINT);
      return await result.json();
    } catch {
      /**
       * Fall through and return the offline data.
       */
      logger.log(
        'Failed trying to load Token List data from remote. Loading offline.'
      );
    }
  }

  return OFFLINE_TOKEN_METADATA;
};

/**
 * Get the full Token List, including any manual tokens.
 *
 * @param offline Whether or not to force-load the offline version.
 * @returns The full Token List.
 */
export const loadTokenList = async (
  offline = false
): Promise<RainbowToken[]> => {
  const tokenData = await loadTokenData(offline);
  const tokens = tokenListFromData(tokenData);

  return tokens;
};
