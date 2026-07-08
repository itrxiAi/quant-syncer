#!/bin/bash
set -e

echo "=== quant-syncer start ==="

npm install
npx prisma generate
npx prisma migrate deploy
npm run build

pm2 start ecosystem.config.js
pm2 save

echo "=== started ==="
pm2 status
