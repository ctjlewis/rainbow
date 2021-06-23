import { toLower } from 'lodash';
import { RainbowToken } from '@rainbow-me/entities';
import { OFFLINE_TOKENS } from '@rainbow-me/references';

export default function getTokenMetadata(
  tokenAddress: string
): RainbowToken | undefined {
  return OFFLINE_TOKENS[toLower(tokenAddress)];
}
