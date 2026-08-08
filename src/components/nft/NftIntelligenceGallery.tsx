import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  ExternalLink, 
  TrendingUp, 
  ShieldCheck, 
  Gem, 
  Flame, 
  ShoppingBag, 
  ArrowLeftRight 
} from 'lucide-react';
import { NftIntelligenceService, type WalletNftTelemetry } from '../../../backend/src/services/NftIntelligenceService';

interface NftIntelligenceGalleryProps {
  walletAddress: string;
}

export const NftIntelligenceGallery: React.FC<NftIntelligenceGalleryProps> = ({ walletAddress }) => {
  const [nfts, setNfts] = useState<WalletNftTelemetry[]>([]);
  const [selectedChain, setSelectedChain] = useState<string>('All');

  useEffect(() => {
    NftIntelligenceService.getWalletNfts(walletAddress).then((data) => {
      setNfts(data);
    });
  }, [walletAddress]);

  const totalFloorUsd = nfts.reduce((acc, curr) => acc + curr.estimatedFloorUsd, 0);

  const filteredNfts = selectedChain === 'All'
    ? nfts
    : nfts.filter((n) => n.chainType === selectedChain);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner with Total Floor Valuation */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/20 text-brand-purple border border-brand-purple/30 flex items-center justify-center">
              <Gem className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <h2 className="text-xl font-extrabold text-white tracking-tight">NFT Portfolio & Floor Intelligence</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                  {nfts.length} Collections Held
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Real-time OpenSea, Blur & Magic Eden floor valuations with acquisition costs and provenance tracking.
              </p>
            </div>
          </div>

          <div className="text-right font-mono bg-dark-900/90 p-4 rounded-2xl border border-dark-border">
            <span className="text-xs text-slate-400">Total NFT Floor Valuation</span>
            <div className="text-3xl font-black text-brand-purple mt-0.5">
              ${totalFloorUsd.toLocaleString()} <span className="text-sm font-bold text-slate-400">USD</span>
            </div>
          </div>
        </div>

        {/* Chain Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-dark-border/60 font-mono text-xs">
          {['All', 'Ethereum', 'Base', 'Solana'].map((chain) => (
            <button
              key={chain}
              onClick={() => setSelectedChain(chain)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                selectedChain === chain
                  ? 'bg-brand-purple text-white shadow-glow-purple/20'
                  : 'bg-dark-900 text-slate-400 hover:text-white border border-dark-border'
              }`}
            >
              {chain}
            </button>
          ))}
        </div>
      </div>

      {/* NFT Grid Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNfts.map((nft) => (
          <div
            key={nft.id}
            className="glass-card rounded-3xl p-5 border border-dark-border hover:border-brand-purple/50 transition-all space-y-4 font-mono text-xs group"
          >
            {/* Image Thumbnail with Rarity Tier Badge */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-dark-900 border border-dark-border">
              <img
                src={nft.imageUrl}
                alt={nft.collectionName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-dark-900/90 text-white font-bold text-[10px] backdrop-blur-md border border-dark-border">
                  {nft.chainType}
                </span>
                {nft.rarityTier && (
                  <span className="px-2.5 py-1 rounded-full bg-brand-purple/80 text-white font-bold text-[10px] backdrop-blur-md">
                    {nft.rarityTier} #{nft.rarityRank}
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-dark-900/90 text-brand-cyan font-bold text-[10px] backdrop-blur-md border border-dark-border">
                  {nft.marketplace}
                </span>
              </div>
            </div>

            {/* Collection Title & Token ID */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-white text-sm truncate">{nft.collectionName}</h3>
                <span className="text-brand-cyan font-bold">{nft.tokenId}</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">{nft.contractAddress}</p>
            </div>

            {/* Price & PnL Telemetry */}
            <div className="p-3 bg-dark-900/90 rounded-2xl border border-dark-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Floor:</span>
                <span className="font-bold text-white">${nft.currentFloorPrice.toLocaleString()} USD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Purchase Price:</span>
                <span className="text-slate-300">${nft.avgPurchasePrice.toLocaleString()} USD</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-dark-border/60">
                <span className="text-slate-400">Estimated PnL:</span>
                <span className="font-bold text-brand-green flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +${nft.pnlUsd.toLocaleString()} ({nft.pnlPercentage}%)
                </span>
              </div>
            </div>

            {/* Provenance Transfer History Ledger */}
            <div className="pt-2 border-t border-dark-border/60 text-[11px] text-slate-400">
              <span className="block font-bold text-slate-300 mb-1">Transfer Provenance:</span>
              {nft.transferHistory.map((th, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px]">
                  <span>{th.from} ➔ {th.to}</span>
                  <span className="text-slate-400">{th.date}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
