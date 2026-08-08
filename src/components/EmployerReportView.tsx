import React, { useState } from 'react';
import { Hexagon, Download, Search, CheckCircle2, ShieldCheck, Code, Users, Award, ExternalLink } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';
import { MOCK_WALLETS } from '../data/mockWalletData';
import confetti from 'canvas-confetti';

interface EmployerReportViewProps {
  currentWallet: WalletProfile;
}

export const EmployerReportView: React.FC<EmployerReportViewProps> = ({ currentWallet }) => {
  const [searchAddr, setSearchAddr] = useState(currentWallet.address);
  const [activeProfile, setActiveProfile] = useState<WalletProfile>(currentWallet);
  const [downloaded, setDownloaded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (MOCK_WALLETS[searchAddr]) {
      setActiveProfile(MOCK_WALLETS[searchAddr]);
    } else {
      // Dynamic profile fallback
      setActiveProfile({
        ...currentWallet,
        address: searchAddr,
        score: 79,
        grade: 'B',
        executiveSummary: `Dynamic verification report for address ${searchAddr}. Active across 3 EVM chains with verified developer commits.`
      });
    }
  };

  const handleDownload = () => {
    confetti({ particleCount: 40, spread: 50 });
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 text-brand-purple border border-brand-purple/30 flex items-center justify-center">
              <Hexagon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Employer & Recruiter Verification Portal</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluate developer code contributions, governance stewardship, and trust telemetry instantly—no resume required.
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchAddr}
                onChange={(e) => setSearchAddr(e.target.value)}
                placeholder="Search developer wallet or ENS..."
                className="w-64 bg-dark-900 border border-dark-border rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple/50"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-semibold transition-all"
            >
              Verify Candidate
            </button>
          </form>
        </div>
      </div>

      {/* Candidate Profile Summary Card */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex items-center justify-between border-b border-dark-border pb-5 mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-purple bg-brand-purple/15 px-2.5 py-0.5 rounded-full border border-brand-purple/30">
              Verified Web3 Talent Report
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {activeProfile.ensName || activeProfile.address}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Network: {activeProfile.network} • First Active: {activeProfile.firstActivity}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-3xl font-extrabold text-brand-cyan">{activeProfile.score} / 100</div>
              <span className="text-xs text-slate-400 font-medium">Reputation Grade: {activeProfile.grade}</span>
            </div>

            <button
              onClick={handleDownload}
              className="px-4 py-2.5 bg-dark-800 hover:bg-dark-700 border border-dark-border text-white rounded-2xl text-xs font-semibold flex items-center space-x-2 transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-brand-cyan" />
              <span>{downloaded ? 'Report Downloaded!' : 'Export PDF Report'}</span>
            </button>
          </div>
        </div>

        {/* 4 Assessment Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-dark-800/60 border border-dark-border p-4 rounded-2xl">
            <div className="flex items-center space-x-2 text-brand-cyan mb-2">
              <Code className="w-4 h-4" />
              <span className="font-bold text-xs text-white">Developer Credentials</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verified 450+ commits across open-source Solana/EVM repositories. Contributed to Uniswap v3 & Aave v3 hooks.
            </p>
          </div>

          <div className="bg-dark-800/60 border border-dark-border p-4 rounded-2xl">
            <div className="flex items-center space-x-2 text-brand-purple mb-2">
              <Users className="w-4 h-4" />
              <span className="font-bold text-xs text-white">Community & Governance</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Delegate voter on Arbitrum & Optimism Citizen House. 14 governance votes cast with 98% quorum adherence.
            </p>
          </div>

          <div className="bg-dark-800/60 border border-dark-border p-4 rounded-2xl">
            <div className="flex items-center space-x-2 text-brand-green mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold text-xs text-white">Security & Sybil Check</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gitcoin Passport identity score: 28.4. Zero history of mixing services or phishing campaign interactions.
            </p>
          </div>

          <div className="bg-dark-800/60 border border-dark-border p-4 rounded-2xl">
            <div className="flex items-center space-x-2 text-brand-warning mb-2">
              <Award className="w-4 h-4" />
              <span className="font-bold text-xs text-white">Portfolio & Badges</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Holds 7 soulbound proof-of-attendance POAPs & ETHGlobal Hackathon Finalist NFT badge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
