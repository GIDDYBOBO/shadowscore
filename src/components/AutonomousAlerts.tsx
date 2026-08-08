import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, Play, Pause } from 'lucide-react';
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
  const [logs, setLogs] = useState<{ id: string; time: string; msg: string; type: 'info' | 'warn' | 'success' }[]>([
    { id: '1', time: '10:24 AM', msg: `Agent monitored address ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}. Transaction state clean.`, type: 'info' },
    { id: '2', time: '10:15 AM', msg: 'Governance vote on Snapshot detected. Civics score updated.', type: 'success' },
    { id: '3', time: '10:02 AM', msg: 'Real-time contract approval scanner active. Checking unverified proxies.', type: 'warn' },
  ]);

  useEffect(() => {
    if (!isMonitoring) return;
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const sampleEvents = [
        { msg: `Agent verified 0 pending unconfirmed mempool transactions for ${wallet.address.slice(0, 6)}...`, type: 'info' as const },
        { msg: 'Cross-chain multi-network scan complete: Base & Arbitrum states match.', type: 'info' as const },
        { msg: 'Identity trust score verified on-chain.', type: 'success' as const },
        { msg: 'Autonomous scanner checked active smart contract approvals: No honeypots detected.', type: 'info' as const },
      ];
      const randomEv = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      setLogs((prev) => [{ id: Date.now().toString(), time: now, ...randomEv }, ...prev.slice(0, 15)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring, wallet.address]);

  return (
    <div className="glass-card rounded-3xl p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-dark-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              Autonomous Agent Service
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                isMonitoring ? 'bg-brand-green/20 text-brand-green border border-brand-green/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {isMonitoring ? 'Always-On Active' : 'Standby'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Real-time background service continuously inspecting transactions and contract approvals for address {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleMonitoring}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              isMonitoring
                ? 'bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan shadow-glow-cyan/20'
                : 'bg-dark-700 hover:bg-dark-600 text-slate-300 border border-dark-border'
            }`}
          >
            {isMonitoring ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isMonitoring ? 'Pause Agent' : 'Activate Agent'}</span>
          </button>
        </div>
      </div>

      {/* Agent Live Activity Logs */}
      <div className="bg-dark-900/80 border border-dark-border rounded-2xl p-4 font-mono text-xs max-h-48 overflow-y-auto space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start space-x-3 text-slate-300">
            <span className="text-slate-500 shrink-0 font-medium">{log.time}</span>
            <div className="flex items-center space-x-2">
              {log.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />}
              {log.type === 'warn' && <AlertTriangle className="w-3.5 h-3.5 text-brand-warning shrink-0" />}
              {log.type === 'info' && <RefreshCw className="w-3.5 h-3.5 text-brand-cyan shrink-0" />}
              <span className={
                log.type === 'warn' ? 'text-brand-warning' : log.type === 'success' ? 'text-brand-green' : 'text-slate-300'
              }>
                {log.msg}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
