import React, { useState } from 'react';
import { Search, Bell, Copy, Check, ChevronDown, ShieldCheck, RefreshCw, Wallet, Power, Menu } from 'lucide-react';
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
  onToggleMobileMenu?: () => void;
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
  onToggleMobileMenu,
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

  const headerButtonLabel = isRealConnected
    ? (realWalletData?.address ? truncateAddress(realWalletData.address) : 'Connect Wallet')
    : 'Connect Wallet';

  return (
    <header className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-dark-border bg-[#0B0E14]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between font-sans shadow-md">
      {/* Left: Mobile Hamburger Toggle + Brand Title */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 rounded-lg bg-dark-900 border border-dark-border text-slate-300 hover:text-white lg:hidden transition-all"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {onNavigateToLanding && (
          <button
            onClick={onNavigateToLanding}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-dark-900 hover:bg-dark-800 border border-dark-border text-slate-300 hover:text-white text-[11px] font-semibold transition-all group"
          >
            <span className="text-brand-cyan group-hover:-translate-x-0.5 transition-transform">←</span>
            <span>Landing</span>
          </button>
        )}

        <div>
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center space-x-1.5">
            <span>ReputationOS</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hidden md:inline">
              Multi-Chain v2.4
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 font-mono hidden sm:block">Real-Time Blockchain Intelligence Engine</p>
        </div>
      </div>

      {/* Right Controls: Search + Wallet Switcher + Connect Wallet */}
      <div className="flex items-center space-x-2 sm:space-x-2.5">
        {/* Global Address Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-44 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search address (0x... or .eth)..."
            className="w-full bg-[#0B0E14] border border-[#2D323E] rounded-xl pl-8 pr-2.5 py-1 text-xs !text-white placeholder:text-slate-400 caret-[#00F0FF] focus:outline-none focus:border-brand-cyan/60 font-mono"
          />
        </form>

        {/* Demo Persona Switcher Dropdown */}
        <div className="relative hidden xl:block">
          <select
            value={currentWallet.address}
            onChange={(e) => onSelectWallet(e.target.value)}
            className="bg-dark-900 border border-dark-border rounded-xl px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-brand-cyan/50 font-mono"
          >
            {Object.values(MOCK_WALLETS).map((w) => (
              <option key={w.address} value={w.address}>
                {w.label} ({w.score} pts)
              </option>
            ))}
          </select>
        </div>

        {/* Real Wallet Connect Button */}
        <div className="relative">
          <button
            onClick={() => setShowWalletDropdown(!showWalletDropdown)}
            className={`flex items-center space-x-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all ${
              isRealConnected
                ? 'bg-brand-green/20 text-brand-green border border-brand-green/40 shadow-glow-green/20'
                : 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-glow-blue/20 hover:opacity-90'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span className="font-mono">{headerButtonLabel}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Connect Dropdown Menu */}
          {showWalletDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-dark-950/95 border border-dark-border rounded-2xl p-3 shadow-2xl z-50 font-mono text-xs animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-dark-border/60">
                <span className="font-bold text-white text-xs">Web3 Wallet Gateway</span>
                <span className="text-[9px] text-brand-cyan font-bold">&lt;150ms</span>
              </div>

              {isRealConnected ? (
                <div className="space-y-2.5 pt-2.5">
                  <div className="p-2.5 bg-dark-900 rounded-xl border border-dark-border space-y-1">
                    <span className="text-[9px] text-slate-400 block">Connected Account</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{truncateAddress(realWalletData?.address || '')}</span>
                      <button onClick={handleCopyAddress} className="text-slate-400 hover:text-white">
                        {copied ? <Check className="w-3 h-3 text-brand-green" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <span className="text-[9px] text-brand-green block">Chain: {realWalletData?.chainName || 'Ethereum'}</span>
                  </div>

                  <button
                    onClick={() => { onDisconnectRealWallet(); setShowWalletDropdown(false); }}
                    className="w-full py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all border border-rose-500/30 text-[11px]"
                  >
                    <Power className="w-3 h-3" />
                    <span>Disconnect Wallet</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5 pt-2.5">
                  <button
                    disabled={connecting}
                    onClick={handleConnectEvmClick}
                    className="w-full p-2.5 rounded-xl bg-dark-900 hover:bg-dark-800 border border-dark-border flex items-center justify-between text-left transition-all text-white hover:border-brand-cyan/40"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">🦊</span>
                      <div>
                        <span className="font-bold block text-[11px]">MetaMask / EVM</span>
                        <span className="text-[9px] text-slate-400">Base, ETH, Polygon, Arbitrum</span>
                      </div>
                    </div>
                  </button>

                  <button
                    disabled={connecting}
                    onClick={handleConnectSolanaClick}
                    className="w-full p-2.5 rounded-xl bg-dark-900 hover:bg-dark-800 border border-dark-border flex items-center justify-between text-left transition-all text-white hover:border-brand-cyan/40"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">🟣</span>
                      <div>
                        <span className="font-bold block text-[11px]">Phantom / Solana</span>
                        <span className="text-[9px] text-slate-400">Solana Mainnet-Beta</span>
                      </div>
                    </div>
                  </button>

                  {connectError && (
                    <p className="text-[9px] text-rose-400 pt-1">{connectError}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
