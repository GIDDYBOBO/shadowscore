-- CreateTable: portfolio_snapshots
CREATE TABLE "portfolio_snapshots" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "netWorthUsd" DECIMAL(18,2) NOT NULL,
    "tokenAllocationUsd" DECIMAL(18,2) NOT NULL,
    "tokenAllocationPct" DECIMAL(5,2) NOT NULL,
    "nftAllocationUsd" DECIMAL(18,2) NOT NULL,
    "nftAllocationPct" DECIMAL(5,2) NOT NULL,
    "stablecoinPct" DECIMAL(5,2) NOT NULL,
    "defiPct" DECIMAL(5,2) NOT NULL,
    "cashPct" DECIMAL(5,2) NOT NULL,
    "totalRealizedPnlUsd" DECIMAL(18,2) NOT NULL,
    "totalUnrealizedPnlUsd" DECIMAL(18,2) NOT NULL,
    "totalPnlPct" DECIMAL(6,2) NOT NULL,
    "performance30dPct" DECIMAL(6,2) NOT NULL,
    "chainAllocation" JSONB NOT NULL DEFAULT '[]',
    "historicalChart" JSONB NOT NULL DEFAULT '[]',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_snapshots_pkey" PRIMARY KEY ("id")
);

-- Time-Series and Wallet Indexes
CREATE INDEX "portfolio_snapshots_walletAddress_timestamp_idx" ON "portfolio_snapshots"("walletAddress", "timestamp" DESC);
CREATE INDEX "portfolio_snapshots_netWorthUsd_idx" ON "portfolio_snapshots"("netWorthUsd" DESC);
