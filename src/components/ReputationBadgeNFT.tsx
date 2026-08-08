import React, { useState } from 'react';
import { Award, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, ExternalLink, Download, Image as ImageIcon } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface ReputationBadgeNFTProps {
  wallet: WalletProfile;
}

export const ReputationBadgeNFT: React.FC<ReputationBadgeNFTProps> = ({ wallet }) => {
  const [minted, setMinted] = useState(false);
  const [showVisualMockup, setShowVisualMockup] = useState(false);

  // Dynamic Grade-Based Visual Styling & Themes
  const getBadgeTheme = (grade: string, score: number) => {
    if (score >= 90 || grade.includes('A')) {
      return {
        badgeTitle: 'ELITE SOULBOUND CITIZEN',
        borderGradient: 'from-amber-400 via-brand-cyan to-brand-purple',
        glowColor: 'shadow-glow-cyan/40',
        emblemBg: 'bg-gradient-to-br from-amber-400/20 to-brand-cyan/20',
        textColor: 'text-amber-300',
        badgeBg: 'bg-amber-400/15 border-amber-400/40 text-amber-300',
        statusLabel: 'Elite Verified • Top 1%'
      };
    } else if (score >= 75 || grade.includes('B')) {
      return {
        badgeTitle: 'VERIFIED ON-CHAIN OPERATOR',
        borderGradient: 'from-brand-cyan via-brand-blue to-brand-green',
        glowColor: 'shadow-glow-blue/30',
        emblemBg: 'bg-gradient-to-br from-brand-cyan/20 to-brand-green/20',
        textColor: 'text-brand-cyan',
        badgeBg: 'bg-brand-cyan/15 border-brand-cyan/40 text-brand-cyan',
        statusLabel: 'Healthy • Verified'
      };
    } else if (score >= 50 || grade.includes('C')) {
      return {
        badgeTitle: 'CAUTION PROTOCOL EXPOSURE',
        borderGradient: 'from-amber-500 via-orange-500 to-yellow-400',
        glowColor: 'shadow-glow-amber/30',
        emblemBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
        textColor: 'text-amber-400',
        badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
        statusLabel: 'Caution • Moderate Exposure'
      };
    } else {
      return {
        badgeTitle: 'HIGH RISK / PHISHING VECTOR',
        borderGradient: 'from-brand-danger via-rose-600 to-red-700',
        glowColor: 'shadow-glow-danger/40',
        emblemBg: 'bg-gradient-to-br from-brand-danger/20 to-red-600/20',
        textColor: 'text-brand-danger',
        badgeBg: 'bg-brand-danger/15 border-brand-danger/40 text-brand-danger',
        statusLabel: 'High Risk • Phishing Flagged'
      };
    }
  };

  const theme = getBadgeTheme(wallet.grade, wallet.score);

  return (
    <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-6 relative overflow-hidden font-sans">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-purple/20 text-brand-purple border border-brand-purple/30 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">On-Chain Soulbound Reputation NFT Badge</h3>
            <p className="text-xs text-slate-400">Verifiable Soulbound Identity Certificate & Telemetry Proof</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowVisualMockup(!showVisualMockup)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-border transition-all flex items-center gap-1.5"
          >
            <ImageIcon className="w-4 h-4 text-brand-cyan" />
            <span>{showVisualMockup ? 'Hide Visual Render' : 'Preview Visual Badge Render'}</span>
          </button>

          <button
            onClick={() => setMinted(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              minted
                ? 'bg-brand-green/20 text-brand-green border border-brand-green/40'
                : 'bg-gradient-to-r from-brand-purple via-blue-600 to-brand-cyan text-white hover:from-purple-600 hover:to-cyan-400 shadow-glow-purple/20'
            }`}
          >
            {minted ? '✓ Soulbound NFT Minted' : 'Mint Reputation NFT Badge'}
          </button>
        </div>
      </div>

      {/* Main Focus: Dynamic Grade-Based Cyberpunk NFT Certificate Badge */}
      <div className={`max-w-md mx-auto relative rounded-3xl p-6 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-800 border-2 ${theme.glowColor} space-y-5 text-center transition-all`}>
        {/* Holographic Header Banner */}
        <div className={`inline-block px-3.5 py-1 rounded-full border ${theme.badgeBg} text-[10px] font-black uppercase tracking-widest`}>
          {theme.badgeTitle}
        </div>

        {/* Dynamic NFT Certificate Emblem */}
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.borderGradient} opacity-50 animate-spin`} style={{ animationDuration: '14s' }} />
          <div className={`w-36 h-36 rounded-full bg-dark-900 border-4 border-dark-border flex flex-col items-center justify-center shadow-2xl relative z-10 ${theme.emblemBg}`}>
            <Award className={`w-10 h-10 ${theme.textColor} mb-1 animate-bounce`} />
            <span className="text-3xl font-black text-white font-mono tracking-tight">{wallet.score}</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-wider">SHADOWSCORE</span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white font-mono">
            {wallet.ensName || `${wallet.address.slice(0, 8)}...${wallet.address.slice(-6)}`}
          </h4>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
            Network: <strong className="text-white">{wallet.network}</strong> • Grade: <strong className={theme.textColor}>{wallet.grade}</strong>
          </p>
        </div>

        {/* All Required Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-left text-xs font-mono pt-3 border-t border-dark-border/80">
          <div className="bg-dark-800/90 p-2.5 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block font-sans">Wallet Age</span>
            <span className="text-white font-bold">{wallet.walletAge}</span>
          </div>

          <div className="bg-dark-800/90 p-2.5 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block font-sans">Health Factor</span>
            <span className="text-white font-bold">{wallet.healthFactor || 2.8}</span>
          </div>

          <div className="bg-dark-800/90 p-2.5 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block font-sans">Percentile Rank</span>
            <span className="text-brand-green font-bold">{wallet.percentile}</span>
          </div>

          <div className="bg-dark-800/90 p-2.5 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block font-sans">First Activity</span>
            <span className="text-white font-bold">{wallet.firstActivity}</span>
          </div>

          <div className="bg-dark-800/90 p-2.5 rounded-xl border border-dark-border col-span-2">
            <span className="text-[10px] text-slate-400 block font-sans">Health Status</span>
            <span className={`font-bold ${theme.textColor}`}>{wallet.status} ({wallet.riskStatusText})</span>
          </div>
        </div>

        {/* AI Final Verdict Box */}
        <div className="p-3 rounded-2xl bg-dark-800/90 border border-dark-border text-left text-[11px] space-y-1">
          <span className="text-brand-cyan font-bold block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Final Verdict
          </span>
          <p className="text-slate-300 leading-snug">{wallet.executiveSummary}</p>
        </div>

        {/* Reputation Breakdown Bars */}
        <div className="space-y-1.5 text-left text-xs pt-2 border-t border-dark-border/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Reputation Breakdown</span>
          {wallet.breakdown.map((b, idx) => (
            <div key={idx} className="space-y-0.5 font-mono">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">{b.category}</span>
                <span className="font-bold text-white">{b.score}%</span>
              </div>
              <div className="w-full bg-dark-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${b.score}%`, backgroundColor: b.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
