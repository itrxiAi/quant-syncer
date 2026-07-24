-- AlterEnum: add macro to Asset
ALTER TYPE "Asset" ADD VALUE IF NOT EXISTS 'macro';

-- CreateTable: macro_market (Polymarket prediction markets)
CREATE TABLE "macro_market" (
    "id" VARCHAR(64) NOT NULL,
    "question" TEXT NOT NULL,
    "slug" VARCHAR(256),
    "yes_prob" DOUBLE PRECISION,
    "vol_24h" DOUBLE PRECISION,
    "vol_total" DOUBLE PRECISION,
    "end_date" TIMESTAMPTZ,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "macro_market_pkey" PRIMARY KEY ("id")
);
