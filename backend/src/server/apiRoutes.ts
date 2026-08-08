import { pgDatabase } from '../services/pgDatabaseService';
import { SUPPORTED_INDEXER_CHAINS } from '../services/indexerService';
import { WalletIntelligenceEngine } from '../services/WalletIntelligenceEngine';
import { tokenTrackingService } from '../services/TokenTrackingService';
import { NftIntelligenceService } from '../services/NftIntelligenceService';
import { PortfolioEngineService } from '../services/PortfolioEngineService';
import { ShadowScoreAIEngine } from '../services/ShadowScoreAIEngine';
import { RealtimeDashboardWidgetService } from '../services/RealtimeDashboardWidgetService';

export const handleApiRequest = async (path: string, queryParams: URLSearchParams): Promise<{ status: number; body: any }> => {
  // 1. Health Check
  if (path === '/api/v1/health') {
    return {
      status: 200,
      body: { status: 'healthy', timestamp: new Date().toISOString(), chainsActive: 7, dbConnected: true }
    };
  }

  // 2. Supported Chains
  if (path === '/api/v1/chains') {
    return { status: 200, body: { chains: SUPPORTED_INDEXER_CHAINS } };
  }

  // FEATURE 10: Realtime Dashboard Widgets API
  if (path === '/api/v1/dashboard/widgets') {
    const widgets = RealtimeDashboardWidgetService.getDashboardWidgets();
    return { status: 200, body: widgets };
  }

  // 3. Latest Indexed Blocks
  if (path === '/api/v1/blocks/latest') {
    const limit = parseInt(queryParams.get('limit') || '20', 10);
    const blocks = pgDatabase.getLatestBlocks(limit);
    return { status: 200, body: { count: blocks.length, blocks } };
  }

  // 4. Live Decoded Transactions
  if (path === '/api/v1/txs/live') {
    const limit = parseInt(queryParams.get('limit') || '30', 10);
    const txs = pgDatabase.getLatestDecodedTxs(limit);
    return { status: 200, body: { count: txs.length, transactions: txs } };
  }

  // 5. Live DEX Swaps
  if (path === '/api/v1/swaps/live') {
    const limit = parseInt(queryParams.get('limit') || '20', 10);
    const swaps = pgDatabase.getLatestSwaps(limit);
    return { status: 200, body: { count: swaps.length, swaps } };
  }

  // 6. Live Token Approvals
  if (path === '/api/v1/approvals/live') {
    const limit = parseInt(queryParams.get('limit') || '20', 10);
    const approvals = pgDatabase.getLatestApprovals(limit);
    return { status: 200, body: { count: approvals.length, approvals } };
  }

  // FEATURE 7: ShadowScore AI Reputation Engine API
  if (path.startsWith('/api/v1/wallet/') && path.endsWith('/reputation')) {
    const address = path.split('/')[4];
    const audit = ShadowScoreAIEngine.calculateDynamicScore(address);
    return { status: 200, body: audit };
  }

  // FEATURE 6: Live Portfolio Engine API
  if (path.startsWith('/api/v1/wallet/') && path.endsWith('/portfolio')) {
    const address = path.split('/')[4];
    const portfolio = PortfolioEngineService.calculatePortfolio(address);
    return { status: 200, body: portfolio };
  }

  // FEATURE 5: NFT Intelligence API
  if (path.startsWith('/api/v1/wallet/') && path.endsWith('/nfts')) {
    const address = path.split('/')[4];
    const nfts = await NftIntelligenceService.getWalletNfts(address);
    const totalFloorUsd = nfts.reduce((acc, curr) => acc + curr.estimatedFloorUsd, 0);
    return { status: 200, body: { address, totalNfts: nfts.length, totalFloorUsd, nfts } };
  }

  // FEATURE 4: Token Tracking API
  if (path === '/api/v1/tokens/all') {
    const tokens = tokenTrackingService.getAllTokens();
    return { status: 200, body: { count: tokens.length, tokens } };
  }

  // FEATURE 2: Full Wallet Intelligence Dossier API
  if (path.startsWith('/api/v1/wallet/') && path.endsWith('/intelligence')) {
    const address = path.split('/')[4];
    const intelligence = await WalletIntelligenceEngine.analyzeWallet(address);
    return { status: 200, body: intelligence };
  }

  return { status: 404, body: { error: `Endpoint ${path} not found` } };
};
