export const SWAGGER_OPENAPI_SPEC = {
  openapi: '3.0.3',
  info: {
    title: 'ShadowScore Blockchain Intelligence API',
    version: '1.0.0',
    description: 'Production-grade high-throughput REST and WebSocket APIs for on-chain indexing, reputation scoring, portfolio tracking, and DEX transaction feeds.'
  },
  servers: [
    { url: 'https://api.shadowscore.ai/v1', description: 'Production API Gateway' },
    { url: 'http://localhost:5173/api/v1', description: 'Local Dev Server' }
  ],
  paths: {
    '/wallet/{address}': {
      get: {
        summary: 'Get Wallet Overview & Intelligence',
        parameters: [{ name: 'address', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Wallet intelligence dossier with ENS, age, gas spent, and risk level.' }
        }
      }
    },
    '/wallet/{address}/history': {
      get: {
        summary: 'Get Wallet Transaction History Ledger',
        parameters: [{ name: 'address', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Array of on-chain decoded ledger entries with counterparty labels.' }
        }
      }
    },
    '/wallet/{address}/tokens': {
      get: {
        summary: 'Get Wallet Token Holdings',
        parameters: [{ name: 'address', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'List of ERC20/SPL token balances with live USD spot valuations.' }
        }
      }
    },
    '/wallet/{address}/nfts': {
      get: {
        summary: 'Get Wallet NFT Portfolio',
        parameters: [{ name: 'address', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'ERC721, ERC1155, and Metaplex NFT assets with floor prices and PnL.' }
        }
      }
    },
    '/wallet/{address}/reputation': {
      get: {
        summary: 'Get 8-Dimensional ShadowScore AI Reputation',
        parameters: [{ name: 'address', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Dynamic 0-100 reputation score, risk level, and natural language AI explanations.' }
        }
      }
    },
    '/token/{address}': {
      get: {
        summary: 'Get Token Telemetry & Whale Distribution',
        parameters: [{ name: 'address', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'Token market cap, FDV, 24h buy/sell volume, and whale holder distribution.' }
        }
      }
    },
    '/transactions/live': {
      get: {
        summary: 'Get Live Multi-Chain DexScreener Feed',
        responses: {
          '200': { description: 'Real-time swap routes, gas telemetry, and transaction statuses.' }
        }
      }
    },
    '/leaderboard': {
      get: {
        summary: 'Get Highest Reputation Web3 Wallets',
        responses: {
          '200': { description: 'Top ranking wallets with AAA+ reputation tiers.' }
        }
      }
    },
    '/protocols': {
      get: {
        summary: 'Get Supported DeFi & DEX Protocols',
        responses: {
          '200': { description: 'List of indexed protocols: Uniswap v3, Aerodrome, Raydium, Aave v3, Curve.' }
        }
      }
    },
    '/chains': {
      get: {
        summary: 'Get Supported Blockchain Networks',
        responses: {
          '200': { description: 'Ethereum, Base, Polygon, Arbitrum, BNB Chain, Optimism, Solana.' }
        }
      }
    }
  }
};
