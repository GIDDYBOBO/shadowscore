export type NetworkName = 'Ethereum' | 'Base' | 'Solana' | 'Arbitrum' | 'Polygon' | 'Sepolia' | 'EVM Chain';

export interface RiskFactor {
  id: string;
  label: string;
  positive: boolean;
}

export interface ReputationBreakdownItem {
  category: string;
  score: number; // 0 - 100
  color: string;
}

export interface HistoryPoint {
  date: string;
  score: number;
}

export interface PortfolioHistoryPoint {
  date: string;
  valueUsd: number;
}

export interface TransactionItem {
  id: string;
  hash: string;
  type: string;
  timestamp: string;
  counterparty: string;
  value: string;
  status: 'Success' | 'Flagged' | 'Pending';
  riskScore: number; // 0-100 (lower is safer)
  aiNote: string;
}

export interface ContractApproval {
  id: string;
  token: string;
  symbol: string;
  spender: string;
  spenderName: string;
  allowance: string;
  riskLevel: 'High' | 'Medium' | 'Safe';
  reason: string;
  state: 'Active' | 'Passive'; // Active vs Passive (dormant/revoked)
  isRevoked?: boolean;
  lastInteraction?: string;
}

export interface ConnectedDAppSession {
  id: string;
  name: string;
  url: string;
  icon: string;
  connectedAt: string;
  permissions: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  isForceDisconnected?: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  change: number; // e.g. +12 or -15
  title: string;
  description: string;
  category: 'Governance' | 'Developer' | 'Security' | 'DeFi' | 'Social';
  impact: 'positive' | 'negative';
}

export interface Recommendation {
  id: string;
  title: string;
  impactPoints: number;
  actionLabel: string;
  category: 'Security' | 'Governance' | 'Identity' | 'DeFi';
  completed: boolean;
  aiNote?: string;
}

export interface SocialNewsItem {
  id: string;
  title: string;
  summary: string;
  content: string; // Full 600-word writeup
  category: 'Crypto' | 'Stocks' | 'Tech & Startups' | 'Security Alerts';
  source: string;
  author?: string;
  readTime?: string;
  timestamp: string;
  impactScore: 'Bullish' | 'Bearish' | 'Critical Alert' | 'Insight';
  url?: string;
  references?: string[];
  chartTitle?: string;
  chartData?: { name: string; value: number }[];
}

export interface DaoProjectItem {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  hasDao: boolean;
  proposalCount: number;
  activeProposals: number;
  treasuryUsd: string;
  governanceSummary: string;
  topProposal?: string;
  category: string;
}

export interface FundingLiquidityItem {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  totalRaisedUsd: string;
  leadInvestors: string[];
  liquidityPoolUsd: string;
  backingSummary: string;
  stage: string;
}

export interface StakedProtocolItem {
  id: string;
  protocolName: string;
  assetSymbol: string;
  amount: string;
  usdValue: number;
  stakedDate: string;
  frequencyCount: number;
  apyPct: number;
  aiVerdictScore: number; // 0 - 100
  aiVerdictText: string;
  status: 'Audited Secure' | 'Moderate Yield' | 'Caution Vector';
}

export interface WalletProfile {
  address: string;
  ensName?: string;
  network: NetworkName;
  walletAge: string;
  firstActivity: string;
  status: 'Healthy' | 'Caution' | 'High Risk';
  lastUpdated: string;
  score: number; // 0-100 or scale
  grade: string; // e.g., B+
  riskLevel: 'Low' | 'Medium' | 'High';
  riskStatusText: string; // e.g., Secure
  percentile: string; // e.g., Top 18%
  totalTransactions: number;
  totalTokens: number;
  totalNfts: number;
  portfolioValueUsd: number;
  executiveSummary: string;
  healthFactor: number;
  collateralRatioPct: number;
  riskFactors: RiskFactor[];
  breakdown: ReputationBreakdownItem[];
  reputationHistory: HistoryPoint[];
  portfolioHistory: PortfolioHistoryPoint[];
  transactions: TransactionItem[];
  approvals: ContractApproval[];
  connectedDApps: ConnectedDAppSession[];
  timeline: TimelineEvent[];
  recommendations: Recommendation[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  riskAlert?: {
    title: string;
    level: 'High' | 'Medium' | 'Low';
    recommendation: string;
  };
}
