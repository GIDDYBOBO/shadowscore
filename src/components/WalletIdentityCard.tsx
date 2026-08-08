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
    <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-white text-base">Wallet Identity</h3>
          <Info className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Address Header Banner */}
      <div className="flex items-center space-x-3 mb-6 bg-dark-800/90 border border-dark-border p-3.5 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-brand-cyan shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium text-slate-400">Wallet Address</p>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm font-semibold text-white truncate">
              {truncateAddress(wallet.address)}
            </span>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-brand-cyan transition-colors"
              title="Copy address"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-dark-800/50 border border-dark-border/60 p-3 rounded-2xl">
          <p className="text-[11px] text-slate-400 font-medium mb-1">Network</p>
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-brand-cyan" />
            <span>{wallet.network}</span>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-border/60 p-3 rounded-2xl">
          <p className="text-[11px] text-slate-400 font-medium mb-1">Wallet Age</p>
          <p className="text-xs font-semibold text-white">{wallet.walletAge}</p>
        </div>

        <div className="bg-dark-800/50 border border-dark-border/60 p-3 rounded-2xl">
          <p className="text-[11px] text-slate-400 font-medium mb-1">First Activity</p>
          <p className="text-xs font-semibold text-white">{wallet.firstActivity}</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-5 px-1 font-medium">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          <span className="text-white font-semibold">Status: {wallet.status}</span>
        </div>
        <div>Last Updated: {wallet.lastUpdated}</div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onOpenReport}
        className="w-full py-3 px-4 bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-2xl text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-blue/30"
      >
        <span>View Full Identity Report</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
