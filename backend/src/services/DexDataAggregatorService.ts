export interface OhlcvCandle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface DexPairMetadata {
  id: string;
  pairAddress: string;
  pairSymbol: string;
  baseToken: { symbol: string; name: string; address: string };
  quoteToken: { symbol: string; name: string; address: string };
  dexName: string;
  chain: string;
  priceUsd: number;
  priceNative: number;
  volume24hUsd: number;
  liquidityUsd: number;
  fdvUsd: number;
  priceChange24h: number;
  txns24h: { buys: number; sells: number };
  icon: string;
}

export const KNOWN_DEX_PAIRS: DexPairMetadata[] = [
  {
    id: 'kaito-weth',
    pairAddress: '0x10c660E3A2F4FA064A19B5d1b7D63eC64A62D710',
    pairSymbol: 'KAITO / WETH',
    baseToken: { symbol: 'KAITO', name: 'Kaito AI Token', address: '0x10c6...d710' },
    quoteToken: { symbol: 'WETH', name: 'Wrapped Ether', address: '0x4200...0006' },
    dexName: 'Uniswap v3',
    chain: 'Base',
    priceUsd: 1.2540,
    priceNative: 0.000644,
    volume24hUsd: 12500000,
    liquidityUsd: 4850000,
    fdvUsd: 125000000,
    priceChange24h: 6.03,
    txns24h: { buys: 4821, sells: 2190 },
    icon: '🤖'
  },
  {
    id: 'eth-usdc',
    pairAddress: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
    pairSymbol: 'ETH / USDC',
    baseToken: { symbol: 'ETH', name: 'Ethereum', address: '0xc02a...a134' },
    quoteToken: { symbol: 'USDC', name: 'USD Coin', address: '0xa0b8...6eb48' },
    dexName: 'Uniswap v3',
    chain: 'Ethereum',
    priceUsd: 1944.79,
    priceNative: 1944.79,
    volume24hUsd: 1420000000,
    liquidityUsd: 285000000,
    fdvUsd: 235000000000,
    priceChange24h: 1.57,
    txns24h: { buys: 28400, sells: 19200 },
    icon: '🔷'
  },
  {
    id: 'sol-usdc',
    pairAddress: '7xKXtg2CW87d97TXJSDp5dThC47zD9j3Bw2uL9v9A5k6',
    pairSymbol: 'SOL / USDC',
    baseToken: { symbol: 'SOL', name: 'Solana', address: 'So1111...1112' },
    quoteToken: { symbol: 'USDC', name: 'USD Coin', address: 'EPjFWd...yv2' },
    dexName: 'Raydium V4',
    chain: 'Solana',
    priceUsd: 142.50,
    priceNative: 142.50,
    volume24hUsd: 850000000,
    liquidityUsd: 142000000,
    fdvUsd: 65000000000,
    priceChange24h: 3.80,
    txns24h: { buys: 48900, sells: 32100 },
    icon: '☀️'
  },
  {
    id: 'pepe-weth',
    pairAddress: '0xa43fe16908251ee70ef74718545e4fe6c5ccec9f',
    pairSymbol: 'PEPE / WETH',
    baseToken: { symbol: 'PEPE', name: 'Pepe', address: '0x6982...b6a9' },
    quoteToken: { symbol: 'WETH', name: 'Wrapped Ether', address: '0xc02a...a134' },
    dexName: 'Uniswap v3',
    chain: 'Ethereum',
    priceUsd: 0.00000854,
    priceNative: 0.00000000439,
    volume24hUsd: 84000000,
    liquidityUsd: 24500000,
    fdvUsd: 3600000000,
    priceChange24h: 4.80,
    txns24h: { buys: 12400, sells: 8900 },
    icon: '🐸'
  },
  {
    id: 'bonk-sol',
    pairAddress: 'CXLdQe7L18UepJj5yK5Jb8GqV91f86h38bK6n1A',
    pairSymbol: 'BONK / SOL',
    baseToken: { symbol: 'BONK', name: 'Bonk Dog Token', address: 'DezX...pump' },
    quoteToken: { symbol: 'SOL', name: 'Solana', address: 'So1111...1112' },
    dexName: 'Raydium V4',
    chain: 'Solana',
    priceUsd: 0.0000234,
    priceNative: 0.000000164,
    volume24hUsd: 120000000,
    liquidityUsd: 38500000,
    fdvUsd: 1850000000,
    priceChange24h: 8.40,
    txns24h: { buys: 19800, sells: 12400 },
    icon: '🐕'
  },
  {
    id: 'aero-weth',
    pairAddress: '0x6cDcb1C4A4D1C3C6d054b27AC5B77e89eAFb971d',
    pairSymbol: 'AERO / WETH',
    baseToken: { symbol: 'AERO', name: 'Aerodrome Finance', address: '0x9401...4223' },
    quoteToken: { symbol: 'WETH', name: 'Wrapped Ether', address: '0x4200...0006' },
    dexName: 'Aerodrome',
    chain: 'Base',
    priceUsd: 0.8500,
    priceNative: 0.000437,
    volume24hUsd: 45000000,
    liquidityUsd: 18500000,
    fdvUsd: 650000000,
    priceChange24h: 5.12,
    txns24h: { buys: 8400, sells: 4100 },
    icon: '✈️'
  },
  {
    id: 'degen-weth',
    pairAddress: '0xc9034c3e7fde0fb3c7348e3d6411f50a8c27cb6b',
    pairSymbol: 'DEGEN / WETH',
    baseToken: { symbol: 'DEGEN', name: 'Degen Base', address: '0x4ed4...780b' },
    quoteToken: { symbol: 'WETH', name: 'Wrapped Ether', address: '0x4200...0006' },
    dexName: 'Uniswap v3',
    chain: 'Base',
    priceUsd: 0.0125,
    priceNative: 0.00000642,
    volume24hUsd: 18500000,
    liquidityUsd: 6400000,
    fdvUsd: 125000000,
    priceChange24h: 12.40,
    txns24h: { buys: 14200, sells: 6800 },
    icon: '🎩'
  },
  {
    id: 'bnb-usdt',
    pairAddress: '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae',
    pairSymbol: 'BNB / USDT',
    baseToken: { symbol: 'BNB', name: 'BNB Chain Native', address: '0xbb4c...a803' },
    quoteToken: { symbol: 'USDT', name: 'Tether USD', address: '0x55d3...6a16' },
    dexName: 'PancakeSwap v3',
    chain: 'BNB Chain',
    priceUsd: 575.69,
    priceNative: 575.69,
    volume24hUsd: 480000000,
    liquidityUsd: 85000000,
    fdvUsd: 85000000000,
    priceChange24h: 0.38,
    txns24h: { buys: 18900, sells: 14200 },
    icon: '🟡'
  }
];

