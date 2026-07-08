-- CreateEnum
CREATE TYPE "Asset" AS ENUM ('ashare', 'crypto');
CREATE TYPE "Freq" AS ENUM ('d1', 'm5', 'm15', 'h1', 'h4');

-- CreateTable: bar (partitioned by RANGE on ts)
CREATE TABLE "bar" (
    "ts" TIMESTAMPTZ NOT NULL,
    "symbol" VARCHAR(16) NOT NULL,
    "asset" "Asset" NOT NULL,
    "freq" "Freq" NOT NULL,
    "open" DOUBLE PRECISION,
    "high" DOUBLE PRECISION,
    "low" DOUBLE PRECISION,
    "close" DOUBLE PRECISION,
    "volume" DOUBLE PRECISION,
    "amount" DOUBLE PRECISION,
    "factor" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "taker_buy_base_volume" DOUBLE PRECISION,
    "vendor" VARCHAR(32),
    "ingest_ts" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE ("ts");

-- Partitions for bar by year
CREATE TABLE "bar_2020" PARTITION OF "bar" FOR VALUES FROM ('2020-01-01') TO ('2021-01-01');
CREATE TABLE "bar_2021" PARTITION OF "bar" FOR VALUES FROM ('2021-01-01') TO ('2022-01-01');
CREATE TABLE "bar_2022" PARTITION OF "bar" FOR VALUES FROM ('2022-01-01') TO ('2023-01-01');
CREATE TABLE "bar_2023" PARTITION OF "bar" FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');
CREATE TABLE "bar_2024" PARTITION OF "bar" FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
CREATE TABLE "bar_2025" PARTITION OF "bar" FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
CREATE TABLE "bar_2026" PARTITION OF "bar" FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
CREATE TABLE "bar_2027" PARTITION OF "bar" FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');
CREATE TABLE "bar_default" PARTITION OF "bar" DEFAULT;

-- Primary key on partitioned table (must include partition key)
ALTER TABLE "bar" ADD CONSTRAINT "bar_pkey" PRIMARY KEY ("ts", "symbol", "asset", "freq");

-- Indexes on bar
CREATE INDEX "bar_symbol_asset_freq_ts_idx" ON "bar" ("symbol", "asset", "freq", "ts" DESC);
CREATE INDEX "bar_ts_asset_freq_idx" ON "bar" ("ts", "asset", "freq");
CREATE INDEX "bar_asset_freq_ts_idx" ON "bar" ("asset", "freq", "ts" DESC);

-- CreateTable: bar_raw
CREATE TABLE "bar_raw" (
    "ts" TIMESTAMPTZ NOT NULL,
    "symbol" VARCHAR(16) NOT NULL,
    "asset" "Asset" NOT NULL,
    "freq" "Freq" NOT NULL,
    "vendor" VARCHAR(32) NOT NULL,
    "data" JSONB NOT NULL,
    "ingest_ts" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bar_raw_pkey" PRIMARY KEY ("ts", "symbol", "asset", "freq", "vendor")
);

CREATE INDEX "bar_raw_symbol_asset_freq_ts_idx" ON "bar_raw" ("symbol", "asset", "freq", "ts" DESC);

-- CreateTable: calendar
CREATE TABLE "calendar" (
    "date" DATE NOT NULL,
    "is_open" BOOLEAN NOT NULL,
    "asset" "Asset" NOT NULL,

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("date")
);

CREATE INDEX "calendar_asset_date_idx" ON "calendar" ("asset", "date");

-- CreateTable: index
CREATE TABLE "index" (
    "code" VARCHAR(32) NOT NULL,
    "name" VARCHAR(64),
    "asset" "Asset" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "index_pkey" PRIMARY KEY ("code")
);

-- CreateTable: index_member
CREATE TABLE "index_member" (
    "index_code" VARCHAR(32) NOT NULL,
    "symbol" VARCHAR(16) NOT NULL,
    "in_date" DATE NOT NULL,
    "out_date" DATE,

    CONSTRAINT "index_member_pkey" PRIMARY KEY ("index_code", "symbol", "in_date")
);

CREATE INDEX "index_member_symbol_idx" ON "index_member" ("symbol");
CREATE INDEX "index_member_index_code_in_date_out_date_idx" ON "index_member" ("index_code", "in_date", "out_date");

-- AddForeignKey
ALTER TABLE "index_member" ADD CONSTRAINT "index_member_index_code_fkey"
    FOREIGN KEY ("index_code") REFERENCES "index"("code") ON DELETE CASCADE;
