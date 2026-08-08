export interface DashboardWidgetPayload {
  trendingTokens: { symbol: string; price: number; change24h: number; volumeUsd: number; logo: string }[];
  trendingWallets: { address: string; ens?: string; score: number; netWorthUsd: number; tier: string }[];
  trendingNfts: { collection: string; floorPriceUsd: number; change24h: number; salesCount: number }[];
  highestReputation: { rank: number; address: string; score: number; grade: string }[];
  newestWallets: { address: string; ageHours: number; firstTx: string }[];
  recentSwaps: { route: string; usdValue: number; dex: string; time: string }[];
  recentNftPurchases: { collection: string; tokenId: string; priceUsd: number; marketplace: string }[];
  topGainers: { symbol: string; change24h: number; price: number }[];
  topLosers: { symbol: string; change24h: number; price: number }[];
  largestTransfers: { from: string; to: string; amountUsd: number; token: string }[];
}

export class RealtimeDashboardWidgetService {
  public static getDashboardWidgets(): DashboardWidgetPayload {
    return {
      trendingTokens: [
        { symbol: 'KAITO', price: 1.25, change24h: 6.03, volumeUsd: 12500000, logo: '🤖' },
        { symbol: 'ETH', price: 1944.79, change24h: 2.15, volumeUsd: 14200000000, logo: '🔷' },
        { symbol: 'SOL', price: 142.50, change24h: 3.80, volumeUsd: 3800000000, logo: '☀️' },
        { symbol: 'PEPE', price: 0.0000085, change24h: 4.80, volumeUsd: 840000000, logo: '🐸' }
      ],
      trendingWallets: [
        { address: '0xd8da...6045', ens: 'vitalik.eth', score: 98, netWorthUsd: 485000000, tier: 'AAA+' },
        { address: '0x1111...097d', ens: '1inch-treasury.eth', score: 95, netWorthUsd: 128000000, tier: 'AAA+' },
        { address: '0x9928...31aa', ens: 'alpha-whale.eth', score: 92, netWorthUsd: 45650, tier: 'AAA+' }
      ],
      trendingNfts: [
        { collection: 'Bored Ape Yacht Club', floorPriceUsd: 22267.00, change24h: 5.2, salesCount: 14 },
        { collection: 'Pudgy Penguins', floorPriceUsd: 19058.00, change24h: 3.1, salesCount: 22 },
        { collection: 'Mad Lads Solana', floorPriceUsd: 1420.00, change24h: 8.4, salesCount: 48 }
      ],
      highestReputation: [
        { rank: 1, address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', score: 98, grade: 'AAA+' },
        { rank: 2, address: '0x1111111254fb6c44bac0bed2854e76f90643097d', score: 95, grade: 'AAA+' },
        { rank: 3, address: '0x992864C61F80ef7483B8e0404C74966606cf31AA', score: 92, grade: 'AAA+' }
      ],
      newestWallets: [
        { address: '0x884...19f2', ageHours: 2, firstTx: 'Base Bridge' },
        { address: '0x44a...01bb', ageHours: 5, firstTx: 'Uniswap v3 Mint' }
      ],
      recentSwaps: [
        { route: 'ETH ➔ USDC', usdValue: 2819.95, dex: 'Uniswap v3', time: 'Just now' },
        { route: 'SOL ➔ BONK', usdValue: 1420.00, dex: 'Raydium V4', time: '4s ago' },
        { route: 'KAITO ➔ ETH', usdValue: 850.00, dex: 'Aerodrome', time: '8s ago' }
      ],
      recentNftPurchases: [
        { collection: 'Pudgy Penguins', tokenId: '#1892', priceUsd: 19058.00, marketplace: 'Blur' },
        { collection: 'Mad Lads', tokenId: '#4821', priceUsd: 1420.00, marketplace: 'Magic Eden' }
      ],
      topGainers: [
        { symbol: 'KAITO', change24h: 6.03, price: 1.25 },
        { symbol: 'PEPE', change24h: 4.80, price: 0.0000085 },
        { symbol: 'SOL', change24h: 3.80, price: 142.50 }
      ],
      topLosers: [
        { symbol: 'DOGE', change24h: -2.15, price: 0.12 },
        { symbol: 'SHIB', change24h: -1.80, price: 0.000018 }
      ],
      largestTransfers: [
        { from: '0x28c...1d60', to: '0x68b...721e', amountUsd: 4500000, token: 'USDC' },
        { from: '0xbe0...33e8', to: 'Binance Hot Wallet', amountUsd: 3200000, token: 'ETH' }
      ]
    };
  }
}
