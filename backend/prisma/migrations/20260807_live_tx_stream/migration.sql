-- CreateTable: live_transaction_stream
CREATE TABLE "live_transaction_stream" (
    "id" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "tokenAddress" TEXT,
    "amount" DECIMAL(36,18) NOT NULL,
    "usdValue" DECIMAL(18,2) NOT NULL,
    "gasGwei" DECIMAL(10,2) NOT NULL,
    "chainName" TEXT NOT NULL,
    "chainId" "ChainType" NOT NULL,
    "swapRoute" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "status" "TxStatus" NOT NULL DEFAULT 'SUCCESS',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "live_transaction_stream_pkey" PRIMARY KEY ("id")
);

-- Indexes for Real-Time Millisecond Filtering
CREATE UNIQUE INDEX "live_transaction_stream_txHash_key" ON "live_transaction_stream"("txHash");
CREATE INDEX "live_transaction_stream_timestamp_idx" ON "live_transaction_stream"("timestamp" DESC);
CREATE INDEX "live_transaction_stream_walletAddress_timestamp_idx" ON "live_transaction_stream"("walletAddress", "timestamp" DESC);
CREATE INDEX "live_transaction_stream_tokenSymbol_timestamp_idx" ON "live_transaction_stream"("tokenSymbol", "timestamp" DESC);
CREATE INDEX "live_transaction_stream_protocol_idx" ON "live_transaction_stream"("protocol");
CREATE INDEX "live_transaction_stream_chainName_idx" ON "live_transaction_stream"("chainName");
