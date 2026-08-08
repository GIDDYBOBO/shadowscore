import type { WalletProfile } from '../types/reputation';

export const DEFAULT_WALLET_ADDRESS = '0x99281313437194819741094812389148149831AA';

export const MOCK_WALLETS: Record<string, WalletProfile> = {
  '0x99281313437194819741094812389148149831AA': {
    address: '0x99281313437194819741094812389148149831AA',
    ensName: undefined,
    network: 'Ethereum',
    walletAge: '14 days',
    firstActivity: 'Jul 09, 2026',
    status: 'High Risk',
    lastUpdated: '5 mins ago',
    score: 34,
    grade: 'F',
    riskLevel: 'High',
    riskStatusText: 'Phishing Risk',
    percentile: 'Bottom 12%',
    totalTransactions: 19,
    totalTokens: 6,
    totalNfts: 0,
    portfolioValueUsd: 0.26,
    executiveSummary: 'High probability malicious/disposable wallet pattern detected. Receives micro-funds from mixers and mass-approves unverified drainer scripts.',
    healthFactor: 1.2,
    collateralRatioPct: 32,
    riskFactors: [
      { id: '1', label: 'Interacted with flagged phishing drainers', positive: false },
      { id: '2', label: 'Rapid wallet creation pattern', positive: false },
      { id: '3', label: 'Zero verifiable off-chain credentials', positive: false }
    ],
    breakdown: [
      { category: 'Transaction History', score: 30, color: '#F43F5E' },
      { category: 'DeFi Activity', score: 25, color: '#F59E0B' },
      { category: 'Security & Risk', score: 18, color: '#EF4444' },
      { category: 'NFT & Social', score: 10, color: '#8B5CF6' }
    ],
    reputationHistory: [
      { date: "May '26", score: 60 },
      { date: "Jun '26", score: 42 },
      { date: "Jul '26", score: 34 }
    ],
    portfolioHistory: [
      { date: 'T1', valueUsd: 0.12 },
      { date: 'T2', valueUsd: 0.15 },
      { date: 'T3', valueUsd: 0.18 },
      { date: 'T4', valueUsd: 0.22 },
      { date: 'Now', valueUsd: 0.26 }
    ],
    transactions: [
      {
        id: 'tx-sample-1',
        hash: '0x9928...31AA',
        type: 'Contract Approval',
        timestamp: '5 mins ago',
        counterparty: 'VaultX Yield (Unverified Proxy)',
        value: 'Unlimited USDC',
        status: 'Flagged',
        riskScore: 88,
        aiNote: '⚠️ Flagged by Shadow AI: Unlimited token allowance to newly deployed unverified proxy contract.'
      },
      {
        id: 'tx-sample-2',
        hash: '0x4c12...88aa',
        type: 'Transfer',
        timestamp: '1 hour ago',
        counterparty: 'Tornado Cash Mixer',
        value: '0.05 ETH ($97)',
        status: 'Flagged',
        riskScore: 92,
        aiNote: '⚠️ Direct inbound transfer from privacy mixer contract.'
      }
    ],
    approvals: [
      {
        id: 'app-sample-1',
        token: 'USDC Token',
        symbol: 'USDC',
        spender: '0x3910...4a90',
        spenderName: 'VaultX Yield (Unverified)',
        allowance: 'Unlimited',
        riskLevel: 'High',
        reason: 'Unlimited approval on unverified yield contract deployed 48h ago.',
        state: 'Active',
        isRevoked: false
      }
    ],
    connectedDApps: [
      {
        id: 'dapp-sample-1',
        name: 'VaultX Yield Aggregator',
        url: 'https://vaultx-unverified-yield.io',
        icon: '⚠️',
        connectedAt: '12 mins ago',
        permissions: ['eth_sign', 'personal_sign', 'eth_sendTransaction'],
        riskLevel: 'High'
      }
    ],
    timeline: [
      {
        id: 'tl-sample-1',
        date: 'Today',
        change: -26,
        title: 'Unlimited Approval Granted to Unverified Proxy',
        description: 'Approved VaultX contract to spend unlimited USDC balance.',
        category: 'Security',
        impact: 'negative'
      }
    ],
    recommendations: [
      {
        id: 'rec-sample-1',
        title: 'Revoke VaultX Unlimited USDC Approval Immediately',
        impactPoints: 25,
        actionLabel: 'Revoke Allowance',
        category: 'Security',
        completed: false
      }
    ]
  }
};
