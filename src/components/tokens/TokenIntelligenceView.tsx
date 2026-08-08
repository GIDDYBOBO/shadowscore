import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ArrowLeftRight, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  ExternalLink, 
  Flame 
} from 'lucide-react';
import { tokenTrackingService, type TokenTelemetry } from '../../../backend/src/services/TokenTrackingService';

export const TokenIntelligenceView: React.FC = () => {
  const allTokens = tokenTrackingService.getAllTokens();
  const [selectedSymbol, setSelectedSymbol] = useState<string>('ETH');

  const currentToken = tokenTrackingService.getToken(selectedSymbol) || allTokens[0];
  const isGain = currentToken.priceChange24h >= 0;

  const totalVol = currentToken.buyVolume24hUsd + currentToken.sellVolume24hUsd;
  const buyPct = Math.round((currentToken.buyVolume24hUsd / (totalVol || 1)) * 100);
  const sellPct = 100 - buyPct;

  return (
    <div className="space-y-6 font-sans">
      {/* Top Token Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-dark-900/90 p-3 rounded-3xl border border-dark-border">
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-brand-cyan ml-2" />
          <span className="font-bold text-white text-xs">Tracked Tokens:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {allTokens.map((t) => (
            <button
              key={t.symbol}
              onClick={() => setSelectedSymbol(t.symbol)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
                selectedSymbol === t.symbol
                  ? 'bg-brand-cyan text-dark-900 shadow-glow-cyan/20'
                  : 'bg-dark-800 text-slate-400 hover:text-white border border-dark-border'
              }`}
            >
              <span>{t.logo}</span>
              <span>{t.symbol}</span>
              <span className={`text-[10px] ${t.priceChange24h >= 0 ? 'text-brand-green' : 'text-brand-danger'}`}>
                {t.priceChange24h >= 0 ? `+${t.priceChange24h}%` : `${t.priceChange24h}%`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Token Overview Card */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-dark-800 border border-dark-border flex items-center justify-center text-3xl">
              {currentToken.logo}
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <h2 className="text-2xl font-black text-white">{currentToken.name}</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-dark-800 text-brand-cyan border border-dark-border">
                  {currentToken.chainName}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Contract: <strong className="text-white">{currentToken.address}</strong>
              </p>
            </div>
          </div>

          {/* Real-Time Price & 24h Delta */}
          <div className="text-right font-mono bg-dark-900/90 p-4 rounded-2xl border border-dark-border">
            <span className="text-xs text-slate-400">Live Spot Price</span>
            <div className="text-3xl font-black text-white mt-0.5">
              ${currentToken.priceUsd.toLocaleString()}
            </div>
            <div className={`text-xs font-bold mt-1 flex items-center justify-end gap-1 ${
              isGain ? 'text-brand-green' : 'text-brand-danger'
            }`}>
              {isGain ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isGain ? `+${currentToken.priceChange24h}% (24h)` : `${currentToken.priceChange24h}% (24h)`}
            </div>
          </div>
        </div>

        {/* Market Depth Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-dark-border/60 font-mono text-xs">
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Market Cap</span>
            <span className="font-bold text-white">${currentToken.marketCapUsd.toLocaleString()}</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Fully Diluted (FDV)</span>
            <span className="font-bold text-slate-300">${currentToken.fdvUsd.toLocaleString()}</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Total Liquidity Pool</span>
            <span className="font-bold text-brand-cyan">${currentToken.liquidityUsd.toLocaleString()}</span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Total Holders</span>
            <span className="font-bold text-brand-green">{currentToken.holdersCount.toLocaleString()} Wallets</span>
          </div>
        </div>
      </div>

      {/* 24h Order Flow Buy vs Sell Volume Bar */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border font-mono text-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-sm">24h Order Flow Distribution</span>
          <span className="text-slate-400">Total Volume: <strong className="text-white">${currentToken.volume24hUsd.toLocaleString()}</strong></span>
        </div>

        <div className="w-full h-3 bg-dark-900 rounded-full overflow-hidden flex">
          <div className="h-full bg-brand-green transition-all duration-500" style={{ width: `${buyPct}%` }} />
          <div className="h-full bg-brand-danger transition-all duration-500" style={{ width: `${sellPct}%` }} />
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-brand-green font-bold">🟢 Buy Volume: ${currentToken.buyVolume24hUsd.toLocaleString()} ({buyPct}%)</span>
          <span className="text-brand-danger font-bold">🔴 Sell Volume: ${currentToken.sellVolume24hUsd.toLocaleString()} ({sellPct}%)</span>
        </div>
      </div>

      {/* Whale Distribution Table */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border font-mono text-xs space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-cyan" />
          Largest Whale Holders Distribution (Top Concentrated Supply)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 text-[11px]">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Holder Address</th>
                <th className="pb-3">% of Circulating Supply</th>
                <th className="pb-3 text-right">Holding Value ($ USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {currentToken.largestHolders.map((wh) => (
                <tr key={wh.rank} className="hover:bg-dark-800/50 transition-colors">
                  <td className="py-3 font-bold text-brand-cyan">#{wh.rank}</td>
                  <td className="py-3 text-white font-mono">{wh.address}</td>
                  <td className="py-3 text-brand-green font-bold">{wh.percentage}%</td>
                  <td className="py-3 text-right font-bold text-white">${wh.valueUsd.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
