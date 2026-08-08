export interface ChainConfig {
  id: string;
  name: string;
  chainType: 'ETHEREUM' | 'BASE' | 'POLYGON' | 'ARBITRUM' | 'BNB_CHAIN' | 'OPTIMISM' | 'SOLANA';
  rpcHttpUrl: string;
  rpcWsUrl: string;
  blockExplorer: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  averageBlockTimeMs: number;
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  ethereum: {
    id: '1',
    name: 'Ethereum Mainnet',
    chainType: 'ETHEREUM',
    rpcHttpUrl: process.env.ETH_RPC_HTTP || 'https://eth-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny',
    rpcWsUrl: process.env.ETH_RPC_WS || 'wss://eth-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny',
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    averageBlockTimeMs: 12000
  },
  base: {
    id: '8453',
    name: 'Base Mainnet',
    chainType: 'BASE',
    rpcHttpUrl: process.env.BASE_RPC_HTTP || 'https://mainnet.base.org',
    rpcWsUrl: process.env.BASE_RPC_WS || 'wss://base-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    averageBlockTimeMs: 2000
  },
  polygon: {
    id: '137',
    name: 'Polygon PoS',
    chainType: 'POLYGON',
    rpcHttpUrl: process.env.POLYGON_RPC_HTTP || 'https://polygon-rpc.com',
    rpcWsUrl: process.env.POLYGON_RPC_WS || 'wss://polygon-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: { name: 'Polygon MATIC', symbol: 'MATIC', decimals: 18 },
    averageBlockTimeMs: 2200
  },
  arbitrum: {
    id: '42161',
    name: 'Arbitrum One',
    chainType: 'ARBITRUM',
    rpcHttpUrl: process.env.ARBITRUM_RPC_HTTP || 'https://arb1.arbitrum.io/rpc',
    rpcWsUrl: process.env.ARBITRUM_RPC_WS || 'wss://arb-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny',
    blockExplorer: 'https://arbiscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    averageBlockTimeMs: 1000
  },
  bnb: {
    id: '56',
    name: 'BNB Smart Chain',
    chainType: 'BNB_CHAIN',
    rpcHttpUrl: process.env.BNB_RPC_HTTP || 'https://bsc-dataseed.binance.org',
    rpcWsUrl: process.env.BNB_RPC_WS || 'wss://bsc.publicnode.com',
    blockExplorer: 'https://bscscan.com',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    averageBlockTimeMs: 3000
  },
  optimism: {
    id: '10',
    name: 'Optimism Mainnet',
    chainType: 'OPTIMISM',
    rpcHttpUrl: process.env.OPTIMISM_RPC_HTTP || 'https://mainnet.optimism.io',
    rpcWsUrl: process.env.OPTIMISM_RPC_WS || 'wss://opt-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny',
    blockExplorer: 'https://optimistic.etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    averageBlockTimeMs: 2000
  },
  solana: {
    id: 'solana-mainnet',
    name: 'Solana Mainnet-Beta',
    chainType: 'SOLANA',
    rpcHttpUrl: process.env.SOLANA_RPC_HTTP || 'https://api.mainnet-beta.solana.com',
    rpcWsUrl: process.env.SOLANA_RPC_WS || 'wss://api.mainnet-beta.solana.com',
    blockExplorer: 'https://solscan.io',
    nativeCurrency: { name: 'Solana', symbol: 'SOL', decimals: 9 },
    averageBlockTimeMs: 400
  }
};
