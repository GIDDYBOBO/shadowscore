import { WalletIntelligenceEngine } from '../services/WalletIntelligenceEngine';
import { tokenTrackingService } from '../services/TokenTrackingService';
import { NftIntelligenceService } from '../services/NftIntelligenceService';
import { liveTransactionStreamService } from '../services/LiveTransactionStreamService';
import { ShadowScoreAIEngine } from '../services/ShadowScoreAIEngine';
import { SUPPORTED_INDEXER_CHAINS } from '../services/indexerService';

export class ApiController {
  public static async handleRoute(endpoint: string): Promise<{ status: number; data: any }> {
    // 1. GET /chains
    if (endpoint === '/chains') {
      return { status: 200, data: SUPPORTED_INDEXER_CHAINS };
    }

    // 2. GET /protocols
    if (endpoint === '/protocols') {
      return {
        status: 200,
        data: [
          { name: 'Uniswap v3', type: 'DEX', chains: ['Ethereum', 'Base', 'Polygon', 'Arbitrum'] },
          { name: 'Aerodrome', type: 'DEX', chains: ['Base'] },
          { name: 'Raydium V4', type: 'DEX', chains: ['Solana'] },
          { name: 'Aave v3', type: 'Lending', chains: ['Ethereum', 'Base', 'Arbitrum', 'Polygon'] },
          { name: 'Curve Finance', type: 'StableSwap', chains: ['Ethereum', 'Arbitrum', 'Polygon'] }
        ]
      };
    }

    // 3. GET /leaderboard
    if (endpoint === '/leaderboard') {
      return {
        status: 200,
        data: [
          { rank: 1, address: '0xd8da...6045', ens: 'vitalik.eth', shadowScore: 98, tier: 'AAA+' },
          { rank: 2, address: '0x1111...097d', ens: '1inch-treasury.eth', shadowScore: 95, tier: 'AAA+' },
          { rank: 3, address: '0x9928...31aa', ens: 'alpha-whale.eth', shadowScore: 92, tier: 'AAA+' }
        ]
      };
    }

    // 4. GET /transactions/live
    if (endpoint === '/transactions/live') {
      return { status: 200, data: liveTransactionStreamService.getRecentTransactions(25) };
    }

    // 5. GET /token/:address
    if (endpoint.startsWith('/token/')) {
      const address = endpoint.split('/')[2];
      const tok = tokenTrackingService.getToken(address);
      return tok ? { status: 200, data: tok } : { status: 404, data: { error: 'Token not found' } };
    }

    // 6. GET /wallet/:address/reputation
    if (endpoint.startsWith('/wallet/') && endpoint.endsWith('/reputation')) {
      const address = endpoint.split('/')[2];
      return { status: 200, data: ShadowScoreAIEngine.calculateDynamicScore(address) };
    }

    // 7. GET /wallet/:address/nfts
    if (endpoint.startsWith('/wallet/') && endpoint.endsWith('/nfts')) {
      const address = endpoint.split('/')[2];
      const nfts = await NftIntelligenceService.getWalletNfts(address);
      return { status: 200, data: nfts };
    }

    // 8. GET /wallet/:address
    if (endpoint.startsWith('/wallet/')) {
      const address = endpoint.split('/')[2];
      const intel = await WalletIntelligenceEngine.analyzeWallet(address);
      return { status: 200, data: intel };
    }

    return { status: 404, data: { error: `Endpoint ${endpoint} not found` } };
  }
}
