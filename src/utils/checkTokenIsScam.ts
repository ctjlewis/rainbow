import { toLower } from 'lodash';
import { OFFLINE_TOKEN_LIST_SAFE } from '@rainbow-me/references';
import { fromDiskCache } from 'rn-disk-cache';
import { logger } from '.';

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
  // const tokenList = await fromDiskCache(
  //   'tokenList',
  //   async () => {
  //     const liveTokenList: RainbowToken[] = await loadTokenList(fetch);
  //     return getSafe(liveTokenList);
  //   },
  //   60 // one minute
  // );
  const test = await fromDiskCache('test', async () => ({ test: 42 }), 60);
  logger.log(test);
  const tokenList: any = OFFLINE_TOKEN_LIST_SAFE;
  const nameFound = tokenList[toLower(name)];
  const symbolFound = tokenList[toLower(symbol)];
  return !!nameFound || !!symbolFound;
}
