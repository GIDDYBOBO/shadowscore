import React, { useState } from 'react';
import { Search, Copy, Check, ChevronDown, ShieldCheck, Wallet, Power, Menu } from 'lucide-react';
import type { WalletProfile } from '../types/reputation';
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
    <header className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-dark-border bg-[#0B0E14] sticky top-0 z-30 flex items-center justify-between font-sans shadow-md">
      {/* Left: Mobile Hamburger Toggle + Brand Title */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 rounded-lg bg-[#141B2D] border border-dark-border text-slate-300 hover:text-white lg:hidden transition-all"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {onNavigateToLanding && (
          <button
            onClick={onNavigateToLanding}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#141B2D] hover:bg-[#1E283F] border border-dark-border text-slate-300 hover:text-white text-[11px] font-semibold transition-all group"
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

      {/* Right Controls: Search + Connect Wallet */}
      <div className="flex items-center space-x-2 sm:space-x-2.5">
        {/* Global Address Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-48 lg:w-72">
          <Search className="w-3.5 h-3.5 text-brand-cyan absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search address (0x... or .eth)..."
            className="w-full bg-[#101522] border border-[#2D3A54] rounded-xl pl-8 pr-2.5 py-1 text-xs !text-white placeholder:text-slate-400 caret-[#00F0FF] focus:outline-none focus:border-brand-cyan/60 font-mono shadow-inner"
          />
        </form>

        {/* Real Wallet Connect Button */}
        <div className="relative">
          <button
            onClick={() => setShowWalletDropdown(!showWalletDropdown)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all ${
              isRealConnected
                ? 'bg-brand-green/20 text-brand-green border border-brand-green/40 shadow-glow-green/20'
                : 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-glow-blue/20 hover:opacity-95'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span className="font-mono">{headerButtonLabel}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showWalletDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* 100% Solid Non-Transparent Opaque Connect Dropdown Menu */}
          {showWalletDropdown && (
            <div className="absolute right-0 mt-2.5 w-72 bg-[#0F1420] border-2 border-brand-cyan/60 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[100] font-mono text-xs animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#222C42]">
                <span className="font-bold text-white text-xs">Web3 Wallet Gateway</span>
                <span className="text-[9px] text-brand-cyan font-bold px-1.5 py-0.2 rounded bg-brand-cyan/20 border border-brand-cyan/30">
                  Sub-150ms
                </span>
              </div>

              {isRealConnected ? (
                <div className="space-y-2.5 pt-3">
                  <div className="p-3 bg-[#161E30] rounded-xl border border-[#2A3752] space-y-1">
                    <span className="text-[9px] text-slate-400 block font-sans">Connected Account</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{truncateAddress(realWalletData?.address || '')}</span>
                      <button onClick={handleCopyAddress} className="text-slate-400 hover:text-white">
                        {copied ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-brand-green font-bold block">Chain: {realWalletData?.chainName || 'Ethereum'}</span>
                  </div>

                  <button
                    onClick={() => { onDisconnectRealWallet(); setShowWalletDropdown(false); }}
                    className="w-full py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all border border-rose-500/40 text-xs"
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>Disconnect Wallet</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-3">
                  <button
                    disabled={connecting}
                    onClick={handleConnectEvmClick}
                    className="w-full p-3 rounded-xl bg-[#161E30] hover:bg-[#1E2942] border border-[#2A3752] hover:border-brand-cyan/60 flex items-center justify-between text-left transition-all text-white shadow-md group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🦊</span>
                      <div>
                        <span className="font-bold block text-xs group-hover:text-brand-cyan transition-colors">MetaMask / EVM</span>
                        <span className="text-[10px] text-slate-400 font-sans">Base, ETH, Polygon, Arbitrum</span>
                      </div>
                    </div>
                  </button>

                  <button
                    disabled={connecting}
                    onClick={handleConnectSolanaClick}
                    className="w-full p-3 rounded-xl bg-[#161E30] hover:bg-[#1E2942] border border-[#2A3752] hover:border-brand-cyan/60 flex items-center justify-between text-left transition-all text-white shadow-md group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🟣</span>
                      <div>
                        <span className="font-bold block text-xs group-hover:text-brand-cyan transition-colors">Phantom / Solana</span>
                        <span className="text-[10px] text-slate-400 font-sans">Solana Mainnet-Beta</span>
                      </div>
                    </div>
                  </button>

                  {connectError && (
                    <p className="text-[10px] text-rose-400 pt-1 font-sans">{connectError}</p>
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
