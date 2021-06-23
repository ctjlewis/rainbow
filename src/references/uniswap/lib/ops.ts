import { filter, flatMap, keyBy, map, toLower } from 'lodash';
import { RainbowToken } from '@rainbow-me/entities';

type TokenRecord = Record<string, RainbowToken>;
type StringRecord = Record<string, string>;

/**
 * The RainbowToken listing for the Ether token.
 */
const etherToken: RainbowToken = {
  address: 'eth',
  decimals: 18,
  isRainbowCurated: true,
  isVerified: true,
  name: 'Ethereum',
  symbol: 'ETH',
  uniqueId: 'eth',
};

/**
 * Manual tokens to include in the Token List, like the $ETH token itself.
 */
const manualRainbowTokens: RainbowToken[] = [etherToken];

/**
 * Mix the manually specified tokens into the partial list.
 *
 * @param tokens The partial Token List.
 * @returns The full Token List.
 */
export const withCustomTokens = (tokens: RainbowToken[]): RainbowToken[] => [
  ...manualRainbowTokens,
  ...tokens,
];

/**
 * Get all Rainbow Curated tokens.
 *
 * @param tokens The Token List to filter.
 * @returns The list of Rainbow Curated tokens.
 */
export const onlyCurated = (tokens: RainbowToken[]): RainbowToken[] => {
  return filter(tokens, 'isRainbowCurated');
};

/**
 * Get the address-indexed RainbowToken[].
 *
 * @param tokens The Token List to process.
 * @returns The address-indexed RainbowToken[].
 */
export const byAddress = (tokens: RainbowToken[]): TokenRecord => {
  return keyBy(tokens, 'address');
};

/**
 * @todo Document this function.
 */
export const getSafe = (tokens: RainbowToken[]): StringRecord => {
  return keyBy(
    flatMap(tokens, ({ name, symbol }) => [name, symbol]),
    id => toLower(id)
  );
};

/**
 * Get the Token List from raw metadata.
 *
 * @param tokenData The raw Token List data to process.
 * @returns The Token List.
 */
export const tokenListFromData = (tokenData: any) => {
  const tokensFound = map(tokenData.tokens, (token: any) => {
    const { address: rawAddress, decimals, name, symbol, extensions } = token;
    const address = toLower(rawAddress);
    return {
      address,
      decimals,
      name,
      symbol,
      uniqueId: address,
      ...extensions,
    };
  });

  return withCustomTokens(tokensFound);
};
