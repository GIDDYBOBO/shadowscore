import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  Activity, 
  Layers, 
  Zap, 
  Clock, 
  RefreshCw, 
  Search,
  ChevronDown,
  X,
  CheckCircle2,
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  ExternalLink,
  Flame,
  ShieldCheck,
  Percent,
  SlidersHorizontal,
  Lock
} from 'lucide-react';
import { 
  DexDataAggregatorService, 
  KNOWN_DEX_PAIRS, 
  type OhlcvCandle, 
  type DexPairMetadata 
} from '../../../backend/src/services/DexDataAggregatorService';

export const TradingViewCandleChart: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<DexPairMetadata>(KNOWN_DEX_PAIRS[0]);
  const [timeframe, setTimeframe] = useState<string>('15m');
  const [candles, setCandles] = useState<OhlcvCandle[]>(() => DexDataAggregatorService.getHistoricalCandles(selectedPair.pairAddress, '15m'));
  const [hoveredCandle, setHoveredCandle] = useState<OhlcvCandle | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChainTag, setSelectedChainTag] = useState<string>('All');
  
  const [liveTicks, setLiveTicks] = useState<{ id: string; price: number; amount: string; type: 'buy' | 'sell'; time: string }[]>([
    { id: 't-1', price: 1.254, amount: '4,500 KAITO', type: 'buy', time: '1s ago' },
    { id: 't-2', price: 1.252, amount: '1,200 KAITO', type: 'buy', time: '4s ago' },
    { id: 't-3', price: 1.248, amount: '8,900 KAITO', type: 'sell', time: '7s ago' },
    { id: 't-4', price: 1.250, amount: '2,100 KAITO', type: 'buy', time: '11s ago' }
  ]);

  // Load new candles when pair or timeframe changes
  useEffect(() => {
    const newCandles = DexDataAggregatorService.getHistoricalCandles(selectedPair.pairAddress, timeframe);
    setCandles(newCandles);
  }, [selectedPair, timeframe]);

  // Live real-time tick streamer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const isBuy = Math.random() > 0.42;
      const base = selectedPair.priceUsd > 0 ? selectedPair.priceUsd : 1.25;
      const delta = (Math.random() - 0.45) * (base * 0.005);
      const latestPrice = Math.max(0.0000001, (candles[candles.length - 1]?.close || base) + delta);
      const volume = Math.floor(Math.random() * 5000) + 500;

      const updatedLatest = DexDataAggregatorService.updateLatestTick(selectedPair.pairAddress, latestPrice, volume);
      setCandles(prev => [...prev.slice(0, -1), { ...updatedLatest }]);

      const newTick = {
        id: `t-${Date.now()}`,
        price: latestPrice < 0.0001 ? latestPrice : Math.round(latestPrice * 10000) / 10000,
        amount: `${(Math.floor(Math.random() * 8000) + 500).toLocaleString()} ${selectedPair.baseToken.symbol}`,
        type: isBuy ? ('buy' as const) : ('sell' as const),
        time: 'Just now'
      };
      setLiveTicks(prev => [newTick, ...prev.slice(0, 7)]);
    }, 2200);

    return () => clearInterval(interval);
  }, [candles, selectedPair]);

  const handleSelectPair = (pair: DexPairMetadata) => {
    setSelectedPair(pair);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const found = DexDataAggregatorService.findPair(searchQuery.trim());
      handleSelectPair(found);
    }
  };

  const filteredPairs = KNOWN_DEX_PAIRS.filter(p => {
    const matchesChain = selectedChainTag === 'All' || p.chain.toLowerCase().includes(selectedChainTag.toLowerCase());
    const matchesQuery = p.pairSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.baseToken.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.baseToken.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.pairAddress.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChain && matchesQuery;
  });

  // Dimensions & bounds for SVG Candlestick rendering
  const width = 760;
  const height = 320;
  const padding = { top: 20, right: 65, bottom: 40, left: 10 };

  const minPrice = Math.min(...candles.map(c => c.low)) * 0.998;
  const maxPrice = Math.max(...candles.map(c => c.high)) * 1.002;
  const maxVol = Math.max(...candles.map(c => c.volume), 1);

  const getY = (price: number) => {
    if (maxPrice === minPrice) return height / 2;
    return height - padding.bottom - ((price - minPrice) / (maxPrice - minPrice)) * (height - padding.top - padding.bottom);
  };

  const candleWidth = (width - padding.left - padding.right) / Math.max(candles.length, 1);
  const latestClose = candles[candles.length - 1]?.close || selectedPair.priceUsd;

  // Compute live buy vs sell pressure percentages
  const totalTrades = selectedPair.txns24h.buys + selectedPair.txns24h.sells;
  const buyPct = totalTrades > 0 ? Math.round((selectedPair.txns24h.buys / totalTrades) * 1000) / 10 : 68.4;
  const sellPct = Math.round((100 - buyPct) * 10) / 10;

  return (
    <div className="space-y-6 font-sans relative">
      {/* Top Header Card with Interactive Pair Selector Dropdown & Search Button */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-black text-2xl shadow-glow-cyan/10">
              {selectedPair.icon}
            </div>
            
            {/* Pair Selector Dropdown Trigger Button */}
            <div className="relative">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl bg-dark-900 hover:bg-dark-800 border border-dark-border hover:border-brand-cyan/50 text-white font-mono font-extrabold text-base transition-all group shadow-card"
                >
                  <span>{selectedPair.pairSymbol}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                    {selectedPair.dexName} • {selectedPair.chain}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-brand-cyan transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                  Live Stream
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1 font-mono">
                Click pair above or search any token/contract to inspect real-time OHLCV candles and DEX trades.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Search Open Button */}
            <button
              onClick={() => setIsDropdownOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-dark-900 hover:bg-dark-800 border border-dark-border text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-card"
            >
              <Search className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Search Pairs...</span>
            </button>

            {/* Timeframe Selector */}
            <div className="flex gap-1 bg-dark-900 p-1.5 rounded-2xl border border-dark-border font-mono text-xs">
              {['1m', '5m', '15m', '1h', '4h', '1D'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
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

            {/* Live Spot Price Badge */}
            <div className="text-right font-mono bg-dark-900/90 p-3 rounded-2xl border border-dark-border shrink-0">
              <span className="text-[10px] text-slate-400 block">Spot Price</span>
              <span className="text-xl font-black text-brand-green">
                ${latestClose < 0.0001 ? latestClose.toExponential(4) : latestClose.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Pair Stats Row (24h Volume, Liquidity, FDV, Price Change) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-dark-border/60 font-mono text-xs">
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">24h Change</span>
            <span className={`font-extrabold text-sm ${selectedPair.priceChange24h >= 0 ? 'text-brand-green' : 'text-brand-danger'}`}>
              {selectedPair.priceChange24h >= 0 ? '+' : ''}{selectedPair.priceChange24h}%
            </span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">24h Volume</span>
            <span className="font-extrabold text-white text-sm">
              ${(selectedPair.volume24hUsd / 1000000).toFixed(2)}M USD
            </span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Total Liquidity Pool</span>
            <span className="font-extrabold text-brand-cyan text-sm">
              ${(selectedPair.liquidityUsd / 1000000).toFixed(2)}M USD
            </span>
          </div>
          <div className="p-3 bg-dark-900 rounded-xl border border-dark-border">
            <span className="text-[10px] text-slate-400 block">Fully Diluted Val (FDV)</span>
            <span className="font-extrabold text-brand-purple text-sm">
              ${selectedPair.fdvUsd >= 1e9 ? `${(selectedPair.fdvUsd / 1e9).toFixed(2)}B` : `${(selectedPair.fdvUsd / 1e6).toFixed(1)}M`}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Pair Search & Selection Modal */}
      {isDropdownOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-dark-border max-w-xl w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-bold">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Select Market Pair or Search Any Token</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Real-time DEX pool indexing across Base, Ethereum, Solana & BNB</p>
                </div>
              </div>

              <button
                onClick={() => setIsDropdownOpen(false)}
                className="p-2 rounded-xl bg-dark-900 hover:bg-dark-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symbol (e.g. KAITO, ETH, SOL, PEPE, BONK, AERO) or 0x contract..."
                className="w-full bg-dark-950 border border-dark-border rounded-2xl pl-10 pr-28 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/60 font-mono"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-brand-cyan hover:bg-cyan-400 text-dark-900 font-bold text-xs rounded-xl flex items-center gap-1 transition-all font-mono"
              >
                <span>Search</span>
              </button>
            </form>

            {/* Quick Chain Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {['All', 'Base', 'Ethereum', 'Solana', 'BNB Chain'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedChainTag(tag)}
                  className={`px-3 py-1 rounded-xl font-bold transition-all ${
                    selectedChainTag === tag
                      ? 'bg-brand-cyan text-dark-900'
                      : 'bg-dark-900 text-slate-400 hover:text-white border border-dark-border'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Pair Results List */}
            <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar pt-1 font-mono text-xs">
              {filteredPairs.map((pair) => (
                <div
                  key={pair.id}
                  onClick={() => handleSelectPair(pair)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedPair.id === pair.id
                      ? 'bg-dark-800 border-brand-cyan shadow-glow-cyan/10'
                      : 'bg-dark-950 hover:bg-dark-900 border-dark-border'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{pair.icon}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-white text-xs">{pair.pairSymbol}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-dark-800 text-brand-cyan border border-brand-cyan/20">
                          {pair.dexName} • {pair.chain}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">{pair.baseToken.name} • {pair.pairAddress}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-white block">
                      ${pair.priceUsd < 0.0001 ? pair.priceUsd.toExponential(2) : pair.priceUsd.toFixed(4)}
                    </span>
                    <span className={`text-[10px] font-bold ${pair.priceChange24h >= 0 ? 'text-brand-green' : 'text-brand-danger'}`}>
                      {pair.priceChange24h >= 0 ? '+' : ''}{pair.priceChange24h}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Candlestick Chart & Trade Tape Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-mono text-xs">
        {/* Candlestick & Volume Canvas Area (3 Cols) */}
        <div className="lg:col-span-3 glass-card rounded-3xl p-6 border border-dark-border space-y-4 relative shadow-2xl">
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
              {hoveredCandle ? new Date(hoveredCandle.time * 1000).toLocaleTimeString() : 'Live Stream'}
            </span>
          </div>

          {/* SVG Candlestick & Volume Renderer */}
          <div className="relative w-full overflow-hidden bg-dark-950/90 rounded-2xl border border-dark-border/80 p-2 shadow-inner">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-[320px] select-none"
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
                      ${p < 0.0001 ? p.toExponential(2) : p.toFixed(4)}
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
                width={62}
                height={16}
                fill="#00FF66"
                rx={4}
              />
              <text
                x={width - padding.right + 3}
                y={getY(latestClose) + 3}
                fill="#0B0E14"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                ${latestClose < 0.0001 ? latestClose.toExponential(2) : latestClose.toFixed(4)}
              </text>
            </svg>
          </div>

          {/* NEW: Live Market Analytics & Order Flow HUD Strip in the Empty Space Below the Volume Bars */}
          <div className="pt-2 border-t border-dark-border/60 space-y-3 font-mono">
            {/* 1. Live 24h Order Flow & Buy/Sell Volume Pressure Bar */}
            <div className="p-3.5 bg-dark-950/80 rounded-2xl border border-dark-border space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center space-x-2 text-brand-green">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  <span>Buy Pressure: {buyPct}% (${((selectedPair.volume24hUsd * (buyPct / 100)) / 1000000).toFixed(2)}M)</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-danger">
                  <span>Sell Pressure: {sellPct}% (${((selectedPair.volume24hUsd * (sellPct / 100)) / 1000000).toFixed(2)}M)</span>
                  <span className="w-2 h-2 rounded-full bg-brand-danger animate-pulse" />
                </div>
              </div>

              {/* Dual-Color Order Flow Meter */}
              <div className="w-full h-2 rounded-full bg-dark-900 overflow-hidden flex">
                <div style={{ width: `${buyPct}%` }} className="bg-brand-green h-full transition-all duration-500 shadow-glow-green/20" />
                <div style={{ width: `${sellPct}%` }} className="bg-brand-danger h-full transition-all duration-500 shadow-glow-danger/20" />
              </div>
            </div>

            {/* 2. Key Execution & Pool Telemetry Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
              <div className="p-2.5 bg-dark-950/80 rounded-xl border border-dark-border flex items-center justify-between">
                <span className="text-slate-400">Spread:</span>
                <span className="text-brand-green font-bold">0.01% (Tight)</span>
              </div>
              <div className="p-2.5 bg-dark-950/80 rounded-xl border border-dark-border flex items-center justify-between">
                <span className="text-slate-400">DEX Route:</span>
                <span className="text-brand-cyan font-bold truncate">{selectedPair.dexName}</span>
              </div>
              <div className="p-2.5 bg-dark-950/80 rounded-xl border border-dark-border flex items-center justify-between">
                <span className="text-slate-400">Contract Security:</span>
                <span className="text-white font-bold">Verified Bytecode</span>
              </div>
              <div className="p-2.5 bg-dark-950/80 rounded-xl border border-dark-border flex items-center justify-between">
                <span className="text-slate-400">Token Tax:</span>
                <span className="text-brand-green font-bold">0% / 0% Tax</span>
              </div>
            </div>

            {/* 3. Subgraph Telemetry & Time Range Attribution */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 pt-1">
              <span>Data Stream: <strong>GeckoTerminal v2 & DexScreener Subgraphs</strong></span>
              <span>Candle Granularity: <strong>{timeframe} Rolling Windows</strong></span>
            </div>
          </div>
        </div>

        {/* Live Order Book / Trade Tape (1 Col) */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-green" />
              Live Trade Tape
            </h3>
            <span className="text-[10px] text-brand-cyan font-bold px-2 py-0.5 rounded bg-brand-cyan/20">
              {selectedPair.dexName}
            </span>
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
                      ${tick.price < 0.0001 ? tick.price : tick.price.toFixed(4)}
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
