-- CreateEnum
CREATE TYPE "ChainType" AS ENUM ('ETHEREUM', 'BASE', 'POLYGON', 'ARBITRUM', 'BNB_CHAIN', 'OPTIMISM', 'SOLANA');
CREATE TYPE "TxType" AS ENUM ('NATIVE_TRANSFER', 'TOKEN_TRANSFER', 'NFT_TRANSFER', 'DEX_SWAP', 'LIQUIDITY_ADD', 'LIQUIDITY_REMOVE', 'BRIDGE_DEPOSIT', 'BRIDGE_CLAIM', 'APPROVAL', 'CONTRACT_DEPLOY', 'CONTRACT_INTERACTION');
CREATE TYPE "TxStatus" AS ENUM ('SUCCESS', 'REVERTED', 'PENDING');
CREATE TYPE "TokenType" AS ENUM ('NATIVE', 'ERC20', 'ERC721', 'ERC1155', 'SPL_TOKEN', 'METAPLEX_NFT');

-- CreateTable: blocks
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "blockHash" TEXT NOT NULL,
    "parentHash" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "gasUsed" BIGINT NOT NULL,
    "gasLimit" BIGINT NOT NULL,
    "baseFeePerGas" BIGINT,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable: transactions
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "txHash" TEXT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT,
    "value" DECIMAL(36,18) NOT NULL,
    "valueUsd" DECIMAL(18,2),
    "gasPrice" BIGINT,
    "gasUsed" BIGINT NOT NULL,
    "effectiveGasPrice" BIGINT,
    "maxFeePerGas" BIGINT,
    "maxPriorityFee" BIGINT,
    "nonce" INTEGER NOT NULL,
    "status" "TxStatus" NOT NULL,
    "txType" "TxType" NOT NULL,
    "inputData" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable: token_transfers
