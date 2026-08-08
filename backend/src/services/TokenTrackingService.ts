export interface TokenTelemetry {
  address: string;
  symbol: string;
  name: string;
  chainName: string;
  decimals: number;
  logo: string;
  priceUsd: number;
  marketCapUsd: number;
  fdvUsd: number;
  liquidityUsd: number;
  holdersCount: number;
  transfersCount: number;
  circulatingSupply: number;
  volume24hUsd: number;
  buyVolume24hUsd: number;
  sellVolume24hUsd: number;
  priceChange24h: number;
  largestHolders: { rank: number; address: string; percentage: number; valueUsd: number }[];
  newHolders24h: { address: string; firstSeen: string; amount: number }[];
  priceHistory: { time: string; price: number }[];
}

export class TokenTrackingService {
  private tokens: Map<string, TokenTelemetry> = new Map();

  constructor() {
    this.seedTokens();
  }

  private seedTokens() {
    const initialList: TokenTelemetry[] = [
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        symbol: 'ETH',
        name: 'Ethereum Native',
        chainName: 'Ethereum',
        decimals: 18,
        logo: '🔷',
        priceUsd: 1944.79,
        marketCapUsd: 234120000000,
        fdvUsd: 234120000000,
        liquidityUsd: 4850000000,
        holdersCount: 1824000,
        transfersCount: 45000000,
        circulatingSupply: 120400000,
        volume24hUsd: 14200000000,
        buyVolume24hUsd: 7800000000,
        sellVolume24hUsd: 6400000000,
        priceChange24h: 2.15,
        largestHolders: [
          { rank: 1, address: '0x00000000219ab540356cbb839cbe05303d7705fa', percentage: 28.5, valueUsd: 66700000000 },
          { rank: 2, address: '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8', percentage: 4.2, valueUsd: 9830000000 },
          { rank: 3, address: '0xda9df8246f53dda149ee6479a32c253fc2453c51', percentage: 2.8, valueUsd: 6550000000 }
        ],
        newHolders24h: [
          { address: '0x4f8...91a2', firstSeen: '10m ago', amount: 4.5 },
          { address: '0x992...31aa', firstSeen: '25m ago', amount: 12.0 }
        ],
        priceHistory: [
          { time: '00:00', price: 1910 },
          { time: '06:00', price: 1925 },
          { time: '12:00', price: 1940 },
          { time: 'Now', price: 1944.79 }
        ]
      },
      {
        address: '0x163f8c2467924be0ae7b5347228cabf26043f752',
        symbol: 'KAITO',
        name: 'Kaito AI',
        chainName: 'Base',
        decimals: 18,
        logo: '🤖',
        priceUsd: 1.25,
        marketCapUsd: 125000000,
        fdvUsd: 250000000,
        liquidityUsd: 18400000,
        holdersCount: 42800,
        transfersCount: 380000,
        circulatingSupply: 100000000,
        volume24hUsd: 12500000,
        buyVolume24hUsd: 7200000,
        sellVolume24hUsd: 5300000,
        priceChange24h: 6.03,
        largestHolders: [
          { rank: 1, address: '0x68b3...721e (Uniswap Pool)', percentage: 14.5, valueUsd: 18125000 },
          { rank: 2, address: '0x12a8...4490 (Treasury)', percentage: 20.0, valueUsd: 25000000 }
        ],
        newHolders24h: [
          { address: '0x881...19a0', firstSeen: '4m ago', amount: 1500 }
        ],
        priceHistory: [
          { time: '00:00', price: 1.18 },
          { time: '06:00', price: 1.22 },
          { time: '12:00', price: 1.24 },
          { time: 'Now', price: 1.25 }
        ]
      },
      {
        address: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
        symbol: 'PEPE',
        name: 'Pepe Meme Token',
        chainName: 'Ethereum',
        decimals: 18,
        logo: '🐸',
        priceUsd: 0.0000085,
        marketCapUsd: 3570000000,
        fdvUsd: 3570000000,
        liquidityUsd: 142000000,
        holdersCount: 310000,
        transfersCount: 4200000,
        circulatingSupply: 420690000000000,
        volume24hUsd: 840000000,
        buyVolume24hUsd: 460000000,
        sellVolume24hUsd: 380000000,
        priceChange24h: 4.80,
        largestHolders: [
          { rank: 1, address: '0x28c6c06298d514db089934071355e5743bf21d60', percentage: 6.8, valueUsd: 242000000 }
        ],
        newHolders24h: [
          { address: '0x71c...00b4', firstSeen: '2m ago', amount: 50000000 }
        ],
        priceHistory: [
          { time: '00:00', price: 0.0000081 },
          { time: '12:00', price: 0.0000084 },
          { time: 'Now', price: 0.0000085 }
        ]
      }
    ];

    initialList.forEach((tok) => {
      this.tokens.set(tok.symbol.toUpperCase(), tok);
      this.tokens.set(tok.address.toLowerCase(), tok);
    });
  }

  public getToken(identifier: string): TokenTelemetry | null {
    return this.tokens.get(identifier.toUpperCase()) || this.tokens.get(identifier.toLowerCase()) || null;
  }

  public getAllTokens(): TokenTelemetry[] {
    const seen = new Set<string>();
    const list: TokenTelemetry[] = [];
    for (const tok of this.tokens.values()) {
      if (!seen.has(tok.symbol)) {
        seen.add(tok.symbol);
        list.push(tok);
      }
    }
    return list;
  }
}

export const tokenTrackingService = new TokenTrackingService();
