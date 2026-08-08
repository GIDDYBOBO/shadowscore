import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Clock, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Layers, 
  ArrowLeftRight, 
  Zap, 
  Activity, 
  DollarSign, 
  Globe, 
  ExternalLink 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import type { WalletProfile } from '../../types/reputation';
import { WalletIntelligenceEngine, type WalletIntelligenceResult } from '../../../backend/src/services/WalletIntelligenceEngine';

interface WalletIntelligenceViewProps {
  wallet: WalletProfile;
}

export const WalletIntelligenceView: React.FC<WalletIntelligenceViewProps> = ({ wallet }) => {
  const [intel, setIntel] = useState<WalletIntelligenceResult | null>(null);

  useEffect(() => {
    let isMounted = true;
    WalletIntelligenceEngine.analyzeWallet(wallet.address).then((res) => {
      if (isMounted) setIntel(res);
    });
    return () => { isMounted = false; };
  }, [wallet.address]);

  if (!intel) return null;

  return (
    <div className="space-y-6 font-sans">
      {/* Top Dossier Header Card */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-black text-2xl">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <h2 className="text-xl font-extrabold text-white tracking-tight">{intel.ensName || intel.address}</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                  {intel.reputationRank}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30">
                  Risk Level: {intel.riskLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Wallet Age: <strong className="text-white">{intel.walletAgeDays} Days</strong> • Total Transactions: <strong className="text-white">{intel.txCount}</strong> • Gas Spent: <strong className="text-brand-purple">{intel.totalGasSpentEth} ETH (${intel.totalGasSpentUsd.toFixed(2)} USD)</strong>
              </p>
            </div>
          </div>

          <div className="text-right font-mono bg-dark-900/90 p-3 rounded-2xl border border-dark-border">
            <span className="text-[11px] text-slate-400">Dynamic ShadowScore</span>
            <div className="text-3xl font-black text-brand-cyan">
              {intel.shadowScore} <span className="text-sm font-bold text-slate-400">/ 100</span>
            </div>
          </div>
        </div>

        {/* Behavioral Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-dark-border/60 font-mono text-xs">
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Favorite DEX</span>
            <span className="font-bold text-brand-cyan">{intel.favoriteDex}</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Favorite Chain</span>
            <span className="font-bold text-white">{intel.favoriteChain}</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Avg Holding Duration</span>
            <span className="font-bold text-brand-green">{intel.avgHoldingDurationDays} Days</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Bridges Used</span>
            <span className="font-bold text-brand-purple truncate block">{intel.bridgesUsed.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Financial PnL & Historical Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-cyan" />
                Historical Net Asset Value & PnL
              </h3>
              <p className="text-xs text-slate-400">Realized and unrealized profit calculations across DeFi positions</p>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-brand-green font-bold block">+${intel.realizedProfitUsd} Realized PnL</span>
              <span className="text-slate-400 text-[10px]">+${intel.unrealizedProfitUsd} Unrealized</span>
            </div>
          </div>

          <div className="h-48 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intel.historicalBalanceChart}>
                <defs>
                  <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0B0E14', borderColor: '#1F283A', fontSize: '11px' }} />
                <Area type="monotone" dataKey="balanceUsd" stroke="#00F0FF" strokeWidth={2} fill="url(#pnlGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Favorite Token Volume Allocation */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4 font-mono text-xs">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-cyan" />
            Favorite Tokens by Volume
          </h3>
          <div className="space-y-3 pt-2">
            {intel.favoriteTokens.map((tok) => (
              <div key={tok.symbol} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{tok.symbol}</span>
                  <span className="text-slate-400">${tok.volumeUsd.toLocaleString()} ({tok.percentage}%)</span>
                </div>
                <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-cyan rounded-full" style={{ width: `${tok.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Counterparty Graph & Protocol Usage Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* Top Counterparties Table */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-brand-cyan" />
            Top Counterparties & Protocol Contracts
          </h3>
          <div className="divide-y divide-dark-border/60 pt-2">
            {intel.topCounterparties.map((cp) => (
              <div key={cp.address} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{cp.label}</span>
                  <span className="text-[10px] text-slate-400">{cp.address}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-brand-green block">${cp.volumeUsd.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400">{cp.txCount} interactions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Usage Matrix */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-purple" />
            DeFi Protocol Usage Breakdown
          </h3>
          <div className="divide-y divide-dark-border/60 pt-2">
            {intel.protocolUsage.map((p) => (
              <div key={p.protocol} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{p.protocol}</span>
                  <span className="text-[10px] text-slate-400">{p.category}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-brand-purple/20 text-brand-purple font-bold">
                  {p.interactionCount} calls
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
