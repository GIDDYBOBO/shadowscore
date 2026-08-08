-- CreateTable: tokens
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL DEFAULT 18,
    "logoUrl" TEXT,
    "priceUsd" DECIMAL(18,8) NOT NULL,
    "marketCapUsd" DECIMAL(24,2) NOT NULL,
    "fdvUsd" DECIMAL(24,2) NOT NULL,
    "liquidityUsd" DECIMAL(18,2) NOT NULL,
    "holdersCount" INTEGER NOT NULL DEFAULT 0,
    "transfersCount" INTEGER NOT NULL DEFAULT 0,
    "circulatingSupply" DECIMAL(36,18) NOT NULL,
    "totalSupply" DECIMAL(36,18) NOT NULL,
    "volume24hUsd" DECIMAL(18,2) NOT NULL,
    "buyVolume24hUsd" DECIMAL(18,2) NOT NULL,
    "sellVolume24hUsd" DECIMAL(18,2) NOT NULL,
    "priceChange1h" DECIMAL(6,2) NOT NULL,
    "priceChange24h" DECIMAL(6,2) NOT NULL,
    "priceChange7d" DECIMAL(6,2) NOT NULL,
    "largestHolders" JSONB NOT NULL DEFAULT '[]',
    "newHolders24h" JSONB NOT NULL DEFAULT '[]',
    "priceHistory" JSONB NOT NULL DEFAULT '[]',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- B-Tree Performance Indexes
CREATE UNIQUE INDEX "tokens_address_key" ON "tokens"("address");
CREATE INDEX "tokens_symbol_idx" ON "tokens"("symbol");
CREATE INDEX "tokens_marketCapUsd_idx" ON "tokens"("marketCapUsd" DESC);
CREATE INDEX "tokens_volume24hUsd_idx" ON "tokens"("volume24hUsd" DESC);
CREATE INDEX "tokens_chainId_idx" ON "tokens"("chainId");
