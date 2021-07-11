import { loadTokenList } from 'rainbow-token-list';
import { RainbowToken } from '@rainbow-me/entities';
import { useAsync } from '@rainbow-me/hooks';
import { byAddress, onlyCurated } from '@rainbow-me/references';

export const useCuratedTokens = () => {
  return useAsync(async () => {
    const tokenList: RainbowToken[] = await loadTokenList();
    const curatedList = onlyCurated(tokenList);
    const curatedTokens = byAddress(curatedList);

    return curatedTokens;
  });
};
