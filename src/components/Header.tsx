import React, { useState } from 'react';
import { Search, Bell, Copy, Check, ChevronDown, ShieldCheck, RefreshCw, Wallet, Power } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';
import { MOCK_WALLETS } from '../data/mockWalletData';
import { hasEthereumProvider, hasSolanaProvider, type RealWalletFullData } from '../utils/web3Provider';

interface HeaderProps {
  currentWallet: WalletProfile;
  onSelectWallet: (address: string) => void;
  onSearchAddress: (query: string) => void;
  unreadAlertsCount: number;
  onOpenNotifications: () => void;
  isMonitoringActive: boolean;
  onToggleMonitoring: () => void;
  realWalletData: RealWalletFullData | null;
  onConnectRealWallet: () => void;
  onConnectSolanaWallet: () => void;
  onDisconnectRealWallet: () => void;
  onNavigateToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentWallet,
  onSelectWallet,
  onSearchAddress,
  unreadAlertsCount,
  onOpenNotifications,
  isMonitoringActive,
  onToggleMonitoring,
  realWalletData,
  onConnectRealWallet,
  onConnectSolanaWallet,
  onDisconnectRealWallet,
  onNavigateToLanding,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchAddress(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleConnectEvmClick = async () => {
    setConnecting(true);
    setConnectError(null);
    try {
      await onConnectRealWallet();
      setShowWalletDropdown(false);
    } catch (err: any) {
      setConnectError(err.message || 'Failed to connect EVM wallet');
    } finally {
      setConnecting(false);
    }
  };

  const handleConnectSolanaClick = async () => {
    setConnecting(true);
    setConnectError(null);
    try {
      await onConnectSolanaWallet();
      setShowWalletDropdown(false);
    } catch (err: any) {
      setConnectError(err.message || 'Failed to connect Solana wallet');
    } finally {
      setConnecting(false);
    }
  };

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length < 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isRealConnected = Boolean(realWalletData);

  // Header display label
  const headerButtonLabel = isRealConnected
    ? (realWalletData?.address ? truncateAddress(realWalletData.address) : 'Connect Wallet')
    : 'Connect Wallet';

  return (
    <header className="px-8 py-5 border-b border-dark-border bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between font-sans">
      {/* Title & Subtitle + Home Button */}
      <div className="flex items-center space-x-4">
        {onNavigateToLanding && (
          <button
            onClick={onNavigateToLanding}
            className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-brand-cyan border border-dark-border text-xs font-bold font-mono transition-all flex items-center space-x-1"
            title="Return to Landing Page"
          >
            <span>🏠 Home</span>
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            AI-powered Web3 Reputation & Multichain Telemetry Engine
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-4">
        {/* Continuous Agent Monitoring Toggle */}
        <button
          onClick={onToggleMonitoring}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            isMonitoringActive
              ? 'bg-brand-cyan/10 border-brand-cyan/40 text-brand-cyan'
              : 'bg-dark-700/50 border-dark-border text-slate-400'
          }`}
          title="Simulate autonomous background monitoring checks"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isMonitoringActive ? 'animate-spin text-brand-cyan' : ''}`} />
          <span>{isMonitoringActive ? 'Agent Monitoring ON' : 'Monitoring Paused'}</span>
        </button>

        {/* Global Search Input for Wallet Scanning */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search EVM or Solana address..."
            className="w-64 bg-dark-700/60 border border-dark-border rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-cyan/50 transition-all font-mono"
          />
        </form>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-xl bg-dark-700/60 border border-dark-border text-slate-300 hover:text-white hover:border-slate-600 transition-all"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-danger text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Wallet Connection Button / Badge Widget */}
        <div className="relative">
          <button
            onClick={() => setShowWalletDropdown(!showWalletDropdown)}
            className={`flex items-center space-x-3 border rounded-2xl px-3.5 py-1.5 transition-all shadow-md ${
              isRealConnected
                ? 'bg-brand-cyan/15 border-brand-cyan/50 hover:border-brand-cyan text-white shadow-glow-cyan/20'
                : 'bg-dark-700/80 hover:bg-dark-700 border-dark-border hover:border-brand-cyan/40'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isRealConnected
                ? 'bg-brand-cyan text-dark-900 font-bold'
                : 'bg-blue-600/30 border border-blue-500/40 text-brand-cyan'
            }`}>
              <Wallet className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1.5 font-mono">
                <span className="text-xs font-semibold text-white tracking-wide">
                  {headerButtonLabel}
                </span>
                {isRealConnected && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyAddress();
                    }}
                    className="text-slate-400 hover:text-brand-cyan transition-colors"
                    title="Copy address"
                  >
                    {copied ? <Check className="w-3 h-3 text-brand-green" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-2 text-[10px]">
                <span className="text-slate-400 font-mono">{isRealConnected ? (realWalletData?.networkName || 'Web3') : currentWallet.network}</span>
                <span className="flex items-center space-x-1 text-brand-green font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                  <span>{isRealConnected ? (realWalletData?.providerName || 'Connected') : 'Ready'}</span>
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Wallet Dropdown Modal */}
          {showWalletDropdown && (
            <div className="absolute right-0 mt-2 w-88 bg-dark-800 border border-dark-border rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 font-sans">
              {/* Web3 Provider Connection Options */}
              <div className="mb-4 pb-3 border-b border-dark-border">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Connect Multichain Web3 Wallet
                </p>

                {isRealConnected ? (
                  <div className="p-3 bg-brand-cyan/10 border border-brand-cyan/30 rounded-xl space-y-2 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                        {realWalletData?.providerName} ({realWalletData?.networkName})
                      </span>
                      <span className="text-brand-cyan font-bold">${realWalletData?.portfolioValueUsd.toFixed(2)} USD</span>
                    </div>
                    <p className="text-[10px] text-slate-300 truncate">
                      {realWalletData?.address}
                    </p>
                    <button
                      onClick={() => {
                        onDisconnectRealWallet();
                        setShowWalletDropdown(false);
                      }}
                      className="w-full py-1.5 bg-dark-700 hover:bg-dark-600 text-brand-danger text-xs font-semibold rounded-lg flex items-center justify-center space-x-1 transition-colors font-sans"
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>Disconnect Wallet</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={handleConnectEvmClick}
                      disabled={connecting}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-cyan hover:from-blue-600 hover:to-cyan-400 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all shadow-glow-blue/30"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>{connecting ? 'Connecting...' : 'Connect EVM'}</span>
                    </button>

                    <button
                      onClick={handleConnectSolanaClick}
                      disabled={connecting}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-purple-600 via-brand-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all shadow-glow-purple/30"
                    >
                      <span className="text-base">🟣</span>
                      <span>{connecting ? 'Connecting...' : 'Connect Solana'}</span>
                    </button>

                    {!hasEthereumProvider() && !hasSolanaProvider() && (
                      <p className="text-[10px] text-amber-400 mt-1 text-center">
                        ⚠️ No Web3 wallet extension detected. Install any EVM or Solana browser extension to connect.
                      </p>
                    )}
                  </div>
                )}
                {connectError && (
                  <p className="text-[11px] text-brand-danger mt-2 font-medium">{connectError}</p>
                )}
              </div>

              {/* Preset Sample Wallets */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Sample Audited Wallet
                </p>
                <div className="space-y-1.5">
                  {Object.values(MOCK_WALLETS).map((w) => (
                    <button
                      key={w.address}
                      onClick={() => {
                        onSelectWallet(w.address);
                        setShowWalletDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                        w.address === currentWallet.address && !isRealConnected
                          ? 'bg-brand-cyan/10 border-brand-cyan/40 text-white'
                          : 'bg-dark-700/40 border-dark-border text-slate-300 hover:bg-dark-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5 font-mono">
                          {truncateAddress(w.address)}
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-dark-600 text-slate-300 font-sans">
                            {w.network}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">Score: {w.score}/100 • {w.riskLevel} Risk</div>
                      </div>
                      {w.address === currentWallet.address && !isRealConnected && (
                        <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
