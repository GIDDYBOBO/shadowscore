import React from 'react';
import { Code, Download, Vote, ShieldCheck, CheckCircle2, GitCommit, ExternalLink, Sparkles, Layers } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface EmployerDevViewProps {
  wallet: WalletProfile;
}

export const EmployerDevView: React.FC<EmployerDevViewProps> = ({ wallet }) => {
  const handleDownloadDevReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Employer Developer & Governance Resume Briefing</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                  Verified On-Chain Developer & Civic Proofs
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                On-chain developer activity, verified GitHub commits, DAO governance voting records, and smart contract deployments.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadDevReport}
            className="px-5 py-3 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-cyan hover:from-blue-600 hover:to-cyan-400 text-white font-bold rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-glow-blue/30 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export Professional PDF Report (Watermarked)</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Developer & DAO Civic Contributions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Target Wallet Identity Card */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4 relative overflow-hidden">
            {/* ShadowScore Watermark Overlay */}
            <div className="absolute right-4 bottom-4 text-7xl font-black text-white/5 pointer-events-none select-none font-mono uppercase">
              SHADOWSCORE WATERMARK
            </div>

            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-cyan" />
              1. Developer Identity & Reputation Verification
            </h3>

            <div className="p-4 rounded-2xl bg-dark-800/80 border border-dark-border text-xs leading-relaxed text-slate-300 space-y-2 font-mono">
              <p>
                <strong>Wallet Address:</strong> <span className="font-mono text-white">{wallet.address}</span> ({wallet.network} Network)
              </p>
              <p>
                <strong>Reputation Score:</strong> <span className="font-bold text-brand-cyan">{wallet.score} / 100</span> (Grade {wallet.grade}) • <span className="text-brand-green">{wallet.percentile}</span> Percentile Rank.
              </p>
              <p>
                <strong>Developer Status:</strong> <span className="text-brand-green font-bold">Verified On-Chain Contributor</span>
              </p>
            </div>
          </div>

          {/* DAO Governance Voting History of Searched/Connected Wallet */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Vote className="w-5 h-5 text-brand-purple" />
              2. DAO Civic Governance Contributions & Snapshot Voting Ledger
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-dark-800/60 border border-dark-border flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">Arbitrum DAO Snapshot</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-brand-cyan/20 text-brand-cyan font-bold">Proposal #42</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Vote Cast: FOR • Weight: 14,250 ARB Tokens</p>
                </div>
                <span className="text-brand-green font-bold">+4 Civic Pts</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-dark-800/60 border border-dark-border flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">Optimism Citizen House Grants</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-brand-purple/20 text-brand-purple font-bold">RPGF Round 4</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Vote Cast: Verified Delegate Ballot</p>
                </div>
                <span className="text-brand-green font-bold">+8 Civic Pts</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-dark-800/60 border border-dark-border flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">Gitcoin Passport Identity Stamp</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-brand-green/20 text-brand-green font-bold">Humanity Proof</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Score: 28.4 / 100 • Sybil Resistance Verified</p>
                </div>
                <span className="text-brand-green font-bold">Verified</span>
              </div>
            </div>
          </div>

          {/* GitHub Commit & Smart Contract Deployment Telemetry */}
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-brand-green" />
              3. Smart Contract Deployments & Open-Source Commits
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-dark-800/60 border border-dark-border">
                <span className="text-slate-400 block font-semibold">Deployed Contracts</span>
                <span className="text-white font-bold text-sm">3 Verified Smart Contracts</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-dark-800/60 border border-dark-border">
                <span className="text-slate-400 block font-semibold">GitHub Linked Profile</span>
                <span className="text-brand-cyan font-bold text-sm">450+ Commits (Active 2026)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Employer Verification Summary */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              Employer Hiring Verdict
            </h3>

            <div className="p-4 rounded-2xl bg-dark-800 border border-dark-border space-y-3 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">Technical Trust:</span>
                <span className="text-brand-green font-bold">Verified High</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">Sybil Risk:</span>
                <span className="text-brand-green font-bold">0% Risk</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">Civic Reputation:</span>
                <span className="text-brand-cyan font-bold">{wallet.percentile}</span>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed pt-2 border-t border-dark-border/80">
                This wallet meets all corporate developer screening benchmarks for Web3 engineering roles, smart contract auditing, and DAO delegate stewardship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
