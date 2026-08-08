-- CreateTable: trending_widget_state
CREATE TABLE "trending_widget_state" (
    "id" TEXT NOT NULL,
    "widgetKey" TEXT NOT NULL,
    "itemsPayload" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trending_widget_state_pkey" PRIMARY KEY ("id")
);

-- Indexes for Fast Widget Cache Retrieval
CREATE UNIQUE INDEX "trending_widget_state_widgetKey_key" ON "trending_widget_state"("widgetKey");
CREATE INDEX "trending_widget_state_widgetKey_idx" ON "trending_widget_state"("widgetKey");
