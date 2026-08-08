import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Activity, 
  Layers, 
  Gem, 
  Flame, 
  Award, 
  Sparkles, 
  Lock 
} from 'lucide-react';
import { ShadowScoreAIEngine, type ShadowScoreAuditResult } from '../../../backend/src/services/ShadowScoreAIEngine';

interface ShadowScoreAIDossierProps {
  walletAddress: string;
}

export const ShadowScoreAIDossier: React.FC<ShadowScoreAIDossierProps> = ({ walletAddress }) => {
  const [audit, setAudit] = useState<ShadowScoreAuditResult | null>(null);

  useEffect(() => {
    setAudit(ShadowScoreAIEngine.calculateDynamicScore(walletAddress));
  }, [walletAddress]);

  if (!audit) return null;

  return (
    <div className="space-y-6 font-sans">
      {/* Top Reputation Hero Card */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-18 h-18 rounded-3xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-black text-3xl shadow-glow-cyan/20">
              <BrainCircuit className="w-9 h-9 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <h2 className="text-2xl font-black text-white tracking-tight">ShadowScore AI Reputation Engine</h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                  Grade {audit.reputationGrade}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30">
                  Risk {audit.riskScore}/100 (Safe)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Evaluates 19 on-chain vectors including wash trading, rug pulls, blacklists, staking, governance, and bytecode verification.
              </p>
            </div>
          </div>

          {/* Overall 0-100 Score Display */}
          <div className="text-right font-mono bg-dark-900/90 p-5 rounded-3xl border border-dark-border">
            <span className="text-xs text-slate-400 block">Overall Reputation Score</span>
            <div className="text-4xl font-black text-brand-cyan mt-1">
              {audit.overallScore} <span className="text-base font-bold text-slate-400">/ 100</span>
            </div>
          </div>
        </div>

        {/* 8 Dimensional Score Matrix Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-6 pt-6 border-t border-dark-border/60 font-mono text-xs">
          {[
            { label: 'Trust Score', score: audit.trustScore, color: 'text-brand-cyan' },
            { label: 'Security Score', score: audit.securityScore, color: 'text-brand-green' },
            { label: 'Activity Score', score: audit.activityScore, color: 'text-brand-cyan' },
            { label: 'DeFi Score', score: audit.defiScore, color: 'text-brand-purple' },
            { label: 'NFT Score', score: audit.nftScore, color: 'text-brand-purple' },
            { label: 'Whale Score', score: audit.whaleScore, color: 'text-amber-400' },
            { label: 'Risk Score', score: audit.riskScore, color: 'text-slate-300' }
          ].map((dim) => (
            <div key={dim.label} className="p-3 bg-dark-900 rounded-2xl border border-dark-border space-y-1">
              <span className="text-[10px] text-slate-400 block">{dim.label}</span>
              <span className={`text-lg font-black ${dim.color}`}>{dim.score}/100</span>
            </div>
          ))}
        </div>
      </div>

      {/* Natural Language AI Explanation Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {audit.scoreExplanations.map((exp) => (
          <div
            key={exp.category}
            className="glass-card rounded-3xl p-6 border border-dark-border space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-cyan" />
                {exp.category}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan font-bold text-[11px]">
                Score {exp.score} ({exp.grade})
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              {exp.explanation}
            </p>

            {/* Positive & Negative Factors */}
            <div className="space-y-1.5 pt-2 border-t border-dark-border/60 text-[11px]">
              {exp.positiveFactors.map((pos, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-brand-green">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{pos}</span>
                </div>
              ))}
              {exp.negativeFactors.map((neg, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-brand-danger">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{neg}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
