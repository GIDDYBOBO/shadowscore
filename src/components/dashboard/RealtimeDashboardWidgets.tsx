import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Gem, 
  ArrowLeftRight, 
  Coins, 
  Award, 
  Zap, 
  Activity, 
  Flame, 
  ArrowUpRight 
} from 'lucide-react';
import { RealtimeDashboardWidgetService, type DashboardWidgetPayload } from '../../../backend/src/services/RealtimeDashboardWidgetService';

export const RealtimeDashboardWidgets: React.FC = () => {
  const [widgets] = useState<DashboardWidgetPayload>(
    RealtimeDashboardWidgetService.getDashboardWidgets()
  );

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Trending Tokens & Trending Wallets Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* Widget 1: Trending Tokens */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              Trending Tokens (24h)
            </h3>
            <span className="text-[10px] text-brand-green font-bold">Live Stream</span>
          </div>

          <div className="space-y-2.5">
            {widgets.trendingTokens.map((t) => (
              <div key={t.symbol} className="p-3 bg-dark-900/80 rounded-2xl border border-dark-border flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg">{t.logo}</span>
                  <div>
                    <span className="font-bold text-white block">{t.symbol}</span>
                    <span className="text-[10px] text-slate-400">${t.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-brand-green font-bold block">+{t.change24h}%</span>
                  <span className="text-[10px] text-slate-500">${(t.volumeUsd / 1000000).toFixed(1)}M Vol</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Highest Reputation Wallets */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-cyan" />
              Highest Reputation Wallets
            </h3>
            <span className="text-[10px] text-brand-cyan font-bold">Tier 1</span>
          </div>

          <div className="space-y-2.5">
            {widgets.highestReputation.map((w) => (
              <div key={w.address} className="p-3 bg-dark-900/80 rounded-2xl border border-dark-border flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">#{w.rank} {w.address.slice(0, 6)}...{w.address.slice(-4)}</span>
                  <span className="text-[10px] text-brand-cyan">{w.grade} Certified</span>
                </div>
                <div className="text-right">
                  <span className="text-brand-cyan font-extrabold text-sm">{w.score} / 100</span>
                  <span className="text-[10px] text-brand-green block">Diamond Trust</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Trending NFT Collections */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Gem className="w-4 h-4 text-brand-purple" />
              Trending NFT Collections
            </h3>
            <span className="text-[10px] text-brand-purple font-bold">Floor Val</span>
          </div>

          <div className="space-y-2.5">
            {widgets.trendingNfts.map((nft) => (
              <div key={nft.collection} className="p-3 bg-dark-900/80 rounded-2xl border border-dark-border flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{nft.collection}</span>
                  <span className="text-[10px] text-slate-400">{nft.salesCount} Sales (24h)</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-bold block">${nft.floorPriceUsd.toLocaleString()}</span>
                  <span className="text-brand-green text-[10px]">+{nft.change24h}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Top Gainers & Largest Transfers Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Top Gainers & Losers */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-green" />
            Market Momentum (Top Gainers & Losers)
          </h3>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-2">
              <span className="text-[10px] text-brand-green font-bold block">Top Gainers</span>
              {widgets.topGainers.map((g) => (
                <div key={g.symbol} className="p-2.5 bg-dark-900 rounded-xl border border-dark-border flex items-center justify-between">
                  <span className="font-bold text-white">{g.symbol}</span>
                  <span className="text-brand-green font-bold">+{g.change24h}%</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-brand-danger font-bold block">Top Losers</span>
              {widgets.topLosers.map((l) => (
                <div key={l.symbol} className="p-2.5 bg-dark-900 rounded-xl border border-dark-border flex items-center justify-between">
                  <span className="font-bold text-white">{l.symbol}</span>
                  <span className="text-brand-danger font-bold">{l.change24h}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Largest Whale Transfers */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-amber-400" />
            Largest Whale Capital Transfers
          </h3>

          <div className="space-y-2.5 pt-1">
            {widgets.largestTransfers.map((tx, idx) => (
              <div key={idx} className="p-3 bg-dark-900 rounded-2xl border border-dark-border flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{tx.from} ➔ {tx.to}</span>
                  <span className="text-[10px] text-slate-400">Transferred Asset: {tx.token}</span>
                </div>
                <span className="font-extrabold text-amber-400 text-sm">
                  ${(tx.amountUsd / 1000000).toFixed(2)}M USD
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
