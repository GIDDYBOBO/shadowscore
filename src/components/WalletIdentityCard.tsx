import React, { useState } from 'react';
import { Info, Copy, Check, ExternalLink, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface WalletIdentityCardProps {
  wallet: WalletProfile;
  onOpenReport: () => void;
}

export const WalletIdentityCard: React.FC<WalletIdentityCardProps> = ({ wallet, onOpenReport }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    if (addr.length < 14) return addr;
    return `${addr.slice(0, 7)}...${addr.slice(-6)}`;
  };

  return (
    <div className="glass-card glass-card-hover rounded-xl p-3 sm:p-3.5 flex flex-col justify-between h-full relative border border-dark-border shadow-card font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center space-x-1.5">
          <h3 className="font-bold text-white text-xs sm:text-sm">Wallet Identity</h3>
          <Info className="w-3 h-3 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Address Header Banner */}
      <div className="flex items-center space-x-2 mb-2 bg-dark-900/90 border border-dark-border p-2 rounded-lg">
        <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-brand-cyan shrink-0">
          <Layers className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-medium text-slate-400">Wallet Address</p>
          <div className="flex items-center space-x-1.5">
            <span className="font-mono text-[11px] font-semibold text-white truncate">
              {truncateAddress(wallet.address)}
            </span>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-brand-cyan transition-colors"
              title="Copy address"
            >
              {copied ? <Check className="w-2.5 h-2.5 text-brand-green" /> : <Copy className="w-2.5 h-2.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-3 gap-1.5 mb-2 font-mono">
        <div className="bg-dark-900/60 border border-dark-border/60 p-1.5 rounded-lg">
          <p className="text-[9px] text-slate-400 font-medium mb-0.5 font-sans">Network</p>
          <div className="flex items-center space-x-1 text-[10px] font-semibold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
            <span className="truncate">{wallet.network}</span>
          </div>
        </div>

        <div className="bg-dark-900/60 border border-dark-border/60 p-1.5 rounded-lg">
          <p className="text-[9px] text-slate-400 font-medium mb-0.5 font-sans">Wallet Age</p>
          <p className="text-[10px] font-semibold text-white">{wallet.walletAge}</p>
        </div>

        <div className="bg-dark-900/60 border border-dark-border/60 p-1.5 rounded-lg">
          <p className="text-[9px] text-slate-400 font-medium mb-0.5 font-sans">First Activity</p>
          <p className="text-[10px] font-semibold text-white truncate">{wallet.firstActivity}</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 px-0.5 font-medium">
        <div className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          <span className="text-white font-semibold">{wallet.status}</span>
        </div>
        <div className="text-[9px]">{wallet.lastUpdated}</div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onOpenReport}
        className="w-full py-1.5 px-2.5 bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg text-[11px] flex items-center justify-center space-x-1 transition-all shadow-glow-blue/30"
      >
        <span>View Full Identity Report</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
