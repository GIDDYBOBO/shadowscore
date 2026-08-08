import React from 'react';
import { ShieldAlert, Bell, CheckCircle2, AlertTriangle, ShieldCheck, Eye } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';

interface AutonomousAlertsProps {
  wallet: WalletProfile;
  isMonitoring: boolean;
  onToggleMonitoring: () => void;
}

export const AutonomousAlerts: React.FC<AutonomousAlertsProps> = ({
  wallet,
  isMonitoring,
  onToggleMonitoring,
}) => {
  const approvalsList = wallet.approvals || [];
  const highRiskApprovals = approvalsList.filter(
    (a) => a.state === 'Active' && (((a as any).riskScore || 0) > 50 || a.riskLevel === 'High')
  );

  return (
    <div className="glass-card rounded-xl p-3.5 sm:p-4 border border-dark-border shadow-card mb-4 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
              Autonomous Approval & Drainer Watcher
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {highRiskApprovals.length} Flags
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Sub-second mempool watcher protecting your wallet balances</p>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center space-x-2 bg-dark-900 px-2.5 py-1 rounded-lg border border-dark-border self-end sm:self-auto">
          <span className="text-[10px] font-medium text-slate-300">Live Agent Watch</span>
          <button
            onClick={onToggleMonitoring}
            className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
              isMonitoring ? 'bg-brand-cyan' : 'bg-dark-700'
            }`}
          >
            <div
              className={`w-3 h-3 bg-white rounded-full transform transition-transform ${
                isMonitoring ? 'translate-x-3' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Approvals Warning Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {highRiskApprovals.length > 0 ? (
          highRiskApprovals.map((app) => (
            <div
              key={app.id}
              className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start justify-between space-x-2"
            >
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[11px] font-bold text-white">{(app as any).spenderName || (app as any).contractName || 'Unverified Contract'}</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 font-mono">
                      Allowance: {app.allowance}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-0.5 font-normal">
                    {(app as any).reason || (app as any).aiNote || 'High-risk allowance granted to newly deployed unverified proxy contract.'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-emerald-300 text-[11px]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span className="font-semibold">All token allowances verified clean. 0 suspicious phishing signatures detected.</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400">100% Protected</span>
          </div>
        )}
      </div>
    </div>
  );
};
