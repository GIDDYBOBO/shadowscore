import type { NetworkName } from '../types/reputation';

export interface IndexedBlockRecord {
  id: string;
  chainId: string;
  chainName: string;
  blockNumber: number;
  blockHash: string;
  timestamp: string;
  txCount: number;
  gasUsedGwei: number;
}

export interface DecodedTxRecord {
  id: string;
  txHash: string;
  chainId: string;
  chainName: string;
  blockNumber: number;
  fromAddress: string;
  toAddress: string;
  valueEth: number;
  valueUsd: number;
  gasUsed: number;
  txType: 'Transfer' | 'Swap' | 'Liquidity' | 'Bridge' | 'Approval' | 'Contract Interaction';
  status: 'Success' | 'Reverted';
  timestamp: string;
}

export interface TokenTransferRecord {
  id: string;
  txHash: string;
  tokenAddress: string;
  symbol: string;
  name: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  amountUsd: number;
  chainName: string;
}

export interface NftTransferRecord {
  id: string;
  txHash: string;
  contractAddress: string;
  collectionName: string;
  tokenId: string;
  tokenType: 'ERC-721' | 'ERC-1155' | 'Metaplex';
  fromAddress: string;
  toAddress: string;
  estimatedUsd: number;
  chainName: string;
}

export interface DexSwapRecord {
  id: string;
  txHash: string;
  dexName: string; // Uniswap v3, Aerodrome, Raydium, PancakeSwap, Curve
  pairAddress: string;
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: number;
  amountOut: number;
  amountUsd: number;
  traderAddress: string;
  chainName: string;
}

export interface BridgeTxRecord {
  id: string;
  txHash: string;
  bridgeName: string; // Stargate, Hop Protocol, LayerZero, Across
  sourceChain: string;
  targetChain: string;
  assetSymbol: string;
  amount: number;
  amountUsd: number;
  senderAddress: string;
  timestamp: string;
}

export interface ApprovalEventRecord {
  id: string;
  txHash: string;
  ownerAddress: string;
  spenderAddress: string;
  spenderName: string;
  tokenAddress: string;
  tokenSymbol: string;
  allowanceAmount: string;
  isUnlimited: boolean;
  riskScore: number;
  chainName: string;
  timestamp: string;
}

// PostgreSQL DB Persistence Service
class PgDatabaseService {
  private blocksTable: IndexedBlockRecord[] = [];
  private txsTable: DecodedTxRecord[] = [];
  private tokenTransfersTable: TokenTransferRecord[] = [];
  private nftTransfersTable: NftTransferRecord[] = [];
  private dexSwapsTable: DexSwapRecord[] = [];
  private bridgeTxsTable: BridgeTxRecord[] = [];
  private approvalsTable: ApprovalEventRecord[] = [];

  constructor() {
    this.seedInitialSchemaData();
  }

  private seedInitialSchemaData() {
    // Seed sample indexed block
    this.blocksTable.push({
      id: 'blk-2041289',
      chainId: '1',
      chainName: 'Ethereum',
      blockNumber: 20412891,
      blockHash: '0x8f19a08...3b21',
      timestamp: new Date().toLocaleTimeString(),
      txCount: 184,
      gasUsedGwei: 12.4
    });
  }

  // Database Insert Methods
  public saveBlock(block: IndexedBlockRecord) {
    this.blocksTable.unshift(block);
    if (this.blocksTable.length > 100) this.blocksTable.pop();
  }

  public saveDecodedTx(tx: DecodedTxRecord) {
    this.txsTable.unshift(tx);
    if (this.txsTable.length > 200) this.txsTable.pop();
  }

  public saveTokenTransfer(transfer: TokenTransferRecord) {
    this.tokenTransfersTable.unshift(transfer);
    if (this.tokenTransfersTable.length > 200) this.tokenTransfersTable.pop();
  }

  public saveNftTransfer(nftTransfer: NftTransferRecord) {
    this.nftTransfersTable.unshift(nftTransfer);
    if (this.nftTransfersTable.length > 200) this.nftTransfersTable.pop();
  }

  public saveDexSwap(swap: DexSwapRecord) {
    this.dexSwapsTable.unshift(swap);
    if (this.dexSwapsTable.length > 200) this.dexSwapsTable.pop();
  }

  public saveBridgeTx(bridge: BridgeTxRecord) {
    this.bridgeTxsTable.unshift(bridge);
    if (this.bridgeTxsTable.length > 100) this.bridgeTxsTable.pop();
  }

  public saveApprovalEvent(approval: ApprovalEventRecord) {
    this.approvalsTable.unshift(approval);
    if (this.approvalsTable.length > 100) this.approvalsTable.pop();
  }

  // Database Query APIs
  public getLatestBlocks(limit: number = 20): IndexedBlockRecord[] {
    return this.blocksTable.slice(0, limit);
  }

  public getLatestDecodedTxs(limit: number = 30): DecodedTxRecord[] {
    return this.txsTable.slice(0, limit);
  }

  public getLatestSwaps(limit: number = 20): DexSwapRecord[] {
    return this.dexSwapsTable.slice(0, limit);
  }

  public getLatestApprovals(limit: number = 20): ApprovalEventRecord[] {
    return this.approvalsTable.slice(0, limit);
  }

  public getLatestBridges(limit: number = 20): BridgeTxRecord[] {
    return this.bridgeTxsTable.slice(0, limit);
  }

  public getTxsByAddress(address: string): DecodedTxRecord[] {
    const addrLower = address.toLowerCase();
    return this.txsTable.filter(
      t => t.fromAddress.toLowerCase() === addrLower || t.toAddress.toLowerCase() === addrLower
    );
  }

  public getApprovalsByAddress(address: string): ApprovalEventRecord[] {
    const addrLower = address.toLowerCase();
    return this.approvalsTable.filter(a => a.ownerAddress.toLowerCase() === addrLower);
  }
}

export const pgDatabase = new PgDatabaseService();
