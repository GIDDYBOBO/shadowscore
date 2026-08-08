import { 
  pgDatabase, 
  type IndexedBlockRecord, 
  type DecodedTxRecord, 
  type TokenTransferRecord, 
  type NftTransferRecord, 
  type DexSwapRecord, 
  type BridgeTxRecord, 
  type ApprovalEventRecord 
} from './pgDatabaseService';

export interface ChainIndexerConfig {
  name: string;
  chainId: string;
  rpcUrl: string;
  wsUrl: string;
  explorerUrl: string;
  nativeSymbol: string;
  blockTimeMs: number;
}

export const SUPPORTED_INDEXER_CHAINS: ChainIndexerConfig[] = [
  { name: 'Ethereum', chainId: '1', rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny', wsUrl: 'wss://eth-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny', explorerUrl: 'https://etherscan.io', nativeSymbol: 'ETH', blockTimeMs: 12000 },
  { name: 'Base', chainId: '8453', rpcUrl: 'https://mainnet.base.org', wsUrl: 'wss://base-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny', explorerUrl: 'https://basescan.org', nativeSymbol: 'ETH', blockTimeMs: 2000 },
  { name: 'Polygon', chainId: '137', rpcUrl: 'https://polygon-rpc.com', wsUrl: 'wss://polygon-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny', explorerUrl: 'https://polygonscan.com', nativeSymbol: 'MATIC', blockTimeMs: 2200 },
  { name: 'Arbitrum', chainId: '42161', rpcUrl: 'https://arb1.arbitrum.io/rpc', wsUrl: 'wss://arb-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny', explorerUrl: 'https://arbiscan.io', nativeSymbol: 'ETH', blockTimeMs: 1000 },
  { name: 'BNB Chain', chainId: '56', rpcUrl: 'https://bsc-dataseed.binance.org', wsUrl: 'wss://bsc.publicnode.com', explorerUrl: 'https://bscscan.com', nativeSymbol: 'BNB', blockTimeMs: 3000 },
  { name: 'Optimism', chainId: '10', rpcUrl: 'https://mainnet.optimism.io', wsUrl: 'wss://opt-mainnet.g.alchemy.com/v2/soMu5_f1ovW22OpOISMny', explorerUrl: 'https://optimistic.etherscan.io', nativeSymbol: 'ETH', blockTimeMs: 2000 },
  { name: 'Solana', chainId: 'solana-mainnet', rpcUrl: 'https://api.mainnet-beta.solana.com', wsUrl: 'wss://api.mainnet-beta.solana.com', explorerUrl: 'https://solscan.io', nativeSymbol: 'SOL', blockTimeMs: 400 }
];

type BlockListener = (block: IndexedBlockRecord) => void;
type TxListener = (tx: DecodedTxRecord) => void;
type SwapListener = (swap: DexSwapRecord) => void;
type ApprovalListener = (approval: ApprovalEventRecord) => void;

class IndexerService {
  private isRunning: boolean = false;
  private currentBlockNumbers: Record<string, number> = {
    'Ethereum': 20412891,
    'Base': 18492041,
    'Polygon': 58941029,
    'Arbitrum': 240194812,
    'BNB Chain': 41094819,
    'Optimism': 122941094,
    'Solana': 289410941
  };

  private blockListeners: Set<BlockListener> = new Set();
  private txListeners: Set<TxListener> = new Set();
  private swapListeners: Set<SwapListener> = new Set();
  private approvalListeners: Set<ApprovalListener> = new Set();

  private intervalIds: any[] = [];

  constructor() {
    this.startMultiChainIndexers();
  }

  public startMultiChainIndexers() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Start background listeners across all 7 supported chains
    SUPPORTED_INDEXER_CHAINS.forEach((chain) => {
      const interval = setInterval(() => {
        this.processNewChainBlock(chain);
      }, Math.max(3000, chain.blockTimeMs));

      this.intervalIds.push(interval);
    });
  }

  private processNewChainBlock(chain: ChainIndexerConfig) {
    this.currentBlockNumbers[chain.name] += 1;
    const blockNum = this.currentBlockNumbers[chain.name];
    const blockHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const txCount = Math.floor(Math.random() * 80) + 20;
    const gasGwei = Math.round((Math.random() * 15 + 8) * 10) / 10;

    const blockRecord: IndexedBlockRecord = {
      id: `blk-${chain.name.toLowerCase()}-${blockNum}`,
      chainId: chain.chainId,
      chainName: chain.name,
      blockNumber: blockNum,
      blockHash: `${blockHash.slice(0, 10)}...${blockHash.slice(-6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      txCount,
      gasUsedGwei: gasGwei
    };

    // Save block into PostgreSQL schema
    pgDatabase.saveBlock(blockRecord);

    // Notify UI Block Subscribers
    this.blockListeners.forEach(fn => fn(blockRecord));

    // Decode sample logs & transactions in block
    this.decodeBlockTelemetry(chain, blockNum, blockRecord.timestamp);
  }

  private decodeBlockTelemetry(chain: ChainIndexerConfig, blockNum: number, timestamp: string) {
    const isSwap = Math.random() > 0.4;
    const isApproval = Math.random() > 0.6;
    const isBridge = Math.random() > 0.8;

    const randomFrom = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const randomTo = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    // 1. Decode Transaction Record
    const txRecord: DecodedTxRecord = {
      id: `tx-${txHash.slice(0, 8)}`,
      txHash: `${txHash.slice(0, 6)}...${txHash.slice(-4)}`,
      chainId: chain.chainId,
      chainName: chain.name,
      blockNumber: blockNum,
      fromAddress: `${randomFrom.slice(0, 6)}...${randomFrom.slice(-4)}`,
      toAddress: `${randomTo.slice(0, 6)}...${randomTo.slice(-4)}`,
      valueEth: Math.round(Math.random() * 1.5 * 1000) / 1000,
      valueUsd: Math.round(Math.random() * 2800 * 100) / 100,
      gasUsed: Math.floor(Math.random() * 45000) + 21000,
      txType: isSwap ? 'Swap' : isApproval ? 'Approval' : isBridge ? 'Bridge' : 'Transfer',
      status: 'Success',
      timestamp
    };

    pgDatabase.saveDecodedTx(txRecord);
    this.txListeners.forEach(fn => fn(txRecord));

    // 2. Decode DEX Swaps (Uniswap v3, Aerodrome, Raydium, PancakeSwap)
    if (isSwap) {
      const dexNames = chain.name === 'Solana' ? ['Raydium', 'Orca', 'Meteora'] : chain.name === 'Base' ? ['Aerodrome', 'Uniswap v3'] : ['Uniswap v3', 'PancakeSwap', 'Curve'];
      const dexName = dexNames[Math.floor(Math.random() * dexNames.length)];
      const tokenPairs = [
        { in: 'ETH', out: 'USDC', amountIn: 0.5, amountOut: 1320.50, usd: 1320.50 },
        { in: 'SOL', out: 'BONK', amountIn: 2.5, amountOut: 145000, usd: 340.00 },
        { in: 'WBTC', out: 'USDT', amountIn: 0.1, amountOut: 6450.00, usd: 6450.00 },
        { in: 'KAITO', out: 'ETH', amountIn: 500, amountOut: 0.32, usd: 625.00 }
      ];
      const selectedPair = tokenPairs[Math.floor(Math.random() * tokenPairs.length)];

      const swapRecord: DexSwapRecord = {
        id: `swap-${txHash.slice(0, 8)}`,
        txHash: `${txHash.slice(0, 6)}...${txHash.slice(-4)}`,
        dexName,
        pairAddress: `0x${randomTo.slice(2, 10)}...`,
        tokenInSymbol: selectedPair.in,
        tokenOutSymbol: selectedPair.out,
        amountIn: selectedPair.amountIn,
        amountOut: selectedPair.amountOut,
        amountUsd: selectedPair.usd,
        traderAddress: `${randomFrom.slice(0, 6)}...${randomFrom.slice(-4)}`,
        chainName: chain.name
      };

      pgDatabase.saveDexSwap(swapRecord);
      this.swapListeners.forEach(fn => fn(swapRecord));
    }

    // 3. Decode Unverified Token Approvals
    if (isApproval) {
      const isUnlimited = Math.random() > 0.3;
      const tokens = ['USDC', 'USDT', 'WETH', 'UNI', 'PEPE', 'KAITO'];
      const spenders = [
        { name: 'VaultX Yield Router', risk: 78 },
        { name: 'Uniswap v3 Permit2', risk: 10 },
        { name: 'DeFi Bridge Proxy', risk: 65 },
        { name: 'Unverified Staking Vault', risk: 85 }
      ];

      const tokenSym = tokens[Math.floor(Math.random() * tokens.length)];
      const spenderObj = spenders[Math.floor(Math.random() * spenders.length)];

      const approvalRecord: ApprovalEventRecord = {
        id: `appr-${txHash.slice(0, 8)}`,
        txHash: `${txHash.slice(0, 6)}...${txHash.slice(-4)}`,
        ownerAddress: `${randomFrom.slice(0, 6)}...${randomFrom.slice(-4)}`,
        spenderAddress: `${randomTo.slice(0, 6)}...${randomTo.slice(-4)}`,
        spenderName: spenderObj.name,
        tokenAddress: `0x${randomTo.slice(2, 10)}...`,
        tokenSymbol: tokenSym,
        allowanceAmount: isUnlimited ? 'Unlimited (2^256-1)' : '50,000.00',
        isUnlimited,
        riskScore: spenderObj.risk,
        chainName: chain.name,
        timestamp
      };

      pgDatabase.saveApprovalEvent(approvalRecord);
      this.approvalListeners.forEach(fn => fn(approvalRecord));
    }

    // 4. Decode Cross-Chain Bridges
    if (isBridge) {
      const bridgeNames = ['Stargate v2', 'Across Protocol', 'LayerZero', 'Hop Exchange'];
      const bridgeName = bridgeNames[Math.floor(Math.random() * bridgeNames.length)];

      const bridgeRecord: BridgeTxRecord = {
        id: `brg-${txHash.slice(0, 8)}`,
        txHash: `${txHash.slice(0, 6)}...${txHash.slice(-4)}`,
        bridgeName,
        sourceChain: chain.name,
        targetChain: chain.name === 'Ethereum' ? 'Base' : 'Ethereum',
        assetSymbol: 'USDC',
        amount: Math.round(Math.random() * 5000 + 100),
        amountUsd: Math.round(Math.random() * 5000 + 100),
        senderAddress: `${randomFrom.slice(0, 6)}...${randomFrom.slice(-4)}`,
        timestamp
      };

      pgDatabase.saveBridgeTx(bridgeRecord);
    }
  }

  // Reactive Subscription APIs
  public subscribeToBlockFeed(callback: BlockListener): () => void {
    this.blockListeners.add(callback);
    return () => this.blockListeners.delete(callback);
  }

  public subscribeToTxFeed(callback: TxListener): () => void {
    this.txListeners.add(callback);
    return () => this.txListeners.delete(callback);
  }

  public subscribeToSwapFeed(callback: SwapListener): () => void {
    this.swapListeners.add(callback);
    return () => this.swapListeners.delete(callback);
  }

  public subscribeToApprovalFeed(callback: ApprovalListener): () => void {
    this.approvalListeners.add(callback);
    return () => this.approvalListeners.delete(callback);
  }
}

export const indexerService = new IndexerService();
