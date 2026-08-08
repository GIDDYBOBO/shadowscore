import React from 'react';
import { AlertTriangle, ShieldCheck, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface RiskOverviewCardProps {
  wallet: WalletProfile;
  onViewDetails: () => void;
}

export const RiskOverviewCard: React.FC<RiskOverviewCardProps> = ({ wallet, onViewDetails }) => {
  const isHighRisk = wallet.riskLevel === 'High';
  const isMediumRisk = wallet.riskLevel === 'Medium';

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full relative border border-dark-border shadow-card font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-white text-sm">Risk Overview</h3>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
            isHighRisk
              ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
              : isMediumRisk
              ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
          }`}
        >
          {wallet.riskLevel} Risk
        </span>
      </div>

      {/* Main Risk Factor Summary */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center space-x-2 text-xs font-semibold">
          {isHighRisk ? (
            <AlertTriangle className="w-4 h-4 text-brand-danger shrink-0" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
          )}
          <span className="text-white font-bold">{wallet.riskStatusText}</span>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
          {wallet.riskFactors && wallet.riskFactors.length > 0 
            ? wallet.riskFactors[0].label 
            : 'Continuous autonomous contract monitoring and approval risk audit.'}
        </p>
      </div>

      {/* Factor Checklist */}
      <div className="space-y-1.5 mb-3 bg-dark-900/60 p-2.5 rounded-xl border border-dark-border/60">
        {(wallet.riskFactors || []).slice(0, 3).map((factor, idx) => (
          <div key={idx} className="flex items-center space-x-1.5 text-[10px]">
            {factor.positive ? (
              <CheckCircle2 className="w-3 h-3 text-brand-green shrink-0" />
            ) : (
              <XCircle className="w-3 h-3 text-brand-danger shrink-0" />
            )}
            <span className="text-slate-300 truncate">{factor.label}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={onViewDetails}
        className="w-full py-2 px-3 bg-dark-800 hover:bg-dark-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all border border-dark-border"
      >
        <span>Security & Risk Audit</span>
        <ArrowRight className="w-3.5 h-3.5 text-brand-cyan" />
      </button>
    </div>
  );
};
