import React from 'react';
import { ShieldCheck, TrendingUp, Sparkles, Layers, AlertTriangle, Coins } from 'lucide-react';
import type { WalletProfile, StakedProtocolItem } from '../types/reputation';

interface RiskYieldViewProps {
  wallet: WalletProfile;
}

export const RiskYieldView: React.FC<RiskYieldViewProps> = ({ wallet }) => {
  const stakedItems: StakedProtocolItem[] = [
    {
      id: 'stake-1',
      protocolName: 'Lido Liquid Staking',
      assetSymbol: 'stETH',
      amount: '1.2500 stETH',
      usdValue: 2430.98,
      stakedDate: 'Mar 14, 2024',
      frequencyCount: 14,
      apyPct: 3.4,
      aiVerdictScore: 94,
      aiVerdictText: '🛡️ ShadowScore AI Verdict: Top-tier liquid staking protocol with multi-firm audited smart contracts and battle-tested stETH peg resilience.',
      status: 'Audited Secure'
    },
    {
      id: 'stake-2',
      protocolName: 'Rocket Pool Staking',
      assetSymbol: 'rETH',
      amount: '0.4500 rETH',
      usdValue: 940.50,
      stakedDate: 'Jan 10, 2024',
      frequencyCount: 6,
      apyPct: 3.8,
      aiVerdictScore: 92,
      aiVerdictText: '🛡️ ShadowScore AI Verdict: Decentralized permissionless node operator set. Zero counterparty leverage risk.',
      status: 'Audited Secure'
    },
    {
      id: 'stake-3',
      protocolName: 'Aave v3 Supply Market',
      assetSymbol: 'aUSDC',
      amount: '500.00 USDC',
      usdValue: 500.00,
      stakedDate: 'Apr 02, 2024',
      frequencyCount: 22,
      apyPct: 5.2,
      aiVerdictScore: 96,
      aiVerdictText: '🛡️ ShadowScore AI Verdict: Battle-tested lending pool with automated liquidation bots and high health factor reserves.',
      status: 'Audited Secure'
    },
    {
      id: 'stake-4',
      protocolName: 'Ethena USDe Staking',
      assetSymbol: 'sUSDe',
      amount: '250.00 sUSDe',
      usdValue: 250.00,
      stakedDate: 'Jun 18, 2024',
      frequencyCount: 3,
      apyPct: 18.5,
      aiVerdictScore: 72,
      aiVerdictText: '⚠️ ShadowScore AI Verdict: Synthetic delta-neutral yield structure. Monitors funding rate volatility on CEX perp markets.',
      status: 'Moderate Yield'
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white tracking-tight">On-Chain Staked Assets & Yield Protocol Telemetry</h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                Etherscan / Solscan Audited
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive analysis of staked assets, deposit frequency, APY metrics, and ShadowScore AI Safety Verdicts.
            </p>
          </div>
        </div>
      </div>

      {/* Staked Tokens Table & Cards */}
      <div className="space-y-4">
        {stakedItems.map((item) => (
          <div key={item.id} className="glass-card rounded-3xl p-6 border border-dark-border hover:border-brand-cyan/40 transition-all space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-dark-800 border border-dark-border flex items-center justify-center text-lg">
                  🪙
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-white text-base">{item.protocolName}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-brand-cyan/20 text-brand-cyan font-bold">
                      {item.assetSymbol}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">First Staked: {item.stakedDate} • Staking Frequency: <strong className="text-white">{item.frequencyCount} Deposit Events</strong></p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-right font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Staked Amount</span>
                  <span className="text-sm font-bold text-white">{item.amount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Estimated USD</span>
                  <span className="text-sm font-bold text-brand-green">${item.usdValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">APY Yield</span>
                  <span className="text-sm font-bold text-brand-cyan">+{item.apyPct}% APY</span>
                </div>
              </div>
            </div>

            {/* ShadowScore AI Verdict Box */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              item.aiVerdictScore >= 85
                ? 'bg-brand-green/10 border-brand-green/30 text-slate-200'
                : 'bg-amber-500/10 border-amber-500/30 text-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-cyan" /> ShadowScore AI Protocol Safety Verdict
                </span>
                <span className="font-mono font-bold text-brand-cyan">Safety Score: {item.aiVerdictScore}/100</span>
              </div>
              <p className="font-mono">{item.aiVerdictText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
