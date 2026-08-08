-- CreateEnum: QueueJobStatus
CREATE TYPE "QueueJobStatus" AS ENUM ('QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'RETRYING');

-- CreateTable: job_audit_records
CREATE TABLE "job_audit_records" (
    "id" TEXT NOT NULL,
    "queueName" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "QueueJobStatus" NOT NULL DEFAULT 'QUEUED',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "processedBy" TEXT,
    "errorLog" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_audit_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable: notification_records
CREATE TABLE "notification_records" (
    "id" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_records_pkey" PRIMARY KEY ("id")
);

-- Queue & Notification Indexes
CREATE UNIQUE INDEX "job_audit_records_jobId_key" ON "job_audit_records"("jobId");
CREATE INDEX "job_audit_records_queueName_status_idx" ON "job_audit_records"("queueName", "status");
CREATE INDEX "job_audit_records_createdAt_idx" ON "job_audit_records"("createdAt" DESC);

CREATE INDEX "notification_records_channel_delivered_idx" ON "notification_records"("channel", "delivered");
CREATE INDEX "notification_records_sentAt_idx" ON "notification_records"("sentAt" DESC);
