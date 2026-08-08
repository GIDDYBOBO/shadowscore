import React from 'react';
import { ShadowAiOrb } from './ShadowAiOrb';
import type { WalletProfile } from '../types/reputation';
import { ShieldCheck, Award, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ExecutiveSummaryProps {
  wallet: WalletProfile;
  isConnected: boolean;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ wallet, isConnected }) => {
  const isHighRisk = wallet.riskLevel === 'High';
  const isMediumRisk = wallet.riskLevel === 'Medium';

  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden mb-6 border border-dark-border/80 shadow-glow-card font-sans">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-24 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Side: Animated AI Orb & Well-Written Telemetry Summary */}
        <div className="flex items-start space-x-5 flex-1">
          <ShadowAiOrb size="lg" />
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-[11px] font-black tracking-wider text-brand-cyan uppercase bg-brand-cyan/15 px-2.5 py-0.5 rounded-md border border-brand-cyan/30 flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3 h-3 text-brand-cyan animate-pulse" />
                SHADOW AI EXECUTIVE ANALYSIS
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Verified Address: <strong className="text-white font-mono">{wallet.ensName || `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}</strong>
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
              Comprehensive Reputation & Autonomous Risk Telemetry
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl font-normal">
              {wallet.executiveSummary}
            </p>

            {/* AI Technical Insights Bullets */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <div className="flex items-center space-x-1.5 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Health Factor: <strong className="text-white">{wallet.healthFactor || 2.8}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>Confirmed Txns: <strong className="text-white">{wallet.totalTransactions}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300 font-medium">
                <Award className="w-4 h-4 text-brand-purple shrink-0" />
                <span>Percentile: <strong className="text-white">{wallet.percentile}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Key Metrics Pill Stats */}
        <div className="flex items-center space-x-4 shrink-0 bg-dark-800/90 p-4 rounded-2xl border border-dark-border shadow-md">
          {/* Reputation Score Pill */}
          <div className="px-4 py-1 border-r border-dark-border text-center">
            <div className="text-[11px] text-slate-400 font-medium mb-0.5">Reputation</div>
            <div className="flex items-baseline justify-center space-x-1 font-mono">
              <span className="text-2xl font-black text-white">{wallet.score}</span>
              <span className="text-xs text-slate-400 font-bold">/100</span>
            </div>
            <span className={`text-[11px] font-bold ${
              wallet.score >= 80 ? 'text-brand-green' : wallet.score >= 50 ? 'text-brand-warning' : 'text-brand-danger'
            }`}>
              {wallet.score >= 80 ? 'Good' : wallet.score >= 50 ? 'Fair' : 'At Risk'} ({wallet.grade})
            </span>
          </div>

          {/* Risk Level Pill */}
          <div className="px-4 py-1 border-r border-dark-border text-center">
            <div className="text-[11px] text-slate-400 font-medium mb-0.5">Risk Level</div>
            <div className="flex items-center justify-center space-x-1.5">
              {isHighRisk ? (
                <AlertTriangle className="w-4 h-4 text-brand-danger" />
              ) : isMediumRisk ? (
                <AlertTriangle className="w-4 h-4 text-brand-warning" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-brand-green" />
              )}
              <span className={`text-lg font-bold ${
                isHighRisk ? 'text-brand-danger' : isMediumRisk ? 'text-brand-warning' : 'text-brand-green'
              }`}>
                {wallet.riskLevel}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {wallet.riskStatusText}
            </span>
          </div>

          {/* Portfolio USD Value Pill */}
          <div className="px-4 py-1 text-center font-mono">
            <div className="text-[11px] text-slate-400 font-medium mb-0.5 font-sans">Net Assets</div>
            <div className="text-lg font-black text-brand-cyan">
              {isConnected ? `$${wallet.portfolioValueUsd.toFixed(2)} USD` : '_ _ _ USD'}
            </div>
            <span className="text-[11px] text-slate-400 font-medium font-sans">
              {isConnected ? 'Live Web3 Assets' : 'Wallet Unconnected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
