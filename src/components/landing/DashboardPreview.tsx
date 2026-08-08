import React from 'react';
import { ShieldCheck, Cpu, TrendingUp, Sparkles, AlertTriangle, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface DashboardPreviewProps {
  onLaunchDashboard: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ onLaunchDashboard }) => {
  return (
    <section id="demo" className="mx-auto mt-24 max-w-7xl px-8 font-sans">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-bold font-mono text-brand-cyan uppercase tracking-wider bg-brand-cyan/15 px-3 py-1 rounded-full border border-brand-cyan/30">
          Live Interactive Intelligence Preview
        </span>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Explore the ShadowScore AI Terminal
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Preview real-time wallet health factors, AI reputation score badges, smart contract audits, and multichain asset telemetry.
        </p>
      </div>

      {/* Simulated Live Terminal Preview Card */}
      <div className="glass-card rounded-3xl p-8 border border-brand-cyan/40 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Preview Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dark-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <span className="font-bold text-white text-base">Sample Target: 0x9928...31AA</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-green/20 text-brand-green font-bold">Verified Score 88/100 (A+)</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Chain: Ethereum Mainnet • Total Transactions: 142 • Status: Secure</p>
            </div>
          </div>

          <button
            onClick={onLaunchDashboard}
            className="px-5 py-2.5 bg-brand-cyan hover:bg-cyan-400 text-dark-900 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-glow-cyan/20 self-start md:self-auto"
          >
            <span>Launch Full Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mini Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 font-mono">
          <div className="p-4 rounded-2xl bg-dark-900/90 border border-dark-border space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Reputation Grade</span>
              <ShieldCheck className="w-4 h-4 text-brand-cyan" />
            </div>
            <div className="text-3xl font-black text-brand-cyan">A+ Elite</div>
            <p className="text-[11px] text-brand-green">Top 3% of active Web3 wallets</p>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900/90 border border-dark-border space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Health Factor</span>
              <TrendingUp className="w-4 h-4 text-brand-green" />
            </div>
            <div className="text-3xl font-black text-white">2.84</div>
            <p className="text-[11px] text-slate-400">Low liquidation risk • 54% collateral</p>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900/90 border border-dark-border space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Smart Contract Audits</span>
              <Zap className="w-4 h-4 text-brand-purple" />
            </div>
            <div className="text-3xl font-black text-brand-purple">Clean</div>
            <p className="text-[11px] text-slate-400">0 Honeypots • 0 Active Drainers</p>
          </div>
        </div>
      </div>
    </section>
  );
};
