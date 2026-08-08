import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  RotateCcw, 
  Power, 
  Cpu, 
  Globe, 
  Lock, 
  ExternalLink,
  Zap,
  Layers
} from 'lucide-react';
import type { ContractApproval, ConnectedDAppSession, WalletProfile } from '../types/reputation';

interface SecurityGuardProps {
  wallet: WalletProfile;
  onRevokeApproval: (approvalId: string) => void;
  onForceDisconnectDApp: (dappId: string) => void;
}

export const SecurityGuard: React.FC<SecurityGuardProps> = ({ 
  wallet, 
  onRevokeApproval, 
  onForceDisconnectDApp 
}) => {
  const [dapps, setDApps] = useState<ConnectedDAppSession[]>(
    wallet.connectedDApps || [
      {
        id: 'dapp-1',
        name: 'Uniswap v3 dApp',
        url: 'app.uniswap.org',
        icon: '🦄',
        connectedAt: '2 hours ago',
        permissions: ['Read Address', 'Request Signature'],
        riskLevel: 'Low'
      },
      {
        id: 'dapp-2',
        name: 'VaultX Yield Aggregator',
        url: 'vaultx-yield-protocol.io',
        icon: '⚠️',
        connectedAt: '1 day ago',
        permissions: ['Unlimited Token Spend', 'Sign Messages'],
        riskLevel: 'High'
      },
      {
        id: 'dapp-3',
        name: 'OpenSea Marketplace',
        url: 'opensea.io',
        icon: '🌊',
        connectedAt: '3 days ago',
        permissions: ['Read NFT Holdings', 'Create Listing Signature'],
        riskLevel: 'Low'
      }
    ]
  );

  const handleDisconnect = (id: string) => {
    setDApps((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isForceDisconnected: true } : d))
    );
    onForceDisconnectDApp(id);
  };

  const highRiskApprovals = wallet.approvals.filter(a => a.riskLevel === 'High' && !a.isRevoked);
  const activeContracts = wallet.approvals.filter(a => !a.isRevoked);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              highRiskApprovals.length > 0
                ? 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30'
                : 'bg-brand-green/20 text-brand-green border border-brand-green/30'
            }`}>
              {highRiskApprovals.length > 0 ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Real-Time Security & Contract Revoker</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Force disconnect suspicious dApp sessions, revoke unlimited ERC-20 allowances, and inspect active vs passive contract executions.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-right">
            <div className="px-4 py-2 rounded-2xl bg-dark-800 border border-dark-border">
              <span className="text-[11px] text-slate-400 font-medium">Active Executions</span>
              <div className="text-lg font-extrabold text-white">{activeContracts.length} Smart Contracts</div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-dark-800 border border-dark-border">
              <span className="text-[11px] text-slate-400 font-medium">Threat Level</span>
              <div className={`text-lg font-extrabold ${highRiskApprovals.length > 0 ? 'text-brand-danger' : 'text-brand-green'}`}>
                {highRiskApprovals.length > 0 ? 'High Risk Flag' : 'Clean & Protected'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connected dApp Sessions (Force Disconnect) */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-cyan" />
            Connected dApp Sessions & Permissions ({dapps.filter(d => !d.isForceDisconnected).length} Active)
          </h3>
          <span className="text-xs text-slate-400">Force Disconnect Session</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dapps.map((dapp) => (
            <div
              key={dapp.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                dapp.isForceDisconnected
                  ? 'bg-dark-900/40 border-dark-border/40 opacity-50'
                  : dapp.riskLevel === 'High'
                  ? 'bg-brand-danger/10 border-brand-danger/30'
                  : 'bg-dark-800/60 border-dark-border'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{dapp.icon}</span>
                    <span className="font-bold text-white text-xs">{dapp.name}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    dapp.isForceDisconnected
                      ? 'bg-dark-700 text-slate-400'
                      : dapp.riskLevel === 'High'
                      ? 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30'
                      : 'bg-brand-green/20 text-brand-green border border-brand-green/30'
                  }`}>
                    {dapp.isForceDisconnected ? 'Disconnected' : `${dapp.riskLevel} Risk`}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 font-mono">{dapp.url}</p>
                <div className="text-[10px] text-slate-500 mt-1">Connected: {dapp.connectedAt}</div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {dapp.permissions.map((perm, idx) => (
                    <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-dark-700 text-slate-300">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {dapp.isForceDisconnected ? (
                  <span className="text-xs text-brand-green font-semibold flex items-center justify-center gap-1 py-2">
                    <Check className="w-4 h-4" /> Force Disconnected
                  </span>
                ) : (
                  <button
                    onClick={() => handleDisconnect(dapp.id)}
                    className="w-full py-2 bg-brand-danger/20 hover:bg-brand-danger text-brand-danger hover:text-white border border-brand-danger/40 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>Force Disconnect dApp</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Contract Allowances (Active vs Passive Execution Monitoring) */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-purple" />
            Smart Contract Approvals & Execution Status
          </h3>
          <span className="text-xs text-slate-400">Active vs Passive State Detection</span>
        </div>

        <div className="space-y-3">
          {wallet.approvals.map((app) => {
            const isRevoked = app.isRevoked;
            const executionState = isRevoked ? 'Passive (Revoked)' : (app.state || 'Active');

            return (
              <div
                key={app.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isRevoked
                    ? 'bg-dark-900/50 border-dark-border/40 opacity-60'
                    : app.riskLevel === 'High'
                    ? 'bg-brand-danger/10 border-brand-danger/30'
                    : 'bg-dark-800/60 border-dark-border'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-bold text-white text-sm">{app.token} ({app.symbol})</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      isRevoked
                        ? 'bg-dark-700 text-slate-400'
                        : app.riskLevel === 'High'
                        ? 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30'
                        : 'bg-brand-green/20 text-brand-green border border-brand-green/30'
                    }`}>
                      {isRevoked ? 'Revoked' : `${app.riskLevel} Risk`}
                    </span>

                    {/* Active vs Passive State Badge */}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      executionState.includes('Active')
                        ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      Execution State: {executionState}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center space-x-3 font-mono">
                    <span>Spender: {app.spenderName}</span>
                    <span>•</span>
                    <span>Allowance: {app.allowance}</span>
                  </div>

                  <p className="text-xs text-slate-300 italic mt-1">
                    💡 {app.reason}
                  </p>
                </div>

                <div className="shrink-0">
                  {isRevoked ? (
                    <span className="text-xs font-semibold text-brand-green flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-green/10 border border-brand-green/30">
                      <Check className="w-4 h-4" /> Revocation Confirmed (+15 pts)
                    </span>
                  ) : (
                    <button
                      onClick={() => onRevokeApproval(app.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                        app.riskLevel === 'High'
                          ? 'bg-brand-danger hover:bg-red-600 text-white shadow-glow-card'
                          : 'bg-dark-700 hover:bg-dark-600 text-slate-200 border border-dark-border'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Revoke Allowance</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
