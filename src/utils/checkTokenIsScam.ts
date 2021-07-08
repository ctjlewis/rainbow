import { toLower } from 'lodash';
// import { OFFLINE_TOKEN_OVERRIDES } from 'rainbow-overrides';
// import { OFFLINE_TOKEN_LIST_SAFE } from '@rainbow-me/references';
import { loadTokenList } from 'rainbow-token-list';
import { fromDiskCache } from 'rn-disk-cache';
import { logger } from '.';
import { RainbowToken } from '@rainbow-me/entities';
import { getSafe } from '@rainbow-me/references';

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
  // logger.log('loadTokenList');
  // logger.log({ loadTokenList });
  const tokenList = await fromDiskCache(
    'tokenList',
    async () => {
      const liveTokenList: RainbowToken[] = await loadTokenList();
      return getSafe(liveTokenList);
    },
    60 // one minute
  );
  // logger.log(OFFLINE_TOKEN_OVERRIDES);

  const test = await fromDiskCache('test', async () => ({ test: 42 }), 60);
  logger.log(test);
  // const tokenList: any = OFFLINE_TOKEN_LIST_SAFE;
  const nameFound = tokenList[toLower(name)];
  const symbolFound = tokenList[toLower(symbol)];
  return !!nameFound || !!symbolFound;
}
