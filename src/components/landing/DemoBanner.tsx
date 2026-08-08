import React from 'react';
import { ShieldAlert, CheckCircle2, Lock, ExternalLink, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface DemoBannerProps {
  onLaunchDashboard: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ onLaunchDashboard }) => {
  return (
    <section id="security" className="mx-auto mt-24 max-w-7xl px-8 font-sans">
      <div className="glass-card rounded-3xl p-8 border border-amber-500/40 relative overflow-hidden bg-gradient-to-r from-dark-900 via-dark-800 to-amber-950/20 shadow-2xl space-y-6">
        {/* Top Header Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 font-mono">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Web3 Wallet Security & Tested Revoke Protocols
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Mandatory Safety Advisory
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              50% AI-Powered & 50% Human-Built Architecture • Zero-Risk Verification Protocol
            </p>
          </div>
        </div>

        {/* Security Disclosure & Best Practice Guide */}
        <div className="p-5 rounded-2xl bg-dark-900/90 border border-amber-500/30 text-xs leading-relaxed text-slate-200 space-y-3 font-mono">
          <p className="font-bold text-amber-400 text-sm flex items-center gap-1.5 font-sans">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            Why Wallet Disconnection & Contract Revocation are Essential:
          </p>
          <p>
            In Web3, deep wallet telemetry requires establishing a wallet read session. While ShadowScore AI operates strictly on public read-only blockchain data, compromised dApp approvals across the ecosystem account for over 80% of wallet drain exploits.
          </p>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-slate-200">
            <span className="font-bold text-amber-300 block font-sans text-xs">
              🛡️ Tested & Proven Step-by-Step Revoke Protocol:
            </span>
            <p>1. Connect your wallet to obtain your Soulbound Reputation Badge & AI Score audit.</p>
            <p>2. Once your score is generated, navigate to the <strong>Security & Revoke</strong> module or use Revoke.cash.</p>
            <p>3. Force disconnect all active dApp sessions and revoke dormant token approvals immediately.</p>
            <p className="text-brand-cyan font-bold pt-1">
              💡 <strong>Gas Fee Requirement Notice:</strong> Ensure you retain a small gas fee balance (e.g. <strong>≥ $2 Base ETH</strong> when revoking transactions on Base, or native gas for your respective chain).
            </p>
          </div>
        </div>

        {/* External Social Threads & Guides Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-mono">
          <div className="flex items-center space-x-3 text-xs">
            <a
              href="https://x.com/bade_bunmi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-brand-cyan hover:underline font-bold"
            >
              <span>Read X Security Thread</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://github.com/GIDDYBOBO/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-brand-cyan hover:underline font-bold"
            >
              <span>Read Medium & GitHub Safety Guide</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={onLaunchDashboard}
            className="w-full sm:w-auto px-6 py-3 bg-brand-cyan hover:bg-cyan-400 text-dark-900 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-glow-cyan/20 shrink-0 font-sans"
          >
            <span>Proceed to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
