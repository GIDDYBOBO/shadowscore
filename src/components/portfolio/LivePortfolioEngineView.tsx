import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Layers, 
  Gem, 
  Coins, 
  PieChart, 
  DollarSign, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { PortfolioEngineService, type PortfolioEngineTelemetry } from '../../../backend/src/services/PortfolioEngineService';

interface LivePortfolioEngineViewProps {
  walletAddress: string;
}

export const LivePortfolioEngineView: React.FC<LivePortfolioEngineViewProps> = ({ walletAddress }) => {
  const [portfolio] = useState<PortfolioEngineTelemetry>(
    PortfolioEngineService.calculatePortfolio(walletAddress)
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Net Worth & PnL Header Card */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-black text-3xl">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <h2 className="text-3xl font-black text-white tracking-tight">
                  ${portfolio.netWorthUsd.toLocaleString()} <span className="text-sm font-bold text-slate-400">USD</span>
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{portfolio.totalPnlPct}% Total PnL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Realized Gains: <strong className="text-brand-green">+${portfolio.totalRealizedPnlUsd.toLocaleString()}</strong> • Unrealized Gains: <strong className="text-brand-cyan">+${portfolio.totalUnrealizedPnlUsd.toLocaleString()}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
              <span className="text-[10px] text-slate-400 block">30D Performance</span>
              <span className="font-bold text-brand-green">+{portfolio.performance30dPct}%</span>
            </div>
            <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
              <span className="text-[10px] text-slate-400 block">Stablecoin Ratio</span>
              <span className="font-bold text-slate-300">{portfolio.stablecoinPct}%</span>
            </div>
            <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
              <span className="text-[10px] text-slate-400 block">DeFi Collateral</span>
              <span className="font-bold text-brand-purple">{portfolio.defiPct}%</span>
            </div>
          </div>
        </div>

        {/* Asset Class Allocation Bar */}
        <div className="mt-6 pt-6 border-t border-dark-border/60 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-bold">Asset Allocation Breakdown</span>
            <span className="text-slate-400">Auto-Recalculating Live</span>
          </div>

          <div className="w-full h-3 bg-dark-900 rounded-full overflow-hidden flex">
            <div className="h-full bg-brand-cyan" style={{ width: `${portfolio.tokenAllocationPct}%` }} title="Tokens" />
            <div className="h-full bg-brand-purple" style={{ width: `${portfolio.nftAllocationPct}%` }} title="NFTs" />
            <div className="h-full bg-brand-green" style={{ width: `${portfolio.defiPct}%` }} title="DeFi" />
            <div className="h-full bg-amber-400" style={{ width: `${portfolio.stablecoinPct}%` }} title="Stablecoins" />
          </div>

          <div className="flex flex-wrap gap-4 pt-1 text-[11px]">
            <span className="flex items-center gap-1.5 text-brand-cyan font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              Tokens (${portfolio.tokenAllocationUsd.toLocaleString()} / {portfolio.tokenAllocationPct}%)
            </span>
            <span className="flex items-center gap-1.5 text-brand-purple font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              NFTs (${portfolio.nftAllocationUsd.toLocaleString()} / {portfolio.nftAllocationPct}%)
            </span>
            <span className="flex items-center gap-1.5 text-brand-green font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              DeFi ({portfolio.defiPct}%)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Stablecoins ({portfolio.stablecoinPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Historical Chart & Multi-Chain Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* Historical Net Worth Recharts Area Chart */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-cyan" />
                30-Day Historical Net Worth Progression
              </h3>
              <p className="text-xs text-slate-400">Total portfolio valuation delta over time</p>
            </div>
            <span className="text-brand-green font-bold text-xs">+${(portfolio.totalRealizedPnlUsd + portfolio.totalUnrealizedPnlUsd).toLocaleString()} USD Gain</span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolio.historicalChart}>
                <defs>
                  <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0B0E14', borderColor: '#1F283A', fontSize: '11px' }} />
                <Area type="monotone" dataKey="netWorth" stroke="#00F0FF" strokeWidth={2} fill="url(#portGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Chain Allocation Distribution */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-purple" />
            Multi-Chain Allocation
          </h3>
          <div className="space-y-3 pt-2">
            {portfolio.chainAllocation.map((ch) => (
              <div key={ch.chain} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{ch.chain}</span>
                  <span className="text-slate-400">${ch.balanceUsd.toLocaleString()} ({ch.percentage}%)</span>
                </div>
                <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-purple rounded-full" style={{ width: `${ch.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
