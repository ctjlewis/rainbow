/**
 * @fileoverview
 * This file exports members containing offline copies of the Token List and
 * related data, built at compile-time during the latest release.
 */
import OFFLINE_TOKEN_METADATA from '../rainbow-token-list.json';
import MULTICALL_ABI from '../uniswap-multicall-abi.json';
import { default as UNISWAP_TESTNET_TOKEN_LIST } from '../uniswap-pairs-testnet.json';
import { abi as UNISWAP_V2_ROUTER_ABI } from '../uniswap-v2-router.json';
import UNISWAP_V1_EXCHANGE_ABI from '../v1-exchange-abi';
import { byAddress, getSafe, onlyCurated, tokenListFromData } from './ops';

export { OFFLINE_TOKEN_METADATA };

export const OFFLINE_TOKEN_LIST = tokenListFromData(OFFLINE_TOKEN_METADATA);
export const OFFLINE_TOKEN_LIST_SAFE = getSafe(OFFLINE_TOKEN_LIST);
export const OFFLINE_TOKENS = byAddress(OFFLINE_TOKEN_LIST);

export const OFFLINE_CURATED_TOKEN_LIST = onlyCurated(OFFLINE_TOKEN_LIST);
export const OFFLINE_CURATED_TOKENS = byAddress(OFFLINE_CURATED_TOKEN_LIST);

export {
  MULTICALL_ABI,
  UNISWAP_TESTNET_TOKEN_LIST,
  UNISWAP_V1_EXCHANGE_ABI,
  UNISWAP_V2_ROUTER_ABI,
};
