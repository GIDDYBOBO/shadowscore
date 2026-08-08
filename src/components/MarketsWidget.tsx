import React from 'react';
import { MoreHorizontal } from 'lucide-react';

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
  title = 'Markets',
  assets,
  onSelectAsset,
}) => {
  const defaultAssets: MarketAssetItem[] = [
    {
      id: 'm-1',
      name: 'ASX 200',
      symbol: 'XJO',
      subtext: 'Index Benchmark',
      price: '8,947.80',
      changePct: '+0.60%',
      isUp: true,
      sparklinePath: 'M 0 20 L 5 18 L 10 22 L 15 16 L 20 21 L 25 15 L 30 5 L 35 7 L 40 4 L 45 8 L 50 3 L 55 5 L 60 2',
      fillPath: 'M 0 20 L 5 18 L 10 22 L 15 16 L 20 21 L 25 15 L 30 5 L 35 7 L 40 4 L 45 8 L 50 3 L 55 5 L 60 2 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-2',
      name: 'XAO Index',
      symbol: 'XAO',
      subtext: 'All Ordinaries Index',
      price: '9,112.00',
      changePct: '+0.53%',
      isUp: true,
      sparklinePath: 'M 0 20 L 6 17 L 12 21 L 18 16 L 24 20 L 30 6 L 36 8 L 42 5 L 48 7 L 54 3 L 60 4',
      fillPath: 'M 0 20 L 6 17 L 12 21 L 18 16 L 24 20 L 30 6 L 36 8 L 42 5 L 48 7 L 54 3 L 60 4 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-3',
      name: 'AUD/USD',
      symbol: 'Australian Dollar/US Dollar',
      subtext: 'Forex Spot Pair',
      price: '0.696',
      changePct: '-0.36%',
      isUp: false,
      sparklinePath: 'M 0 5 L 6 8 L 10 4 L 14 12 L 18 8 L 22 18 L 26 15 L 32 24 L 38 19 L 44 23 L 50 20 L 55 24 L 60 22',
      fillPath: 'M 0 5 L 6 8 L 10 4 L 14 12 L 18 8 L 22 18 L 26 15 L 32 24 L 38 19 L 44 23 L 50 20 L 55 24 L 60 22 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-4',
      name: 'Gold',
      symbol: 'Gold Spot',
      subtext: 'Precious Metals',
      price: '4,028.60',
      changePct: '-1.19%',
      isUp: false,
      sparklinePath: 'M 0 4 L 8 10 L 14 7 L 20 16 L 26 13 L 32 21 L 38 18 L 44 23 L 50 20 L 60 24',
      fillPath: 'M 0 4 L 8 10 L 14 7 L 20 16 L 26 13 L 32 21 L 38 18 L 44 23 L 50 20 L 60 24 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-5',
      name: 'US Oil WTI',
      symbol: 'Crude Oil Futures',
      subtext: 'Dropping fast',
      price: '80.71',
      changePct: '-2.30%',
      isUp: false,
      sparklinePath: 'M 0 6 L 6 14 L 12 8 L 18 17 L 24 10 L 30 22 L 36 17 L 42 24 L 48 20 L 60 24',
      fillPath: 'M 0 6 L 6 14 L 12 8 L 18 17 L 24 10 L 30 22 L 36 17 L 42 24 L 48 20 L 60 24 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-6',
      name: 'ASX 100',
      symbol: 'XTO',
      subtext: 'Large Cap Index',
      price: '7,536.10',
      changePct: '+0.67%',
      isUp: true,
      sparklinePath: 'M 0 22 L 6 19 L 12 23 L 18 17 L 24 21 L 30 7 L 36 9 L 42 5 L 48 8 L 54 4 L 60 3',
      fillPath: 'M 0 22 L 6 19 L 12 23 L 18 17 L 24 21 L 30 7 L 36 9 L 42 5 L 48 8 L 54 4 L 60 3 L 60 25 L 0 25 Z'
    },
    {
      id: 'm-7',
      name: 'ASX Small Ord',
      symbol: 'XSO',
      subtext: 'Small Caps Index',
      price: '3,322.80',
      changePct: '-0.11%',
      isUp: false,
      sparklinePath: 'M 0 10 L 6 18 L 12 12 L 18 21 L 24 14 L 30 24 L 36 18 L 42 22 L 48 16 L 54 20 L 60 18',
      fillPath: 'M 0 10 L 6 18 L 12 12 L 18 21 L 24 14 L 30 24 L 36 18 L 42 22 L 48 16 L 54 20 L 60 18 L 60 25 L 0 25 Z'
    }
  ];

  const items = assets || defaultAssets;

  return (
    <div className="bg-[#1C1F26] border border-[#2D323E] rounded-3xl p-5 shadow-2xl font-sans space-y-4 max-w-md w-full">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-[#2D323E] pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-dark-800 border border-dark-border flex items-center justify-center text-base">
            📈
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
        </div>

        <button className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-dark-800 transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Asset Item Rows (Matching Attached Signal Image UI Line-For-Line) */}
      <div className="space-y-2">
        {items.map((item) => {
          const gradId = `spark-grad-${item.id}`;
          const color = item.isUp ? '#10B981' : '#F43F5E';
          return (
            <div
              key={item.id}
              onClick={() => onSelectAsset && onSelectAsset(item)}
              className="p-3.5 rounded-2xl bg-[#232730] border border-[#2E3340] hover:border-brand-cyan/40 transition-all flex items-center justify-between cursor-pointer group"
            >
              {/* Left Column: Title & Symbol/Subtext */}
              <div className="space-y-0.5 max-w-[130px]">
                <h4 className="font-bold text-white text-xs group-hover:text-brand-cyan transition-colors truncate">
                  {item.name}
                </h4>
                <p className={`text-[10px] truncate ${
                  item.subtext === 'Dropping fast' ? 'text-rose-400 font-semibold' : 'text-slate-400'
                }`}>
                  {item.subtext || item.symbol}
                </p>
              </div>

              {/* Middle Column: Custom Signal Sparkline with Dashed Reference Baseline & Gradient Area Fill */}
              <div className="w-20 h-9 flex items-center justify-center relative">
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
                <div className={`text-xs font-bold ${item.isUp ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
                  {item.changePct}
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
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
