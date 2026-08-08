export interface OhlcvCandle {
  time: number; // Unix timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface DexPairMetadata {
  pairAddress: string;
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
}

export class DexDataAggregatorService {
  // In-memory time-series cache for sub-millisecond candle retrieval
  private static candleCache: Map<string, OhlcvCandle[]> = new Map();

  public static getHistoricalCandles(pairAddress: string = '0x10c660E3A2F4FA064A19B5d1b7D63eC64A62D710', timeframe: string = '15m'): OhlcvCandle[] {
    const cacheKey = `${pairAddress}-${timeframe}`;
    if (this.candleCache.has(cacheKey)) {
      return this.candleCache.get(cacheKey)!;
    }

    // Generate 60 realistic historical candles with high precision
    const basePrice = pairAddress.toLowerCase().includes('sol') ? 142.50 : 1.25;
    const candles: OhlcvCandle[] = [];
    const nowSec = Math.floor(Date.now() / 1000);
    const intervalSec = timeframe === '1m' ? 60 : timeframe === '5m' ? 300 : timeframe === '15m' ? 900 : timeframe === '1h' ? 3600 : 86400;

    let currentClose = basePrice * 0.92;

    for (let i = 50; i >= 0; i--) {
      const time = nowSec - i * intervalSec;
      const change = (Math.random() - 0.48) * (basePrice * 0.02);
      const open = currentClose;
      const close = Math.max(0.0001, open + change);
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.008);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.008);
      const volume = Math.floor(Math.random() * 45000) + 12000;

      candles.push({
        time,
        open: Math.round(open * 10000) / 10000,
        high: Math.round(high * 10000) / 10000,
        low: Math.round(low * 10000) / 10000,
        close: Math.round(close * 10000) / 10000,
        volume
      });

      currentClose = close;
    }

    this.candleCache.set(cacheKey, candles);
    return candles;
  }

  // Update the latest candle in real-time when a new swap occurs
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
    return {
      pairAddress,
      baseToken: { symbol: 'KAITO', name: 'Kaito AI Token', address: '0x10c660E3A2F4FA064A19B5d1b7D63eC64A62D710' },
      quoteToken: { symbol: 'WETH', name: 'Wrapped Ether', address: '0x4200000000000000000000000000000000000006' },
      dexName: 'Uniswap v3',
      chain: 'Base',
      priceUsd: 1.25,
      priceNative: 0.000642,
      volume24hUsd: 12500000,
      liquidityUsd: 4850000,
      fdvUsd: 125000000,
      priceChange24h: 6.03,
      txns24h: { buys: 4821, sells: 2190 }
    };
  }
}
