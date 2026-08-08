-- CreateEnum: RiskLevel
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable: wallet_intelligence
CREATE TABLE "wallet_intelligence" (
    "address" TEXT NOT NULL,
    "ensName" TEXT,
    "walletAgeDays" INTEGER NOT NULL DEFAULT 0,
    "firstTxAt" TIMESTAMP(3),
    "lastTxAt" TIMESTAMP(3),
    "txCount" INTEGER NOT NULL DEFAULT 0,
    "totalGasSpentEth" DECIMAL(36,18) NOT NULL DEFAULT 0,
    "totalGasSpentUsd" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "currentBalanceUsd" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "avgHoldingDurationDays" INTEGER NOT NULL DEFAULT 0,
    "realizedProfitUsd" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "unrealizedProfitUsd" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "favoriteDex" TEXT NOT NULL DEFAULT 'Uniswap v3',
    "favoriteChain" TEXT NOT NULL DEFAULT 'Ethereum',
    "favoriteTokens" JSONB NOT NULL DEFAULT '[]',
    "bridgesUsed" JSONB NOT NULL DEFAULT '[]',
    "topCounterparties" JSONB NOT NULL DEFAULT '[]',
    "protocolUsage" JSONB NOT NULL DEFAULT '[]',
    "defiPositions" JSONB NOT NULL DEFAULT '[]',
    "historicalBalanceChart" JSONB NOT NULL DEFAULT '[]',
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'LOW',
    "shadowScore" INTEGER NOT NULL DEFAULT 75,
    "reputationRank" TEXT NOT NULL DEFAULT 'Tier 1 Verified',
    "lastAuditedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_intelligence_pkey" PRIMARY KEY ("address")
);

-- Performance Indexes
CREATE INDEX "wallet_intelligence_shadowScore_idx" ON "wallet_intelligence"("shadowScore" DESC);
CREATE INDEX "wallet_intelligence_riskLevel_idx" ON "wallet_intelligence"("riskLevel");
CREATE INDEX "wallet_intelligence_currentBalanceUsd_idx" ON "wallet_intelligence"("currentBalanceUsd" DESC);
