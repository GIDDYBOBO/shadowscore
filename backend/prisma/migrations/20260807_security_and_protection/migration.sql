-- CreateTable: encrypted_secret_records
CREATE TABLE "encrypted_secret_records" (
    "id" TEXT NOT NULL,
    "secretKeyName" TEXT NOT NULL,
    "cipherText" TEXT NOT NULL,
    "ivHex" TEXT NOT NULL,
    "authTagHex" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "encrypted_secret_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable: security_audit_logs
CREATE TABLE "security_audit_logs" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "threatDetected" BOOLEAN NOT NULL DEFAULT false,
    "threatCategory" TEXT,
    "actionTaken" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_audit_logs_pkey" PRIMARY KEY ("id")
);

-- Indexes for Fast Threat Auditing
CREATE UNIQUE INDEX "encrypted_secret_records_secretKeyName_key" ON "encrypted_secret_records"("secretKeyName");
CREATE INDEX "encrypted_secret_records_secretKeyName_idx" ON "encrypted_secret_records"("secretKeyName");

CREATE INDEX "security_audit_logs_threatDetected_timestamp_idx" ON "security_audit_logs"("threatDetected", "timestamp" DESC);
CREATE INDEX "security_audit_logs_threatCategory_idx" ON "security_audit_logs"("threatCategory");
