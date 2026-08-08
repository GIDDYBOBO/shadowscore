-- CreateTable: wallet_nfts
CREATE TABLE "wallet_nfts" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "collectionName" TEXT NOT NULL,
    "tokenType" "TokenType" NOT NULL,
    "chainType" "ChainType" NOT NULL,
    "imageUrl" TEXT,
    "rarityRank" INTEGER,
    "rarityTier" TEXT,
    "estimatedFloorEth" DECIMAL(36,18) NOT NULL,
    "estimatedFloorUsd" DECIMAL(18,2) NOT NULL,
    "currentFloorPrice" DECIMAL(18,2) NOT NULL,
    "lastPurchasePrice" DECIMAL(18,2),
    "lastPurchaseDate" TIMESTAMP(3),
    "lastSalePrice" DECIMAL(18,2),
    "lastSaleDate" TIMESTAMP(3),
    "avgPurchasePrice" DECIMAL(18,2),
    "pnlUsd" DECIMAL(18,2),
    "pnlPercentage" DECIMAL(6,2),
    "marketplace" TEXT NOT NULL DEFAULT 'OpenSea',
    "transferHistory" JSONB NOT NULL DEFAULT '[]',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_nfts_pkey" PRIMARY KEY ("id")
);

-- Unique and Query Indexes
CREATE UNIQUE INDEX "wallet_nfts_contractAddress_tokenId_walletAddress_key" ON "wallet_nfts"("contractAddress", "tokenId", "walletAddress");
CREATE INDEX "wallet_nfts_walletAddress_estimatedFloorUsd_idx" ON "wallet_nfts"("walletAddress", "estimatedFloorUsd" DESC);
CREATE INDEX "wallet_nfts_collectionName_idx" ON "wallet_nfts"("collectionName");
CREATE INDEX "wallet_nfts_chainType_idx" ON "wallet_nfts"("chainType");
