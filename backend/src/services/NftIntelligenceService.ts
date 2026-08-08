export interface WalletNftTelemetry {
  id: string;
  contractAddress: string;
  tokenId: string;
  collectionName: string;
  tokenType: 'ERC721' | 'ERC1155' | 'METAPLEX_NFT';
  chainType: 'Ethereum' | 'Base' | 'Polygon' | 'Solana';
  imageUrl: string;
  rarityRank?: number;
  rarityTier?: 'Mythic' | 'Legendary' | 'Rare' | 'Common';
  estimatedFloorEth: number;
  estimatedFloorUsd: number;
  currentFloorPrice: number;
  lastPurchasePrice: number;
  lastPurchaseDate: string;
  lastSalePrice?: number;
  avgPurchasePrice: number;
  pnlUsd: number;
  pnlPercentage: number;
  marketplace: 'OpenSea' | 'Blur' | 'Magic Eden';
  transferHistory: { from: string; to: string; priceEth: number; date: string; marketplace: string }[];
}

export class NftIntelligenceService {
  public static async getWalletNfts(walletAddress: string, ethPriceUsd: number = 1944.79): Promise<WalletNftTelemetry[]> {
    const isSolana = walletAddress.toLowerCase().includes('sol') || walletAddress.length === 44;

    if (isSolana) {
      return [
        {
          id: 'sol-nft-1',
          contractAddress: 'MadLads111111111111111111111111111111111111',
          tokenId: '#4821',
          collectionName: 'Mad Lads Solana',
          tokenType: 'METAPLEX_NFT',
          chainType: 'Solana',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop',
          rarityRank: 142,
          rarityTier: 'Legendary',
          estimatedFloorEth: 0,
          estimatedFloorUsd: 1420.00,
          currentFloorPrice: 1420.00,
          lastPurchasePrice: 850.00,
          lastPurchaseDate: '45 days ago',
          avgPurchasePrice: 850.00,
          pnlUsd: 570.00,
          pnlPercentage: 67.05,
          marketplace: 'Magic Eden',
          transferHistory: [
            { from: 'TreasuryPool', to: walletAddress, priceEth: 0, date: '45d ago', marketplace: 'Magic Eden' }
          ]
        }
      ];
    }

    // Default EVM NFT portfolio (Bored Ape, Pudgy Penguins, ShadowGuard Pass)
    return [
      {
        id: 'evm-nft-1',
        contractAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        tokenId: '#7420',
        collectionName: 'Bored Ape Yacht Club',
        tokenType: 'ERC721',
        chainType: 'Ethereum',
        imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=300&auto=format&fit=crop',
        rarityRank: 312,
        rarityTier: 'Mythic',
        estimatedFloorEth: 11.45,
        estimatedFloorUsd: Math.round(11.45 * ethPriceUsd),
        currentFloorPrice: 22267.00,
        lastPurchasePrice: 16800.00,
        lastPurchaseDate: '120 days ago',
        avgPurchasePrice: 16800.00,
        pnlUsd: 5467.00,
        pnlPercentage: 32.54,
        marketplace: 'OpenSea',
        transferHistory: [
          { from: '0x881...91a2', to: walletAddress, priceEth: 9.2, date: '120d ago', marketplace: 'OpenSea' },
          { from: '0x111...44a9', to: '0x881...91a2', priceEth: 8.5, date: '210d ago', marketplace: 'Blur' }
        ]
      },
      {
        id: 'evm-nft-2',
        contractAddress: '0x524cab2ec69124574072678e1b6976be466107ae',
        tokenId: '#1892',
        collectionName: 'Pudgy Penguins',
        tokenType: 'ERC721',
        chainType: 'Ethereum',
        imageUrl: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=300&auto=format&fit=crop',
        rarityRank: 840,
        rarityTier: 'Rare',
        estimatedFloorEth: 9.80,
        estimatedFloorUsd: Math.round(9.80 * ethPriceUsd),
        currentFloorPrice: 19058.00,
        lastPurchasePrice: 11200.00,
        lastPurchaseDate: '60 days ago',
        avgPurchasePrice: 11200.00,
        pnlUsd: 7858.00,
        pnlPercentage: 70.16,
        marketplace: 'Blur',
        transferHistory: [
          { from: '0x334...01bb', to: walletAddress, priceEth: 6.2, date: '60d ago', marketplace: 'Blur' }
        ]
      },
      {
        id: 'evm-nft-3',
        contractAddress: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
        tokenId: '#409',
        collectionName: 'ShadowScore Genesis Pass',
        tokenType: 'ERC1155',
        chainType: 'Base',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop',
        rarityRank: 42,
        rarityTier: 'Mythic',
        estimatedFloorEth: 0.85,
        estimatedFloorUsd: Math.round(0.85 * ethPriceUsd),
        currentFloorPrice: 1653.00,
        lastPurchasePrice: 800.00,
        lastPurchaseDate: '15 days ago',
        avgPurchasePrice: 800.00,
        pnlUsd: 853.00,
        pnlPercentage: 106.62,
        marketplace: 'OpenSea',
        transferHistory: [
          { from: 'ShadowScore Minter', to: walletAddress, priceEth: 0.45, date: '15d ago', marketplace: 'OpenSea' }
        ]
      }
    ];
  }
}
