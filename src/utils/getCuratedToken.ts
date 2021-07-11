import { toLower } from 'lodash';
import { loadTokenList } from 'rainbow-token-list';
import { RainbowToken } from '@rainbow-me/entities';
import { useAsync } from '@rainbow-me/hooks';
import {
  byAddress,
  OFFLINE_CURATED_TOKENS,
  onlyCurated,
} from '@rainbow-me/references';

export const getCuratedToken = (
  tokenAddress: string
): RainbowToken | undefined => {
  return OFFLINE_CURATED_TOKENS[toLower(tokenAddress)];
};

export const useCuratedTokens = () => {
  return useAsync(async () => {
    const tokenList: RainbowToken[] = await loadTokenList();
    const curatedList = onlyCurated(tokenList);
    const curatedTokens = byAddress(curatedList);

    return curatedTokens;
  });
};
