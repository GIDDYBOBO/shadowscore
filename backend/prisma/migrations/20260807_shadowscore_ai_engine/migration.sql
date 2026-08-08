-- CreateTable: shadowscore_audits
CREATE TABLE "shadowscore_audits" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "trustScore" INTEGER NOT NULL,
    "activityScore" INTEGER NOT NULL,
    "defiScore" INTEGER NOT NULL,
    "nftScore" INTEGER NOT NULL,
    "whaleScore" INTEGER NOT NULL,
    "securityScore" INTEGER NOT NULL,
    "reputationGrade" TEXT NOT NULL,
    "inputsEvaluated" JSONB NOT NULL,
    "scoreExplanations" JSONB NOT NULL,
    "auditedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shadowscore_audits_pkey" PRIMARY KEY ("id")
);

-- Indexes for Fast Reputation Queries
CREATE UNIQUE INDEX "shadowscore_audits_walletAddress_key" ON "shadowscore_audits"("walletAddress");
CREATE INDEX "shadowscore_audits_overallScore_idx" ON "shadowscore_audits"("overallScore" DESC);
CREATE INDEX "shadowscore_audits_riskScore_idx" ON "shadowscore_audits"("riskScore");
CREATE INDEX "shadowscore_audits_reputationGrade_idx" ON "shadowscore_audits"("reputationGrade");
