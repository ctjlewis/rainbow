import { toLower } from 'lodash';
import { loadTokenList } from 'rainbow-token-list';
import { fromDiskCache } from 'rn-disk-cache';
import { RainbowToken } from '@rainbow-me/entities';
import { getSafe } from '@rainbow-me/references';
// import { OFFLINE_TOKEN_LIST_SAFE } from '@rainbow-me/references';

interface TokenMetadata {
  name: string;
  symbol: string;
}

/**
 * @todo Make async.
 */
export default async function checkTokenIsScam({
  name,
  symbol,
}: TokenMetadata): Promise<boolean> {
  const tokenList = await fromDiskCache(
    'tokenList',
    async () => {
      const liveTokenList: RainbowToken[] = await loadTokenList();
      return getSafe(liveTokenList);
    },
    60 // one minute
  );

  const nameFound = tokenList[toLower(name)];
  const symbolFound = tokenList[toLower(symbol)];
  return !!nameFound || !!symbolFound;
}
