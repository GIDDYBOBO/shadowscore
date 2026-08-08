-- CreateEnum: ApiTier
CREATE TYPE "ApiTier" AS ENUM ('DEVELOPER_FREE', 'PRO_STARTUP', 'ENTERPRISE_UNLIMITED');

-- CreateTable: api_keys
CREATE TABLE "api_keys" (
    "id" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "tier" "ApiTier" NOT NULL DEFAULT 'DEVELOPER_FREE',
    "rateLimitPerMin" INTEGER NOT NULL DEFAULT 60,
    "totalCalls" BIGINT NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- Indexes for Fast Key Authentication
CREATE UNIQUE INDEX "api_keys_keyHash_key" ON "api_keys"("keyHash");
CREATE INDEX "api_keys_tier_idx" ON "api_keys"("tier");
