import React from 'react';
import { Info, CheckCircle2, ChevronRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface RiskOverviewCardProps {
  wallet: WalletProfile;
  onViewDetails: () => void;
}

export const RiskOverviewCard: React.FC<RiskOverviewCardProps> = ({ wallet, onViewDetails }) => {
  const isLowRisk = wallet.riskLevel === 'Low';
  const isMediumRisk = wallet.riskLevel === 'Medium';

  return (
    <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-white text-base">Risk Overview</h3>
          <Info className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Semi-Circle Risk Meter */}
      <div className="flex flex-col items-center justify-center my-1 relative">
        <div className="relative w-40 h-20 overflow-hidden">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background Arch */}
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="none"
              stroke="#1F283A"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Active Semi-Arc */}
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="none"
              stroke={isLowRisk ? '#10B981' : isMediumRisk ? '#F59E0B' : '#EF4444'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="157"
              strokeDashoffset={isLowRisk ? '30' : isMediumRisk ? '80' : '130'}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
        </div>

        <div className="text-center mt-[-10px]">
          <span className={`text-xl font-bold ${
            isLowRisk ? 'text-brand-green' : isMediumRisk ? 'text-brand-warning' : 'text-brand-danger'
          }`}>
            {wallet.riskLevel}
          </span>
          <p className="text-[11px] text-slate-400 font-medium">Risk Level</p>
        </div>
      </div>

      {/* Risk Factors Checklist */}
      <div className="space-y-2.5 my-4">
        {wallet.riskFactors.map((factor) => (
          <div key={factor.id} className="flex items-center space-x-2.5 text-xs">
            {factor.positive ? (
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-brand-danger shrink-0" />
            )}
            <span className={factor.positive ? 'text-slate-300 font-medium' : 'text-brand-danger font-medium'}>
              {factor.label}
            </span>
          </div>
        ))}
      </div>

      {/* View Details Link Button */}
      <button
        onClick={onViewDetails}
        className="w-full py-2.5 px-4 bg-dark-800 hover:bg-dark-700 border border-dark-border text-slate-300 hover:text-white rounded-2xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
      >
        <span>View Details</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
