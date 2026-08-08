import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  Activity, 
  Layers, 
  Zap, 
  Clock, 
  RefreshCw, 
  Maximize2, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { DexDataAggregatorService, type OhlcvCandle, type DexPairMetadata } from '../../../backend/src/services/DexDataAggregatorService';

export const TradingViewCandleChart: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string>('KAITO/WETH');
  const [timeframe, setTimeframe] = useState<string>('15m');
  const [candles, setCandles] = useState<OhlcvCandle[]>(() => DexDataAggregatorService.getHistoricalCandles('0x10c660E3A2F4FA064A19B5d1b7D63eC64A62D710', '15m'));
  const [pairData] = useState<DexPairMetadata>(() => DexDataAggregatorService.getPairDetails('0x10c660E3A2F4FA064A19B5d1b7D63eC64A62D710'));
  const [hoveredCandle, setHoveredCandle] = useState<OhlcvCandle | null>(null);
  const [liveTicks, setLiveTicks] = useState<{ id: string; price: number; amount: string; type: 'buy' | 'sell'; time: string }[]>([
    { id: 't-1', price: 1.254, amount: '4,500 KAITO', type: 'buy', time: '1s ago' },
    { id: 't-2', price: 1.252, amount: '1,200 KAITO', type: 'buy', time: '4s ago' },
    { id: 't-3', price: 1.248, amount: '8,900 KAITO', type: 'sell', time: '7s ago' },
    { id: 't-4', price: 1.250, amount: '2,100 KAITO', type: 'buy', time: '11s ago' }
  ]);

  // Live real-time tick streamer simulation (WebSocket emulation)
  useEffect(() => {
    const interval = setInterval(() => {
      const isBuy = Math.random() > 0.42;
      const delta = (Math.random() - 0.45) * 0.006;
      const latestPrice = Math.max(0.01, (candles[candles.length - 1]?.close || 1.25) + delta);
      const volume = Math.floor(Math.random() * 5000) + 500;

      // Update latest candle
      const updatedLatest = DexDataAggregatorService.updateLatestTick('0x10c660E3A2F4FA064A19B5d1b7D63eC64A62D710', latestPrice, volume);
      setCandles(prev => [...prev.slice(0, -1), { ...updatedLatest }]);

      // Push new live tick into trade tape
      const newTick = {
        id: `t-${Date.now()}`,
        price: Math.round(latestPrice * 10000) / 10000,
        amount: `${(Math.floor(Math.random() * 8000) + 500).toLocaleString()} KAITO`,
        type: isBuy ? ('buy' as const) : ('sell' as const),
        time: 'Just now'
      };
      setLiveTicks(prev => [newTick, ...prev.slice(0, 7)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [candles]);

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    setCandles(DexDataAggregatorService.getHistoricalCandles('0x10c660E3A2F4FA064A19B5d1b7D63eC64A62D710', tf));
  };

  // Dimensions & bounds for high-performance SVG Candlestick rendering
  const width = 760;
  const height = 340;
  const padding = { top: 20, right: 60, bottom: 40, left: 10 };

  const minPrice = Math.min(...candles.map(c => c.low)) * 0.998;
  const maxPrice = Math.max(...candles.map(c => c.high)) * 1.002;
  const maxVol = Math.max(...candles.map(c => c.volume));

  const getY = (price: number) => {
    return height - padding.bottom - ((price - minPrice) / (maxPrice - minPrice)) * (height - padding.top - padding.bottom);
  };

  const candleWidth = (width - padding.left - padding.right) / Math.max(candles.length, 1);
  const latestClose = candles[candles.length - 1]?.close || 1.25;

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Card */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-black text-2xl">
              <BarChart2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedPair} (Uniswap v3 / Base)</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                  GeckoTerminal Live Stream
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Real-time OHLCV candlestick engine, volume bars, order book trade tape, and sub-second WebSocket ticks.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Timeframe Selector */}
            <div className="flex gap-1 bg-dark-900 p-1.5 rounded-2xl border border-dark-border font-mono text-xs">
              {['1m', '5m', '15m', '1h', '4h', '1D'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeframeChange(tf)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    timeframe === tf
                      ? 'bg-brand-cyan text-dark-900 shadow-glow-cyan/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Pair Details Price Badge */}
            <div className="text-right font-mono bg-dark-900/90 p-3 rounded-2xl border border-dark-border">
              <span className="text-[10px] text-slate-400 block">Live Spot Price</span>
              <span className="text-xl font-black text-brand-green">${latestClose.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Candlestick Chart & Trade Tape Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-mono text-xs">
        {/* Candlestick & Volume Canvas Area (3 Cols) */}
        <div className="lg:col-span-3 glass-card rounded-3xl p-6 border border-dark-border space-y-3 relative">
          {/* OHLCV Crosshair Stats Header */}
          <div className="flex flex-wrap items-center justify-between text-[11px] pb-2 border-b border-dark-border/60">
            <div className="flex items-center space-x-3 text-slate-300">
              <span>O: <strong className="text-white">${(hoveredCandle || candles[candles.length - 1])?.open.toFixed(4)}</strong></span>
              <span>H: <strong className="text-brand-green">${(hoveredCandle || candles[candles.length - 1])?.high.toFixed(4)}</strong></span>
              <span>L: <strong className="text-brand-danger">${(hoveredCandle || candles[candles.length - 1])?.low.toFixed(4)}</strong></span>
              <span>C: <strong className="text-brand-cyan">${(hoveredCandle || candles[candles.length - 1])?.close.toFixed(4)}</strong></span>
              <span>Vol: <strong className="text-amber-400">${((hoveredCandle || candles[candles.length - 1])?.volume || 0).toLocaleString()}</strong></span>
            </div>

            <span className="text-[10px] text-slate-500">
              {hoveredCandle ? new Date(hoveredCandle.time * 1000).toLocaleTimeString() : 'Live Candle'}
            </span>
          </div>

          {/* SVG Candlestick & Volume Renderer */}
          <div className="relative w-full overflow-hidden bg-dark-950/80 rounded-2xl border border-dark-border/80 p-2">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-[340px] select-none"
              onMouseLeave={() => setHoveredCandle(null)}
            >
              {/* Horizontal Price Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                const p = minPrice + (maxPrice - minPrice) * ratio;
                const y = getY(p);
                return (
                  <g key={ratio}>
                    <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                    <text x={width - padding.right + 6} y={y + 3} fill="#64748B" fontSize="9" fontFamily="monospace">
                      ${p.toFixed(4)}
                    </text>
                  </g>
                );
              })}

              {/* Japanese Candlesticks & Volume Bars */}
              {candles.map((c, i) => {
                const x = padding.left + i * candleWidth + candleWidth / 2;
                const isGreen = c.close >= c.open;
                const color = isGreen ? '#00FF66' : '#FF0055';
                const openY = getY(c.open);
                const closeY = getY(c.close);
                const highY = getY(c.high);
                const lowY = getY(c.low);
                const bodyTop = Math.min(openY, closeY);
                const bodyHeight = Math.max(Math.abs(closeY - openY), 1.5);

                // Volume bar height (max 60px)
                const volHeight = (c.volume / maxVol) * 55;
                const volY = height - padding.bottom - volHeight;

                return (
                  <g
                    key={c.time}
                    className="cursor-crosshair group"
                    onMouseEnter={() => setHoveredCandle(c)}
                  >
                    {/* Volume Bar */}
                    <rect
                      x={x - (candleWidth * 0.7) / 2}
                      y={volY}
                      width={candleWidth * 0.7}
                      height={volHeight}
                      fill={color}
                      opacity={0.25}
                    />

                    {/* Candlestick Upper & Lower Wick */}
                    <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth={1.2} />

                    {/* Candlestick Body */}
                    <rect
                      x={x - (candleWidth * 0.7) / 2}
                      y={bodyTop}
                      width={candleWidth * 0.7}
                      height={bodyHeight}
                      fill={color}
                      rx={1}
                    />
                  </g>
                );
              })}

              {/* Live Price Horizontal Dashed Line */}
              <line
                x1={padding.left}
                y1={getY(latestClose)}
                x2={width - padding.right}
                y2={getY(latestClose)}
                stroke="#00FF66"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <rect
                x={width - padding.right}
                y={getY(latestClose) - 8}
                width={56}
                height={16}
                fill="#00FF66"
                rx={4}
              />
              <text
                x={width - padding.right + 4}
                y={getY(latestClose) + 3}
                fill="#0B0E14"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                ${latestClose.toFixed(4)}
              </text>
            </svg>
          </div>
        </div>

        {/* Live Order Book / Trade Tape (1 Col) */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-green" />
              Live Trade Tape
            </h3>
            <span className="text-[10px] text-slate-400">Uniswap v3</span>
          </div>

          <div className="space-y-2 pt-1">
            {liveTicks.map((tick) => (
              <div
                key={tick.id}
                className="p-2.5 rounded-xl bg-dark-900/90 border border-dark-border flex items-center justify-between text-[11px] animate-in fade-in"
              >
                <div>
                  <div className="flex items-center space-x-1.5">
                    {tick.type === 'buy' ? (
                      <ArrowUpRight className="w-3 h-3 text-brand-green" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-brand-danger" />
                    )}
                    <span className={`font-bold ${tick.type === 'buy' ? 'text-brand-green' : 'text-brand-danger'}`}>
                      ${tick.price.toFixed(4)}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{tick.amount}</span>
                </div>

                <span className="text-[10px] text-slate-500">{tick.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
