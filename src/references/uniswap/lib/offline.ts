/**
 * @fileoverview
 * All members exported here rely on offline data.
 */
import OFFLINE_TOKEN_METADATA from '../rainbow-token-list.json';
import { byAddress, getSafe, onlyCurated, tokenListFromData } from './ops';

export const OFFLINE_TOKEN_LIST = tokenListFromData(OFFLINE_TOKEN_METADATA);
export const OFFLINE_TOKEN_LIST_SAFE = getSafe(OFFLINE_TOKEN_LIST);
export const OFFLINE_TOKENS = byAddress(OFFLINE_TOKEN_LIST);

export const OFFLINE_CURATED_TOKEN_LIST = onlyCurated(OFFLINE_TOKEN_LIST);
export const OFFLINE_CURATED_TOKENS = byAddress(OFFLINE_CURATED_TOKEN_LIST);
