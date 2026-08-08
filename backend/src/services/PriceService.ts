export class PriceService {
  private priceCache: Map<string, { priceUsd: number; updatedAt: number }> = new Map();

  constructor() {
    this.priceCache.set('ETH', { priceUsd: 1944.79, updatedAt: Date.now() });
    this.priceCache.set('SOL', { priceUsd: 142.50, updatedAt: Date.now() });
    this.priceCache.set('KAITO', { priceUsd: 1.25, updatedAt: Date.now() });
    this.priceCache.set('BNB', { priceUsd: 575.69, updatedAt: Date.now() });
    this.priceCache.set('MATIC', { priceUsd: 0.70, updatedAt: Date.now() });
    this.priceCache.set('USDC', { priceUsd: 1.00, updatedAt: Date.now() });
  }

  public getPrice(symbol: string): number {
    const cached = this.priceCache.get(symbol.toUpperCase());
    return cached ? cached.priceUsd : 1.0;
  }

  public updatePrice(symbol: string, newPrice: number) {
    this.priceCache.set(symbol.toUpperCase(), { priceUsd: newPrice, updatedAt: Date.now() });
  }
}

export const priceService = new PriceService();
