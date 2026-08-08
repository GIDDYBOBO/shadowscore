import React, { useState } from 'react';
import { Info, Sparkles, TrendingUp } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface RadialScoreGaugeProps {
  wallet: WalletProfile;
}

export const RadialScoreGauge: React.FC<RadialScoreGaugeProps> = ({ wallet }) => {
  const [scale1000, setScale1000] = useState(false);

  const displayScore = scale1000 ? Math.round(wallet.score * 10) : wallet.score;
  const maxScore = scale1000 ? 1000 : 100;

  // Circle SVG properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (wallet.score / 100) * circumference;

  return (
    <div className="glass-card glass-card-hover rounded-xl p-3 sm:p-3.5 flex flex-col justify-between h-full relative border border-dark-border shadow-card font-sans">
      {/* Header with info icon & Scale Toggle */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center space-x-1.5">
          <h3 className="font-bold text-white text-xs sm:text-sm">ShadowScore</h3>
          <button 
            type="button"
            className="text-slate-500 hover:text-slate-300 transition-colors"
            title="Comprehensive AI reputation score calculated from on-chain history, governance, security, and developer credentials."
          >
            <Info className="w-3 h-3" />
          </button>
        </div>
        <button
          onClick={() => setScale1000(!scale1000)}
          className="text-[8px] font-semibold px-1.5 py-0.2 rounded bg-dark-800 hover:bg-dark-700 border border-dark-border text-slate-300 transition-colors font-mono"
        >
          {scale1000 ? '0-1000' : '0-100'}
        </button>
      </div>

      {/* Radial Gauge SVG Ring */}
      <div className="flex flex-col items-center justify-center my-0.5 relative">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Gradient definition */}
            <defs>
              <linearGradient id="scoreArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Track Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-dark-800"
              strokeWidth="8"
              fill="transparent"
            />

            {/* Glowing Active Arc */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="url(#scoreArcGradient)"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              filter="url(#glow)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Text Score */}
          <div className="absolute flex flex-col items-center justify-center text-center font-mono">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
              {displayScore}
            </span>
            <span className="text-[9px] text-slate-400 font-semibold">
              /{maxScore}
            </span>
          </div>
        </div>

        {/* Reputation Grade Badge */}
        <div className="flex items-center space-x-1 mt-0.5 font-mono">
          <span className="text-[10px] text-slate-400 font-medium">Grade</span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-brand-green/15 text-brand-green border border-brand-green/30">
            {wallet.grade}
          </span>
        </div>
      </div>

      {/* Bottom Status Banner with Mini Sparkline */}
      <div className="bg-dark-900/90 border border-dark-border rounded-lg p-2 flex items-center justify-between mt-1.5">
        <div className="flex items-center space-x-1.5">
          <Sparkles className="w-3 h-3 text-brand-cyan shrink-0 animate-pulse" />
          <div>
            <div className="text-[10px] font-bold text-white">Good Reputation</div>
            <p className="text-[9px] text-slate-400">Continuous sync</p>
          </div>
        </div>

        {/* Mini SVG Trend Curve */}
        <svg className="w-8 h-4 text-brand-cyan shrink-0" viewBox="0 0 50 20" fill="none">
          <path
            d="M2 15 C 10 18, 20 8, 30 12 C 40 16, 45 4, 48 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
