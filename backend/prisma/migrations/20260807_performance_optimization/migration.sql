-- CreateTable: query_performance_logs
CREATE TABLE "query_performance_logs" (
    "id" TEXT NOT NULL,
    "queryName" TEXT NOT NULL,
    "executionMs" DECIMAL(8,2) NOT NULL,
    "rowsAffected" INTEGER NOT NULL DEFAULT 0,
    "isSlowQuery" BOOLEAN NOT NULL DEFAULT false,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "query_performance_logs_pkey" PRIMARY KEY ("id")
);

-- Performance Indexes for Latency Monitoring
CREATE INDEX "query_performance_logs_isSlowQuery_executedAt_idx" ON "query_performance_logs"("isSlowQuery", "executedAt" DESC);
CREATE INDEX "query_performance_logs_queryName_idx" ON "query_performance_logs"("queryName");
