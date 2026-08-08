import React, { useState } from 'react';
import { 
  Vote, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieIcon, 
  X, 
  BarChart2, 
  Coins, 
  Building2 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export interface ExtendedDaoItem {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  category: string;
  hasDao: boolean;
  proposalCount: number;
  activeProposals: number;
  treasuryUsd: string;
  treasuryUsdVal: number;
  marketCapUsd: string;
  tokenPriceUsd: number;
  priceChange24h: number;
  volume24hUsd: string;
  governanceSummary: string;
  topProposal: string;
  votingSystem: string;
  quorumPct: string;
  timelockDelay: string;
  leadInvestors: string[];
  treasuryBreakdown: { name: string; value: number; color: string }[];
  marketTrendData: { day: string; price: number }[];
  fullDossier: string;
  references: string[];
}

export const DaoGovernanceView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeDaoDossier, setActiveDaoDossier] = useState<ExtendedDaoItem | null>(null);

  // 20 Popular DAOs with complete Market Trends, Funding, Governance & Charts
  const daoProjects: ExtendedDaoItem[] = [
    {
      id: 'dao-1',
      name: 'Uniswap Governance',
      symbol: 'UNI',
      logo: '🦄',
      category: 'DeFi',
      hasDao: true,
      proposalCount: 148,
      activeProposals: 3,
      treasuryUsd: '$2.42B USD',
      treasuryUsdVal: 2420000000,
      marketCapUsd: '$4.85B USD',
      tokenPriceUsd: 8.12,
      priceChange24h: 5.42,
      volume24hUsd: '$310M USD',
      governanceSummary: 'Top decentralized exchange DAO controlling Uniswap v3 protocol fee switches, grant distributions, and cross-chain v3/v4 deployments.',
      topProposal: 'UIP-48: Enable Mainnet Protocol Fee Switch on Top 5 v3 Liquidity Pools',
      votingSystem: '1 UNI = 1 Vote (2.5M UNI Delegation Threshold)',
      quorumPct: '40M UNI (4%)',
      timelockDelay: '7 Days Timelock',
      leadInvestors: ['a16z Crypto', 'Paradigm', 'Union Square Ventures', 'Universal Navigation'],
      treasuryBreakdown: [
        { name: 'UNI Token', value: 75, color: '#00F0FF' },
        { name: 'USDC / USDT', value: 15, color: '#10B981' },
        { name: 'ETH / WETH', value: 10, color: '#8B5CF6' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 7.45 },
        { day: 'Tue', price: 7.62 },
        { day: 'Wed', price: 7.50 },
        { day: 'Thu', price: 7.85 },
        { day: 'Fri', price: 7.92 },
        { day: 'Sat', price: 8.04 },
        { day: 'Sun', price: 8.12 }
      ],
      fullDossier: `Uniswap Governance represents one of the largest decentralized autonomous organizations in Web3, managing a multi-billion dollar treasury and exercising control over protocol parameters across 10+ chains.

### 1. Governance Architecture & Delegation Model
Uniswap operates a token-weighted voting model requiring a minimum threshold of 2.5 million UNI delegated to create an autonomous proposal (UIP). Once proposed, the proposal undergoes a 7-day voting period followed by a mandatory 7-day timelock delay administered by the Timelock smart contract.

### 2. Protocol Fee Switch & Yield Distribution
The central economic lever of Uniswap Governance is the Protocol Fee Switch. If enabled, the protocol collects between 10% and 33% of liquidity provider trading fees, directing proceeds into the Uniswap DAO treasury or distributing dividends to ve-staked holders.

### 3. Treasury Asset Allocation & Capital Efficiency
The DAO treasury consists primarily of native UNI tokens, complemented by USDC reserves from working group grants. The Uniswap Foundation manages ecosystem grants targeting v4 hook developers and security audit bounties.`,
      references: ['gov.uniswap.org', 'Snapshot: uniswap.eth', 'Tally Uniswap Governance Portal']
    },
    {
      id: 'dao-2',
      name: 'Aave Governance',
      symbol: 'AAVE',
      logo: '👻',
      category: 'DeFi',
      hasDao: true,
      proposalCount: 215,
      activeProposals: 4,
      treasuryUsd: '$1.85B USD',
      treasuryUsdVal: 1850000000,
      marketCapUsd: '$1.62B USD',
      tokenPriceUsd: 110.45,
      priceChange24h: 3.18,
      volume24hUsd: '$145M USD',
      governanceSummary: 'Decentralized liquidity market governance managing v3 risk parameters, collateral ratios, and GHO stablecoin interest rates.',
      topProposal: 'ARFC: Aave v3 Risk Parameter Adjustments & GHO Borrow Rate Optimization',
      votingSystem: 'AAVE / stKAAVE Voting Power (Optimistic Governance v3)',
      quorumPct: '320,000 AAVE (3.2%)',
      timelockDelay: '5 Days Timelock',
      leadInvestors: ['Framework Ventures', 'Three Arrows Capital', 'Blockchain Capital', 'Standard Crypto'],
      treasuryBreakdown: [
        { name: 'AAVE Token', value: 65, color: '#8B5CF6' },
        { name: 'GHO Stablecoin', value: 20, color: '#10B981' },
        { name: 'aUSDC / stETH', value: 15, color: '#00F0FF' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 102.10 },
        { day: 'Tue', price: 104.50 },
        { day: 'Wed', price: 103.80 },
        { day: 'Thu', price: 106.20 },
        { day: 'Fri', price: 108.90 },
        { day: 'Sat', price: 109.50 },
        { day: 'Sun', price: 110.45 }
      ],
      fullDossier: `Aave Governance v3 is a battle-tested decentralized risk mitigation and parameter management platform overseeing over $10 Billion in total value locked (TVL) across 8 EVM chains.

### 1. Risk Parameter Engine & Automated Guardian
Aave utilizes automated Risk Service Providers (Chaos Labs & Gauntlet) to continuously evaluate loan-to-value (LTV) ratios, liquidation thresholds, and supply caps. The Aave Guardian multisig holds emergency pause capabilities while full governance proposals execute via on-chain payload smart contracts.

### 2. GHO Stablecoin Governance Mechanics
The DAO controls the minting facilitators and interest rate curves for GHO, Aave native decentralized stablecoin. Stakers of AAVE in the Safety Module receive fee discounts and staking yields.`,
      references: ['governance.aave.com', 'Aave Governance v3 Github Repository', 'Chaos Labs Risk Portal']
    },
    {
      id: 'dao-3',
      name: 'Arbitrum DAO',
      symbol: 'ARB',
      logo: '🟢',
      category: 'Layer 2',
      hasDao: true,
      proposalCount: 98,
      activeProposals: 2,
      treasuryUsd: '$3.15B USD',
      treasuryUsdVal: 3150000000,
      marketCapUsd: '$2.48B USD',
      tokenPriceUsd: 0.82,
      priceChange24h: -1.45,
      volume24hUsd: '$210M USD',
      governanceSummary: 'Layer-2 rollup governance for Arbitrum One and Nova chains, directing Gaming Catalyst Funds and DeFi ecosystem incentives.',
      topProposal: 'AIP-8: Arbitrum Gaming Catalyst Program 200M ARB Distribution',
      votingSystem: '1 ARB = 1 Vote (Constitutional vs Non-Constitutional AIPs)',
      quorumPct: '5% of Votable Tokens',
      timelockDelay: '14 Days Security Council Timelock',
      leadInvestors: ['Lightspeed Venture Partners', 'Polychain Capital', 'Pantera Capital', 'Coinbase Ventures'],
      treasuryBreakdown: [
        { name: 'ARB Native Token', value: 80, color: '#00F0FF' },
        { name: 'ETH / WETH', value: 12, color: '#38BDF8' },
        { name: 'USDC Stablecoin', value: 8, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 0.86 },
        { day: 'Tue', price: 0.85 },
        { day: 'Wed', price: 0.84 },
        { day: 'Thu', price: 0.83 },
        { day: 'Fri', price: 0.81 },
        { day: 'Sat', price: 0.82 },
        { day: 'Sun', price: 0.82 }
      ],
      fullDossier: `Arbitrum DAO governs the premier Ethereum Layer-2 rollup network. With over 3 Billion ARB in its treasury, the DAO directs grant distribution, protocol upgrades, and Security Council elections.

### 1. Constitutional vs Non-Constitutional AIPs
Arbitrum Improvement Proposals are classified into Constitutional AIPs (which modify rollup core bytecode and bridge contracts, requiring 14-day timelocks) and Non-Constitutional AIPs (which allocate treasury funds and working group budgets).

### 2. The 9-of-12 Security Council
A emergency 9-of-12 Security Council elected semi-annually by ARB token holders retains rapid response capabilities for critical zero-day vulnerabilities.`,
      references: ['dao.arbitrum.foundation', 'Tally Arbitrum DAO Hub', 'Arbitrum Security Council Docs']
    },
    {
      id: 'dao-4',
      name: 'Optimism Collective',
      symbol: 'OP',
      logo: '🔴',
      category: 'Layer 2',
      hasDao: true,
      proposalCount: 124,
      activeProposals: 5,
      treasuryUsd: '$1.52B USD',
      treasuryUsdVal: 1520000000,
      marketCapUsd: '$1.95B USD',
      tokenPriceUsd: 1.65,
      priceChange24h: 2.85,
      volume24hUsd: '$180M USD',
      governanceSummary: 'Bicameral governance system with Token House and Citizens House for Retroactive Public Goods Funding (RetroPGF).',
      topProposal: 'Season 6 Intent 1: Superchain Interoperability & L2 Sequencer Revenue Sharing',
      votingSystem: 'Bicameral (Token House OP Votes + Citizens House Soulbound Badges)',
      quorumPct: '10% Token House Quorum',
      timelockDelay: '7 Days Optimistic Governance',
      leadInvestors: ['a16z Crypto', 'Paradigm', 'IDEOCoLab', 'Nascent'],
      treasuryBreakdown: [
        { name: 'OP Token', value: 70, color: '#F43F5E' },
        { name: 'ETH Revenue', value: 20, color: '#8B5CF6' },
        { name: 'USDC Reserves', value: 10, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 1.55 },
        { day: 'Tue', price: 1.58 },
        { day: 'Wed', price: 1.56 },
        { day: 'Thu', price: 1.61 },
        { day: 'Fri', price: 1.63 },
        { day: 'Sat', price: 1.64 },
        { day: 'Sun', price: 1.65 }
      ],
      fullDossier: `The Optimism Collective is an innovative experiment in bicameral governance designed to fund public goods and govern the Superchain ecosystem (Base, OP Mainnet, Zora, Mode).

### 1. Bicameral Architecture: Token House vs Citizens House
• **Token House**: Governed by OP token holders and delegates responsible for protocol upgrades, sequencer parameters, and incentive distribution.
• **Citizens House**: Governed by non-transferable Soulbound Badge holders who vote on Retroactive Public Goods Funding (RetroPGF) to reward developers who build open-source tools.`,
      references: ['optimism.io/governance', 'RetroPGF Dashboard', 'Superchain Registry']
    },
    {
      id: 'dao-5',
      name: 'MakerDAO / Sky',
      symbol: 'MKR',
      logo: '🦅',
      category: 'Stablecoins',
      hasDao: true,
      proposalCount: 315,
      activeProposals: 3,
      treasuryUsd: '$4.20B USD',
      treasuryUsdVal: 4200000000,
      marketCapUsd: '$2.15B USD',
      tokenPriceUsd: 2280.00,
      priceChange24h: 1.95,
      volume24hUsd: '$95M USD',
      governanceSummary: 'Pioneer decentralized stablecoin DAO issuing DAI & USDS backed by Real-World Assets (RWA) and crypto collaterals.',
      topProposal: 'Endgame SubDAO Reorganization: Spark Protocol Treasury Expansion',
      votingSystem: '1 MKR = 1 Vote (Executive Spell Smart Contracts)',
      quorumPct: 'Executive Hat Weight',
      timelockDelay: '48 Hours Governance Security Module',
      leadInvestors: ['a16z Crypto', 'Polychain Capital', 'Dragonfly Capital'],
      treasuryBreakdown: [
        { name: 'RWA US Treasuries', value: 50, color: '#10B981' },
        { name: 'ETH / stETH', value: 30, color: '#00F0FF' },
        { name: 'MKR Surplus', value: 20, color: '#8B5CF6' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 2210.00 },
        { day: 'Tue', price: 2235.00 },
        { day: 'Wed', price: 2220.00 },
        { day: 'Thu', price: 2250.00 },
        { day: 'Fri', price: 2270.00 },
        { day: 'Sat', price: 2275.00 },
        { day: 'Sun', price: 2280.00 }
      ],
      fullDossier: `MakerDAO (rebranding to Sky) is the oldest decentralized financial protocol on Ethereum, backing the multi-billion dollar DAI and USDS stablecoins with Real-World Assets (RWA) like US Treasury bills.

### 1. Executive Spells & On-Chain Governance
Maker Governance operates via Governance Polls and Executive Spells. Executive Spells are executable smart contracts that modify stability fees, debt ceilings, and collateral types once enough MKR tokens are staked on the proposal.`,
      references: ['vote.makerdao.com', 'MakerBurn RWA Telemetry', 'Sky Ecosystem Docs']
    },
    {
      id: 'dao-6',
      name: 'Lido DAO',
      symbol: 'LDO',
      logo: '💧',
      category: 'Staking',
      hasDao: true,
      proposalCount: 185,
      activeProposals: 1,
      treasuryUsd: '$840M USD',
      treasuryUsdVal: 840000000,
      marketCapUsd: '$1.45B USD',
      tokenPriceUsd: 1.62,
      priceChange24h: 4.10,
      volume24hUsd: '$85M USD',
      governanceSummary: 'Liquid staking protocol DAO managing stETH node operator sets, Distributed Validator Technology (DVT), and protocol fee distribution.',
      topProposal: 'LIP-22: Node Operator Module V2 Expansion & DVT Integration',
      votingSystem: '1 LDO = 1 Vote (Dual Governance Mechanism in Progress)',
      quorumPct: '50M LDO (5%)',
      timelockDelay: '72 Hours Timelock',
      leadInvestors: ['Paradigm', 'a16z Crypto', 'Coinbase Ventures', 'Jump Crypto'],
      treasuryBreakdown: [
        { name: 'LDO Token', value: 75, color: '#00F0FF' },
        { name: 'ETH / stETH', value: 20, color: '#38BDF8' },
        { name: 'DAI Reserves', value: 5, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 1.52 },
        { day: 'Tue', price: 1.55 },
        { day: 'Wed', price: 1.54 },
        { day: 'Thu', price: 1.58 },
        { day: 'Fri', price: 1.60 },
        { day: 'Sat', price: 1.61 },
        { day: 'Sun', price: 1.62 }
      ],
      fullDossier: `Lido DAO oversees the largest liquid staking protocol on Ethereum, managing stETH assets representing over 28% of all staked ETH.

### 1. Dual Governance Architecture
To prevent LDO holders from acting maliciously against stETH stakers, Lido is implementing Dual Governance. This empowers stETH holders to veto LDO proposals or trigger a graceful exit mode if a proposal compromises Ethereum protocol neutrality.`,
      references: ['research.lido.fi', 'Lido Governance Forum', 'stETH Peg Tracker']
    },
    {
      id: 'dao-7',
      name: 'Curve DAO',
      symbol: 'CRV',
      logo: '🌈',
      category: 'DeFi',
      hasDao: true,
      proposalCount: 245,
      activeProposals: 4,
      treasuryUsd: '$680M USD',
      treasuryUsdVal: 680000000,
      marketCapUsd: '$410M USD',
      tokenPriceUsd: 0.32,
      priceChange24h: 3.45,
      volume24hUsd: '$65M USD',
      governanceSummary: 'veCRV gauge weight voting DAO directing liquidity emissions across Curve pools and crvUSD debt markets.',
      topProposal: 'Gauge Vote: sUSDe/crvUSD Pool Gauge Approval for Liquidity Incentives',
      votingSystem: 'veCRV Vote-Locking (Up to 4-Year Lock for Max Power)',
      quorumPct: '30% veCRV Quorum',
      timelockDelay: '7 Days Gauge Timelock',
      leadInvestors: ['Founders Fund', 'Framework Ventures', 'ParaFi Capital'],
      treasuryBreakdown: [
        { name: 'CRV Token', value: 65, color: '#8B5CF6' },
        { name: 'crvUSD Stablecoin', value: 25, color: '#10B981' },
        { name: 'ETH Pool LP', value: 10, color: '#00F0FF' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 0.29 },
        { day: 'Tue', price: 0.30 },
        { day: 'Wed', price: 0.30 },
        { day: 'Thu', price: 0.31 },
        { day: 'Fri', price: 0.31 },
        { day: 'Sat', price: 0.32 },
        { day: 'Sun', price: 0.32 }
      ],
      fullDossier: `Curve DAO created the famous ve-tokenomics (vote-escrowed tokenomics) standard. Users lock CRV tokens for up to 4 years to receive veCRV, granting them voting power over weekly inflation emissions.`,
      references: ['dao.curve.fi', 'Curve Monitor Telemetry', 'veCRV Gauge Weights']
    },
    {
      id: 'dao-8',
      name: 'Compound Governance',
      symbol: 'COMP',
      logo: '🟢',
      category: 'DeFi',
      hasDao: true,
      proposalCount: 165,
      activeProposals: 2,
      treasuryUsd: '$450M USD',
      treasuryUsdVal: 450000000,
      marketCapUsd: '$390M USD',
      tokenPriceUsd: 48.20,
      priceChange24h: 1.85,
      volume24hUsd: '$42M USD',
      governanceSummary: 'Autonomous interest rate protocol governance managing Compound v3 Comet markets and collateral risk bounds.',
      topProposal: 'Proposal 244: Supply Cap Adjustments for Arbitrum USDC Comet Market',
      votingSystem: '1 COMP = 1 Vote (25,000 COMP Delegation Threshold)',
      quorumPct: '400,000 COMP (4%)',
      timelockDelay: '48 Hours Timelock',
      leadInvestors: ['a16z Crypto', 'Bain Capital Crypto', 'Polychain Capital', 'Paradigm'],
      treasuryBreakdown: [
        { name: 'COMP Token', value: 70, color: '#10B981' },
        { name: 'USDC Reserves', value: 20, color: '#00F0FF' },
        { name: 'ETH Reserves', value: 10, color: '#8B5CF6' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 46.50 },
        { day: 'Tue', price: 47.10 },
        { day: 'Wed', price: 46.80 },
        { day: 'Thu', price: 47.60 },
        { day: 'Fri', price: 48.00 },
        { day: 'Sat', price: 48.10 },
        { day: 'Sun', price: 48.20 }
      ],
      fullDossier: `Compound Governance was the pioneer of decentralized token governance on Ethereum in 2020. It manages Compound v3 Comet markets across Ethereum, Arbitrum, Base, and Polygon.`,
      references: ['compound.finance/governance', 'Compound Bravo Smart Contracts']
    },
    {
      id: 'dao-9',
      name: 'ENS DAO',
      symbol: 'ENS',
      logo: '🌐',
      category: 'Identity',
      hasDao: true,
      proposalCount: 82,
      activeProposals: 2,
      treasuryUsd: '$320M USD',
      treasuryUsdVal: 320000000,
      marketCapUsd: '$540M USD',
      tokenPriceUsd: 17.15,
      priceChange24h: 6.20,
      volume24hUsd: '$75M USD',
      governanceSummary: 'Ethereum Name Service DAO governing .eth domain registrar fees, Namechain Layer-2 development, and Web3 identity standards.',
      topProposal: 'EP-4.2: Funding ENS Ecosystem Working Group Q3/Q4 Development',
      votingSystem: '1 ENS = 1 Vote (Working Group Stewards)',
      quorumPct: '1M ENS (1%)',
      timelockDelay: '7 Days Timelock',
      leadInvestors: ['Ethereum Foundation', 'Paradigm', 'Coinbase Ventures'],
      treasuryBreakdown: [
        { name: 'ETH Revenue', value: 45, color: '#00F0FF' },
        { name: 'ENS Token', value: 40, color: '#8B5CF6' },
        { name: 'USDC Reserves', value: 15, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 15.80 },
        { day: 'Tue', price: 16.10 },
        { day: 'Wed', price: 16.00 },
        { day: 'Thu', price: 16.50 },
        { day: 'Fri', price: 16.80 },
        { day: 'Sat', price: 17.00 },
        { day: 'Sun', price: 17.15 }
      ],
      fullDossier: `ENS DAO controls the primary naming infrastructure of Web3. The treasury receives continuous ETH protocol revenue from domain registrations and renewals.`,
      references: ['ens.domains', 'ensgrants.xyz', 'Tally ENS DAO']
    },
    {
      id: 'dao-10',
      name: 'Gitcoin DAO',
      symbol: 'GTC',
      logo: '🌱',
      category: 'Public Goods',
      hasDao: true,
      proposalCount: 68,
      activeProposals: 1,
      treasuryUsd: '$95M USD',
      treasuryUsdVal: 95000000,
      marketCapUsd: '$78M USD',
      tokenPriceUsd: 1.15,
      priceChange24h: 2.10,
      volume24hUsd: '$18M USD',
      governanceSummary: 'Public goods funding DAO governing Gitcoin Passport, Quadratic Funding rounds, and Allo Protocol grants.',
      topProposal: 'GCP-18: Gitcoin Grants Round 22 Quadratic Matching Fund Allocation',
      votingSystem: '1 GTC = 1 Vote (Quadratic Voting Integration)',
      quorumPct: '2.5% Quorum',
      timelockDelay: '5 Days Timelock',
      leadInvestors: ['1kx', 'Electric Capital', 'Balaji Srinivasan'],
      treasuryBreakdown: [
        { name: 'GTC Token', value: 70, color: '#10B981' },
        { name: 'ETH Reserves', value: 20, color: '#00F0FF' },
        { name: 'USDC Reserves', value: 10, color: '#8B5CF6' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 1.10 },
        { day: 'Tue', price: 1.12 },
        { day: 'Wed', price: 1.11 },
        { day: 'Thu', price: 1.13 },
        { day: 'Fri', price: 1.14 },
        { day: 'Sat', price: 1.15 },
        { day: 'Sun', price: 1.15 }
      ],
      fullDossier: `Gitcoin DAO is the world premier decentralized public goods funding organization, pioneering Quadratic Funding (QF) algorithms to allocate millions in grants to open-source software projects.`,
      references: ['gitcoin.co/governance', 'Allo Protocol Whitepaper']
    },
    {
      id: 'dao-11',
      name: 'Synthetix DAO',
      symbol: 'SNX',
      logo: '⚔️',
      category: 'Derivatives',
      hasDao: true,
      proposalCount: 135,
      activeProposals: 2,
      treasuryUsd: '$290M USD',
      treasuryUsdVal: 290000000,
      marketCapUsd: '$520M USD',
      tokenPriceUsd: 1.75,
      priceChange24h: 3.80,
      volume24hUsd: '$38M USD',
      governanceSummary: 'Spartan Council governance governing Synthetix v3 perpetual futures, liquidity pools, and collateralized synths.',
      topProposal: 'SIP-312: Enable SOL-PERP Trading on Base Perps V3 Pool',
      votingSystem: 'Spartan Council 8-Member Elected Body (NFT Council Badges)',
      quorumPct: 'Council Majority (5/8)',
      timelockDelay: '24 Hours Timelock',
      leadInvestors: ['Framework Ventures', 'Three Arrows Capital', 'ParaFi Capital'],
      treasuryBreakdown: [
        { name: 'SNX Token', value: 80, color: '#00F0FF' },
        { name: 'USDC Fee Pool', value: 20, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 1.64 },
        { day: 'Tue', price: 1.68 },
        { day: 'Wed', price: 1.67 },
        { day: 'Thu', price: 1.71 },
        { day: 'Fri', price: 1.73 },
        { day: 'Sat', price: 1.74 },
        { day: 'Sun', price: 1.75 }
      ],
      fullDossier: `Synthetix utilizes an elected representative council model called the Spartan Council. Rather than voting directly on every technical parameter, SNX holders elect 8 council members using quadratic voting.`,
      references: ['governance.synthetix.io', 'Synthetix v3 Documentation']
    },
    {
      id: 'dao-12',
      name: 'dYdX DAO',
      symbol: 'DYDX',
      logo: '📉',
      category: 'Derivatives',
      hasDao: true,
      proposalCount: 92,
      activeProposals: 3,
      treasuryUsd: '$520M USD',
      treasuryUsdVal: 520000000,
      marketCapUsd: '$710M USD',
      tokenPriceUsd: 1.25,
      priceChange24h: 4.50,
      volume24hUsd: '$120M USD',
      governanceSummary: 'dYdX Chain cosmos-sdk governance managing orderbook fee revenue, staking rewards, and validator parameters.',
      topProposal: 'DIP-34: Reduce Maker Rebates & Increase Staking Yield Share to 100%',
      votingSystem: '1 DYDX = 1 Vote (On-Chain Cosmos SDK Governance)',
      quorumPct: '33.4% Staked DYDX',
      timelockDelay: '4 Days Voting Period',
      leadInvestors: ['a16z Crypto', 'Paradigm', 'Polychain Capital', 'Dragonfly Capital'],
      treasuryBreakdown: [
        { name: 'DYDX Token', value: 75, color: '#8B5CF6' },
        { name: 'USDC Protocol Fees', value: 25, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 1.16 },
        { day: 'Tue', price: 1.19 },
        { day: 'Wed', price: 1.18 },
        { day: 'Thu', price: 1.21 },
        { day: 'Fri', price: 1.23 },
        { day: 'Sat', price: 1.24 },
        { day: 'Sun', price: 1.25 }
      ],
      fullDossier: `dYdX DAO governs the dYdX Chain, a standalone Cosmos-SDK layer-1 blockchain built specifically for high-throughput orderbook perpetual trading where 100% of net trading fees are distributed to DYDX stakers.`,
      references: ['dydx.community', 'dYdX Chain Telemetry']
    },
    {
      id: 'dao-13',
      name: 'GnosisDAO',
      symbol: 'GNO',
      logo: '🦉',
      category: 'Infrastructure',
      hasDao: true,
      proposalCount: 98,
      activeProposals: 2,
      treasuryUsd: '$710M USD',
      treasuryUsdVal: 710000000,
      marketCapUsd: '$840M USD',
      tokenPriceUsd: 295.00,
      priceChange24h: 2.30,
      volume24hUsd: '$28M USD',
      governanceSummary: 'Gnosis Chain ecosystem DAO managing Gnosis Safe multisig treasury, CoW Swap protocol, and Gnosis Pay visa card integration.',
      topProposal: 'GIP-98: Gnosis Chain Validator Incentive Adjustment & Gnosis Pay Expansion',
      votingSystem: 'GNO Token Voting (Snapshot + SafeSnap Execution)',
      quorumPct: '75,000 GNO (3%)',
      timelockDelay: '7 Days SafeSnap Timelock',
      leadInvestors: ['ConsenSys', '1kx', 'Dragonfly Capital'],
      treasuryBreakdown: [
        { name: 'GNO Token', value: 55, color: '#00F0FF' },
        { name: 'ETH / stETH', value: 30, color: '#8B5CF6' },
        { name: 'COW / Safe Tokens', value: 15, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 285.00 },
        { day: 'Tue', price: 288.00 },
        { day: 'Wed', price: 287.00 },
        { day: 'Thu', price: 290.00 },
        { day: 'Fri', price: 293.00 },
        { day: 'Sat', price: 294.00 },
        { day: 'Sun', price: 295.00 }
      ],
      fullDossier: `GnosisDAO governs Gnosis Chain and holds massive capital reserves in Gnosis Safe, CoW Swap, and Gnosis Pay. It is one of the most profitable and capital-rich DAOs in Ethereum history.`,
      references: ['forum.gnosis.io', 'GnosisDAO SafeSnap Portal']
    },
    {
      id: 'dao-14',
      name: 'Balancer DAO',
      symbol: 'BAL',
      logo: '⚖️',
      category: 'DeFi',
      hasDao: true,
      proposalCount: 115,
      activeProposals: 1,
      treasuryUsd: '$180M USD',
      treasuryUsdVal: 180000000,
      marketCapUsd: '$145M USD',
      tokenPriceUsd: 2.45,
      priceChange24h: 1.50,
      volume24hUsd: '$16M USD',
      governanceSummary: 'Programmable liquidity pool governance managing veBAL gauges, custom AMM pools, and v3 vault architecture.',
      topProposal: 'BIP-420: Balancer v3 Core Pool Fee Redistribution Specification',
      votingSystem: 'veBAL Vote-Escrowed Staking (80/20 BAL/WETH BPT Lock)',
      quorumPct: '10% veBAL Quorum',
      timelockDelay: '5 Days Gauge Timelock',
      leadInvestors: ['Placeholder VC', 'Pantera Capital', 'Almeda Research (Exited)'],
      treasuryBreakdown: [
        { name: 'BAL Token', value: 70, color: '#00F0FF' },
        { name: 'WETH / USDC Pool BPT', value: 30, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 2.38 },
        { day: 'Tue', price: 2.40 },
        { day: 'Wed', price: 2.39 },
        { day: 'Thu', price: 2.42 },
        { day: 'Fri', price: 2.44 },
        { day: 'Sat', price: 2.44 },
        { day: 'Sun', price: 2.45 }
      ],
      fullDossier: `Balancer DAO uses an 80/20 BAL/WETH BPT token for veBAL vote-escrow locking, creating deep liquidity for the native token while granting long-term holders gauge voting control.`,
      references: ['forum.balancer.fi', 'Balancer v3 Docs']
    },
    {
      id: 'dao-15',
      name: 'Render Network DAO',
      symbol: 'RENDER',
      logo: '🎨',
      category: 'AI & Compute',
      hasDao: true,
      proposalCount: 45,
      activeProposals: 1,
      treasuryUsd: '$190M USD',
      treasuryUsdVal: 190000000,
      marketCapUsd: '$2.35B USD',
      tokenPriceUsd: 5.85,
      priceChange24h: 7.40,
      volume24hUsd: '$240M USD',
      governanceSummary: 'Decentralized GPU rendering network governance for AI compute and 3D rendering nodes on Solana.',
      topProposal: 'RNP-011: Solana Burn-and-Mint Equilibrium Ratio Revision for AI Compute',
      votingSystem: '1 RENDER = 1 Vote (RNP Framework)',
      quorumPct: '2.5M RENDER',
      timelockDelay: '3 Days Execution Window',
      leadInvestors: ['Multicoin Capital', 'Solana Ventures', 'Kenetic Capital'],
      treasuryBreakdown: [
        { name: 'RENDER Token', value: 85, color: '#F43F5E' },
        { name: 'SOL / USDC', value: 15, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 5.25 },
        { day: 'Tue', price: 5.40 },
        { day: 'Wed', price: 5.35 },
        { day: 'Thu', price: 5.60 },
        { day: 'Fri', price: 5.72 },
        { day: 'Sat', price: 5.80 },
        { day: 'Sun', price: 5.85 }
      ],
      fullDossier: `Render Network DAO governs the premier decentralized GPU compute network for AI model training and 3D graphics, migrating from Ethereum to Solana to handle high-frequency GPU node micropayments.`,
      references: ['renderfoundation.com', 'RNP Governance Proposals']
    },
    {
      id: 'dao-16',
      name: 'Decentraland DAO',
      symbol: 'MANA',
      logo: '🏙️',
      category: 'Metaverse',
      hasDao: true,
      proposalCount: 158,
      activeProposals: 1,
      treasuryUsd: '$210M USD',
      treasuryUsdVal: 210000000,
      marketCapUsd: '$580M USD',
      tokenPriceUsd: 0.31,
      priceChange24h: 1.20,
      volume24hUsd: '$32M USD',
      governanceSummary: 'Virtual metaverse DAO governing LAND smart contracts, wearables, and community Grants Program.',
      topProposal: 'DAO-402: World Engine Server Capacity Extension & SDK 7 Upgrade',
      votingSystem: '1 MANA = 1 VP • 1 LAND = 2,000 VP',
      quorumPct: '6M VP Quorum',
      timelockDelay: '24 Hours Advisory Delay',
      leadInvestors: ['Digital Currency Group (DCG)', 'Animoca Brands', 'CoinFund'],
      treasuryBreakdown: [
        { name: 'MANA Token', value: 70, color: '#8B5CF6' },
        { name: 'LAND Registry', value: 20, color: '#00F0FF' },
        { name: 'DAI Grants', value: 10, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 0.30 },
        { day: 'Tue', price: 0.30 },
        { day: 'Wed', price: 0.30 },
        { day: 'Thu', price: 0.31 },
        { day: 'Fri', price: 0.31 },
        { day: 'Sat', price: 0.31 },
        { day: 'Sun', price: 0.31 }
      ],
      fullDossier: `Decentraland DAO controls the LAND smart contracts, Estate smart contracts, Wearables, and the SAB (Security Advisory Board) for the virtual world platform.`,
      references: ['dao.decentraland.org', 'Decentraland Governance Forum']
    },
    {
      id: 'dao-17',
      name: 'ApeCoin DAO',
      symbol: 'APE',
      logo: '🦍',
      category: 'Metaverse',
      hasDao: true,
      proposalCount: 110,
      activeProposals: 2,
      treasuryUsd: '$380M USD',
      treasuryUsdVal: 380000000,
      marketCapUsd: '$480M USD',
      tokenPriceUsd: 0.72,
      priceChange24h: 2.40,
      volume24hUsd: '$45M USD',
      governanceSummary: 'ApeCoin community governance for Otherside metaverse grants and ApeChain rollup L2 ecosystem.',
      topProposal: 'AIP-412: ApeChain Developer Incentive Fund Allocation Strategy',
      votingSystem: '1 APE = 1 Vote (Special Council Moderation)',
      quorumPct: 'None (Simple Majority of APE Staked)',
      timelockDelay: '48 Hours Timelock',
      leadInvestors: ['Yuga Labs', 'a16z Crypto', 'Animoca Brands', 'Sound Ventures'],
      treasuryBreakdown: [
        { name: 'APE Token', value: 80, color: '#00F0FF' },
        { name: 'USDC Reserves', value: 20, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 0.68 },
        { day: 'Tue', price: 0.69 },
        { day: 'Wed', price: 0.69 },
        { day: 'Thu', price: 0.70 },
        { day: 'Fri', price: 0.71 },
        { day: 'Sat', price: 0.72 },
        { day: 'Sun', price: 0.72 }
      ],
      fullDossier: `ApeCoin DAO is the governance ecosystem backing Yuga Labs Otherside metaverse and the new ApeChain Arbitrum Orbit Layer-2 chain.`,
      references: ['forum.apecoin.com', 'ApeChain Network Hub']
    },
    {
      id: 'dao-18',
      name: 'Convex Finance DAO',
      symbol: 'CVX',
      logo: '🔒',
      category: 'DeFi',
      hasDao: true,
      proposalCount: 78,
      activeProposals: 2,
      treasuryUsd: '$310M USD',
      treasuryUsdVal: 310000000,
      marketCapUsd: '$230M USD',
      tokenPriceUsd: 2.35,
      priceChange24h: 3.10,
      volume24hUsd: '$22M USD',
      governanceSummary: 'vlCVX governance controlling Curve & Frax gauge voting rights and yield boost optimization.',
      topProposal: 'CVP-88: Convex Fraximal Vault Gauge Allocation Adjustment',
      votingSystem: 'vlCVX Vote-Locking (16-Week Lock Cycle)',
      quorumPct: '30% vlCVX Quorum',
      timelockDelay: '7 Days Gauge Execution',
      leadInvestors: ['DeFi Alliance', 'Yield Cartel'],
      treasuryBreakdown: [
        { name: 'veCRV Control', value: 60, color: '#8B5CF6' },
        { name: 'CVX Token', value: 30, color: '#00F0FF' },
        { name: 'USDC Reserves', value: 10, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 2.24 },
        { day: 'Tue', price: 2.28 },
        { day: 'Wed', price: 2.26 },
        { day: 'Thu', price: 2.30 },
        { day: 'Fri', price: 2.33 },
        { day: 'Sat', price: 2.34 },
        { day: 'Sun', price: 2.35 }
      ],
      fullDossier: `Convex Finance controls massive blocks of veCRV and veFXS voting power, allowing vlCVX stakers to sell vote incentives (bribes) on Votium to maximize yield.`,
      references: ['convexfinance.com', 'Votium Incentive Market']
    },
    {
      id: 'dao-19',
      name: 'Stargate DAO',
      symbol: 'STG',
      logo: '🌌',
      category: 'Cross-Chain',
      hasDao: true,
      proposalCount: 56,
      activeProposals: 2,
      treasuryUsd: '$140M USD',
      treasuryUsdVal: 140000000,
      marketCapUsd: '$85M USD',
      tokenPriceUsd: 0.38,
      priceChange24h: 1.90,
      volume24hUsd: '$19M USD',
      governanceSummary: 'LayerZero cross-chain liquidity bridge DAO governing veSTG voting and bridge transaction fees.',
      topProposal: 'SIP-28: Stargate v2 Multi-Chain Pool Expansion & Bus Pricing Model',
      votingSystem: 'veSTG Lockup Voting (Up to 3-Year Lock)',
      quorumPct: '1.5M veSTG',
      timelockDelay: '48 Hours Execution Window',
      leadInvestors: ['LayerZero Labs', 'a16z Crypto', 'Sequoia Capital'],
      treasuryBreakdown: [
        { name: 'STG Token', value: 75, color: '#00F0FF' },
        { name: 'USDC Bridge LP', value: 25, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 0.36 },
        { day: 'Tue', price: 0.37 },
        { day: 'Wed', price: 0.37 },
        { day: 'Thu', price: 0.38 },
        { day: 'Fri', price: 0.38 },
        { day: 'Sat', price: 0.38 },
        { day: 'Sun', price: 0.38 }
      ],
      fullDossier: `Stargate DAO governs the LayerZero-powered Stargate cross-chain bridge, directing native asset transfers across 12+ blockchains.`,
      references: ['stargate.finance', 'LayerZero Governance Docs']
    },
    {
      id: 'dao-20',
      name: 'Fetch.ai / ASI Alliance',
      symbol: 'FET',
      logo: '🤖',
      category: 'AI & Compute',
      hasDao: true,
      proposalCount: 40,
      activeProposals: 1,
      treasuryUsd: '$260M USD',
      treasuryUsdVal: 260000000,
      marketCapUsd: '$3.40B USD',
      tokenPriceUsd: 1.35,
      priceChange24h: 8.90,
      volume24hUsd: '$310M USD',
      governanceSummary: 'Artificial Superintelligence Alliance governance overseeing autonomous AI agent networks and compute registries.',
      topProposal: 'ASI-01: Token Merger Finalization & Autonomous AI Agent Registry Launch',
      votingSystem: '1 FET = 1 Vote (Cosmos SDK Governance)',
      quorumPct: '40% Staked FET',
      timelockDelay: '14 Days Voting Window',
      leadInvestors: ['Outlier Ventures', 'DWF Labs', 'Blockseed Ventures'],
      treasuryBreakdown: [
        { name: 'FET Token', value: 85, color: '#8B5CF6' },
        { name: 'USDT / USDC', value: 15, color: '#10B981' }
      ],
      marketTrendData: [
        { day: 'Mon', price: 1.18 },
        { day: 'Tue', price: 1.22 },
        { day: 'Wed', price: 1.20 },
        { day: 'Thu', price: 1.26 },
        { day: 'Fri', price: 1.30 },
        { day: 'Sat', price: 1.33 },
        { day: 'Sun', price: 1.35 }
      ],
      fullDossier: `The Artificial Superintelligence (ASI) Alliance merges Fetch.ai, SingularityNET, and Ocean Protocol to create an open-source decentralized AI alternative to Big Tech.`,
      references: ['fetch.ai', 'ASI Alliance Superintelligence Paper']
    }
  ];

  const categories = ['All', 'DeFi', 'Layer 2', 'Stablecoins', 'Staking', 'Identity', 'AI & Compute', 'Metaverse', 'Public Goods'];

  const filteredProjects = daoProjects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center">
              <Vote className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white tracking-tight">DAO & Governance Intelligence</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                  {daoProjects.length} Popular DAOs Audited
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Live market trends, treasury asset allocations, voting quorums, and venture funding for top Web3 DAOs.
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 20+ DAOs (e.g. UNI, Aave, ARB)..."
              className="w-full bg-dark-900 border border-dark-border rounded-2xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/50 font-mono"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-dark-border/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-cyan text-dark-900 font-bold shadow-glow-cyan/20'
                  : 'bg-dark-800 text-slate-400 hover:text-white border border-dark-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* DAO Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-dark-border space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Matching DAOs Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-mono">
            No active DAO matching "{searchQuery}" in category "{selectedCategory}". Try clearing your search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((dao) => (
            <div
              key={dao.id}
              onClick={() => setActiveDaoDossier(dao)}
              className="p-5 rounded-2xl bg-dark-800/80 border border-dark-border hover:border-brand-cyan/40 transition-all space-y-4 flex flex-col justify-between cursor-pointer group hover:bg-dark-800"
            >
              {/* Top Row: Symbol, Logo, Active Proposals, Price Trend */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{dao.logo}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-white text-base group-hover:text-brand-cyan transition-colors">{dao.name}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-700 text-brand-cyan font-bold">
                        {dao.symbol}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {dao.category} • Market Cap: <strong className="text-white">{dao.marketCapUsd}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 block mb-1">
                    {dao.activeProposals} Active Proposals
                  </span>
                  <span className={`text-[11px] font-bold font-mono ${
                    dao.priceChange24h >= 0 ? 'text-brand-green' : 'text-brand-danger'
                  }`}>
                    ${dao.tokenPriceUsd.toFixed(2)} ({dao.priceChange24h >= 0 ? `+${dao.priceChange24h}%` : `${dao.priceChange24h}%`})
                  </span>
                </div>
              </div>

              {/* 7-Day Price & Treasury Trend Mini Sparkline Chart */}
              <div className="bg-dark-900/90 p-3 rounded-2xl border border-dark-border flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">Treasury Holdings:</span>
                  <span className="text-sm font-extrabold text-brand-cyan font-mono">{dao.treasuryUsd}</span>
                </div>
                <div className="h-10 w-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dao.marketTrendData}>
                      <defs>
                        <linearGradient id={`grad-${dao.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={dao.priceChange24h >= 0 ? '#10B981' : '#F43F5E'} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={dao.priceChange24h >= 0 ? '#10B981' : '#F43F5E'} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={dao.priceChange24h >= 0 ? '#10B981' : '#F43F5E'}
                        strokeWidth={1.5}
                        fill={`url(#grad-${dao.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary & Top Active Proposal */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {dao.governanceSummary}
              </p>

              <div className="p-2.5 rounded-xl bg-dark-900/90 border border-dark-border text-xs text-slate-300 font-mono">
                <span className="text-[10px] text-brand-cyan font-bold block">Top Active Proposal:</span>
                <span className="truncate block text-slate-200">{dao.topProposal}</span>
              </div>

              {/* Lead VC Investors / Funding Partners */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-dark-border/60">
                <span className="truncate">VC Backing: <strong className="text-slate-200">{dao.leadInvestors.slice(0, 2).join(', ')}</strong></span>
                <span className="text-brand-cyan font-bold group-hover:underline flex items-center gap-1 shrink-0">
                  Inspect DAO Dossier ➔
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comprehensive DAO Governance & Funding Dossier Modal */}
      {activeDaoDossier && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="glass-card rounded-3xl p-8 border border-dark-border max-w-4xl w-full space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveDaoDossier(null)}
              className="absolute right-6 top-6 p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white border border-dark-border"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{activeDaoDossier.logo}</span>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-black text-white tracking-tight">{activeDaoDossier.name}</h2>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold border border-brand-cyan/30">
                    {activeDaoDossier.symbol}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Category: {activeDaoDossier.category} • Total Proposals: {activeDaoDossier.proposalCount} • Active: {activeDaoDossier.activeProposals}
                </p>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
              <div className="p-3 bg-dark-900 rounded-2xl border border-dark-border">
                <span className="text-[10px] text-slate-400 block">Treasury Balance</span>
                <span className="text-sm font-extrabold text-brand-cyan">{activeDaoDossier.treasuryUsd}</span>
              </div>
              <div className="p-3 bg-dark-900 rounded-2xl border border-dark-border">
                <span className="text-[10px] text-slate-400 block">Market Valuation</span>
                <span className="text-sm font-extrabold text-white">{activeDaoDossier.marketCapUsd}</span>
              </div>
              <div className="p-3 bg-dark-900 rounded-2xl border border-dark-border">
                <span className="text-[10px] text-slate-400 block">Token Price (24h)</span>
                <span className={`text-sm font-extrabold ${activeDaoDossier.priceChange24h >= 0 ? 'text-brand-green' : 'text-brand-danger'}`}>
                  ${activeDaoDossier.tokenPriceUsd.toFixed(2)} ({activeDaoDossier.priceChange24h > 0 ? `+${activeDaoDossier.priceChange24h}` : activeDaoDossier.priceChange24h}%)
                </span>
              </div>
              <div className="p-3 bg-dark-900 rounded-2xl border border-dark-border">
                <span className="text-[10px] text-slate-400 block">Voting System</span>
                <span className="text-[11px] font-bold text-slate-200 truncate block">{activeDaoDossier.votingSystem}</span>
              </div>
            </div>

            {/* Charts Section: 7-Day Trend Chart + Treasury Asset Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 7-Day Market Trend Chart */}
              <div className="p-4 bg-dark-900/90 rounded-2xl border border-dark-border space-y-2">
                <span className="text-xs font-bold text-brand-cyan flex items-center gap-1.5 font-mono">
                  <BarChart2 className="w-4 h-4" /> 7-Day Market Price Trend ($ USD)
                </span>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeDaoDossier.marketTrendData}>
                      <defs>
                        <linearGradient id="dossierGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" stroke="#64748B" fontSize={10} />
                      <YAxis stroke="#64748B" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B0E14', borderColor: '#1F283A', fontSize: '11px' }} />
                      <Area type="monotone" dataKey="price" stroke="#00F0FF" strokeWidth={2} fill="url(#dossierGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Treasury Asset Allocation Breakdown */}
              <div className="p-4 bg-dark-900/90 rounded-2xl border border-dark-border space-y-2">
                <span className="text-xs font-bold text-brand-green flex items-center gap-1.5 font-mono">
                  <PieIcon className="w-4 h-4" /> Treasury Asset Distribution
                </span>
                <div className="flex items-center space-x-4 h-40">
                  <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={activeDaoDossier.treasuryBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          dataKey="value"
                        >
                          {activeDaoDossier.treasuryBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-1.5 font-mono text-[11px]">
                    {activeDaoDossier.treasuryBreakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-slate-300">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </span>
                        <span className="font-bold text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* VC Backing & Governance Thresholds */}
            <div className="p-4 bg-dark-900 rounded-2xl border border-dark-border space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Lead VC Investors & Funding Partners:</span>
                <span className="font-bold text-brand-cyan">{activeDaoDossier.leadInvestors.join(' • ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Governance Quorum & Timelock:</span>
                <span className="font-bold text-slate-200">{activeDaoDossier.quorumPct} • {activeDaoDossier.timelockDelay}</span>
              </div>
            </div>

            {/* Deep Article Dossier Content */}
            <div className="text-xs leading-relaxed text-slate-200 space-y-4 font-sans whitespace-pre-line border-t border-b border-dark-border/80 py-4">
              {activeDaoDossier.fullDossier}
            </div>

            {/* Verified References */}
            <div className="space-y-2 font-mono text-xs">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider">
                📚 Verified Snapshot & On-Chain Governance Portals:
              </h4>
              <ul className="space-y-1 text-brand-cyan">
                {activeDaoDossier.references.map((ref, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 hover:underline cursor-pointer">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
