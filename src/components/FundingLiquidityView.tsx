import React, { useState } from 'react';
import { DollarSign, Search, ExternalLink, Layers, Sparkles, Building2, TrendingUp } from 'lucide-react';
import type { FundingLiquidityItem } from '../types/reputation';

export const FundingLiquidityView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const fundingData: FundingLiquidityItem[] = [
    { id: 'f-1', name: 'Uniswap Labs', symbol: 'UNI', logo: '🦄', totalRaisedUsd: '$176M', leadInvestors: ['a16z crypto', 'Paradigm', 'Union Square Ventures'], liquidityPoolUsd: '$3.4B', backingSummary: 'Led by Andreessen Horowitz and Paradigm. World largest DEX liquidity pools.', stage: 'Series B' },
    { id: 'f-2', name: 'Arbitrum (Offchain Labs)', symbol: 'ARB', logo: '🟢', totalRaisedUsd: '$143M', leadInvestors: ['Lightspeed', 'Polychain', 'Pantera Capital'], liquidityPoolUsd: '$2.8B', backingSummary: 'Top Ethereum L2 backed by Lightspeed Venture Partners.', stage: 'Series B' },
    { id: 'f-3', name: 'Optimism (OP Labs)', symbol: 'OP', logo: '🔴', totalRaisedUsd: '$178M', leadInvestors: ['a16z crypto', 'Paradigm'], liquidityPoolUsd: '$1.9B', backingSummary: 'Co-led by Andreessen Horowitz and Paradigm for Superchain ecosystem.', stage: 'Series B' },
    { id: 'f-4', name: 'Monad Labs', symbol: 'MONAD', logo: '🟣', totalRaisedUsd: '$244M', leadInvestors: ['Paradigm', 'Dragonfly Capital', 'Electric Capital'], liquidityPoolUsd: '$850M', backingSummary: 'High-throughput parallel EVM blockchain backed by Paradigm.', stage: 'Series A' },
    { id: 'f-5', name: 'Berachain', symbol: 'BERA', logo: '🐻', totalRaisedUsd: '$142M', leadInvestors: ['Brevan Howard Digital', 'Framework Ventures', 'Polychain'], liquidityPoolUsd: '$620M', backingSummary: 'Proof-of-Liquidity Cosmos EVM L1.', stage: 'Series B' },
    { id: 'f-6', name: 'EigenLayer', symbol: 'EIGEN', logo: '🔷', totalRaisedUsd: '$170M', leadInvestors: ['a16z crypto', 'Blockchain Capital', 'Polychain'], liquidityPoolUsd: '$12.5B', backingSummary: 'Ethereum restaking primitive funded by Andreessen Horowitz.', stage: 'Series B' },
    { id: 'f-7', name: 'Farcaster (Merkle Manufactory)', symbol: 'WARPCAST', logo: '🟣', totalRaisedUsd: '$180M', leadInvestors: ['Paradigm', 'a16z crypto', 'Variant'], liquidityPoolUsd: '$140M', backingSummary: 'Decentralized social protocol valued at $1 Billion.', stage: 'Series A' },
    { id: 'f-8', name: 'Celestia', symbol: 'TIA', logo: '🌌', totalRaisedUsd: '$55M', leadInvestors: ['Bain Capital Crypto', 'Polychain Capital'], liquidityPoolUsd: '$980M', backingSummary: 'Modular data availability blockchain network.', stage: 'Series A' },
    { id: 'f-9', name: 'Aleo', symbol: 'ALEO', logo: '🔒', totalRaisedUsd: '$298M', leadInvestors: ['SoftBank Vision Fund 2', 'Kora Management', 'a16z'], liquidityPoolUsd: '$310M', backingSummary: 'Zero-knowledge privacy L1 platform.', stage: 'Series B' },
    { id: 'f-10', name: 'Starknet (StarkWare)', symbol: 'STRK', logo: '🐺', totalRaisedUsd: '$282M', leadInvestors: ['Sequoia Capital', 'Paradigm', 'Intel Capital'], liquidityPoolUsd: '$740M', backingSummary: 'STARK-based ZK-Rollup scaling platform.', stage: 'Series D' }
  ];

  const filtered = fundingData.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.leadInvestors.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Institutional Funding & DEX Liquidity Telemetry</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30">
                  VC & Liquidity Indexer
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Search venture capital backing, lead investors (a16z, Paradigm, Sequoia), total raised, and liquidity pool depth.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search funding, VC or token (a16z, Monad)..."
              className="w-full bg-dark-900 border border-dark-border rounded-2xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-green/50"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-dark-border space-y-3">
          <Building2 className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Public Venture Funding Record</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-mono">
            No institutional VC investment rounds or liquidity pool telemetry found for <strong>"{searchQuery}"</strong>. It may be a fair-launch community token or unbacked contract.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-dark-800/80 border border-dark-border hover:border-brand-green/40 transition-all space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.logo}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-dark-700 text-brand-green font-bold">
                        {item.symbol}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Stage: {item.stage}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-brand-green block font-mono">Raised: {item.totalRaisedUsd}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Liquidity: {item.liquidityPoolUsd}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.backingSummary}
              </p>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lead VC Backers:</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.leadInvestors.map((vc, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900 border border-dark-border text-white font-semibold">
                      {vc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