export class DexDataAggregatorService {
  private static candleCache: Map<string, OhlcvCandle[]> = new Map();

  public static getAllPairs(): DexPairMetadata[] {
    return KNOWN_DEX_PAIRS;
  }

  public static findPair(search: string): DexPairMetadata {
    const q = search.trim().toLowerCase();
    const found = KNOWN_DEX_PAIRS.find(
      p => p.pairSymbol.toLowerCase().includes(q) ||
           p.baseToken.symbol.toLowerCase() === q ||
           p.pairAddress.toLowerCase() === q ||
           p.chain.toLowerCase().includes(q)
    );

    if (found) return found;

    // Fallback dynamic pair definition if user types an unlisted custom address
    return {
      id: `custom-${q}`,
      pairAddress: search.startsWith('0x') ? search : `0x${search.slice(0, 10)}...custom`,
      pairSymbol: `${search.toUpperCase()} / USD`,
      baseToken: { symbol: search.toUpperCase(), name: `${search.toUpperCase()} Token`, address: '0x...custom' },
      quoteToken: { symbol: 'USDC', name: 'USD Coin', address: '0x...usdc' },
      dexName: 'Uniswap v3',
      chain: 'Multi-Chain',
      priceUsd: 1.00,
      priceNative: 0.000514,
      volume24hUsd: 1000000,
      liquidityUsd: 500000,
      fdvUsd: 10000000,
      priceChange24h: 2.50,
      txns24h: { buys: 500, sells: 300 },
      icon: '🪙'
    };
  }

  public static getHistoricalCandles(pairAddress: string, timeframe: string = '15m'): OhlcvCandle[] {
    const cacheKey = `${pairAddress}-${timeframe}`;
    if (this.candleCache.has(cacheKey)) {
      return this.candleCache.get(cacheKey)!;
    }

    const pair = this.findPair(pairAddress);
    const basePrice = pair.priceUsd > 0 ? pair.priceUsd : 1.25;
    const candles: OhlcvCandle[] = [];
    const nowSec = Math.floor(Date.now() / 1000);
    const intervalSec = timeframe === '1m' ? 60 : timeframe === '5m' ? 300 : timeframe === '15m' ? 900 : timeframe === '1h' ? 3600 : 86400;

    let currentClose = basePrice * 0.94;

    for (let i = 50; i >= 0; i--) {
      const time = nowSec - i * intervalSec;
      const change = (Math.random() - 0.48) * (basePrice * 0.02);
      const open = currentClose;
      const close = Math.max(0.0000001, open + change);
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.008);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.008);
      const volume = Math.floor(Math.random() * 45000) + 12000;

      candles.push({
        time,
        open: Math.round(open * 100000000) / 100000000,
        high: Math.round(high * 100000000) / 100000000,
        low: Math.round(low * 100000000) / 100000000,
        close: Math.round(close * 100000000) / 100000000,
        volume
      });

      currentClose = close;
    }

    this.candleCache.set(cacheKey, candles);
    return candles;
  }

  public static updateLatestTick(pairAddress: string, tradePrice: number, volume: number): OhlcvCandle {
    const candles = this.getHistoricalCandles(pairAddress, '15m');
    const latest = candles[candles.length - 1];

    latest.close = tradePrice;
    if (tradePrice > latest.high) latest.high = tradePrice;
    if (tradePrice < latest.low) latest.low = tradePrice;
    latest.volume += volume;

    return latest;
  }

  public static getPairDetails(pairAddress: string): DexPairMetadata {
    return this.findPair(pairAddress);
  }
}
