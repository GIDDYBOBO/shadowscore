-- CreateTable: ohlcv_candle_records
CREATE TABLE "ohlcv_candle_records" (
    "id" TEXT NOT NULL,
    "pairAddress" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "openTime" TIMESTAMP(3) NOT NULL,
    "openPrice" DECIMAL(18,8) NOT NULL,
    "highPrice" DECIMAL(18,8) NOT NULL,
    "lowPrice" DECIMAL(18,8) NOT NULL,
    "closePrice" DECIMAL(18,8) NOT NULL,
    "volumeUsd" DECIMAL(24,2) NOT NULL,
    "tradesCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ohlcv_candle_records_pkey" PRIMARY KEY ("id")
);

-- Unique & High-Throughput Time-Series Indexes
CREATE UNIQUE INDEX "ohlcv_candle_records_pairAddress_timeframe_openTime_key" ON "ohlcv_candle_records"("pairAddress", "timeframe", "openTime");
CREATE INDEX "ohlcv_candle_records_pairAddress_timeframe_openTime_idx" ON "ohlcv_candle_records"("pairAddress", "timeframe", "openTime" DESC);
