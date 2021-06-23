import { toLower } from 'lodash';
import { OFFLINE_TOKEN_LIST_SAFE } from '@rainbow-me/references';

export default function checkTokenIsScam(
  name: string,
  symbol: string
): boolean {
  const nameFound = OFFLINE_TOKEN_LIST_SAFE[toLower(name)];
  const symbolFound = OFFLINE_TOKEN_LIST_SAFE[toLower(symbol)];
  return !!nameFound || !!symbolFound;
}