CREATE TABLE "token_transfers" (
    "id" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "txHash" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "amount" DECIMAL(36,18) NOT NULL,
    "amountUsd" DECIMAL(18,2),
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable: nft_transfers
CREATE TABLE "nft_transfers" (
    "id" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "txHash" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "collectionName" TEXT,
    "tokenId" TEXT NOT NULL,
    "tokenType" "TokenType" NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "estimatedFloorUsd" DECIMAL(18,2),
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable: dex_swaps
CREATE TABLE "dex_swaps" (
    "id" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "txHash" TEXT NOT NULL,
    "dexName" TEXT NOT NULL,
    "pairAddress" TEXT NOT NULL,
    "traderAddress" TEXT NOT NULL,
    "tokenInAddress" TEXT NOT NULL,
    "tokenInSymbol" TEXT NOT NULL,
    "amountIn" DECIMAL(36,18) NOT NULL,
    "tokenOutAddress" TEXT NOT NULL,
    "tokenOutSymbol" TEXT NOT NULL,
    "amountOut" DECIMAL(36,18) NOT NULL,
    "volumeUsd" DECIMAL(18,2) NOT NULL,
    "priceImpactPct" DECIMAL(5,2),
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dex_swaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable: liquidity_events
CREATE TABLE "liquidity_events" (
    "id" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "txHash" TEXT NOT NULL,
    "dexName" TEXT NOT NULL,
    "poolAddress" TEXT NOT NULL,
    "providerAddress" TEXT NOT NULL,
    "isAdd" BOOLEAN NOT NULL,
    "token0Symbol" TEXT NOT NULL,
    "token0Amount" DECIMAL(36,18) NOT NULL,
    "token1Symbol" TEXT NOT NULL,
    "token1Amount" DECIMAL(36,18) NOT NULL,
    "totalValueUsd" DECIMAL(18,2) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "liquidity_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable: bridge_transfers
CREATE TABLE "bridge_transfers" (
    "id" TEXT NOT NULL,
    "sourceChain" "ChainType" NOT NULL,
    "targetChain" "ChainType" NOT NULL,
    "txHash" TEXT NOT NULL,
    "bridgeName" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "amount" DECIMAL(36,18) NOT NULL,
    "amountUsd" DECIMAL(18,2) NOT NULL,
    "status" "TxStatus" NOT NULL DEFAULT 'SUCCESS',
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bridge_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable: approval_events
CREATE TABLE "approval_events" (
    "id" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "txHash" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "spenderAddress" TEXT NOT NULL,
    "spenderName" TEXT,
    "tokenAddress" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "allowanceAmount" TEXT NOT NULL,
    "isUnlimited" BOOLEAN NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "approval_events_pkey" PRIMARY KEY ("id")
);

-- Unique & Performance Indexes
CREATE UNIQUE INDEX "blocks_blockHash_key" ON "blocks"("blockHash");
CREATE UNIQUE INDEX "blocks_chainId_blockNumber_key" ON "blocks"("chainId", "blockNumber");
CREATE INDEX "blocks_chainId_timestamp_idx" ON "blocks"("chainId", "timestamp" DESC);

CREATE UNIQUE INDEX "transactions_txHash_key" ON "transactions"("txHash");
CREATE INDEX "transactions_fromAddress_createdAt_idx" ON "transactions"("fromAddress", "createdAt" DESC);
CREATE INDEX "transactions_toAddress_createdAt_idx" ON "transactions"("toAddress", "createdAt" DESC);
CREATE INDEX "transactions_chainId_blockNumber_idx" ON "transactions"("chainId", "blockNumber" DESC);
CREATE INDEX "transactions_txType_chainId_idx" ON "transactions"("txType", "chainId");

CREATE INDEX "token_transfers_fromAddress_timestamp_idx" ON "token_transfers"("fromAddress", "timestamp" DESC);
CREATE INDEX "token_transfers_toAddress_timestamp_idx" ON "token_transfers"("toAddress", "timestamp" DESC);
CREATE INDEX "token_transfers_tokenAddress_timestamp_idx" ON "token_transfers"("tokenAddress", "timestamp" DESC);

CREATE INDEX "nft_transfers_contractAddress_tokenId_idx" ON "nft_transfers"("contractAddress", "tokenId");
CREATE INDEX "nft_transfers_fromAddress_timestamp_idx" ON "nft_transfers"("fromAddress", "timestamp" DESC);
CREATE INDEX "nft_transfers_toAddress_timestamp_idx" ON "nft_transfers"("toAddress", "timestamp" DESC);

CREATE INDEX "dex_swaps_pairAddress_timestamp_idx" ON "dex_swaps"("pairAddress", "timestamp" DESC);
CREATE INDEX "dex_swaps_traderAddress_timestamp_idx" ON "dex_swaps"("traderAddress", "timestamp" DESC);
CREATE INDEX "dex_swaps_tokenInAddress_tokenOutAddress_idx" ON "dex_swaps"("tokenInAddress", "tokenOutAddress");

CREATE INDEX "liquidity_events_poolAddress_timestamp_idx" ON "liquidity_events"("poolAddress", "timestamp" DESC);
CREATE INDEX "liquidity_events_providerAddress_timestamp_idx" ON "liquidity_events"("providerAddress", "timestamp" DESC);

CREATE INDEX "bridge_transfers_senderAddress_timestamp_idx" ON "bridge_transfers"("senderAddress", "timestamp" DESC);
CREATE INDEX "bridge_transfers_bridgeName_timestamp_idx" ON "bridge_transfers"("bridgeName", "timestamp" DESC);

CREATE INDEX "approval_events_ownerAddress_timestamp_idx" ON "approval_events"("ownerAddress", "timestamp" DESC);
CREATE INDEX "approval_events_spenderAddress_idx" ON "approval_events"("spenderAddress");
CREATE INDEX "approval_events_tokenAddress_idx" ON "approval_events"("tokenAddress");
