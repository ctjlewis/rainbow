import { Interface } from '@ethersproject/abi';
import { ChainId, Token, WETH } from '@uniswap/sdk';
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import { DAI_ADDRESS, USDC_ADDRESS } from '../..';

export const UNISWAP_V2_ROUTER_ADDRESS =
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

export const UNISWAP_V2_BASES = {
  [ChainId.MAINNET]: [
    WETH[ChainId.MAINNET],
    new Token(ChainId.MAINNET, DAI_ADDRESS, 18, 'DAI', 'Dai Stablecoin'),
    new Token(ChainId.MAINNET, USDC_ADDRESS, 6, 'USDC', 'USD//C'),
  ],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
};

export const PAIR_INTERFACE = new Interface(IUniswapV2PairABI);

export const PAIR_GET_RESERVES_FRAGMENT = PAIR_INTERFACE.getFunction(
  'getReserves'
);

export const PAIR_GET_RESERVES_CALL_DATA: string = PAIR_INTERFACE.encodeFunctionData(
  PAIR_GET_RESERVES_FRAGMENT
);

export const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
};

export const REMOTE_TOKEN_LIST_ENDPOINT =
  'https://raw.githubusercontent.com/ctjlewis/rainbow-token-list/service-compatibility/output/rainbow-token-list.json';
