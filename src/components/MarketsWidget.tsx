import React from 'react';
import { MoreHorizontal, TrendingUp, TrendingDown, Zap, BarChart2 } from 'lucide-react';

export interface MarketAssetItem {
  id: string;
  name: string;
  symbol: string;
  subtext?: string;
  price: string;
  changePct: string;
  isUp: boolean;
  sparklinePath: string;
  fillPath: string;
}

interface MarketsWidgetProps {
  title?: string;
  assets?: MarketAssetItem[];
  onSelectAsset?: (asset: MarketAssetItem) => void;
}

export const MarketsWidget: React.FC<MarketsWidgetProps> = ({
  title = 'Global Macro & Crypto Markets',
  assets,
  onSelectAsset,
}) => {
  const defaultAssets: MarketAssetItem[] = [
    {
      id: 'm-1',
      name: 'Ethereum Spot',
      symbol: 'ETH/USD',
      subtext: 'Leading Smart Contract L1',
      price: '$1,944.79',
      changePct: '+1.57%',
      isUp: true,
      sparklinePath: 'M 0 20 L 5 18 L 10 22 L 15 16 L 20 21 L 25 15 L 30 5 L 35 7 L 40 4 L 45 8 L 50 3 L 55 5 L 60 2',
      fillPath: 'M 0 20 L 5 18 L 10 22 L 15 16 L 20 21 L 25 15 L 30 5 L 35 7 L 40 4 L 45 8 L 50 3 L 55 5 L 60 2 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-2',
      name: 'Solana Spot',
      symbol: 'SOL/USD',
      subtext: 'High-Throughput L1',
      price: '$142.50',
      changePct: '+3.80%',
      isUp: true,
      sparklinePath: 'M 0 20 L 6 17 L 12 21 L 18 16 L 24 20 L 30 6 L 36 8 L 42 5 L 48 7 L 54 3 L 60 4',
      fillPath: 'M 0 20 L 6 17 L 12 21 L 18 16 L 24 20 L 30 6 L 36 8 L 42 5 L 48 7 L 54 3 L 60 4 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-3',
      name: 'Kaito AI Token',
      symbol: 'KAITO/USD',
      subtext: 'Decentralized AI Index',
      price: '$1.2540',
      changePct: '+6.03%',
      isUp: true,
      sparklinePath: 'M 0 22 L 6 19 L 12 23 L 18 17 L 24 21 L 30 7 L 36 9 L 42 5 L 48 8 L 54 4 L 60 3',
      fillPath: 'M 0 22 L 6 19 L 12 23 L 18 17 L 24 21 L 30 7 L 36 9 L 42 5 L 48 8 L 54 4 L 60 3 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-4',
      name: 'Binance Coin',
      symbol: 'BNB/USD',
      subtext: 'BNB Smart Chain',
      price: '$575.69',
      changePct: '+0.38%',
      isUp: true,
      sparklinePath: 'M 0 18 L 6 16 L 12 20 L 18 15 L 24 19 L 30 8 L 36 10 L 42 6 L 48 9 L 54 5 L 60 4',
      fillPath: 'M 0 18 L 6 16 L 12 20 L 18 15 L 24 19 L 30 8 L 36 10 L 42 6 L 48 9 L 54 5 L 60 4 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-5',
      name: 'Polygon Native',
      symbol: 'POL/USD',
      subtext: 'Zero-Knowledge Rollup',
      price: '$0.7012',
      changePct: '+0.85%',
      isUp: true,
      sparklinePath: 'M 0 19 L 6 17 L 12 21 L 18 16 L 24 18 L 30 9 L 36 11 L 42 7 L 48 10 L 54 6 L 60 5',
      fillPath: 'M 0 19 L 6 17 L 12 21 L 18 16 L 24 18 L 30 9 L 36 11 L 42 7 L 48 10 L 54 6 L 60 5 L 60 25 L 0 25 Z'
    }
  ];

  const items = assets || defaultAssets;

  return (
    <div className="glass-card rounded-3xl p-6 border border-dark-border shadow-2xl font-sans space-y-4">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-dark-border pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-bold">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
            <span className="text-[10px] text-slate-400 font-mono">Live Price Signals & Volume</span>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center gap-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
          Streaming
        </span>
      </div>

      {/* Asset Item Rows with Custom Oscillating Signal Sparklines */}
      <div className="space-y-2">
        {items.map((item) => {
          const gradId = `spark-grad-${item.id}`;
          const color = item.isUp ? '#00FF66' : '#FF0055';
          return (
            <div
              key={item.id}
              onClick={() => onSelectAsset && onSelectAsset(item)}
              className="p-3.5 rounded-2xl bg-dark-900/90 border border-dark-border hover:border-brand-cyan/40 transition-all flex items-center justify-between cursor-pointer group shadow-card"
            >
              {/* Left Column: Title & Symbol/Subtext */}
              <div className="space-y-0.5 max-w-[130px]">
                <h4 className="font-bold text-white text-xs group-hover:text-brand-cyan transition-colors truncate">
                  {item.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono truncate">
                  {item.symbol}
                </p>
              </div>

              {/* Middle Column: Signal Sparkline with Dashed Reference Baseline & Gradient Area Fill */}
              <div className="w-24 h-9 flex items-center justify-center relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 60 25">
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={color} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Dashed Reference Line (Baseline Signal) */}
                  <line
                    x1="15"
                    y1="11"
                    x2="60"
                    y2="11"
                    stroke={color}
                    strokeDasharray="3 3"
                    strokeWidth="1.2"
                    opacity="0.75"
                  />

                  {/* Gradient Area Fill Under Curve */}
                  <path
                    d={item.fillPath}
                    fill={`url(#${gradId})`}
                  />

                  {/* Top Oscillating Signal Stroke Line */}
                  <path
                    d={item.sparklinePath}
                    stroke={color}
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Right Column: Change % & Price */}
              <div className="text-right font-mono">
                <div className={`text-xs font-bold ${item.isUp ? 'text-brand-green' : 'text-brand-danger'}`}>
                  {item.changePct}
                </div>
                <div className="text-xs font-black text-white mt-0.5">
                  {item.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
