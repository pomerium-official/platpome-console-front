// 테스트넷 컨트랙트 정보
import { PrebuiltContractType } from '@thirdweb-dev/sdk';

const NFT_CONTRACT_ADDRESS_TESTNET =
  process.env.NFT_CONTRACT_ADDRESS_TESTNET || '';
const NFT_MARKET_CONTRACT_ADDRESS_TESTNET =
  process.env.NFT_MARKET_CONTRACT_ADDRESS_TESTNET || '';

// 메인넷 컨트랙트 정보
const NFT_CONTRACT_ADDRESS_MAINNET =
  process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_MAINNET || '';
const NFT_MARKET_CONTRACT_ADDRESS_MAINNET =
  process.env.NEXT_PUBLIC_NFT_MARKET_CONTRACT_ADDRESS_MAINNET || '';

export const DEFAULT_CHAIN_ID = 97;

export const prebuiltContracts = {
  vote: 'vote',
  token: 'token',
  'edition-drop': 'edition-drop',
  edition: 'edition',
  marketplace: 'marketplace',
  'marketplace-v3': 'marketplace-v3',
  multiwrap: 'multiwrap',
  'nft-collection': 'nft-collection',
  'nft-drop': 'nft-drop',
  pack: 'pack',
  'signature-drop': 'signature-drop',
  split: 'split',
  'token-drop': 'token-drop',
  erc20: 'erc20',
} as const;

export const enum SupportChainId {
  Polygon = 137,
  Mumbai = 80001,
  BinanceSmartChainMainnet = 56,
  BinanceSmartChainTestnet = 97,
}

export interface SupportDApppContract {
  chainId: SupportChainId;
  symbol: string;
  name: string;
  description: string;
  contractAddress: string;
  type: PrebuiltContractType;
}

export const supportDApppContractList: SupportDApppContract[] = [
  // 테스트넷
  {
    chainId: SupportChainId.BinanceSmartChainTestnet,
    symbol: '',
    name: 'NFT Edition',
    description: 'Prebuilt NFT Edition contract of Thirdweb',
    contractAddress: NFT_CONTRACT_ADDRESS_TESTNET,
    type: prebuiltContracts.edition,
  },
  {
    chainId: SupportChainId.BinanceSmartChainTestnet,
    symbol: '',
    name: 'NFT MarketplaceV3',
    description: 'Prebuilt NFT MarketplaceV3 contract of Thirdweb',
    contractAddress: NFT_MARKET_CONTRACT_ADDRESS_TESTNET,
    type: prebuiltContracts['marketplace-v3'],
  },
  // 메인넷
  {
    chainId: SupportChainId.BinanceSmartChainMainnet,
    symbol: '',
    name: 'NFT Edition',
    description: 'Prebuilt NFT Edition contract of Thirdweb',
    contractAddress: NFT_CONTRACT_ADDRESS_MAINNET,
    type: prebuiltContracts.edition,
  },
  {
    chainId: SupportChainId.BinanceSmartChainMainnet,
    symbol: '',
    name: 'NFT MarketplaceV3',
    description: 'Prebuilt NFT MarketplaceV3 contract of Thirdweb',
    contractAddress: NFT_MARKET_CONTRACT_ADDRESS_MAINNET,
    type: prebuiltContracts['marketplace-v3'],
  },
];
